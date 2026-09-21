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
} from "lucide-react";
import { DASHBOARD_STATS } from "@/app/constants/employer-dashboard";

export default function EmployerDashboard() {
  return (
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand)]">
            Hiring overview
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Build your next great team.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Manage your opportunities and discover candidates whose skills
            align with what you need.
          </p>
        </div>

        <Link
          href="/employer/post-jobs"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)] active:scale-[0.98]"
        >
          <Plus size={17} />
          Post a new job
        </Link>
      </section>

      {/* STATS */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat, index) => {
          const icons = [
            Briefcase,
            Users,
            UserCheck,
            Sparkles,
          ];

          const Icon = icons[index] || Briefcase;

          return (
            <div
              key={index}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--border-strong)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)]/10">
                  <Icon
                    size={19}
                    className="text-[var(--brand)]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ACTIVE JOBS */}
        <div className="xl:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

          <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
            <div>
              <h2 className="text-base font-semibold">
                Active jobs
              </h2>

              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Your current opportunities
              </p>
            </div>

            <Link
              href="/employer/jobs-posted"
              className="text-sm font-medium text-[var(--brand)] transition hover:text-[var(--brand-hover)]"
            >
              View all
            </Link>
          </div>

          {/* BACKEND DATA GOES HERE */}
          <div className="divide-y divide-[var(--border)]">

            {/* Example job row */}
            <div className="flex items-center justify-between gap-4 px-6 py-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-elevated)]">
                  <Briefcase
                    size={18}
                    className="text-[var(--brand)]"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">
                    Frontend Developer
                  </h3>

                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    24 applicants · Posted 3 days ago
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                  Active
                </span>

                <ArrowRight
                  size={16}
                  className="text-[var(--muted-foreground)]"
                />
              </div>
            </div>

            {/* EMPTY STATE / FUTURE DATA */}
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-[var(--muted)]">
                More active jobs will appear here.
              </p>

              <Link
                href="/employer/post-jobs"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-hover)]"
              >
                Post another job
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>

        {/* TOP MATCHES */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

          <div className="border-b border-[var(--border)] px-6 py-5">
            <div className="flex items-center gap-2">
              <Sparkles
                size={17}
                className="text-[var(--brand)]"
              />

              <h2 className="text-base font-semibold">
                Top candidate matches
              </h2>
            </div>

            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Candidates with the strongest skill alignment
            </p>
          </div>

          <div className="p-6">

            {/* FUTURE AI MATCH DATA */}
            <div className="space-y-4">

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      Candidate profile
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      React · TypeScript · Node.js
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--brand)]">
                      92%
                    </p>

                    <p className="text-[10px] uppercase tracking-wide text-[var(--muted-foreground)]">
                      Match
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      Candidate profile
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      Python · Django · PostgreSQL
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--brand)]">
                      87%
                    </p>

                    <p className="text-[10px] uppercase tracking-wide text-[var(--muted-foreground)]">
                      Match
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <Link
              href="/employer/candidates"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-medium transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
            >
              Explore candidates
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ACTIVITY + INSIGHT */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* RECENT ACTIVITY */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

          <div className="border-b border-[var(--border)] px-6 py-5">
            <h2 className="text-base font-semibold">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              What's happening across your hiring workspace
            </p>
          </div>

          <div className="space-y-5 p-6">

            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10">
                <Users
                  size={15}
                  className="text-[var(--brand)]"
                />
              </div>

              <div>
                <p className="text-sm">
                  New candidates matched your job
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                  <Clock3 size={12} />
                  Recently
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p className="text-sm">
                  Your job posting is active
                </p>

                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Waiting for candidate applications
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* MATCHING INSIGHT */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10">
              <Sparkles
                size={19}
                className="text-[var(--brand)]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                SkillMatch intelligence
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Find candidates by skills, not just keywords.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                SkillMatch analyzes candidate profiles against your job
                requirements to surface stronger matches and make your
                hiring process more focused.
              </p>

              <Link
                href="/employer/candidates"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-hover)]"
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