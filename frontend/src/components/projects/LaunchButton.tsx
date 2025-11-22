"use client";

type Props = {
  url: string;
  hasDeployment: boolean;
};

export function LaunchButton({ url, hasDeployment }: Props) {
  // Check if URL is valid (starts with http/https)
  const isValidUrl = url && (url.startsWith("http://") || url.startsWith("https://"));
  
  // Only show friendly message if URL is invalid or missing
  // If there's a valid URL (whether from deployment or fallback), show the launch button
  if (!isValidUrl) {
    return (
      <div className="rounded-full bg-gradient-to-r from-aurora/20 to-signal/20 border border-aurora/30 px-4 py-2 text-sm text-center">
        <p className="text-textSecondary">
          Check back soon to view this project or{" "}
          <a
            href="mailto:chrisjameswilson1988@gmail.com"
            className="text-aurora hover:text-signal underline"
            onClick={(e) => e.stopPropagation()}
          >
            contact Chris
          </a>{" "}
          for more details.
        </p>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-gradient-to-r from-aurora to-signal px-4 py-2 text-midnight shadow-glow"
    >
      Launch latest
    </a>
  );
}

