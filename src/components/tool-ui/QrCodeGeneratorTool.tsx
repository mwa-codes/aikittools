"use client";

import { useState, useCallback } from "react";
import QRCode from "qrcode";

export default function QrCodeGeneratorTool() {
  const [input, setInput] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [size, setSize] = useState(256);

  const generate = useCallback(
    async (text: string, qrSize: number) => {
      if (!text.trim()) {
        setQrDataUrl("");
        setError("");
        return;
      }
      setIsGenerating(true);
      try {
        const dataUrl = await QRCode.toDataURL(text, {
          width: qrSize,
          margin: 2,
          color: { dark: "#111827", light: "#ffffff" },
          errorCorrectionLevel: "M",
        });
        setQrDataUrl(dataUrl);
        setError("");
      } catch {
        setError("Failed to generate QR code. Please check your input.");
        setQrDataUrl("");
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  function handleGenerate() {
    generate(input, size);
  }

  function handleDownload() {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "qrcode-aikittools.png";
    link.click();
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-1">
              Text or URL
            </label>
            <textarea
              id="qr-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              placeholder="Enter a URL, phone number, email, or any text..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label htmlFor="qr-size" className="block text-sm font-medium text-gray-700 mb-1">
              Size: {size}×{size} px
            </label>
            <input
              id="qr-size"
              type="range"
              min={128}
              max={512}
              step={64}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>128px</span>
              <span>512px</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {isGenerating ? "Generating…" : "Generate QR Code"}
          </button>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}
        </div>

        {/* QR Output */}
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-6 min-h-[280px]">
          {qrDataUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="Generated QR code"
                width={size}
                height={size}
                className="rounded-lg shadow-sm max-w-full"
              />
              <button
                onClick={handleDownload}
                className="mt-4 px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                ↓ Download PNG
              </button>
            </>
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-5xl mb-3">📱</div>
              <p className="text-sm">Your QR code will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
