"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardRoute } from "@/utils/redirect";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For Candidates", href: "/#candidates" },
  { label: "For Employers", href: "/#employers" },
  { label: "Contact", href: "/contacts" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleDashboard = () => {
    closeMobile();
    if (user?.role) {
      router.push(getDashboardRoute(user.role));
    }
  };

  const handleLogout = () => {
    closeMobile();
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dce7fa] bg-[#eef4ff]/90 backdrop-blur-xl backdrop-saturate-150 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobile}
          aria-label="SkillMatch home"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-sm font-black text-white shadow-sm shadow-[var(--primary)]/20 transition-transform duration-200 group-hover:scale-105">
            S
          </div>

          <span className="text-lg font-extrabold tracking-tight text-[var(--text-primary)]">
            Skill<span className="text-[var(--primary)]">Match</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full border border-[#dce7fa] bg-white/65 p-1 backdrop-blur-sm md:flex"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                  active
                    ? "bg-[#dce9ff] text-[#2443a8] shadow-sm"
                    : "text-[#475467] hover:bg-[#e3edff] hover:text-[#2443a8]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 sm:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3.5 py-2 text-xs font-semibold text-[#475467] transition-colors duration-200 hover:bg-white/70 hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-[var(--primary)]/20 transition-all duration-200 hover:bg-[var(--primary-hover)] hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Get started
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleDashboard}
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-[var(--primary)]/20 transition-all duration-200 hover:bg-[var(--primary-hover)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-[#dce7fa] bg-white/60 px-3.5 py-2 text-xs font-semibold text-[#475467] transition-colors duration-200 hover:border-[var(--error)]/30 hover:bg-[var(--error-light)] hover:text-[var(--error)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--error)]"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce7fa] bg-white/60 text-[#3157d5] transition-colors duration-200 hover:bg-[#dce9ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] sm:hidden"
        >
          <span
            aria-hidden="true"
            className="relative flex h-3.5 w-4 flex-col justify-between"
          >
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ease-in-out ${
                mobileOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ease-in-out ${
                mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          onClick={closeMobile}
          aria-hidden="true"
          className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Mobile Navigation Panel */}
      <div
        className={`absolute left-0 right-0 top-16 z-50 border-b border-[#dce7fa] bg-[#f5f8ff] px-4 py-6 shadow-xl transition-all duration-200 ease-in-out sm:hidden ${
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-150 ${
                  active
                    ? "bg-[#dce9ff] text-[#2443a8]"
                    : "text-[#475467] hover:bg-[#e3edff] hover:text-[#2443a8]"
                }`}
              >
                <span>{item.label}</span>

                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3157d5]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Action Buttons */}
        <div className="mt-6 border-t border-[#dce7fa] pt-4">
          {!user ? (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                className="flex items-center justify-center rounded-lg border border-[#dce7fa] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#172033] transition-colors hover:bg-[#e3edff]"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="flex items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--primary-hover)]"
              >
                Get started
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleDashboard}
                className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--primary-hover)]"
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg border border-[#dce7fa] bg-white px-4 py-2.5 text-sm font-semibold text-[#475467] transition-colors hover:border-[var(--error)]/30 hover:bg-[var(--error-light)] hover:text-[var(--error)]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
