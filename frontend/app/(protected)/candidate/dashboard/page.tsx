"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import MatchedJobCard from "@/components/ui/MachedJobCard";
import CandidateResumeSection from "@/components/candidate/CandidateResumeSection";
import { useCandidateJobs } from "@/hooks/usecandidateJobs";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { jobs, loading, refresh } = useCandidateJobs();

  const MAX_DASHBOARD_JOBS = 6;

  const topJobs = jobs.slice(0, MAX_DASHBOARD_JOBS);
  const hasMoreJobs = jobs.length > MAX_DASHBOARD_JOBS;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <section className="mb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-[var(--brand)]">
                Candidate workspace
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back, {user?.name?.split(" ")[0] || "there"}.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Discover opportunities that match your skills, experience, and
                career goals.
              </p>
            </div>

            {/* MATCH COUNT */}
            <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-3">
              <p className="text-xs text-[var(--muted-foreground)]">
                Available matches
              </p>

              <p className="mt-1 text-2xl font-bold">{jobs.length}</p>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROFILE STATUS
        ========================================================= */}
        <section className="mb-12 grid gap-4 lg:grid-cols-3">
          {/* PROFILE STRENGTH */}
          <div className="border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Improve your profile</p>

                <p className="mt-1 max-w-xl text-sm leading-6 text-[var(--muted)]">
                  Keep your resume up to date to receive more relevant
                  AI-assisted job recommendations.
                </p>
              </div>

              <span className="inline-flex w-fit shrink-0 items-center border border-[var(--brand)]/20 bg-[var(--brand)]/10 px-3 py-1.5 text-xs font-medium text-[var(--brand)]">
                Resume recommended
              </span>
            </div>

            <div className="mt-6 h-1.5 overflow-hidden bg-[var(--surface-elevated)]">
              <div
                className="h-full bg-[var(--brand)]"
                style={{ width: "70%" }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-[var(--muted-foreground)]">
              <span>Profile strength</span>
              <span>70%</span>
            </div>
          </div>

          {/* MATCHING OVERVIEW */}
          <div className="border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm font-semibold">Matching overview</p>

            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">
                  Available jobs
                </span>

                <span className="font-semibold">{jobs.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">
                  Profile status
                </span>

                <span className="text-sm font-medium text-[var(--success)]">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">
                  Matching engine
                </span>

                <span className="text-sm font-medium text-[var(--brand)]">
                  AI-assisted
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RESUME MANAGEMENT
        ========================================================= */}
        <section className="mb-14">
          <CandidateResumeSection onResumeChange={refresh} />
        </section>

        {/* =========================================================
            TOP JOB MATCHES
        ========================================================= */}
        <section>
          {/* SECTION HEADER */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--brand)]">
                Personalized for you
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Top matches
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                The opportunities with the strongest match to your skills.
              </p>
            </div>

            {hasMoreJobs && (
              <Link
                href="/candidate/jobs"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] transition hover:text-[var(--brand-hover)]"
              >
                View all {jobs.length} matches
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </div>

          {/* =======================================================
              LOADING
          ======================================================= */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse border border-[var(--border)] bg-[var(--surface)]"
                />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            /* =====================================================
               EMPTY STATE
            ===================================================== */
            <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[var(--brand)]/20 bg-[var(--brand)]/10 text-[var(--brand)]">
                ✦
              </div>

              <h3 className="mt-5 text-lg font-semibold">No matches yet</h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                Upload a recent resume so SkillMatch can analyze your skills and
                find relevant opportunities.
              </p>

              <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                Use the resume manager above to upload or update your resume.
              </p>
            </div>
          ) : (
            /* =====================================================
               JOB GRID
            ===================================================== */
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {topJobs.map((job) => (
                  <MatchedJobCard key={job.jobId} job={job} />
                ))}
              </div>

              {/* BOTTOM VIEW ALL */}
              {hasMoreJobs && (
                <div className="mt-8 flex flex-col items-center justify-center border-t border-[var(--border)] pt-8">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Showing the top {topJobs.length} of{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {jobs.length}
                    </span>{" "}
                    matches
                  </p>

                  <Link
                    href="/candidate/jobs"
                    className="
                      group mt-4 inline-flex items-center gap-2
                      border border-[var(--border-strong)]
                      bg-[var(--surface)]
                      px-5 py-2.5
                      text-sm font-semibold
                      text-[var(--foreground)]
                      transition-all duration-200
                      hover:border-[var(--brand)]/40
                      hover:bg-[var(--surface-elevated)]
                      hover:text-[var(--brand)]
                    "
                  >
                    Explore all matches
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              )}
            </>
          )}
        </section>

        {/* =========================================================
            PRODUCT VALUE
        ========================================================= */}
        <section className="mt-16 border-t border-[var(--border)] pt-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">Skill-based matching</p>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Matches are based on relevant skills and requirements, not just
                job-title keywords.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">
                AI-assisted recommendations
              </p>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Your resume is analyzed to identify the capabilities that matter
                for each opportunity.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Better opportunities</p>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Focus your search on roles where your experience can make a
                meaningful difference.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CandidateDashboard;
