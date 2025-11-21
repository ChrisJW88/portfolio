"use client";

import { appRows } from "@/data/dashboard";

export function AppTable() {
  return (
    <div className="rounded-3xl border border-white/10 bg-abyss/60 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-textMuted">Per app breakdown</p>
          <h3 className="font-display text-2xl">Portfolio productivity</h3>
        </div>
        <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-textSecondary hover:text-white">
          Export CSV
        </button>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-textSecondary">
            <tr>
              <th className="pb-3 font-normal">App</th>
              <th className="pb-3 font-normal">Users</th>
              <th className="pb-3 font-normal">MRR</th>
              <th className="pb-3 font-normal">Status</th>
              <th className="pb-3 font-normal">Last release</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {appRows.map((row) => (
              <tr key={row.app} className="text-textSecondary">
                <td className="py-3 text-white">{row.app}</td>
                <td className="py-3">{row.users}</td>
                <td className="py-3">{row.revenue}</td>
                <td className="py-3">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs">{row.status}</span>
                </td>
                <td className="py-3">{row.lastRelease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

