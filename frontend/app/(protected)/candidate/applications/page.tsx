"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Search,
  SlidersHorizontal,
  Sparkles,
  XCircle,
} from "lucide-react";

import {
  ApplicationStatus,
  CandidateApplication,
  getCandidateApplications,
} from "@/services/application.service";

type FilterStatus = "all" | ApplicationStatus;

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  reviewing: "Under review",
  shortlisted: "Shortlisted",
  rejected: "Not selected",
  accepted: "Accepted",
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const getStatusStyles = (status: ApplicationStatus) => {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        className:
          "border-[var(--warning)]/20 bg-[var(--warning-light)] text-[var(--warning)]",
        icon: Clock3,
      };

    case "reviewing":
      return {
        label: "Under review",
        className:
          "border-[var(--info)]/20 bg-[var(--info-light)] text-[var(--info)]",
        icon: BriefcaseBusiness,
      };

    case "shortlisted":
      return {
        label: "Shortlisted",
        className:
          "border-[var(--success)]/20 bg-[var(--success-light)] text-[var(--success)]",
        icon: CheckCircle2,
      };

    case "accepted":
      return {
        label: "Accepted",
        className:
          "border-[var(--success)]/20 bg-[var(--success-light)] text-[var(--success)]",
        icon: CheckCircle2,
      };

    case "rejected":
      return {
        label: "Not selected",
        className:
          "border-[var(--error)]/20 bg-[var(--error-light)] text-[var(--error)]",
        icon: XCircle,
      };
  }
};

const getProgress = (status: ApplicationStatus) => {
  switch (status) {
    case "pending":
      return 1;
    case "reviewing":
      return 2;
    case "shortlisted":
    case "accepted":
      return 3;
    case "rejected":
      return 3;
  }
};

