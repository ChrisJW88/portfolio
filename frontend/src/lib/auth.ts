import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET environment variable is required");
}

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
          throw new Error("DASHBOARD_PASSWORD environment variable is not set");
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
  secret: process.env.NEXTAUTH_SECRET
};

