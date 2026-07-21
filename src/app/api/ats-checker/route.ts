import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { consumeDailyLimit, DAILY_TOOL_LIMIT } from "@/lib/rate-limit";

const MAX_RESUME_WORDS = 800;
const MAX_JOB_DESCRIPTION_WORDS = 500;
const ALLOWED_STATUSES = ["Low Match", "Fair Match", "Good Match", "Excellent Match"] as const;

interface AtsCheckerResponse {
  score: number;
  status: (typeof ALLOWED_STATUSES)[number];
  missingKeywords: string[];
  matchedKeywords: string[];
  recommendations: string[];
}

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

function isValidAtsResponse(value: unknown): value is AtsCheckerResponse {
  if (!value || typeof value !== "object") return false;

  const parsed = value as {
    score?: unknown;
    status?: unknown;
    missingKeywords?: unknown;
    matchedKeywords?: unknown;
    recommendations?: unknown;
  };

  return (
    typeof parsed.score === "number" &&
    parsed.score >= 0 &&
    parsed.score <= 100 &&
    typeof parsed.status === "string" &&
    ALLOWED_STATUSES.includes(parsed.status as (typeof ALLOWED_STATUSES)[number]) &&
    Array.isArray(parsed.missingKeywords) &&
    parsed.missingKeywords.length >= 5 &&
    parsed.missingKeywords.length <= 15 &&
    parsed.missingKeywords.every((item) => typeof item === "string") &&
    Array.isArray(parsed.matchedKeywords) &&
    parsed.matchedKeywords.every((item) => typeof item === "string") &&
    Array.isArray(parsed.recommendations) &&
    parsed.recommendations.length >= 3 &&
    parsed.recommendations.length <= 4 &&
    parsed.recommendations.every((item) => typeof item === "string")
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resume, jobDescription } = body as { resume?: string; jobDescription?: string };

    if (!resume || !jobDescription) {
      return NextResponse.json({ error: "Resume and job description are required." }, { status: 400 });
    }

    if (typeof resume !== "string" || typeof jobDescription !== "string") {
      return NextResponse.json({ error: "Invalid input format." }, { status: 400 });
    }

    const resumeWordCount = countWords(resume);
    const jobDescriptionWordCount = countWords(jobDescription);

    if (resumeWordCount > MAX_RESUME_WORDS) {
      return NextResponse.json(
        { error: `Resume is too long. Please keep it under ${MAX_RESUME_WORDS} words.` },
        { status: 400 },
      );
    }

    if (jobDescriptionWordCount > MAX_JOB_DESCRIPTION_WORDS) {
      return NextResponse.json(
        { error: `Job description is too long. Please keep it under ${MAX_JOB_DESCRIPTION_WORDS} words.` },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ATS resume checker is not configured. Please add your OpenAI API key." },
        { status: 503 },
      );
    }

    const rl = await consumeDailyLimit("ats_checker", DAILY_TOOL_LIMIT);
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
          content: `You are an expert ATS (Applicant Tracking System) analyst and resume optimization specialist with deep knowledge of how US employer ATS software works.

Analyze the provided resume against the job description and return a detailed ATS compatibility report.

Your analysis must:
1. Extract the most important keywords and phrases from the job description (skills, tools, qualifications, responsibilities, certifications)
2. Check which of those keywords appear in the resume
3. Calculate an ATS match score from 0 to 100 based on keyword coverage and relevance
4. Identify missing keywords that should be added
5. List matched keywords already present
6. Provide 3-4 specific, actionable recommendations to improve the ATS score

Scoring guide:
- Weight hard skills, tools, and technologies highest
- Weight required qualifications and certifications high
- Weight soft skills and general terms lowest
- Be realistic - do not inflate scores

Return ONLY a valid JSON object with exactly this structure.
No introduction, no explanation, no markdown, no code fences:
{
  "score": 72,
  "status": "Fair Match",
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "matchedKeywords": ["keyword4", "keyword5", "keyword6"],
  "recommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2",
    "Specific actionable recommendation 3"
  ]
}

Rules for the JSON:
- score must be a number 0-100
- status must be one of: "Low Match", "Fair Match", "Good Match", "Excellent Match"
- missingKeywords: array of strings, 5-15 items
- matchedKeywords: array of strings, relevant matches only
- recommendations: array of 3-4 specific strings
- All values must be strings or numbers - no nested objects`,
        },
        {
          role: "user",
          content: `Resume:
${resume}

Job Description:
${jobDescription}`,
        },
      ],
      max_tokens: 1400,
      temperature: 0.4,
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

    if (!isValidAtsResponse(parsed)) {
      return NextResponse.json(
        { error: "The AI response was incomplete. Please regenerate." },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[/api/ats-checker] Error:", err);

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
