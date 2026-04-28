"use client";

import { useMemo, useState } from "react";

type GenerateMode = "paragraphs" | "words" | "sentences";

const LOREM_SOURCE =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";

const WORDS = LOREM_SOURCE.split(" ");

function buildWords(count: number) {
  return Array.from({ length: count }, (_, index) => WORDS[index % WORDS.length]).join(" ");
}

function buildSentence(wordCount: number) {
  const sentence = buildWords(wordCount).trim();
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function buildParagraph(sentenceCount: number) {
  return Array.from({ length: sentenceCount }, (_, index) => buildSentence(12 + (index % 8))).join(" ");
}

export default function LoremIpsumGeneratorTool() {
  const [mode, setMode] = useState<GenerateMode>("paragraphs");
  const [count, setCount] = useState(3);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const safeCount = Math.max(1, Math.min(count, 50));
    if (mode === "words") return buildWords(safeCount);
    if (mode === "sentences") {
      return Array.from({ length: safeCount }, (_, index) => buildSentence(10 + (index % 10))).join(" ");
    }
    return Array.from({ length: safeCount }, () => buildParagraph(5)).join("\n\n");
  }, [count, mode]);

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lorem-mode" className="block text-sm font-medium text-gray-700 mb-2">
            Generate by
          </label>
          <select
            id="lorem-mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as GenerateMode)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
          </select>
        </div>
        <div>
          <label htmlFor="lorem-count" className="block text-sm font-medium text-gray-700 mb-2">
            Count
          </label>
          <input
            id="lorem-count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(event) => setCount(Number(event.target.value || 1))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-700">Generated Lorem Ipsum</p>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          rows={12}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 resize-y"
          aria-label="Generated lorem ipsum text"
        />
      </div>
    </div>
  );
}
