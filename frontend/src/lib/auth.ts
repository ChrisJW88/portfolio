import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Use a fallback secret during build time if not set (required for static generation)
// In production, NEXTAUTH_SECRET must be set in Vercel environment variables
const nextAuthSecret = process.env.NEXTAUTH_SECRET || "build-time-placeholder-secret-do-not-use-in-production";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const expectedPassword = process.env.DASHBOARD_PASSWORD;
        if (!expectedPassword) {
          // If DASHBOARD_PASSWORD is not set, authentication will fail
          // This allows the build to complete even if env vars aren't set yet
          return null;
        }

        if (credentials?.password === expectedPassword) {
          return {
            id: "admin",
            name: "Admin",
            email: "admin@portfolio.local"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: nextAuthSecret
};

