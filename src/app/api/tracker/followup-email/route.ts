import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { consumeDailyLimit, DAILY_TOOL_LIMIT } from "@/lib/rate-limit";

const ALLOWED_TIMEFRAMES = ["1 week", "2 weeks"] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, role, timeframe } = body as {
      company?: string;
      role?: string;
      timeframe?: string;
    };

    if (!company || !role || !timeframe) {
      return NextResponse.json(
        { error: "Company, role, and timeframe are required." },
        { status: 400 }
      );
    }

    const selectedTimeframe = ALLOWED_TIMEFRAMES.includes(
      (timeframe ?? "") as (typeof ALLOWED_TIMEFRAMES)[number]
    )
      ? (timeframe as (typeof ALLOWED_TIMEFRAMES)[number])
      : "1 week";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Follow-up email generator is not configured." },
        { status: 503 }
      );
    }

    const rl = await consumeDailyLimit("tracker_followup_email", DAILY_TOOL_LIMIT);
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
          content: `Write a professional follow-up email for a job application. The candidate applied to ${role} at ${company}. It has been ${selectedTimeframe} with no response. Keep it under 150 words, polite, and end with a clear call to action. Include a subject line at the top prefixed with "Subject: ". Return only the email text.`,
        },
        {
          role: "user",
          content: `Write a follow-up email for my application to the ${role} position at ${company}. It has been ${selectedTimeframe} since I applied with no response.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    const email = completion.choices[0]?.message?.content?.trim();
    if (!email) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ email });
  } catch (err) {
    console.error("[/api/tracker/followup-email] Error:", err);
    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment and try again." },
          { status: 429 }
        );
      }
    }
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
