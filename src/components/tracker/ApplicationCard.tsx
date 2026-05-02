"use client";

import type { JobApplication } from "@/types/tracker";
import { STATUS_COLORS, normalizeJobUrl } from "@/types/tracker";

interface ApplicationCardProps {
  app: JobApplication;
  onEdit: (app: JobApplication) => void;
  onAITools: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApplicationCard({ app, onEdit, onAITools, onDelete }: ApplicationCardProps) {
  const notesPreview = app.notes ? app.notes.slice(0, 60) + (app.notes.length > 60 ? "…" : "") : null;
  const jobHref = normalizeJobUrl(app.job_url);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-100 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-base leading-tight">{app.company}</h3>
            {app.priority === "High" && (
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" title="High priority" />
            )}
          </div>
          <p className="text-sm text-gray-600 mt-0.5">{app.role}</p>
        </div>
        <span
          className={`shrink-0 inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[app.status]}`}
        >
          {app.status}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
        <span>Applied {formatDate(app.date_applied)}</span>
        {jobHref && (
          <a
            href={jobHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate max-w-[140px]"
          >
            View Job
          </a>
        )}
      </div>

      {notesPreview && (
        <p className="text-xs text-gray-500 italic mb-3 leading-relaxed">{notesPreview}</p>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onEdit(app)}
          className="flex-1 text-center text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 py-1.5 rounded-lg transition-colors"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onAITools(app)}
          className="flex-1 text-center text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 py-1.5 rounded-lg transition-colors"
        >
          ✨ AI Tools
        </button>
        <button
          type="button"
          onClick={() => onDelete(app.id)}
          className="flex-1 text-center text-xs font-medium text-red-600 hover:bg-red-50 py-1.5 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
