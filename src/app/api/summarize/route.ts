import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const MAX_WORDS = 500;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body as { text?: string };

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide text to summarize." },
        { status: 400 }
      );
    }

    const wordCount = countWords(text);
    if (wordCount > MAX_WORDS) {
      return NextResponse.json(
        {
          error: `Input is too long. Please limit your text to ${MAX_WORDS} words. Your input has ${wordCount} words.`,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI summarizer is not configured. Please add your OpenAI API key." },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a concise text summarizer. Summarize the given text in 3-5 sentences. Preserve the key points and main ideas. Do not add any information not present in the original text. Respond with the summary only, no preamble.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 300,
      temperature: 0.3,
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("[/api/summarize] Error:", err);

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

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
