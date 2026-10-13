"use client";

import { ChangeEvent, useRef } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";

import { useCandidateResumes } from "@/hooks/useCandidateResumes";
import { Resume } from "@/types/resume";

interface CandidateResumeSectionProps {
  onResumeChange?: () => void;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const formatFileSize = (size: number | null) => {
  if (!size) return "";

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getResumeName = (resume: Resume) => {
  if (resume.original_filename) {
    return resume.original_filename;
  }

  const parts = resume.file_path.split(/[\\/]/);
  return parts[parts.length - 1] || "Untitled resume";
};

/* ================================================================
   STATUS
================================================================ */

const StatusBadge = ({ status }: { status: Resume["status"] }) => {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--success)]/15 bg-[var(--success-light)] px-2.5 py-1 text-[11px] font-semibold text-[var(--success)]">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Ready
      </span>
    );
  }

  if (status === "processing") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--warning)]/15 bg-[var(--warning-light)] px-2.5 py-1 text-[11px] font-semibold text-[var(--warning)]">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Processing
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--error)]/15 bg-[var(--error-light)] px-2.5 py-1 text-[11px] font-semibold text-[var(--error)]">
      <XCircle className="h-3.5 w-3.5" />
      Processing failed
    </span>
  );
};

/* ================================================================
   SKILLS
================================================================ */

const SkillList = ({ skills }: { skills: string[] }) => {
  if (!skills?.length) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3">
        <p className="text-xs leading-5 text-[var(--text-muted)]">
          No skills were extracted from this resume yet.
        </p>
      </div>
    );
  }

  const visibleSkills = skills.slice(0, 8);
  const remaining = skills.length - visibleSkills.length;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleSkills.map((skill) => (
        <span
          key={skill}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm transition-colors hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
        >
          {skill}
        </span>
      ))}

      {remaining > 0 && (
        <span className="inline-flex items-center rounded-lg border border-dashed border-[var(--border-strong)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-muted)]">
          +{remaining} more
        </span>
      )}
    </div>
  );
};

/* ================================================================
   ACTIVE RESUME
================================================================ */

interface ActiveResumeCardProps {
  resume: Resume;
  onDelete: (resumeId: number) => void;
  deleting: boolean;
}

const ActiveResumeCard = ({
  resume,
  onDelete,
  deleting,
}: ActiveResumeCardProps) => {
  const name = getResumeName(resume);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-md)]">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--primary)]/10 blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-md">
              <FileText className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface)] shadow-sm">
                <Check className="h-3 w-3 text-[var(--success)]" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  Active resume
                </span>

                <StatusBadge status={resume.status} />
              </div>

              <h3 className="mt-2 truncate text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl">
                {name}
              </h3>

              <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                Added {formatDate(resume.created_at)}
                {resume.file_size
                  ? ` · ${formatFileSize(resume.file_size)}`
                  : ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onDelete(resume.id)}
            disabled={deleting}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] shadow-sm transition-all duration-200 hover:border-[var(--error)]/30 hover:bg-[var(--error-light)] hover:text-[var(--error)] disabled:cursor-not-allowed disabled:opacity-50 sm:self-start"
            aria-label="Delete resume"
            title="Delete resume"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Matching indicator */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[var(--success)]/15 bg-[var(--success-light)]/70 p-4">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--success)] shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Used for job matching
            </p>

            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
              SkillMatch uses this resume to understand your skills and
              recommend relevant opportunities.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Extracted skills
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Skills identified from your resume
              </p>
            </div>

            {resume.skills?.length ? (
              <span className="shrink-0 text-xs font-semibold text-[var(--text-secondary)]">
                {resume.skills.length}{" "}
                {resume.skills.length === 1 ? "skill" : "skills"}
              </span>
            ) : null}
          </div>

          <SkillList skills={resume.skills ?? []} />
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   RESUME ROW
================================================================ */

interface ResumeRowProps {
  resume: Resume;
  onActivate: (resumeId: number) => void;
  onDelete: (resumeId: number) => void;
  actionLoading: number | null;
}

