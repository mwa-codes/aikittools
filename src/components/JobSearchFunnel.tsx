"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { JobApplication } from "@/types/tracker";
import {
  computeFunnelCounts,
  computeFunnelInsight,
  computeFunnelRates,
} from "@/lib/job-search-funnel";
import { CAREER_HEALTH_ROUTES } from "@/lib/career-health-score";

interface JobSearchFunnelProps {
  apps: JobApplication[];
  onTrackNewJob?: () => void;
}

function FunnelBlock({
  label,
  count,
  widthPct,
  mounted,
}: {
  label: string;
  count: number;
  widthPct: number;
  mounted: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-slate-50/80 p-3 flex flex-col min-w-0 flex-1">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="text-2xl font-bold tabular-nums text-gray-900 mt-1">{count}</span>
      <div className="mt-3 h-2.5 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-600 transition-[width] duration-700 ease-out"
          style={{ width: mounted ? `${widthPct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/** Conversion label between two funnel stages (desktop: inline; mobile: centered between stacks). */
function FunnelBetweenPct({ pct }: { pct: number }) {
  return (
    <div
      className="flex flex-col justify-end shrink-0 min-w-18 max-w-24 px-0.5 pb-3"
      aria-label={`${pct}% conversion to next stage`}
    >
      <div className="flex items-center justify-center gap-0.5 whitespace-nowrap">
        <span className="text-slate-400" aria-hidden>
          →
        </span>
        <span className="text-sm font-medium tabular-nums text-blue-800">{pct}%</span>
        <span className="text-slate-400" aria-hidden>
          →
        </span>
      </div>
    </div>
  );
}

function FunnelBetweenPctMobile({ pct }: { pct: number }) {
  return (
    <div
      className="flex justify-center py-1.5"
      aria-label={`${pct}% conversion to next stage`}
    >
      <div className="flex items-center justify-center gap-0.5 whitespace-nowrap">
        <span className="text-slate-400" aria-hidden>
          →
        </span>
        <span className="text-sm font-medium tabular-nums text-blue-800">{pct}%</span>
        <span className="text-slate-400" aria-hidden>
          →
        </span>
      </div>
    </div>
  );
}

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const duration = 600;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return run ? n : 0;
}

export default function JobSearchFunnel({ apps, onTrackNewJob }: JobSearchFunnelProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const counts = useMemo(() => computeFunnelCounts(apps), [apps]);
  const rates = useMemo(() => computeFunnelRates(counts), [counts]);
  const insight = useMemo(() => computeFunnelInsight(counts, rates), [counts, rates]);

  const ghostInsightPct = useMemo(() => {
    const n = apps.length;
    if (n === 0) return null;
    const ghosted = apps.filter((a) => a.status === "Ghosted").length;
    const pct = (ghosted / n) * 100;
    return pct > 40 ? Math.round(pct) : null;
  }, [apps]);

  const applied = counts.applied;
  const denom = applied > 0 ? applied : 1;

  const nApplied = useCountUp(applied, mounted && applied >= 0);
  const nResponded = useCountUp(counts.responded, mounted && applied > 0);
  const nInterviewed = useCountUp(counts.interviewed, mounted && applied > 0);
  const nOffered = useCountUp(counts.offered, mounted && applied > 0);

  const wResponded = Math.min(100, (counts.responded / denom) * 100);
  const wInterviewed = Math.min(100, (counts.interviewed / denom) * 100);
  const wOffered = Math.min(100, (counts.offered / denom) * 100);

  if (applied === 0) {
    return (
      <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Your Job Search Pipeline
        </h2>
        <p className="text-sm text-gray-600">
          Start tracking jobs to see your pipeline.
        </p>
      </section>
    );
  }

  const stageBlocks = [
    { key: "applied", label: "Applied", count: nApplied, widthPct: 100 },
    { key: "responded", label: "Responded", count: nResponded, widthPct: wResponded },
    { key: "interviewed", label: "Interviewed", count: nInterviewed, widthPct: wInterviewed },
    { key: "offered", label: "Offered", count: nOffered, widthPct: wOffered },
  ] as const;

  const betweenPcts = [rates.responseRate, rates.interviewRate, rates.offerRate] as const;

  const primaryIsTracker =
    insight.primaryCta?.href === "/tracker" || insight.primaryCta?.label === "Track a New Job";

  return (
    <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
        Your Job Search Pipeline
      </h2>

      {applied < 5 && (
        <p className="mb-4 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Add more applications for accurate rates.
        </p>
      )}

      <div className="md:hidden space-y-2">
        <FunnelBlock
          label={stageBlocks[0].label}
          count={stageBlocks[0].count}
          widthPct={stageBlocks[0].widthPct}
          mounted={mounted}
        />
        <FunnelBetweenPctMobile pct={betweenPcts[0]} />
        <FunnelBlock
          label={stageBlocks[1].label}
          count={stageBlocks[1].count}
          widthPct={stageBlocks[1].widthPct}
          mounted={mounted}
        />
        <FunnelBetweenPctMobile pct={betweenPcts[1]} />
        <FunnelBlock
          label={stageBlocks[2].label}
          count={stageBlocks[2].count}
          widthPct={stageBlocks[2].widthPct}
          mounted={mounted}
        />
        <FunnelBetweenPctMobile pct={betweenPcts[2]} />
        <FunnelBlock
          label={stageBlocks[3].label}
          count={stageBlocks[3].count}
          widthPct={stageBlocks[3].widthPct}
          mounted={mounted}
        />
      </div>

      <div className="hidden md:flex items-end gap-1 w-full min-w-0">
        <FunnelBlock
          label={stageBlocks[0].label}
          count={stageBlocks[0].count}
          widthPct={stageBlocks[0].widthPct}
          mounted={mounted}
        />
        <FunnelBetweenPct pct={betweenPcts[0]} />
        <FunnelBlock
          label={stageBlocks[1].label}
          count={stageBlocks[1].count}
          widthPct={stageBlocks[1].widthPct}
          mounted={mounted}
        />
        <FunnelBetweenPct pct={betweenPcts[1]} />
        <FunnelBlock
          label={stageBlocks[2].label}
          count={stageBlocks[2].count}
          widthPct={stageBlocks[2].widthPct}
          mounted={mounted}
        />
        <FunnelBetweenPct pct={betweenPcts[2]} />
        <FunnelBlock
          label={stageBlocks[3].label}
          count={stageBlocks[3].count}
          widthPct={stageBlocks[3].widthPct}
          mounted={mounted}
        />
      </div>

      {ghostInsightPct !== null && (
        <div className="mt-5 pt-5 border-t border-slate-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">{ghostInsightPct}%</span> of your
            applications were ghosted — a tailored cover letter
            <br />
            significantly increases your chance of a reply.
          </p>
          <Link
            href={CAREER_HEALTH_ROUTES.cover}
            className="mt-3 inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-gray-800 text-sm font-semibold px-4 py-2 transition-colors"
          >
            Generate Cover Letter →
          </Link>
        </div>
      )}

      <div className="mt-5 flex flex-col sm:flex-row sm:items-start gap-2 text-sm text-gray-700">
        <span className="shrink-0" aria-hidden>
          ⚠
        </span>
        <p className="leading-relaxed">{insight.message}</p>
      </div>

      {(insight.primaryCta || insight.secondaryCta) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {insight.primaryCta &&
            (primaryIsTracker && onTrackNewJob ? (
              <button
                type="button"
                onClick={onTrackNewJob}
                className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 transition-colors"
              >
                {insight.primaryCta.label} →
              </button>
            ) : insight.primaryCta ? (
              <Link
                href={insight.primaryCta.href}
                className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 transition-colors"
              >
                {insight.primaryCta.label} →
              </Link>
            ) : null)}
          {insight.secondaryCta && (
            <Link
              href={insight.secondaryCta.href}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-gray-800 text-sm font-semibold px-4 py-2 transition-colors"
            >
              {insight.secondaryCta.label} →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
