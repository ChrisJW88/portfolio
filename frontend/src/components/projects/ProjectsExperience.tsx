"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { MockPhone } from "./MockPhone";
import { ProjectCard } from "./ProjectCard";

type Props = {
  items: Project[];
};

export function ProjectsExperience({ items }: Props) {
  const [selectedSlug, setSelectedSlug] = useState(items[0]?.slug);
  const selectedProject = useMemo(
    () => items.find((item) => item.slug === selectedSlug) ?? items[0],
    [items, selectedSlug]
  );

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-10">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-abyss to-midnight p-8 shadow-card">
          <p className="text-sm uppercase tracking-[0.4em] text-textSecondary">Builder Portfolio</p>
          <h1 className="mt-4 font-display text-4xl leading-tight">
            Apps for golf, fitness, and wellness — built by Chris Wilson.
          </h1>
          <p className="mt-4 max-w-2xl text-textSecondary">
            This portfolio introduces the projects powering the business and serves as a central contact hub for
            partners, investors, and early users. Each product tile links to an abridged PRD and a high-fidelity mock
            phone preview so you can experience the vision instantly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#projects"
              onClick={() => trackEvent({ type: "hero_cta_click", action: "explore_portfolio" })}
              className="rounded-full bg-gradient-to-r from-aurora to-signal px-6 py-3 font-medium text-midnight shadow-glow"
            >
              Explore portfolio
            </Link>
            <Link
              href="mailto:chrisjameswilson1988@gmail.com"
              onClick={() => trackEvent({ type: "hero_cta_click", action: "contact" })}
              className="rounded-full border border-white/20 px-6 py-3 text-textSecondary hover:border-white/40"
            >
              Contact
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-textSecondary lg:grid-cols-4">
            {items.slice(0, 4).map((project) => (
              <div key={project.slug} className="rounded-2xl border border-white/5 bg-midnight/40 p-4">
                <p className="text-xs uppercase tracking-widest text-textMuted">{project.metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{project.metric.value}</p>
                <p className="mt-1 text-xs">{project.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="projects">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-textSecondary">Featured builds</p>
              <h2 className="mt-2 font-display text-3xl">Projects tab</h2>
            </div>
            <Link
              href="/dashboard"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-textSecondary hover:text-white lg:inline-flex"
            >
              View dashboard
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                isActive={project.slug === selectedProject?.slug}
                onSelect={() => setSelectedSlug(project.slug)}
              />
            ))}
          </div>
        </div>
      </div>

      <MockPhone project={selectedProject} />
    </section>
  );
}

