"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Camera,
  FileText,
  Github,
  Linkedin,
  LoaderCircle,
  MapPin,
  Phone,
  Save,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  deleteCandidateProfilePhoto,
  getCandidateProfile,
  getCandidateProfilePhoto,
  updateCandidateProfile,
  uploadCandidateProfilePhoto,
} from "@/services/profile.service";

import type {
  CandidateProfile,
  UpdateCandidateProfileData,
} from "@/types/candidate-profile";

type ProfileForm = UpdateCandidateProfileData;

const emptyForm: ProfileForm = {
  name: "",
  professional_title: null,
  bio: null,
  phone: null,
  location: null,
  linkedin_url: null,
  github_url: null,
};

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCandidateProfile();
        const candidateProfile = response.profile;

        setProfile(candidateProfile);

        setForm({
          name: candidateProfile.name ?? "",
          professional_title: candidateProfile.professional_title ?? null,
          bio: candidateProfile.bio ?? null,
          phone: candidateProfile.phone ?? null,
          location: candidateProfile.location ?? null,
          linkedin_url: candidateProfile.linkedin_url ?? null,
          github_url: candidateProfile.github_url ?? null,
        });

        if (candidateProfile.profile_image_path) {
          const url = await getCandidateProfilePhoto();
          setPhotoUrl(url);
        } else {
          setPhotoUrl(null);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const updateField = <K extends keyof ProfileForm>(
    field: K,
    value: ProfileForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name?.trim()) {
      setError("Your name is required.");
      setSuccess("");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateCandidateProfile({
        name: form.name.trim(),
        professional_title: form.professional_title?.trim() || null,
        bio: form.bio?.trim() || null,
        phone: form.phone?.trim() || null,
        location: form.location?.trim() || null,
        linkedin_url: form.linkedin_url?.trim() || null,
        github_url: form.github_url?.trim() || null,
      });

      setProfile(response.profile);

      setForm({
        name: response.profile.name ?? "",
        professional_title: response.profile.professional_title ?? null,
        bio: response.profile.bio ?? null,
        phone: response.profile.phone ?? null,
        location: response.profile.location ?? null,
        linkedin_url: response.profile.linkedin_url ?? null,
        github_url: response.profile.github_url ?? null,
      });

      setSuccess("Your profile has been updated successfully.");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to update your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhotoError("");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Please select a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Profile photo must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }

    try {
      setPhotoUploading(true);

      const response = await uploadCandidateProfilePhoto(file);

      setProfile(response.profile);

      const url = await getCandidateProfilePhoto();

      setPhotoUrl(url);
      setPhotoError("");
    } catch (err: any) {
      setPhotoError(
        err?.response?.data?.message || "Failed to upload profile photo.",
      );
    } finally {
      setPhotoUploading(false);
      event.target.value = "";
    }
  };

  const handlePhotoDelete = async () => {
    try {
      setPhotoUploading(true);
      setPhotoError("");

      const response = await deleteCandidateProfilePhoto();

      setProfile(response.profile);
      setPhotoUrl(null);
    } catch (err: any) {
      setPhotoError(
        err?.response?.data?.message || "Failed to remove profile photo.",
      );
    } finally {
      setPhotoUploading(false);
    }
  };

  if (loading) {
    return <ProfileLoadingState />;
  }

  if (!profile) {
    return (
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden">
        <AmbientBackground />

        <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 p-8 text-center shadow-[var(--shadow-sm)] backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--error-light)] text-[var(--error)]">
            <UserRound size={25} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[var(--text-primary)]">
            Profile unavailable
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
            We could not load your profile. Please refresh the page and try
            again.
          </p>

          {error && <p className="mt-4 text-sm text-[var(--error)]">{error}</p>}
        </div>
      </div>
    );
  }

  const skills = profile.resume?.skills ?? profile.skills ?? [];

  return (
    <div className="relative mx-auto w-full max-w-7xl overflow-hidden">
      <AmbientBackground />

      <div className="relative space-y-6 sm:space-y-8">
        {/* Hero */}

        <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 shadow-[var(--shadow-sm)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-[var(--accent)]" />

          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <ProfileAvatar
                  profile={profile}
                  photoUrl={photoUrl}
                  size="large"
                />

                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[var(--surface)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-lg">
                  <UserRound size={12} />
                </span>
              </div>

              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center rounded-full border border-[var(--primary)]/15 bg-[var(--primary-light)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  Candidate profile
                </div>

                <h1 className="truncate text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  {profile.name || "Your profile"}
                </h1>

                <p className="mt-1 truncate text-sm text-[var(--text-secondary)]">
                  {profile.professional_title ||
                    "Add a professional title to introduce yourself"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
                  {profile.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />
                      {profile.location}
                    </span>
                  )}

                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/70 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  Public-facing profile
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  Keep your information current
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-[var(--text-secondary)]">
                  A complete profile gives employers better context when
                  reviewing your application.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}

        {(success || error) && (
          <div
            aria-live="polite"
            className={`rounded-2xl border px-4 py-3.5 text-sm ${
              success
                ? "border-[var(--success)]/20 bg-[var(--success-light)] text-[var(--success)]"
                : "border-[var(--error)]/20 bg-[var(--error-light)] text-[var(--error)]"
            }`}
          >
            {success || error}
          </div>
        )}

        {/* Main */}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* Left */}

          <form onSubmit={handleSubmit} className="min-w-0 space-y-6">
            {/* Photo */}

            <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 shadow-[var(--shadow-sm)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[var(--primary)]/60 via-[var(--accent)]/50 to-transparent" />

              <div className="p-5 sm:p-7">
                <div className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                    Identity
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)]">
                    Profile photo
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                    Add a professional photo so employers can easily recognize
                    you.
                  </p>
                </div>

                <div className="flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/50 p-4 sm:flex-row sm:items-center sm:p-5">
                  <ProfileAvatar
                    profile={profile}
                    photoUrl={photoUrl}
                    size="photo"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {profile.profile_image_path
                        ? "Your profile photo is active"
                        : "No profile photo added"}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                      JPG, PNG, or WebP · Maximum 2 MB
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <label
                        htmlFor="profile-photo"
                        className={`inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-2.5 text-xs font-semibold text-[var(--text-primary)] shadow-sm transition ${
                          photoUploading
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                        }`}
                      >
                        {photoUploading ? (
                          <LoaderCircle size={15} className="animate-spin" />
                        ) : (
                          <Camera size={15} />
                        )}

                        {photoUploading
                          ? "Uploading..."
                          : profile.profile_image_path
                            ? "Change photo"
                            : "Upload photo"}
                      </label>

                      <input
                        id="profile-photo"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoUpload}
                        disabled={photoUploading}
                        className="hidden"
                      />

                      {profile.profile_image_path && (
                        <button
                          type="button"
                          onClick={handlePhotoDelete}
                          disabled={photoUploading}
                          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-xs font-semibold text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:border-[var(--error)]/30 hover:bg-[var(--error-light)] hover:text-[var(--error)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>

                    {photoError && (
                      <p
                        aria-live="polite"
                        className="mt-3 text-xs font-medium text-[var(--error)]"
                      >
                        {photoError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Professional information */}

            <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 shadow-[var(--shadow-sm)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-[var(--accent)]/40" />

              <div className="p-5 sm:p-7">
                <div className="mb-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                    About you
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)]">
                    Professional information
                  </h2>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Give employers a clear picture of who you are and what you
                    can contribute.
                  </p>
                </div>

                <div className="space-y-7">
                  {/* Personal details */}

                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-[var(--border)]" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Personal details
                      </span>

                      <div className="h-px flex-1 bg-[var(--border)]" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        required
                        value={form.name ?? ""}
                        onChange={(value) => updateField("name", value)}
                        placeholder="Your full name"
                      />

                      <div>
                        <label className="mb-2 block text-xs font-semibold text-[var(--text-primary)]">
                          Email address
                        </label>

                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-[var(--text-muted)]">
                            <UserRound size={15} />
                          </div>

                          <input
                            type="email"
                            value={profile.email ?? ""}
                            disabled
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] py-3 pl-10 pr-4 text-sm text-[var(--text-muted)] outline-none"
                          />
                        </div>

                        <p className="mt-1.5 text-[11px] text-[var(--text-muted)]">
                          Your account email cannot be changed here.
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <Field
                          label="Professional title"
                          value={form.professional_title ?? ""}
                          onChange={(value) =>
                            updateField("professional_title", value)
                          }
                          placeholder="e.g. Full-Stack Developer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-[var(--text-primary)]">
                      Professional bio
                    </label>

                    <textarea
                      value={form.bio ?? ""}
                      onChange={(event) =>
                        updateField("bio", event.target.value)
                      }
                      maxLength={2000}
                      rows={7}
                      placeholder="Briefly describe your experience, strengths, interests, and the kind of opportunities you are looking for."
                      className="w-full resize-y rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-disabled)] hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                    />

                    <div className="mt-2 flex justify-between gap-4">
                      <p className="text-[11px] text-[var(--text-muted)]">
                        Keep it focused on your professional value.
                      </p>

                      <span className="shrink-0 text-[11px] text-[var(--text-muted)]">
                        {(form.bio ?? "").length}/2000
                      </span>
                    </div>
                  </div>

                  {/* Contact */}

                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-[var(--border)]" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Contact
                      </span>

                      <div className="h-px flex-1 bg-[var(--border)]" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Phone"
                        value={form.phone ?? ""}
                        onChange={(value) => updateField("phone", value)}
                        placeholder="+251 9..."
                        icon={<Phone size={15} />}
                      />

                      <Field
                        label="Location"
                        value={form.location ?? ""}
                        onChange={(value) => updateField("location", value)}
                        placeholder="Addis Ababa, Ethiopia"
                        icon={<MapPin size={15} />}
                      />
                    </div>
                  </div>

                  {/* Professional links */}

                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-[var(--border)]" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Professional presence
                      </span>

                      <div className="h-px flex-1 bg-[var(--border)]" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="LinkedIn"
                        value={form.linkedin_url ?? ""}
                        onChange={(value) => updateField("linkedin_url", value)}
                        placeholder="https://linkedin.com/in/your-name"
                        icon={<Linkedin size={15} />}
                      />

                      <Field
                        label="GitHub"
                        value={form.github_url ?? ""}
                        onChange={(value) => updateField("github_url", value)}
                        placeholder="https://github.com/your-username"
                        icon={<Github size={15} />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save footer */}

              <div className="border-t border-[var(--border)] bg-[var(--surface-soft)]/45 px-5 py-4 sm:px-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)]">
                      Ready to update your profile?
                    </p>

                    <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                      Your changes will be visible to employers.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}

                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            </section>
          </form>

          {/* Right sidebar */}

          <aside className="space-y-6">
            {/* Profile snapshot */}

            <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 shadow-[var(--shadow-sm)] backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/10 to-transparent" />

              <div className="relative p-5 sm:p-6">
                <div className="mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                    Snapshot
                  </p>

                  <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">
                    Profile overview
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <ProfileAvatar
                    profile={profile}
                    photoUrl={photoUrl}
                    size="small"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[var(--text-primary)]">
                      {profile.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                      {profile.professional_title ||
                        "Professional title not added"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-5">
                  {profile.location && (
                    <InfoRow
                      icon={<MapPin size={14} />}
                      value={profile.location}
                    />
                  )}

                  {profile.phone && (
                    <InfoRow icon={<Phone size={14} />} value={profile.phone} />
                  )}

                  <InfoRow
                    icon={<UserRound size={14} />}
                    value={profile.email}
                  />
                </div>
              </div>
            </section>

            {/* Skills */}

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Resume
                  </p>

                  <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">
                    Skills
                  </h2>
                </div>

                <FileText size={18} className="text-[var(--text-muted)]" />
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] transition hover:border-[var(--primary)]/20 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)]/40 p-4">
                  <p className="text-xs leading-5 text-[var(--text-muted)]">
                    Your extracted resume skills will appear here once a resume
                    is active.
                  </p>
                </div>
              )}
            </section>

            {/* Active resume */}

            <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:p-6">
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary)]/10 blur-2xl" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Documents
                    </p>

                    <h2 className="text-base font-bold text-[var(--text-primary)]">
                      Active resume
                    </h2>
                  </div>
                </div>

                {profile.resume ? (
                  <>
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)]/50 p-4">
                      <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                        {profile.resume.original_filename || "Resume"}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />

                        <span className="text-[11px] font-medium text-[var(--success)]">
                          Active
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/candidate/dashboard"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                    >
                      Manage resumes
                      <FileText size={14} />
                    </Link>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)]/40 p-4">
                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      No active resume is connected to your profile yet.
                    </p>

                    <Link
                      href="/candidate/dashboard"
                      className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] hover:underline"
                    >
                      Manage resumes
                      <FileText size={13} />
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Professional presence */}

            {(profile.linkedin_url || profile.github_url) && (
              <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:p-6">
                <div className="mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                    Links
                  </p>

                  <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">
                    Professional presence
                  </h2>
                </div>

                <div className="space-y-2">
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/40 p-3 transition hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--primary)] shadow-sm">
                        <Linkedin size={16} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-[var(--text-primary)]">
                          LinkedIn
                        </span>

                        <span className="mt-0.5 block truncate text-[10px] text-[var(--text-muted)]">
                          Professional profile
                        </span>
                      </span>
                    </a>
                  )}

                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)]/40 p-3 transition hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:bg-[var(--primary-light)]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--text-primary)] shadow-sm">
                        <Github size={16} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-[var(--text-primary)]">
                          GitHub
                        </span>

                        <span className="mt-0.5 block truncate text-[10px] text-[var(--text-muted)]">
                          Projects and code
                        </span>
                      </span>
                    </a>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-[var(--text-primary)]">
        {label}

        {required && <span className="ml-1 text-[var(--error)]">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-[var(--text-muted)]">
            {icon}
          </div>
        )}

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-disabled)] hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE AVATAR
========================================================= */

