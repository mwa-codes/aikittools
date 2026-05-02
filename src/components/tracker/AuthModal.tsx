"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthModalProps {
  mode: "signin" | "signup";
  isGate?: boolean;
  onClose: () => void;
  onModeChange: (mode: "signin" | "signup") => void;
}

export default function AuthModal({ mode, isGate, onClose, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Sign-in isn’t available — the site isn’t configured for accounts yet.");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess("Account created! Check your email to confirm, then sign in.");
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
      } else {
        onClose();
      }
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {isGate && (
          <div className="mb-5 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-blue-800">
              You&apos;ve reached the 5-application guest limit.
            </p>
            <p className="text-xs text-blue-700 mt-0.5">
              Create a free account to save unlimited applications.
            </p>
          </div>
        )}

        <div className="flex gap-0 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => { onModeChange("signup"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "signup"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => { onModeChange("signin"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === "signin"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Log In
          </button>
        </div>

        {!isSupabaseConfigured() ? (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            Account sign-in isn&apos;t enabled on this deployment. You can still use guest mode (up to 5
            applications in this browser).
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              disabled={!isSupabaseConfigured()}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              disabled={!isSupabaseConfigured()}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create Free Account" : "Log In"}
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isGate ? "Continue as guest (5 apps max)" : "Cancel"}
        </button>
      </div>
    </div>
  );
}
