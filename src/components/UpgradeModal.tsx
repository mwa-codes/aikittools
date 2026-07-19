"use client";

import { useEffect } from "react";
import { X, Sparkles, Check } from "lucide-react";
import { ACTION_LABELS, FREE_LIMITS, type MeteredAction } from "@/lib/usage-limits";

/**
 * "Upgrade to Pro" modal (Pillar 3).
 *
 * Purely presentational + provider-agnostic. It triggers when a free user hits
 * a metered limit. The primary CTA calls `onUpgrade` — wire that to your
 * checkout provider later (Stripe Checkout redirect, Lemon Squeezy overlay,
 * etc.). Until then it can point at a waitlist / mailto so the funnel still
 * captures intent.
 */

interface UpgradeModalProps {
  action: MeteredAction;
  open: boolean;
  onClose: () => void;
  /** Wire to checkout when ready. If omitted, the CTA is disabled with a hint. */
  onUpgrade?: () => void;
}

const PRO_BENEFITS = [
  "Unlimited AI generations across every tool",
  "Priority AI model — faster, higher-quality output",
  "Save & reuse cover letters and prep sets",
  "No usage counters, ever",
];

export default function UpgradeModal({ action, open, onClose, onUpgrade }: UpgradeModalProps) {
  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const label = ACTION_LABELS[action];
  const limit = FREE_LIMITS[action];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className="bg-linear-to-br from-purple-600 to-blue-600 px-6 py-6 text-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-white/90">
              AI Kit Pro
            </span>
          </div>
          <h2 id="upgrade-modal-title" className="mt-3 text-xl font-bold leading-snug">
            You&apos;ve used all {limit} free {label}s
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Upgrade to keep generating — unlimited, across every tool.
          </p>
        </div>

        {/* Benefits */}
        <div className="px-6 py-5">
          <ul className="space-y-2.5">
            {PRO_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onUpgrade}
            disabled={!onUpgrade}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            {onUpgrade ? "Upgrade to Pro" : "Checkout coming soon"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          >
            Maybe later
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            Your free work is saved. Upgrading only removes the generation cap.
          </p>
        </div>
      </div>
    </div>
  );
}
