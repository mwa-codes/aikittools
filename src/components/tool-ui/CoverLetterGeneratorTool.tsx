"use client";

import { useState } from "react";
import { recordCoverLetterGenerated } from "@/lib/akt-analytics-storage";

const MAX_WORDS = 300;

type Tone = "Professional" | "Friendly" | "Confident";

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

export default function CoverLetterGeneratorTool() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [experience, setExperience] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = countWords(experience);
  const isOverLimit = wordCount > MAX_WORDS;
  const isFormInvalid = !jobTitle.trim() || !companyName.trim() || !experience.trim() || isOverLimit || isLoading;

  async function generateCoverLetter() {
    if (isFormInvalid) return;

    setIsLoading(true);
    setCoverLetter("");
    setError("");

    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          companyName,
          experience,
          tone,
        }),
      });

      const data = (await res.json()) as { coverLetter?: string; error?: string };

      if (!res.ok || data.error) {
        setError(data.error ?? "An error occurred. Please try again.");
      } else if (data.coverLetter) {
        setCoverLetter(data.coverLetter);
        recordCoverLetterGenerated();
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    if (!coverLetter) return;
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cover-letter-job-title" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          id="cover-letter-job-title"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g. Software Engineer, Marketing Manager"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="cover-letter-company-name" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          id="cover-letter-company-name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Google, a local startup"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="cover-letter-experience" className="block text-sm font-medium text-gray-700">
            Your Relevant Experience
          </label>
          <span className={`text-xs font-medium ${isOverLimit ? "text-red-600" : "text-gray-400"}`}>
            {wordCount} / {MAX_WORDS} words
          </span>
        </div>
        <textarea
          id="cover-letter-experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          rows={6}
          placeholder="Briefly describe your experience, skills, and why you're a good fit. e.g. 3 years in React development, built 2 production apps, strong communicator..."
          className={`w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y ${isOverLimit ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
          disabled={isLoading}
          required
        />
        {isOverLimit && (
          <p className="mt-1 text-xs text-red-600">
            Experience is too long. Please shorten it to under {MAX_WORDS} words.
          </p>
        )}
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Tone</p>
        <div className="grid grid-cols-3 gap-2">
          {(["Professional", "Friendly", "Confident"] as Tone[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTone(option)}
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${tone === option
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:text-purple-700"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={generateCoverLetter}
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
          <>✉️ Generate Cover Letter</>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {coverLetter && (
        <>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-800 mb-2">Your Cover Letter</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{coverLetter}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors"
              >
                {copied ? "✓ Copied!" : "📋 Copy to Clipboard"}
              </button>
              <button
                type="button"
                onClick={generateCoverLetter}
                disabled={isLoading}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors disabled:opacity-50"
              >
                🔄 Regenerate
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">AI-generated · Review before sending · Free to use</p>
          </div>

          <div className="p-4 rounded-lg border border-purple-100 bg-purple-50/60">
            <p className="text-sm text-gray-700">
              ✓ Cover letter ready. Next steps:
              <br />→ Build a matching resume with Resume.io (free to start){" "}
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
