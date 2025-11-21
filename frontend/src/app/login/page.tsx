"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      password,
      redirect: false
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid password");
    } else if (result?.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-midnight px-5">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-gradient-to-br from-abyss to-midnight p-8 shadow-card">
        <div className="mb-6 text-center">
          <Link href="/" className="font-display text-2xl tracking-wide text-white">
            Chris Wilson
          </Link>
          <p className="mt-2 text-sm uppercase tracking-[0.4em] text-textSecondary">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-textSecondary">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-midnight/40 px-4 py-3 text-white placeholder:text-textMuted focus:border-aurora/50 focus:outline-none focus:ring-2 focus:ring-aurora/20"
              placeholder="Enter dashboard password"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-aurora to-signal px-6 py-3 font-medium text-midnight shadow-glow transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-textMuted">
          <Link href="/" className="hover:text-textSecondary">
            ← Back to portfolio
          </Link>
        </p>
      </div>
    </main>
  );
}

