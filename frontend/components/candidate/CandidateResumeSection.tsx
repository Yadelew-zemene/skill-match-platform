"use client";

import { ChangeEvent, useRef } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  MoreHorizontal,
  Plus,
  Trash2,
  Upload,
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

const StatusBadge = ({ status }: { status: Resume["status"] }) => {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Completed
      </span>
    );
  }

  if (status === "processing") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Processing
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400">
      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
      Processing failed
    </span>
  );
};

const SkillList = ({ skills }: { skills: string[] }) => {
  if (!skills?.length) {
    return (
      <p className="text-sm text-[#9ca3af]">
        No skills were extracted from this resume.
      </p>
    );
  }

  const visibleSkills = skills.slice(0, 8);
  const remaining = skills.length - visibleSkills.length;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleSkills.map((skill) => (
        <span
          key={skill}
          className="border border-[#252a32] bg-[#161a20] px-2.5 py-1 text-xs font-medium text-[#d8d9d4]"
        >
          {skill}
        </span>
      ))}

      {remaining > 0 && (
        <span className="px-2.5 py-1 text-xs font-medium text-[#9ca3af]">
          +{remaining} more
        </span>
      )}
    </div>
  );
};

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
    <div className="relative overflow-hidden border border-[#3b3421] bg-[#1b1d22]">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#f5b942]" />

      <div className="p-6 pl-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#3b3421] bg-[#24221b] text-[#f5b942]">
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5b942]">
                  Active resume
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-[#34d399]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Used for matching
                </span>
              </div>

              <h3 className="truncate text-lg font-semibold tracking-[-0.01em] text-[#f5f5f0]">
                {name}
              </h3>

              <p className="mt-1 text-sm text-[#9ca3af]">
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
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#252a32] text-[#9ca3af] transition hover:border-red-400/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
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

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9ca3af]">
              Extracted skills
            </span>

            <StatusBadge status={resume.status} />
          </div>

          <SkillList skills={resume.skills ?? []} />
        </div>
      </div>
    </div>
  );
};

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
    <div className="border-b border-[#252a32] py-5 last:border-b-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#252a32] bg-[#161a20] text-[#9ca3af]">
            <FileText className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="truncate font-medium text-[#f5f5f0]">{name}</h4>

              <StatusBadge status={resume.status} />
            </div>

            <p className="mt-1 text-xs text-[#6f7680]">
              Added {formatDate(resume.created_at)}
              {resume.file_size ? ` · ${formatFileSize(resume.file_size)}` : ""}
            </p>

            <div className="mt-3">
              <SkillList skills={resume.skills ?? []} />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {resume.status === "completed" && (
            <button
              type="button"
              onClick={() => onActivate(resume.id)}
              disabled={isLoading}
              className="inline-flex h-9 items-center gap-2 border border-[#252a32] px-3 text-sm font-medium text-[#d8d9d4] transition hover:border-[#f5b942]/50 hover:text-[#f5b942] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Activate
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(resume.id)}
            disabled={isLoading}
            className="inline-flex h-9 w-9 items-center justify-center text-[#6f7680] transition hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
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
    </div>
  );
};

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
    <section className="border-t border-[#252a32] pt-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5b942]">
            Resume profile
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#f5f5f0]">
            Your resumes
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#9ca3af]">
            Manage the resumes SkillMatch uses to understand your experience and
            match you with opportunities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 bg-[#f5b942] px-4 text-sm font-semibold text-[#12141e] transition hover:bg-[#d99b27] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
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

      {loading ? (
        <div className="mt-7 border border-[#252a32] bg-[#161a20] p-8">
          <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading your resumes...
          </div>
        </div>
      ) : resumes.length === 0 ? (
        <div className="mt-7 border border-dashed border-[#343a43] bg-[#161a20] px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#252a32] bg-[#1d2128] text-[#f5b942]">
            <FileText className="h-5 w-5" />
          </div>

          <h3 className="mt-5 text-base font-semibold text-[#f5f5f0]">
            No resume uploaded
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#9ca3af]">
            Upload your resume to extract your skills and start receiving
            personalized job matches.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 inline-flex items-center gap-2 border border-[#3a3f47] px-4 py-2.5 text-sm font-medium text-[#f5f5f0] transition hover:border-[#f5b942]/60 hover:text-[#f5b942]"
          >
            <Plus className="h-4 w-4" />
            Add your first resume
          </button>
        </div>
      ) : (
        <div className="mt-7 space-y-8">
          {activeResume && (
            <ActiveResumeCard
              resume={activeResume}
              onDelete={handleDelete}
              deleting={actionLoading === activeResume.id}
            />
          )}

          {otherResumes.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6f7680]">
                    Resume history
                  </p>

                  <p className="mt-1 text-sm text-[#9ca3af]">
                    Previous resumes you can activate when needed.
                  </p>
                </div>

                <span className="text-xs text-[#6f7680]">
                  {otherResumes.length}{" "}
                  {otherResumes.length === 1 ? "resume" : "resumes"}
                </span>
              </div>

              <div className="border-t border-[#252a32]">
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

          <div className="flex items-center gap-2 text-xs text-[#6f7680]">
            <MoreHorizontal className="h-4 w-4" />
            Uploading a new resume automatically makes it your active resume.
          </div>
        </div>
      )}
    </section>
  );
}
