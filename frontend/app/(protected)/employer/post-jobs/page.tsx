"use client";

import { useState } from "react";
import { postJobs } from "@/services/job.service";
import toast from "react-hot-toast";
import {
  Briefcase,
  Link as LinkIcon,
  Building2,
  AlignLeft,
  ArrowLeft,
  Sparkles,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [application_link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !company || !application_link || !description) {
      return toast.error("Please complete all required fields");
    }

    setIsSubmitting(true);

    try {
      await postJobs({
        title,
        company,
        application_link,
        description,
      });

      toast.success("Job posted successfully");

      setTitle("");
      setCompany("");
      setLink("");
      setDescription("");
    } catch (err) {
      toast.error("Unable to post the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <Link
          href="/employer/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand)]">
              New opportunity
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Post a new job
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Create a clear job posting so SkillMatch can identify candidates
              whose skills align with the opportunity.
            </p>
          </div>

          <div className="hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:block">
            <Sparkles size={20} className="text-[var(--brand)]" />
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* BASIC INFORMATION */}
        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-6 py-5 sm:px-8">
            <h2 className="text-base font-semibold">Job information</h2>

            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Start with the basic information candidates need.
            </p>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            {/* JOB TITLE */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Briefcase size={16} className="text-[var(--brand)]" />
                Job title
                <span className="text-[var(--brand)]">*</span>
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Developer"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
              />
            </div>

            {/* COMPANY */}
            <div>
              <label
                htmlFor="company"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Building2 size={16} className="text-[var(--brand)]" />
                Company name
                <span className="text-[var(--brand)]">*</span>
              </label>

              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. TechFlow Solutions"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
              />
            </div>

            {/* APPLICATION LINK */}
            <div>
              <label
                htmlFor="application_link"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <LinkIcon size={16} className="text-[var(--brand)]" />
                Application link
                <span className="text-[var(--brand)]">*</span>
              </label>

              <input
                id="application_link"
                type="url"
                value={application_link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://company.com/careers/apply"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
              />

              <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                <Globe size={13} />
                Candidates will use this link to apply.
              </div>
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-6 py-5 sm:px-8">
            <h2 className="text-base font-semibold">Job description</h2>

            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Describe the role, responsibilities, requirements, and what makes
              the opportunity valuable.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <label
              htmlFor="description"
              className="mb-2 flex items-center gap-2 text-sm font-medium"
            >
              <AlignLeft size={16} className="text-[var(--brand)]" />
              Description
              <span className="text-[var(--brand)]">*</span>
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Describe the role...

Example:
We are looking for a Senior Full Stack Developer to join our engineering team.

Responsibilities:
- Build and maintain scalable web applications
- Work closely with product and design teams
- Review code and mentor developers

Requirements:
- 4+ years of software development experience
- Strong React and Node.js experience
- Good understanding of SQL and REST APIs`}
              rows={12}
              className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
            />

            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Be specific about skills and responsibilities. This information
              will eventually help SkillMatch evaluate candidate fit.
            </p>
          </div>
        </section>

        {/* FUTURE MATCHING DATA */}
        <section className="mt-6 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)] p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10">
              <Sparkles size={19} className="text-[var(--brand)]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Smarter matching is coming
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                SkillMatch will soon let you define required skills, experience
                level, employment type, location, and other structured
                requirements. These signals will improve candidate matching and
                explain why candidates fit the role.
              </p>
            </div>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/employer/dashboard"
            className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-medium transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish job"}
          </button>
        </div>
      </form>
    </div>
  );
}