function ProfileAvatar({
  profile,
  photoUrl,
  size,
}: {
  profile: CandidateProfile;
  photoUrl: string | null;
  size: "large" | "photo" | "small";
}) {
  const sizeClasses = {
    large: "h-16 w-16 sm:h-20 sm:w-20",
    photo: "h-20 w-20 sm:h-24 sm:w-24",
    small: "h-12 w-12",
  };

  const iconSizes = {
    large: 25,
    photo: 30,
    small: 19,
  };

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] shadow-sm ${sizeClasses[size]}`}
    >
      {profile.profile_image_path && photoUrl ? (
        <img
          src={photoUrl}
          alt={`${profile.name} profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
          <UserRound size={iconSizes[size]} />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
    </div>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 text-xs text-[var(--text-secondary)]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-soft)] text-[var(--text-muted)]">
        {icon}
      </span>

      <span className="truncate">{value}</span>
    </div>
  );
}

/* =========================================================
   AMBIENT BACKGROUND
========================================================= */

function AmbientBackground() {
  return (
    <>
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

      <div className="pointer-events-none absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-[var(--primary)]/8 via-transparent to-[var(--accent)]/8 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[var(--primary)]/5 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.025]" />
    </>
  );
}

/* =========================================================
   LOADING
========================================================= */

function ProfileLoadingState() {
  return (
    <div className="relative mx-auto w-full max-w-7xl">
      <AmbientBackground />

      <div className="relative space-y-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 animate-pulse rounded-full bg-[var(--surface-soft)]" />

            <div className="flex-1">
              <div className="h-3 w-28 animate-pulse rounded bg-[var(--surface-soft)]" />

              <div className="mt-3 h-8 w-64 max-w-full animate-pulse rounded-lg bg-[var(--surface-soft)]" />

              <div className="mt-2 h-4 w-48 max-w-full animate-pulse rounded bg-[var(--surface-soft)]" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <LoadingCard height="h-44" />
            <LoadingCard height="h-[560px]" />
          </div>

          <div className="space-y-6">
            <LoadingCard height="h-64" />
            <LoadingCard height="h-52" />
            <LoadingCard height="h-56" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingCard({ height }: { height: string }) {
  return (
    <div
      className={`animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 ${height}`}
    />
  );
}
