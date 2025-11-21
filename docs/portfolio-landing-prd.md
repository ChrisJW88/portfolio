---
title: "Portfolio Landing & Productivity Dashboard PRD"
version: "v0.1"
owner: "Chris Wilson"
lastUpdated: "2025-11-21"
---

## 1. Executive Summary
Create a premium, single-entry landing experience that showcases all in-flight and shipped apps under the portfolio while reinforcing the builder’s craft, credibility, and traction. The site must include:
- **Projects view (default tab):** Hero section with featured imagery, project tiles with short descriptions, links to abridged external PRDs, and a mock phone browser to preview each experience.
- **Dashboard tab (admin only):** Consolidated view of total users, revenue, and aggregate productivity across apps, highlighting the health and impact of the entire business.

The experience adopts the `style-brief.json` aesthetic (deep navy, glowing gradients, floating cards, stylized portraits) to communicate craftsmanship, polish, and forward momentum.

## 2. Goals & Success Metrics
- **Brand showcase:** Communicate a premium, cohesive visual system across all apps (qualitative feedback, user interviews).
- **Project discovery:** ≥70% of visitors engage with at least one project card (click PRD or phone preview) within first session.
- **Lead capture enablement:** Provide clear CTAs toward external docs or contact methods (baseline conversions tracked via analytics).
- **Operational transparency:** Admin dashboard surfaces live KPIs (total users, revenue, productivity) with <5% variance vs source of truth.
- **Performance:** LCP <2.5s on desktop and mobile; phone mock interactions remain smooth (60fps target).

## 3. Personas & Use Cases
1. **Prospective partner / investor**
   - Needs quick overview of portfolio quality, differentiators, traction.
   - Uses PRD links and phone previews to validate fit.
2. **Early user / beta tester**
   - Wants to understand app purpose and see experience before joining waitlist.
3. **Admin (Chris)**
   - Requires a private dashboard to monitor aggregate performance and highlight productivity improvements across apps for storytelling.

## 4. Experience Architecture
- **Global navigation:** Logo + name, `Projects` tab (default), `Dashboard` tab (auth-gated), persistent CTA (contact or subscribe).
- **Projects tab sections:**
  1. Hero panel (headline, subcopy, CTA, primary app image/animation).
  2. Featured project slider with hero metrics.
  3. Grid of project cards (name, 1-liner, tags, CTA to abridged PRD, CTA to “View mock”).
  4. Mock phone viewer anchored on right sidebar (desktop) or sticky drawer (mobile) showing selected app screens.
  5. Proof / testimonials row (optional placeholder).
  6. Footer with contact, social, and legal.
- **Dashboard tab sections:**
  1. KPI header cards (Total Users, Monthly Revenue, Aggregate Productivity Index).
  2. Trends row (spark lines for Users, Revenue, Productivity vs previous period).
  3. Breakdown table by app (users, revenue, status, recent releases).
  4. Productivity insights (e.g., shipped features count, adoption tiers).
  5. Export / share CTA (download CSV, copy summary).

## 5. Detailed Requirements

### 5.1 Projects Tab
- **Hero**
  - Background gradient per style brief.
  - Elements: eyebrow text, headline, supporting copy, primary CTA (“Explore portfolio”) and secondary CTA (“Contact”).
  - Animated highlight: progress ring or notification macros referencing recent achievements (e.g., “8 apps live”, “+24.5% engagement”).
- **Project Cards**
  - Inventory auto-syncs nightly with the Vercel Deployments API to pull the most recent successful deploy for each connected project (fields: deploymentId, project name, repo, deployment URL, createdAt). `projects.json` (or CMS) augments that feed with marketing copy, tags, and mock assets.
  - Each card includes: app icon/portrait, value metric (e.g., “+24.50 USD”), short description, action buttons (View PRD, Launch, Preview in mock phone). Launch CTA uses the latest Vercel `deploymentUrl`.
  - Hover states trigger glow and highlight the matching mock phone screen.
