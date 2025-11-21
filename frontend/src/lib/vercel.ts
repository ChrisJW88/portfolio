const DEPLOYMENTS_ENDPOINT = "https://api.vercel.com/v13/deployments";

export type DeploymentSummary = {
  deploymentId: string;
  url: string;
  createdAt: string;
  readyState?: string;
};

type VercelDeploymentResponse = {
  deployments?: Array<{
    uid: string;
    url: string;
    createdAt: number;
    readyState?: string;
    state?: string;
  }>;
};

const missingTokenMessage =
  "VERCEL_API_TOKEN is not set. Skipping deployment lookup and falling back to marketing URLs.";
let hasWarnedMissingToken = false;

export async function fetchLatestDeployment(project: string): Promise<DeploymentSummary | null> {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) {
    if (!hasWarnedMissingToken) {
      console.warn(missingTokenMessage);
      hasWarnedMissingToken = true;
    }
    return null;
  }

  const searchParams = new URLSearchParams({
    project,
    limit: "1",
    state: "READY"
  });

  const teamId = process.env.VERCEL_TEAM_ID;
  if (teamId) {
    searchParams.set("teamId", teamId);
  }

  try {
    const response = await fetch(`${DEPLOYMENTS_ENDPOINT}?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      console.error(`Failed to fetch deployments for ${project}: ${response.status} ${response.statusText}`);
      return null;
    }

    const payload = (await response.json()) as VercelDeploymentResponse;
    const latest = payload.deployments?.[0];

    if (!latest) {
      console.warn(`No READY deployments found for project ${project}.`);
      return null;
    }

    const normalizedUrl = latest.url.startsWith("http") ? latest.url : `https://${latest.url}`;

    return {
      deploymentId: latest.uid,
      url: normalizedUrl,
      createdAt: new Date(latest.createdAt).toISOString(),
      readyState: latest.readyState ?? latest.state
    };
  } catch (error) {
    console.error(`Error fetching deployments for ${project}:`, error);
    return null;
  }
}

