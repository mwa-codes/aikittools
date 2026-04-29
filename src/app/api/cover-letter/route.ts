import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const MAX_WORDS = 300;
const ALLOWED_TONES = ["Professional", "Friendly", "Confident"] as const;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, companyName, experience, tone } = body as {
      jobTitle?: string;
      companyName?: string;
      experience?: string;
      tone?: string;
    };

    if (!jobTitle || !companyName || !experience) {
      return NextResponse.json(
        { error: "Job title, company name, and relevant experience are required." },
        { status: 400 }
      );
    }

    if (typeof jobTitle !== "string" || typeof companyName !== "string" || typeof experience !== "string") {
      return NextResponse.json({ error: "Invalid input format." }, { status: 400 });
    }

    const experienceWordCount = countWords(experience);
    if (experienceWordCount > MAX_WORDS) {
      return NextResponse.json(
        {
          error: `Experience is too long. Please limit it to ${MAX_WORDS} words. Your input has ${experienceWordCount} words.`,
        },
        { status: 400 }
      );
    }

    const selectedTone = ALLOWED_TONES.includes((tone ?? "") as (typeof ALLOWED_TONES)[number])
      ? (tone as (typeof ALLOWED_TONES)[number])
      : "Professional";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Cover letter generator is not configured. Please add your OpenAI API key." },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional career coach and expert cover letter writer.
Write a tailored, professional cover letter based on the information provided.
The cover letter should:
- Be 3-4 paragraphs long
- Open with a strong hook that mentions the specific job title and company
- Highlight the candidate's relevant experience naturally
- Show genuine enthusiasm for the role without being generic
- Close with a confident call to action
- Sound human, not like an AI wrote it
- Match the requested tone: ${selectedTone}
Do not include subject lines, dates, or address blocks.
Start directly with 'Dear Hiring Manager,' and end with 'Sincerely, [Your Name]'
Return only the cover letter text, nothing else.`,
        },
        {
          role: "user",
          content: `Job Title: ${jobTitle}
Company: ${companyName}
My Experience: ${experience}
Tone: ${selectedTone}`,
        },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const coverLetter = completion.choices[0]?.message?.content?.trim();
    if (!coverLetter) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ coverLetter });
  } catch (err) {
    console.error("[/api/cover-letter] Error:", err);

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
