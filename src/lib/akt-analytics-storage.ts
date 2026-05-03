/** localStorage keys for Career Health — additive only; does not touch tracker keys. */

export const AKT_KEYS = {
  ATS_USED: "akt_ats_used",
  ATS_SCORE: "akt_ats_score",
  COVER_COUNT: "akt_cover_letters_count",
  INTERVIEW_PREP: "akt_interview_prep_used",
  LINKEDIN: "akt_linkedin_used",
  BULLETS: "akt_bullets_used",
} as const;

export type AktStorageSnapshot = {
  atsUsed: boolean;
  atsScore: number | null;
  coverCount: number;
  interviewPrep: boolean;
  linkedin: boolean;
  bullets: boolean;
};

export function readAktStorageSnapshot(): AktStorageSnapshot {
  const empty: AktStorageSnapshot = {
    atsUsed: false,
    atsScore: null,
    coverCount: 0,
    interviewPrep: false,
    linkedin: false,
    bullets: false,
  };
  if (typeof window === "undefined") return empty;

  try {
    const atsUsed = window.localStorage.getItem(AKT_KEYS.ATS_USED) === "true";
    const rawScore = window.localStorage.getItem(AKT_KEYS.ATS_SCORE);
    const parsedScore =
      rawScore != null && rawScore !== ""
        ? Math.min(100, Math.max(0, Number.parseInt(rawScore, 10)))
        : NaN;
    const atsScore = Number.isFinite(parsedScore) ? parsedScore : null;
    const rawCount = window.localStorage.getItem(AKT_KEYS.COVER_COUNT);
    const coverCount = rawCount != null ? Math.max(0, Number.parseInt(rawCount, 10) || 0) : 0;

    return {
      atsUsed,
      atsScore,
      coverCount,
      interviewPrep: window.localStorage.getItem(AKT_KEYS.INTERVIEW_PREP) === "true",
      linkedin: window.localStorage.getItem(AKT_KEYS.LINKEDIN) === "true",
      bullets: window.localStorage.getItem(AKT_KEYS.BULLETS) === "true",
    };
  } catch {
    return empty;
  }
}

function dispatchAktUpdate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("akt-tools-updated"));
}

export function recordAtsCheckSuccess(score: number) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AKT_KEYS.ATS_USED, "true");
    window.localStorage.setItem(AKT_KEYS.ATS_SCORE, String(Math.round(score)));
    dispatchAktUpdate();
  } catch {
    /* ignore */
  }
}

export function recordCoverLetterGenerated() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(AKT_KEYS.COVER_COUNT);
    const prev = raw != null ? Number.parseInt(raw, 10) : 0;
    const n = (Number.isFinite(prev) ? prev : 0) + 1;
    window.localStorage.setItem(AKT_KEYS.COVER_COUNT, String(n));
    dispatchAktUpdate();
  } catch {
    /* ignore */
  }
}

export function recordInterviewPrepUsed() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AKT_KEYS.INTERVIEW_PREP, "true");
    dispatchAktUpdate();
  } catch {
    /* ignore */
  }
}

export function recordLinkedInSummaryUsed() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AKT_KEYS.LINKEDIN, "true");
    dispatchAktUpdate();
  } catch {
    /* ignore */
  }
}

export function recordResumeBulletsUsed() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AKT_KEYS.BULLETS, "true");
    dispatchAktUpdate();
  } catch {
    /* ignore */
  }
}
