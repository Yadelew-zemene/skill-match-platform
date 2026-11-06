"use client";

import { useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { changePassword } from "@/services/auth.service";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("Your new password must differ from your current password.");
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword(currentPassword, newPassword);

      setSuccess(response.message || "Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }  catch (err: any) {
  console.error("Change Password Debug:", {
    message: err.message,
    code: err.code,
    status: err.response?.status,
    responseData: err.response?.data,
    requestURL: err.config?.url,
    method: err.config?.method,
  });

  setError(
    err.response?.data?.message ||
      "Something went wrong. Please try again.",
  );

} finally {
      setLoading(false);
    }
  };

  const renderPasswordField = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    visible: boolean,
    toggleVisibility: () => void,
    placeholder: string,
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="new-password"
          className="
            w-full rounded-lg border border-[var(--border)]
            bg-[var(--surface-soft)] px-4 py-3 pr-12
            text-sm text-[var(--foreground)]
            placeholder:text-[var(--text-muted)]
            outline-none transition
            focus:border-[var(--primary)]
            focus:ring-2 focus:ring-[var(--primary)]/20
          "
        />

        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={visible ? "Hide password" : "Show password"}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-[var(--text-muted)] transition
            hover:text-[var(--foreground)]
          "
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
          <LockKeyhole size={19} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Change password
          </h2>
          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5">
        {success && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            {success}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {renderPasswordField(
          "Current password",
          currentPassword,
          setCurrentPassword,
          showCurrent,
          () => setShowCurrent(!showCurrent),
          "Enter your current password",
        )}

        {renderPasswordField(
          "New password",
          newPassword,
          setNewPassword,
          showNew,
          () => setShowNew(!showNew),
          "Enter your new password",
        )}

        {renderPasswordField(
          "Confirm new password",
          confirmPassword,
          setConfirmPassword,
          showConfirm,
          () => setShowConfirm(!showConfirm),
          "Re-enter your new password",
        )}

        <p className="text-xs text-[var(--text-muted)]">
          Your password must contain at least 8 characters.
        </p>

        <div className="flex justify-end border-t border-[var(--border)] pt-4">
          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg bg-[var(--primary)]
              px-5 py-2.5 text-sm font-semibold
              text-white transition
              hover:opacity-90
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {loading ? "Updating password..." : "Update password"}
          </button>
        </div>
      </form>
    </section>
  );
}
