"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Edit2,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  deleteEmployerJob,
  fetchEmployerJobs,
  updateEmployerJobStatus,
  type EmployerJob,
} from "@/services/job.service";

type StatusFilter = "all" | "active" | "closed";

export default function JobsPostedPage() {
  const [jobs, setJobs] = useState<EmployerJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [processingJobId, setProcessingJobId] = useState<number | null>(null);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await fetchEmployerJobs();
      const data = normalizeJobsResponse(response);

      setJobs(data);
    } catch (error) {
      console.error("Failed to load employer jobs:", error);

      setJobs([]);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const stats = useMemo(() => {
    const active = jobs.filter((job) => job.status === "active").length;

    const closed = jobs.filter((job) => job.status === "closed").length;

    const applicants = jobs.reduce(
      (total, job) => total + Number(job.applicants || 0),
      0,
    );

    return {
      total: jobs.length,
      active,
      closed,
      applicants,
    };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const handleStatusChange = async (job: EmployerJob) => {
    const nextStatus = job.status === "active" ? "closed" : "active";

    try {
      setProcessingJobId(job.id);
      setOpenMenu(null);

      const updatedJob = await updateEmployerJobStatus(job.id, nextStatus);

      setJobs((current) =>
        current.map((item) =>
          item.id === updatedJob.id
            ? {
                ...item,
                ...updatedJob,
              }
            : item,
        ),
      );

      toast.success(nextStatus === "active" ? "Job reopened" : "Job closed");
    } catch (error) {
      console.error("Failed to update job status:", error);

      toast.error("Failed to update job status");
    } finally {
      setProcessingJobId(null);
    }
  };

  const handleDelete = async (job: EmployerJob) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setProcessingJobId(job.id);
      setOpenMenu(null);

      await deleteEmployerJob(job.id);

      setJobs((current) => current.filter((item) => item.id !== job.id));

      toast.success("Job deleted");
    } catch (error) {
      console.error("Failed to delete job:", error);

      toast.error("Failed to delete job");
    } finally {
      setProcessingJobId(null);
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <section className="relative mb-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="pointer-events-none absolute right-32 top-20 h-48 w-48 rounded-full bg-[var(--accent)]/8 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative flex flex-col gap-6 px-6 py-7 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
              <Briefcase size={13} />
              Job management
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Your job postings
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              Manage your opportunities, monitor applications, and keep your
              hiring pipeline organized.
            </p>
          </div>

          <Link
            href="/employer/post-jobs"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20"
          >
            <Plus size={17} />
            Post a new job
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total jobs"
          value={stats.total}
          icon={<Briefcase size={18} />}
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon={<CheckCircle2 size={18} />}
          tone="success"
        />

        <StatCard
          label="Closed"
          value={stats.closed}
          icon={<XCircle size={18} />}
          tone="neutral"
        />

        <StatCard
          label="Applicants"
          value={stats.applicants}
          icon={<Users size={18} />}
          tone="accent"
        />
      </section>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}
      <section className="mb-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/40 focus:ring-4 focus:ring-[var(--primary)]/5"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <StatusFilter value={statusFilter} onChange={setStatusFilter} />

            <span className="whitespace-nowrap text-xs font-medium text-[var(--text-muted)]">
              {loading
                ? "Loading..."
                : `${filteredJobs.length} ${
                    filteredJobs.length === 1 ? "job" : "jobs"
                  }`}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          JOB LIST
      ===================================================== */}
      <section className="overflow-visible rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[minmax(0,2fr)_1fr_1fr_auto] gap-6 border-b border-[var(--border)] bg-[var(--surface-soft)]/50 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            <div>Job</div>
            <div>Posted</div>
            <div>Applicants</div>
            <div className="text-right">Actions</div>
          </div>

          {loading ? (
            <LoadingRows />
          ) : filteredJobs.length === 0 ? (
            <EmptyState hasSearch={Boolean(search)} hasJobs={jobs.length > 0} />
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filteredJobs.map((job) => (
                <DesktopJobRow
                  key={job.id}
                  job={job}
                  menuOpen={openMenu === job.id}
                  processing={processingJobId === job.id}
                  onMenu={() =>
                    setOpenMenu(openMenu === job.id ? null : job.id)
                  }
                  onStatusChange={() => handleStatusChange(job)}
                  onDelete={() => handleDelete(job)}
                />
              ))}
            </div>
          )}
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          {loading ? (
            <MobileLoading />
          ) : filteredJobs.length === 0 ? (
            <EmptyState hasSearch={Boolean(search)} hasJobs={jobs.length > 0} />
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filteredJobs.map((job) => (
                <MobileJobCard
                  key={job.id}
                  job={job}
                  menuOpen={openMenu === job.id}
                  processing={processingJobId === job.id}
                  onMenu={() =>
                    setOpenMenu(openMenu === job.id ? null : job.id)
                  }
                  onStatusChange={() => handleStatusChange(job)}
                  onDelete={() => handleDelete(job)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BOTTOM ACTION
      ===================================================== */}
      {!loading && jobs.length > 0 && (
        <section className="relative mt-6 overflow-hidden rounded-2xl border border-[var(--primary)]/10 bg-gradient-to-r from-[var(--primary-light)]/60 via-[var(--surface)] to-[var(--accent-light)]/50 p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-20 h-40 w-40 rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] shadow-sm">
                <Users size={18} className="text-[var(--primary)]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Ready to review candidates?
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  Open a job to review applicants, compare match scores, and
                  explore candidate skills.
                </p>
              </div>
            </div>

            <Link
              href="/employer/jobs-posted"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
            >
              Choose a job
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

/* =========================================================
   RESPONSE NORMALIZATION
========================================================= */

function normalizeJobsResponse(response: unknown): EmployerJob[] {
  if (Array.isArray(response)) {
    return response as EmployerJob[];
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const value = response as Record<string, unknown>;

  if (Array.isArray(value.jobs)) {
    return value.jobs as EmployerJob[];
  }

  if (Array.isArray(value.data)) {
    return value.data as EmployerJob[];
  }

  if (
    value.data &&
    typeof value.data === "object" &&
    Array.isArray((value.data as Record<string, unknown>).jobs)
  ) {
    return (value.data as Record<string, unknown>).jobs as EmployerJob[];
  }

  return [];
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  icon,
  tone = "primary",
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone?: "primary" | "success" | "accent" | "neutral";
}) {
  const toneClasses = {
    primary: "bg-[var(--primary-light)] text-[var(--primary)]",
    success: "bg-[var(--success-light)] text-[var(--success)]",
    accent: "bg-[var(--accent-light)] text-[var(--accent)]",
    neutral: "bg-[var(--surface-soft)] text-[var(--text-secondary)]",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/20 hover:shadow-[var(--shadow-md)]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--primary)]/8 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          {icon}
        </div>

        <p className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          {value}
        </p>

        <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">
          {label}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS FILTER
========================================================= */

function StatusFilter({
  value,
  onChange,
}: {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as StatusFilter)}
        className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-4 pr-10 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)]/40 focus:ring-4 focus:ring-[var(--primary)]/5"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="closed">Closed</option>
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
      />
    </div>
  );
}

/* =========================================================
   DESKTOP JOB ROW
========================================================= */

function DesktopJobRow({
  job,
  menuOpen,
  processing,
  onMenu,
  onStatusChange,
  onDelete,
}: {
  job: EmployerJob;
  menuOpen: boolean;
  processing: boolean;
  onMenu: () => void;
  onStatusChange: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group relative grid grid-cols-[minmax(0,2fr)_1fr_1fr_auto] items-center gap-6 px-6 py-5 transition-all duration-300 hover:bg-[var(--surface-soft)]/60">
      <Link
        href={`/employer/jobs/${job.id}`}
        className="flex min-w-0 items-center gap-4"
      >
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]">
          <Briefcase size={18} className="relative text-[var(--primary)]" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)] transition group-hover:text-[var(--primary)]">
            {job.title}
          </p>

          <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
            {job.company}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <Calendar size={15} className="text-[var(--text-muted)]" />

        {formatDate(job.created_at)}
      </div>

      <Link
        href={`/employer/jobs/${job.id}/applications`}
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
      >
        <Users size={15} className="text-[var(--text-muted)]" />

        <span className="font-semibold text-[var(--text-primary)]">
          {job.applicants ?? 0}
        </span>

        <span>applicants</span>
      </Link>

      <div className="flex items-center justify-end gap-2">
        <StatusBadge status={job.status} />

        <Link
          href={`/employer/jobs/${job.id}`}
          className="ml-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--primary)] transition hover:bg-[var(--primary-light)]"
        >
          View
          <ArrowRight size={14} />
        </Link>

        <div className="relative">
          <button
            type="button"
            disabled={processing}
            onClick={onMenu}
            aria-label={`Actions for ${job.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--primary)] disabled:opacity-50"
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <JobMenu
              job={job}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE JOB CARD
========================================================= */

function MobileJobCard({
  job,
  menuOpen,
  processing,
  onMenu,
  onStatusChange,
  onDelete,
}: {
  job: EmployerJob;
  menuOpen: boolean;
  processing: boolean;
  onMenu: () => void;
  onStatusChange: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group p-5 transition hover:bg-[var(--surface-soft)]/50">
      <div className="flex items-start justify-between gap-4">
        <Link href={`/employer/jobs/${job.id}`} className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]">
            <Briefcase size={18} className="text-[var(--primary)]" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {job.title}
            </p>

            <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
              {job.company}
            </p>
          </div>
        </Link>

        <div className="relative shrink-0">
          <button
            type="button"
            disabled={processing}
            onClick={onMenu}
            aria-label={`Actions for ${job.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--primary)] disabled:opacity-50"
          >
            <MoreHorizontal size={17} />
          </button>

          {menuOpen && (
            <JobMenu
              job={job}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {formatDate(job.created_at)}
        </span>

        <Link
          href={`/employer/jobs/${job.id}/applications`}
          className="flex items-center gap-1.5 transition hover:text-[var(--primary)]"
        >
          <Users size={13} />
          {job.applicants ?? 0} applicants
        </Link>

        <StatusBadge status={job.status} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <Link
          href={`/employer/jobs/${job.id}/applications`}
          className="text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
        >
          Applications
        </Link>

        <Link
          href={`/employer/jobs/${job.id}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]"
        >
          View job
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   JOB ACTION MENU
========================================================= */

function JobMenu({
  job,
  onStatusChange,
  onDelete,
}: {
  job: EmployerJob;
  onStatusChange: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-xl">
      <Link
        href={`/employer/jobs/${job.id}/edit`}
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]"
      >
        <Edit2 size={14} />
        Edit job
      </Link>

      <button
        type="button"
        onClick={onStatusChange}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]"
      >
        {job.status === "active" ? (
          <>
            <Clock3 size={14} />
            Close job
          </>
        ) : (
          <>
            <CheckCircle2 size={14} />
            Reopen job
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-red-500 transition hover:bg-red-500/5"
      >
        <Trash2 size={14} />
        Delete job
      </button>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }: { status: EmployerJob["status"] }) {
  const active = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
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

/* =========================================================
   LOADING
========================================================= */

function LoadingRows() {
  return (
    <div className="divide-y divide-[var(--border)]">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="grid grid-cols-[minmax(0,2fr)_1fr_1fr_auto] gap-6 px-6 py-6"
        >
          <div className="h-11 animate-pulse rounded-xl bg-[var(--surface-soft)]" />
          <div className="h-5 animate-pulse rounded bg-[var(--surface-soft)]" />
          <div className="h-5 animate-pulse rounded bg-[var(--surface-soft)]" />
          <div className="h-8 w-28 animate-pulse rounded bg-[var(--surface-soft)]" />
        </div>
      ))}
    </div>
  );
}

function MobileLoading() {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-32 animate-pulse rounded-xl bg-[var(--surface-soft)]"
        />
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  hasSearch,
  hasJobs,
}: {
  hasSearch: boolean;
  hasJobs: boolean;
}) {
  const filteredEmpty = hasSearch || hasJobs;

  return (
    <div className="px-6 py-16 text-center">
      <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-[var(--primary)]/10 blur-xl" />

        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--primary)]/10 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)]">
          <Briefcase size={24} className="text-[var(--primary)]" />
        </div>
      </div>

      <h3 className="mt-5 text-base font-semibold text-[var(--text-primary)]">
        {filteredEmpty ? "No jobs found" : "No jobs posted yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-muted)]">
        {filteredEmpty
          ? "Try changing your search or status filter."
          : "Create your first opportunity and start building your hiring pipeline."}
      </p>

      {!filteredEmpty && (
        <Link
          href="/employer/post-jobs"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[var(--primary)]/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Plus size={16} />
          Post your first job
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

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
