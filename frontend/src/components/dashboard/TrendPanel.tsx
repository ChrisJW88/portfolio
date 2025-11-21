"use client";

import { trendPoints } from "@/data/dashboard";

const chartColors = {
  users: "#40C8F4",
  revenue: "#51E6C2",
  productivity: "#F4B740"
};

export function TrendPanel() {
  return (
    <div className="rounded-3xl border border-white/10 bg-abyss/60 p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-textMuted">Trends</p>
          <h3 className="font-display text-2xl">Last 7 days</h3>
        </div>
        <div className="flex gap-3 text-xs uppercase tracking-widest text-textSecondary">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors.users }} />
            Users
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors.revenue }} />
            Revenue
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors.productivity }} />
            Productivity
          </span>
        </div>
      </div>
      <svg viewBox="0 0 400 160" className="mt-6 w-full text-white/50">
        {(["users", "revenue", "productivity"] as const).map((series) => {
          const max = Math.max(...trendPoints.map((point) => point[series]));
          const min = Math.min(...trendPoints.map((point) => point[series]));
          const path = trendPoints
            .map((point, index) => {
              const x = (index / (trendPoints.length - 1)) * 380 + 10;
              const y = 150 - ((point[series] - min) / (max - min || 1)) * 120;
              return `${index === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ");

          return (
            <path
              key={series}
              d={path}
              fill="none"
              stroke={chartColors[series]}
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={series === "users" ? 1 : 0.7}
            />
          );
        })}
      </svg>
      <div className="mt-4 flex justify-between text-xs text-textSecondary">
        {trendPoints.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

