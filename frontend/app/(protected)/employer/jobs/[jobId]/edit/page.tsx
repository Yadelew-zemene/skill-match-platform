"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  fetchEmployerJob,
  updateEmployerJob,
  type EmployerJob,
  type JobPayload,
} from "@/services/job.service";

export default function EditEmployerJobPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = Number(params.jobId);

  const [job, setJob] = useState<EmployerJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState<JobPayload>({
    title: "",
    company: "",
    description: "",
    application_link: "",
  });

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

        setForm({
          title: data.title ?? "",
          company: data.company ?? "",
          description: data.description ?? "",
          application_link: data.application_link ?? "",
        });
      } catch (error) {
        console.error("Failed to load job:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const updateField = (field: keyof JobPayload, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();
    const company = form.company.trim();
    const description = form.description.trim();
    const applicationLink = form.application_link.trim();

    if (!title) {
      toast.error("Please enter a job title");
      return;
    }

    if (!company) {
      toast.error("Please enter a company name");
      return;
    }

    if (!description) {
      toast.error("Please enter a job description");
      return;
    }

    if (!applicationLink) {
      toast.error("Please enter an application link");
      return;
    }

    try {
      setSaving(true);

      const updatedJob = await updateEmployerJob(jobId, {
        title,
        company,
        description,
        application_link: applicationLink,
      });

      setJob(updatedJob);

      setForm({
        title: updatedJob.title ?? "",
        company: updatedJob.company ?? "",
        description: updatedJob.description ?? "",
        application_link: updatedJob.application_link ?? "",
      });

      toast.success("Job updated successfully");

      router.push(`/employer/jobs/${jobId}`);
    } catch (error) {
      console.error("Failed to update job:", error);
      toast.error("Failed to update job. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <EditJobSkeleton />;
  }

  if (notFound || !job) {
    return <JobNotFound />;
  }

  const descriptionLength = form.description.length;
  const isActive = job.status === "active";

  return (
    <div className="relative mx-auto max-w-7xl pb-12">
      {/* Ambient page atmosphere */}
      <div className="pointer-events-none absolute -inset-x-20 -top-24 -z-10 h-[32rem] overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[var(--primary)]/7 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[var(--accent)]/7 blur-3xl" />

        <div className="absolute left-1/2 top-24 h-56 w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--primary)]/[0.035] via-transparent to-[var(--accent)]/[0.035] blur-3xl" />

        <div
          className="absolute inset-x-0 top-0 h-[24rem] opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* Back navigation */}
      <div className="mb-6">
        <Link
          href={`/employer/jobs/${job.id}`}
          className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--text-muted)] transition-all duration-300 hover:bg-[var(--surface)] hover:text-[var(--primary)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to job details
        </Link>
      </div>

      {/* Page header */}
      <section className="group relative mb-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-[var(--accent)] opacity-80" />

        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--primary)]/8 blur-3xl transition-opacity duration-500 group-hover:bg-[var(--primary)]/12" />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)] ring-1 ring-[var(--primary)]/10">
                <Briefcase size={23} strokeWidth={1.9} />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
              </div>

              <div className="min-w-0">
                <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                    <Sparkles size={12} />
                    Job management
                  </span>

                  <span className="text-[var(--text-disabled)]">/</span>

                  <span className="text-xs text-[var(--text-muted)]">
                    Job #{job.id}
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Edit job
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                  Update the information candidates see for this opportunity.
                  Your changes will be applied when you save.
                </p>
              </div>
            </div>

            <JobStatus status={job.status} />
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main form */}
          <main className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent" />

            <div className="border-b border-[var(--border)] px-6 py-5 sm:px-8">
              <SectionHeading
                icon={<FileText size={17} />}
                title="Job information"
                description="Keep the opportunity clear, accurate, and easy to understand."
              />
            </div>

            <div className="space-y-7 p-6 sm:p-8">
              {/* Title + company */}
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  label="Job title"
                  required
                  hint="Use a clear and specific position title."
                >
                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    placeholder="e.g. Senior Frontend Engineer"
                    disabled={saving}
                    className="form-input"
                  />
                </FormField>

                <FormField
                  label="Company"
                  required
                  hint="The organization offering this position."
                >
                  <div className="relative">
                    <Briefcase
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />

                    <input
                      type="text"
                      value={form.company}
                      onChange={(event) =>
                        updateField("company", event.target.value)
                      }
                      placeholder="e.g. SkillMatch"
                      disabled={saving}
                      className="form-input pl-10"
                    />
                  </div>
                </FormField>
              </div>

              {/* Description */}
              <FormField
                label="Job description"
                required
                hint="Describe the role, responsibilities, requirements, and expectations."
              >
                <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 focus-within:border-[var(--primary)]/40 focus-within:ring-4 focus-within:ring-[var(--primary)]/8">
                  <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5">
                    <span className="text-[11px] font-medium text-[var(--text-muted)]">
                      Role overview
                    </span>

                    <span
                      className={`text-[11px] font-medium ${
                        descriptionLength > 0
                          ? "text-[var(--text-secondary)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {descriptionLength} characters
                    </span>
                  </div>

                  <textarea
                    id="job-description"
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    placeholder="Describe the position, responsibilities, required skills, qualifications, and other important information..."
                    disabled={saving}
                    rows={11}
                    className="min-h-[280px] w-full resize-y border-0 bg-transparent px-4 py-4 text-sm leading-7 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)] disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                  Candidates should be able to understand the role without
                  needing additional context.
                </p>
              </FormField>

              {/* Application link */}
              <FormField
                label="Application link"
                required
                hint="Candidates will use this link to apply for the position."
              >
                <div className="relative">
                  <Globe
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />

                  <input
                    type="url"
                    value={form.application_link}
                    onChange={(event) =>
                      updateField("application_link", event.target.value)
                    }
                    placeholder="https://example.com/apply"
                    disabled={saving}
                    className="form-input pl-10 pr-11"
                  />

                  {form.application_link && (
                    <a
                      href={form.application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open application link"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </FormField>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Publishing status */}
            <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary)]/7 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[var(--primary)]" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Publishing status
                  </p>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-[var(--success-light)] text-[var(--success)]"
                        : "bg-[var(--surface-soft)] text-[var(--text-muted)]"
                    }`}
                  >
                    {isActive ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[var(--text-muted)]" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {isActive ? "Currently active" : "Currently closed"}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                      {isActive
                        ? "Candidates can currently view this opportunity."
                        : "This opportunity is currently closed to candidates."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Editing guidance */}
            <section className="relative overflow-hidden rounded-2xl border border-[var(--primary)]/10 bg-gradient-to-br from-[var(--primary-light)] via-[var(--surface)] to-[var(--accent-light)] p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--primary)]/10 blur-2xl" />

              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--primary)] shadow-sm">
                  <Sparkles size={17} />
                </div>

                <h2 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                  Keep it candidate-ready
                </h2>

                <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">
                  Strong job postings make it easier for relevant candidates to
                  understand the opportunity and decide whether to apply.
                </p>

                <div className="mt-5 space-y-3">
                  <GuidanceItem>
                    Use a specific, recognizable job title
                  </GuidanceItem>

                  <GuidanceItem>
                    Explain responsibilities and required skills
                  </GuidanceItem>

                  <GuidanceItem>
                    Keep the application link current and accessible
                  </GuidanceItem>
                </div>
              </div>
            </section>

            {/* Current values */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Before you save
              </p>

              <div className="mt-4 space-y-3">
                <ReviewRow
                  label="Title"
                  value={form.title.trim() ? "Provided" : "Missing"}
                  complete={Boolean(form.title.trim())}
                />

                <ReviewRow
                  label="Description"
                  value={
                    descriptionLength > 0
                      ? `${descriptionLength} characters`
                      : "Missing"
                  }
                  complete={Boolean(form.description.trim())}
                />

                <ReviewRow
                  label="Application link"
                  value={form.application_link.trim() ? "Provided" : "Missing"}
                  complete={Boolean(form.application_link.trim())}
                />
              </div>
            </section>
          </aside>
        </div>

        {/* Save bar */}
        <div className="sticky bottom-4 z-20 mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 p-3 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-[var(--accent)]/40" />

            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="hidden pl-3 sm:block">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Review your changes before saving.
                </p>

                <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                  You can continue editing this posting at any time.
                </p>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <Link
                  href={`/employer/jobs/${job.id}`}
                  className="flex flex-1 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] sm:flex-none"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving}
                  className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:flex-none"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />

                  {saving ? (
                    <>
                      <Loader2 size={16} className="relative animate-spin" />
                      <span className="relative">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save
                        size={16}
                        className="relative transition-transform duration-200 group-hover:scale-105"
                      />
                      <span className="relative">Save changes</span>
                      <ArrowRight
                        size={15}
                        className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-[var(--primary)]">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-semibold text-[var(--text-primary)]">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block">
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {label}

          {required && <span className="ml-1 text-[var(--primary)]">*</span>}
        </span>

        {hint && (
          <span className="mt-1 block text-[11px] leading-5 text-[var(--text-muted)]">
            {hint}
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function GuidanceItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <CheckCircle2
        size={14}
        className="mt-0.5 shrink-0 text-[var(--primary)]"
      />

      <span className="text-xs leading-5 text-[var(--text-secondary)]">
        {children}
      </span>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  complete,
}: {
  label: string;
  value: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3.5 py-3">
      <span className="text-xs font-medium text-[var(--text-secondary)]">
        {label}
      </span>

      <span
        className={`text-[11px] font-semibold ${
          complete ? "text-[var(--success)]" : "text-[var(--error)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function JobStatus({ status }: { status: EmployerJob["status"] }) {
  const active = status === "active";

  return (
    <div
      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        active
          ? "border-[var(--success)]/20 bg-[var(--success-light)] text-[var(--success)]"
          : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-muted)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-[var(--success)]" : "bg-[var(--text-muted)]"
        }`}
      />

      {active ? "Active" : "Closed"}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LOADING                                                                    */
/* -------------------------------------------------------------------------- */

function EditJobSkeleton() {
  return (
    <div className="relative mx-auto max-w-7xl animate-pulse pb-12">
      <div className="mb-6 h-8 w-40 rounded-lg bg-[var(--surface-soft)]" />

      <div className="mb-6 h-40 rounded-3xl border border-[var(--border)] bg-[var(--surface)]" />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="h-[720px] rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />

        <div className="space-y-6">
          <div className="h-44 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
          <div className="h-72 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
          <div className="h-48 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* NOT FOUND                                                                  */
/* -------------------------------------------------------------------------- */

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
          This job may have been deleted, or you may not have permission to edit
          it.
        </p>

        <Link
          href="/employer/jobs-posted"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20"
        >
          <ArrowLeft size={15} />
          Back to jobs
        </Link>
      </div>
    </div>
  );
}
