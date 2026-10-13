"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock3,
  Edit2,
  ExternalLink,
  FileText,
  Sparkles,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  deleteEmployerJob,
  fetchEmployerJob,
  updateEmployerJobStatus,
  type EmployerJobDetail,
} from "@/services/job.service";

export default function EmployerJobDetailPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = Number(params.jobId);

  const [job, setJob] = useState<EmployerJobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(jobId) || jobId <= 0) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const loadJob = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const data = await fetchEmployerJob(jobId);

        setJob(data);
      } catch (error) {
        console.error("Failed to load job:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const handleStatusChange = async () => {
    if (!job || processing) return;

    const nextStatus = job.status === "active" ? "closed" : "active";

    try {
      setProcessing(true);

      const updatedJob = await updateEmployerJobStatus(job.id, nextStatus);

      setJob((current) =>
        current
          ? {
              ...current,
              ...updatedJob,
            }
          : updatedJob,
      );

      toast.success(nextStatus === "active" ? "Job reopened" : "Job closed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update job status");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!job || processing) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setProcessing(true);

      await deleteEmployerJob(job.id);

      toast.success("Job deleted");

      router.push("/employer/jobs-posted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
      setProcessing(false);
    }
  };

  if (loading) {
    return <JobDetailSkeleton />;
  }

  if (notFound || !job) {
    return <JobNotFound />;
  }

  const isActive = job.status === "active";

  const totalApplicants = Number(job.applicants ?? 0);
  const pendingApplications = Number(job.pending_applications ?? 0);
  const reviewingApplications = Number(job.reviewing_applications ?? 0);
  const shortlistedApplications = Number(job.shortlisted_applications ?? 0);

  return (
    <div className="relative mx-auto max-w-7xl">
      {/* AMBIENT PAGE EFFECT */}
      <div className="pointer-events-none absolute -inset-x-20 -top-24 -z-10 h-[30rem] overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[var(--primary)]/7 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[var(--accent)]/7 blur-3xl" />

        <div className="absolute left-1/2 top-20 h-56 w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--primary)]/[0.035] via-transparent to-[var(--accent)]/[0.035] blur-3xl" />
      </div>

      {/* BACK NAVIGATION */}
      <div className="mb-6">
        <Link
          href="/employer/jobs-posted"
          className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--text-muted)] transition-all duration-300 hover:bg-[var(--surface)] hover:text-[var(--primary)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to jobs
        </Link>
      </div>

      {/* HERO */}
      <section className="group relative mb-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-70" />

        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--primary)]/8 blur-3xl transition-opacity duration-500 group-hover:bg-[var(--primary)]/12" />

        <div className="relative p-6 sm:p-8 lg:p-9">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">
            {/* JOB IDENTITY */}
            <div className="min-w-0">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)] ring-1 ring-[var(--primary)]/10">
                  <Briefcase size={23} strokeWidth={1.9} />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                </div>

                <div className="min-w-0">
                  <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
                    <StatusBadge status={job.status} />

                    <span className="text-xs text-[var(--text-muted)]">
                      Job #{job.id}
                    </span>
                  </div>

                  <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
                    {job.title}
                  </h1>

                  <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
                    {job.company}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--text-muted)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      Posted {formatDate(job.created_at)}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {totalApplicants}{" "}
                      {totalApplicants === 1 ? "applicant" : "applicants"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2 xl:justify-end">
              <Link
                href={`/employer/jobs/${job.id}/edit`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
              >
                <Edit2 size={15} />
                Edit
              </Link>

              <button
                type="button"
                disabled={processing}
                onClick={handleStatusChange}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isActive ? (
                  <>
                    <Clock3 size={15} />
                    Close job
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} />
                    Reopen job
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={processing}
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* MAIN */}
        <main className="space-y-6">
          {/* DESCRIPTION */}
          <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <SectionHeader
              icon={<FileText size={17} />}
              title="Job description"
              description="The details candidates see for this opportunity"
            />

            <div className="px-6 pb-7 sm:px-8 sm:pb-8">
              {job.description ? (
                <div className="whitespace-pre-wrap text-sm leading-7 text-[var(--text-secondary)]">
                  {job.description}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)] p-5 text-sm text-[var(--text-muted)]">
                  No job description has been provided.
                </div>
              )}
            </div>
          </section>

          {/* APPLICATION LINK */}
          <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <SectionHeader
              icon={<ExternalLink size={17} />}
              title="Application destination"
              description="Where candidates are directed to apply"
            />

            <div className="px-6 pb-7 sm:px-8 sm:pb-8">
              {job.application_link ? (
                <a
                  href={job.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 transition-all duration-300 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)]/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--primary)] shadow-sm">
                    <ExternalLink size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[var(--text-muted)]">
                      Application link
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-[var(--text-secondary)] transition group-hover:text-[var(--primary)]">
                      {job.application_link}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-[var(--text-muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                  />
                </a>
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)] p-5 text-sm text-[var(--text-muted)]">
                  No external application destination is configured.
                </div>
              )}
            </div>
          </section>
        </main>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          {/* APPLICATION PIPELINE */}
          <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[var(--primary)]/7 blur-2xl" />

            <div className="relative flex items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
                  <Users size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    Applications
                  </h2>

                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    Hiring pipeline
                  </p>
                </div>
              </div>

              <Link
                href={`/employer/jobs/${job.id}/applications`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/30 hover:text-[var(--primary)]"
              >
                View
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="relative space-y-2 p-5">
              <ApplicationStat
                label="Total applicants"
                value={totalApplicants}
                icon={<Users size={15} />}
                emphasis
              />

              <ApplicationStat
                label="Pending"
                value={pendingApplications}
                icon={<Clock3 size={15} />}
              />

              <ApplicationStat
                label="Reviewing"
                value={reviewingApplications}
                icon={<FileText size={15} />}
              />

              <ApplicationStat
                label="Shortlisted"
                value={shortlistedApplications}
                icon={<CheckCircle2 size={15} />}
              />

              <Link
                href={`/employer/jobs/${job.id}/candidates`}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20"
              >
                <Users size={16} />
                Review applicants
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </section>

          {/* POSTING STATUS */}
          <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--accent)]/7 blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--primary)]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                  Posting status
                </p>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <StatusIcon status={job.status} />

                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {isActive ? "Your job is active" : "Your job is closed"}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    {isActive
                      ? "Candidates can currently view this position and apply."
                      : "This position is no longer actively accepting applications."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={processing}
                onClick={handleStatusChange}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isActive ? (
                  <>
                    <Clock3 size={15} />
                    Close posting
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} />
                    Reopen posting
                  </>
                )}
              </button>
            </div>
          </section>

          {/* HIRING SIGNAL */}
          <section className="relative overflow-hidden rounded-2xl border border-[var(--primary)]/10 bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)] p-6">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--primary)]/10 blur-2xl" />

            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--primary)] shadow-sm">
                <Sparkles size={17} />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                Keep your hiring focused
              </h2>

              <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                Review candidates matched to this job and move relevant
                applicants through your hiring process.
              </p>

              <Link
                href={`/employer/jobs/${job.id}/candidates`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
              >
                Review applicants for this job
                <ArrowRight size={13} />
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-[var(--border)] px-6 py-5 sm:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   APPLICATION STAT
============================================================= */

function ApplicationStat({
  label,
  value,
  icon,
  emphasis = false,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
        emphasis
          ? "border-[var(--primary)]/15 bg-[var(--primary-light)]/60"
          : "border-[var(--border)] bg-[var(--surface-soft)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={
            emphasis ? "text-[var(--primary)]" : "text-[var(--text-muted)]"
          }
        >
          {icon}
        </span>

        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      </div>

      <span
        className={`text-sm font-bold ${
          emphasis ? "text-[var(--primary)]" : "text-[var(--text-primary)]"
        }`}
      >
        {Number(value ?? 0)}
      </span>
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({ status }: { status: EmployerJobDetail["status"] }) {
  const active = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        active
          ? "bg-[var(--success-light)] text-[var(--success)]"
          : "bg-[var(--surface-soft)] text-[var(--text-muted)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-[var(--success)]" : "bg-[var(--text-muted)]"
        }`}
      />

      {active ? "Active" : "Closed"}
    </span>
  );
}

/* =============================================================
   STATUS ICON
============================================================= */

function StatusIcon({ status }: { status: EmployerJobDetail["status"] }) {
  const active = status === "active";

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
        active
          ? "bg-[var(--success-light)] text-[var(--success)]"
          : "bg-[var(--surface-soft)] text-[var(--text-muted)]"
      }`}
    >
      {active ? <CheckCircle2 size={19} /> : <XCircle size={19} />}
    </div>
  );
}

