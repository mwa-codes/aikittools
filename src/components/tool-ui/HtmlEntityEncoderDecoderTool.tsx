"use client";

import { useMemo, useState } from "react";

type Mode = "encode" | "decode";

function encodeHtml(value: string) {
  if (!value) return "";
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function decodeHtml(value: string) {
  if (!value) return "";
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

export default function HtmlEntityEncoderDecoderTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => (mode === "encode" ? encodeHtml(input) : decodeHtml(input)),
    [mode, input],
  );

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("encode")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === "encode"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Encode
        </button>
        <button
          type="button"
          onClick={() => setMode("decode")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === "decode"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Decode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="html-entity-input" className="block text-sm font-medium text-gray-700 mb-1">
            {mode === "encode" ? "Plain Text Input" : "HTML Entity Input"}
          </label>
          <textarea
            id="html-entity-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={12}
            placeholder={mode === "encode" ? "<h1>Hello & welcome</h1>" : "&lt;h1&gt;Hello &amp; welcome&lt;/h1&gt;"}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            aria-label="HTML entity encoder decoder input"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="html-entity-output" className="block text-sm font-medium text-gray-700">
              {mode === "encode" ? "Encoded Output" : "Decoded Output"}
            </label>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            id="html-entity-output"
            value={output}
            readOnly
            rows={12}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono bg-gray-50 resize-y"
            aria-label="HTML entity encoder decoder output"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
