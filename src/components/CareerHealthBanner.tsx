"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AKT_KEYS, readAktStorageSnapshot } from "@/lib/akt-analytics-storage";
import { careerHealthCtaLabel, computeCareerHealth } from "@/lib/career-health-score";
import { GUEST_STORAGE_KEY, type JobApplication } from "@/types/tracker";

const BANNER_DISMISSED_KEY = "akt_banner_dismissed";
const BANNER_SCORE_AT_DISMISS_KEY = "akt_last_score";

const R = 52;
const C = 2 * Math.PI * R;

function readGuestApps(): JobApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GUEST_STORAGE_KEY);
    if (raw == null || raw === "") return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as JobApplication[]) : [];
  } catch {
    return [];
  }
}

/** True if any listed akt_* key exists with a non-empty value, or guest tracker has ≥1 app. */
function hasReturningUserActivity(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const aktKeys: readonly string[] = [
      AKT_KEYS.ATS_USED,
      AKT_KEYS.COVER_COUNT,
      AKT_KEYS.INTERVIEW_PREP,
      AKT_KEYS.LINKEDIN,
      AKT_KEYS.BULLETS,
    ];
    for (const key of aktKeys) {
      const v = window.localStorage.getItem(key);
      if (v != null && v !== "") return true;
    }
    return readGuestApps().length > 0;
  } catch {
    return false;
  }
}

function tierBorderClass(score: number): string {
  if (score <= 25) return "border-l-slate-400";
  if (score <= 45) return "border-l-orange-500";
  if (score <= 65) return "border-l-amber-500";
  if (score <= 80) return "border-l-blue-600";
  return "border-l-green-600";
}

export default function CareerHealthBanner() {
  const [mounted, setMounted] = useState(false);
  const [guestApps, setGuestApps] = useState<JobApplication[]>([]);
  const [snapshot, setSnapshot] = useState(() => readAktStorageSnapshot());
  const [dismissed, setDismissed] = useState(false);
  const [showScoreImproved, setShowScoreImproved] = useState(false);

  const refresh = useCallback(() => {
    const apps = readGuestApps();
    const snap = readAktStorageSnapshot();
    setGuestApps(apps);
    setSnapshot(snap);
    try {
      setDismissed(window.localStorage.getItem(BANNER_DISMISSED_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    const init = () => {
      setMounted(true);
      const apps = readGuestApps();
      const snap = readAktStorageSnapshot();
      const healthNow = computeCareerHealth(snap, apps);
      const current = healthNow.total;
      let improved = false;
      try {
        const wasDismissed = window.localStorage.getItem(BANNER_DISMISSED_KEY) === "true";
        const rawLast = window.localStorage.getItem(BANNER_SCORE_AT_DISMISS_KEY);
        const lastAtDismiss =
          rawLast != null && rawLast !== "" ? Number.parseInt(rawLast, 10) : NaN;
        if (
          wasDismissed &&
          Number.isFinite(lastAtDismiss) &&
          current > lastAtDismiss
        ) {
          window.localStorage.removeItem(BANNER_DISMISSED_KEY);
          improved = true;
        }
      } catch {
        /* ignore */
      }
      setGuestApps(apps);
      setSnapshot(snap);
      try {
        setDismissed(window.localStorage.getItem(BANNER_DISMISSED_KEY) === "true");
      } catch {
        setDismissed(false);
      }
      setShowScoreImproved(improved);
    };
    const frame = requestAnimationFrame(init);
    const onFocus = () => refresh();
    const onStorage = (e: StorageEvent) => {
      if (
        e.key == null ||
        e.key.startsWith("akt_") ||
        e.key === GUEST_STORAGE_KEY
      ) {
        refresh();
      }
    };
    const onAkt = () => refresh();
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    window.addEventListener("akt-tools-updated", onAkt);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("akt-tools-updated", onAkt);
    };
  }, [refresh]);

  const health = computeCareerHealth(snapshot, guestApps);

  const insight = careerHealthCtaLabel(health.prioritySignal);

  const handleDismiss = useCallback(() => {
    try {
      window.localStorage.setItem(BANNER_DISMISSED_KEY, "true");
      window.localStorage.setItem(BANNER_SCORE_AT_DISMISS_KEY, String(health.total));
    } catch {
      /* ignore */
    }
    setDismissed(true);
    setShowScoreImproved(false);
  }, [health.total]);

  if (!mounted) return null;

  if (hasReturningUserActivity()) {
    if (dismissed && !showScoreImproved) return null;

    const score = health.total;
    const dashOffset = C - (C * score) / 100;
    const borderAccent = tierBorderClass(score);

    return (
      <section
        className={`mb-10 sm:mb-12 rounded-2xl border border-slate-200 border-l-4 ${borderAccent} bg-slate-50 px-4 py-5 sm:px-6 sm:py-6 shadow-sm`}
        aria-label="Career health summary"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4 min-w-0">
            <div className="flex items-center gap-4 shrink-0">
              <div className="relative h-12 w-12 shrink-0">
                <svg
                  className="h-12 w-12 -rotate-90"
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
                    strokeDashoffset={dashOffset}
                    className={`transition-[stroke-dashoffset] duration-700 ease-out ${health.tier.ringClass}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold tabular-nums text-gray-900">{score}</span>
                </div>
              </div>
              <div className="min-w-0">
                {!showScoreImproved && (
                  <p className="text-sm sm:text-base font-medium text-gray-900">
                    Welcome back. Your Career Health Score:
                  </p>
                )}
                <p className={`text-sm font-semibold ${health.tier.labelClass}`}>
                  {health.tier.label}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 sm:flex-1 sm:min-w-0 sm:border-l sm:border-slate-200 sm:pl-6">
              <span className="text-gray-700">&ldquo;</span>
              {insight}
              <span className="text-gray-700">&rdquo;</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-stretch sm:shrink-0 sm:min-w-[200px]">
            <Link
              href="/tracker"
              className="inline-flex flex-1 sm:flex-none items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              {showScoreImproved
                ? "Your score improved! View your updated dashboard →"
                : "View Full Dashboard →"}
            </Link>
            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              aria-label="Dismiss banner"
            >
              Dismiss <span aria-hidden>✕</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mb-10 sm:mb-12 rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 px-4 py-6 sm:px-8 sm:py-8 shadow-sm"
      aria-label="Career Health Score"
    >
      <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        Are you job-ready?
      </h2>
      <p className="text-center text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
        Most job seekers apply blindly. Career Health Score shows you exactly what&apos;s broken and
        what to fix first.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 max-w-4xl mx-auto">
        {[
          { title: "Resume", sub: "Score", pts: "/25 pts" },
          { title: "Cover", sub: "Letters", pts: "/20 pts" },
          { title: "Interview", sub: "Prep", pts: "/20 pts" },
          { title: "Response", sub: "Rate", pts: "/15 pts" },
        ].map((card) => (
          <div
            key={card.title + card.sub}
            className="rounded-xl border border-slate-200 bg-white/90 px-3 py-3 sm:px-4 sm:py-4 text-center shadow-sm animate-pulse [animation-duration:3s]"
          >
            <div className="text-xs sm:text-sm font-semibold text-gray-800">
              {card.title}
              <br />
              {card.sub}
            </div>
            <div className="mt-2 text-[11px] sm:text-xs text-slate-500 tabular-nums">{card.pts}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/tracker"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          Check Your Career Health — Free →
        </Link>
      </div>
    </section>
  );
}
