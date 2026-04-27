"use client";

import { useState } from "react";

type FormatMode = "format" | "minify";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<FormatMode>("format");

  function processJson(raw: string, currentMode: FormatMode) {
    if (!raw.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (currentMode === "format") {
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        setOutput(JSON.stringify(parsed));
      }
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function handleFormat(selectedMode: FormatMode) {
    setMode(selectedMode);
    processJson(input, selectedMode);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleFormat("format")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === "format"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Format / Beautify
        </button>
        <button
          onClick={() => handleFormat("minify")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === "minify"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Minify
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-1">
            Input JSON
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              processJson(e.target.value, mode);
            }}
            rows={14}
            placeholder='{"key": "value", "array": [1, 2, 3]}'
            className={`w-full border rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y ${
              error ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
            aria-label="JSON input"
            spellCheck={false}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              <strong>Error:</strong> {error}
            </p>
          )}
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              {mode === "format" ? "Formatted Output" : "Minified Output"}
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <pre className="w-full h-[316px] overflow-auto border border-gray-300 rounded-lg p-3 text-sm font-mono bg-gray-50 whitespace-pre-wrap break-all">
            {output || (
              <span className="text-gray-400 italic">Output will appear here…</span>
            )}
          </pre>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          disabled={!input && !output}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
