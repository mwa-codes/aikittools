"use client";

import { useState, useMemo } from "react";

function countStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = trimmed === "" ? 0 : trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
}

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countStats(text), [text]);

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Chars (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading Time", value: `~${stats.readingTime} min` },
  ];

  return (
    <div>
      <label htmlFor="word-counter-input" className="block text-sm font-medium text-gray-700 mb-2">
        Paste or type your text below
      </label>
      <textarea
        id="word-counter-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Start typing or paste your text here..."
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y font-mono"
        aria-label="Text input for word counter"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center"
          >
            <div className="text-2xl font-bold text-blue-700">{item.value}</div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setText("")}
          disabled={text === ""}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(text)}
          disabled={text === ""}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          Copy Text
        </button>
      </div>
    </div>
  );
}
