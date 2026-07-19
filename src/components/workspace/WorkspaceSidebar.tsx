"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { careerNavItems } from "@/lib/navigation";

/**
 * Unified Workspace rail (Pillar 2).
 *
 * One persistent panel that lists every tool in the suite so the 6 standalone
 * tools read as a single workspace, not scattered pages. The Tracker is pinned
 * at the top as the "home base" of the loop (Track → Optimize → Apply).
 *
 * Layout:
 *   - Desktop (lg+): sticky vertical rail on the left.
 *   - Mobile: horizontal, snap-scrolling pill strip above the content.
 *
 * Active state is derived from the pathname so the user always knows where they
 * are in the workspace.
 */

// Tracker is the hub; the rest are the "assets" you generate around it.
const TRACKER = careerNavItems.find((t) => t.href === "/tracker")!;
const TOOLS = careerNavItems.filter((t) => t.href !== "/tracker");

export default function WorkspaceSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href;
  }

  const TrackerIcon = TRACKER.icon;

  return (
    <aside
      aria-label="Workspace navigation"
      className="lg:sticky lg:top-20 lg:h-fit lg:w-60 lg:shrink-0"
    >
      {/* Mobile: horizontal scroll strip. Desktop: vertical panel. */}
      <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:p-3">
        <p className="hidden px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:block">
          Workspace
        </p>

        <div className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
          {/* Tracker — pinned hub */}
          <Link
            href={TRACKER.href}
            aria-current={isActive(TRACKER.href) ? "page" : undefined}
            className={`group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors lg:shrink ${
              isActive(TRACKER.href)
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <TrackerIcon className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap lg:whitespace-normal">Job Tracker</span>
          </Link>

          {/* Divider between hub and tools (desktop only) */}
          <div className="my-1 hidden h-px bg-slate-100 lg:block" aria-hidden="true" />

          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const active = isActive(tool.href);
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                aria-current={active ? "page" : undefined}
                className={`group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors lg:shrink ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${active ? "" : "text-slate-400 group-hover:text-blue-600"}`}
                />
                <span className="whitespace-nowrap lg:whitespace-normal">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Contextual nudge — only on desktop, keeps the loop top-of-mind. */}
      <div className="mt-3 hidden rounded-2xl border border-blue-100 bg-blue-50 p-4 lg:block">
        <p className="text-sm font-semibold text-slate-900">Work the loop</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          Track a job, optimize your resume, then generate a tailored cover letter — all from here.
        </p>
      </div>
    </aside>
  );
}
