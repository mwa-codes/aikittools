/**
 * Lightweight per-visitor daily rate limiter (MVP).
 *
 * Uses an httpOnly cookie that stores a per-key count and the UTC date it was
 * last reset. When the date rolls over, the count resets to zero.
 *
 * KNOWN LIMITATION: a cookie-based limiter is bypassable by clearing cookies or
 * using incognito/another browser. That's an accepted trade-off for the MVP —
 * the per-request AI cost is a fraction of a cent, so this only needs to stop
 * casual repeat-hammering and accidental loops, not a determined abuser.
 *
 * This is the seam for Task #2: swap the internals here for a robust IP- or
 * user-scoped limiter (Supabase / Upstash) and every caller keeps working.
 */

import { cookies } from "next/headers";

/**
 * Generous default daily cap for the free AI tools. High enough that a normal
 * user never notices it, low enough to stop runaway loops / casual abuse from
 * running up the OpenAI bill. Tune here in one place.
 */
export const DAILY_TOOL_LIMIT = 30;

export interface RateLimitResult {
  /** True when the caller is allowed to proceed. */
  allowed: boolean;
  /** Remaining checks after this one (0 when blocked). */
  remaining: number;
  /** The configured daily limit. */
  limit: number;
}

/** Current UTC date as YYYY-MM-DD (day boundary for the reset). */
function utcDateStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Consume one unit against `key`'s daily budget.
 *
 * Reads the current count from the cookie, and — if under the limit —
 * increments and writes it back. Must be called from a Route Handler or Server
 * Action (it writes a cookie via the async `cookies()` API).
 */
export async function consumeDailyLimit(
  key: string,
  limit: number,
): Promise<RateLimitResult> {
  const cookieStore = await cookies();
  const cookieName = `akt_rl_${key}`;
  const today = utcDateStamp();

  let count = 0;
  const existing = cookieStore.get(cookieName)?.value;
  if (existing) {
    // Stored as "YYYY-MM-DD:count". Ignore stale/malformed values.
    const [date, rawCount] = existing.split(":");
    if (date === today) {
      const parsed = Number.parseInt(rawCount ?? "", 10);
      count = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
  }

  if (count >= limit) {
    return { allowed: false, remaining: 0, limit };
  }

  const nextCount = count + 1;
  cookieStore.set(cookieName, `${today}:${nextCount}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { allowed: true, remaining: Math.max(0, limit - nextCount), limit };
}
