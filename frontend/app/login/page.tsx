"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getDashboardRoute } from "@/utils/redirect";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await loginUser(email, password);

      login(token, user);

      toast.success("Login successful");

      router.push(getDashboardRoute(user.role));
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12">
      <div className="w-full max-w-md">
        {/* BRAND */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-black text-[#080A0D]">
              S
            </div>

            <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              Skill<span className="text-[var(--brand)]">Match</span>
            </span>
          </Link>

          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Welcome back. Continue where you left off.
          </p>
        </div>

        {/* CARD */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Sign in to access your SkillMatch account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--foreground)]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-[var(--muted-foreground)] transition hover:text-[var(--brand)]"
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--brand)] px-4 py-3.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* REGISTER */}
            <p className="pt-1 text-center text-sm text-[var(--muted-foreground)]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[var(--brand)] transition hover:text-[var(--brand-hover)]"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* BACK */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
          >
            ← Back to SkillMatch
          </Link>
        </div>
      </div>
    </main>
  );
}
