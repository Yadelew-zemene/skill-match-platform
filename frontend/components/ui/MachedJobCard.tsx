"use client";

import { MatchedJob } from "@/types/candidateDashboard";

const MatchedJobCard = ({ job }: { job: MatchedJob }) => {
  const score = Math.round(job.score);

  const getScoreLabel = () => {
    if (score >= 90) return "Excellent match";
    if (score >= 75) return "Strong match";
    if (score >= 60) return "Good match";
    return "Potential match";
  };

  return (
    <article
      className="
        group flex h-full flex-col overflow-hidden
        rounded-2xl border border-[var(--border)]
        bg-[var(--surface)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-[var(--brand)]/30
        hover:shadow-xl hover:shadow-black/20
      "
    >
      {/* TOP ACCENT */}
      <div className="h-0.5 w-full bg-[var(--brand)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex flex-1 flex-col p-6">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className="
                text-lg font-semibold leading-snug
                text-[var(--foreground)]
                transition-colors duration-200
                group-hover:text-[var(--brand)]
              "
            >
              {job.title}
            </h3>

            <p className="mt-1.5 text-sm text-[var(--muted)]">
              {job.company || "Unknown Company"}
            </p>
          </div>

          {/* MATCH SCORE */}
          <div
            className="
              flex shrink-0 flex-col items-center
              rounded-xl border border-[var(--brand)]/20
              bg-[var(--brand)]/5 px-3 py-2
            "
          >
            <span className="text-lg font-bold leading-none text-[var(--brand)]">
              {score}%
            </span>

            <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
              Match
            </span>
          </div>
        </div>

        {/* MATCH STRENGTH */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--foreground)]">
              {getScoreLabel()}
            </span>

            <span className="text-xs text-[var(--muted-foreground)]">
              Based on your skills
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
            <div
              className="
                h-full rounded-full
                bg-[var(--brand)]
                transition-all duration-700 ease-out
              "
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-5">
          <p className="text-sm leading-6 text-[var(--muted)] line-clamp-3">
            {job.description}
          </p>
        </div>

        {/* MATCH INSIGHT */}
        <div
          className="
            mt-5 rounded-xl
            border border-[var(--border)]
            bg-[var(--surface-elevated)]
            p-4
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                mt-0.5 flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-lg bg-[var(--brand)]/10
                text-xs font-bold text-[var(--brand)]
              "
            >
              ✓
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--foreground)]">
                Why this matches
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
                Your skills and experience align with the requirements of this
                opportunity.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-6">
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex w-full items-center justify-center gap-2
              rounded-lg
              bg-[var(--brand)]
              px-4 py-3
              text-sm font-semibold
              text-[#080A0D]
              transition-all duration-200
              hover:bg-[var(--brand-hover)]
              hover:shadow-lg hover:shadow-[var(--brand)]/10
              active:scale-[0.98]
            "
          >
            View opportunity
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M7 13L13 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default MatchedJobCard;
