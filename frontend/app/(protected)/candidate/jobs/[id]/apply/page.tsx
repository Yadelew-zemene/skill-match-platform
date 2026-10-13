"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  FileText,
  Info,
  Loader2,
  Sparkles,
  UserRound,
} from "lucide-react";

import { fetchCandidateJob } from "@/services/job.service";
import { submitApplication } from "@/services/application.service";
import { getMyResumes } from "@/services/resume.service";

import { CandidateJob } from "@/types/jobs";
import { Resume } from "@/types/resume";

const ApplyPage = () => {
  const params = useParams();

  const jobId = Number(params.id);

  const [job, setJob] = useState<CandidateJob | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadApplicationData = async () => {
      if (!Number.isInteger(jobId) || jobId <= 0) {
        setError("Invalid job.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [jobData, resumeData] = await Promise.all([
          fetchCandidateJob(jobId),
          getMyResumes(),
        ]);

        setJob(jobData);
        setResumes(resumeData);

        const activeResume = resumeData.find(
          (resume) => resume.is_active && resume.status === "completed",
        );

        if (activeResume) {
          setSelectedResumeId(activeResume.id);
        }
      } catch (error) {
        console.error("Failed to load application data:", error);
        setError("Unable to load the application page.");
      } finally {
        setLoading(false);
      }
    };

    loadApplicationData();
  }, [jobId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedResumeId) {
      setSubmitError("Please select a completed resume.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      await submitApplication({
        jobId,
        resumeId: selectedResumeId,
        coverLetter: coverLetter.trim() || undefined,
      });

      setSuccess(true);
    } catch (error: any) {
      console.error("Application submission failed:", error);

      const message =
        error?.response?.data?.message || "Failed to submit your application.";

      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* LOADING                                                                    */
  /* -------------------------------------------------------------------------- */

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="absolute right-[-12rem] top-32 h-[30rem] w-[30rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="h-5 w-32 animate-pulse rounded bg-[var(--surface)]" />

          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
            <div className="h-5 w-32 animate-pulse rounded bg-[var(--surface-soft)]" />
            <div className="mt-4 h-9 w-2/3 animate-pulse rounded-lg bg-[var(--surface-soft)]" />
            <div className="mt-3 h-4 w-40 animate-pulse rounded bg-[var(--surface-soft)]" />
          </div>

          <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
            <div className="h-6 w-48 animate-pulse rounded bg-[var(--surface-soft)]" />

            <div className="mt-6 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-2xl bg-[var(--surface-soft)]"
                />
              ))}
            </div>

            <div className="mt-8 h-6 w-40 animate-pulse rounded bg-[var(--surface-soft)]" />

            <div className="mt-4 h-44 animate-pulse rounded-2xl bg-[var(--surface-soft)]" />
          </div>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* ERROR                                                                      */
  /* -------------------------------------------------------------------------- */

  if (error || !job) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="absolute right-[-12rem] top-32 h-[30rem] w-[30rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Link
            href="/candidate/jobs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to jobs
          </Link>

          <section className="relative mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center shadow-sm">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 text-[var(--primary)]">
                <BriefcaseBusiness size={27} />
              </div>

              <h1 className="mt-6 text-xl font-bold">
                Application unavailable
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                {error || "This job is no longer available."}
              </p>

              <Link
                href="/candidate/jobs"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Browse jobs
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* SUCCESS                                                                    */
  /* -------------------------------------------------------------------------- */

  if (success) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-10rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[var(--success)]/10 blur-3xl" />
          <div className="absolute -right-40 bottom-[-10rem] h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
          <section className="relative w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-14 text-center shadow-xl shadow-slate-900/5 sm:px-10 sm:py-16">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--success)] via-emerald-400 to-[var(--accent)]" />

            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[var(--success)]/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--success-light)] text-[var(--success)] shadow-sm">
                <CheckCircle2 size={42} strokeWidth={1.8} />
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--success)]/20 bg-[var(--success-light)] px-3 py-1.5 text-xs font-semibold text-[var(--success)]">
                <Sparkles size={13} />
                Application submitted
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Your application is on its way
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[var(--text-secondary)]">
                Your application for{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  {job.title}
                </span>{" "}
                has been submitted successfully.
              </p>

              <div className="mx-auto mt-7 max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/60 p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--primary)] shadow-sm">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {job.title}
                    </p>

                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                      {job.company || "Company not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/candidate/jobs"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Browse more jobs
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/candidate/dashboard"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:text-[var(--primary)] hover:shadow-sm"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const completedResumes = resumes.filter(
    (resume) => resume.status === "completed",
  );

  const matchScore = Math.round(Number(job.match_score));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* -------------------------------------------------------------------- */}
      {/* AMBIENT BACKGROUND                                                   */}
      {/* -------------------------------------------------------------------- */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="absolute right-[-12rem] top-32 h-[30rem] w-[30rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />

        <div className="absolute bottom-[-15rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-[var(--primary)]/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ------------------------------------------------------------------ */}
        {/* BACK                                                               */}
        {/* ------------------------------------------------------------------ */}

        <Link
          href={`/candidate/jobs/${job.id}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to job
        </Link>

        {/* ------------------------------------------------------------------ */}
        {/* APPLICATION HEADER                                                 */}
        {/* ------------------------------------------------------------------ */}

        <section className="relative mt-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-[var(--accent)]" />

          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)]">
                  <Sparkles size={13} />
                  Apply for this role
                </div>

                <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  {job.title}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Building2 size={16} />
                  {job.company || "Company not specified"}
                </div>
              </div>

              {/* Match */}
              <div className="shrink-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 p-[1px]">
                <div className="rounded-[15px] bg-[var(--surface)] px-5 py-4 text-center">
                  <p className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-2xl font-bold text-transparent">
                    {matchScore}%
                  </p>

                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Skill match
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* APPLICATION FORM                                                   */}
        {/* ------------------------------------------------------------------ */}

        <form
          onSubmit={handleSubmit}
          className="relative mt-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent" />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* ================================================================ */}
            {/* RESUME SECTION                                                   */}
            {/* ================================================================ */}

            <section>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 text-[var(--primary)]">
                  <FileText size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Choose your resume</h2>

                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                    Select the resume you want the employer to review.
                  </p>
                </div>
              </div>

              {completedResumes.length === 0 ? (
                <div className="mt-7 rounded-2xl border border-[var(--warning)]/20 bg-[var(--warning-light)] p-5">
                  <div className="flex items-start gap-3">
                    <Info
                      size={19}
                      className="mt-0.5 shrink-0 text-[var(--warning)]"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        No completed resume available
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                        Upload and process a resume before applying for this
                        job.
                      </p>

                      <Link
                        href="/candidate/dashboard"
                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:text-[var(--primary)] hover:shadow-sm"
                      >
                        Manage resumes
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-7 grid gap-3">
                  {completedResumes.map((resume) => {
                    const selected = selectedResumeId === resume.id;

                    return (
                      <label
                        key={resume.id}
                        className={`group relative block cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-200 ${
                          selected
                            ? "border-[var(--primary)]/40 bg-[var(--primary-light)]/50 shadow-md shadow-[var(--primary)]/5"
                            : "border-[var(--border)] bg-[var(--surface)] hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:shadow-md"
                        }`}
                      >
                        {/* Selected accent */}
                        {selected && (
                          <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[var(--primary)] to-[var(--accent)]" />
                        )}

                        <div className="flex items-start gap-4">
                          {/* Custom radio */}
                          <div
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                              selected
                                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                                : "border-[var(--border-strong)] bg-[var(--surface)] group-hover:border-[var(--primary)]/50"
                            }`}
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </div>

                          <input
                            type="radio"
                            name="resume"
                            value={resume.id}
                            checked={selected}
                            onChange={() => setSelectedResumeId(resume.id)}
                            className="sr-only"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--primary)]">
                                  <FileText size={17} />
                                </div>

                                <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                                  {resume.original_filename ||
                                    `Resume #${resume.id}`}
                                </p>
                              </div>

                              {resume.is_active && (
                                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--success)]/20 bg-[var(--success-light)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--success)]">
                                  <CheckCircle2 size={12} />
                                  Active
                                </span>
                              )}
                            </div>

                            {resume.skills?.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5 pl-12">
                                {resume.skills.slice(0, 6).map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full bg-[var(--surface-soft)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-secondary)]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ================================================================ */}
            {/* COVER LETTER                                                     */}
            {/* ================================================================ */}

            {completedResumes.length > 0 && (
              <>
                <div className="my-9 h-px bg-[var(--border)]" />

                <section>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 text-[var(--primary)]">
                        <UserRound size={19} />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold">Cover letter</h2>

                        <p className="mt-1 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                          Optional. Introduce yourself and explain why you are
                          interested in this opportunity.
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-medium text-[var(--text-muted)]">
                      {coverLetter.length}/3000
                    </span>
                  </div>

                  <div className="relative mt-6">
                    <textarea
                      value={coverLetter}
                      onChange={(event) =>
                        setCoverLetter(event.target.value.slice(0, 3000))
                      }
                      rows={9}
                      placeholder="Write a short cover letter..."
                      className="w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/40 px-5 py-4 text-sm leading-7 text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/40 focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--primary)]/5"
                    />
                  </div>
                </section>
              </>
            )}

            {/* ================================================================ */}
            {/* SUBMIT ERROR                                                     */}
            {/* ================================================================ */}

            {submitError && (
              <div className="mt-7 rounded-2xl border border-[var(--error)]/20 bg-[var(--error-light)] px-5 py-4">
                <div className="flex items-start gap-3">
                  <Info
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--error)]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Application could not be submitted
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {submitError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================ */}
            {/* SUBMIT                                                            */}
            {/* ================================================================ */}

            {completedResumes.length > 0 && (
              <div className="mt-9 border-t border-[var(--border)] pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--success-light)] text-[var(--success)]">
                      <Check size={15} />
                    </div>

                    <p className="max-w-md text-xs leading-5 text-[var(--text-muted)]">
                      Review your selected resume and optional cover letter
                      before submitting your application.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Link
                      href={`/candidate/jobs/${job.id}`}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-center text-sm font-semibold text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:text-[var(--primary)] hover:shadow-sm"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                      disabled={submitting || !selectedResumeId}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit application
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default ApplyPage;
