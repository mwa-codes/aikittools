"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { JobApplication } from "@/types/tracker";
import {
  readAktStorageSnapshot,
  resetAktStorage,
  type AktStorageSnapshot,
} from "@/lib/akt-analytics-storage";
import {
  careerHealthCtaLabel,
  computeCareerHealth,
} from "@/lib/career-health-score";

const R = 52;
const C = 2 * Math.PI * R;

interface CareerHealthScoreProps {
  apps: JobApplication[];
}

export default function CareerHealthScore({ apps }: CareerHealthScoreProps) {
  const [snapshot, setSnapshot] = useState<AktStorageSnapshot>(() => readAktStorageSnapshot());
  const [mounted, setMounted] = useState(false);
  const [expandDetails, setExpandDetails] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const refreshSnapshot = useCallback(() => {
    setSnapshot(readAktStorageSnapshot());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (!cancelled) {
        setMounted(true);
        refreshSnapshot();
      }
    });
    const onFocus = () => refreshSnapshot();
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("akt_")) refreshSnapshot();
    };
    const onAkt = () => refreshSnapshot();
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    window.addEventListener("akt-tools-updated", onAkt);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("akt-tools-updated", onAkt);
    };
  }, [refreshSnapshot]);

  const health = useMemo(
    () => computeCareerHealth(snapshot, apps),
    [snapshot, apps],
  );

  const score = health.total;
  const dashOffset = C - (C * score) / 100;
  const ctaLabel = `Improve Your Score: ${careerHealthCtaLabel(health.prioritySignal)}`;

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetAktStorage();
    setConfirmReset(false);
    refreshSnapshot();
  }

  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-4 sm:p-6 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
        Your Career Health
      </h2>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex flex-col items-center shrink-0 mx-auto md:mx-0">
          <div className="relative w-[132px] h-[132px]">
            <svg
              className="w-[132px] h-[132px] -rotate-90"
              viewBox="0 0 120 120"
              aria-hidden
            >
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-100"
              />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={mounted ? dashOffset : C}
                className={`transition-[stroke-dashoffset] duration-1000 ease-out ${health.tier.ringClass}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold tabular-nums text-gray-900">{score}</span>
            </div>
          </div>
          <p className={`mt-2 text-sm font-semibold ${health.tier.labelClass}`}>
            {health.tier.label}
          </p>
          <p className="mt-1 text-center text-sm text-gray-600 max-w-[240px] md:max-w-none">
            {health.tier.message}
          </p>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div
            className={`space-y-3 ${expandDetails ? "block" : "hidden md:block"}`}
          >
            {health.breakdown.map((row, i) => {
              const pct = row.max > 0 ? (row.earned / row.max) * 100 : 0;
              const done = row.earned >= row.max;
              return (
                <div key={row.id} className="flex items-center gap-3 text-sm">
                  <span className="w-[108px] shrink-0 text-gray-700">{row.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden min-w-0">
                    <div
                      className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                        row.complete
                          ? "bg-green-500"
                          : row.earned > 0
                          ? "bg-blue-600"
                          : "bg-slate-300"
                      }`}
                      style={{
                        width: mounted ? `${pct}%` : "0%",
                        transitionDelay: mounted ? `${i * 100}ms` : "0ms",
                      }}
                    />
                  </div>
                  <span className="w-14 shrink-0 tabular-nums text-right text-gray-600">
                    {row.earned}/{row.max}
                  </span>
                  {done ? (
                    <span className="w-6 shrink-0 text-green-600 text-center" aria-label="Complete">
                      ✓
                    </span>
                  ) : (
                    <Link
                      href={row.href}
                      className="w-6 shrink-0 text-center text-blue-600 hover:text-blue-800 font-semibold"
                      aria-label={`Go to ${row.label}`}
                    >
                      →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="mt-4 md:hidden w-full text-sm font-medium text-blue-600 hover:text-blue-800 py-2 rounded-lg border border-slate-200 bg-white/80"
            onClick={() => setExpandDetails((v) => !v)}
            aria-expanded={expandDetails}
          >
            {expandDetails ? "Hide details" : "Show breakdown"}
          </button>

          <Link
            href={health.prioritySignal.href}
            className="mt-4 inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            → {ctaLabel}
          </Link>
        </div>
      </div>
      {/* Reset row */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          {confirmReset
            ? "This will clear all tool usage tracking. Are you sure?"
            : "Used all tools? Reset to track a fresh job search."}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          {confirmReset && (
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleReset}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
              confirmReset
                ? "border-red-300 text-red-600 hover:bg-red-50"
                : "border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {confirmReset ? "Yes, reset score" : "Reset score"}
          </button>
        </div>
      </div>
    </section>
  );
}
