"use client";

import type { JobApplication } from "@/types/tracker";

interface StatsBarProps {
  apps: JobApplication[];
}

interface StatCardProps {
  value: string;
  label: string;
  subtitle?: string;
  colorClass: string;
}

function StatCard({ value, label, subtitle, colorClass }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex flex-col items-center text-center">
      <span className={`text-2xl font-bold leading-none ${colorClass}`}>{value}</span>
      <span className="text-xs text-gray-500 mt-1 leading-tight">{label}</span>
      {subtitle && <span className="text-[11px] text-gray-400 leading-tight">{subtitle}</span>}
    </div>
  );
}

export default function StatsBar({ apps }: StatsBarProps) {
  if (apps.length === 0) return null;

  const total = apps.length;
  const interviews = apps.filter((a) => a.status === "Interview").length;
  const offers = apps.filter((a) => a.status === "Offer").length;
  const responded = apps.filter(
    (a) => a.status === "Interview" || a.status === "Offer" || a.status === "Rejected"
  ).length;
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
      <StatCard value={String(total)} label="Total Applied" colorClass="text-gray-900" />
      <StatCard value={String(interviews)} label="Interviews" colorClass="text-yellow-600" />
      <StatCard value={String(offers)} label="Offers" colorClass="text-green-600" />
      <StatCard
        value={`${responseRate}%`}
        label="Response Rate"
        subtitle="(excl. ghosted)"
        colorClass="text-blue-600"
      />
    </div>
  );
}
