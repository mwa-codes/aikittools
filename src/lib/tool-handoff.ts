/**
 * Tool handoff bridge (Pillar 2 — friction elimination).
 *
 * Lets the Job Tracker push a specific application into any standalone tool
 * with a single click. The tracker writes a small payload to sessionStorage and
 * navigates to the tool; the tool reads + clears it on mount and prefills its
 * form.
 *
 * Why sessionStorage instead of query params:
 *   - Job descriptions / notes are long and messy — ugly and length-capped in a URL.
 *   - Tool pages are statically rendered; reading `useSearchParams` would force
 *     a Suspense boundary on every tool. sessionStorage keeps them static.
 *   - It's per-tab and ephemeral, so a shared link never carries someone's data.
 */

export interface ToolHandoff {
  jobTitle?: string;
  company?: string;
  jobDescription?: string;
  experience?: string;
  /** Where the handoff came from, for optional "← back to tracker" affordances. */
  source?: "tracker";
}

const HANDOFF_KEY = "akt_tool_handoff";

/** Called by the tracker right before navigating to a tool. */
export function setHandoff(payload: ToolHandoff): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(HANDOFF_KEY, JSON.stringify({ ...payload, source: "tracker" }));
  } catch {
    /* private mode / quota — navigation still works, just no prefill */
  }
}

/** Called by a tool on mount. Reads AND clears the payload so it fires once. */
export function consumeHandoff(): ToolHandoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(HANDOFF_KEY);
    return JSON.parse(raw) as ToolHandoff;
  } catch {
    return null;
  }
}
