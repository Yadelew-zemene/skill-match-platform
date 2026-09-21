"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Edit2,
  Trash2,
  Plus,
  Search,
  Users,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import { fetchEmployerJobs } from "@/services/job.service";
import { useAuth } from "@/contexts/AuthContext";

type Job = {
  id: string;
  title: string;
  company: string;
  created_at: string;
  applicants?: number;
};

export default function JobsPostedPage() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    setLoading(true);

    fetchEmployerJobs(user.id)
      .then((data) => {
        const jobsData = Array.isArray(data) ? data : data?.jobs || [];

        setJobs(jobsData);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load jobs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.id]);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return jobs;

    return jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(query) ||
        job.company?.toLowerCase().includes(query),
    );
  }, [jobs, search]);

  const handleDelete = (job: Job) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"?`,
    );

    if (!confirmed) return;

    // TODO:
    // Connect this to your deleteJob() service.
    toast("Delete functionality will be connected to the backend.");
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
            Manage your opportunities and track the candidates matched to each
            position.
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

      {/* TOOLBAR */}
      <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
          />

          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)]"
          />
        </div>

        <div className="text-sm text-[var(--muted-foreground)]">
          {loading
            ? "Loading jobs..."
            : `${filteredJobs.length} ${
                filteredJobs.length === 1 ? "job" : "jobs"
              }`}
        </div>
      </section>

      {/* JOBS */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-[var(--border)] px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            <div>Job</div>
            <div>Posted</div>
            <div>Matches</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {loading ? (
            <div className="divide-y divide-[var(--border)]">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-6"
                >
                  <div className="h-10 animate-pulse rounded-lg bg-[var(--surface-elevated)]" />
                  <div className="h-5 animate-pulse rounded bg-[var(--surface-elevated)]" />
                  <div className="h-5 animate-pulse rounded bg-[var(--surface-elevated)]" />
                  <div className="h-5 w-16 animate-pulse rounded bg-[var(--surface-elevated)]" />
                  <div />
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <EmptyState hasSearch={Boolean(search)} />
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 px-6 py-5 transition hover:bg-[var(--surface-elevated)]"
                >
                  {/* JOB */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10">
                      <Briefcase size={18} className="text-[var(--brand)]" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {job.title}
                      </h3>

                      <p className="mt-1 truncate text-xs text-[var(--muted-foreground)]">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Calendar size={15} />

                    {job.created_at
                      ? new Date(job.created_at).toLocaleDateString()
                      : "—"}
                  </div>

                  {/* MATCHES */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--brand)]/10 px-2.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
                      <Users size={13} />
                      {job.applicants ?? 0}
                    </span>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      aria-label={`Edit ${job.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--brand)]"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${job.title}`}
                      onClick={() => handleDelete(job)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden">
          {loading ? (
            <div className="space-y-3 p-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-xl bg-[var(--surface-elevated)]"
                />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <EmptyState hasSearch={Boolean(search)} />
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filteredJobs.map((job) => (
                <div key={job.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10">
                        <Briefcase size={18} className="text-[var(--brand)]" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-medium text-emerald-400">
                      Active
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {job.created_at
                          ? new Date(job.created_at).toLocaleDateString()
                          : "—"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Users size={13} />
                        {job.applicants ?? 0} matches
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--brand)]"
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(job)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA */}
      {!loading && jobs.length > 0 && (
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold">
              Looking for stronger candidates?
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Review SkillMatch's candidate recommendations for your active
              positions.
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
          : "Create your first opportunity and let SkillMatch help you discover stronger candidates."}
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
