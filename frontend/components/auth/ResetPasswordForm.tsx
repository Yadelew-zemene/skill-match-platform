"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("This password reset link is invalid or missing its token.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      setSuccess(
        response.data.message || "Your password has been reset successfully.",
      );

      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Unable to reset your password. The link may have expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-6 py-12">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[var(--primary)]/15 blur-3xl motion-safe:animate-pulse" />

        <div className="absolute -bottom-40 -right-32 h-[460px] w-[460px] rounded-full bg-[var(--accent)]/15 blur-3xl motion-safe:animate-pulse" />

        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79,70,229,0.10) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[var(--primary)]/5 to-transparent" />
      </div>

      {/* CONTENT */}

      <div className="relative z-10 w-full max-w-md">
        {/* BRAND */}

        <div className="mb-8 text-center">
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

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--primary)]/30" />

            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
              Secure account recovery
            </div>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--accent)]/30" />
          </div>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Create a new password to securely regain access to your SkillMatch
            account.
          </p>
        </div>

        {/* RESET PASSWORD CARD */}

        <div className="group relative">
          <div className="absolute -inset-1 rounded-[25px] bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent)]/15 to-[var(--primary)]/20 opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative rounded-[22px] bg-gradient-to-br from-[var(--primary)]/30 via-[var(--border)] to-[var(--accent)]/25 p-px">
            <div className="rounded-[21px] border border-white/60 bg-[var(--surface)]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* HEADER */}

              <div className="mb-7">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <LockKeyhole className="h-5 w-5" />
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  {token ? "Reset your password" : "Invalid reset link"}
                </h1>

                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {token
                    ? "Choose a new password for your account. Make sure it's at least 8 characters long."
                    : "This password reset link is missing its token. Request a new link to continue."}
                </p>
              </div>

              {!token ? (
                <>
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-400"
                  >
                    Your reset link is invalid. Please request a new password
                    reset link.
                  </div>

                  <Link
                    href="/forgot-password"
                    className="group/button relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary)] via-indigo-500 to-[var(--accent)] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Request a new reset link
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                  </Link>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* NEW PASSWORD */}

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
                    >
                      New password
                    </label>

                    <div className="group/input relative">
                      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 opacity-0 blur-sm transition-opacity duration-300 group-focus-within/input:opacity-100" />

                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={8}
                          autoComplete="new-password"
                          disabled={loading || !!success}
                          className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3.5 pr-12 text-sm text-[var(--foreground)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-[var(--text-muted)]">
                      Use at least 8 characters.
                    </p>
                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
                    >
                      Confirm new password
                    </label>

                    <div className="group/input relative">
                      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 opacity-0 blur-sm transition-opacity duration-300 group-focus-within/input:opacity-100" />

                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                          disabled={loading || !!success}
                          className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3.5 pr-12 text-sm text-[var(--foreground)] outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)]/30 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ERROR */}

                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-400"
                    >
                      {error}
                    </div>
                  )}

                  {/* SUCCESS */}

                  {success && (
                    <div
                      role="status"
                      className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-400"
                    >
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{success}</span>
                      </div>

                      <p className="mt-2 pl-6 text-xs text-emerald-400/80">
                        Your password has been updated. You can now sign in
                        using your new password.
                      </p>
                    </div>
                  )}

                  {/* SUBMIT */}

                  {!success && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="group/button relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary)] via-indigo-500 to-[var(--accent)] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/25 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />

                      <span className="relative flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Resetting password...
                          </>
                        ) : (
                          <>
                            Reset password
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                          </>
                        )}
                      </span>
                    </button>
                  )}

                  {/* LOGIN LINK */}

                  {success ? (
                    <Link
                      href="/login"
                      className="group/login flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    >
                      Go to login
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/login:translate-x-0.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="group/login flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/login:-translate-x-0.5" />
                      Back to login
                    </Link>
                  )}
                </form>
              )}

              {/* REASSURANCE */}

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                  <Check className="h-3 w-3" />
                </span>

                <span>Secure password recovery</span>

                <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />

                <span>Account protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK TO HOME */}

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

        {/* BOTTOM PRINCIPLES */}

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
