export type AppStatus = "Applied" | "Interview" | "Offer" | "Rejected" | "Ghosted";
export type AppPriority = "High" | "Normal";

export interface JobApplication {
  id: string;
  user_id?: string;
  company: string;
  role: string;
  job_url?: string;
  date_applied: string;
  status: AppStatus;
  notes?: string;
  priority: AppPriority;
  created_at: string;
}

export type JobApplicationInput = Omit<JobApplication, "id" | "user_id" | "created_at">;

export const STATUS_OPTIONS: AppStatus[] = ["Applied", "Interview", "Offer", "Rejected", "Ghosted"];
export const PRIORITY_OPTIONS: AppPriority[] = ["High", "Normal"];

export const STATUS_COLORS: Record<AppStatus, string> = {
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Ghosted: "bg-gray-100 text-gray-600",
};

export const GUEST_STORAGE_KEY = "tracker_guest_apps";
export const GUEST_LIMIT = 5;

/** Ensures bare domains open off-site (without scheme, browsers treat URLs as same-origin paths → 404). */
export function normalizeJobUrl(raw: string | undefined | null): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
