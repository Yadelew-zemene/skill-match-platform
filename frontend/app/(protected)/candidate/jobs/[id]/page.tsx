"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  RotateCw,
  Sparkles,
} from "lucide-react";

import { fetchCandidateJob } from "@/services/job.service";
import { CandidateJob } from "@/types/jobs";

const CandidateJobDetailsPage = () => {
  const params = useParams();
  const id = Number(params.id);

  const [job, setJob] = useState<CandidateJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!Number.isInteger(id) || id <= 0) {
        setError("Invalid job.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await fetchCandidateJob(id);
        setJob(data);
      } catch (error) {
        console.error("Failed to load job:", error);
        setError("This job could not be found.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  /* -------------------------------------------------------------------------- */
  /* LOADING                                                                    */
  /* -------------------------------------------------------------------------- */

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="absolute right-[-12rem] top-40 h-[30rem] w-[30rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Back skeleton */}
          <div className="h-5 w-32 animate-pulse rounded bg-[var(--surface)]" />

          {/* Header skeleton */}
          <section className="mt-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 space-y-4">
                <div className="h-5 w-32 animate-pulse rounded bg-[var(--surface-soft)]" />
                <div className="h-10 w-3/4 animate-pulse rounded-lg bg-[var(--surface-soft)]" />
                <div className="h-5 w-48 animate-pulse rounded bg-[var(--surface-soft)]" />
                <div className="h-4 w-36 animate-pulse rounded bg-[var(--surface-soft)]" />
              </div>

              <div className="h-28 w-32 animate-pulse rounded-2xl bg-[var(--surface-soft)]" />
            </div>
          </section>

          {/* Content skeleton */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
              <div className="h-6 w-44 animate-pulse rounded bg-[var(--surface-soft)]" />

              <div className="mt-7 space-y-4">
                <div className="h-4 w-full animate-pulse rounded bg-[var(--surface-soft)]" />
                <div className="h-4 w-full animate-pulse rounded bg-[var(--surface-soft)]" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-[var(--surface-soft)]" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-[var(--surface-soft)]" />
              </div>
            </section>

            <aside className="h-64 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm" />
          </div>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* ERROR                                                                      */
  /* -------------------------------------------------------------------------- */

  if (error || !job) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="absolute right-[-12rem] top-40 h-[30rem] w-[30rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Link
            href="/candidate/jobs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--primary)]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to jobs
          </Link>

          <section className="relative mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center shadow-sm">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 text-[var(--primary)]">
                <BriefcaseBusiness size={27} />
              </div>

              <h1 className="mt-6 text-xl font-bold">Job not available</h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                {error || "This job may have been closed or removed."}
              </p>

              <Link
                href="/candidate/jobs"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/25"
              >
                Browse jobs
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const matchScore = Math.round(Number(job.match_score));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* -------------------------------------------------------------------- */}
      {/* AMBIENT BACKGROUND                                                   */}
      {/* -------------------------------------------------------------------- */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="absolute right-[-12rem] top-20 h-[30rem] w-[30rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />

        <div className="absolute bottom-[-15rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-[var(--primary)]/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ------------------------------------------------------------------ */}
        {/* BACK                                                               */}
        {/* ------------------------------------------------------------------ */}

        <Link
          href="/candidate/jobs"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--primary)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to opportunities
        </Link>

        {/* ------------------------------------------------------------------ */}
        {/* JOB HEADER                                                         */}
        {/* ------------------------------------------------------------------ */}

        <section className="relative mt-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          {/* Top gradient line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-[var(--accent)]" />

          {/* Header glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              {/* Job information */}
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
                  <Sparkles size={13} />
                  Job opportunity
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                  {job.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--primary)]">
                      <Building2 size={16} />
                    </div>

                    {job.company || "Company not specified"}
                  </div>

                  <div className="hidden h-4 w-px bg-[var(--border)] sm:block" />

                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <CalendarDays size={15} />
                    Posted{" "}
                    {new Date(job.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {/* Match score */}
              <div className="relative shrink-0">
                <div className="rounded-3xl bg-gradient-to-br from-[var(--primary)] via-indigo-500 to-[var(--accent)] p-[1px] shadow-lg shadow-[var(--primary)]/15">
                  <div className="rounded-[23px] bg-[var(--surface)] px-7 py-5 text-center">
                    <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-4xl font-bold text-transparent">
                      {matchScore}%
                    </div>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Skill match
                    </p>

                    <div className="mx-auto mt-4 h-1.5 w-28 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-700"
                        style={{
                          width: `${Math.min(Math.max(matchScore, 0), 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* MAIN CONTENT                                                       */}
        {/* ------------------------------------------------------------------ */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ---------------------------------------------------------------- */}
          {/* DESCRIPTION                                                       */}
          {/* ---------------------------------------------------------------- */}

          <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 text-[var(--primary)]">
                  <FileText size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Job description
                  </h2>

                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    About this opportunity
                  </p>
                </div>
              </div>

              <div className="mt-7 whitespace-pre-line text-sm leading-7 text-[var(--text-secondary)]">
                {job.description ||
                  "No description has been provided for this opportunity."}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* APPLICATION PANEL                                                 */}
          {/* ---------------------------------------------------------------- */}

          <aside className="h-fit lg:sticky lg:top-6">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-slate-900/5">
              {/* Gradient accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] via-indigo-500 to-[var(--accent)]" />

              {/* Subtle glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--primary)]/10 blur-3xl" />

              <div className="relative p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 text-[var(--primary)]">
                  <BriefcaseBusiness size={19} />
                </div>

                <h2 className="mt-5 text-lg font-bold text-[var(--text-primary)]">
                  Interested in this role?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Apply through SkillMatch using your active resume and
                  professional profile.
                </p>

                {/* Match reassurance */}
                <div className="mt-6 rounded-xl border border-[var(--success)]/15 bg-[var(--success-light)] p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[var(--success)]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {matchScore}% skill match
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                        This opportunity matches your current candidate profile.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Apply */}
                <Link
                  href={`/candidate/jobs/${job.id}/apply`}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-indigo-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/25"
                >
                  Apply now
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>

                {/* External application */}
                {job.application_link && (
                  <>
                    <div className="my-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-[var(--border)]" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Or
                      </span>
                      <div className="h-px flex-1 bg-[var(--border)]" />
                    </div>

                    <a
                      href={job.application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:text-[var(--primary)] hover:shadow-md"
                    >
                      External application
                      <ExternalLink
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </a>
                  </>
                )}

                <p className="mt-5 text-center text-[11px] leading-5 text-[var(--text-muted)]">
                  Your application will use the information currently saved on
                  your SkillMatch profile.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CandidateJobDetailsPage;
