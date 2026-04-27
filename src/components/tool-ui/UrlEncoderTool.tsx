"use client";

import { useState } from "react";

type Mode = "encode" | "decode";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);

  function process(text: string, currentMode: Mode) {
    if (!text.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      if (currentMode === "encode") {
        setOutput(encodeURIComponent(text));
        setError("");
      } else {
        setOutput(decodeURIComponent(text.trim()));
        setError("");
      }
    } catch {
      setError(
        currentMode === "decode"
          ? "Invalid URL-encoded string. Ensure the input is a properly percent-encoded URL component."
          : "Unable to encode input."
      );
      setOutput("");
    }
  }

  function handleModeChange(newMode: Mode) {
    setMode(newMode);
    process(input, newMode);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSwap() {
    if (!output) return;
    const newInput = output;
    const newMode: Mode = mode === "encode" ? "decode" : "encode";
    setInput(newInput);
    setMode(newMode);
    process(newInput, newMode);
  }

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleModeChange("encode")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === "encode" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Encode URL
        </button>
        <button
          onClick={() => handleModeChange("decode")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === "decode" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Decode URL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-1">
            {mode === "encode" ? "Plain Text or URL" : "Encoded URL"}
          </label>
          <textarea
            id="url-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              process(e.target.value, mode);
            }}
            rows={10}
            placeholder={
              mode === "encode"
                ? "https://example.com/search?q=hello world&lang=en"
                : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
            }
            className={`w-full border rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y ${
              error ? "border-red-400 bg-red-50" : "border-gray-300"
            }`}
            spellCheck={false}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              {mode === "encode" ? "Encoded Output" : "Decoded URL"}
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
          <pre className="w-full h-[234px] overflow-auto border border-gray-300 rounded-lg p-3 text-sm font-mono bg-gray-50 whitespace-pre-wrap break-all">
            {output || <span className="text-gray-400 italic">Output will appear here…</span>}
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
        <button
          onClick={handleSwap}
          disabled={!output}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          ⇄ Swap & Reverse
        </button>
      </div>
    </div>
  );
}
