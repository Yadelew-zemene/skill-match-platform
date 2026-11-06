import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
          <p className="text-sm text-[var(--text-muted)]">
            Loading password reset form...
          </p>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
