"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Sparkles,
  User,
  X,
  XCircle,
} from "lucide-react";

import {
  fetchEmployerCandidate,
  fetchCandidateResume,
  downloadCandidateResume,
  fetchEmployerCandidatePhoto,
  type EmployerCandidateDetailResponse,
} from "@/services/job.service";

import {
  updateEmployerApplicationStatus,
  type EmployerApplicationStatus,
} from "@/services/application.service";

const STATUS_LABELS: Record<EmployerApplicationStatus, string> = {
  pending: "Pending",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  accepted: "Accepted",
};

const STATUS_STYLES: Record<
  EmployerApplicationStatus,
  {
    badge: string;
    dot: string;
  }
> = {
  pending: {
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    dot: "bg-amber-500",
  },
  reviewing: {
    badge: "border-blue-500/20 bg-blue-500/10 text-blue-600",
    dot: "bg-blue-500",
  },
  shortlisted: {
    badge:
      "border-[var(--success)]/20 bg-[var(--success-light)] text-[var(--success)]",
    dot: "bg-[var(--success)]",
  },
  rejected: {
    badge: "border-red-500/20 bg-red-500/10 text-red-500",
    dot: "bg-red-500",
  },
  accepted: {
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    dot: "bg-emerald-500",
  },
};

const STATUS_OPTIONS: EmployerApplicationStatus[] = [
  "pending",
  "reviewing",
  "shortlisted",
  "rejected",
  "accepted",
];

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return "Unknown size";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function CandidateDetailPage() {
  const params = useParams();

  const jobId = Number(params.jobId);
  const candidateId = Number(params.candidateId);

  const [data, setData] = useState<EmployerCandidateDetailResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState("");

  const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);

  const [resumeFilename, setResumeFilename] = useState("");

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");

  const loadCandidate = async (showRefresh = false) => {
    let newPhotoUrl: string | null = null;

    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");
      setStatusError("");

      const response = await fetchEmployerCandidate(jobId, candidateId);

      setData(response);

      /*
       * Load the protected profile image through Axios.
       * Do not use a normal <img src="/..."> because the
       * endpoint requires the employer JWT.
       */
      if (response.candidate.has_profile_image) {
        try {
          newPhotoUrl = await fetchEmployerCandidatePhoto(jobId, candidateId);

          setPhotoUrl(newPhotoUrl);
        } catch (photoError) {
          console.error("Failed to load candidate profile photo:", photoError);

          setPhotoUrl(null);
        }
      } else {
        setPhotoUrl(null);
      }
    } catch (err) {
      console.error("Failed to load candidate:", err);

      setError("Unable to load candidate details. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (
      !Number.isInteger(jobId) ||
      jobId <= 0 ||
      !Number.isInteger(candidateId) ||
      candidateId <= 0
    ) {
      setError("Invalid candidate or job ID.");
      setLoading(false);
      return;
    }

    loadCandidate();
  }, [jobId, candidateId]);

  /*
   * Clean up profile photo object URL when leaving the page
   * or replacing the photo.
   */
  useEffect(() => {
    return () => {
      if (photoUrl) {
        window.URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  /*
   * Clean up resume preview URL.
   */
  useEffect(() => {
    return () => {
      if (resumePreviewUrl) {
        window.URL.revokeObjectURL(resumePreviewUrl);
      }
    };
  }, [resumePreviewUrl]);

  const candidate = data?.candidate;

  const matchScore = Math.min(
    Math.max(Number(candidate?.match_score ?? 0), 0),
    100,
  );

  const matchLabel = useMemo(() => {
    if (matchScore >= 80) return "Strong match";
    if (matchScore >= 60) return "Good match";
    if (matchScore >= 40) return "Partial match";
    return "Low match";
  }, [matchScore]);

  const candidateInitial =
    candidate?.candidate_name?.charAt(0)?.toUpperCase() || "C";

  const handlePreviewResume = async () => {
    if (!candidate) return;

    try {
      setResumeLoading(true);
      setResumeError("");

      if (resumePreviewUrl) {
        window.URL.revokeObjectURL(resumePreviewUrl);
        setResumePreviewUrl(null);
      }

      const resume = await fetchCandidateResume(jobId, candidateId);

      const url = window.URL.createObjectURL(resume.blob);

      setResumePreviewUrl(url);
      setResumeFilename(resume.filename);
    } catch (err) {
      console.error("Failed to preview resume:", err);

      setResumeError("Unable to open the resume. Please try again.");
    } finally {
      setResumeLoading(false);
    }
  };

  const closeResumePreview = () => {
    if (resumePreviewUrl) {
      window.URL.revokeObjectURL(resumePreviewUrl);
    }

    setResumePreviewUrl(null);
    setResumeFilename("");
  };

  const handleDownloadResume = async () => {
    try {
      setResumeLoading(true);
      setResumeError("");

      await downloadCandidateResume(jobId, candidateId);
    } catch (err) {
      console.error("Failed to download resume:", err);

      setResumeError("Unable to download the resume. Please try again.");
    } finally {
      setResumeLoading(false);
    }
  };

  const handleStatusChange = async (status: EmployerApplicationStatus) => {
    if (!candidate) return;

    if (status === candidate.application_status) {
      return;
    }

    try {
      setStatusLoading(true);
      setStatusError("");

      await updateEmployerApplicationStatus(candidate.application_id, status);

      await loadCandidate(true);
    } catch (err) {
      console.error("Failed to update application status:", err);

      setStatusError("Unable to update application status. Please try again.");
    } finally {
      setStatusLoading(false);
    }
  };

  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <div className="relative min-h-full overflow-hidden">
        <AmbientBackground />

        <main className="relative mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-36 rounded-lg bg-[var(--surface)]" />

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7">
              <div className="flex gap-5">
                <div className="h-16 w-16 rounded-2xl bg-[var(--surface-soft)]" />

                <div className="flex-1">
                  <div className="h-7 w-64 rounded-lg bg-[var(--surface-soft)]" />

                  <div className="mt-3 h-4 w-80 rounded bg-[var(--surface-soft)]" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="h-[500px] rounded-2xl bg-[var(--surface)]" />
              <div className="h-[500px] rounded-2xl bg-[var(--surface)]" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ========================================================
     ERROR
  ======================================================== */

  if (error || !data || !candidate) {
    return (
      <div className="relative min-h-full overflow-hidden">
        <AmbientBackground />

        <main className="relative mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <Link
            href={`/employer/jobs/${jobId}/candidates`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
          >
            <ArrowLeft size={16} />
            Back to candidates
          </Link>

          <div className="rounded-3xl border border-red-500/15 bg-[var(--surface)] p-10 text-center shadow-[var(--shadow-sm)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <XCircle size={28} />
            </div>

            <h1 className="mt-5 text-xl font-bold text-[var(--text-primary)]">
              Candidate unavailable
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              {error || "Candidate details could not be found."}
            </p>

            <button
              type="button"
              onClick={() => loadCandidate()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:brightness-105"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        </main>
      </div>
    );
  }

  const status = candidate.application_status as EmployerApplicationStatus;

  return (
    <div className="relative min-h-full overflow-hidden">
      <AmbientBackground />

      <main className="relative mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* ====================================================
            TOP NAV
        ==================================================== */}

        <div className="mb-5 flex items-center justify-between">
          <Link
            href={`/employer/jobs/${jobId}/candidates`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] transition group-hover:border-[var(--primary)]/25 group-hover:bg-[var(--primary-light)]">
              <ArrowLeft size={15} />
            </span>
            Candidates
          </Link>

          <button
            type="button"
            onClick={() => loadCandidate(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--primary)]/25 hover:text-[var(--primary)] disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* ====================================================
            HERO
        ==================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--primary)] via-indigo-400 to-[var(--accent)]" />

          <div className="pointer-events-none absolute -left-32 -top-40 h-80 w-80 rounded-full bg-[var(--primary)]/12 blur-3xl" />

          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-9">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              {/* Candidate identity */}

              <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-20 blur-md" />

                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] sm:h-20 sm:w-20">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={`${candidate.candidate_name} profile`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-[var(--primary)]">
                        {candidateInitial}
                      </span>
                    )}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--primary)]">
                      <Sparkles size={11} />
                      Candidate profile
                    </span>

                    <StatusBadge status={status} />
                  </div>

                  <h1 className="truncate text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                    {candidate.candidate_name}
                  </h1>

                  {candidate.professional_title && (
                    <p className="mt-1 text-sm font-semibold text-[var(--primary)] sm:text-base">
                      {candidate.professional_title}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--text-secondary)]">
                    <span className="inline-flex items-center gap-2">
                      <Mail size={14} className="text-[var(--text-muted)]" />
                      {candidate.candidate_email}
                    </span>

                    {candidate.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin
                          size={14}
                          className="text-[var(--text-muted)]"
                        />
                        {candidate.location}
                      </span>
                    )}

                    {candidate.phone && (
                      <span className="inline-flex items-center gap-2">
                        <Phone size={14} className="text-[var(--text-muted)]" />
                        {candidate.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Match score */}

              <MatchScore score={matchScore} label={matchLabel} />
            </div>
          </div>
        </section>

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="min-w-0 space-y-6">
            {/* Professional Summary */}

            {candidate.bio && (
              <GradientCard>
                <SectionEyebrow>Professional summary</SectionEyebrow>

                <h2 className="mt-1 text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  About the candidate
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[var(--text-secondary)]">
                  {candidate.bio}
                </p>
              </GradientCard>
            )}

            {/* Professional Links */}

            {(candidate.linkedin_url || candidate.github_url) && (
              <GradientCard>
                <SectionEyebrow>Professional presence</SectionEyebrow>

                <h2 className="mt-1 text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  Professional links
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  External profiles provided by the candidate.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {candidate.linkedin_url && (
                    <a
                      href={candidate.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/30 hover:text-[var(--primary)]"
                    >
                      <Linkedin size={15} />
                      LinkedIn
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {candidate.github_url && (
                    <a
                      href={candidate.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/30 hover:text-[var(--primary)]"
                    >
                      <Github size={15} />
                      GitHub
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </GradientCard>
            )}

            {/* Match analysis */}

            <GradientCard>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <SectionEyebrow>SkillMatch</SectionEyebrow>

                  <h2 className="mt-1 text-lg font-bold tracking-tight text-[var(--text-primary)]">
                    Match analysis
                  </h2>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Compatibility between this candidate and the role.
                  </p>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] sm:flex">
                  <Sparkles size={18} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/60 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Compatibility
                  </span>

                  <span className="text-sm font-bold text-[var(--primary)]">
                    {matchScore}%
                  </span>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-700"
                    style={{
                      width: `${matchScore}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>Candidate fit</span>
                  <span>{matchLabel}</span>
                </div>
              </div>
            </GradientCard>

            {/* Skills */}

            <GradientCard>
              <SectionEyebrow>Candidate profile</SectionEyebrow>

              <h2 className="mt-1 text-lg font-bold tracking-tight text-[var(--text-primary)]">
                Skills
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Skills extracted from the submitted resume.
              </p>

              {candidate.skills.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[var(--primary)]/10 bg-gradient-to-r from-[var(--primary-light)] to-[var(--accent-light)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/25"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-[var(--border-strong)] p-5 text-center text-sm text-[var(--text-muted)]">
                  No extracted skills available.
                </div>
              )}
            </GradientCard>

            {/* Cover letter */}

            <GradientCard>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <FileText size={17} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[var(--text-primary)]">
                    Cover letter
                  </h2>

                  <p className="text-xs text-[var(--text-muted)]">
                    Candidate&apos;s application message
                  </p>
                </div>
              </div>

              {candidate.cover_letter ? (
                <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/50 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--text-secondary)]">
                    {candidate.cover_letter}
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-[var(--border-strong)] p-5 text-center text-sm text-[var(--text-muted)]">
                  No cover letter was submitted.
                </div>
              )}
            </GradientCard>

            {/* Resume */}

            <GradientCard>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
                    <FileText size={19} />
                  </div>

                  <div className="min-w-0">
                    <SectionEyebrow>Documents</SectionEyebrow>

                    <h2 className="mt-0.5 truncate text-base font-bold text-[var(--text-primary)]">
                      {candidate.original_filename || "Candidate resume"}
                    </h2>

                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                      {candidate.file_size
                        ? formatFileSize(candidate.file_size)
                        : "Resume file"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={handlePreviewResume}
                    disabled={resumeLoading}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] disabled:opacity-50"
                  >
                    <ExternalLink size={14} />

                    {resumeLoading ? "Opening..." : "Preview"}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadResume}
                    disabled={resumeLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-[var(--primary)]/15 transition hover:brightness-105 disabled:opacity-50"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>

              {resumeError && (
                <div className="mt-4 rounded-xl border border-red-500/15 bg-red-500/5 p-3 text-xs leading-5 text-red-500">
                  {resumeError}
                </div>
              )}
            </GradientCard>
          </div>

          {/* ==================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-6">
            {/* Status */}

            <GradientCard>
              <SectionEyebrow>Hiring workflow</SectionEyebrow>

              <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)]">
                Application status
              </h2>

              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                Move this candidate through your hiring pipeline.
              </p>

              <div className="relative mt-5">
                <select
                  value={status}
                  disabled={statusLoading}
                  onChange={(event) =>
                    handleStatusChange(
                      event.target.value as EmployerApplicationStatus,
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 pr-10 text-sm font-semibold text-[var(--text-primary)] outline-none transition hover:border-[var(--border-strong)] focus:border-[var(--primary)]/40 focus:ring-4 focus:ring-[var(--primary)]/5 disabled:opacity-50"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {STATUS_LABELS[option]}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
              </div>

              {statusLoading && (
                <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <RefreshCw size={12} className="animate-spin" />
                  Updating status...
                </div>
              )}

              {statusError && (
                <div className="mt-3 rounded-xl border border-red-500/15 bg-red-500/5 p-3 text-xs leading-5 text-red-500">
                  {statusError}
                </div>
              )}
            </GradientCard>

            {/* Application */}

            <GradientCard>
              <SectionEyebrow>Application</SectionEyebrow>

              <div className="mt-4 space-y-4">
                <InfoRow
                  icon={<CalendarDays size={15} />}
                  label="Applied"
                  value={formatDate(candidate.applied_at)}
                />

                <InfoRow
                  icon={<RefreshCw size={15} />}
                  label="Last updated"
                  value={formatDate(candidate.updated_at)}
                />

                <InfoRow
                  icon={<FileText size={15} />}
                  label="Resume"
                  value={candidate.original_filename || "Unavailable"}
                />
              </div>
            </GradientCard>

            {/* Contact */}

            <div className="relative overflow-hidden rounded-2xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)] p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--primary)]/10 blur-2xl" />

              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[var(--primary)] shadow-sm">
                  <Mail size={18} />
                </div>

                <h2 className="mt-4 text-base font-bold text-[var(--text-primary)]">
                  Contact candidate
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">
                  Reach out directly using the candidate&apos;s contact
                  information.
                </p>

                <a
                  href={`mailto:${candidate.candidate_email}?subject=${encodeURIComponent(
                    `Regarding your application for ${data.job.title}`,
                  )}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-4 py-3 text-xs font-bold text-white shadow-md shadow-[var(--primary)]/15 transition hover:brightness-105"
                >
                  <Mail size={15} />
                  Email candidate
                </a>

                {candidate.phone && (
                  <a
                    href={`tel:${candidate.phone}`}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/70 px-4 py-3 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
                  >
                    <Phone size={14} />
                    Call candidate
                  </a>
                )}
              </div>
            </div>

            {/* Professional links */}

            {(candidate.linkedin_url || candidate.github_url) && (
              <GradientCard>
                <SectionEyebrow>Online presence</SectionEyebrow>

                <div className="mt-4 space-y-2">
                  {candidate.linkedin_url && (
                    <a
                      href={candidate.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
                    >
                      <span className="flex items-center gap-2.5">
                        <Linkedin size={15} />
                        LinkedIn
                      </span>

                      <ExternalLink
                        size={13}
                        className="text-[var(--text-muted)]"
                      />
                    </a>
                  )}

                  {candidate.github_url && (
                    <a
                      href={candidate.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
                    >
                      <span className="flex items-center gap-2.5">
                        <Github size={15} />
                        GitHub
                      </span>

                      <ExternalLink
                        size={13}
                        className="text-[var(--text-muted)]"
                      />
                    </a>
                  )}
                </div>
              </GradientCard>
            )}

            {/* Job context */}

            <GradientCard>
              <SectionEyebrow>Position</SectionEyebrow>

              <div className="mt-3">
                <h2 className="font-bold text-[var(--text-primary)]">
                  {data.job.title}
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {data.job.company}
                </p>

                <Link
                  href={`/employer/jobs/${jobId}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
                >
                  View job details
                  <ArrowRight size={13} />
                </Link>
              </div>
            </GradientCard>
          </aside>
        </div>
      </main>

      {/* ======================================================
          RESUME PREVIEW MODAL
      ====================================================== */}

      {resumePreviewUrl && (
        <ResumePreviewModal
          url={resumePreviewUrl}
          filename={resumeFilename}
          isPdf={candidate.mime_type === "application/pdf"}
          onClose={closeResumePreview}
          onDownload={handleDownloadResume}
        />
      )}
    </div>
  );
}

/* ============================================================
   AMBIENT BACKGROUND
============================================================ */

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-[var(--primary)]/8 blur-3xl" />

      <div className="absolute right-[-180px] top-[15%] h-[520px] w-[520px] rounded-full bg-[var(--accent)]/8 blur-3xl" />

      <div className="absolute left-[35%] top-[42%] h-[380px] w-[380px] rounded-full bg-[var(--primary)]/4 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

/* ============================================================
   GRADIENT CARD
============================================================ */

function GradientCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] transition duration-300 hover:border-[var(--primary)]/15 hover:shadow-[var(--shadow-md)] sm:p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent opacity-0 transition group-hover:opacity-100" />

      {children}
    </section>
  );
}

/* ============================================================
   SECTION EYEBROW
============================================================ */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
      {children}
    </p>
  );
}

/* ============================================================
   MATCH SCORE
============================================================ */

function MatchScore({ score, label }: { score: number; label: string }) {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[var(--primary)]/10 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] px-4 py-3.5 sm:px-5">
      <div className="relative h-[76px] w-[76px] shrink-0">
        <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-[var(--border)]"
          />

          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke="url(#matchGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />

          <defs>
            <linearGradient
              id="matchGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--primary)" />

              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-[var(--text-primary)]">
            {score}%
          </span>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          SkillMatch
        </p>

        <p className="mt-1 text-sm font-bold text-[var(--text-primary)]">
          {label}
        </p>

        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
          Candidate compatibility
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }: { status: EmployerApplicationStatus }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />

      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--text-muted)]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-[var(--text-secondary)]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   RESUME PREVIEW MODAL
============================================================ */

function ResumePreviewModal({
  url,
  filename,
  isPdf,
  onClose,
  onDownload,
}: {
  url: string;
  filename: string;
  isPdf: boolean;
  onClose: () => void;
  onDownload: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 lg:p-8">
      {/* Backdrop */}

      <button
        type="button"
        aria-label="Close resume preview"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/55 backdrop-blur-md"
      />

      {/* Modal */}

      <div className="relative flex h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] shadow-2xl sm:h-[calc(100vh-2.5rem)] lg:h-[calc(100vh-4rem)]">
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
              <FileText size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--text-muted)]">
                Resume preview
              </p>

              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                {filename || "Candidate resume"}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
            >
              <Download size={14} />

              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Preview body */}

        <div className="min-h-0 flex-1 bg-slate-100">
          {isPdf ? (
            <iframe
              src={url}
              title={filename || "Candidate resume"}
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6">
              <div className="max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-md)]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
                  <FileText size={25} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[var(--text-primary)]">
                  Preview unavailable
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  This resume format cannot be displayed directly in the
                  browser. Download it to view the document.
                </p>

                <button
                  type="button"
                  onClick={onDownload}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:brightness-105"
                >
                  <Download size={15} />
                  Download resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
