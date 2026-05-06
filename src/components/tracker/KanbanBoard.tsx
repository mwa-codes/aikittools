"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import type { JobApplication, AppStatus } from "@/types/tracker";
import { STATUS_OPTIONS } from "@/types/tracker";

const COLUMN_COLORS: Record<AppStatus, string> = {
  Applied: "bg-blue-100 text-blue-700 border-blue-200",
  Interview: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Offer: "bg-green-100 text-green-700 border-green-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Ghosted: "bg-gray-100 text-gray-600 border-gray-200",
};

const COLUMN_HEADER_BG: Record<AppStatus, string> = {
  Applied: "bg-blue-50 border-blue-200",
  Interview: "bg-yellow-50 border-yellow-200",
  Offer: "bg-green-50 border-green-200",
  Rejected: "bg-red-50 border-red-200",
  Ghosted: "bg-gray-50 border-gray-200",
};

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface KanbanCardProps {
  app: JobApplication;
  isDragOverlay?: boolean;
  onEdit?: (app: JobApplication) => void;
  onAITools?: (app: JobApplication) => void;
  onDelete?: (id: string) => void;
}

function KanbanCard({
  app,
  isDragOverlay = false,
  onEdit,
  onAITools,
  onDelete,
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id });
  const [menuOpen, setMenuOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  if (isDragOverlay) {
    return (
      <div className="bg-white border border-blue-300 rounded-xl p-3 shadow-lg cursor-grabbing">
        <p className="font-semibold text-gray-900 text-sm leading-tight">
          {app.company}
        </p>
        <p className="text-xs text-gray-600 mt-0.5">{app.role}</p>
        <p className="text-xs text-gray-400 mt-1">{formatDate(app.date_applied)}</p>
      </div>
    );
  }

  const hasActions = onEdit || onAITools || onDelete;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all select-none"
    >
      {/* Drag handle — covers the card body, stops at the right edge to leave room for menu */}
      <div
        {...attributes}
        {...listeners}
        className={`p-3 cursor-grab active:cursor-grabbing ${hasActions ? "pr-8" : ""}`}
      >
        <p className="font-semibold text-gray-900 text-sm leading-tight truncate">
          {app.company}
        </p>
        <p className="text-xs text-gray-600 mt-0.5 truncate">{app.role}</p>
        <p className="text-xs text-gray-400 mt-1">{formatDate(app.date_applied)}</p>
      </div>

      {/* Action menu button — absolutely positioned so it doesn't affect drag area */}
      {hasActions && (
        <div className="absolute top-2 right-2 z-10">
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Card actions"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>

          {menuOpen && (
            <>
              {/* Invisible backdrop to close menu on outside click */}
              <div
                className="fixed inset-0 z-20"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
              />
              <div
                className="absolute right-0 top-7 z-30 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[130px]"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {onEdit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onEdit(app);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                )}
                {onAITools && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onAITools(app);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    ✨ AI Tools
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onDelete(app.id);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface KanbanColumnProps {
  status: AppStatus;
  apps: JobApplication[];
  isOver: boolean;
  onEdit: (app: JobApplication) => void;
  onAITools: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

function KanbanColumn({ status, apps, isOver, onEdit, onAITools, onDelete }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id: `col-${status}` });

  return (
    <div className="flex flex-col min-w-[200px] w-52 shrink-0 sm:min-w-0 sm:w-auto sm:flex-1">
      {/* Column header */}
      <div
        className={`flex items-center justify-between px-3 py-2.5 rounded-t-xl border-x border-t ${COLUMN_HEADER_BG[status]}`}
      >
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${COLUMN_COLORS[status]}`}>
          {status}
        </span>
        <span className="text-xs text-gray-500 font-medium">{apps.length}</span>
      </div>

      {/* Cards area — overflow-visible so dropdown menus aren't clipped */}
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[200px] p-2 border rounded-b-xl transition-colors space-y-2 overflow-visible ${
          isOver
            ? "bg-blue-50 border-blue-300 border-dashed"
            : "bg-gray-50/70 border-gray-200"
        }`}
      >
        <SortableContext
          items={apps.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          {apps.map((app) => (
            <KanbanCard
              key={app.id}
              app={app}
              onEdit={onEdit}
              onAITools={onAITools}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
        {apps.length === 0 && (
          <div className="h-full flex items-center justify-center py-6">
            <p className="text-xs text-gray-400 text-center">Drop here</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface KanbanBoardProps {
  apps: JobApplication[];
  onStatusChange: (id: string, newStatus: AppStatus) => void;
  onEdit: (app: JobApplication) => void;
  onAITools: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

export default function KanbanBoard({
  apps,
  onStatusChange,
  onEdit,
  onAITools,
  onDelete,
}: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const activeApp = activeId ? apps.find((a) => a.id === activeId) : null;

  function getColumnForCard(cardId: string): AppStatus | null {
    return apps.find((a) => a.id === cardId)?.status ?? null;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragOver(event: DragOverEvent) {
    setOverId(event.over ? String(event.over.id) : null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const cardId = String(active.id);
    const overIdStr = String(over.id);

    let targetStatus: AppStatus | null = null;

    if (overIdStr.startsWith("col-")) {
      targetStatus = overIdStr.replace("col-", "") as AppStatus;
    } else {
      targetStatus = getColumnForCard(overIdStr);
    }

    if (!targetStatus || !STATUS_OPTIONS.includes(targetStatus)) return;

    const currentStatus = apps.find((a) => a.id === cardId)?.status;
    if (currentStatus !== targetStatus) {
      onStatusChange(cardId, targetStatus);
    }
  }

  const overColumnId = overId?.startsWith("col-")
    ? (overId.replace("col-", "") as AppStatus)
    : overId
    ? getColumnForCard(overId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto pb-4 -mx-1">
        <div className="flex gap-3 min-w-max sm:min-w-0 sm:grid sm:grid-cols-5 px-1">
          {STATUS_OPTIONS.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              apps={apps.filter((a) => a.status === status)}
              isOver={overColumnId === status}
              onEdit={onEdit}
              onAITools={onAITools}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeApp ? <KanbanCard app={activeApp} isDragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
