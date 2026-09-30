"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
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

  return (
    <div className="mx-auto max-w-6xl pb-12">
      {/* BACK */}
      <Link
        href={`/employer/jobs/${job.id}`}
        className="group mb-7 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-all duration-200 hover:-translate-x-0.5 hover:text-[var(--brand)]"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        Back to job details
      </Link>

      {/* HEADER */}
      <section className="relative mb-7 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
        {/* subtle brand gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,185,66,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,186,224,0.06),transparent_30%)]" />

        <div className="relative flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/10 shadow-[0_0_30px_rgba(245,185,66,0.08)]">
              <Briefcase size={22} className="text-[var(--brand)]" />
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--brand)]">
                  <Sparkles size={12} />
                  Job management
                </span>

                <span className="text-[var(--muted-foreground)]">/</span>

                <span className="text-xs text-[var(--muted-foreground)]">
                  Job #{job.id}
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Edit job
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Update the details of this opportunity and keep your posting
                accurate for candidates.
              </p>
            </div>
          </div>

          <JobStatus status={job.status} />
        </div>
      </section>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* MAIN FORM */}
          <main className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="mb-8">
              <SectionHeading
                icon={<FileText size={17} />}
                title="Job information"
                description="Update the information candidates will see."
              />
            </div>

            <div className="space-y-6">
              {/* TITLE + COMPANY */}
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
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
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

              {/* DESCRIPTION */}
              <FormField
                label="Job description"
                required
                hint="Describe the role, responsibilities, requirements, and expectations."
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="job-description"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Job description
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {form.description?.length || 0} characters
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
                    rows={8}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-base sm:text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 shadow-sm transition duration-150 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-75 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 min-h-[180px] sm:min-h-[260px] resize-y"
                  />

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Describe the role, responsibilities, requirements, and
                    expectations. Keep it clear and easy to scan.
                  </p>
                </div>

                <div className="mt-2 flex justify-between text-[11px] text-[var(--muted-foreground)]">
                  <span>Keep the description clear and easy to scan.</span>

                  <span>{form.description.length} characters</span>
                </div>
              </FormField>

              {/* APPLICATION LINK */}
              <FormField
                label="Application link"
                required
                hint="Candidates will use this link to apply for the position."
              >
                <div className="relative">
                  <Globe
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] transition-colors duration-200 hover:text-[var(--brand)]"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </FormField>
            </div>
          </main>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* STATUS CARD */}
            <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--brand)]/5 blur-2xl" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                  Publishing status
                </p>

                <div className="mt-5 flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      job.status === "active"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-[var(--surface-soft)] text-[var(--muted-foreground)]"
                    }`}
                  >
                    <CheckCircle2 size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {job.status === "active"
                        ? "Currently active"
                        : "Currently closed"}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      {job.status === "active"
                        ? "This posting is currently visible to candidates."
                        : "This posting is currently closed to candidates."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* GUIDANCE */}
            <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,185,66,0.08),transparent_45%)]" />

              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                  <Sparkles size={17} />
                </div>

                <h2 className="mt-4 text-sm font-semibold">
                  Keep it candidate-ready
                </h2>

                <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                  Clear titles, detailed descriptions, and a working application
                  link help candidates understand and apply for your
                  opportunity.
                </p>

                <div className="mt-5 space-y-3">
                  <GuidanceItem>Use a specific job title</GuidanceItem>

                  <GuidanceItem>
                    Include responsibilities and requirements
                  </GuidanceItem>

                  <GuidanceItem>
                    Check that the application link works
                  </GuidanceItem>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* ACTION BAR */}
        <div className="sticky bottom-4 z-20 mt-6">
          <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 p-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="hidden pl-3 sm:block">
              <p className="text-xs font-medium text-[var(--muted)]">
                Changes are saved when you click Save changes.
              </p>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <Link
                href={`/employer/jobs/${job.id}`}
                className="flex flex-1 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-semibold transition-all duration-200 hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)] hover:text-[var(--brand)] sm:flex-none"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--brand)] to-[#ffd36a] px-6 py-3 text-sm font-bold text-[#080A0D] shadow-[0_8px_30px_rgba(245,185,66,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(245,185,66,0.24)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:flex-none"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />

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
                  </>
                )}
              </button>
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
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-semibold">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
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
        <span className="text-sm font-semibold">
          {label}

          {required && <span className="ml-1 text-[var(--brand)]">*</span>}
        </span>

        {hint && (
          <span className="mt-1 block text-[11px] leading-5 text-[var(--muted-foreground)]">
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
      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--brand)]" />

      <span className="text-xs leading-5 text-[var(--muted)]">{children}</span>
    </div>
  );
}

function JobStatus({ status }: { status: EmployerJob["status"] }) {
  const active = status === "active";

  return (
    <div
      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        active
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
          : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--muted-foreground)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-400" : "bg-[var(--muted-foreground)]"
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
    <div className="mx-auto max-w-6xl animate-pulse pb-12">
      <div className="mb-7 h-5 w-40 rounded-lg bg-[var(--surface-elevated)]" />

      <div className="mb-7 h-36 rounded-3xl border border-[var(--border)] bg-[var(--surface)]" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="h-[680px] rounded-3xl border border-[var(--border)] bg-[var(--surface)]" />

        <div className="space-y-6">
          <div className="h-40 rounded-3xl border border-[var(--border)] bg-[var(--surface)]" />
          <div className="h-72 rounded-3xl border border-[var(--border)] bg-[var(--surface)]" />
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
    <div className="mx-auto max-w-xl py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)]/10">
        <Briefcase size={24} className="text-[var(--brand)]" />
      </div>

      <h1 className="mt-5 text-xl font-semibold">Job not found</h1>

      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        The job may have been deleted, or you may not have permission to edit
        it.
      </p>

      <Link
        href="/employer/jobs-posted"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand)] to-[#ffd36a] px-5 py-2.5 text-sm font-bold text-[#080A0D] transition-all duration-200 hover:-translate-y-0.5"
      >
        <ArrowLeft size={15} />
        Back to jobs
      </Link>
    </div>
  );
}
