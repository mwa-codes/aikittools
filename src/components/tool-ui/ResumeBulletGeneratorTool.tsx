"use client";

import { useState } from "react";

const MAX_RESPONSIBILITIES_WORDS = 300;
const MAX_METRICS_WORDS = 100;

type Industry =
  | "General"
  | "Technology"
  | "Healthcare"
  | "Marketing & Sales"
  | "Finance"
  | "Education"
  | "Operations & Logistics"
  | "Customer Service"
  | "Creative & Design"
  | "Legal";

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

function parseBullets(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 5);
}

export default function ResumeBulletGeneratorTool() {
  const [jobTitle, setJobTitle] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [metrics, setMetrics] = useState("");
  const [industry, setIndustry] = useState<Industry>("General");
  const [bullets, setBullets] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const responsibilitiesWordCount = countWords(responsibilities);
  const metricsWordCount = countWords(metrics);
  const isResponsibilitiesOverLimit = responsibilitiesWordCount > MAX_RESPONSIBILITIES_WORDS;
  const isMetricsOverLimit = metricsWordCount > MAX_METRICS_WORDS;
  const isFormInvalid =
    !jobTitle.trim() ||
    !responsibilities.trim() ||
    isResponsibilitiesOverLimit ||
    isMetricsOverLimit ||
    isLoading;

  async function generateResumeBullets() {
    if (isFormInvalid) return;

    setIsLoading(true);
    setBullets([]);
    setError("");

    try {
      const res = await fetch("/api/resume-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          responsibilities,
          metrics,
          industry,
        }),
      });

      const data = (await res.json()) as { bulletsText?: string; error?: string };

      if (!res.ok || data.error) {
        setError(data.error ?? "An error occurred. Please try again.");
      } else if (data.bulletsText) {
        const parsed = parseBullets(data.bulletsText);
        if (parsed.length === 0) {
          setError("The AI returned an empty response. Please try again.");
          return;
        }
        setBullets(parsed);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopyAll() {
    if (bullets.length === 0) return;
    await navigator.clipboard.writeText(bullets.map((bullet) => `- ${bullet}`).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mb-6">
        Used by job seekers applying to US companies. Paste your responsibilities, get 5
        achievement-focused bullets instantly. Free resume bullet generator — no account needed.
      </p>
      <div>
        <label htmlFor="resume-bullets-job-title" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          id="resume-bullets-job-title"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g. Marketing Manager, Software Engineer, Nurse"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="resume-bullets-responsibilities" className="block text-sm font-medium text-gray-700">
            Your Key Responsibilities & Duties
          </label>
          <span className={`text-xs font-medium ${isResponsibilitiesOverLimit ? "text-red-600" : "text-gray-400"}`}>
            {responsibilitiesWordCount} / {MAX_RESPONSIBILITIES_WORDS} words
          </span>
        </div>
        <textarea
          id="resume-bullets-responsibilities"
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          rows={6}
          placeholder="Describe what you did in this role. e.g. Managed social media accounts for 3 brands, created weekly content calendar, responded to customer comments, tracked engagement metrics in Google Analytics..."
          className={`w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y ${isResponsibilitiesOverLimit ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
          disabled={isLoading}
          required
        />
        {isResponsibilitiesOverLimit && (
          <p className="mt-1 text-xs text-red-600">
            Responsibilities are too long. Please shorten to under {MAX_RESPONSIBILITIES_WORDS} words.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="resume-bullets-metrics" className="block text-sm font-medium text-gray-700 mb-1">
          Metrics or Achievements (optional but recommended)
        </label>
        <textarea
          id="resume-bullets-metrics"
          value={metrics}
          onChange={(e) => setMetrics(e.target.value)}
          rows={4}
          placeholder="e.g. Grew Instagram followers from 2k to 15k, reduced customer complaints by 40%, managed $50k monthly ad budget..."
          className={`w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y ${isMetricsOverLimit ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
          disabled={isLoading}
        />
        {isMetricsOverLimit && (
          <p className="mt-1 text-xs text-red-600">
            Metrics are too long. Please shorten to under {MAX_METRICS_WORDS} words.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="resume-bullets-industry" className="block text-sm font-medium text-gray-700 mb-1">
          Industry (optional)
        </label>
        <select
          id="resume-bullets-industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value as Industry)}
          disabled={isLoading}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        >
          <option>General</option>
          <option>Technology</option>
          <option>Healthcare</option>
          <option>Marketing &amp; Sales</option>
          <option>Finance</option>
          <option>Education</option>
          <option>Operations &amp; Logistics</option>
          <option>Customer Service</option>
          <option>Creative &amp; Design</option>
          <option>Legal</option>
        </select>
      </div>

      <button
        type="button"
        onClick={generateResumeBullets}
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
          <>✨ Generate Resume Bullets</>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {bullets.length > 0 && (
        <>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-800 mb-2">Your Resume Bullets</h3>
            <ul className="space-y-2">
              {bullets.map((bullet, index) => (
                <li key={`${bullet}-${index}`} className="text-sm text-gray-700 leading-relaxed">
                  • {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopyAll}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors"
              >
                {copied ? "✓ Copied!" : "📋 Copy All Bullets"}
              </button>
              <button
                type="button"
                onClick={generateResumeBullets}
                disabled={isLoading}
                className="px-3 py-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 hover:border-purple-300 rounded-md transition-colors disabled:opacity-50"
              >
                🔄 Regenerate
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">AI-generated · Customize before using · Free to use</p>
          </div>

          <div className="p-4 rounded-lg border border-purple-100 bg-purple-50/60">
            <p className="text-sm text-gray-700">
              ✓ Bullets ready. Next steps:
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
