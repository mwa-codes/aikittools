import Link from "next/link";
import { ListChecks, FileText, Send, ArrowRight } from "lucide-react";

/**
 * Visual "workflow loop" (Pillar 1 — cognitive load reduction).
 *
 * Collapses the 6 tools into the ONE mental model a stressed job seeker needs:
 * Track → Optimize → Apply, then repeat. Each step is a real entry point.
 * On desktop the arrows read left-to-right; on mobile it stacks vertically.
 */

const STEPS = [
  {
    n: 1,
    label: "Track",
    title: "Log the job",
    body: "Drop every application into one board. No spreadsheet.",
    href: "/tracker",
    icon: ListChecks,
    accent: "text-blue-600",
    ring: "ring-blue-100",
    bg: "bg-blue-50",
  },
  {
    n: 2,
    label: "Optimize",
    title: "Beat the ATS",
    body: "Check your resume, sharpen your bullets, fix what's flagged.",
    href: "/ats-resume-checker",
    icon: FileText,
    accent: "text-purple-600",
    ring: "ring-purple-100",
    bg: "bg-purple-50",
  },
  {
    n: 3,
    label: "Apply",
    title: "Send it tailored",
    body: "Generate a cover letter for that exact role in seconds.",
    href: "/cover-letter-generator",
    icon: Send,
    accent: "text-emerald-600",
    ring: "ring-emerald-100",
    bg: "bg-emerald-50",
  },
] as const;

export default function WorkflowLoop() {
  return (
    <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={step.n} className="flex flex-col items-stretch gap-3 lg:flex-1 lg:flex-row lg:items-center">
            <Link
              href={step.href}
              className={`group relative flex-1 rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ${step.ring} transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:-translate-y-0.5`}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${step.bg} ${step.accent}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Step {step.n} · {step.label}
                  </p>
                  <p className="text-base font-semibold text-slate-900">{step.title}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.body}</p>
              <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${step.accent} opacity-0 transition group-hover:opacity-100`}>
                Start here <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            {/* Connector arrow — horizontal on desktop, hidden after the last step. */}
            {i < STEPS.length - 1 && (
              <div className="flex items-center justify-center lg:px-1" aria-hidden="true">
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-300 lg:block" />
                <ArrowRight className="h-5 w-5 rotate-90 text-slate-300 lg:hidden" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
