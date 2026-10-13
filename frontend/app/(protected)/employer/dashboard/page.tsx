"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { fetchEmployerJobs, type EmployerJob } from "@/services/job.service";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<EmployerJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadJobs = async () => {
      try {
        const response = await fetchEmployerJobs();

        if (mounted) {
          setJobs(response.jobs ?? []);
        }
      } catch (error) {
        console.error("Failed to load employer dashboard jobs:", error);

        if (mounted) {
          toast.error("Failed to load your jobs");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const totalJobs = jobs.length;

    const activeJobs = jobs.filter((job) => job.status === "active").length;

    const closedJobs = jobs.filter((job) => job.status === "closed").length;

    const totalApplicants = jobs.reduce(
      (total, job) => total + Number(job.applicants || 0),
      0,
    );

    return [
      {
        label: "Total jobs",
        value: totalJobs,
        icon: Briefcase,
      },
      {
        label: "Applicants",
        value: totalApplicants,
        icon: Users,
      },
      {
        label: "Active jobs",
        value: activeJobs,
        icon: CheckCircle2,
      },
      {
        label: "Closed jobs",
        value: closedJobs,
        icon: Sparkles,
      },
    ];
  }, [jobs]);

  const recentJobs = useMemo(() => {
    return jobs.slice(0, 5);
  }, [jobs]);

  return (
    <div className="relative mx-auto max-w-7xl">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative mb-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        {/* Decorative atmosphere */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="pointer-events-none absolute right-24 top-20 h-48 w-48 rounded-full bg-[var(--accent)]/8 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative flex flex-col gap-7 px-6 py-7 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              Employer workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.65rem]">
              Build your next great team.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              Post opportunities, manage your hiring pipeline, and discover
              candidates whose skills align with your needs.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/employer/post-jobs"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20"
              >
                <Plus size={17} />
                Post a new job
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/employer/jobs-posted"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
              >
                <Users size={17} />
                Find candidates
              </Link>
            </div>
          </div>

          {/* Visual summary */}
          <div className="relative hidden w-64 shrink-0 lg:block">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 p-4 shadow-[var(--shadow-md)] backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]">
                  <Sparkles size={17} className="text-[var(--primary)]" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    Skill-based hiring
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Focus on relevant skills
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-2 rounded-full bg-[var(--surface-soft)]" />
                <div className="h-2 w-4/5 rounded-full bg-[var(--primary)]/15" />
                <div className="h-2 w-3/5 rounded-full bg-[var(--accent)]/15" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW STATS
      ===================================================== */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Hiring overview
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            A quick look at your employer workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/20 hover:shadow-[var(--shadow-md)]"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--primary)]/8 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                      {loading ? "—" : stat.value}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]">
                    <Icon
                      size={18}
                      className="text-[var(--primary)]"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          MAIN WORKSPACE
      ===================================================== */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ===================================================
            JOB MANAGEMENT
        =================================================== */}
        <div className="xl:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-5 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                    <Briefcase size={16} className="text-[var(--primary)]" />
                  </div>

                  <h2 className="text-base font-semibold text-[var(--text-primary)]">
                    Your jobs
                  </h2>
                </div>

                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Manage the opportunities you have posted.
                </p>
              </div>

              <Link
                href="/employer/jobs-posted"
                className="hidden items-center gap-1 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)] sm:inline-flex"
              >
                View all
                <ChevronRight size={15} />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3 px-5 py-6 sm:px-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl border border-[var(--border)] bg-[var(--background)]/50 p-4"
                  >
                    <div className="h-4 w-2/5 rounded bg-[var(--surface-soft)]" />
                    <div className="mt-3 h-3 w-1/3 rounded bg-[var(--surface-soft)]" />
                    <div className="mt-4 h-3 w-1/4 rounded bg-[var(--surface-soft)]" />
                  </div>
                ))}
              </div>
            ) : recentJobs.length > 0 ? (
              <div className="divide-y divide-[var(--border)]">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group px-5 py-5 transition-colors duration-300 hover:bg-[var(--primary-light)]/30 sm:px-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                            {job.title}
                          </h3>

                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${
                              job.status === "active"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-[var(--surface-soft)] text-[var(--text-muted)]"
                            }`}
                          >
                            {job.status === "active" ? "Active" : "Closed"}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          {job.company}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
                          <span className="inline-flex items-center gap-1.5">
                            <Users size={13} />
                            {Number(job.applicants || 0)} applicants
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={13} />
                            {Number(job.pending_applications || 0)} pending
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 size={13} />
                            {Number(job.shortlisted_applications || 0)}{" "}
                            shortlisted
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/employer/jobs/${job.id}`}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
                      >
                        View job
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-10 sm:px-6">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-[var(--primary)]/10 blur-xl" />

                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]">
                      <Briefcase size={23} className="text-[var(--primary)]" />
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Start by posting a job
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    Create your first opportunity and let SkillMatch help you
                    connect it with relevant candidate skills.
                  </p>

                  <Link
                    href="/employer/post-jobs"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/15"
                  >
                    <Plus size={16} />
                    Post a job
                  </Link>
                </div>
              </div>
            )}

            <div className="border-t border-[var(--border)] px-5 py-4 sm:hidden">
              <Link
                href="/employer/jobs-posted"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[var(--primary)]"
              >
                View your jobs
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================
            CANDIDATE DISCOVERY
        =================================================== */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div className="relative border-b border-[var(--border)] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]">
                <Users size={17} className="text-[var(--primary)]" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-[var(--text-primary)]">
                  Candidate discovery
                </h2>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Find people by relevant skills.
                </p>
              </div>
            </div>
          </div>

          <div className="relative p-5 sm:p-6">
            <div className="rounded-2xl border border-[var(--primary)]/10 bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] shadow-sm">
                <Sparkles size={18} className="text-[var(--primary)]" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                Discover relevant talent
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Open a job to review applicants, compare match scores, and focus
                on the skills that matter for your hiring needs.
              </p>

              <Link
                href="/employer/jobs-posted"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--primary)]/25 hover:text-[var(--primary)] hover:shadow-sm"
              >
                Explore candidates
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEXT STEPS
      ===================================================== */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="grid grid-cols-1 divide-y divide-[var(--border)] md:grid-cols-3 md:divide-x md:divide-y-0">
          <Link
            href="/employer/post-jobs"
            className="group p-5 transition-all duration-300 hover:bg-[var(--primary-light)]/40 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-light)]">
                <Plus size={17} className="text-[var(--primary)]" />
              </div>

              <ArrowRight
                size={16}
                className="text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
              />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
              Post a job
            </h3>

            <p className="mt-1 text-sm leading-5 text-[var(--text-muted)]">
              Create an opportunity and define the skills you need.
            </p>
          </Link>

          <Link
            href="/employer/jobs-posted"
            className="group p-5 transition-all duration-300 hover:bg-[var(--primary-light)]/40 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-soft)]">
                <Briefcase size={17} className="text-[var(--text-secondary)]" />
              </div>

              <ArrowRight
                size={16}
                className="text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
              />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
              Manage jobs
            </h3>

            <p className="mt-1 text-sm leading-5 text-[var(--text-muted)]">
              Review and manage your published opportunities.
            </p>
          </Link>

          <Link
            href="/employer/jobs-posted"
            className="group p-5 transition-all duration-300 hover:bg-[var(--primary-light)]/40 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-light)]">
                <Users size={17} className="text-[var(--accent)]" />
              </div>

              <ArrowRight
                size={16}
                className="text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
              />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
              Find candidates
            </h3>

            <p className="mt-1 text-sm leading-5 text-[var(--text-muted)]">
              Open a job and review its applicants and matched candidates.
            </p>
          </Link>
        </div>
      </section>

      {/* =====================================================
          TRUST / PRODUCT NOTE
      ===================================================== */}
      <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--primary)]/10 bg-gradient-to-r from-[var(--primary-light)]/60 via-[var(--surface)] to-[var(--accent-light)]/50 p-5 sm:flex-row sm:items-center sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] shadow-sm">
          <Clock3 size={18} className="text-[var(--primary)]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Keep your job requirements clear and skill-focused.
          </p>

          <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
            Clear requirements help SkillMatch surface more relevant candidate
            profiles.
          </p>
        </div>
      </section>
    </div>
  );
}
