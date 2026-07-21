import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { consumeDailyLimit, DAILY_TOOL_LIMIT } from "@/lib/rate-limit";

const MAX_RESPONSIBILITIES_WORDS = 300;
const MAX_METRICS_WORDS = 100;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, responsibilities, metrics, industry } = body as {
      jobTitle?: string;
      responsibilities?: string;
      metrics?: string;
      industry?: string;
    };

    if (!jobTitle || !responsibilities) {
      return NextResponse.json(
        { error: "Job title and key responsibilities are required." },
        { status: 400 }
      );
    }

    if (
      typeof jobTitle !== "string" ||
      typeof responsibilities !== "string" ||
      (metrics !== undefined && typeof metrics !== "string") ||
      (industry !== undefined && typeof industry !== "string")
    ) {
      return NextResponse.json({ error: "Invalid input format." }, { status: 400 });
    }

    const responsibilitiesWordCount = countWords(responsibilities);
    if (responsibilitiesWordCount > MAX_RESPONSIBILITIES_WORDS) {
      return NextResponse.json(
        {
          error: `Responsibilities are too long. Please limit to ${MAX_RESPONSIBILITIES_WORDS} words. Your input has ${responsibilitiesWordCount} words.`,
        },
        { status: 400 }
      );
    }

    const metricsWordCount = countWords(metrics ?? "");
    if (metricsWordCount > MAX_METRICS_WORDS) {
      return NextResponse.json(
        {
          error: `Metrics are too long. Please limit to ${MAX_METRICS_WORDS} words. Your input has ${metricsWordCount} words.`,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Resume bullet generator is not configured. Please add your OpenAI API key." },
        { status: 503 }
      );
    }

    const rl = await consumeDailyLimit("resume_bullets", DAILY_TOOL_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "You've reached today's free limit for this tool. Please come back tomorrow." },
        { status: 429 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer with 15 years of experience helping professionals land jobs at top US companies. Your specialty is writing powerful, achievement-focused resume bullet points.
Write exactly 5 resume bullet points based on the information provided.
Rules for each bullet:
- Start with a strong past-tense action verb (Achieved, Built, Delivered, Drove, Generated, Improved, Increased, Launched, Led, Managed, Optimized, Reduced, Streamlined, etc.)
- Follow the formula: Action Verb + What You Did + Result or Impact
- If metrics are provided, incorporate them naturally
- Each bullet should be 1-2 lines maximum — concise and scannable
- Tailor language to the specific job title and industry
- Never start two bullets with the same action verb
- Sound human and specific, not generic
- Do not use buzzwords like 'synergy', 'leverage', 'dynamic', 'results-driven'
Return ONLY the 5 bullet points, one per line, each starting with a dash (-).
No introduction, no explanation, no numbering. Just the 5 bullets.`,
        },
        {
          role: "user",
          content: `Job Title: ${jobTitle}
Industry: ${industry ?? "General"}
Key Responsibilities: ${responsibilities}
Metrics and Achievements: ${metrics ?? ""}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const bulletsText = completion.choices[0]?.message?.content?.trim();
    if (!bulletsText) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ bulletsText });
  } catch (err) {
    console.error("[/api/resume-bullets] Error:", err);

    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment and try again." },
          { status: 429 }
        );
      }
      if (err.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your OpenAI configuration." },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
