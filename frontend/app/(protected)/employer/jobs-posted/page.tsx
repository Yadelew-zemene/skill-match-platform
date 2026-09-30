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

      const data = await fetchEmployerJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
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
        current.map((item) => (item.id === updatedJob.id ? updatedJob : item)),
      );

      toast.success(nextStatus === "active" ? "Job reopened" : "Job closed");
    } catch (error) {
      console.error(error);
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
      console.error(error);
      toast.error("Failed to delete job");
    } finally {
      setProcessingJobId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER */}
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand)]">
            Job management
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your job postings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Manage your open positions, review applications, and keep your job
            postings up to date.
          </p>
        </div>

        <Link
          href="/employer/post-jobs"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
        >
          <Plus size={17} />
          Post a new job
        </Link>
      </section>

      {/* STATS */}
      <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total jobs"
          value={stats.total}
          icon={<Briefcase size={18} />}
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon={<CheckCircle2 size={18} />}
        />

        <StatCard
          label="Closed"
          value={stats.closed}
          icon={<XCircle size={18} />}
        />

        <StatCard
          label="Applicants"
          value={stats.applicants}
          icon={<Users size={18} />}
        />
      </section>

      {/* TOOLBAR */}
      <section className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
          />

          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)]"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />

          <span className="whitespace-nowrap text-sm text-[var(--muted-foreground)]">
            {loading
              ? "Loading..."
              : `${filteredJobs.length} ${
                  filteredJobs.length === 1 ? "job" : "jobs"
                }`}
          </span>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[minmax(0,2fr)_1fr_1fr_auto] gap-6 border-b border-[var(--border)] px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            <div>Job</div>
            <div>Posted</div>
            <div>Applicants</div>
            <div className="text-right">Actions</div>
          </div>

          {loading ? (
            <LoadingRows />
          ) : filteredJobs.length === 0 ? (
            <EmptyState hasSearch={Boolean(search)} />
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
            <EmptyState hasSearch={Boolean(search)} />
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

      {/* FOOTER CTA */}
      {!loading && jobs.length > 0 && (
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold">Need to review candidates?</p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              See candidates associated with your job postings.
            </p>
          </div>

          <Link
            href="/employer/candidates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-hover)]"
          >
            View candidates
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------
   STAT CARD
------------------------------------------------- */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>

      <p className="text-2xl font-bold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-[var(--muted-foreground)]">{label}</p>
    </div>
  );
}

/* -------------------------------------------------
   STATUS FILTER
------------------------------------------------- */

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
        className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-4 pr-9 text-sm outline-none focus:border-[var(--brand)]"
      >
        <option value="all">All statuses</option>

        <option value="active">Active</option>

        <option value="closed">Closed</option>
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
      />
    </div>
  );
}

/* -------------------------------------------------
   DESKTOP JOB ROW
------------------------------------------------- */

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
    <div className="group grid grid-cols-[minmax(0,2fr)_1fr_1fr_auto] items-center gap-6 px-6 py-5 transition hover:bg-[var(--surface-elevated)]">
      {/* JOB */}
      <Link
        href={`/employer/jobs/${job.id}`}
        className="flex min-w-0 items-center gap-4"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10">
          <Briefcase size={18} className="text-[var(--brand)]" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold transition group-hover:text-[var(--brand)]">
            {job.title}
          </p>

          <p className="mt-1 truncate text-xs text-[var(--muted-foreground)]">
            {job.company}
          </p>
        </div>
      </Link>

      {/* POSTED */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Calendar size={15} />
        {formatDate(job.created_at)}
      </div>

      {/* APPLICANTS */}
      <div className="flex items-center gap-2 text-sm">
        <Users size={15} className="text-[var(--muted)]" />

        <span className="font-semibold">{job.applicants ?? 0}</span>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-2">
        <StatusBadge status={job.status} />

        <Link
          href={`/employer/jobs/${job.id}`}
          className="ml-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)]/10"
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
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--brand)] disabled:opacity-50"
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

/* -------------------------------------------------
   MOBILE JOB CARD
------------------------------------------------- */

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
    <div className="group p-5">
      <div className="flex items-start justify-between gap-4">
        <Link href={`/employer/jobs/${job.id}`} className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10">
            <Briefcase size={18} className="text-[var(--brand)]" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold transition group-hover:text-[var(--brand)]">
              {job.title}
            </p>

            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
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
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--brand)]"
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

      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[var(--muted-foreground)]">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {formatDate(job.created_at)}
        </span>

        <span className="flex items-center gap-1.5">
          <Users size={13} />
          {job.applicants ?? 0} applicants
        </span>

        <StatusBadge status={job.status} />
      </div>

      <Link
        href={`/employer/jobs/${job.id}`}
        className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm font-semibold text-[var(--brand)]"
      >
        <span>View job details</span>

        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

/* -------------------------------------------------
   JOB ACTION MENU
------------------------------------------------- */

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
    <div className="absolute right-0 top-11 z-30 w-44 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-xl">
      <Link
        href={`/employer/jobs/${job.id}/edit`}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition hover:bg-[var(--surface-elevated)]"
      >
        <Edit2 size={14} />
        Edit job
      </Link>

      <button
        type="button"
        onClick={onStatusChange}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition hover:bg-[var(--surface-elevated)]"
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
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-400 transition hover:bg-red-500/10"
      >
        <Trash2 size={14} />
        Delete job
      </button>
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
      className={`inline-flex items-center gap-2 text-xs font-medium ${
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
   LOADING
------------------------------------------------- */

function LoadingRows() {
  return (
    <div className="divide-y divide-[var(--border)]">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="grid grid-cols-[minmax(0,2fr)_1fr_1fr_auto] gap-6 px-6 py-6"
        >
          <div className="h-10 animate-pulse rounded-lg bg-[var(--surface-elevated)]" />

          <div className="h-5 animate-pulse rounded bg-[var(--surface-elevated)]" />

          <div className="h-5 animate-pulse rounded bg-[var(--surface-elevated)]" />

          <div className="h-5 w-24 animate-pulse rounded bg-[var(--surface-elevated)]" />
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
          className="h-32 animate-pulse rounded-xl bg-[var(--surface-elevated)]"
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------
   EMPTY STATE
------------------------------------------------- */

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)]/10">
        <Briefcase size={24} className="text-[var(--brand)]" />
      </div>

      <h3 className="mt-5 text-base font-semibold">
        {hasSearch ? "No jobs found" : "No jobs posted yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
        {hasSearch
          ? "Try a different job title or company name."
          : "Create your first opportunity and let SkillMatch help you find suitable candidates."}
      </p>

      {!hasSearch && (
        <Link
          href="/employer/post-jobs"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
        >
          <Plus size={16} />
          Post your first job
        </Link>
      )}
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
