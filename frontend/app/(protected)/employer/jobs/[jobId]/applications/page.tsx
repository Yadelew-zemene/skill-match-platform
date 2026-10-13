"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Download,
  FileText,
  Mail,
  Search,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchEmployerApplications,
  updateEmployerApplicationStatus,
  type ApplicationStatus,
  type EmployerApplication,
} from "@/services/application.service";

import {
  downloadCandidateResume,
  fetchEmployerCandidatePhoto,
} from "@/services/job.service";

/* ============================================================
   STATUS CONFIG
============================================================ */

const STATUS_CONFIG: Record<
  ApplicationStatus,
  {
    label: string;
    icon: typeof Clock3;
    tone: string;
    dot: string;
  }
> = {
  pending: {
    label: "Pending",
    icon: Clock3,
    tone: "bg-[var(--warning-light)] text-[var(--warning)] border-[var(--warning)]/15",
    dot: "bg-[var(--warning)]",
  },

  reviewing: {
    label: "Reviewing",
    icon: FileText,
    tone: "bg-[var(--info-light)] text-[var(--info)] border-[var(--info)]/15",
    dot: "bg-[var(--info)]",
  },

  shortlisted: {
    label: "Shortlisted",
    icon: UserCheck,
    tone: "bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]/15",
    dot: "bg-[var(--success)]",
  },

  rejected: {
    label: "Rejected",
    icon: X,
    tone: "bg-[var(--error-light)] text-[var(--error)] border-[var(--error)]/15",
    dot: "bg-[var(--error)]",
  },

  accepted: {
    label: "Accepted",
    icon: Check,
    tone: "bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]/15",
    dot: "bg-[var(--success)]",
  },
};

const STATUS_FILTERS: Array<"all" | ApplicationStatus> = [
  "all",
  "pending",
  "reviewing",
  "shortlisted",
  "accepted",
  "rejected",
];

/* ============================================================
   HELPERS
============================================================ */

