"use client";

import type { Kpi } from "@/data/dashboard";

export function KpiCard({ label, value, delta, trend }: Kpi) {
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-citrine";

  return (
    <div className="rounded-3xl border border-white/10 bg-abyss/70 p-5 shadow-card">
      <p className="text-xs uppercase tracking-[0.4em] text-textMuted">{label}</p>
      <p className="mt-3 font-display text-3xl">{value}</p>
      <p className={`mt-1 text-sm ${trendColor}`}>{delta} vs last 7d</p>
    </div>
  );
}

