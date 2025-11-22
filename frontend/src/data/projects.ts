import { cache } from "react";

import { fetchLatestDeployment } from "@/lib/vercel";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectDeployment = {
  deploymentId: string;
  url: string;
  createdAt: string;
  readyState?: string;
};

export type Project = {
  title: string;
  slug: string;
  snippet: string;
  tags: string[];
  prdUrl: string;
  accentColor: string;
  mockScreens: string[];
  metric: ProjectMetric;
  liveUrl: string;
  deployment?: ProjectDeployment;
};

type MarketingProject = Omit<Project, "liveUrl" | "deployment"> & {
  fallbackUrl: string;
  vercelProject: string;
};

const marketingProjects: MarketingProject[] = [
  {
    title: "Fairway Practice",
    slug: "fairway-practice",
    snippet: "Offline-first golf practice tracker with per-shot scoring and progress visualization.",
    tags: ["Golf", "Mobile", "Offline"],
    prdUrl: "/prds/fairway-practice",
    accentColor: "#C0C0C0",
    mockScreens: ["/mock/fairway-practice-1.png", "/mock/fairway-practice-2.png"],
    metric: {
      label: "Sessions tracked",
      value: "1.2K+"
    },
    fallbackUrl: "https://fairway-practice.vercel.app",
    vercelProject: "fairway-practice"
  },
  {
    title: "Fairway Booking",
    slug: "fairway-booking",
    snippet: "Automated golf group booking that finds mutual free time and books at favorite clubs.",
    tags: ["Golf", "Automation", "B2C"],
    prdUrl: "/prds/fairway-booking",
    accentColor: "#22C55E",
    mockScreens: ["/mock/fairway-booking-1.png", "/mock/fairway-booking-2.png"],
    metric: {
      label: "Booking success",
      value: "72%"
    },
    fallbackUrl: "https://fairway-booking.vercel.app",
    vercelProject: "fairway-booking"
  },
  {
    title: "Mindful Moment",
    slug: "mindful-moment",
    snippet: "Personal growth app blending AI-guided meditations with reflective journaling for goal progress.",
    tags: ["Wellness", "AI", "Mobile"],
    prdUrl: "/prds/mindful-moment",
    accentColor: "#E07A5F",
    mockScreens: ["/mock/mindful-moment-1.png", "/mock/mindful-moment-2.png"],
    metric: {
      label: "Weekly active",
      value: "50%+"
    },
    fallbackUrl: "https://mindful-moment.vercel.app",
    vercelProject: "mindful-moment"
  }
];

export const getProjects = cache(async (): Promise<Project[]> => {
  const enriched = await Promise.all(
    marketingProjects.map(async (project) => {
      try {
        const deployment = await fetchLatestDeployment(project.vercelProject);
        return { project, deployment };
      } catch (error) {
        console.error(`Error fetching deployment for ${project.vercelProject}:`, error);
        return { project, deployment: null };
      }
    })
  );

  return enriched.map(({ project, deployment }) => {
    const { fallbackUrl, vercelProject, ...displayData } = project;

    return {
      ...displayData,
      liveUrl: deployment?.url ?? fallbackUrl,
      deployment: deployment
        ? {
            deploymentId: deployment.deploymentId,
            url: deployment.url,
            createdAt: deployment.createdAt,
            readyState: deployment.readyState
          }
        : undefined
    };
  });
});

