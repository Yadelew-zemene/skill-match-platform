"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AlignLeft,
  ArrowLeft,
  Building2,
  Check,
  ChevronRight,
  Globe,
  Link as LinkIcon,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Eye,
  Info,
} from "lucide-react";
import { postJobs } from "@/services/job.service";

const MAX_DESCRIPTION_LENGTH = 10000;

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [application_link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checklist = useMemo(
    () => [
      { id: "title", label: "Job Title", complete: title.trim().length > 0 },
      {
        id: "company",
        label: "Company Name",
        complete: company.trim().length > 0,
      },
      {
        id: "link",
        label: "Application Link",
        complete: application_link.trim().length > 0,
      },
      {
        id: "desc",
        label: "Job Description",
        complete: description.trim().length > 0,
      },
    ],
    [title, company, application_link, description],
  );

  const completedCount = checklist.filter((item) => item.complete).length;
  const progressPercentage = Math.round(
    (completedCount / checklist.length) * 100,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !company.trim() ||
      !application_link.trim() ||
      !description.trim()
    ) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await postJobs({
        title: title.trim(),
        company: company.trim(),
        application_link: application_link.trim(),
        description: description.trim(),
      });

      toast.success("Job posted successfully");
      setTitle("");
      setCompany("");
      setLink("");
      setDescription("");
    } catch {
      toast.error("Unable to post the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] px-4 py-8 sm:px-6 lg:px-8">
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link
              href="/employer/dashboard"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] transition group-hover:border-[var(--primary)]/40">
                <ArrowLeft size={14} />
              </span>
              Employer Portal
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Create Job Posting
            </h1>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--text-muted)]">
                Completion Status
              </p>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {completedCount} of {checklist.length} Fields Complete (
                {progressPercentage}%)
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-12">
          {/* Form Controls Column */}
          <div className="space-y-6 lg:col-span-7 xl:col-span-8">
            {/* Section 1: Core Details */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-[var(--border)] pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[var(--text-primary)]">
                    Role Identification
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Basic information candidates will see in job listings
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
                  >
                    Job Title <span className="text-[var(--error)]">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      size={16}
                    />
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Lead Frontend Engineer"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] transition focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>
                </div>

                {/* Company & Link Grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
                    >
                      Company <span className="text-[var(--error)]">*</span>
                    </label>
                    <div className="relative">
                      <Building2
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                        size={16}
                      />
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company Name"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] transition focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="application_link"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
                    >
                      Application URL{" "}
                      <span className="text-[var(--error)]">*</span>
                    </label>
                    <div className="relative">
                      <LinkIcon
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                        size={16}
                      />
                      <input
                        id="application_link"
                        type="url"
                        value={application_link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] transition focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Requirements & Description */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-light)] text-[var(--accent)]">
                    <AlignLeft size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[var(--text-primary)]">
                      Detailed Specification
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Responsibilities, skills, and candidate expectations
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  {description.length} / {MAX_DESCRIPTION_LENGTH}
                </span>
              </div>

              <div>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value.slice(0, MAX_DESCRIPTION_LENGTH),
                    )
                  }
                  rows={12}
                  placeholder="Outline core responsibilities, key technologies, and qualifications required for this position..."
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm leading-relaxed text-[var(--text-primary)] transition focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                />

                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary-light)]/40 p-3.5">
                  <Info
                    size={16}
                    className="mt-0.5 shrink-0 text-[var(--primary)]"
                  />
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">
                      Matching Tip:
                    </strong>{" "}
                    Include specific tech stacks, tools, and experience levels.
                    SkillMatch algorithms parse description keywords to suggest
                    candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar & Dynamic Preview Column */}
          <div className="space-y-6 lg:col-span-5 xl:col-span-4">
            {/* Live Preview Card */}
            <div className="sticky top-6 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-md">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    <Eye size={14} /> Live Listing Preview
                  </div>
                  <span className="inline-flex items-center rounded-full bg-[var(--primary-light)] px-2 py-0.5 text-[10px] font-semibold text-[var(--primary)]">
                    Active
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm">
                      <Building2 size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-[var(--text-primary)]">
                        {title.trim() || "Job Title Preview"}
                      </h3>
                      <p className="truncate text-xs font-medium text-[var(--text-secondary)]">
                        {company.trim() || "Company Name"}
                      </p>
                    </div>
                  </div>

                  <div className="line-clamp-4 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {description.trim() ||
                      "Job description preview will update as you type details into the editor on the left..."}
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Globe size={12} /> External Apply
                    </span>
                    <span className="truncate max-w-[150px] font-mono text-[10px] text-[var(--primary)]">
                      {application_link.trim() || "https://..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Requirement Checklist */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Publishing Requirements
                </h3>
                <div className="space-y-2">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition ${
                        item.complete
                          ? "bg-[var(--success-light)]/60 text-[var(--success)] font-medium"
                          : "bg-[var(--surface-soft)] text-[var(--text-muted)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full ${item.complete ? "bg-[var(--success)] text-white" : "border border-[var(--border)]"}`}
                      >
                        {item.complete && <Check size={10} strokeWidth={3} />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Controls */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || completedCount < checklist.length}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        Publish Role <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
