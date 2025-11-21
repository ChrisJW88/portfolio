"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { kpis } from "@/data/dashboard";
import { trackEvent } from "@/lib/analytics";
import { KpiCard } from "./KpiCard";
import { TrendPanel } from "./TrendPanel";
import { AppTable } from "./AppTable";

const ranges = ["7d", "30d", "90d"] as const;

export function DashboardView() {
  const { data: session } = useSession();
  const [range, setRange] = useState<(typeof ranges)[number]>("7d");

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10">
      <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-abyss to-midnight p-8 shadow-card">
        <p className="text-sm uppercase tracking-[0.4em] text-textSecondary">Admin view</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl">Productivity dashboard</h1>
            <p className="mt-3 text-textSecondary">
              Aggregated KPIs across every deployed Vercel app. Placeholder data is wired for now—API integration will
              hydrate these cards with real users, revenue, and productivity scores.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-textSecondary">
              Range:
              {ranges.map((value) => (
                <button
                  key={value}
                  className={`ml-2 rounded-full px-3 py-1 ${
                    range === value ? "bg-gradient-to-r from-aurora to-signal text-midnight" : "text-textSecondary"
                  }`}
                  onClick={() => {
                    setRange(value);
                    trackEvent({ type: "dashboard_filter_change", range: value });
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
            {session && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-textSecondary hover:border-white/40 hover:text-white"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <TrendPanel />
      <AppTable />
    </section>
  );
}

