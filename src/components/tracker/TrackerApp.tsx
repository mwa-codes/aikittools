"use client";

import { useState, useEffect, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { JobApplication, JobApplicationInput } from "@/types/tracker";
import { GUEST_STORAGE_KEY, GUEST_LIMIT, normalizeJobUrl } from "@/types/tracker";
import ApplicationCard from "./ApplicationCard";
import AddEditModal from "./AddEditModal";
import AIToolsModal from "./AIToolsModal";
import AuthModal from "./AuthModal";

function generateId() {
  return crypto.randomUUID();
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
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(apps));
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

  // Modal state
  const [editApp, setEditApp] = useState<JobApplication | null>(null);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [aiApp, setAiApp] = useState<JobApplication | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [isAuthGate, setIsAuthGate] = useState(false);

  const loadSupabaseApps = useCallback(async () => {
    const supabase = createClient();
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

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        loadSupabaseApps().finally(() => setLoading(false));
      } else {
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

    return () => subscription.unsubscribe();
  }, [loadSupabaseApps]);

  // ---- CRUD ----

  async function handleSave(data: JobApplicationInput) {
    if (user) {
      const supabase = createClient();
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
      await supabase.from("job_applications").delete().eq("id", id);
      await loadSupabaseApps();
    } else {
      const updated = apps.filter((a) => a.id !== id);
      setApps(updated);
      saveGuestApps(updated);
    }
  }

  function openAddModal() {
    if (!user && apps.length >= GUEST_LIMIT) {
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
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Job
        </button>
      </div>

      {/* Applications Grid */}
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
