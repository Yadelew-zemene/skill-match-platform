"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getDashboardRoute } from "@/utils/redirect";
import { useAuth } from "@/contexts/AuthContext";

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
            Build your profile. Find the right opportunity.
          </p>
        </div>

        {/* CARD */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Join SkillMatch and connect your skills with the right
              opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
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
                className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
              />
            </div>

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
                className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[var(--foreground)]"
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
                className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10"
              />

              <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                Use at least 6 characters.
              </p>
            </div>

            {/* ROLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                I am joining as
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("candidate")}
                  className={`rounded-lg border px-4 py-3 text-left transition ${
                    role === "candidate"
                      ? "border-[var(--brand)] bg-[var(--brand)]/[0.08]"
                      : "border-[var(--border-strong)] bg-[var(--surface-elevated)] hover:border-white/20"
                  }`}
                >
                  <span
                    className={`block text-sm font-semibold ${
                      role === "candidate"
                        ? "text-[var(--brand)]"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    Candidate
                  </span>

                  <span className="mt-1 block text-xs text-[var(--muted-foreground)]">
                    Find opportunities
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("employer")}
                  className={`rounded-lg border px-4 py-3 text-left transition ${
                    role === "employer"
                      ? "border-[var(--brand)] bg-[var(--brand)]/[0.08]"
                      : "border-[var(--border-strong)] bg-[var(--surface-elevated)] hover:border-white/20"
                  }`}
                >
                  <span
                    className={`block text-sm font-semibold ${
                      role === "employer"
                        ? "text-[var(--brand)]"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    Employer
                  </span>

                  <span className="mt-1 block text-xs text-[var(--muted-foreground)]">
                    Find talent
                  </span>
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--brand)] px-4 py-3.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            {/* LOGIN */}
            <p className="pt-1 text-center text-sm text-[var(--muted-foreground)]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--brand)] transition hover:text-[var(--brand-hover)]"
              >
                Sign in
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
