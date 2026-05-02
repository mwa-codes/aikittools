import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const MAX_JD_CHARS = 500;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, jobDescription } = body as {
      role?: string;
      jobDescription?: string;
    };

    if (!role?.trim()) {
      return NextResponse.json(
        { error: "Role is required." },
        { status: 400 }
      );
    }

    if (jobDescription && jobDescription.length > MAX_JD_CHARS) {
      return NextResponse.json(
        { error: `Job description must be ${MAX_JD_CHARS} characters or fewer.` },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Interview prep is not configured." },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const systemPrompt =
      `You are an expert career coach. Generate exactly 8 likely interview questions for a ${role} position. ` +
      `For each question, add a one-sentence tip on how to approach the answer. ` +
      `Format your response as a numbered list. ` +
      `If a job description is provided, tailor the questions to it.`;

    const userMessage = jobDescription?.trim()
      ? `Generate 8 interview questions for a ${role} position. Job description: ${jobDescription}`
      : `Generate 8 interview questions for a ${role} position.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const questions = completion.choices[0]?.message?.content?.trim();
    if (!questions) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("[/api/tracker/interview-prep] Error:", err);
    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment and try again." },
          { status: 429 }
        );
      }
      if (err.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key configuration." },
          { status: 401 }
        );
      }
    }
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
