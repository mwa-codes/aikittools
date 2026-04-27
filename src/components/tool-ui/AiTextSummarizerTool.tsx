"use client";

import { useState } from "react";

const MAX_WORDS = 500;

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

export default function AiTextSummarizerTool() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = countWords(input);
  const isOverLimit = wordCount > MAX_WORDS;

  async function handleSummarize() {
    if (!input.trim() || isOverLimit) return;

    setIsLoading(true);
    setSummary("");
    setError("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = (await res.json()) as { summary?: string; error?: string };

      if (!res.ok || data.error) {
        setError(data.error ?? "An error occurred. Please try again.");
      } else if (data.summary) {
        setSummary(data.summary);
      }
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

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="summarizer-input" className="block text-sm font-medium text-gray-700">
            Your Text
          </label>
          <span className={`text-xs font-medium ${isOverLimit ? "text-red-600" : "text-gray-400"}`}>
            {wordCount} / {MAX_WORDS} words
          </span>
        </div>
        <textarea
          id="summarizer-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          placeholder="Paste an article, document, or any text you want summarized (up to 500 words)…"
          className={`w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y ${
            isOverLimit ? "border-red-400 bg-red-50" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {isOverLimit && (
          <p className="mt-1 text-xs text-red-600">
            Text is too long. Please shorten it to under {MAX_WORDS} words.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSummarize}
        disabled={!input.trim() || isOverLimit || isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Summarizing…
          </>
        ) : (
          <>🤖 Summarize with AI</>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Output */}
      {summary && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-purple-800">Summary</h3>
            <button
              onClick={handleCopy}
              className="text-xs text-purple-600 hover:text-purple-800 font-medium"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center">
        Powered by OpenAI · Results may not be perfectly accurate · Review summaries before use
      </p>
    </div>
  );
}
