"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";

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

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="absolute -right-40 top-24 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79,70,229,0.12) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* =========================================================
            WELCOME HERO
        ========================================================= */}
        <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-transparent" />

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--primary)]/10 blur-3xl" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
                <Sparkles className="h-3.5 w-3.5" />
                Candidate workspace
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  {firstName}
                </span>
                .
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                Discover roles that match your skills and experience, keep your
                profile ready, and stay on top of your applications.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/candidate/jobs"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(79,70,229,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,70,229,0.3)]"
                >
                  Find jobs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/candidate/applications"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--primary)]/30 hover:text-[var(--primary)] hover:shadow-sm"
                >
                  My applications
                </Link>
              </div>
            </div>

            {/* Match summary */}
            <div className="flex items-center lg:items-start">
              <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)] p-5 sm:w-64">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--primary)]/10 blur-2xl" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Job matches
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                    {loading ? "—" : jobs.length}
                  </p>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    opportunities matched to your profile
                  </p>

                  <Link
                    href="/candidate/jobs"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
                  >
                    Explore matches
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            QUICK OVERVIEW
        ========================================================= */}
        <section className="mt-5 grid gap-4 sm:grid-cols-3">
          <Link
            href="/candidate/jobs"
            className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <ArrowRight className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--primary)]" />
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[var(--text-primary)]">
              {loading ? "—" : jobs.length}
            </p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Matched opportunities
            </p>
          </Link>

          <Link
            href="/candidate/applications"
            className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/25 hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)]">
                <FileText className="h-5 w-5" />
              </div>

              <ArrowRight className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[var(--text-primary)]">
              —
            </p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Applications
            </p>
          </Link>

          <Link
            href="/candidate/profile"
            className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--success)]/25 hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--success-light)] text-[var(--success)]">
                <UserRound className="h-5 w-5" />
              </div>

              <ArrowRight className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--success)]" />
            </div>

            <p className="mt-4 text-lg font-extrabold text-[var(--text-primary)]">
              Profile
            </p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Keep your candidate information current
            </p>
          </Link>
        </section>

        {/* =========================================================
            PROFILE / RESUME READINESS
        ========================================================= */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              Be ready to apply
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Keep your profile job-ready
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              A current resume gives SkillMatch better information to identify
              relevant opportunities for you.
            </p>
          </div>

          <CandidateResumeSection onResumeChange={refresh} />
        </section>

        {/* =========================================================
            TOP MATCHES
        ========================================================= */}
        <section className="mt-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
                <Sparkles className="h-3.5 w-3.5" />
                Personalized matches
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                Opportunities for you
              </h2>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Roles with the strongest match to your current profile.
              </p>
            </div>

            {jobs.length > 0 && (
              <Link
                href="/candidate/jobs"
                className="group inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--primary)]/30 hover:text-[var(--primary)] hover:shadow-sm"
              >
                View all jobs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-72 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]"
                >
                  <div className="animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-[var(--surface-soft)]" />

                      <div className="flex-1">
                        <div className="h-4 w-32 rounded bg-[var(--surface-soft)]" />
                        <div className="mt-2 h-3 w-24 rounded bg-[var(--surface-soft)]" />
                      </div>
                    </div>

                    <div className="mt-7 h-4 w-4/5 rounded bg-[var(--surface-soft)]" />
                    <div className="mt-3 h-3 w-full rounded bg-[var(--surface-soft)]" />
                    <div className="mt-2 h-3 w-3/4 rounded bg-[var(--surface-soft)]" />

                    <div className="mt-8 h-10 rounded-xl bg-[var(--surface-soft)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center shadow-[var(--shadow-sm)]">
              <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[var(--primary)]/10 blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
                  <Search className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                  No matched jobs yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                  Upload or update your resume above so SkillMatch has the
                  information it needs to identify relevant opportunities.
                </p>

                <p className="mt-4 text-xs text-[var(--text-muted)]">
                  Your matches can improve as your profile and resume become
                  more complete.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {topJobs.map((job) => (
                  <MatchedJobCard key={job.jobId} job={job} />
                ))}
              </div>

              {hasMoreJobs && (
                <div className="mt-8 flex flex-col items-center border-t border-[var(--border)] pt-8">
                  <p className="text-sm text-[var(--text-muted)]">
                    Showing the top{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      {topJobs.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      {jobs.length}
                    </span>{" "}
                    matched opportunities.
                  </p>

                  <Link
                    href="/candidate/jobs"
                    className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(79,70,229,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,70,229,0.28)]"
                  >
                    Explore all matches
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </>
          )}
        </section>

        {/* =========================================================
            CANDIDATE GUIDANCE
        ========================================================= */}
        <section className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)] p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <h2 className="mt-4 text-xl font-bold text-[var(--text-primary)]">
                  Keep your candidate profile current
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                  Your resume, skills, experience, and profile information help
                  SkillMatch understand which opportunities are relevant to you.
                </p>
              </div>

              <Link
                href="/candidate/profile"
                className="group inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--primary)]/20 bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--primary)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-md"
              >
                Review profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CandidateDashboard;
