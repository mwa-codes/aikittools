"use client";

import Link from "next/link";
import { useState } from "react";
import { recordAtsCheckSuccess } from "@/lib/akt-analytics-storage";

const MAX_RESUME_WORDS = 800;
const MAX_JOB_DESCRIPTION_WORDS = 500;

interface AtsCheckerResult {
  score: number;
  status: "Low Match" | "Fair Match" | "Good Match" | "Excellent Match";
  missingKeywords: string[];
  matchedKeywords: string[];
  recommendations: string[];
}

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeAtsResult(input: unknown): AtsCheckerResult | null {
  if (!input || typeof input !== "object") return null;
  const value = input as {
    score?: unknown;
    status?: unknown;
    missingKeywords?: unknown;
    matchedKeywords?: unknown;
    recommendations?: unknown;
  };

  const allowedStatuses = new Set(["Low Match", "Fair Match", "Good Match", "Excellent Match"]);

  if (typeof value.score !== "number" || Number.isNaN(value.score)) return null;
  if (value.score < 0 || value.score > 100) return null;
  if (typeof value.status !== "string" || !allowedStatuses.has(value.status)) return null;
  if (!Array.isArray(value.missingKeywords) || !value.missingKeywords.every((item) => typeof item === "string")) {
    return null;
  }
  if (!Array.isArray(value.matchedKeywords) || !value.matchedKeywords.every((item) => typeof item === "string")) {
    return null;
  }
  if (!Array.isArray(value.recommendations) || !value.recommendations.every((item) => typeof item === "string")) {
    return null;
  }

  return {
    score: Math.round(value.score),
    status: value.status as AtsCheckerResult["status"],
    missingKeywords: value.missingKeywords.map((item) => item.trim()).filter(Boolean),
    matchedKeywords: value.matchedKeywords.map((item) => item.trim()).filter(Boolean),
    recommendations: value.recommendations.map((item) => item.trim()).filter(Boolean).slice(0, 4),
  };
}

function getScoreStatusText(score: number): string {
  if (score <= 59) return "Low Match — Needs significant keyword updates";
  if (score <= 74) return "Fair Match — Some keywords missing";
  if (score <= 84) return "Good Match — Strong keyword alignment";
  return "Excellent Match — Very strong alignment";
}

function getScoreClasses(score: number): string {
  if (score <= 59) return "text-red-600";
  if (score <= 74) return "text-amber-600";
  if (score <= 84) return "text-green-600";
  return "text-blue-600";
}

