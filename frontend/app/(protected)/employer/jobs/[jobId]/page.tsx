"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock3,
  Edit2,
  ExternalLink,
  FileText,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  deleteEmployerJob,
  fetchEmployerJob,
  updateEmployerJobStatus,
  type EmployerJob,
} from "@/services/job.service";

export default function EmployerJobDetailPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = Number(params.jobId);

  const [job, setJob] = useState<EmployerJob | null>(null);
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
    if (!job) return;

    const nextStatus = job.status === "active" ? "closed" : "active";

    try {
      setProcessing(true);

      const updatedJob = await updateEmployerJobStatus(job.id, nextStatus);

      setJob(updatedJob);

      toast.success(nextStatus === "active" ? "Job reopened" : "Job closed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update job status");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!job) return;

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

  return (
    <div className="mx-auto max-w-6xl">
      {/* BACK */}
      <Link
        href="/employer/jobs-posted"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--brand)]"
      >
        <ArrowLeft size={16} />
        Back to job management
      </Link>

      {/* HEADER */}
      <section className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* JOB INFO */}
          <div className="flex min-w-0 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10">
              <Briefcase size={22} className="text-[var(--brand)]" />
            </div>

            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <StatusBadge status={job.status} />

                <span className="text-xs text-[var(--muted-foreground)]">
                  Job #{job.id}
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {job.title}
              </h1>

              <p className="mt-2 text-sm text-[var(--muted)]">{job.company}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  Posted {formatDate(job.created_at)}
                </span>

                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  {job.applicants ?? 0} applicants
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/employer/jobs/${job.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              <Edit2 size={15} />
              Edit
            </Link>

            <button
              type="button"
              disabled={processing}
              onClick={handleStatusChange}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--brand)] hover:text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isActive ? (
                <>
                  <Clock3 size={15} />
                  Close
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  Reopen
                </>
              )}
            </button>

            <button
              type="button"
              disabled={processing}
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* LEFT */}
        <main className="space-y-6">
          {/* DESCRIPTION */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <SectionHeader
              icon={<FileText size={17} />}
              title="Job description"
              description="Details provided for this position"
            />

            <div className="whitespace-pre-wrap text-sm leading-7 text-[var(--muted)]">
              {job.description}
            </div>
          </section>

          {/* APPLICATION */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <SectionHeader
              icon={<ExternalLink size={17} />}
              title="Application"
              description="Where candidates can apply"
            />

            <a
              href={job.application_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 transition hover:border-[var(--brand)]"
            >
              <span className="min-w-0 truncate text-sm text-[var(--muted)] group-hover:text-[var(--brand)]">
                {job.application_link}
              </span>

              <ArrowUpRight
                size={16}
                className="shrink-0 text-[var(--muted-foreground)] transition group-hover:text-[var(--brand)]"
              />
            </a>
          </section>
        </main>

        {/* RIGHT */}
        <aside className="space-y-6">
          {/* APPLICATION OVERVIEW */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-base font-semibold">Application overview</h2>

            <div className="mt-5 space-y-3">
              <ApplicationStat
                label="Total applicants"
                value={job.applicants}
                icon={<Users size={16} />}
              />

              <ApplicationStat
                label="Pending"
                value={job.pending_applications}
                icon={<Clock3 size={16} />}
              />

              <ApplicationStat
                label="Reviewing"
                value={job.reviewing_applications}
                icon={<FileText size={16} />}
              />

              <ApplicationStat
                label="Shortlisted"
                value={job.shortlisted_applications}
                icon={<CheckCircle2 size={16} />}
              />
            </div>

            <Link
              href={`/employer/candidates?jobId=${job.id}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
            >
              <Users size={16} />
              View candidates
            </Link>
          </section>

          {/* STATUS */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Posting status
            </p>

            <div className="mt-4 flex items-start gap-3">
              <StatusIcon status={job.status} />

              <div>
                <p className="text-sm font-semibold">
                  {isActive ? "This job is active" : "This job is closed"}
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  {isActive
                    ? "Candidates can currently view and apply for this position."
                    : "This position is no longer actively accepting applications."}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   SECTION HEADER
------------------------------------------------- */

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
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-semibold">{title}</h2>

        <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   APPLICATION STAT
------------------------------------------------- */

function ApplicationStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-[var(--muted-foreground)]">{icon}</span>

        <span className="text-sm text-[var(--muted)]">{label}</span>
      </div>

      <span className="text-sm font-semibold">{Number(value ?? 0)}</span>
    </div>
  );
}

/* -------------------------------------------------
   STATUS BADGE
------------------------------------------------- */

function StatusBadge({ status }: { status: EmployerJob["status"] }) {
  const active = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold ${
        active ? "text-emerald-400" : "text-[var(--muted-foreground)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-400" : "bg-[var(--muted-foreground)]"
        }`}
      />

      {active ? "Active" : "Closed"}
    </span>
  );
}

/* -------------------------------------------------
   STATUS ICON
------------------------------------------------- */

function StatusIcon({ status }: { status: EmployerJob["status"] }) {
  const active = status === "active";

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
        active
          ? "bg-emerald-400/10 text-emerald-400"
          : "bg-[var(--surface-soft)] text-[var(--muted-foreground)]"
      }`}
    >
      {active ? <CheckCircle2 size={19} /> : <XCircle size={19} />}
    </div>
  );
}

/* -------------------------------------------------
   LOADING
------------------------------------------------- */

function JobDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      <div className="mb-6 h-5 w-36 rounded bg-[var(--surface-elevated)]" />

      <section className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="h-4 w-20 rounded bg-[var(--surface-elevated)]" />

        <div className="mt-4 h-9 w-2/3 rounded bg-[var(--surface-elevated)]" />

        <div className="mt-3 h-4 w-40 rounded bg-[var(--surface-elevated)]" />

        <div className="mt-5 h-4 w-56 rounded bg-[var(--surface-elevated)]" />
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="h-96 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />

        <div className="h-80 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
      </div>
    </div>
  );
}

/* -------------------------------------------------
   NOT FOUND
------------------------------------------------- */

function JobNotFound() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)]/10">
        <Briefcase size={24} className="text-[var(--brand)]" />
      </div>

      <h1 className="mt-5 text-xl font-semibold">Job not found</h1>

      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        The job may have been deleted, or you may not have permission to view
        it.
      </p>

      <Link
        href="/employer/jobs-posted"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
      >
        <ArrowLeft size={15} />
        Back to jobs
      </Link>
    </div>
  );
}

/* -------------------------------------------------
   DATE
------------------------------------------------- */

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
