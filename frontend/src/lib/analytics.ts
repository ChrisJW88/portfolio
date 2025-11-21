/**
 * Analytics event tracking utility.
 * Currently logs to console; can be extended to send to external services (e.g., Vercel Analytics, Plausible, GA4).
 */

export type AnalyticsEvent =
  | { type: "hero_cta_click"; action: "explore_portfolio" | "contact" }
  | { type: "project_prd_click"; projectSlug: string; projectTitle: string }
  | { type: "dashboard_filter_change"; range: "7d" | "30d" | "90d" };

const isDevelopment = process.env.NODE_ENV === "development";

export function trackEvent(event: AnalyticsEvent): void {
  if (isDevelopment) {
    console.log("[Analytics]", event);
    return;
  }

  // Production: send to your analytics service
  // Example integrations:
  // - Vercel Analytics: import { track } from '@vercel/analytics'; track(event.type, event);
  // - Plausible: window.plausible?.(event.type, { props: event });
  // - GA4: gtag('event', event.type, event);

  // For now, we'll use a no-op in production until a service is configured
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(event.type, { props: event });
  }
}

