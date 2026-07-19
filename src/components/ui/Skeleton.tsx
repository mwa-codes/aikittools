"use client";

/**
 * Loading skeleton primitives (Pillar 4).
 *
 * `Skeleton` is a single shimmering bar. `GenerationSkeleton` composes several
 * into a document-shaped placeholder for AI text output, so the layout doesn't
 * jump when the real content streams in.
 *
 * Shimmer keyframes live in globals.css and are disabled under
 * prefers-reduced-motion.
 */

interface SkeletonProps {
  className?: string;
}

const SHIMMER =
  "bg-[linear-gradient(90deg,var(--color-slate-200)_25%,var(--color-slate-100)_37%,var(--color-slate-200)_63%)] bg-[length:200%_100%] animate-shimmer";

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`rounded-md ${SHIMMER} ${className}`} aria-hidden="true" />;
}

/** Document-shaped placeholder for AI text generation states. */
export function GenerationSkeleton({ lines = 6 }: { lines?: number }) {
  return (
    <div
      className="p-4 rounded-lg border border-slate-200 bg-white animate-fade-in"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Generating your result…</span>
      <Skeleton className="h-4 w-1/3 mb-4" />
      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-3.5"
            // last line of each "paragraph" is short, for a natural text look
          />
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-7 w-24" />
      </div>
    </div>
  );
}
