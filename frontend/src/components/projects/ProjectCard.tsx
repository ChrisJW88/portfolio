"use client";

import type { Project } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { LaunchButton } from "./LaunchButton";

type Props = {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
};

export function ProjectCard({ project, isActive, onSelect }: Props) {
  const deploymentTimestamp = project.deployment
    ? new Date(project.deployment.createdAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      })
    : null;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => event.key === "Enter" && onSelect()}
      className={`rounded-3xl border px-5 py-6 text-left transition-all ${
        isActive ? "border-aurora/80 bg-abyss/70 shadow-glow" : "border-white/5 bg-abyss/40 hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${project.accentColor}, rgba(255,255,255,0.2))` }}
          />
          <div>
            <p className="font-display text-lg">{project.title}</p>
            <p className="text-sm text-textSecondary">{project.snippet}</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-textSecondary">
          {project.metric.value}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-textSecondary">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
        <a
          href={project.prdUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent({ type: "project_prd_click", projectSlug: project.slug, projectTitle: project.title })}
          className="rounded-full border border-white/20 px-4 py-2 text-textSecondary hover:text-white"
        >
          View PRD
        </a>
        <LaunchButton url={project.liveUrl} hasDeployment={!!project.deployment} />
      </div>
      <p className="mt-3 text-xs text-textMuted">
        {deploymentTimestamp ? `Synced via Vercel · ${deploymentTimestamp}` : "Using fallback preview until deploys run."}
      </p>
    </article>
  );
}

