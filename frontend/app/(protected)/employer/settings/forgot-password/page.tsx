"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { forgotPassword } from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email.trim());

      setSuccess(response.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Unable to process your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text)]"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-lg sm:p-9">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
            <Mail size={23} />
          </div>

          <h1 className="text-2xl font-bold text-[var(--text)]">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Enter the email address associated with your SkillMatch account.
            We&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[var(--text)]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--brand)]"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500"
              >
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-[#12141e] transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[var(--text-secondary)]">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-[var(--brand)] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
