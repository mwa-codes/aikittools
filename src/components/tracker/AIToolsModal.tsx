"use client";

import { useState } from "react";
import type { JobApplication } from "@/types/tracker";

interface AIToolsModalProps {
  app: JobApplication;
  onClose: () => void;
}

type Tab = "cover-letter" | "followup" | "interview-prep";
type Tone = "Professional" | "Friendly" | "Confident";
type Timeframe = "1 week" | "2 weeks" | "3+ weeks (ghosted)";

export default function AIToolsModal({ app, onClose }: AIToolsModalProps) {
  const [tab, setTab] = useState<Tab>("cover-letter");

  // Cover Letter state
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [coverLetter, setCoverLetter] = useState("");
  const [clLoading, setClLoading] = useState(false);
  const [clError, setClError] = useState("");
  const [clCopied, setClCopied] = useState(false);

  // Follow-up state
  const [timeframe, setTimeframe] = useState<Timeframe>("1 week");
  const [email, setEmail] = useState("");
  const [fuLoading, setFuLoading] = useState(false);
  const [fuError, setFuError] = useState("");
  const [fuCopied, setFuCopied] = useState(false);

  // Interview prep state
  const [interviewJobDescription, setInterviewJobDescription] = useState("");
  const [questions, setQuestions] = useState("");
  const [ipLoading, setIpLoading] = useState(false);
  const [ipError, setIpError] = useState("");
  const [ipCopied, setIpCopied] = useState(false);

  async function generateCoverLetter() {
    setClError("");
    setClLoading(true);
    setCoverLetter("");
    try {
      const res = await fetch("/api/tracker/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: app.company,
          role: app.role,
          experience,
          tone,
          jobDescription,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setClError(data.error ?? "Failed to generate. Please try again.");
      } else {
        setCoverLetter(data.coverLetter);
      }
    } catch {
      setClError("Network error. Please try again.");
    } finally {
      setClLoading(false);
    }
  }

  async function generateFollowUp() {
    setFuError("");
    setFuLoading(true);
    setEmail("");
    try {
      const res = await fetch("/api/tracker/followup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: app.company, role: app.role, timeframe }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFuError(data.error ?? "Failed to generate. Please try again.");
      } else {
        setEmail(data.email);
      }
    } catch {
      setFuError("Network error. Please try again.");
    } finally {
      setFuLoading(false);
    }
  }

  async function generateInterviewPrep() {
    setIpError("");
    setIpLoading(true);
    setQuestions("");
    try {
      const res = await fetch("/api/tracker/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: app.role, jobDescription: interviewJobDescription }),
      });
      const data = await res.json();
      if (!res.ok) {
        setIpError(data.error ?? "Failed to generate. Please try again.");
      } else {
        setQuestions(data.questions);
      }
    } catch {
      setIpError("Network error. Please try again.");
    } finally {
      setIpLoading(false);
    }
  }

  async function copyToClipboard(text: string, onCopied: () => void) {
    await navigator.clipboard.writeText(text);
    onCopied();
    setTimeout(onCopied, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Tools</h2>
            <p className="text-xs text-gray-500">
              {app.role} at {app.company}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 px-6 pt-4">
          <button
            type="button"
            onClick={() => setTab("cover-letter")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === "cover-letter"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Cover Letter
          </button>
          <button
            type="button"
            onClick={() => setTab("followup")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === "followup"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Follow-up Email
          </button>
          <button
            type="button"
            onClick={() => setTab("interview-prep")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === "interview-prep"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Interview Prep
          </button>
        </div>
        <div className="h-px bg-gray-100 mx-6" />

        <div className="p-6 space-y-4">
          {tab === "cover-letter" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description (optional but recommended)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value.slice(0, 800))}
                  rows={4}
                  maxLength={800}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Paste the job description to get a more tailored letter..."
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {jobDescription.length} / 800
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your relevant experience
                </label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe your relevant skills and experience for this role..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  Pre-filled: {app.role} at {app.company}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <div className="flex gap-2">
                  {(["Professional", "Friendly", "Confident"] as Tone[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                        tone === t
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={generateCoverLetter}
                disabled={clLoading || !experience.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                {clLoading ? "Generating..." : "Generate Cover Letter"}
              </button>
              {clError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {clError}
                </p>
              )}
              {coverLetter && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Your Cover Letter</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(coverLetter, () => setClCopied(true))
                      }
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {clCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 leading-relaxed font-sans">
                    {coverLetter}
                  </pre>
                </div>
              )}
            </>
          )}

          {tab === "followup" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How long since you applied?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["1 week", "2 weeks", "3+ weeks (ghosted)"] as Timeframe[]).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeframe(tf)}
                      className={`py-3 text-sm font-medium rounded-xl border transition-colors ${
                        timeframe === tf
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {tf === "1 week"
                        ? "1 Week No Response"
                        : tf === "2 weeks"
                          ? "2 Weeks No Response"
                          : "3+ Weeks (Ghosted)"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Pre-filled: {app.role} at {app.company}
                </p>
              </div>
              <button
                type="button"
                onClick={generateFollowUp}
                disabled={fuLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                {fuLoading ? "Generating..." : "Generate Follow-up Email"}
              </button>
              {fuError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {fuError}
                </p>
              )}
              {email && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Your Follow-up Email</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(email, () => setFuCopied(true))}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {fuCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 leading-relaxed font-sans">
                    {email}
                  </pre>
                </div>
              )}
            </>
          )}

          {tab === "interview-prep" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job role
                </label>
                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  {app.role} at {app.company}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paste job description{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={interviewJobDescription}
                  onChange={(e) =>
                    setInterviewJobDescription(e.target.value.slice(0, 500))
                  }
                  rows={4}
                  maxLength={500}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Paste the job description to get tailored questions..."
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {interviewJobDescription.length}/500
                </p>
              </div>
              <button
                type="button"
                onClick={generateInterviewPrep}
                disabled={ipLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                {ipLoading ? "Generating..." : "Generate Interview Questions"}
              </button>
              {ipError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {ipError}
                </p>
              )}
              {questions && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Interview Questions</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(questions, () => setIpCopied(true))}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {ipCopied ? "Copied!" : "Copy All"}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 leading-relaxed font-sans">
                    {questions}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
