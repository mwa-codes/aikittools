"use client";

import Link from "next/link";
import { useState } from "react";

type ExperienceLevel = "entry" | "mid" | "senior";
type InterviewType = "mixed" | "behavioral" | "technical";

interface InterviewQuestionItem {
  question: string;
  tip: string;
}

function normalizeQuestions(input: unknown): InterviewQuestionItem[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter(
      (item): item is InterviewQuestionItem =>
        Boolean(item) &&
        typeof item === "object" &&
        typeof (item as { question?: unknown }).question === "string" &&
        typeof (item as { tip?: unknown }).tip === "string",
    )
    .map((item) => ({
      question: item.question.trim(),
      tip: item.tip.trim(),
    }))
    .filter((item) => item.question && item.tip)
    .slice(0, 10);
}

export default function InterviewQuestionGeneratorTool() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("entry");
  const [interviewType, setInterviewType] = useState<InterviewType>("mixed");
  const [questions, setQuestions] = useState<InterviewQuestionItem[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isFormInvalid = !jobTitle.trim() || isLoading;

  async function generateInterviewQuestions() {
    if (isFormInvalid) return;

    setIsLoading(true);
    setQuestions([]);
    setOpenIndex(null);
    setError("");

    try {
      const res = await fetch("/api/interview-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          company: company.trim(),
          experienceLevel,
          interviewType,
        }),
      });

      const data = (await res.json()) as unknown;

      if (!res.ok) {
        const response = data as { error?: string };
        setError(response.error ?? "An error occurred. Please try again.");
        return;
      }

      const parsed = normalizeQuestions(data);
      if (parsed.length === 0) {
        setError("The AI returned an invalid response. Please try again.");
        return;
      }

      setQuestions(parsed);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopyAll() {
    if (questions.length === 0) return;
    const text = questions.map((item, index) => `${index + 1}. ${item.question}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-6">
        Prepare for your next US job interview in minutes. Enter your job title and get 10 role-specific
        questions with answer tips — free interview prep tool, no account needed.
      </p>

      <div>
        <label htmlFor="interview-job-title" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          id="interview-job-title"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g. Software Engineer, Marketing Manager, Nurse"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="interview-company" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name (optional)
        </label>
        <input
          id="interview-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. Google, Amazon, a local hospital"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Experience Level</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {([
            { value: "entry", label: "Entry Level (0-2 years)" },
            { value: "mid", label: "Mid Level (3-6 years)" },
            { value: "senior", label: "Senior Level (7+ years)" },
          ] as const).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setExperienceLevel(option.value)}
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${experienceLevel === option.value
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:text-purple-700"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Interview Type</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: "mixed", label: "Mixed" },
            { value: "behavioral", label: "Behavioral" },
            { value: "technical", label: "Technical" },
          ] as const).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setInterviewType(option.value)}
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${interviewType === option.value
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:text-purple-700"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={generateInterviewQuestions}
        disabled={isFormInvalid}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating…
          </>
        ) : (
          <>🎤 Generate Interview Questions</>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {questions.length > 0 && (
        <>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-800 mb-1">Your Interview Questions</h3>
            <p className="text-xs text-gray-600 mb-3">Tap each question to see the answer tip</p>

            <ul className="space-y-2">
              {questions.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={`${item.question}-${index}`} className="rounded-md border border-purple-100 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left px-3 py-2 flex items-start justify-between gap-2"
                    >
                      <span className="text-sm text-gray-800">
                        {index + 1}. {item.question}
                      </span>
                      <span className="text-xs text-purple-700 mt-0.5">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3">
                        <p className="text-sm text-gray-700">💡 Answer Tip: {item.tip}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopyAll}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors"
              >
                {copied ? "✓ Copied!" : "📋 Copy All Questions"}
              </button>
              <button
                type="button"
                onClick={generateInterviewQuestions}
                disabled={isLoading}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors disabled:opacity-50"
              >
                🔄 Regenerate
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">AI-generated · Use as prep framework · Free to use</p>
          </div>

          <div className="p-4 rounded-lg border border-purple-100 bg-purple-50/60">
            <p className="text-sm text-gray-700">
              ✓ Interview prep ready. Next steps:
              <br />→ Write your cover letter with AI (free){" "}
              <Link href="/cover-letter-generator" className="text-purple-700 hover:text-purple-800 underline">
                [open tool]
              </Link>
              <br />→ Optimize your resume bullets with AI (free){" "}
              <Link href="/resume-bullet-generator" className="text-purple-700 hover:text-purple-800 underline">
                [open tool]
              </Link>
              <br />→ Check grammar with Grammarly (free){" "}
              <a href="#" className="text-purple-700 hover:text-purple-800 underline">
                [link placeholder]
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