- **Mock Phone Viewer**
  - Displays selected card’s screens (images or lottie). Provide navigation (swipe/scroll or arrows); fallback image for missing assets.
  - Option to toggle “Play walkthrough” with auto-scroll; paused on hover or tap.
- **External PRDs**
  - Each card must link to an abridged, public-friendly PRD hosted externally (e.g., Notion, GitBook).
  - Links open in new tab; add analytics event `project_prd_click`.

### 5.2 Dashboard Tab
- **Access**
  - Hidden from public nav unless admin authenticated (basic auth or token). Provide fallback message if unauthorized.
- **KPI Cards**
  - Three primary metrics with ability to swap metric (users, revenue, productivity). Include deltas vs last 7/30 days.
  - Visualization options: half-radial gauges, segmented bars.
- **Aggregations**
  - Pull data from source-of-truth (spreadsheet, Firebase, Supabase, etc.). Define API contract (see Data section).
  - Provide combined totals + per-app breakdown.
- **Interactions**
  - Filters by timeframe (7d, 30d, 90d) and by app category (consumer, B2B, experiments).
  - Export summary (CSV download or clipboard JSON).
- **Productivity Score**
  - Derived metric (e.g., normalized blend of releases shipped, active users, revenue momentum). Display formula inline for transparency.

### 5.3 Shared Elements
- **Visual Language:** Conform to `style-brief.json` tokens (colors, typography, motion).
- **Responsive Behavior:** Desktop-first with graceful mobile adaptation (phone viewer collapses under hero).
- **Accessibility:** WCAG AA, keyboard focus states, reduced motion support.
- **Content Management:** Optional CMS integration (e.g., Contentful, JSON in repo). Requirement: easy to add new projects with minimal edits.

## 6. Data & Integrations
- **Project data:** Combination of automated Vercel ingestion and curated marketing metadata:
  - **Vercel sync:** Server cron (or on-demand build step) calls Vercel REST API `/v6/deployments` filtered by project to fetch the latest production deployment URL, build timestamp, git commit, and environment status.
  - **Marketing overlay:** `projects.json` or CMS stores human-friendly content (headline, snippet, hero imagery, PRD link, accent color). During build, data sources merge on project slug.
  - **Env config:** Define `VERCEL_API_TOKEN` (required) and optional `VERCEL_TEAM_ID` inside `frontend/.env.local`; see `docs/setup/README.md`.
- **Analytics:** Track hero CTA clicks, PRD views, mock phone interactions, dashboard filter changes.
- **Dashboard data ingestion:** Scheduled job or live API aggregating metrics from each app (spec to be finalized; placeholder schema: `{ appId, usersTotal, mrr, productivityScore, updatedAt }`).
- **Auth:** Basic password gate or OAuth, with environment-configured credentials.

## 7. Non-Goals
- Full blog or newsroom.
- Detailed engineering documentation for each app (linked externally instead).
- Multi-tenant admin controls beyond viewing aggregated data.

## 8. Launch Checklist
- [ ] Configure Vercel API integration and verify newest deployment URLs flow into project cards.
- [ ] Populate `projects.json` with at least 4 apps including hero imagery and PRD links.
- [ ] Wire up dashboard data API and verify against manual spreadsheet.
- [ ] QA responsive layouts (desktop, tablet, mobile).
- [ ] Accessibility audit (keyboard, contrast, reduced motion).
- [ ] Analytics events tested in staging.

## 9. Risks & Mitigations
- **Data freshness:** aggregated metrics may lag real-time; mitigate with timestamps and last-updated badges.
- **Asset availability:** missing mock screens degrade experience; include placeholder device image and require min assets before publishing.
- **Performance:** heavy imagery/video could slow hero; enforce optimized media and lazy-loading.
- **Security:** admin dashboard requires gating; ensure secrets stored server-side.

## 10. Timeline (TBD)
- Week 1: Content + visual exploration (align on assets).
- Week 2: Build Projects tab + phone viewer.
- Week 3: Implement dashboard, data plumbing, QA, launch.


