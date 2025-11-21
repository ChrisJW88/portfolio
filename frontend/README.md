# Portfolio Landing Page - Frontend

Next.js 14 application showcasing portfolio projects with an admin dashboard for aggregate business metrics.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (with auto-sync for project URLs)

## Setup

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.local.example` to `.env.local` (if it exists), or create `.env.local`
   - Add your Vercel API token:
     ```
     VERCEL_API_TOKEN=your_token_here
     ```
   - Optionally add `VERCEL_TEAM_ID` if projects are under a team/organization
   - See `docs/setup/README.md` for details

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Projects landing (default)
│   └── dashboard/    # Admin dashboard
├── components/       # React components
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Shared layout components
│   └── projects/     # Projects tab components
├── data/            # Data sources (placeholder + Vercel sync)
├── lib/             # Utilities (analytics, Vercel API client)
└── ...
```

## Features

### Projects Tab
- Hero section with CTAs
- Project grid with latest Vercel deployment URLs
- Mock phone viewer for app previews
- Analytics events for hero CTAs and PRD clicks

### Dashboard Tab
- KPI cards (users, revenue, productivity)
- Trend visualizations
- App breakdown table
- Filter by time range (7d, 30d, 90d)
- Analytics events for filter changes

### Data Integration
- **Vercel Deployments API:** Automatically fetches latest production deployment URLs for each project
- **Marketing Data:** Curated project metadata (titles, descriptions, PRD links) stored in `src/data/projects.ts`
- **Dashboard Data:** Placeholder metrics in `src/data/dashboard.ts` (ready for API integration)

## Analytics

Events are tracked via `src/lib/analytics.ts`. Currently logs to console in development; can be extended to send to Vercel Analytics, Plausible, GA4, etc.

Tracked events:
- `hero_cta_click` - Hero section button clicks
- `project_prd_click` - PRD link clicks on project cards
- `dashboard_filter_change` - Dashboard time range filter changes

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VERCEL_API_TOKEN` | Yes | Vercel API token with `deployments.read` scope |
| `VERCEL_TEAM_ID` | No | Team/organization ID if projects are under a team |

## Development Notes

- Uses React Server Components by default; client components marked with `"use client"`
- Tailwind config extends theme from `style-brief.json` tokens
- TypeScript strict mode enabled
- ESLint configured with Next.js rules

## Deployment

The app is configured for Vercel deployment. Ensure environment variables are set in the Vercel dashboard.

