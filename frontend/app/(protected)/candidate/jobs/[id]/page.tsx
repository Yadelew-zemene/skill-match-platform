"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          <div className="h-5 w-32 animate-pulse bg-[var(--surface)]" />

          <div className="mt-8 h-10 w-2/3 animate-pulse bg-[var(--surface)]" />

          <div className="mt-3 h-5 w-1/3 animate-pulse bg-[var(--surface)]" />

          <div className="mt-10 h-64 animate-pulse bg-[var(--surface)]" />
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          <Link
            href="/candidate/jobs"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--brand)]"
          >
            ← Back to jobs
          </Link>

          <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
            <h1 className="text-xl font-semibold">Job not available</h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              {error || "This job may have been closed or removed."}
            </p>

            <Link
              href="/candidate/jobs"
              className="mt-6 inline-flex border border-[var(--border)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
            >
              Browse jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const matchScore = Math.round(Number(job.match_score));

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8 lg:py-10">
        {/* BACK */}
        <Link
          href="/candidate/jobs"
          className="text-sm text-[var(--muted)] transition hover:text-[var(--brand)]"
        >
          ← Back to jobs
        </Link>

        {/* JOB HEADER */}
        <section className="mt-8 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--brand)]">
                Job opportunity
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {job.title}
              </h1>

              <p className="mt-3 text-base text-[var(--muted)]">
                {job.company || "Company not specified"}
              </p>

              <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                Posted {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* MATCH */}
            <div className="border border-[var(--brand)]/20 bg-[var(--brand)]/10 px-6 py-4 text-center">
              <p className="text-3xl font-bold text-[var(--brand)]">
                {matchScore}%
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Skill match
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* DESCRIPTION */}
          <section className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Job description</h2>

            <div className="mt-5 whitespace-pre-line text-sm leading-7 text-[var(--muted)]">
              {job.description}
            </div>
          </section>

          {/* APPLICATION PANEL */}
          <aside className="h-fit border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm font-semibold">Interested in this role?</p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Apply through SkillMatch using your active resume.
            </p>

            <Link
              href={`/candidate/jobs/${job.id}/apply`}
              className="mt-6 flex w-full items-center justify-center bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-[#12141e] transition hover:bg-[var(--brand-hover)]"
            >
              Apply now
            </Link>

            {job.application_link && (
              <a
                href={job.application_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center border border-[var(--border)] px-5 py-3 text-sm font-medium transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
              >
                External application
              </a>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CandidateJobDetailsPage;
