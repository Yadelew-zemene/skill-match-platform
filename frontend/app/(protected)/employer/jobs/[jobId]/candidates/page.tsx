"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  Search,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  fetchEmployerCandidates,
   fetchEmployerCandidatePhoto,
  type EmployerCandidate,
  type EmployerCandidatesResponse,
} from "@/services/job.service";

type StatusFilter =
  | "all"
  | "pending"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "accepted";

export default function EmployerCandidatesPage() {
  const params = useParams();

  const jobId = Number(params.jobId);

  const [data, setData] = useState<EmployerCandidatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    if (!Number.isInteger(jobId) || jobId <= 0) {
      setLoading(false);
      return;
    }

    const loadCandidates = async () => {
      try {
        setLoading(true);

        const response = await fetchEmployerCandidates(jobId);

        setData(response);
      } catch (error) {
        console.error("Failed to load candidates:", error);
        toast.error("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, [jobId]);

  const candidates = data?.candidates ?? [];

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return candidates.filter((candidate) => {
      const matchesSearch =
        !query ||
        candidate.candidate_name.toLowerCase().includes(query) ||
        candidate.candidate_email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || candidate.application_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [candidates, search, statusFilter]);

  const stats = useMemo(() => {
    const scores = candidates.map((candidate) =>
      Number(candidate.match_score ?? 0),
    );

    const averageScore =
      scores.length > 0
        ? Math.round(
            scores.reduce((sum, score) => sum + score, 0) / scores.length,
          )
        : 0;

    return {
      total: candidates.length,
      pending: candidates.filter(
        (candidate) => candidate.application_status === "pending",
      ).length,
      reviewing: candidates.filter(
        (candidate) => candidate.application_status === "reviewing",
      ).length,
      shortlisted: candidates.filter(
        (candidate) => candidate.application_status === "shortlisted",
      ).length,
      averageScore,
    };
  }, [candidates]);

  if (!Number.isInteger(jobId) || jobId <= 0) {
    return (
      <div className="mx-auto max-w-7xl">
        <EmptyPage
          title="Invalid job"
          description="The requested job could not be identified."
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="absolute right-[-120px] top-40 h-[420px] w-[420px] rounded-full bg-[var(--accent)]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            TOP NAVIGATION
        ===================================================== */}

        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/employer/jobs-posted"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] transition group-hover:border-[var(--primary)]/30 group-hover:bg-[var(--primary-light)]">
              <ArrowLeft size={15} />
            </span>
            Back to jobs
          </Link>

          {!loading && data && (
            <Link
              href={`/employer/jobs/${jobId}`}
              className="hidden items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)] sm:inline-flex"
            >
              View job
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
        <Link
          href={`/employer/jobs/${jobId}/applications`}
          className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <FileText size={16} />
          Applications
        </Link>

        {/* =====================================================
            JOB HEADER
        ===================================================== */}

        <section className="relative mb-7 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[var(--primary)]/10 blur-3xl" />

          <div className="pointer-events-none absolute bottom-[-160px] right-24 h-80 w-80 rounded-full bg-[var(--accent)]/8 blur-3xl" />

          <div className="relative px-6 py-7 sm:px-8 sm:py-9 lg:px-10">
            {loading ? (
              <JobHeaderSkeleton />
            ) : data ? (
              <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
                    <Users size={13} />
                    Candidate pipeline
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-[var(--primary)]/15">
                      <Briefcase size={21} />
                    </div>

                    <div className="min-w-0">
                      <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                        {data.job.title}
                      </h1>

                      <p className="mt-1.5 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <BuildingIcon />
                        {data.job.company}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                    Review applicants for this opportunity and prioritize
                    candidates based on their SkillMatch compatibility.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                  <JobStatus status={data.job.status} />

                  <Link
                    href={`/employer/jobs/${jobId}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
                  >
                    View job details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyPage
                title="Job not found"
                description="We could not load the requested job."
              />
            )}
          </div>
        </section>

        {/* =====================================================
            PIPELINE OVERVIEW
        ===================================================== */}

        <section className="mb-7">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                Hiring pipeline
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                Candidate overview
              </h2>
            </div>

            {!loading && (
              <p className="hidden text-xs text-[var(--text-muted)] sm:block">
                Based on current applications
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <PipelineCard
              label="Applicants"
              value={stats.total}
              icon={<Users size={17} />}
              tone="primary"
            />

            <PipelineCard
              label="Pending"
              value={stats.pending}
              icon={<Clock3 size={17} />}
              tone="warning"
            />

            <PipelineCard
              label="Reviewing"
              value={stats.reviewing}
              icon={<Search size={17} />}
              tone="accent"
            />

            <PipelineCard
              label="Shortlisted"
              value={stats.shortlisted}
              icon={<CheckCircle2 size={17} />}
              tone="success"
            />

            <PipelineCard
              label="Avg. match"
              value={`${stats.averageScore}%`}
              icon={<Sparkles size={17} />}
              tone="primary"
              wide
            />
          </div>
        </section>

        {/* =====================================================
            SEARCH + FILTER
        ===================================================== */}

        <section className="mb-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                placeholder="Search by candidate name or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] hover:border-[var(--border-strong)] focus:border-[var(--primary)]/40 focus:ring-4 focus:ring-[var(--primary)]/5"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] outline-none transition hover:border-[var(--border-strong)] focus:border-[var(--primary)]/40 focus:ring-4 focus:ring-[var(--primary)]/5"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>

              <div className="whitespace-nowrap rounded-xl bg-[var(--surface-soft)] px-3 py-2.5 text-center text-xs font-semibold text-[var(--text-secondary)]">
                {loading
                  ? "Loading..."
                  : `${filteredCandidates.length} ${
                      filteredCandidates.length === 1
                        ? "candidate"
                        : "candidates"
                    }`}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CANDIDATE LIST
        ===================================================== */}

        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          {/* List header */}
          {!loading && filteredCandidates.length > 0 && (
            <div className="hidden border-b border-[var(--border)] bg-[var(--surface-soft)]/60 px-6 py-3.5 lg:grid lg:grid-cols-[minmax(0,1fr)_220px_150px_120px] lg:items-center lg:gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Candidate
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                SkillMatch
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Application
              </span>

              <span className="text-right text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Action
              </span>
            </div>
          )}

          {loading ? (
            <LoadingCandidates />
          ) : filteredCandidates.length === 0 ? (
            <EmptyCandidates
              hasApplicants={candidates.length > 0}
              hasSearch={Boolean(search.trim())}
            />
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filteredCandidates.map((candidate, index) => (
                <CandidateRow
                  key={candidate.application_id}
                  candidate={candidate}
                  rank={index + 1}
                  jobId={jobId}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   CANDIDATE ROW
========================================================= */

// function CandidateRow({
//   candidate,
//   rank,
//   jobId,
// }: {
//   candidate: EmployerCandidate;
//   rank: number;
//   jobId: number;
// }) {
//   const score = Math.min(Math.max(Number(candidate.match_score ?? 0), 0), 100);

//   return (
//     <div className="group px-5 py-5 transition hover:bg-[var(--surface-soft)]/45 sm:px-6 sm:py-6">
//       <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px_150px_120px] lg:items-center lg:gap-6">
//         {/* Candidate */}
//         <div className="min-w-0">
//           <div className="flex items-start gap-4">
//             {/* Rank */}
//             <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] sm:flex">
//               #{rank}
//             </div>

//             {/* Avatar */}
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
//               <Users size={18} />
//             </div>

//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h3 className="truncate text-sm font-semibold text-[var(--text-primary)] sm:text-base">
//                   {candidate.candidate_name}
//                 </h3>

//                 <StatusBadge status={candidate.application_status} />
//               </div>

//               <p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-xs text-[var(--text-muted)]">
//                 <Mail size={13} className="shrink-0" />
//                 {candidate.candidate_email}
//               </p>

//               <div className="mt-2.5 flex flex-wrap gap-2">
//                 {candidate.original_filename && (
//                   <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]">
//                     <FileText size={12} className="shrink-0" />

//                     <span className="truncate">
//                       {candidate.original_filename}
//                     </span>
//                   </span>
//                 )}

//                 <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] sm:hidden">
//                   <Calendar size={12} />
//                   {formatDate(candidate.applied_at)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Match */}
//         <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/60 p-3.5">
//           <div className="flex items-center justify-between gap-3">
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
//                 Match score
//               </p>

//               <p className="mt-1 text-[11px] text-[var(--text-muted)]">
//                 Skill compatibility
//               </p>
//             </div>

//             <span className="text-lg font-bold tracking-tight text-[var(--primary)]">
//               {Math.round(score)}%
//             </span>
//           </div>

//           <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border)]">
//             <div
//               className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500"
//               style={{
//                 width: `${score}%`,
//               }}
//             />
//           </div>
//         </div>

//         {/* Applied */}
//         <div className="hidden lg:block">
//           <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
//             Applied
//           </p>

//           <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)]">
//             <Calendar size={13} />
//             {formatDate(candidate.applied_at)}
//           </p>
//         </div>

//         {/* Action */}
//         <Link
//           href={`/employer/jobs/${jobId}/candidates/${candidate.candidate_id}`}
//           className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:shadow-sm lg:w-auto"
//         >
//           View profile
//           <ArrowRight size={14} />
//         </Link>
//       </div>
//     </div>
//   );
// }
function CandidateRow({
  candidate,
  rank,
  jobId,
}: {
  candidate: EmployerCandidate;
  rank: number;
  jobId: number;
}) {
  const score = Math.min(Math.max(Number(candidate.match_score ?? 0), 0), 100);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    const loadPhoto = async () => {
      try {
        const url = await fetchEmployerCandidatePhoto(
          jobId,
          candidate.candidate_id,
        );

        if (cancelled) {
          window.URL.revokeObjectURL(url);
          return;
        }

        objectUrl = url;
        setPhotoUrl(url);
      } catch (error) {
        // A missing profile photo is normal.
        // Keep the initials avatar instead.
        console.debug(
          `No profile photo for candidate ${candidate.candidate_id}`,
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
  }, [jobId, candidate.candidate_id]);

  const candidateInitial =
    candidate.candidate_name?.charAt(0)?.toUpperCase() || "C";

  return (
    <div className="group px-5 py-5 transition hover:bg-[var(--surface-soft)]/45 sm:px-6 sm:py-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px_150px_120px] lg:items-center lg:gap-6">
        {/* Candidate */}
        <div className="min-w-0">
          <div className="flex items-start gap-4">
            {/* Rank */}
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-secondary)] sm:flex">
              #{rank}
            </div>

            {/* Avatar */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--primary-light)] text-[var(--primary)]">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={`${candidate.candidate_name} profile photo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold">{candidateInitial}</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                  {candidate.candidate_name}
                </h3>

                <StatusBadge status={candidate.application_status} />
              </div>

              <p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-xs text-[var(--text-muted)]">
                <Mail size={13} className="shrink-0" />
                {candidate.candidate_email}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {candidate.original_filename && (
                  <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]">
                    <FileText size={12} className="shrink-0" />

                    <span className="truncate">
                      {candidate.original_filename}
                    </span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] sm:hidden">
                  <Calendar size={12} />
                  {formatDate(candidate.applied_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Match */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/60 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Match score
              </p>

              <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                Skill compatibility
              </p>
            </div>

            <span className="text-lg font-bold tracking-tight text-[var(--primary)]">
              {Math.round(score)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500"
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </div>

        {/* Applied */}
        <div className="hidden lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Applied
          </p>

          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)]">
            <Calendar size={13} />
            {formatDate(candidate.applied_at)}
          </p>
        </div>

        {/* Action */}
        <Link
          href={`/employer/jobs/${jobId}/candidates/${candidate.candidate_id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:shadow-sm lg:w-auto"
        >
          View profile
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
/* =========================================================
   PIPELINE CARD
========================================================= */

function PipelineCard({
  label,
  value,
  icon,
  tone,
  wide = false,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  tone: "primary" | "success" | "accent" | "warning";
  wide?: boolean;
}) {
  const toneClasses = {
    primary: "bg-[var(--primary-light)] text-[var(--primary)]",
    success: "bg-[var(--success-light)] text-[var(--success)]",
    accent: "bg-[var(--accent-light)] text-[var(--accent)]",
    warning: "bg-amber-500/10 text-amber-600",
  };

  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] sm:p-5 ${
        wide ? "col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          {icon}
        </div>

        {wide && <Sparkles size={14} className="text-[var(--accent)]" />}
      </div>

      <p className="mt-4 text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: EmployerCandidate["application_status"];
}) {
  const config = {
    pending: {
      label: "Pending",
      className: "bg-amber-500/10 text-amber-600 border-amber-500/15",
      icon: <Clock3 size={11} />,
    },

    reviewing: {
      label: "Reviewing",
      className: "bg-blue-500/10 text-blue-600 border-blue-500/15",
      icon: <Search size={11} />,
    },

    shortlisted: {
      label: "Shortlisted",
      className:
        "bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]/15",
      icon: <CheckCircle2 size={11} />,
    },

    rejected: {
      label: "Rejected",
      className: "bg-red-500/10 text-red-500 border-red-500/15",
      icon: <XCircle size={11} />,
    },

    accepted: {
      label: "Accepted",
      className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
      icon: <Check size={11} />,
    },
  };

  const current = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${current.className}`}
    >
      {current.icon}
      {current.label}
    </span>
  );
}

/* =========================================================
   JOB STATUS
========================================================= */

function JobStatus({ status }: { status: "active" | "closed" }) {
  const active = status === "active";

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        active
          ? "border-[var(--success)]/15 bg-[var(--success-light)] text-[var(--success)]"
          : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-muted)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-[var(--success)]" : "bg-[var(--text-muted)]"
        }`}
      />

      {active ? "Active job" : "Closed job"}
    </span>
  );
}

/* =========================================================
   HEADER SKELETON
========================================================= */

function JobHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-7 w-36 rounded-full bg-[var(--surface-soft)]" />

      <div className="mt-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-[var(--surface-soft)]" />

        <div>
          <div className="h-8 w-72 max-w-[60vw] rounded-lg bg-[var(--surface-soft)]" />
          <div className="mt-2 h-4 w-40 rounded bg-[var(--surface-soft)]" />
        </div>
      </div>

      <div className="mt-5 h-4 w-full max-w-xl rounded bg-[var(--surface-soft)]" />
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingCandidates() {
  return (
    <div className="divide-y divide-[var(--border)]">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="animate-pulse px-5 py-6 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px_150px_120px] lg:items-center lg:gap-6">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-[var(--surface-soft)]" />

              <div className="flex-1">
                <div className="h-4 w-44 rounded bg-[var(--surface-soft)]" />
                <div className="mt-2 h-3 w-60 rounded bg-[var(--surface-soft)]" />
                <div className="mt-3 h-5 w-28 rounded bg-[var(--surface-soft)]" />
              </div>
            </div>

            <div className="h-20 rounded-xl bg-[var(--surface-soft)]" />

            <div className="hidden h-10 w-28 rounded bg-[var(--surface-soft)] lg:block" />

            <div className="h-10 rounded-xl bg-[var(--surface-soft)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY CANDIDATES
========================================================= */

function EmptyCandidates({
  hasApplicants,
  hasSearch,
}: {
  hasApplicants: boolean;
  hasSearch: boolean;
}) {
  const title = hasSearch
    ? "No matching candidates"
    : hasApplicants
      ? "No candidates found"
      : "No applicants yet";

  const description = hasSearch
    ? "Try a different candidate name, email, or status filter."
    : hasApplicants
      ? "Try changing your search or status filter."
      : "Candidates who apply to this job will appear here with their SkillMatch compatibility.";

  return (
    <div className="px-6 py-16 text-center sm:py-20">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--primary)]/10 bg-[var(--primary-light)] text-[var(--primary)]">
        <Users size={25} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
        {description}
      </p>

      {hasSearch && (
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]/20 hover:bg-[var(--primary-light)]"
        >
          Refresh candidates
        </button>
      )}
    </div>
  );
}

/* =========================================================
   INVALID / EMPTY PAGE
========================================================= */

function EmptyPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center shadow-[var(--shadow-sm)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-soft)] text-[var(--text-muted)]">
        <XCircle size={24} />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
        {description}
      </p>

      <Link
        href="/employer/jobs-posted"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:brightness-105"
      >
        <ArrowLeft size={15} />
        Back to jobs
      </Link>
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

/* =========================================================
   SMALL ICON
========================================================= */

function BuildingIcon() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center">
      <Briefcase size={14} />
    </span>
  );
}
