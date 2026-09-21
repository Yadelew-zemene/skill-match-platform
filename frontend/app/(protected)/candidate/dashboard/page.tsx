"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import MatchedJobCard from "@/components/ui/MachedJobCard";
import { uploadResume } from "@/services/resume.service";
import toast from "react-hot-toast";
import { useCandidateJobs } from "@/hooks/usecandidateJobs";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { jobs, loading, refresh } = useCandidateJobs();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const MAX_DASHBOARD_JOBS = 6;

  const topJobs = jobs.slice(0, MAX_DASHBOARD_JOBS);
  const hasMoreJobs = jobs.length > MAX_DASHBOARD_JOBS;

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Select a resume first");
      return;
    }

    try {
      setUploading(true);

      await uploadResume(selectedFile);

      toast.success("Resume uploaded successfully");
      setSelectedFile(null);
      refresh();
    } catch {
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-[var(--brand)]">
                Candidate workspace
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back, {user?.name?.split(" ")[0] || "there"}.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Discover opportunities that match your skills, experience, and
                career goals.
              </p>
            </div>

            {/* MATCH COUNT */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3">
              <p className="text-xs text-[var(--muted-foreground)]">
                Available matches
              </p>

              <p className="mt-1 text-2xl font-bold">{jobs.length}</p>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROFILE STATUS
        ========================================================= */}
        <section className="mb-8 grid gap-4 lg:grid-cols-3">
          {/* PROFILE STRENGTH */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Improve your profile</p>

                <p className="mt-1 max-w-xl text-sm leading-6 text-[var(--muted)]">
                  Keep your resume up to date to receive more relevant
                  AI-powered job recommendations.
                </p>
              </div>

              <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-[var(--brand)]/20 bg-[var(--brand)]/10 px-3 py-1.5 text-xs font-medium text-[var(--brand)]">
                Resume recommended
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
              <div
                className="h-full rounded-full bg-[var(--brand)]"
                style={{ width: "70%" }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-[var(--muted-foreground)]">
              <span>Profile strength</span>
              <span>70%</span>
            </div>
          </div>

          {/* MATCHING OVERVIEW */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold">Matching overview</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">
                  Available jobs
                </span>

                <span className="font-semibold">{jobs.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">
                  Profile status
                </span>

                <span className="text-sm font-medium text-[var(--success)]">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">
                  Matching engine
                </span>

                <span className="text-sm font-medium text-[var(--brand)]">
                  AI-assisted
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RESUME
        ========================================================= */}
        <section className="mb-10">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-xs font-bold text-[var(--brand)]">
                  CV
                </div>

                <div>
                  <h2 className="font-semibold">Your resume</h2>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Upload your latest resume to improve your matches.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* FILE SELECT */}
                <label className="flex max-w-full cursor-pointer items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-medium transition hover:border-[var(--brand)]">
                  <span className="max-w-[220px] truncate">
                    {selectedFile ? selectedFile.name : "Choose resume"}
                  </span>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>

                {/* UPLOAD */}
                <button
                  onClick={handleUpload}
                  disabled={uploading || !selectedFile}
                  className="rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? "Analyzing..." : "Update resume"}
                </button>
              </div>
            </div>

            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <p className="text-xs leading-5 text-[var(--muted-foreground)]">
                Supported formats: PDF, DOC, DOCX. Your resume is analyzed to
                identify skills and improve job matching.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            TOP JOB MATCHES
        ========================================================= */}
        <section>
          {/* SECTION HEADER */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--brand)]">
                Personalized for you
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Top matches
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                The opportunities with the strongest match to your skills.
              </p>
            </div>

            {/* VIEW ALL */}
            {hasMoreJobs && (
              <Link
                href="/candidate/jobs"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] transition hover:text-[var(--brand-hover)]"
              >
                View all {jobs.length} matches
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </div>

          {/* =======================================================
              LOADING
          ======================================================= */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            /* =====================================================
               EMPTY STATE
            ===================================================== */
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
                ✦
              </div>

              <h3 className="mt-5 text-lg font-semibold">No matches yet</h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                Upload a recent resume so SkillMatch can analyze your skills and
                find relevant opportunities.
              </p>

              <button
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>('input[type="file"]')
                    ?.click()
                }
                className="mt-6 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
              >
                Upload your resume
              </button>
            </div>
          ) : (
            /* =====================================================
               JOB GRID
            ===================================================== */
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {topJobs.map((job) => (
                  <MatchedJobCard key={job.jobId} job={job} />
                ))}
              </div>

              {/* BOTTOM VIEW ALL */}
              {hasMoreJobs && (
                <div className="mt-8 flex flex-col items-center justify-center border-t border-[var(--border)] pt-8">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Showing the top {topJobs.length} of{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {jobs.length}
                    </span>{" "}
                    matches
                  </p>

                  <Link
                    href="/candidate/jobs"
                    className="
                      group mt-4 inline-flex items-center gap-2
                      rounded-lg
                      border border-[var(--border-strong)]
                      bg-[var(--surface)]
                      px-5 py-2.5
                      text-sm font-semibold
                      text-[var(--foreground)]
                      transition-all duration-200
                      hover:border-[var(--brand)]/40
                      hover:bg-[var(--surface-elevated)]
                      hover:text-[var(--brand)]
                    "
                  >
                    Explore all matches
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              )}
            </>
          )}
        </section>

        {/* =========================================================
            PRODUCT VALUE
        ========================================================= */}
        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">Skill-based matching</p>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Matches are based on relevant skills and requirements, not just
                job-title keywords.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">
                AI-assisted recommendations
              </p>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Your resume is analyzed to identify the capabilities that matter
                for each opportunity.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Better opportunities</p>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Focus your search on roles where your experience can make a
                meaningful difference.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CandidateDashboard;
