"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getDashboardRoute } from "@/utils/redirect";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMobile}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-black text-[#080A0D]">
            S
          </div>

          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            Skill<span className="text-[var(--brand)]">Match</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            About
          </Link>

          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            How it works
          </Link>

          <Link
            href="/#candidates"
            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Candidates
          </Link>

          <Link
            href="/#employers"
            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Employers
          </Link>

          <Link
            href="/contacts"
            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Contact
          </Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 sm:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
              >
                Get started
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push(getDashboardRoute(user.role))}
                className="rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
              >
                Dashboard
              </button>

              <button
                onClick={logout}
                className="px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--foreground)] sm:hidden"
        >
          <span className="text-lg">{mobileOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] sm:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            <Link
              href="/"
              onClick={closeMobile}
              className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMobile}
              className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              About
            </Link>

            <Link
              href="/#how-it-works"
              onClick={closeMobile}
              className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              How it works
            </Link>

            <Link
              href="/#candidates"
              onClick={closeMobile}
              className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Candidates
            </Link>

            <Link
              href="/#employers"
              onClick={closeMobile}
              className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Employers
            </Link>

            <Link
              href="/contacts"
              onClick={closeMobile}
              className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Contact
            </Link>

            <div className="flex flex-col gap-3 pt-4">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobile}
                    className="rounded-lg border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)]"
                  >
                    Sign in
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMobile}
                    className="rounded-lg bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-[#080A0D]"
                  >
                    Get started
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      closeMobile();
                      router.push(getDashboardRoute(user.role));
                    }}
                    className="rounded-lg bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-[#080A0D]"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      closeMobile();
                      logout();
                    }}
                    className="rounded-lg border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--muted)]"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
