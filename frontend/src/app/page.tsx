import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { Footer } from "@/components/layout/Footer";
import { ProjectsExperience } from "@/components/projects/ProjectsExperience";
import { getProjects } from "@/data/projects";

export default async function ProjectsPage() {
  try {
    const projects = await getProjects();

    return (
      <>
        <main>
          <PrimaryNav />
          <ProjectsExperience items={projects} />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error loading projects:", error);
    return (
      <>
        <main>
          <PrimaryNav />
          <div className="mx-auto max-w-6xl px-5 py-10">
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
              <h1 className="font-display text-2xl text-red-400">Error loading projects</h1>
              <p className="mt-2 text-textSecondary">
                {error instanceof Error ? error.message : "An unexpected error occurred"}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

