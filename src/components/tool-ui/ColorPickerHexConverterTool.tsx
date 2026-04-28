"use client";

import { useMemo, useState } from "react";

function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const normalized = cleanHex.length === 3 ? cleanHex.split("").map((c) => `${c}${c}`).join("") : cleanHex;
  const numeric = Number.parseInt(normalized, 16);
  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
  }

  return {
    h: Math.round(h * 60 < 0 ? h * 60 + 360 : h * 60),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorPickerHexConverterTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [copiedKey, setCopiedKey] = useState("");

  const colorValues = useMemo(() => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return {
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    };
  }, [hex]);

  async function copyValue(key: "hex" | "rgb" | "hsl") {
    await navigator.clipboard.writeText(colorValues[key]);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="color-picker" className="block text-sm font-medium text-gray-700 mb-2">
          Pick a color
        </label>
        <div className="flex items-center gap-3">
          <input
            id="color-picker"
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-12 w-16 cursor-pointer rounded border border-gray-300 bg-white p-1"
            aria-label="Select color"
          />
          <input
            type="text"
            value={hex.toUpperCase()}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
                setHex(value.length === 4 ? `#${value.slice(1).toLowerCase()}` : value.toLowerCase());
              }
            }}
            className="w-full sm:w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono"
            placeholder="#3B82F6"
            aria-label="HEX value input"
          />
        </div>
      </div>

      <div className="h-24 rounded-xl border border-gray-200" style={{ backgroundColor: hex }} />

      <div className="space-y-3">
        {(["hex", "rgb", "hsl"] as const).map((key) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">{key}</p>
              <p className="text-sm font-mono text-gray-900">{colorValues[key]}</p>
            </div>
            <button
              onClick={() => copyValue(key)}
              className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-md"
            >
              {copiedKey === key ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
