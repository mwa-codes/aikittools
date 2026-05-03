const RETRYABLE_STATUS_CODES = new Set([408, 409, 425, 429, 500, 502, 503, 504, 520, 521, 522, 523, 524]);

const RETRYABLE_MESSAGE_PATTERNS = [
  /fetch failed/i,
  /network/i,
  /timed?\s*out/i,
  /load failed/i,
  /gateway/i,
  /temporar/i,
  /unavailable/i,
  /\b52[0-4]\b/,
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") return "";
  const maybeMessage = "message" in error ? error.message : "";
  return typeof maybeMessage === "string" ? maybeMessage : "";
}

function getErrorStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") return null;
  const maybeStatus = "status" in error ? error.status : null;
  return typeof maybeStatus === "number" ? maybeStatus : null;
}

export function isRetryableAuthError(error: unknown): boolean {
  const status = getErrorStatus(error);
  if (status !== null && RETRYABLE_STATUS_CODES.has(status)) {
    return true;
  }

  const message = getErrorMessage(error);
  if (!message) return false;
  return RETRYABLE_MESSAGE_PATTERNS.some((pattern) => pattern.test(message));
}

/** Retries when `error` is non-null and looks transient (e.g. 522 / network). Preserves Supabase response typing. */
export async function withAuthRetry<R extends { data: unknown; error: unknown | null }>(
  operation: () => Promise<R>,
  retries = 2
): Promise<R & { attempts: number }> {
  let attempt = 0;
  let result: R = await operation();

  while (
    attempt < retries &&
    result.error != null &&
    isRetryableAuthError(result.error)
  ) {
    attempt += 1;
    await sleep(400 * 2 ** (attempt - 1));
    result = await operation();
  }

  return {
    ...result,
    attempts: attempt + 1,
  };
}
