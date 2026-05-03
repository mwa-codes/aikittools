import type { JobApplication } from "@/types/tracker";
import type { AktStorageSnapshot } from "@/lib/akt-analytics-storage";

export const CAREER_HEALTH_ROUTES = {
  ats: "/ats-resume-checker",
  cover: "/cover-letter-generator",
  interview: "/interview-question-generator",
  linkedin: "/linkedin-summary-generator",
  bullets: "/resume-bullet-generator",
  tracker: "/tracker",
} as const;

export type SignalId =
  | "ats"
  | "cover"
  | "interviewPrep"
  | "linkedin"
  | "bullets"
  | "responseRate";

export type CareerSignalBreakdown = {
  id: SignalId;
  label: string;
  earned: number;
  max: number;
  complete: boolean;
  href: string;
};

export type CareerTier = {
  label: string;
  message: string;
  ringClass: string;
  labelClass: string;
};

export type CareerHealthResult = {
  total: number;
  tier: CareerTier;
  breakdown: CareerSignalBreakdown[];
  /** Lowest-scoring signal for primary CTA */
  prioritySignal: CareerSignalBreakdown;
};

function atsPoints(snapshot: AktStorageSnapshot): number {
  if (!snapshot.atsUsed) return 0;
  const s = snapshot.atsScore;
  if (s == null) return 10;
  if (s < 50) return 10;
  if (s < 75) return 18;
  return 25;
}

function coverPoints(snapshot: AktStorageSnapshot): number {
  const n = snapshot.coverCount;
  if (n <= 0) return 0;
  if (n === 1) return 10;
  if (n < 5) return 15;
  return 20;
}

function responseRatePercent(apps: JobApplication[]): number {
  const total = apps.length;
  if (total === 0) return 0;
  const progressed = apps.filter((a) => a.status === "Interview" || a.status === "Offer").length;
  return (progressed / total) * 100;
}

function responseRatePoints(percent: number): number {
  if (percent < 10) return 0;
  if (percent < 20) return 8;
  if (percent <= 35) return 12;
  return 15;
}

function tierForScore(score: number): CareerTier {
  if (score <= 25) {
    return {
      label: "Not Started",
      message: "Set up your resume first — run the ATS Checker",
      ringClass: "text-slate-400",
      labelClass: "text-slate-600",
    };
  }
  if (score <= 45) {
    return {
      label: "Getting Going",
      message: "Your resume may be filtered before humans see it",
      ringClass: "text-orange-500",
      labelClass: "text-orange-700",
    };
  }
  if (score <= 65) {
    return {
      label: "Building Up",
      message: "Apply with tailored cover letters, not generic ones",
      ringClass: "text-amber-500",
      labelClass: "text-amber-800",
    };
  }
  if (score <= 80) {
    return {
      label: "On Track",
      message: "Prep for interviews before they happen",
      ringClass: "text-blue-600",
      labelClass: "text-blue-800",
    };
  }
  return {
    label: "Job Ready",
    message: "Strong profile. Focus on volume and follow-ups",
    ringClass: "text-green-600",
    labelClass: "text-green-800",
  };
}

const SIGNAL_ORDER: SignalId[] = [
  "ats",
  "cover",
  "interviewPrep",
  "linkedin",
  "bullets",
  "responseRate",
];

export function computeCareerHealth(
  snapshot: AktStorageSnapshot,
  apps: JobApplication[],
): CareerHealthResult {
  const rrPct = responseRatePercent(apps);

  const atsEarned = atsPoints(snapshot);
  const coverEarned = coverPoints(snapshot);
  const interviewEarned = snapshot.interviewPrep ? 20 : 0;
  const linkedinEarned = snapshot.linkedin ? 10 : 0;
  const bulletsEarned = snapshot.bullets ? 10 : 0;
  const rrEarned = apps.length === 0 ? 0 : responseRatePoints(rrPct);

  const breakdown: CareerSignalBreakdown[] = [
    {
      id: "ats",
      label: "ATS Check",
      earned: atsEarned,
      max: 25,
      complete: atsEarned >= 25,
      href: CAREER_HEALTH_ROUTES.ats,
    },
    {
      id: "cover",
      label: "Cover Letters",
      earned: coverEarned,
      max: 20,
      complete: coverEarned >= 20,
      href: CAREER_HEALTH_ROUTES.cover,
    },
    {
      id: "interviewPrep",
      label: "Interview Prep",
      earned: interviewEarned,
      max: 20,
      complete: interviewEarned >= 20,
      href: CAREER_HEALTH_ROUTES.interview,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      earned: linkedinEarned,
      max: 10,
      complete: linkedinEarned >= 10,
      href: CAREER_HEALTH_ROUTES.linkedin,
    },
    {
      id: "bullets",
      label: "Resume Bullets",
      earned: bulletsEarned,
      max: 10,
      complete: bulletsEarned >= 10,
      href: CAREER_HEALTH_ROUTES.bullets,
    },
    {
      id: "responseRate",
      label: "Response Rate",
      earned: rrEarned,
      max: 15,
      complete: rrEarned >= 15,
      href: CAREER_HEALTH_ROUTES.ats,
    },
  ];

  const total = breakdown.reduce((sum, b) => sum + b.earned, 0);
  const tier = tierForScore(total);

  let prioritySignal = breakdown[0];
  let lowestRatio = Infinity;
  let lowestEarned = Infinity;
  for (const id of SIGNAL_ORDER) {
    const row = breakdown.find((b) => b.id === id)!;
    const ratio = row.max > 0 ? row.earned / row.max : 1;
    if (ratio < lowestRatio || (ratio === lowestRatio && row.earned < lowestEarned)) {
      lowestRatio = ratio;
      lowestEarned = row.earned;
      prioritySignal = row;
    }
  }

  return { total: Math.min(100, total), tier, breakdown, prioritySignal };
}

export function careerHealthCtaLabel(signal: CareerSignalBreakdown): string {
  const labels: Record<SignalId, string> = {
    ats: "Run ATS Checker",
    cover: "Generate Cover Letter",
    interviewPrep: "Prep Interview Questions",
    linkedin: "Generate LinkedIn Summary",
    bullets: "Generate Resume Bullets",
    responseRate: "Improve Response Rate (ATS Check)",
  };
  return labels[signal.id];
}
