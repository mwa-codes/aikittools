"use client";

import { useMemo, useState } from "react";

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function randomChar(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function shuffle(input: string) {
  const arr = input.split("");
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export default function RandomPasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedGroups = useMemo(() => {
    const groups: string[] = [];
    if (useUppercase) groups.push(UPPERCASE_CHARS);
    if (useLowercase) groups.push(LOWERCASE_CHARS);
    if (useNumbers) groups.push(NUMBER_CHARS);
    if (useSymbols) groups.push(SYMBOL_CHARS);
    return groups;
  }, [useUppercase, useLowercase, useNumbers, useSymbols]);

  const canGenerate = selectedGroups.length > 0;

  function generatePassword() {
    if (!canGenerate) return;

    const allChars = selectedGroups.join("");
    const requiredChars = selectedGroups.map((group) => randomChar(group));
    const remainingLength = Math.max(0, length - requiredChars.length);

    let generated = requiredChars.join("");
    for (let i = 0; i < remainingLength; i += 1) {
      generated += randomChar(allChars);
    }

    setPassword(shuffle(generated));
    setCopied(false);
  }

  async function copyPassword() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="password-length" className="block text-sm font-medium text-gray-700 mb-1">
          Password length: {length}
        </label>
        <input
          id="password-length"
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
            className="accent-blue-600"
          />
          Include uppercase (A-Z)
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={useLowercase}
            onChange={(e) => setUseLowercase(e.target.checked)}
            className="accent-blue-600"
          />
          Include lowercase (a-z)
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
            className="accent-blue-600"
          />
          Include numbers (0-9)
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            className="accent-blue-600"
          />
          Include symbols (!@#$...)
        </label>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <label htmlFor="generated-password" className="block text-sm font-medium text-gray-700 mb-2">
          Generated password
        </label>
        <input
          id="generated-password"
          type="text"
          readOnly
          value={password}
          placeholder="Click generate to create a strong password"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-mono text-gray-800"
        />
      </div>

      {!canGenerate && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          Select at least one character type to generate a password.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={generatePassword}
          disabled={!canGenerate}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          Generate Password
        </button>
        <button
          onClick={copyPassword}
          disabled={!password}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
}
