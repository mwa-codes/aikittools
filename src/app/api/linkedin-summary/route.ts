import { NextRequest } from "next/server";
import OpenAI from "openai";

const MAX_ACHIEVEMENT_WORDS = 150;
const ALLOWED_TONES = ["professional", "conversational", "bold"] as const;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, experience, skills, achievement, goal, tone } = body as {
      jobTitle?: string;
      experience?: string;
      skills?: string;
      achievement?: string;
      goal?: string;
      tone?: string;
    };

    if (!jobTitle || !experience || !skills || !goal || !tone) {
      return new Response(
        "Current job title, years of experience, key skills, career goal, and tone are required.",
        { status: 400 }
      );
    }

    if (
      typeof jobTitle !== "string" ||
      typeof experience !== "string" ||
      typeof skills !== "string" ||
      typeof goal !== "string" ||
      typeof tone !== "string" ||
      (typeof achievement !== "undefined" && typeof achievement !== "string")
    ) {
      return new Response("Invalid input format.", { status: 400 });
    }

    const normalizedAchievement = (achievement ?? "").trim();
    const achievementWordCount = normalizedAchievement ? countWords(normalizedAchievement) : 0;
    if (achievementWordCount > MAX_ACHIEVEMENT_WORDS) {
      return new Response(
        `Achievement is too long. Please limit it to ${MAX_ACHIEVEMENT_WORDS} words. Your input has ${achievementWordCount} words.`,
        { status: 400 }
      );
    }

    if (!ALLOWED_TONES.includes(tone as (typeof ALLOWED_TONES)[number])) {
      return new Response("Tone must be one of: professional, conversational, bold.", { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response("LinkedIn summary generator is not configured. Please add your OpenAI API key.", {
        status: 503,
      });
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert LinkedIn profile writer and personal branding specialist with 15 years of experience helping US professionals get noticed by recruiters and hiring managers.

Write a compelling LinkedIn About section based on the information provided.

Rules:
- Write in first person (I, my, me) — never third person
- Start with a strong hook in the first sentence that grabs attention — not 'I am a [job title]'
- Structure: hook → background and expertise → key achievement (if provided) → what you are looking for
- Keep it between 1,800 and 2,200 characters total
- Use short paragraphs (2-4 sentences each) — easy to scan
- Sound human and specific — not like a generic template
- Avoid buzzwords: synergy, results-driven, dynamic, passionate, detail-oriented, self-starter, guru, ninja
- Match the requested tone:
  Professional: formal, polished, corporate
  Conversational: warm, approachable, natural
  Bold: confident, direct, memorable
- End with a clear call to action or invitation to connect
- Do not include a subject line or heading
- Do not add emojis unless tone is Conversational or Bold
- Return only the LinkedIn summary text, nothing else`,
        },
        {
          role: "user",
          content: `Job Title: ${jobTitle}
Years of Experience: ${experience}
Key Skills: ${skills}
Top Achievement: ${normalizedAchievement}
Looking For: ${goal}
Tone: ${tone}`,
        },
      ],
      max_tokens: 900,
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    if (!summary) {
      return new Response("The AI returned an empty response. Please try again.", { status: 500 });
    }

    return new Response(summary, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (err) {
    console.error("[/api/linkedin-summary] Error:", err);

    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) {
        return new Response("Rate limit reached. Please wait a moment and try again.", { status: 429 });
      }
      if (err.status === 401) {
        return new Response("Invalid API key. Please check your OpenAI configuration.", { status: 401 });
      }
    }

    return new Response("An unexpected error occurred. Please try again.", { status: 500 });
  }
}