function formatDate(date: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string) {
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function normalizeScore(score: number | null) {
  if (score === null || score === undefined) {
    return 0;
  }

  const numericScore = Number(score);

  if (Number.isNaN(numericScore)) {
    return 0;
  }

  return Math.max(0, Math.min(100, numericScore));
}

/* ============================================================
   PAGE
============================================================ */
function MatchScore({ score }: { score: number | null }) {
  const value = Math.round(Number(score ?? 0));

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-16 overflow-hidden rounded-full bg-[var(--surface-soft)]">
        <div
          className="h-full rounded-full bg-[var(--primary)]"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
          }}
        />
      </div>

      <span className="text-sm font-semibold text-[var(--text)]">{value}%</span>
    </div>
  );
}
export default function EmployerApplicationsPage() {
  const params = useParams();

  const rawJobId = params?.jobId;

  const jobId = Number(
    Array.isArray(rawJobId) ? rawJobId[0] : rawJobId,
  );

  const [applications, setApplications] = useState<
    EmployerApplication[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | ApplicationStatus
  >("all");

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [downloadingResumeId, setDownloadingResumeId] =
    useState<number | null>(null);

  /* ==========================================================
     LOAD APPLICATIONS
  ========================================================== */

  const loadApplications = async () => {
    if (!Number.isInteger(jobId) || jobId <= 0) {
      setError("Invalid job ID.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetchEmployerApplications(jobId);

      setApplications(response.applications ?? []);
    } catch (err) {
      console.error("Failed to load employer applications:", err);

      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [jobId]);

  /* ==========================================================
     FILTERING
  ========================================================== */

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.candidate_name
          ?.toLowerCase()
          .includes(query) ||
        application.candidate_email
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  /* ==========================================================
     STATISTICS
  ========================================================== */

  const statistics = useMemo(() => {
    const total = applications.length;

    const pending = applications.filter(
      (application) => application.status === "pending",
    ).length;

    const reviewing = applications.filter(
      (application) => application.status === "reviewing",
    ).length;

    const shortlisted = applications.filter(
      (application) => application.status === "shortlisted",
    ).length;

    const accepted = applications.filter(
      (application) => application.status === "accepted",
    ).length;

    const rejected = applications.filter(
      (application) => application.status === "rejected",
    ).length;

    const scoredApplications = applications.filter(
      (application) => application.match_score !== null,
    );

    const averageMatch =
      scoredApplications.length > 0
        ? Math.round(
            scoredApplications.reduce(
              (sum, application) =>
                sum +
                normalizeScore(application.match_score),
              0,
            ) / scoredApplications.length,
          )
        : 0;

    return {
      total,
      pending,
      reviewing,
      shortlisted,
      accepted,
      rejected,
      averageMatch,
    };
  }, [applications]);

  /* ==========================================================
     STATUS CHANGE
  ========================================================== */

  const handleStatusChange = async (
    applicationId: number,
    status: ApplicationStatus,
  ) => {
    const previousApplications = applications;

    try {
      setUpdatingId(applicationId);

      setApplications((current) =>
        current.map((application) =>
          application.application_id === applicationId
            ? {
                ...application,
                status,
              }
            : application,
        ),
      );

      await updateEmployerApplicationStatus(
        applicationId,
        status,
      );

      toast.success(
        `Application moved to ${STATUS_CONFIG[
          status
        ].label.toLowerCase()}.`,
      );
    } catch (err) {
      console.error(
        "Failed to update application status:",
        err,
      );

      setApplications(previousApplications);

      toast.error(
        "Failed to update application status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* ==========================================================
     DOWNLOAD RESUME
  ========================================================== */

  const handleDownloadResume = async (
    application: EmployerApplication,
  ) => {
    try {
      setDownloadingResumeId(
        application.application_id,
      );

      await downloadCandidateResume(
        application.job_id,
        application.candidate_id,
      );

      toast.success("Resume downloaded.");
    } catch (err) {
      console.error(
        "Failed to download resume:",
        err,
      );

      toast.error("Failed to download resume.");
    } finally {
      setDownloadingResumeId(null);
    }
  };

  /* ==========================================================
     INVALID JOB
  ========================================================== */

  if (!Number.isInteger(jobId) || jobId <= 0) {
    return (
      <PageShell>
        <EmptyState
          icon={<BriefcaseBusiness size={24} />}
          title="Invalid job"
          description="The requested job ID is invalid."
        >
          <Link
            href="/employer/jobs-posted"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:-translate-y-0.5"
          >
            <ArrowLeft size={15} />
            Back to jobs
          </Link>
        </EmptyState>
      </PageShell>
    );
  }

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return <ApplicationsSkeleton />;
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <PageShell>
        <div className="mx-auto max-w-xl py-16">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--error)]/15 bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--error)]/8 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--error-light)] text-[var(--error)]">
                <X size={22} />
              </div>

              <h1 className="mt-5 text-xl font-bold text-[var(--text-primary)]">
                Unable to load applications
              </h1>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {error}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={loadApplications}
                  className="rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:-translate-y-0.5"
                >
                  Try again
                </button>

                <Link
                  href={`/employer/jobs/${jobId}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
                >
                  <ArrowLeft size={15} />
                  Back to job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  /* ==========================================================
     MAIN UI
  ========================================================== */

  return (
    <PageShell>
      {/* ========================================================
          TOP NAV
      ======================================================== */}

      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href={`/employer/jobs/${jobId}`}
          className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--primary)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to job
        </Link>

        <Link
          href={`/employer/jobs/${jobId}/candidates`}
          className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] sm:inline-flex"
        >
          <Sparkles size={15} />
          Ranked candidates
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="relative mb-7 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-80" />

        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[var(--accent)]/8 blur-3xl" />

        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[var(--primary)]/7 blur-3xl" />

        <div className="relative p-6 sm:p-8 lg:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                <BriefcaseBusiness size={14} />
                Application management
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
                Job applications
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                Review applicants, evaluate match signals, and move
                candidates through your hiring process.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5">
                  {statistics.total} total applications
                </span>

                {statistics.shortlisted > 0 && (
                  <span className="rounded-full border border-[var(--success)]/15 bg-[var(--success-light)] px-3 py-1.5 text-[var(--success)]">
                    {statistics.shortlisted} shortlisted
                  </span>
                )}

                {statistics.averageMatch > 0 && (
                  <span className="rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-[var(--primary)]">
                    {statistics.averageMatch}% avg. match
                  </span>
                )}
              </div>
            </div>

            <Link
              href={`/employer/jobs/${jobId}/candidates`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20 sm:w-fit"
            >
              <Users size={16} />
              Explore ranked candidates
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          STATS
      ======================================================== */}

      <div className="mb-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Total"
          value={statistics.total}
          icon={Users}
          primary
        />

        <StatCard
          label="Pending"
          value={statistics.pending}
          icon={Clock3}
        />

        <StatCard
          label="Reviewing"
          value={statistics.reviewing}
          icon={FileText}
        />

        <StatCard
          label="Shortlisted"
          value={statistics.shortlisted}
          icon={UserCheck}
        />

        <StatCard
          label="Accepted"
          value={statistics.accepted}
          icon={Check}
        />

        <StatCard
          label="Avg. Match"
          value={`${statistics.averageMatch}%`}
          icon={Sparkles}
          primary
        />
      </div>

      {/* ========================================================
          TOOLBAR
      ======================================================== */}

      <section className="relative mb-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Search */}

            <div className="relative w-full xl:max-w-md">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search applicants by name or email..."
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-disabled)] hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/8"
              />
            </div>

            {/* Filters */}

            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((status) => {
                const active = statusFilter === status;

                const label =
                  status === "all"
                    ? "All"
                    : STATUS_CONFIG[status].label;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-[var(--primary)] text-white shadow-sm shadow-[var(--primary)]/20"
                        : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
            <span>
              Showing{" "}
              <strong className="text-[var(--text-secondary)]">
                {filteredApplications.length}
              </strong>{" "}
              of{" "}
              <strong className="text-[var(--text-secondary)]">
                {applications.length}
              </strong>{" "}
              applications
            </span>

            {(search || statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          EMPTY
      ======================================================== */}

      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={
            applications.length === 0 ? (
              <Users size={25} />
            ) : (
              <Search size={25} />
            )
          }
          title={
            applications.length === 0
              ? "No applications yet"
              : "No matching applications"
          }
          description={
            applications.length === 0
              ? "Applications submitted for this job will appear here."
              : "Try changing your search or application status filter."
          }
        >
          {applications.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
            >
              Clear filters
            </button>
          )}
        </EmptyState>
      ) : (
        <>
          {/* ====================================================
              DESKTOP TABLE
          ==================================================== */}

          <div className="hidden overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] xl:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-soft)]">
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Applicant
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Match
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Resume
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Applied
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map(
                    (application) => {
                      const score = normalizeScore(
                        application.match_score,
                      );

                      return (
                        <tr
                          key={application.application_id}
                          className="group border-b border-[var(--border)] last:border-b-0 transition-colors hover:bg-[var(--surface-soft)]"
                        >
                          {/* Applicant */}

                          <td className="px-5 py-4">
                            <Link
                              href={`/employer/jobs/${jobId}/candidates/${application.candidate_id}`}
                              className="group/candidate flex min-w-[280px] items-center gap-3"
                            >
                              <CandidateAvatar
                                name={application.candidate_name}
                                jobId={jobId}
                                candidateId={application.candidate_id}
                                hasProfileImage={application.has_profile_image}
                              />
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-[var(--text-primary)] transition-colors group-hover/candidate:text-[var(--primary)]">
                                  {application.candidate_name}
                                </div>

                                <div className="mt-1 flex items-center gap-1.5 truncate text-xs text-[var(--text-muted)]">
                                  <Mail size={12} />
                                  {application.candidate_email}
                                </div>
                              </div>
                            </Link>
                          </td>

                          {/* Match */}

                          <td className="px-5 py-4">
                            <MatchScore score={score} />
                          </td>

                          {/* Resume */}

                          <td className="px-5 py-4">
                            <div className="flex max-w-[190px] items-center gap-2.5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--text-muted)]">
                                <FileText size={14} />
                              </div>

                              <span className="truncate text-xs font-medium text-[var(--text-secondary)]">
                                {application.original_filename || "Resume"}
                              </span>
                            </div>
                          </td>

                          {/* Applied */}

                          <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-[var(--text-secondary)]">
                            {formatDate(application.applied_at)}
                          </td>

                          {/* Status */}

                          <td className="px-5 py-4">
                            <StatusSelect
                              status={application.status}
                              disabled={
                                updatingId === application.application_id
                              }
                              onChange={(status) =>
                                handleStatusChange(
                                  application.application_id,
                                  status,
                                )
                              }
                            />
                          </td>

                          {/* Actions */}

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/employer/jobs/${jobId}/candidates/${application.candidate_id}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                              >
                                View
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDownloadResume(application)
                                }
                                disabled={
                                  downloadingResumeId ===
                                  application.application_id
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Download size={13} />

                                {downloadingResumeId ===
                                application.application_id
                                  ? "..."
                                  : "Resume"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ====================================================
              MOBILE / TABLET
          ==================================================== */}

          <div className="space-y-4 xl:hidden">
            {filteredApplications.map(
              (application) => {
                const score = normalizeScore(
                  application.match_score,
                );

                return (
                  <ApplicationCard
                    key={application.application_id}
                    application={application}
                    jobId={jobId}
                    score={score}
                    updating={
                      updatingId ===
                      application.application_id
                    }
                    downloading={
                      downloadingResumeId ===
                      application.application_id
                    }
                    onStatusChange={
                      handleStatusChange
                    }
                    onDownload={
                      handleDownloadResume
                    }
                  />
                );
              },
            )}
          </div>
        </>
      )}
    </PageShell>
  );
}

/* ============================================================
   PAGE SHELL
============================================================ */

function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-7xl">
      {/* Ambient glow */}

      <div className="pointer-events-none absolute -inset-x-20 -top-28 -z-10 h-[34rem] overflow-hidden">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-[var(--primary)]/7 blur-3xl" />

        <div className="absolute right-0 top-8 h-80 w-80 rounded-full bg-[var(--accent)]/7 blur-3xl" />

        <div className="absolute left-1/2 top-20 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--primary)]/[0.04] via-transparent to-[var(--accent)]/[0.04] blur-3xl" />
      </div>

      {/* Subtle grid */}

      <div
        className="pointer-events-none absolute -inset-x-20 -top-28 -z-20 h-[40rem] opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {children}
    </div>
  );
}

/* ============================================================
   CANDIDATE AVATAR
============================================================ */

function CandidateAvatar({
  name,
  jobId,
  candidateId,
  hasProfileImage,
}: {
  name: string;
  jobId: number;
  candidateId: number;
  hasProfileImage: boolean;
}) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!hasProfileImage) {
      setPhotoUrl(null);
      return;
    }

    let objectUrl: string | null = null;
    let cancelled = false;

    const loadPhoto = async () => {
      try {
        const url = await fetchEmployerCandidatePhoto(jobId, candidateId);

        if (cancelled) {
          window.URL.revokeObjectURL(url);
          return;
        }

        objectUrl = url;
        setPhotoUrl(url);
      } catch (error) {
        console.debug(
          `Unable to load profile photo for candidate ${candidateId}`,
          error,
        );
      }
    };

    loadPhoto();

    return () => {
      cancelled = true;

      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [jobId, candidateId, hasProfileImage]);

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--primary-light)] text-sm font-bold text-[var(--primary)]">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`${name} profile photo`}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

/* ============================================================
   APPLICATION CARD
============================================================ */

function ApplicationCard({
  application,
  jobId,
  score,
  updating,
  downloading,
  onStatusChange,
  onDownload,
}: {
  application: EmployerApplication;
  jobId: number;
  score: number;
  updating: boolean;
  downloading: boolean;
  onStatusChange: (
    applicationId: number,
    status: ApplicationStatus,
  ) => void;
  onDownload: (
    application: EmployerApplication,
  ) => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/20 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-5 sm:p-6">
        {/* Candidate */}

        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/employer/jobs/${jobId}/candidates/${application.candidate_id}`}
            className="flex min-w-0 items-center gap-3"
          >
            <CandidateAvatar
              name={application.candidate_name}
              jobId={jobId}
              candidateId={application.candidate_id}
              hasProfileImage={application.has_profile_image}
            />

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-[var(--text-primary)] transition-colors hover:text-[var(--primary)]">
                {application.candidate_name}
              </h2>

              <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-[var(--text-muted)]">
                <Mail size={12} />
                {application.candidate_email}
              </p>
            </div>
          </Link>

          <StatusBadge status={application.status} />
        </div>

        {/* Match */}

        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
          <MatchScore score={score} />
        </div>

        {/* Metadata */}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--text-muted)]">
              <FileText size={14} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Resume
              </p>

              <p className="mt-1 truncate text-xs font-medium text-[var(--text-secondary)]">
                {application.original_filename || "Resume"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--text-muted)]">
              <Clock3 size={14} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Applied
              </p>

              <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
                {formatDate(application.applied_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Cover letter */}

        {application.cover_letter && (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Cover letter
            </p>

            <p className="line-clamp-3 text-xs leading-5 text-[var(--text-secondary)]">
              {application.cover_letter}
            </p>
          </div>
        )}

        {/* Status */}

        <div className="mt-5">
          <label className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">
            Application status
          </label>

          <StatusSelect
            status={application.status}
            disabled={updating}
            onChange={(status) =>
              onStatusChange(application.application_id, status)
            }
            fullWidth
          />
        </div>

        {/* Actions */}

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/employer/jobs/${jobId}/candidates/${application.candidate_id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
          >
            <Users size={14} />
            View applicant
          </Link>

          <button
            type="button"
            onClick={() => onDownload(application)}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={14} />
            {downloading ? "Downloading..." : "Download resume"}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  const config = STATUS_CONFIG[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${config.tone}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
      />

      <Icon size={12} />

      {config.label}
    </span>
  );
}

/* ============================================================
   STATUS SELECT
============================================================ */

function StatusSelect({
  status,
  disabled,
  onChange,
  fullWidth = false,
}: {
  status: ApplicationStatus;
  disabled?: boolean;
  onChange: (status: ApplicationStatus) => void;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`relative ${
        fullWidth ? "w-full" : "w-[150px]"
      }`}
    >
      <select
        value={status}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.value as ApplicationStatus,
          )
        }
        className="h-10 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 pr-9 text-xs font-semibold text-[var(--text-primary)] outline-none transition hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/8 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="pending">Pending</option>
        <option value="reviewing">Reviewing</option>
        <option value="shortlisted">Shortlisted</option>
        <option value="rejected">Rejected</option>
        <option value="accepted">Accepted</option>
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
      />
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  icon: Icon,
  primary = false,
}: {
  label: string;
  value: number | string;
  icon: typeof Users;
  primary?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
        primary
          ? "border-[var(--primary)]/15"
          : "border-[var(--border)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl ${
          primary
            ? "bg-[var(--primary)]/8"
            : "bg-[var(--accent)]/5"
        }`}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-[var(--text-muted)]">
          {label}
        </span>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            primary
              ? "bg-[var(--primary-light)] text-[var(--primary)]"
              : "bg-[var(--surface-soft)] text-[var(--text-muted)]"
          }`}
        >
          <Icon size={15} />
        </div>
      </div>

      <div className="relative mt-4 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
        {value}
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center shadow-[var(--shadow-sm)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--primary)]/7 blur-3xl" />

      <div className="relative">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)] ring-1 ring-[var(--primary)]/10">
          {icon}
        </div>

        <h2 className="mt-5 text-lg font-bold text-[var(--text-primary)]">
          {title}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>

        {children && (
          <div className="mt-6 flex justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   LOADING
============================================================ */

function ApplicationsSkeleton() {
  return (
    <PageShell>
      <div className="animate-pulse">
        <div className="mb-6 h-8 w-32 rounded-lg bg-[var(--surface-soft)]" />

        <div className="mb-7 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <div className="h-4 w-40 rounded bg-[var(--surface-soft)]" />
          <div className="mt-4 h-10 w-80 rounded bg-[var(--surface-soft)]" />
          <div className="mt-3 h-4 w-[32rem] max-w-full rounded bg-[var(--surface-soft)]" />
        </div>

        <div className="mb-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            />
          ))}
        </div>

        <div className="mb-6 h-32 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />

        <div className="h-96 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
      </div>
    </PageShell>
  );
}