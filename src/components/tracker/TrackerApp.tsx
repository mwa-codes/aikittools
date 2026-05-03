"use client";

import { useState, useEffect, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { JobApplication, JobApplicationInput, AppStatus } from "@/types/tracker";
import { GUEST_STORAGE_KEY, GUEST_LIMIT, normalizeJobUrl } from "@/types/tracker";
import ApplicationCard from "./ApplicationCard";
import AddEditModal from "./AddEditModal";
import AIToolsModal from "./AIToolsModal";
import AuthModal from "./AuthModal";
import KanbanBoard from "./KanbanBoard";
import StatsBar from "./StatsBar";
import CareerHealthScore from "@/components/CareerHealthScore";
import JobSearchFunnel from "@/components/JobSearchFunnel";

type ViewMode = "list" | "board";
const VIEW_PREF_KEY = "tracker_view_preference";

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function loadGuestApps(): JobApplication[] {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JobApplication[]) : [];
  } catch {
    return [];
  }
}

function saveGuestApps(apps: JobApplication[]) {
  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(apps));
  } catch {
    /* private mode / quota — ignore */
  }
}

/** Serializes guest→Supabase migration so concurrent auth events cannot double-insert the same rows. */
let guestMigrationPromise: Promise<void> | null = null;

function runGuestMigration(userId: string, loadSupabaseApps: () => Promise<void>): Promise<void> {
  if (guestMigrationPromise) return guestMigrationPromise;
  guestMigrationPromise = (async () => {
    try {
      const guestApps = loadGuestApps();
      if (guestApps.length === 0) {
        await loadSupabaseApps();
        return;
      }
      const supabase = createClient();
      if (!supabase) {
        await loadSupabaseApps();
        return;
      }
      const toInsert = guestApps.map((a) => ({
        id: a.id,
        user_id: userId,
        company: a.company,
        role: a.role,
        job_url: normalizeJobUrl(a.job_url) ?? null,
        date_applied: a.date_applied,
        status: a.status,
        notes: a.notes ?? null,
        priority: a.priority,
      }));
      const { error } = await supabase.from("job_applications").insert(toInsert);
      if (!error || error.code === "23505") {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      }
      await loadSupabaseApps();
    } finally {
      guestMigrationPromise = null;
    }
  })();
  return guestMigrationPromise;
}

