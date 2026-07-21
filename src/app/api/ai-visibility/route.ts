import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { consumeDailyLimit } from "@/lib/rate-limit";

// Bounded cost: a check runs at most NUM_QUESTIONS answer calls + 1 analysis
// call, all on gpt-4o-mini, so worst-case cost per check is a few tenths of a
// cent. DAILY_LIMIT caps checks per visitor per day (see lib/rate-limit.ts).
const DAILY_LIMIT = 3;
const NUM_QUESTIONS = 3;
const MAX_BRAND_LEN = 60;
const MAX_CATEGORY_LEN = 120;
const MAX_QUESTION_LEN = 200;

interface QuestionResult {
  question: string;
  mentioned: boolean;
  /** 0-1: how early in the answer the brand first appears (1 = very first). */
  prominence: number;
}

/** The realistic "recommendation" prompts a real user would ask an AI. */
function buildQuestions(category: string, customQuestion?: string): string[] {
  const base = [
    `What are the best ${category}? List the top options.`,
    `I'm looking for ${category}. Which ones would you recommend and why?`,
    `What are the most popular and well-regarded ${category} right now?`,
  ];
  if (customQuestion && customQuestion.trim()) {
    // Swap the last generic question for the user's own.
    base[base.length - 1] = customQuestion.trim();
  }
  return base.slice(0, NUM_QUESTIONS);
}

/** Case-insensitive, word-boundary detection + how early the brand appears. */
function detectMention(
  answer: string,
  brand: string,
): { mentioned: boolean; prominence: number } {
  const escaped = brand.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`, "i");
  const idx = answer.search(re);
  if (idx === -1) return { mentioned: false, prominence: 0 };
  const prominence = answer.length > 0 ? 1 - idx / answer.length : 1;
  return { mentioned: true, prominence: Math.max(0, Math.min(1, prominence)) };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brand, category, customQuestion } = body as {
      brand?: string;
      category?: string;
      customQuestion?: string;
    };

    if (!brand || !category) {
      return NextResponse.json(
        { error: "Brand name and category are required." },
        { status: 400 },
      );
    }
    if (
      typeof brand !== "string" ||
      typeof category !== "string" ||
      (typeof customQuestion !== "undefined" && typeof customQuestion !== "string")
    ) {
      return NextResponse.json({ error: "Invalid input format." }, { status: 400 });
    }
    if (brand.trim().length > MAX_BRAND_LEN) {
      return NextResponse.json(
        { error: `Brand name must be ${MAX_BRAND_LEN} characters or fewer.` },
        { status: 400 },
      );
    }
    if (category.trim().length > MAX_CATEGORY_LEN) {
      return NextResponse.json(
        { error: `Category must be ${MAX_CATEGORY_LEN} characters or fewer.` },
        { status: 400 },
      );
    }
    if ((customQuestion ?? "").trim().length > MAX_QUESTION_LEN) {
      return NextResponse.json(
        { error: `Custom question must be ${MAX_QUESTION_LEN} characters or fewer.` },
        { status: 400 },
      );
    }

    // Per-visitor daily cap (cost safety). Bypassable by design in the MVP.
    const limit = await consumeDailyLimit("ai_visibility", DAILY_LIMIT);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `You've used all ${DAILY_LIMIT} free checks for today. Come back tomorrow, or check another brand then.`,
        },
        { status: 429 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI visibility checker is not configured. Please add your OpenAI API key." },
        { status: 503 },
      );
    }

    const openai = new OpenAI({ apiKey });
    const questions = buildQuestions(category.trim(), customQuestion);

    // Ask each recommendation question independently (parallel for speed).
    const answers = await Promise.all(
      questions.map(async (q) => {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant answering a consumer's question about product or service recommendations. Answer naturally and concisely, naming specific real brands or products you'd recommend, as you normally would. Do not add disclaimers.",
            },
            { role: "user", content: q },
          ],
          max_tokens: 400,
          temperature: 0.5,
        });
        return completion.choices[0]?.message?.content?.trim() ?? "";
      }),
    );

    // Local (no-cost) brand detection + score.
    const perQuestion: QuestionResult[] = questions.map((question, i) => {
      const { mentioned, prominence } = detectMention(answers[i] ?? "", brand);
      return { question, mentioned, prominence };
    });

    const mentions = perQuestion.filter((r) => r.mentioned);
    const mentionRate = perQuestion.length ? mentions.length / perQuestion.length : 0;
    const avgProminence = mentions.length
      ? mentions.reduce((sum, r) => sum + r.prominence, 0) / mentions.length
      : 0;
    // Score = mostly "did it show up", partly "how early". 0-100.
    const score = Math.round((mentionRate * 0.7 + avgProminence * 0.3) * 100);

    // One structured call to extract the competitor brands the AI named instead.
    let competitors: string[] = [];
    try {
      const combined = answers.join("\n\n---\n\n");
      const extraction = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              'Extract the distinct brand or product names mentioned in the text. Return ONLY a JSON object of the form {"brands": ["Name1", "Name2"]}. No prose.',
          },
          { role: "user", content: combined.slice(0, 6000) },
        ],
        max_tokens: 300,
        temperature: 0,
        response_format: { type: "json_object" },
      });
      const raw = extraction.choices[0]?.message?.content?.trim() ?? "{}";
      const parsed = JSON.parse(raw) as { brands?: unknown };
      if (Array.isArray(parsed.brands)) {
        const lowerBrand = brand.trim().toLowerCase();
        competitors = parsed.brands
          .filter((b): b is string => typeof b === "string")
          .map((b) => b.trim())
          .filter((b) => b && b.toLowerCase() !== lowerBrand)
          // de-dupe case-insensitively
          .filter((b, i, arr) => arr.findIndex((x) => x.toLowerCase() === b.toLowerCase()) === i)
          .slice(0, 8);
      }
    } catch {
      // Competitor extraction is best-effort; never fail the whole check on it.
      competitors = [];
    }

    return NextResponse.json({
      brand: brand.trim(),
      category: category.trim(),
      score,
      mentionCount: mentions.length,
      totalQuestions: perQuestion.length,
      perQuestion,
      competitors,
      remaining: limit.remaining,
    });
  } catch (err) {
    console.error("[/api/ai-visibility] Error:", err);
    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) {
        return NextResponse.json(
          { error: "The AI service is busy. Please wait a moment and try again." },
          { status: 429 },
        );
      }
      if (err.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your OpenAI configuration." },
          { status: 401 },
        );
      }
    }
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
