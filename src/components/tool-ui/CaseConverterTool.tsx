"use client";

import { useMemo, useState } from "react";

type CaseMode = "upper" | "lower" | "title" | "sentence" | "camel";

function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toSentenceCase(text: string) {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (match) => match.toUpperCase());
}

function toCamelCase(text: string) {
  const words = text
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
  if (words.length === 0) return "";
  return words
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

export default function CaseConverterTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<CaseMode>("upper");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!text) return "";
    if (mode === "upper") return text.toUpperCase();
    if (mode === "lower") return text.toLowerCase();
    if (mode === "title") return toTitleCase(text);
    if (mode === "sentence") return toSentenceCase(text);
    return toCamelCase(text);
  }, [text, mode]);

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <label htmlFor="case-converter-input" className="block text-sm font-medium text-gray-700 mb-2">
        Enter text to convert
      </label>
      <textarea
        id="case-converter-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={8}
        placeholder="Paste or type your text here..."
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        aria-label="Text input for case converter"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          ["upper", "UPPERCASE"],
          ["lower", "lowercase"],
          ["title", "Title Case"],
          ["sentence", "Sentence case"],
          ["camel", "camelCase"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value as CaseMode)}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              mode === value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-700">Live Preview</p>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <pre className="w-full min-h-[160px] border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 whitespace-pre-wrap wrap-break-word">
          {output || <span className="text-gray-400 italic">Converted output will appear here…</span>}
        </pre>
      </div>
    </div>
  );
}
