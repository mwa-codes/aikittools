"use client";

import Link from "next/link";
import { useState } from "react";

const MAX_ACHIEVEMENT_WORDS = 150;
const MAX_LINKEDIN_CHARACTERS = 2600;

type Tone = "professional" | "conversational" | "bold";

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

export default function LinkedInSummaryGeneratorTool() {
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [achievement, setAchievement] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const achievementWordCount = countWords(achievement);
  const isAchievementOverLimit = achievementWordCount > MAX_ACHIEVEMENT_WORDS;
  const isFormInvalid =
    !jobTitle.trim() ||
    !experience.trim() ||
    !skills.trim() ||
    !goal.trim() ||
    isAchievementOverLimit ||
    isLoading;

  async function generateSummary() {
    if (isFormInvalid) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/linkedin-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          experience,
          skills,
          achievement,
          goal,
          tone,
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        setError(text || "An error occurred. Please try again.");
        return;
      }

      setSummary(text);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const summaryLength = summary.length;
  const counterColorClass =
    summaryLength > 2400 ? "text-red-600" : summaryLength >= 2000 ? "text-amber-600" : "text-green-600";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-6">
        Used by US professionals to write compelling LinkedIn About sections. Enter your role and experience — get a
        professional LinkedIn summary instantly. Free LinkedIn summary generator, no account needed.
      </p>

      <div>
        <label htmlFor="linkedin-job-title" className="block text-sm font-medium text-gray-700 mb-1">
          Current Job Title or Target Role
        </label>
        <input
          id="linkedin-job-title"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g. Software Engineer, Marketing Manager, Recent Computer Science Graduate"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="linkedin-experience" className="block text-sm font-medium text-gray-700 mb-1">
          Years of Experience
        </label>
        <select
          id="linkedin-experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          disabled={isLoading}
          required
        >
          <option value="">Select experience level</option>
          <option value="Student / No experience yet">Student / No experience yet</option>
          <option value="Less than 1 year">Less than 1 year</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="6-10 years">6-10 years</option>
          <option value="10+ years">10+ years</option>
        </select>
      </div>

      <div>
        <label htmlFor="linkedin-skills" className="block text-sm font-medium text-gray-700 mb-1">
          Top Skills or Areas of Expertise
        </label>
        <input
          id="linkedin-skills"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. React, TypeScript, team leadership, data analysis, client management"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="linkedin-achievement" className="block text-sm font-medium text-gray-700">
            Top Achievement or Proud Moment (optional)
          </label>
          <span className={`text-xs font-medium ${isAchievementOverLimit ? "text-red-600" : "text-gray-400"}`}>
            {achievementWordCount} / {MAX_ACHIEVEMENT_WORDS} words
          </span>
        </div>
        <textarea
          id="linkedin-achievement"
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
          rows={4}
          placeholder="e.g. Led a team that shipped a product used by 50,000 users. Grew department revenue by 40% in 12 months."
          className={`w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y ${
            isAchievementOverLimit ? "border-red-400 bg-red-50" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {isAchievementOverLimit && (
          <p className="mt-1 text-xs text-red-600">
            Achievement is too long. Please shorten it to under {MAX_ACHIEVEMENT_WORDS} words.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="linkedin-goal" className="block text-sm font-medium text-gray-700 mb-1">
          What Are You Looking For?
        </label>
        <input
          id="linkedin-goal"
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Senior engineering roles at product companies, freelance marketing projects, entry-level finance positions"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Tone</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: "professional", label: "Professional" },
            { value: "conversational", label: "Conversational" },
            { value: "bold", label: "Bold" },
          ] as const).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTone(option.value)}
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                tone === option.value
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
        onClick={generateSummary}
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
          <>💼 Generate LinkedIn Summary</>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {summary && (
        <>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-800 mb-2">Your LinkedIn Summary</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{summary}</p>
            <p className={`mt-3 text-xs font-medium ${counterColorClass}`}>
              {summaryLength.toLocaleString()} / {MAX_LINKEDIN_CHARACTERS.toLocaleString()} characters
            </p>
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
                onClick={generateSummary}
                disabled={isLoading}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors disabled:opacity-50"
              >
                🔄 Regenerate
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              AI-generated · Customize before publishing · First person · LinkedIn ready
            </p>
          </div>

          <div className="p-4 rounded-lg border border-purple-100 bg-purple-50/60">
            <p className="text-sm text-gray-700">
              ✓ Summary ready. Complete your profile:
              <br />→ Write a tailored cover letter with AI (free){" "}
              <Link href="/cover-letter-generator" className="text-purple-700 hover:text-purple-800 underline">
                [open tool]
              </Link>
              <br />→ Check your resume against job descriptions (free){" "}
              <Link href="/ats-resume-checker" className="text-purple-700 hover:text-purple-800 underline">
                [open tool]
              </Link>
              <br />→ Upgrade to LinkedIn Premium for recruiter visibility{" "}
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