export default function TrackerApp() {
  const [user, setUser] = useState<User | null>(null);
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "list";
    try {
      const saved = localStorage.getItem(VIEW_PREF_KEY);
      return saved === "board" || saved === "list" ? saved : "list";
    } catch {
      return "list";
    }
  });

  // Modal state
  const [editApp, setEditApp] = useState<JobApplication | null>(null);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [aiApp, setAiApp] = useState<JobApplication | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [isAuthGate, setIsAuthGate] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function changeViewMode(mode: ViewMode) {
    setViewMode(mode);
    try {
      localStorage.setItem(VIEW_PREF_KEY, mode);
    } catch {
      /* ignore */
    }
  }

  const loadSupabaseApps = useCallback(async () => {
    const supabase = createClient();
    if (!supabase) return;
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setApps(data as JobApplication[]);
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      const guest = loadGuestApps();
      queueMicrotask(() => {
        setApps(guest);
        setLoading(false);
      });
      return;
    }

    let cancelled = false;

    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("[TrackerApp] getSession:", error);
          setApps(loadGuestApps());
          setLoading(false);
          return;
        }
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          loadSupabaseApps().finally(() => setLoading(false));
        } else {
          setApps(loadGuestApps());
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[TrackerApp] getSession failed:", err);
          setApps(loadGuestApps());
          setLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (event === "SIGNED_IN" && currentUser) {
        setLoading(true);
        runGuestMigration(currentUser.id, loadSupabaseApps).finally(() => setLoading(false));
      } else if (event === "SIGNED_OUT") {
        setApps(loadGuestApps());
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [loadSupabaseApps]);

  // ---- CRUD ----

  async function handleSave(data: JobApplicationInput) {
    if (user) {
      const supabase = createClient();
      if (!supabase) {
        throw new Error("Account sync is not available.");
      }
      if (editApp) {
        const { error } = await supabase
          .from("job_applications")
          .update(data)
          .eq("id", editApp.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("job_applications")
          .insert({ ...data, user_id: user.id });
        if (error) throw error;
      }
      await loadSupabaseApps();
    } else {
      if (editApp) {
        const updated = apps.map((a) =>
          a.id === editApp.id ? { ...a, ...data } : a
        );
        setApps(updated);
        saveGuestApps(updated);
      } else {
        const newApp: JobApplication = {
          ...data,
          id: generateId(),
          created_at: new Date().toISOString(),
        };
        const updated = [newApp, ...apps];
        setApps(updated);
        saveGuestApps(updated);
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this application?")) return;
    if (user) {
      const supabase = createClient();
      if (!supabase) return;
      await supabase.from("job_applications").delete().eq("id", id);
      await loadSupabaseApps();
    } else {
      const updated = apps.filter((a) => a.id !== id);
      setApps(updated);
      saveGuestApps(updated);
    }
  }

  async function handleStatusChange(id: string, newStatus: AppStatus) {
    if (user) {
      const supabase = createClient();
      if (!supabase) return;
      await supabase
        .from("job_applications")
        .update({ status: newStatus })
        .eq("id", id);
      await loadSupabaseApps();
    } else {
      const updated = apps.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      );
      setApps(updated);
      saveGuestApps(updated);
    }
  }

  function handleExportCSV() {
    function escapeCSV(val: string | null | undefined): string {
      const s = val ?? "";
      return `"${s.replace(/"/g, '""')}"`;
    }
    const header = ["Company", "Role", "Job URL", "Date Applied", "Status", "Priority", "Notes"];
    const rows = apps.map((a) => [
      escapeCSV(a.company),
      escapeCSV(a.role),
      escapeCSV(a.job_url),
      escapeCSV(a.date_applied),
      escapeCSV(a.status),
      escapeCSV(a.priority),
      escapeCSV(a.notes),
    ]);
    const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "job-applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function openAddModal() {
    setNotice(null);
    if (!user && apps.length >= GUEST_LIMIT) {
      if (!isSupabaseConfigured()) {
        setNotice(
          "You've reached the guest limit (5 applications). Remove one to add another, or enable Supabase env vars on the server for unlimited accounts."
        );
        return;
      }
      setIsAuthGate(true);
      setAuthMode("signup");
      setShowAuth(true);
      return;
    }
    setEditApp(null);
    setShowAddEdit(true);
  }

  function openEditModal(app: JobApplication) {
    setEditApp(app);
    setShowAddEdit(true);
  }

  function openAIModal(app: JobApplication) {
    setAiApp(app);
    setShowAI(true);
  }

  async function handleSignOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500 text-sm">
        Loading your applications...
      </div>
    );
  }

  return (
    <div>
      {!isSupabaseConfigured() && (
        <p className="mb-4 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed">
          Guest mode only — cloud accounts need{" "}
          <code className="text-[11px] bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-[11px] bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
          in your deployment environment (then redeploy).
        </p>
      )}
      {notice && (
        <p className="mb-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {notice}
        </p>
      )}
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {user ? (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs text-gray-500 truncate max-w-[180px] sm:max-w-xs">
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-xs text-gray-400 hover:text-red-600 whitespace-nowrap transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {apps.length}/{GUEST_LIMIT} free apps
              </span>
              {isSupabaseConfigured() ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsAuthGate(false);
                    setAuthMode("signup");
                    setShowAuth(true);
                  }}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 underline"
                >
                  Save unlimited
                </button>
              ) : null}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {user && apps.length > 0 && (
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-sm font-medium px-3 py-2 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          )}
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Job
          </button>
        </div>
      </div>

      <CareerHealthScore apps={apps} />
      <JobSearchFunnel apps={apps} onTrackNewJob={openAddModal} />

      {/* Stats Bar */}
      <StatsBar apps={apps} />

      {/* View Toggle */}
      {apps.length > 0 && (
        <div className="flex items-center gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => changeViewMode("list")}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            List View
          </button>
          <button
            type="button"
            onClick={() => changeViewMode("board")}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "board"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Board View
          </button>
        </div>
      )}

      {/* Applications — List or Board */}
      {apps.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-semibold text-gray-700 mb-1">No applications yet</p>
          <p className="text-sm text-gray-500 mb-5">Add your first job to start tracking.</p>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            + Add Your First Job
          </button>
        </div>
      ) : viewMode === "board" ? (
        <KanbanBoard apps={apps} onStatusChange={handleStatusChange} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onEdit={openEditModal}
              onAITools={openAIModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddEdit && (
        <AddEditModal
          app={editApp}
          onSave={handleSave}
          onClose={() => {
            setShowAddEdit(false);
            setEditApp(null);
          }}
        />
      )}

      {showAI && aiApp && (
        <AIToolsModal
          app={aiApp}
          onClose={() => {
            setShowAI(false);
            setAiApp(null);
          }}
        />
      )}

      {showAuth && (
        <AuthModal
          mode={authMode}
          isGate={isAuthGate}
          onClose={() => {
            setShowAuth(false);
            setIsAuthGate(false);
          }}
          onModeChange={setAuthMode}
        />
      )}
    </div>
  );
}
