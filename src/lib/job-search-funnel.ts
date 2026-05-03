import type { JobApplication } from "@/types/tracker";
import { CAREER_HEALTH_ROUTES } from "@/lib/career-health-score";

export type FunnelCounts = {
  applied: number;
  responded: number;
  interviewed: number;
  offered: number;
};

export type FunnelRates = {
  responseRate: number;
  interviewRate: number;
  offerRate: number;
};

export type FunnelInsight = {
  message: string;
  primaryCta: { label: string; href: string } | null;
  secondaryCta: { label: string; href: string } | null;
};

/** Positive engagement past applying: Interview or Offer (excludes Rejected / Ghosted / Applied). */
export function computeFunnelCounts(apps: JobApplication[]): FunnelCounts {
  const applied = apps.length;
  const responded = apps.filter(
    (a) => a.status === "Interview" || a.status === "Offer",
  ).length;
  /** Interview stage only — may be lower than Responded when some rows skip straight to Offer. */
  const interviewed = apps.filter((a) => a.status === "Interview").length;
  const offered = apps.filter((a) => a.status === "Offer").length;
  return { applied, responded, interviewed, offered };
}

export function computeFunnelRates(counts: FunnelCounts): FunnelRates {
  const { applied, responded, interviewed, offered } = counts;
  const responseRate = applied > 0 ? Math.round((responded / applied) * 100) : 0;
  /** Of engaged apps (Interview|Offer), share still marked Interview (vs Offer-only). */
  const interviewRate = responded > 0 ? Math.round((interviewed / responded) * 100) : 0;
  /** Of engaged apps, share that reached Offer. */
  const offerRate = responded > 0 ? Math.round((offered / responded) * 100) : 0;
  return { responseRate, interviewRate, offerRate };
}

export function computeFunnelInsight(
  counts: FunnelCounts,
  rates: FunnelRates,
): FunnelInsight {
  const { applied, responded, interviewed, offered } = counts;
  const { responseRate, offerRate } = rates;

  // Thresholds tuned for responseRate = (Interview|Offer)/applied (Rejections excluded — rates run lower).
  if (responseRate < 10) {
    return {
      message: "Your response rate is low. Your resume may not be passing ATS filters.",
      primaryCta: { label: "Run ATS Checker", href: CAREER_HEALTH_ROUTES.ats },
      secondaryCta: { label: "Generate Cover Letter", href: CAREER_HEALTH_ROUTES.cover },
    };
  }

  // Several interviews logged but no offer yet — interview prep over application docs.
  if (responseRate >= 10 && interviewed >= 2 && offered === 0) {
    return {
      message: "You're interviewing but not converting to offers. Prep more thoroughly.",
      primaryCta: { label: "Generate Interview Questions", href: CAREER_HEALTH_ROUTES.interview },
      secondaryCta: null,
    };
  }

  // Some engagement but weak offer conversion — tailoring & positioning.
  if (responseRate >= 10 && responded >= 2 && offerRate < 20) {
    return {
      message: "You're getting responses but few offers. Tailor your cover letters and positioning.",
      primaryCta: { label: "Generate Cover Letter", href: CAREER_HEALTH_ROUTES.cover },
      secondaryCta: null,
    };
  }

  if (applied < 10) {
    return {
      message: "Low application volume. The more you apply, the better the data.",
      primaryCta: { label: "Track a New Job", href: CAREER_HEALTH_ROUTES.tracker },
      secondaryCta: null,
    };
  }

  return {
    message: "Strong pipeline. Keep applying and following up.",
    primaryCta: null,
    secondaryCta: null,
  };
}
