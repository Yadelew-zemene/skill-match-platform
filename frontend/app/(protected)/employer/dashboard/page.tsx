"use client";

import Link from "next/link";
import {
  Briefcase,
  Users,
  UserCheck,
  Sparkles,
  ArrowRight,
  Plus,
  Clock3,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import { DASHBOARD_STATS } from "@/app/constants/employer-dashboard";

export default function EmployerDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--success)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              Hiring overview
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Build your next great team.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            Manage your open positions and discover candidates whose skills
            align with your hiring needs.
          </p>
        </div>

        <Link
          href="/employer/post-jobs"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-4 focus:ring-[var(--primary-light)]"
        >
          <Plus size={17} />
          Post a new job
        </Link>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat, index) => {
          const icons = [Briefcase, Users, UserCheck, Sparkles];

          const Icon = icons[index] || Briefcase;

          return (
            <div
              key={index}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                    {stat.value}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <TrendingUp size={13} className="text-[var(--success)]" />

                    <span>Updated recently</span>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                  <Icon size={19} className="text-[var(--primary)]" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ===================================================
            ACTIVE JOBS
        =================================================== */}
        <div className="xl:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                Active jobs
              </h2>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Your current opportunities
              </p>
            </div>

            <Link
              href="/employer/jobs-posted"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
            >
              View all
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="divide-y divide-[var(--border)]">
            {/* JOB */}
            <div className="group flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-[var(--surface-soft)]">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                  <Briefcase size={18} className="text-[var(--primary)]" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                    Frontend Developer
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    24 applicants · Posted 3 days ago
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-[var(--primary-light)] px-2 py-1 text-[11px] font-medium text-[var(--primary)]">
                      React
                    </span>

                    <span className="rounded-md bg-[var(--surface-soft)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                      TypeScript
                    </span>

                    <span className="rounded-md bg-[var(--surface-soft)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                      Node.js
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="hidden rounded-full bg-[var(--success-light)] px-2.5 py-1 text-xs font-medium text-[var(--success)] sm:inline-flex">
                  Active
                </span>

                <ArrowRight
                  size={17}
                  className="text-[var(--text-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                />
              </div>
            </div>

            {/* EMPTY / MORE */}
            <div className="px-6 py-8">
              <Link
                href="/employer/post-jobs"
                className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--border-strong)] px-4 py-4 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
              >
                <Plus size={16} />
                Post another job
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================
            TOP MATCHES
        =================================================== */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-light)]">
                <Sparkles size={16} className="text-[var(--accent)]" />
              </div>

              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                Top matches
              </h2>
            </div>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Candidates with strong skill alignment
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {/* MATCH 1 */}
              <div className="rounded-lg border border-[var(--border)] p-4 transition hover:border-[var(--primary)] hover:bg-[var(--surface-soft)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                      Candidate profile
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      React · TypeScript · Node.js
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xl font-bold text-[var(--primary)]">
                      92%
                    </p>

                    <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                      match
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)]"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>

              {/* MATCH 2 */}
              <div className="rounded-lg border border-[var(--border)] p-4 transition hover:border-[var(--primary)] hover:bg-[var(--surface-soft)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                      Candidate profile
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Python · Django · PostgreSQL
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xl font-bold text-[var(--primary)]">
                      87%
                    </p>

                    <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                      match
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)]"
                    style={{ width: "87%" }}
                  />
                </div>
              </div>
            </div>

            <Link
              href="/employer/candidates"
              className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
            >
              Explore candidates
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACTIVITY + INSIGHT
      ===================================================== */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* RECENT ACTIVITY */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              What's happening across your hiring workspace
            </p>
          </div>

          <div className="space-y-5 p-6">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                <Users size={15} className="text-[var(--primary)]" />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  New candidates matched your job
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Clock3 size={12} />
                  Recently
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--success-light)]">
                <CheckCircle2 size={15} className="text-[var(--success)]" />
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Your job posting is active
                </p>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Waiting for candidate applications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MATCHING INSIGHT */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)]">
              <Sparkles size={18} className="text-[var(--primary)]" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                SkillMatch intelligence
              </p>

              <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                Find candidates by skills, not just keywords.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                SkillMatch compares candidate skills with your job requirements
                to surface relevant matches and make your hiring process more
                focused.
              </p>

              <Link
                href="/employer/candidates"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
              >
                Explore candidate matching
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
