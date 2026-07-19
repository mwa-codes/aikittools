/**
 * Provider-agnostic freemium gating.
 *
 * This is the single source of truth for "what is free" and "how much is free".
 * It deliberately does NOT know about Stripe / Lemon Squeezy / Paddle — it only
 * answers two questions:
 *   1. How many times has this browser used a metered AI action? (localStorage meter)
 *   2. Is this browser "Pro"? (a flag any checkout provider can flip after payment)
 *
 * When you wire up checkout later, the ONLY integration point is `markPro()` —
 * call it from your post-payment webhook handler / success redirect. Everything
 * else (limits, modal triggers, gating) already works against this file.
 */

export type MeteredAction =
  | "cover-letter"
  | "followup-email"
  | "interview-prep"
  | "ats-check"
  | "resume-bullets"
  | "linkedin-summary";

/** Free-tier ceiling per metered action, per browser, lifetime (until they go Pro). */
export const FREE_LIMITS: Record<MeteredAction, number> = {
  "cover-letter": 3,
  "followup-email": 3,
  "interview-prep": 3,
  "ats-check": 3,
  "resume-bullets": 3,
  "linkedin-summary": 3,
};

const USAGE_KEY_PREFIX = "akt_usage_";
const PRO_KEY = "akt_pro";

export const ACTION_LABELS: Record<MeteredAction, string> = {
  "cover-letter": "cover letter",
  "followup-email": "follow-up email",
  "interview-prep": "interview prep set",
  "ats-check": "ATS check",
  "resume-bullets": "resume bullet set",
  "linkedin-summary": "LinkedIn summary",
};

function usageKey(action: MeteredAction): string {
  return `${USAGE_KEY_PREFIX}${action}`;
}

/** True once the user has paid. Flip this from your checkout provider's success handler. */
export function isPro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(PRO_KEY) === "true";
  } catch {
    return false;
  }
}

/** Call this from your post-payment webhook / success redirect once checkout lands. */
export function markPro(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PRO_KEY, "true");
    window.dispatchEvent(new CustomEvent("akt-usage-updated"));
  } catch {
    /* ignore */
  }
}

export function getUsage(action: MeteredAction): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(usageKey(action));
    const n = raw != null ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function getRemaining(action: MeteredAction): number {
  if (isPro()) return Number.POSITIVE_INFINITY;
  return Math.max(0, FREE_LIMITS[action] - getUsage(action));
}

/** Check BEFORE running a generation. Returns whether it's allowed to proceed. */
export function canUse(action: MeteredAction): boolean {
  return isPro() || getUsage(action) < FREE_LIMITS[action];
}

/** Record a successful generation AFTER it completes. Returns the new usage count. */
export function recordUse(action: MeteredAction): number {
  if (typeof window === "undefined") return 0;
  if (isPro()) return 0;
  try {
    const next = getUsage(action) + 1;
    window.localStorage.setItem(usageKey(action), String(next));
    window.dispatchEvent(new CustomEvent("akt-usage-updated"));
    return next;
  } catch {
    return 0;
  }
}