const ApplicationCard = ({
  application,
}: {
  application: CandidateApplication;
}) => {
  const status = getStatusStyles(application.status);
  const StatusIcon = status.icon;
  const progress = getProgress(application.status);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-lg)]">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Ambient hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--primary)]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative p-6 sm:p-7">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-start gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)] shadow-sm">
                <BriefcaseBusiness className="h-5 w-5" />

                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--surface)]" />
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Job application
                </p>

                <h2 className="truncate text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl">
                  {application.job_title}
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {application.company || "Company not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Match score */}
          <div className="relative flex w-fit shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] px-4 py-3">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>

            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Match
              </p>

              <p className="text-lg font-extrabold leading-none text-[var(--primary)]">
                {application.match_score}%
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-soft)]/70 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Application progress
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Your application is currently{" "}
                <span className="font-semibold text-[var(--text-secondary)]">
                  {status.label.toLowerCase()}
                </span>
                .
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {status.label}
            </span>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <div className="flex items-center">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="flex min-w-0 flex-1 items-center">
                  <div
                    className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${
                      progress >= step
                        ? "border-[var(--primary)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_0_16px_rgba(79,70,229,0.25)]"
                        : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-muted)]"
                    }`}
                  >
                    {progress > step ? <Check className="h-3.5 w-3.5" /> : step}
                  </div>

                  {index < 2 && (
                    <div
                      className={`mx-2 h-0.5 flex-1 rounded-full transition-colors ${
                        progress > step
                          ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                          : "bg-[var(--border-strong)]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-3 text-[10px] font-medium text-[var(--text-muted)]">
              <span>Applied</span>
              <span className="text-center">Review</span>
              <span className="text-right">Decision</span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-6 grid gap-4 border-t border-[var(--border)] pt-5 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-soft)] text-[var(--text-muted)]">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Applied
              </p>

              <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">
                {formatDate(application.applied_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-soft)] text-[var(--text-muted)]">
              <FileText className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Resume used
              </p>

              <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">
                {application.original_filename || "Resume"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-soft)] text-[var(--text-muted)]">
              <StatusIcon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Current status
              </p>

              <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">
                {status.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex flex-col gap-3 border-t border-[var(--border)] bg-gradient-to-r from-[var(--surface-soft)]/80 to-[var(--surface)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-xs text-[var(--text-muted)]">
          Track updates and review the original job posting.
        </p>

        <Link
          href={`/candidate/jobs/${application.job_id}`}
          className="group/link inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all duration-200 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] hover:shadow-md"
        >
          View job
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
};

const CandidateApplicationsPage = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCandidateApplications();

        setApplications(response.applications ?? []);
      } catch (error) {
        console.error("Failed to load applications:", error);
        setError("We couldn't load your applications.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const counts = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((item) => item.status === "pending").length,
      reviewing: applications.filter((item) => item.status === "reviewing")
        .length,
      shortlisted: applications.filter((item) => item.status === "shortlisted")
        .length,
    };
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesStatus = filter === "all" || application.status === filter;

      const matchesSearch =
        !query ||
        application.job_title.toLowerCase().includes(query) ||
        (application.company || "").toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [applications, filter, search]);

  const filters: [FilterStatus, string][] = [
    ["all", "All"],
    ["pending", "Pending"],
    ["reviewing", "Under review"],
    ["shortlisted", "Shortlisted"],
    ["accepted", "Accepted"],
    ["rejected", "Not selected"],
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(79,70,229,0.12) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-transparent" />

          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--primary)]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                Candidate workspace
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                My{" "}
                <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  applications
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                Track the opportunities you have applied to and follow each
                application as it moves through the hiring process.
              </p>
            </div>

            <Link
              href="/candidate/jobs"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(79,70,229,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,70,229,0.3)]"
            >
              Browse jobs
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total applications",
              value: counts.total,
              icon: FileText,
              className:
                "from-[var(--primary-light)] to-[var(--surface)] text-[var(--primary)]",
            },
            {
              label: "Pending",
              value: counts.pending,
              icon: Clock3,
              className:
                "from-[var(--warning-light)] to-[var(--surface)] text-[var(--warning)]",
            },
            {
              label: "Under review",
              value: counts.reviewing,
              icon: BriefcaseBusiness,
              className:
                "from-[var(--info-light)] to-[var(--surface)] text-[var(--info)]",
            },
            {
              label: "Shortlisted",
              value: counts.shortlisted,
              icon: CheckCircle2,
              className:
                "from-[var(--success-light)] to-[var(--surface)] text-[var(--success)]",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br ${stat.className} p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                      {stat.value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-current/10 bg-[var(--surface)]/80 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Controls */}
        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 xl:pb-0">
              {filters.map(([value, label]) => {
                const active = filter === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    className={`whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "border-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_6px_18px_rgba(79,70,229,0.2)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full xl:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search applications..."
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/50 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/40 focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/10"
              />
            </div>
          </div>
        </section>

        {/* Results summary */}
        {!loading && !error && applications.length > 0 && (
          <div className="flex items-center justify-between px-1 py-5">
            <p className="text-sm text-[var(--text-muted)]">
              Showing{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                {filteredApplications.length}
              </span>{" "}
              {filteredApplications.length === 1
                ? "application"
                : "applications"}
            </p>

            {(filter !== "all" || search) && (
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setSearch("");
                }}
                className="text-xs font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <section>
          {loading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]"
                >
                  <div className="animate-pulse">
                    <div className="flex justify-between gap-5">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-[var(--surface-soft)]" />

                        <div>
                          <div className="h-3 w-24 rounded bg-[var(--surface-soft)]" />
                          <div className="mt-3 h-5 w-48 rounded bg-[var(--surface-soft)]" />
                          <div className="mt-2 h-3 w-28 rounded bg-[var(--surface-soft)]" />
                        </div>
                      </div>

                      <div className="h-16 w-28 rounded-2xl bg-[var(--surface-soft)]" />
                    </div>

                    <div className="mt-8 h-28 rounded-2xl bg-[var(--surface-soft)]" />

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div className="h-10 rounded-xl bg-[var(--surface-soft)]" />
                      <div className="h-10 rounded-xl bg-[var(--surface-soft)]" />
                      <div className="h-10 rounded-xl bg-[var(--surface-soft)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="relative overflow-hidden rounded-3xl border border-[var(--error)]/20 bg-[var(--surface)] px-6 py-16 text-center shadow-[var(--shadow-sm)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--error)] to-transparent" />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--error)]/20 bg-[var(--error-light)] text-[var(--error)]">
                <XCircle className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[var(--text-primary)]">
                Unable to load applications
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--primary)]/40 hover:text-[var(--primary)] hover:shadow-sm"
              >
                Try again
              </button>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center shadow-[var(--shadow-sm)]">
              <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)] shadow-sm">
                  {applications.length === 0 ? (
                    <BriefcaseBusiness className="h-7 w-7" />
                  ) : (
                    <SlidersHorizontal className="h-7 w-7" />
                  )}
                </div>

                <h2 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                  {applications.length === 0
                    ? "No applications yet"
                    : "No matching applications"}
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                  {applications.length === 0
                    ? "When you apply for a job, you will be able to track its progress and status here."
                    : "Try changing your search or status filter to find what you're looking for."}
                </p>

                {applications.length === 0 ? (
                  <Link
                    href="/candidate/jobs"
                    className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(79,70,229,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,70,229,0.28)]"
                  >
                    Explore jobs
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setFilter("all");
                      setSearch("");
                    }}
                    className="mt-7 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CandidateApplicationsPage;