export default function AtsResumeCheckerTool() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AtsCheckerResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const resumeWordCount = countWords(resume);
  const jobDescriptionWordCount = countWords(jobDescription);
  const isResumeOverLimit = resumeWordCount > MAX_RESUME_WORDS;
  const isJobDescriptionOverLimit = jobDescriptionWordCount > MAX_JOB_DESCRIPTION_WORDS;
  const isFormInvalid =
    !resume.trim() || !jobDescription.trim() || isResumeOverLimit || isJobDescriptionOverLimit || isLoading;

  async function checkAtsScore() {
    if (isFormInvalid) return;

    setIsLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/ats-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const data = (await res.json()) as unknown;

      if (!res.ok) {
        const response = data as { error?: string };
        setError(response.error ?? "An error occurred. Please try again.");
        return;
      }

      const parsed = normalizeAtsResult(data);
      if (!parsed) {
        setError("The AI returned an invalid format. Please try again.");
        return;
      }

      setResult(parsed);
      recordAtsCheckSuccess(parsed.score);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopySummary() {
    if (!result) return;
    const summary = [
      `ATS Match Score: ${result.score}/100 (${result.status})`,
      "",
      "Missing Keywords:",
      result.missingKeywords.length > 0 ? result.missingKeywords.map((k) => `- ${k}`).join("\n") : "- None",
    ].join("\n");
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setResume("");
    setJobDescription("");
    setResult(null);
    setError("");
    setCopied(false);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-6">
        Used by US job seekers to pass ATS filters before applying. Paste your resume and job description
        - get an ATS match score and missing keywords instantly. Free ATS checker, no account needed.
      </p>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="ats-resume-text" className="block text-sm font-medium text-gray-700">
            Your Resume
          </label>
          <span className={`text-xs font-medium ${isResumeOverLimit ? "text-red-600" : "text-gray-400"}`}>
            {resumeWordCount} / {MAX_RESUME_WORDS} words
          </span>
        </div>
        <textarea
          id="ats-resume-text"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          rows={8}
          placeholder="Paste your full resume text here. Plain text works best - remove tables and columns for most accurate results."
          className={`w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y ${isResumeOverLimit ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
          disabled={isLoading}
          required
        />
        {isResumeOverLimit && (
          <p className="mt-1 text-xs text-red-600">
            Resume text is too long. Please shorten to under {MAX_RESUME_WORDS} words.
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="ats-job-description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <span className={`text-xs font-medium ${isJobDescriptionOverLimit ? "text-red-600" : "text-gray-400"}`}>
            {jobDescriptionWordCount} / {MAX_JOB_DESCRIPTION_WORDS} words
          </span>
        </div>
        <textarea
          id="ats-job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
          placeholder="Paste the full job description you are applying for."
          className={`w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y ${isJobDescriptionOverLimit ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
          disabled={isLoading}
          required
        />
        {isJobDescriptionOverLimit && (
          <p className="mt-1 text-xs text-red-600">
            Job description is too long. Please shorten to under {MAX_JOB_DESCRIPTION_WORDS} words.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={checkAtsScore}
        disabled={isFormInvalid}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing your resume against the job description...
          </>
        ) : (
          <>🔍 Check ATS Score</>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="rounded-lg border border-purple-100 bg-white p-4 text-center">
              <p className={`text-4xl font-bold ${getScoreClasses(result.score)}`}>{result.score}/100</p>
              <p className={`mt-1 text-sm font-medium ${getScoreClasses(result.score)}`}>{getScoreStatusText(result.score)}</p>
            </div>

            <div className="mt-4 rounded-lg border border-red-100 bg-white p-4">
              <h3 className="text-sm font-semibold text-red-700 mb-2">❌ Missing Keywords</h3>
              {result.missingKeywords.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((keyword) => (
                      <span
                        key={`missing-${keyword}`}
                        className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2.5 py-1 text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Add these keywords naturally into your resume</p>
                </>
              ) : (
                <p className="text-sm text-green-700">✓ No critical keywords missing</p>
              )}
            </div>

            <div className="mt-4 rounded-lg border border-green-100 bg-white p-4">
              <h3 className="text-sm font-semibold text-green-700 mb-2">✅ Matched Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.map((keyword) => (
                  <span
                    key={`matched-${keyword}`}
                    className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2.5 py-1 text-xs font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">These keywords are already in your resume</p>
            </div>

            <div className="mt-4 rounded-lg border border-blue-100 bg-white p-4">
              <h3 className="text-sm font-semibold text-blue-700 mb-2">💡 Quick Fixes</h3>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={`${recommendation}-${index}`} className="text-sm text-gray-700 leading-relaxed">
                    • {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors"
              >
                {copied ? "✓ Copied!" : "📋 Copy Results Summary"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors"
              >
                🔄 Re-check Resume
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-purple-100 bg-purple-50/60">
            <p className="text-sm text-gray-700">
              ✓ ATS check complete. Next steps:
              <br />→ Rewrite weak resume bullets with AI (free){" "}
              <Link href="/resume-bullet-generator" className="text-purple-700 hover:text-purple-800 underline">
                [open tool]
              </Link>
              <br />→ Write a tailored cover letter with AI (free){" "}
              <Link href="/cover-letter-generator" className="text-purple-700 hover:text-purple-800 underline">
                [open tool]
              </Link>
              <br />→ Build an ATS-optimized resume with Resume.io (free to start){" "}
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
