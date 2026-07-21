"use client";

import { useState } from "react";
import { recordAiVisibilityCheck } from "@/lib/akt-analytics-storage";

const MAX_BRAND_LEN = 60;
const MAX_CATEGORY_LEN = 120;
const MAX_QUESTION_LEN = 200;

interface QuestionResult {
  question: string;
  mentioned: boolean;
  prominence: number;
}

interface VisibilityResult {
  brand: string;
  category: string;
  score: number;
  mentionCount: number;
  totalQuestions: number;
  perQuestion: QuestionResult[];
  competitors: string[];
  remaining: number;
}

function scoreLabel(score: number): { label: string; color: string } {
  if (score >= 67) return { label: "Strong", color: "text-emerald-600" };
  if (score >= 34) return { label: "Partial", color: "text-amber-600" };
  if (score > 0) return { label: "Weak", color: "text-orange-600" };
  return { label: "Invisible", color: "text-red-600" };
}

export default function AIVisibilityCheckerTool() {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [result, setResult] = useState<VisibilityResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormInvalid =
    !brand.trim() ||
    !category.trim() ||
    brand.trim().length > MAX_BRAND_LEN ||
    category.trim().length > MAX_CATEGORY_LEN ||
    customQuestion.trim().length > MAX_QUESTION_LEN ||
    isLoading;

  async function runCheck() {
    if (isFormInvalid) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, category, customQuestion }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const data = (await res.json()) as VisibilityResult;
      setResult(data);
      recordAiVisibilityCheck();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-slate-700">
            Brand or product name
          </label>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            maxLength={MAX_BRAND_LEN}
            placeholder="e.g. Notion"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">
            Category people would search for
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            maxLength={MAX_CATEGORY_LEN}
            placeholder="e.g. note-taking apps, CRM software, coffee shops in Austin"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <p className="mt-1 text-xs text-slate-500">
            Describe what your brand is, the way a customer would ask an AI for a recommendation.
          </p>
        </div>

        <div>
          <label htmlFor="customQuestion" className="block text-sm font-medium text-slate-700">
            Custom question <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="customQuestion"
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            maxLength={MAX_QUESTION_LEN}
            placeholder="e.g. What's the best free note-taking app for students?"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <button
          onClick={runCheck}
          disabled={isFormInvalid}
          className="w-full rounded-lg bg-teal-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Checking AI visibility…" : "Check AI Visibility"}
        </button>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 space-y-6 border-t border-slate-200 pt-6">
          {/* Score */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-5">
            <div>
              <p className="text-sm font-medium text-slate-500">AI Visibility Score</p>
              <p className={`text-lg font-bold ${scoreLabel(result.score).color}`}>
                {scoreLabel(result.score).label}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {result.brand} appeared in {result.mentionCount} of {result.totalQuestions} AI
                answers about {result.category}.
              </p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-black ${scoreLabel(result.score).color}`}>
                {result.score}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                / 100
              </div>
            </div>
          </div>

          {/* Per-question breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              What the AI said when asked about {result.category}
            </h3>
            <ul className="mt-3 space-y-2">
              {result.perQuestion.map((q, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm"
                >
                  <span className={q.mentioned ? "text-emerald-600" : "text-slate-400"}>
                    {q.mentioned ? "✓" : "✕"}
                  </span>
                  <div>
                    <p className="text-slate-700">&ldquo;{q.question}&rdquo;</p>
                    <p className={`mt-0.5 text-xs font-medium ${q.mentioned ? "text-emerald-600" : "text-slate-400"}`}>
                      {q.mentioned ? "Your brand was mentioned" : "Your brand was not mentioned"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Competitors */}
          {result.competitors.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Brands the AI recommended instead
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.competitors.map((c) => (
                  <span
                    key={c}
                    className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="rounded-xl border border-teal-100 bg-teal-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">How to improve your AI visibility</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Get mentioned in listicles and &ldquo;best X&rdquo; comparison articles that AI models read.</li>
              <li>• Build genuine presence on Reddit, Quora, and niche communities — AI models weight them heavily.</li>
              <li>• Add clear structured data (Organization / Product schema) to your site.</li>
              <li>• Earn a Wikipedia page or authoritative third-party citations if you qualify.</li>
              <li>• Publish comparison and &ldquo;alternatives to&rdquo; content that names your brand alongside competitors.</li>
            </ul>
          </div>

          {/* Honest disclaimer */}
          <p className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
            <strong>How to read this:</strong> this measures whether an AI model
            (OpenAI&rsquo;s GPT) mentions your brand from its trained knowledge when asked
            for recommendations — its &ldquo;share of model.&rdquo; It does <em>not</em> scrape live
            search results or citations, and results vary between runs and between AI
            engines. Treat it as a directional signal, not an exact measurement.
          </p>

          {typeof result.remaining === "number" && (
            <p className="text-center text-xs text-slate-400">
              {result.remaining} free {result.remaining === 1 ? "check" : "checks"} left today.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