const ResumeRow = ({
  resume,
  onActivate,
  onDelete,
  actionLoading,
}: ResumeRowProps) => {
  const name = getResumeName(resume);
  const isLoading = actionLoading === resume.id;

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-muted)] transition-colors group-hover:border-[var(--primary)]/15 group-hover:text-[var(--primary)]">
          <FileText className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {name}
            </h4>

            <StatusBadge status={resume.status} />
          </div>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Added {formatDate(resume.created_at)}
            {resume.file_size ? ` · ${formatFileSize(resume.file_size)}` : ""}
          </p>

          {resume.skills?.length ? (
            <div className="mt-3">
              <SkillList skills={resume.skills} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:pl-4">
        {resume.status === "completed" && (
          <button
            type="button"
            onClick={() => onActivate(resume.id)}
            disabled={isLoading}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 text-xs font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--primary)]/30 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            Activate
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(resume.id)}
          disabled={isLoading}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-muted)] transition-all duration-200 hover:bg-[var(--error-light)] hover:text-[var(--error)] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Delete ${name}`}
          title="Delete resume"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

/* ================================================================
   MAIN SECTION
================================================================ */

export default function CandidateResumeSection({
  onResumeChange,
}: CandidateResumeSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    resumes,
    loading,
    uploading,
    actionLoading,
    upload,
    activate,
    remove,
  } = useCandidateResumes();

  const activeResume = resumes.find((resume) => resume.is_active);
  const otherResumes = resumes.filter((resume) => !resume.is_active);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      await upload(file);
      onResumeChange?.();
    } finally {
      event.target.value = "";
    }
  };

  const handleDelete = async (resumeId: number) => {
    const confirmed = window.confirm(
      "Delete this resume? This action cannot be undone.",
    );

    if (!confirmed) return;

    await remove(resumeId);
    onResumeChange?.();
  };

  const handleActivate = async (resumeId: number) => {
    await activate(resumeId);
    onResumeChange?.();
  };

  return (
    <section>
      {/* =========================================================
          SECTION HEADER
      ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-transparent" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--primary)]">
              <FileText className="h-3.5 w-3.5" />
              Resume & matching
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Your resumes
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              Keep your resume current so SkillMatch can better understand your
              experience and recommend relevant opportunities.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(79,70,229,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,70,229,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            )}

            {uploading ? "Processing..." : "Upload resume"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      {loading ? (
        <div className="mt-5 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
          <div className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--surface-soft)]" />

              <div className="flex-1">
                <div className="h-3 w-24 rounded bg-[var(--surface-soft)]" />
                <div className="mt-3 h-5 w-56 rounded bg-[var(--surface-soft)]" />
                <div className="mt-2 h-3 w-36 rounded bg-[var(--surface-soft)]" />
              </div>
            </div>

            <div className="mt-7 h-20 rounded-2xl bg-[var(--surface-soft)]" />

            <div className="mt-6 flex gap-2">
              <div className="h-7 w-20 rounded-lg bg-[var(--surface-soft)]" />
              <div className="h-7 w-24 rounded-lg bg-[var(--surface-soft)]" />
              <div className="h-7 w-16 rounded-lg bg-[var(--surface-soft)]" />
            </div>
          </div>
        </div>
      ) : resumes.length === 0 ? (
        /* =======================================================
           EMPTY STATE
        ======================================================= */
        <div className="relative mt-5 overflow-hidden rounded-3xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-14 text-center shadow-[var(--shadow-sm)]">
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--primary)]/15 bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
              <FileText className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
              Add your resume
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              Upload a recent resume and SkillMatch will extract your skills and
              use them to find relevant job opportunities.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5">
                PDF
              </span>

              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5">
                DOC
              </span>

              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5">
                DOCX
              </span>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(79,70,229,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,70,229,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              )}

              {uploading ? "Processing..." : "Upload your first resume"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-7">
          {/* =====================================================
              ACTIVE RESUME
          ===================================================== */}
          {activeResume && (
            <ActiveResumeCard
              resume={activeResume}
              onDelete={handleDelete}
              deleting={actionLoading === activeResume.id}
            />
          )}

          {/* =====================================================
              OTHER RESUMES
          ===================================================== */}
          {otherResumes.length > 0 && (
            <div>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Other resumes
                  </p>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Previous resumes available for activation.
                  </p>
                </div>

                <span className="text-xs font-medium text-[var(--text-muted)]">
                  {otherResumes.length}{" "}
                  {otherResumes.length === 1 ? "resume" : "resumes"}
                </span>
              </div>

              <div className="space-y-3">
                {otherResumes.map((resume) => (
                  <ResumeRow
                    key={resume.id}
                    resume={resume}
                    onActivate={handleActivate}
                    onDelete={handleDelete}
                    actionLoading={actionLoading}
                  />
                ))}
              </div>
            </div>
          )}

          {/* =====================================================
              UPLOAD ANOTHER
          ===================================================== */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-5 py-4 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--primary)]/35 hover:bg-[var(--primary-light)]/40 hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
            )}
            Upload another resume
          </button>
        </div>
      )}
    </section>
  );
}
