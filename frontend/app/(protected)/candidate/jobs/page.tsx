"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Sparkles,
} from "lucide-react";

import { fetchCandidateJobs } from "@/services/job.service";
import { CandidateJob } from "@/types/jobs";

const PAGE_SIZE = 10;

const CandidateJobsPage = () => {
  const [jobs, setJobs] = useState<CandidateJob[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchCandidateJobs(page, PAGE_SIZE);

      setJobs(data.jobs);
      setTotalPages(data.pagination.totalPages);
      setTotalJobs(data.pagination.total);
    } catch (err) {
      console.error("Failed to load candidate jobs:", err);
      setError("Failed to load available jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return (
    <main className="relative min-h-full overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* ================================================================
          AMBIENT BACKGROUND
      ================================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[var(--primary)]/8 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[var(--accent)]/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--primary)]/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* ================================================================
          CONTENT
      ================================================================= */}
      <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        {/* ================================================================
            HEADER
        ================================================================= */}
        <section className="mb-9">
          <Link
            href="/candidate/dashboard"
            className="
              group inline-flex items-center gap-2
              text-sm font-medium
              text-[var(--text-secondary)]
              transition-colors duration-200
              hover:text-[var(--primary)]
            "
          >
            <ArrowLeft
              size={16}
              className="
                transition-transform duration-200
                group-hover:-translate-x-1
              "
            />
            Back to dashboard
          </Link>

          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div
                className="
                  mb-3 inline-flex items-center gap-2
                  rounded-full
                  border border-[var(--primary)]/15
                  bg-[var(--primary-light)]
                  px-3 py-1.5
                  text-xs font-semibold
                  text-[var(--primary)]
                  shadow-sm
                "
              >
                <Sparkles size={13} />
                <span>Career opportunities</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Find your next{" "}
                <span
                  className="
                    bg-gradient-to-r
                    from-[var(--primary)]
                    via-indigo-500
                    to-[var(--accent)]
                    bg-clip-text
                    text-transparent
                  "
                >
                  opportunity
                </span>
              </h1>

              <p
                className="
                  mt-3 max-w-2xl
                  text-sm leading-7
                  text-[var(--text-secondary)]
                  sm:text-base
                "
              >
                Explore active roles matched to your skills, experience, and
                professional profile.
              </p>
            </div>

            {/* Results summary */}
            {!loading && !error && (
              <div
                className="
                  shrink-0 rounded-2xl
                  border border-[var(--border)]
                  bg-[var(--surface)]/85
                  px-5 py-4
                  shadow-sm backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-[var(--primary)]/15
                      to-[var(--accent)]/15
                      text-[var(--primary)]
                    "
                  >
                    <BriefcaseBusiness size={19} />
                  </div>

                  <div>
                    <p className="text-lg font-bold text-[var(--text-primary)]">
                      {totalJobs}
                    </p>

                    <p className="text-xs text-[var(--text-muted)]">
                      {totalJobs === 1
                        ? "opportunity available"
                        : "opportunities available"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================
            ERROR
        ================================================================= */}
        {error && (
          <section
            className="
              relative overflow-hidden
              rounded-3xl
              border border-[var(--error)]/20
              bg-[var(--surface)]
              p-7 shadow-sm
            "
          >
            <div
              className="
                absolute inset-x-0 top-0 h-px
                bg-gradient-to-r
                from-transparent
                via-[var(--error)]/50
                to-transparent
              "
            />

            <div
              className="
                flex flex-col items-start gap-5
                sm:flex-row sm:items-center
                sm:justify-between
              "
            >
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl
                      bg-[var(--error-light)]
                      text-[var(--error)]
                    "
                  >
                    <BriefcaseBusiness size={18} />
                  </div>

                  <h2 className="font-semibold text-[var(--text-primary)]">
                    Something went wrong
                  </h2>
                </div>

                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={loadJobs}
                className="
                  group inline-flex items-center gap-2
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  px-4 py-2.5
                  text-sm font-semibold
                  text-[var(--text-primary)]
                  shadow-sm
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[var(--primary)]/30
                  hover:text-[var(--primary)]
                  hover:shadow-md
                "
              >
                <RotateCw
                  size={15}
                  className="
                    transition-transform duration-500
                    group-hover:rotate-180
                  "
                />
                Try again
              </button>
            </div>
          </section>
        )}

        {/* ================================================================
            LOADING
        ================================================================= */}
        {loading && (
          <section
            className="
              grid grid-cols-1 gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="
                  relative min-h-[370px]
                  overflow-hidden
                  rounded-3xl
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  p-6 shadow-sm
                "
              >
                <div
                  className="
                    absolute inset-0
                    -translate-x-full
                    animate-[shimmer_2s_infinite]
                    bg-gradient-to-r
                    from-transparent
                    via-white/40
                    to-transparent
                  "
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 gap-3.5">
                    <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-[var(--surface-soft)]" />

                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-3/4 animate-pulse rounded-md bg-[var(--surface-soft)]" />
                      <div className="h-4 w-1/2 animate-pulse rounded-md bg-[var(--surface-soft)]" />
                    </div>
                  </div>

                  <div className="h-[68px] w-[68px] shrink-0 animate-pulse rounded-2xl bg-[var(--surface-soft)]" />
                </div>

                <div className="mt-6">
                  <div className="h-3 w-2/5 animate-pulse rounded bg-[var(--surface-soft)]" />
                  <div className="mt-3 h-2 animate-pulse rounded-full bg-[var(--surface-soft)]" />
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-3 w-full animate-pulse rounded bg-[var(--surface-soft)]" />
                  <div className="h-3 w-full animate-pulse rounded bg-[var(--surface-soft)]" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-[var(--surface-soft)]" />
                </div>

                <div className="mt-6 h-20 animate-pulse rounded-2xl bg-[var(--surface-soft)]" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-soft)]" />
                  <div className="h-10 w-28 animate-pulse rounded-xl bg-[var(--surface-soft)]" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ================================================================
            EMPTY STATE
        ================================================================= */}
        {!loading && !error && jobs.length === 0 && (
          <section
            className="
              relative overflow-hidden
              rounded-3xl
              border border-[var(--border)]
              bg-[var(--surface)]
              px-6 py-20
              text-center shadow-sm
            "
          >
            <div
              className="
                absolute -left-20 -top-20
                h-48 w-48 rounded-full
                bg-[var(--primary)]/10 blur-3xl
              "
            />

            <div
              className="
                absolute -bottom-20 -right-20
                h-48 w-48 rounded-full
                bg-[var(--accent)]/10 blur-3xl
              "
            />

            <div className="relative">
              <div
                className="
                  mx-auto flex h-16 w-16
                  items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-[var(--primary)]/15
                  to-[var(--accent)]/15
                  text-[var(--primary)]
                  shadow-sm
                "
              >
                <BriefcaseBusiness size={27} />
              </div>

              <h2 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                No opportunities available
              </h2>

              <p
                className="
                  mx-auto mt-3 max-w-md
                  text-sm leading-6
                  text-[var(--text-secondary)]
                "
              >
                There are currently no active opportunities available. Check
                back later as new roles are added.
              </p>

              <button
                type="button"
                onClick={loadJobs}
                className="
                  mt-7 inline-flex items-center gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[var(--primary)]
                  to-[var(--accent)]
                  px-5 py-2.5
                  text-sm font-semibold text-white
                  shadow-lg shadow-[var(--primary)]/20
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  hover:shadow-[var(--primary)]/25
                "
              >
                <RotateCw size={15} />
                Check again
              </button>
            </div>
          </section>
        )}

        {/* ================================================================
            JOB GRID
        ================================================================= */}
        {!loading && !error && jobs.length > 0 && (
          <>
            <section
              className="
                grid grid-cols-1 gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {jobs.map((job) => {
                const matchScore = Math.min(
                  100,
                  Math.max(0, Math.round(Number(job.match_score))),
                );

                const getScoreLabel = () => {
                  if (matchScore >= 90) return "Excellent match";
                  if (matchScore >= 75) return "Strong match";
                  if (matchScore >= 60) return "Good match";
                  return "Potential match";
                };

                return (
                  <article
                    key={job.id}
                    className="
                      group relative flex h-full
                      flex-col overflow-hidden
                      rounded-3xl
                      border border-[var(--border)]
                      bg-[var(--surface)]
                      shadow-sm
                      transition-all duration-300 ease-out
                      hover:-translate-y-1
                      hover:border-[var(--primary)]/30
                      hover:shadow-xl
                      hover:shadow-[var(--primary)]/8
                    "
                  >
                    {/* Ambient glow */}
                    <div
                      className="
                        pointer-events-none
                        absolute -right-16 -top-16
                        h-32 w-32 rounded-full
                        bg-[var(--primary)]/0
                        blur-3xl
                        transition-all duration-500
                        group-hover:bg-[var(--primary)]/10
                      "
                    />

                    {/* Top gradient */}
                    <div
                      className="
                        absolute inset-x-0 top-0 h-1
                        bg-gradient-to-r
                        from-[var(--primary)]
                        via-[var(--accent)]
                        to-[var(--primary)]
                        opacity-70
                        transition-opacity duration-300
                        group-hover:opacity-100
                      "
                    />

                    <div className="relative flex flex-1 flex-col p-6">
                      {/* CARD HEADER */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 gap-3.5">
                          <div
                            className="
                              flex h-11 w-11 shrink-0
                              items-center justify-center
                              rounded-xl
                              border border-[var(--primary)]/15
                              bg-gradient-to-br
                              from-[var(--primary-light)]
                              to-[var(--accent-light)]
                              text-[var(--primary)]
                              transition-transform duration-300
                              group-hover:scale-105
                            "
                          >
                            <Building2 size={19} />
                          </div>

                          <div className="min-w-0">
                            <h2
                              className="
                                line-clamp-2
                                text-lg font-semibold leading-snug
                                text-[var(--foreground)]
                                transition-colors duration-200
                                group-hover:text-[var(--primary)]
                              "
                            >
                              {job.title}
                            </h2>

                            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                              {job.company || "Company not specified"}
                            </p>
                          </div>
                        </div>

                        {/* Match score */}
                        <div
                          className="
                            flex shrink-0 flex-col items-center
                            rounded-2xl
                            border border-[var(--primary)]/15
                            bg-gradient-to-br
                            from-[var(--primary-light)]
                            to-[var(--accent-light)]
                            px-3 py-2.5
                          "
                        >
                          <span
                            className="
                              bg-gradient-to-r
                              from-[var(--primary)]
                              to-[var(--accent)]
                              bg-clip-text
                              text-lg font-bold leading-none
                              text-transparent
                            "
                          >
                            {matchScore}%
                          </span>

                          <span
                            className="
                              mt-1
                              text-[10px] font-semibold
                              uppercase tracking-[0.12em]
                              text-[var(--text-muted)]
                            "
                          >
                            Match
                          </span>
                        </div>
                      </div>

                      {/* MATCH STRENGTH */}
                      <div className="mt-6">
                        <div className="mb-2.5 flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold text-[var(--foreground)]">
                            {getScoreLabel()}
                          </span>

                          <span className="text-[11px] text-[var(--text-muted)]">
                            Skills alignment
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                          <div
                            className="
                              h-full rounded-full
                              bg-gradient-to-r
                              from-[var(--primary)]
                              to-[var(--accent)]
                              transition-all duration-700 ease-out
                            "
                            style={{
                              width: `${matchScore}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* DESCRIPTION */}
                      <div className="mt-6">
                        <p className="line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                          {job.description ||
                            "No description has been provided for this opportunity."}
                        </p>
                      </div>

                      {/* MATCH INSIGHT */}
                      <div
                        className="
                          mt-5 rounded-2xl
                          border border-[var(--primary)]/10
                          bg-gradient-to-br
                          from-[var(--primary-light)]/70
                          to-[var(--accent-light)]/50
                          p-4
                        "
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="
                              flex h-8 w-8 shrink-0
                              items-center justify-center
                              rounded-xl
                              bg-[var(--surface)]
                              text-[var(--primary)]
                              shadow-sm
                            "
                          >
                            <Sparkles size={15} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[var(--foreground)]">
                              Why this matches
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                              Your skills and experience align with the
                              requirements of this job.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div
                        className="
                          mt-auto flex items-center
                          justify-between gap-4
                          pt-6
                        "
                      >
                        <div
                          className="
                            flex items-center gap-1.5
                            text-xs text-[var(--text-muted)]
                          "
                        >
                          <CalendarDays size={14} />
                          <span>
                            {new Date(job.created_at).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>

                        <Link
                          href={`/candidate/jobs/${job.id}`}
                          className="
                                    group/button relative flex w-full items-center justify-center gap-2
                                    overflow-hidden rounded-xl
                                    bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]
                                    px-4 py-3
                                    text-sm font-semibold text-white
                                    shadow-sm
                                    transition-all duration-200
                                    hover:-translate-y-0.5
                                    hover:shadow-lg hover:shadow-[var(--primary)]/20
                                    active:translate-y-0
            "
                        >
                          <span>View job</span>

                          <ArrowUpRight
                            className="
                                      h-4 w-4
                                      transition-transform duration-200
                                      group-hover/button:translate-x-0.5
                                      group-hover/button:-translate-y-0.5
                                    "
                                                />

                          {/* Hover shimmer */}
                          <span
                          className="
                              pointer-events-none absolute inset-y-0 -left-1/2 w-1/3
                              -skew-x-12 bg-white/15
                              transition-transform duration-700
                              group-hover/button:translate-x-[420%]
              "
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* ================================================================
                PAGINATION
            ================================================================= */}
            {totalPages > 1 && (
              <section className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
                <p className="text-xs text-[var(--text-muted)]">
                  Page <span className="font-medium text-[var(--foreground)]">{page}</span> of{" "}
                  <span className="font-medium text-[var(--foreground)]">{totalPages}</span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    className="
                      inline-flex items-center gap-1.5
                      rounded-xl border border-[var(--border)]
                      bg-[var(--surface)] px-3 py-2
                      text-xs font-semibold text-[var(--text-primary)]
                      shadow-sm transition-all duration-200
                      hover:border-[var(--primary)]/30 hover:text-[var(--primary)]
                      disabled:pointer-events-none disabled:opacity-40
                    "
                  >
                    <ChevronLeft size={15} />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                    className="
                      inline-flex items-center gap-1.5
                      rounded-xl border border-[var(--border)]
                      bg-[var(--surface)] px-3 py-2
                      text-xs font-semibold text-[var(--text-primary)]
                      shadow-sm transition-all duration-200
                      hover:border-[var(--primary)]/30 hover:text-[var(--primary)]
                      disabled:pointer-events-none disabled:opacity-40
                    "
                  >
                    <span>Next</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default CandidateJobsPage;