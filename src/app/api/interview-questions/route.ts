import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { consumeDailyLimit, DAILY_TOOL_LIMIT } from "@/lib/rate-limit";

const ALLOWED_EXPERIENCE_LEVELS = ["entry", "mid", "senior"] as const;
const ALLOWED_INTERVIEW_TYPES = ["mixed", "behavioral", "technical"] as const;

interface InterviewQuestionItem {
  question: string;
  tip: string;
}

function isValidQuestionArray(value: unknown): value is InterviewQuestionItem[] {
  return (
    Array.isArray(value) &&
    value.length === 10 &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { question?: unknown }).question === "string" &&
        typeof (item as { tip?: unknown }).tip === "string",
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, company, experienceLevel, interviewType } = body as {
      jobTitle?: string;
      company?: string;
      experienceLevel?: string;
      interviewType?: string;
    };

    if (!jobTitle) {
      return NextResponse.json({ error: "Job title is required." }, { status: 400 });
    }

    if (
      typeof jobTitle !== "string" ||
      (company !== undefined && typeof company !== "string") ||
      typeof experienceLevel !== "string" ||
      typeof interviewType !== "string"
    ) {
      return NextResponse.json({ error: "Invalid input format." }, { status: 400 });
    }

    if (!ALLOWED_EXPERIENCE_LEVELS.includes(experienceLevel as (typeof ALLOWED_EXPERIENCE_LEVELS)[number])) {
      return NextResponse.json({ error: "Experience level must be entry, mid, or senior." }, { status: 400 });
    }

    if (!ALLOWED_INTERVIEW_TYPES.includes(interviewType as (typeof ALLOWED_INTERVIEW_TYPES)[number])) {
      return NextResponse.json(
        { error: "Interview type must be mixed, behavioral, or technical." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Interview question generator is not configured. Please add your OpenAI API key." },
        { status: 503 },
      );
    }

    const rl = await consumeDailyLimit("interview_questions", DAILY_TOOL_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "You've reached today's free limit for this tool. Please come back tomorrow." },
        { status: 429 },
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert career coach and interview preparation specialist with 15 years of experience helping candidates land jobs at top US companies.

Generate exactly 10 interview questions for the job title and context provided, along with a practical answer tip for each question.

Rules:
- Tailor questions specifically to the job title and experience level provided
- If company name is provided, make 2-3 questions more specific to that company type or industry
- Match the interview type:
  behavioral = past experience questions (Tell me about a time..., Describe a situation where...)
  technical = skill and knowledge questions specific to the role
  mixed = 5 behavioral + 5 technical
- Adjust complexity for experience level:
  entry = foundational knowledge and basic scenarios
  mid = problem-solving and team leadership scenarios
  senior = strategic thinking and organizational impact
- Answer tips should be 1-2 sentences giving a practical framework or key point to hit, not a full answer
- Do not repeat question formats
- Sound like questions real US hiring managers ask

Return ONLY a JSON array with exactly 10 objects.
No introduction, no explanation, no markdown.
Each object must have exactly two fields:
{
  "question": "the interview question",
  "tip": "the answer tip"
}

Example format:
[
  {
    "question": "Tell me about yourself.",
    "tip": "Use the present-past-future framework: current role, relevant background, why this opportunity excites you. Keep it under 2 minutes."
  }
]`,
        },
        {
          role: "user",
          content: `Job Title: ${jobTitle}
Company: ${company ?? ""}
Experience Level: ${experienceLevel}
Interview Type: ${interviewType}`,
        },
      ],
      max_tokens: 1200,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json({ error: "The AI returned an empty response. Please try again." }, { status: 500 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "The AI returned an invalid format. Please try again." },
        { status: 500 },
      );
    }

    if (!isValidQuestionArray(parsed)) {
      return NextResponse.json(
        { error: "The AI response was incomplete. Please regenerate." },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[/api/interview-questions] Error:", err);

    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment and try again." },
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

    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
