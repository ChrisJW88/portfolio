# Setup Reference

## Environment Variables

Add the following keys to `frontend/.env.local` (not committed):

### Vercel Integration
- `VERCEL_API_TOKEN` – personal or team token with `deployments.read` scope. Required.
- `VERCEL_TEAM_ID` – optional. Needed only when the projects live under a Vercel team/organization.

### Authentication (NextAuth.js)
- `DASHBOARD_PASSWORD` – password for accessing the `/dashboard` route. Required.
- `NEXTAUTH_SECRET` – secret key for JWT signing. Generate with `openssl rand -base64 32`. Required.
- `NEXTAUTH_URL` – base URL of your application (e.g., `http://localhost:3000` for dev, your production domain for prod). Required.

After updating the env file, restart `npm run dev` so Next.js can pick up the new variables.

