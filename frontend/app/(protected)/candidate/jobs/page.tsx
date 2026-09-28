"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
    } catch (error) {
      console.error("Failed to load candidate jobs:", error);
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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        {/* HEADER */}
        <section className="mb-10">
          <Link
            href="/candidate/dashboard"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--brand)]"
          >
            ← Back to dashboard
          </Link>

          <div className="mt-6">
            <p className="text-sm font-medium text-[var(--brand)]">
              Opportunities
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore jobs
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Browse active opportunities and see how well each role matches
              your current skills.
            </p>
          </div>

          {!loading && !error && (
            <p className="mt-5 text-sm text-[var(--muted-foreground)]">
              {totalJobs} {totalJobs === 1 ? "opportunity" : "opportunities"}{" "}
              available
            </p>
          )}
        </section>

        {/* ERROR */}
        {error && (
          <div className="border border-red-500/20 bg-[var(--surface)] p-6">
            <p className="text-sm font-medium text-red-400">{error}</p>

            <button
              onClick={loadJobs}
              className="mt-4 border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
            >
              Try again
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse border border-[var(--border)] bg-[var(--surface)]"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && jobs.length === 0 && (
          <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[var(--brand)]/20 bg-[var(--brand)]/10 text-[var(--brand)]">
              ✦
            </div>

            <h2 className="mt-5 text-lg font-semibold">No jobs available</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              There are currently no active opportunities available. Check again
              later for new jobs.
            </p>
          </div>
        )}

        {/* JOBS */}
        {!loading && !error && jobs.length > 0 && (
          <>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="flex min-h-[300px] flex-col border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--brand)]/30"
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold leading-6">
                        {job.title}
                      </h2>

                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {job.company || "Company not specified"}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-2xl font-bold text-[var(--brand)]">
                        {Math.round(Number(job.match_score))}%
                      </p>

                      <p className="text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">
                        match
                      </p>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-5 line-clamp-4 text-sm leading-6 text-[var(--muted)]">
                    {job.description}
                  </p>

                  {/* FOOTER */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>

                    <Link
                      href={`/candidate/jobs/${job.id}`}
                      className="border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
                    >
                      View job
                    </Link>
                  </div>
                </article>
              ))}
            </section>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4 border-t border-[var(--border)] pt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-[var(--muted)]">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default CandidateJobsPage;
