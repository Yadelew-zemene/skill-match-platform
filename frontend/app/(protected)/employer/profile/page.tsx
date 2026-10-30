"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  Globe,
  Linkedin,
  LoaderCircle,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEmployerProfile } from "@/hooks/useEmployerProfile";

const inputClasses =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] shadow-sm outline-none transition duration-200 hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:ring-4 focus:ring-indigo-500/10";

const labelClasses =
  "mb-2 block text-sm font-semibold text-[var(--text-primary)]";

const helperClasses = "mt-2 text-xs leading-5 text-[var(--text-muted)]";

export default function EmployerProfilePage() {
  const { profile, loading, saving, error, success, updateField, saveProfile } =
    useEmployerProfile();

  const [showResetNotice, setShowResetNotice] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResetNotice(false);
    await saveProfile();
  };

  const handleReset = () => {
    // Reload the current saved profile from the server.
    // This discards unsaved form changes.
    if (
      window.confirm(
        "Discard your unsaved changes and reload the company profile?",
      )
    ) {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <main className="relative isolate min-h-full overflow-hidden bg-[var(--background)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl animate-pulse space-y-8">
          <div className="h-4 w-36 rounded bg-[var(--surface-soft)]" />

          <div className="space-y-3">
            <div className="h-9 w-64 rounded-lg bg-[var(--surface-soft)]" />
            <div className="h-4 max-w-lg rounded bg-[var(--surface-soft)]" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <div className="mb-6 h-6 w-48 rounded bg-[var(--surface-soft)]" />
                  <div className="space-y-5">
                    <div className="h-12 rounded-xl bg-[var(--surface-soft)]" />
                    <div className="h-28 rounded-xl bg-[var(--surface-soft)]" />
                    <div className="h-12 rounded-xl bg-[var(--surface-soft)]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-64 rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
          </div>
        </div>
      </main>
    );
  }

  const companyName = profile.company_name?.trim() || "Your company";
  const companyInitial = companyName.charAt(0).toUpperCase();

  const completionFields = [
    profile.company_name,
    profile.company_description,
    profile.industry,
    profile.company_size,
    profile.location,
    profile.phone,
    profile.website_url,
    profile.linkedin_url,
  ];

  const completedFields = completionFields.filter(
    (value) => typeof value === "string" && value.trim().length > 0,
  ).length;

  const completionPercentage = Math.round(
    (completedFields / completionFields.length) * 100,
  );

  return (
    <main className="relative isolate min-h-full overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      {/* Ambient background: indigo and cyan glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/[0.09] blur-[110px]" />
        <div className="absolute -right-32 top-32 h-[30rem] w-[30rem] rounded-full bg-cyan-400/[0.08] blur-[120px]" />
        <div className="absolute left-1/3 top-[38rem] h-80 w-80 rounded-full bg-violet-500/[0.05] blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Gentle vertical color transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.025] via-transparent to-cyan-500/[0.025]" />
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Back navigation */}
        <Link
          href="/employer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to dashboard
        </Link>

        {/* Page heading */}
        <header className="relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-500/[0.06] px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                <Sparkles size={14} />
                Employer workspace
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Company profile
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                Tell candidates who you are, what your organization does, and
                why they should consider joining your team.
              </p>
            </div>

            {/* Company identity preview */}
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-4 shadow-lg shadow-slate-900/[0.03] backdrop-blur-xl sm:min-w-64">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-400 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
                {companyInitial}
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--surface)] bg-emerald-500">
                  <Check size={11} className="text-white" strokeWidth={3} />
                </div>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[var(--text-primary)]">
                  {companyName}
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Company identity
                </p>
                {profile.industry && (
                  <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                    {profile.industry}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Feedback messages */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-red-500/25 bg-red-500/[0.07] p-4 text-sm text-red-600 dark:text-red-300"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 font-bold">
              !
            </span>
            <div>
              <p className="font-semibold">Unable to save your profile</p>
              <p className="mt-1 leading-5">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-4 text-sm text-emerald-700 dark:text-emerald-300"
          >
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Profile saved successfully</p>
              <p className="mt-1 leading-5">{success}</p>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Profile form */}
          <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
            {/* Organization details */}
            <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl shadow-slate-900/[0.025] transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-950/[0.04]">
              <div className="border-b border-[var(--border)] bg-gradient-to-r from-indigo-500/[0.055] via-transparent to-cyan-500/[0.055] px-5 py-5 sm:px-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 text-indigo-600 dark:text-indigo-300">
                    <Building2 size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold tracking-tight">
                      Organization details
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">
                      Introduce your company and what makes it unique.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                {/* Company name */}
                <div>
                  <label htmlFor="company_name" className={labelClasses}>
                    Company name <span className="text-rose-500">*</span>
                  </label>

                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    value={profile.company_name ?? ""}
                    onChange={(event) =>
                      updateField("company_name", event.target.value)
                    }
                    required
                    maxLength={150}
                    placeholder="e.g. Abay Technologies"
                    className={inputClasses}
                  />

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className={helperClasses}>
                      Use the name candidates will recognize.
                    </p>
                    <span className="shrink-0 text-xs tabular-nums text-[var(--text-muted)]">
                      {(profile.company_name ?? "").length}/150
                    </span>
                  </div>
                </div>

                {/* Company description */}
                <div>
                  <label htmlFor="company_description" className={labelClasses}>
                    About your company
                  </label>

                  <textarea
                    id="company_description"
                    name="company_description"
                    value={profile.company_description ?? ""}
                    onChange={(event) =>
                      updateField("company_description", event.target.value)
                    }
                    rows={6}
                    maxLength={3000}
                    placeholder="Describe your mission, products or services, company culture, and the impact your team makes."
                    className={`${inputClasses} min-h-36 resize-y leading-6`}
                  />

                  <div className="mt-2 flex items-start justify-between gap-3">
                    <p className={helperClasses}>
                      A clear description helps candidates understand your
                      organization.
                    </p>
                    <span className="shrink-0 text-xs tabular-nums text-[var(--text-muted)]">
                      {(profile.company_description ?? "").length}/3000
                    </span>
                  </div>
                </div>

                {/* Industry and company size */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="industry" className={labelClasses}>
                      Industry
                    </label>
                    <input
                      id="industry"
                      name="industry"
                      type="text"
                      value={profile.industry ?? ""}
                      onChange={(event) =>
                        updateField("industry", event.target.value)
                      }
                      maxLength={100}
                      placeholder="e.g. Software & Technology"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="company_size" className={labelClasses}>
                      Company size
                    </label>
                    <input
                      id="company_size"
                      name="company_size"
                      type="text"
                      value={profile.company_size ?? ""}
                      onChange={(event) =>
                        updateField("company_size", event.target.value)
                      }
                      maxLength={50}
                      placeholder="e.g. 11–50 employees"
                      className={inputClasses}
                    />
                    <p className={helperClasses}>
                      Approximate number of employees.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact information */}
            <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl shadow-slate-900/[0.025] transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-950/[0.04]">
              <div className="border-b border-[var(--border)] bg-gradient-to-r from-cyan-500/[0.06] via-transparent to-indigo-500/[0.05] px-5 py-5 sm:px-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 text-cyan-700 dark:text-cyan-300">
                    <Globe size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold tracking-tight">
                      Contact information
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">
                      Make it easy for candidates to learn more about your
                      organization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className={labelClasses}>
                      <span className="inline-flex items-center gap-2">
                        <MapPin
                          size={15}
                          className="text-[var(--text-muted)]"
                        />
                        Location
                      </span>
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={profile.location ?? ""}
                      onChange={(event) =>
                        updateField("location", event.target.value)
                      }
                      maxLength={150}
                      placeholder="Addis Ababa, Ethiopia"
                      className={inputClasses}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      <span className="inline-flex items-center gap-2">
                        <Phone size={15} className="text-[var(--text-muted)]" />
                        Contact phone
                      </span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={profile.phone ?? ""}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      maxLength={30}
                      placeholder="+251 ..."
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="website_url" className={labelClasses}>
                    Company website
                  </label>

                  <div className="relative">
                    <Globe
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      id="website_url"
                      name="website_url"
                      type="url"
                      value={profile.website_url ?? ""}
                      onChange={(event) =>
                        updateField("website_url", event.target.value)
                      }
                      maxLength={500}
                      placeholder="https://example.com"
                      className={`${inputClasses} pl-11`}
                    />
                  </div>

                  <p className={helperClasses}>
                    Add your official company website, if available.
                  </p>
                </div>

                {/* LinkedIn */}
                <div>
                  <label htmlFor="linkedin_url" className={labelClasses}>
                    <span className="inline-flex items-center gap-2">
                      <Linkedin
                        size={16}
                        className="text-[var(--text-muted)]"
                      />
                      LinkedIn company page
                    </span>
                  </label>

                  <div className="relative">
                    <Linkedin
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      id="linkedin_url"
                      name="linkedin_url"
                      type="url"
                      value={profile.linkedin_url ?? ""}
                      onChange={(event) =>
                        updateField("linkedin_url", event.target.value)
                      }
                      maxLength={500}
                      placeholder="https://www.linkedin.com/company/..."
                      className={`${inputClasses} pl-11`}
                    />
                  </div>

                  <p className={helperClasses}>
                    Link to your organization&apos;s official LinkedIn page.
                  </p>
                </div>
              </div>
            </section>

            {/* Form actions */}
            <div className="sticky bottom-3 z-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:bottom-4 sm:p-4">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="hidden items-center gap-2 text-xs text-[var(--text-muted)] sm:flex">
                  <ShieldCheck size={15} />
                  Your changes are saved to your company profile.
                </p>

                <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-50 sm:py-2.5"
                  >
                    Reset changes
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:py-2.5"
                  >
                    {saving ? (
                      <>
                        <LoaderCircle size={17} className="animate-spin" />
                        Saving profile...
                      </>
                    ) : (
                      <>
                        <Save
                          size={17}
                          className="transition-transform group-hover:scale-110"
                        />
                        Save company profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Right-hand information panel */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {/* Profile completion */}
            <section className="relative overflow-hidden rounded-2xl border border-indigo-500/15 bg-[var(--surface)] p-5 shadow-xl shadow-indigo-950/[0.035]">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-cyan-500/[0.08] blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold">Profile completeness</h2>
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-300">
                    {completionPercentage}%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>

                <p className="mt-3 text-xs leading-5 text-[var(--text-secondary)]">
                  {completedFields} of {completionFields.length} profile
                  sections have information.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      label: "Company name",
                      complete: Boolean(profile.company_name?.trim()),
                    },
                    {
                      label: "Company description",
                      complete: Boolean(profile.company_description?.trim()),
                    },
                    {
                      label: "Industry",
                      complete: Boolean(profile.industry?.trim()),
                    },
                    {
                      label: "Location",
                      complete: Boolean(profile.location?.trim()),
                    },
                    {
                      label: "Contact details",
                      complete: Boolean(
                        profile.phone?.trim() ||
                        profile.website_url?.trim() ||
                        profile.linkedin_url?.trim(),
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-[var(--text-secondary)]">
                        {item.label}
                      </span>
                      {item.complete ? (
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-emerald-500"
                        />
                      ) : (
                        <span className="h-4 w-4 shrink-0 rounded-full border border-[var(--border-strong)]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Preview card */}
            <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-slate-900/[0.025]">
              <div className="border-b border-[var(--border)] px-5 py-4">
                <div className="flex items-center gap-2">
                  <Users size={17} className="text-[var(--primary)]" />
                  <h2 className="text-sm font-bold">Candidate preview</h2>
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  A quick look at your company identity.
                </p>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-400 text-lg font-bold text-white shadow-md shadow-indigo-500/15">
                    {companyInitial}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-bold">
                      {companyName}
                    </h3>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {profile.industry?.trim() || "Industry not added"}
                    </p>

                    {profile.company_size && (
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {profile.company_size}
                      </p>
                    )}
                  </div>
                </div>

                {profile.company_description?.trim() ? (
                  <p className="mt-4 line-clamp-4 whitespace-pre-line text-sm leading-6 text-[var(--text-secondary)]">
                    {profile.company_description}
                  </p>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)]/60 p-3">
                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      Add a company description to give candidates a better
                      understanding of your organization.
                    </p>
                  </div>
                )}

                {profile.location && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <MapPin size={14} className="shrink-0 text-cyan-600" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Guidance */}
            <section className="rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-cyan-500/[0.07] via-[var(--surface)] to-indigo-500/[0.06] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/15 text-cyan-700 dark:text-cyan-300">
                <Sparkles size={19} />
              </div>

              <h2 className="mt-4 text-sm font-bold">
                Make your company stand out
              </h2>

              <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">
                A clear company description, accurate industry information, and
                working contact links help candidates learn about your
                organization before applying.
              </p>

              <div className="mt-4 flex items-start gap-2 border-t border-[var(--border)] pt-4">
                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  Keep your information accurate and up to date.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
