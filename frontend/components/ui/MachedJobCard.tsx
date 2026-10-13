"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, CheckCircle2, Sparkles } from "lucide-react";

import { MatchedJob } from "@/types/candidateDashboard";

const MatchedJobCard = ({ job }: { job: MatchedJob }) => {
  const score = Math.min(100, Math.max(0, Math.round(job.score)));

  const getScoreLabel = () => {
    if (score >= 90) return "Excellent match";
    if (score >= 75) return "Strong match";
    if (score >= 60) return "Good match";
    return "Potential match";
  };

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-3xl border border-[var(--border)]
        bg-[var(--surface)]
        shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-[var(--primary)]/30
        hover:shadow-xl hover:shadow-[var(--primary)]/8
      "
    >
      {/* Ambient accent */}
      <div
        className="
          pointer-events-none absolute -right-16 -top-16
          h-32 w-32 rounded-full
          bg-[var(--primary)]/8 blur-3xl
          transition-opacity duration-300
          group-hover:bg-[var(--accent)]/10
        "
      />

      {/* Top gradient line */}
      <div
        className="
          absolute inset-x-0 top-0 h-1
          bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)]
          opacity-70
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3.5">
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl border border-[var(--primary)]/15
                bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]
                text-[var(--primary)]
                transition-transform duration-300
                group-hover:scale-105
              "
            >
              <Building2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  line-clamp-2 text-lg font-semibold leading-snug
                  text-[var(--foreground)]
                  transition-colors duration-200
                  group-hover:text-[var(--primary)]
                "
              >
                {job.title}
              </h3>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {job.company || "Unknown Company"}
              </p>
            </div>
          </div>

          {/* Match score */}
          <div
            className="
              flex shrink-0 flex-col items-center
              rounded-2xl border border-[var(--primary)]/15
              bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]
              px-3 py-2.5
            "
          >
            <span
              className="
                bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]
                bg-clip-text text-lg font-bold leading-none text-transparent
              "
            >
              {score}%
            </span>

            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Match
            </span>
          </div>
        </div>

        {/* Match strength */}
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
                bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]
                transition-all duration-700 ease-out
              "
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
            {job.description}
          </p>
        </div>

        {/* Match insight */}
        <div
          className="
            mt-5 rounded-2xl
            border border-[var(--primary)]/10
            bg-gradient-to-br from-[var(--primary-light)]/70 to-[var(--accent-light)]/50
            p-4
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex h-8 w-8 shrink-0 items-center justify-center
                rounded-xl
                bg-[var(--surface)]
                text-[var(--primary)]
                shadow-sm
              "
            >
              <Sparkles className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--foreground)]">
                Why this matches
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                Your skills and experience align with the requirements of this
                job.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <Link
            href={`/candidate/jobs/${job.jobId}`}
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
};

export default MatchedJobCard;
