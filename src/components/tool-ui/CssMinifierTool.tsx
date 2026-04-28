"use client";

import { useState } from "react";

function minifyCss(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export default function CssMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function handleMinify() {
    setOutput(minifyCss(input));
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="css-minifier-input" className="block text-sm font-medium text-gray-700 mb-1">
            Input CSS
          </label>
          <textarea
            id="css-minifier-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={14}
            placeholder=".container { padding: 16px; margin: 0 auto; }"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            aria-label="CSS input"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="css-minifier-output" className="block text-sm font-medium text-gray-700">
              Minified CSS
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
            id="css-minifier-output"
            value={output}
            readOnly
            rows={14}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono bg-gray-50 resize-y"
            aria-label="Minified CSS output"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleMinify}
          disabled={!input.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          Minify CSS
        </button>
        <button
          type="button"
          onClick={() => {
            setInput("");
            setOutput("");
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
