"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getDashboardRoute } from "@/utils/redirect";
import { useAuth } from "@/contexts/AuthContext";

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

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function BriefcaseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(name, email, password, role);

      if (res.token && res.user) {
        login(res.token, res.user);
        router.push(getDashboardRoute(res.user.role));
      } else {
        toast.success("Account created");
        router.push("/login");
      }
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-6 py-10 sm:py-12">
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary glow */}
        <div className="absolute -left-40 -top-40 h-[460px] w-[460px] rounded-full bg-[var(--primary)]/15 blur-3xl motion-safe:animate-pulse" />

        {/* Cyan glow */}
        <div className="absolute -bottom-44 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--accent)]/15 blur-3xl motion-safe:animate-pulse" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/5 blur-3xl" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79,70,229,0.09) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[var(--primary)]/5 to-transparent" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 w-full max-w-md">
        {/* =======================================================
            BRAND
        ======================================================== */}

        <div className="mb-7 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative">
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

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--primary)]/30" />

            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
              <SparklesIcon className="h-3.5 w-3.5 text-[var(--primary)]" />
              Join the skills-first marketplace
            </div>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--accent)]/30" />
          </div>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Create your account and start connecting skills with meaningful
            opportunities.
          </p>
        </div>

        {/* =========================================================
            CARD
        ========================================================== */}

        <div className="group relative">
          {/* Outer glow */}

          <div className="absolute -inset-1 rounded-[25px] bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent)]/15 to-[var(--primary)]/20 opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

          {/* Gradient border */}

          <div className="relative rounded-[22px] bg-gradient-to-br from-[var(--primary)]/30 via-[var(--border)] to-[var(--accent)]/25 p-px">
            <div className="rounded-[21px] border border-white/60 bg-[var(--surface)]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* =================================================
                  HEADER
              ================================================== */}

              <div className="mb-7">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <SparklesIcon className="h-5 w-5" />
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Create your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Tell us a little about yourself so SkillMatch can connect you
                  with the right opportunities.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* =================================================
                    NAME
                ================================================== */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* =================================================
                    EMAIL
                ================================================== */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
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
                    className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10"
                  />
                </div>

                {/* =================================================
                    PASSWORD
                ================================================== */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10"
                  />

                  <div className="mt-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    Use at least 6 characters.
                  </div>
                </div>

                {/* =================================================
                    ROLE
                ================================================== */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-[var(--foreground)]">
                      I am joining as
                    </label>

                    <span className="text-xs text-[var(--text-muted)]">
                      Choose your path
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Candidate */}

                    <button
                      type="button"
                      onClick={() => setRole("candidate")}
                      className={`group/role relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                        role === "candidate"
                          ? "border-[var(--primary)] bg-[var(--primary-light)] shadow-md shadow-[var(--primary)]/10"
                          : "border-[var(--border-strong)] bg-[var(--background)] hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--surface)]"
                      }`}
                    >
                      {role === "candidate" && (
                        <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-[var(--primary)]/10 blur-2xl" />
                      )}

                      <div className="relative">
                        <div
                          className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                            role === "candidate"
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--surface-soft)] text-[var(--text-secondary)] group-hover/role:text-[var(--primary)]"
                          }`}
                        >
                          <UserIcon className="h-4.5 w-4.5" />
                        </div>

                        <span
                          className={`block text-sm font-semibold ${
                            role === "candidate"
                              ? "text-[var(--primary)]"
                              : "text-[var(--foreground)]"
                          }`}
                        >
                          Candidate
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">
                          Find opportunities
                        </span>

                        {role === "candidate" && (
                          <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--primary)]">
                            <CheckIcon className="h-3 w-3" />
                            Selected
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Employer */}

                    <button
                      type="button"
                      onClick={() => setRole("employer")}
                      className={`group/role relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                        role === "employer"
                          ? "border-[var(--primary)] bg-[var(--primary-light)] shadow-md shadow-[var(--primary)]/10"
                          : "border-[var(--border-strong)] bg-[var(--background)] hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--surface)]"
                      }`}
                    >
                      {role === "employer" && (
                        <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-[var(--accent)]/10 blur-2xl" />
                      )}

                      <div className="relative">
                        <div
                          className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                            role === "employer"
                              ? "bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white"
                              : "bg-[var(--surface-soft)] text-[var(--text-secondary)] group-hover/role:text-[var(--primary)]"
                          }`}
                        >
                          <BriefcaseIcon className="h-4.5 w-4.5" />
                        </div>

                        <span
                          className={`block text-sm font-semibold ${
                            role === "employer"
                              ? "text-[var(--primary)]"
                              : "text-[var(--foreground)]"
                          }`}
                        >
                          Employer
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">
                          Find talented people
                        </span>

                        {role === "employer" && (
                          <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--primary)]">
                            <CheckIcon className="h-3 w-3" />
                            Selected
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* =================================================
                    SUBMIT
                ================================================== */}

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
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                      </>
                    )}
                  </span>
                </button>

                {/* =================================================
                    LOGIN DIVIDER
                ================================================== */}

                <div className="relative py-1">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--border)]" />

                  <div className="relative mx-auto w-fit bg-[var(--surface)] px-3 text-xs text-[var(--text-muted)]">
                    Already have an account?
                  </div>
                </div>

                <Link
                  href="/login"
                  className="group/login flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                >
                  Sign in
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/login:translate-x-0.5" />
                </Link>
              </form>

              {/* =================================================
                  BOTTOM NOTE
              ================================================== */}

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                  <CheckIcon className="h-3 w-3" />
                </span>

                <span>Your profile starts with your skills</span>
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

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
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
