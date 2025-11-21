"use client";

import type { Project } from "@/data/projects";
import { useMemo } from "react";

type Props = {
  project?: Project;
};

export function MockPhone({ project }: Props) {
  const screens = useMemo(() => project?.mockScreens ?? [], [project]);

  return (
    <aside className="rounded-[36px] border border-white/10 bg-abyss/70 p-6 text-center shadow-card">
      <p className="text-sm text-textSecondary">Live mock preview</p>
      <h3 className="mt-2 font-display text-2xl">{project?.title ?? "Select a project"}</h3>
      <p className="mt-1 text-sm text-textSecondary">{project?.snippet}</p>
      <div className="mt-6 flex justify-center">
        <div className="relative h-[520px] w-[260px] rounded-[36px] border border-white/10 bg-midnight/80 p-3 shadow-inner">
          <div className="mx-auto mb-3 h-2 w-16 rounded-full bg-white/20" />
          <div className="space-y-3 overflow-hidden rounded-[26px] bg-[#060F24] p-4">
            {screens.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-32 rounded-2xl bg-gradient-to-br from-aurora/30 to-indigo/30" />
                ))
              : screens.map((screen) => (
                  <div
                    key={screen}
                    className="h-36 rounded-2xl border border-white/5"
                    style={{
                      background: `linear-gradient(145deg, ${project?.accentColor}33, rgba(255,255,255,0.05))`
                    }}
                  >
                    <div className="flex h-full flex-col justify-between p-4 text-left">
                      <p className="text-xs uppercase tracking-[0.3em] text-textSecondary">{project?.metric.label}</p>
                      <p className="text-2xl font-semibold">{project?.metric.value}</p>
                      <p className="text-sm text-textMuted">{screen.replace("/mock/", "").replace(".png", "")}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-textMuted">Placeholder media — ready for real captures later.</p>
    </aside>
  );
}

