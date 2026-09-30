"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { fetchCandidateJob } from "@/services/job.service";
import { submitApplication } from "@/services/application.service";
import { getMyResumes } from "@/services/resume.service";
import { CandidateJob } from "@/types/jobs";
import { Resume } from "@/types/resume";

const ApplyPage = () => {
  const params = useParams();
  const router = useRouter();

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

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          <div className="h-5 w-32 animate-pulse bg-[var(--surface)]" />

          <div className="mt-8 h-10 w-2/3 animate-pulse bg-[var(--surface)]" />

          <div className="mt-3 h-5 w-1/3 animate-pulse bg-[var(--surface)]" />

          <div className="mt-10 h-96 animate-pulse bg-[var(--surface)]" />
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          <Link
            href="/candidate/jobs"
            className="text-sm text-[var(--muted)] hover:text-[var(--brand)]"
          >
            ← Back to jobs
          </Link>

          <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
            <h1 className="text-xl font-semibold">Application unavailable</h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              {error || "This job is no longer available."}
            </p>

            <Link
              href="/candidate/jobs"
              className="mt-6 inline-flex border border-[var(--border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
            >
              Browse jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
          <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[var(--success)]/20 bg-[var(--success)]/10 text-xl text-[var(--success)]">
              ✓
            </div>

            <p className="mt-6 text-sm font-medium text-[var(--brand)]">
              Application submitted
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Your application is on its way
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              Your application for{" "}
              <span className="font-medium text-[var(--foreground)]">
                {job.title}
              </span>{" "}
              has been submitted successfully.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/candidate/jobs"
                className="bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[#12141e] hover:bg-[var(--brand-hover)]"
              >
                Browse more jobs
              </Link>

              <Link
                href="/candidate/dashboard"
                className="border border-[var(--border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const completedResumes = resumes.filter(
    (resume) => resume.status === "completed",
  );

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8 lg:py-10">
        <Link
          href={`/candidate/jobs/${job.id}`}
          className="text-sm text-[var(--muted)] transition hover:text-[var(--brand)]"
        >
          ← Back to job
        </Link>

        {/* JOB SUMMARY */}
        <section className="mt-8 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="text-sm font-medium text-[var(--brand)]">
            Apply for this role
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {job.title}
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            {job.company || "Company not specified"}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="border border-[var(--brand)]/20 bg-[var(--brand)]/10 px-3 py-1.5 text-sm font-semibold text-[var(--brand)]">
              {Math.round(Number(job.match_score))}% match
            </span>

            <span className="text-xs text-[var(--muted-foreground)]">
              Your current skill match
            </span>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
        >
          <div>
            <h2 className="text-lg font-semibold">Choose your resume</h2>

            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
              Select the resume you want the employer to review.
            </p>
          </div>

          {completedResumes.length === 0 ? (
            <div className="mt-6 border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <p className="text-sm font-medium">
                No completed resume available
              </p>

              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Upload and process a resume before applying for this job.
              </p>

              <Link
                href="/candidate/dashboard"
                className="mt-4 inline-flex border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
              >
                Manage resumes
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {completedResumes.map((resume) => {
                const selected = selectedResumeId === resume.id;

                return (
                  <label
                    key={resume.id}
                    className={`block cursor-pointer border p-4 transition ${
                      selected
                        ? "border-[var(--brand)] bg-[var(--brand)]/5"
                        : "border-[var(--border)] hover:border-[var(--brand)]/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="resume"
                        value={resume.id}
                        checked={selected}
                        onChange={() => setSelectedResumeId(resume.id)}
                        className="mt-1 accent-[var(--brand)]"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="truncate text-sm font-semibold">
                            {resume.original_filename || `Resume #${resume.id}`}
                          </p>

                          {resume.is_active && (
                            <span className="w-fit border border-[var(--success)]/20 bg-[var(--success)]/10 px-2 py-1 text-[11px] font-medium text-[var(--success)]">
                              Active
                            </span>
                          )}
                        </div>

                        {resume.skills?.length > 0 && (
                          <p className="mt-2 line-clamp-1 text-xs text-[var(--muted)]">
                            {resume.skills.slice(0, 6).join(" · ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {/* COVER LETTER */}
          {completedResumes.length > 0 && (
            <div className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Cover letter</h2>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Optional. Introduce yourself and explain why you're a strong
                    candidate.
                  </p>
                </div>

                <span className="text-xs text-[var(--muted-foreground)]">
                  {coverLetter.length}/3000
                </span>
              </div>

              <textarea
                value={coverLetter}
                onChange={(event) =>
                  setCoverLetter(event.target.value.slice(0, 3000))
                }
                rows={8}
                placeholder="Write a short cover letter..."
                className="mt-4 w-full resize-y border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)]/50"
              />
            </div>
          )}

          {/* ERROR */}
          {submitError && (
            <div className="mt-6 border border-red-500/20 bg-red-500/5 px-4 py-3">
              <p className="text-sm text-red-400">{submitError}</p>
            </div>
          )}

          {/* SUBMIT */}
          {completedResumes.length > 0 && (
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:justify-end">
              <Link
                href={`/candidate/jobs/${job.id}`}
                className="border border-[var(--border)] px-5 py-2.5 text-center text-sm font-semibold transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting || !selectedResumeId}
                className="bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[#12141e] transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit application"}
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default ApplyPage;
