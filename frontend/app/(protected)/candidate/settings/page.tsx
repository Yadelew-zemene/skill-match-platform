"use client";

import ChangePasswordForm from "@/components/settings/ChangePasswordForm";

export default function CandidateSettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your account security and preferences.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