/* =============================================================
   LOADING
============================================================= */

function JobDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse">
      <div className="mb-6 h-8 w-32 rounded-lg bg-[var(--surface-soft)]" />

      <section className="mb-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="flex gap-5">
          <div className="h-14 w-14 rounded-2xl bg-[var(--surface-soft)]" />

          <div className="flex-1">
            <div className="h-5 w-20 rounded bg-[var(--surface-soft)]" />
            <div className="mt-4 h-9 max-w-xl rounded bg-[var(--surface-soft)]" />
            <div className="mt-3 h-4 w-40 rounded bg-[var(--surface-soft)]" />
            <div className="mt-5 h-4 w-64 rounded bg-[var(--surface-soft)]" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <div className="h-96 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
          <div className="h-40 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
        </div>

        <div className="space-y-6">
          <div className="h-80 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
          <div className="h-48 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   NOT FOUND
============================================================= */

function JobNotFound() {
  return (
    <div className="relative mx-auto max-w-xl py-20 text-center">
      <div className="pointer-events-none absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--primary)]/8 blur-3xl" />

      <div className="relative">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)] ring-1 ring-[var(--primary)]/10">
          <Briefcase size={24} />
        </div>

        <h1 className="mt-5 text-xl font-bold text-[var(--text-primary)]">
          Job not found
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
          This job may have been deleted, or you may not have permission to view
          it.
        </p>

        <Link
          href="/employer/jobs-posted"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <ArrowLeft size={15} />
          Back to jobs
        </Link>
      </div>
    </div>
  );
}

/* =============================================================
   DATE
============================================================= */

function formatDate(date: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
