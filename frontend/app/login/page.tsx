"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getDashboardRoute } from "@/utils/redirect";

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SparklesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 3-1.1 4.4a4 4 0 0 1-2.9 2.9L3.6 11.4 8 12.5a4 4 0 0 1 2.9 2.9L12 19.8l1.1-4.4a4 4 0 0 1 2.9-2.9l4.4-1.1-4.4-1.1a4 4 0 0 1-2.9-2.9L12 3Z" />
      <path d="m19 3-.5 2" />
      <path d="m21 5-2 .5" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-6 py-12">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary glow */}
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[var(--primary)]/15 blur-3xl motion-safe:animate-pulse" />

        {/* Cyan glow */}
        <div className="absolute -bottom-40 -right-32 h-[460px] w-[460px] rounded-full bg-[var(--accent)]/15 blur-3xl motion-safe:animate-pulse" />

        {/* Central subtle glow */}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/5 blur-3xl" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79,70,229,0.10) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Soft top gradient */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[var(--primary)]/5 to-transparent" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 w-full max-w-md">
        {/* BRAND */}

        <div className="mb-8 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
              {/* Logo glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-70" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-black text-white shadow-lg">
                S
              </div>
            </div>

            <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              Skill
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                Match
              </span>
            </span>
          </Link>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--primary)]/30" />

            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
              <SparklesIcon className="h-3.5 w-3.5 text-[var(--primary)]" />
              Skills-first talent matching
            </div>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--accent)]/30" />
          </div>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Welcome back. Continue discovering opportunities that fit your
            skills.
          </p>
        </div>

        {/* =========================================================
            LOGIN CARD
        ========================================================== */}

        <div className="group relative">
          {/* Animated gradient glow around card */}
          <div className="absolute -inset-1 rounded-[25px] bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent)]/15 to-[var(--primary)]/20 opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

          {/* Gradient border */}
          <div className="relative rounded-[22px] bg-gradient-to-br from-[var(--primary)]/30 via-[var(--border)] to-[var(--accent)]/25 p-px">
            <div className="rounded-[21px] border border-white/60 bg-[var(--surface)]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* Header */}

              <div className="mb-7">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <path d="m10 17 5-5-5-5" />
                    <path d="M15 12H3" />
                  </svg>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Welcome back
                </h1>

                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Sign in to access your SkillMatch account and continue where
                  you left off.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
                  >
                    Email address
                  </label>

                  <div className="group/input relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 opacity-0 blur-sm transition-opacity duration-300 group-focus-within/input:opacity-100" />

                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10"
                      />
                    </div>
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[var(--foreground)]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--primary)]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="group/input relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 opacity-0 blur-sm transition-opacity duration-300 group-focus-within/input:opacity-100" />

                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group/button relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary)] via-indigo-500 to-[var(--accent)] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/25 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                >
                  {/* Shimmer */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />

                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                      </>
                    )}
                  </span>
                </button>

                {/* REGISTER */}

                <div className="relative py-1">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--border)]" />

                  <div className="relative mx-auto w-fit bg-[var(--surface)] px-3 text-xs text-[var(--text-muted)]">
                    New to SkillMatch?
                  </div>
                </div>

                <Link
                  href="/register"
                  className="group/register flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                >
                  Create an account
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/register:translate-x-0.5" />
                </Link>
              </form>

              {/* Small reassurance */}

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                  <CheckIcon className="h-3 w-3" />
                </span>

                <span>Secure account access</span>

                <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />

                <span>Skills-first platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BACK LINK
        ========================================================== */}

        <div className="mt-7 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            Back to SkillMatch
          </Link>
        </div>

        {/* Bottom principles */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          <span>Skills-first</span>
          <span className="h-1 w-1 rounded-full bg-[var(--primary)]/40" />
          <span>Opportunity-focused</span>
          <span className="h-1 w-1 rounded-full bg-[var(--accent)]/40" />
          <span>Built for people</span>
        </div>
      </div>
    </main>
  );
}
