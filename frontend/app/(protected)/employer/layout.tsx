"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusSquare,
  Briefcase,
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/employer/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Post a job",
      href: "/employer/post-jobs",
      icon: PlusSquare,
    },
    {
      name: "Jobs posted",
      href: "/employer/jobs-posted",
      icon: Briefcase,
    },
   
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const getPageContext = () => {
    if (pathname === "/employer/dashboard") {
      return {
        eyebrow: "Employer workspace",
        title: "Hiring overview",
      };
    }

    if (pathname === "/employer/post-jobs") {
      return {
        eyebrow: "Employer workspace",
        title: "Create a new opportunity",
      };
    }

    if (pathname === "/employer/jobs-posted") {
      return {
        eyebrow: "Employer workspace",
        title: "Manage your jobs",
      };
    }

    if (pathname.includes("/applications")) {
      return {
        eyebrow: "Employer workspace",
        title: "Manage applications",
      };
    }

    if (pathname.includes("/candidates/")) {
      return {
        eyebrow: "Employer workspace",
        title: "Review candidate",
      };
    }

    if (pathname.includes("/candidates")) {
      return {
        eyebrow: "Employer workspace",
        title: "Discover candidates",
      };
    }

    if (pathname.includes("/edit")) {
      return {
        eyebrow: "Employer workspace",
        title: "Edit job",
      };
    }

    if (pathname.startsWith("/employer/jobs/")) {
      return {
        eyebrow: "Employer workspace",
        title: "Job overview",
      };
    }

    return {
      eyebrow: "Employer workspace",
      title: "Hiring overview",
    };
  };

  const pageContext = getPageContext();

  const renderNavigation = (mobile = false) => (
    <nav className={mobile ? "px-4 py-6" : "flex-1 px-4 py-6"}>
      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
        Workspace
      </p>

      <div className="space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={mobile ? closeMobileNav : undefined}
              className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "border border-[var(--primary)]/15 bg-[var(--primary-light)] text-[var(--primary)] shadow-sm"
                  : "border border-transparent text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              }`}
            >
              {/* Active gradient edge */}
              {isActive && (
                <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-[var(--primary)] to-[var(--accent)]" />
              )}

              {/* Hover glow */}
              <span
                className={`pointer-events-none absolute -right-8 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[var(--primary)]/10 blur-2xl transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.8}
                className="relative z-10 shrink-0"
              />

              <span className="relative z-10">{item.name}</span>

              {isActive && (
                <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-sm shadow-[var(--primary)]/50" />
              )}
            </Link>
          );
        })}
      </div>

      {/* QUICK ACTION */}
      <div className="mt-8">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Quick action
        </p>

        <Link
          href="/employer/post-jobs"
          onClick={mobile ? closeMobileNav : undefined}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/20"
        >
          {/* Button shine */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <PlusSquare size={17} className="relative z-10" />

          <span className="relative z-10">Post a new job</span>
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* =========================================================
          GLOBAL ATMOSPHERIC BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Indigo primary glow */}
        <div className="absolute -left-56 -top-48 h-[38rem] w-[38rem] rounded-full bg-[var(--primary)]/8 blur-3xl" />

        {/* Cyan employer-side glow */}
        <div className="absolute -right-56 top-[16rem] h-[40rem] w-[40rem] rounded-full bg-[var(--accent)]/8 blur-3xl" />

        {/* Central color transition */}
        <div className="absolute left-1/2 top-[30rem] h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--primary)]/[0.035] via-transparent to-[var(--accent)]/[0.035] blur-3xl" />

        {/* Subtle bottom atmosphere */}
        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[50rem] -translate-x-1/2 bg-gradient-to-t from-[var(--primary)]/[0.025] to-transparent" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl lg:flex lg:flex-col">
        {/* Sidebar atmospheric glow */}
        <div className="pointer-events-none absolute left-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-[var(--primary)]/8 blur-3xl" />

        {/* =======================================================
            BRAND
        ======================================================= */}
        <div className="relative flex h-16 items-center border-b border-[var(--border)] px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-black text-white shadow-md shadow-[var(--primary)]/20 transition-transform duration-300 group-hover:scale-105">
              <span className="relative z-10">S</span>

              <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Skill<span className="text-[var(--primary)]">Match</span>
            </span>
          </Link>
        </div>

        {/* =======================================================
            WORKSPACE IDENTITY
        ======================================================= */}
        <div className="relative border-b border-[var(--border)] px-4 py-5">
          <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-md">
            {/* Card glow */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[var(--primary)]/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-center gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 text-xs font-bold text-[var(--primary)] ring-1 ring-[var(--primary)]/10">
                {user?.name?.charAt(0)?.toUpperCase() || "E"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {user?.name || "Employer"}
                </p>

                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  Employer workspace
                </p>
              </div>

              <ChevronDown
                size={15}
                className="ml-auto shrink-0 text-[var(--text-muted)]"
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            NAVIGATION
        ======================================================= */}
        {renderNavigation()}

        {/* =======================================================
            BOTTOM
        ======================================================= */}
        <div className="relative border-t border-[var(--border)] p-4">
          <Link
            href="/"
            className="group mb-2 flex items-center justify-between rounded-xl px-3 py-2 text-xs text-[var(--text-muted)] transition-all duration-300 hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            <span>Back to SkillMatch</span>

            <ArrowUpRight
              size={14}
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </Link>

          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all duration-300 hover:bg-red-500/5 hover:text-red-500"
          >
            <LogOut
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Sign out
          </button>
        </div>
      </aside>

      {/* =========================================================
          MOBILE DRAWER BACKDROP
      ========================================================= */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileNav}
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =========================================================
          MOBILE SIDEBAR
      ========================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(20rem,88vw)] flex-col border-r border-[var(--border)] bg-[var(--background)]/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile brand */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-5">
          <Link
            href="/"
            onClick={closeMobileNav}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-black text-white shadow-md shadow-[var(--primary)]/20">
              S
            </div>

            <span className="font-bold tracking-tight">
              Skill<span className="text-[var(--primary)]">Match</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMobileNav}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile workspace */}
        <div className="border-b border-[var(--border)] px-4 py-5">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-xs font-bold text-[var(--primary)]">
                {user?.name?.charAt(0)?.toUpperCase() || "E"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {user?.name || "Employer"}
                </p>

                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  Employer workspace
                </p>
              </div>
            </div>
          </div>
        </div>

        {renderNavigation(true)}

        <div className="mt-auto border-t border-[var(--border)] p-4">
          <Link
            href="/"
            onClick={closeMobileNav}
            className="mb-2 flex items-center justify-between rounded-xl px-3 py-2 text-xs text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            <span>Back to SkillMatch</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-red-500/5 hover:text-red-500"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <div className="lg:pl-64">
        {/* =======================================================
            MOBILE TOP BAR
        ======================================================= */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/85 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:border-[var(--primary)]/20 hover:text-[var(--primary)]"
          >
            <Menu size={19} />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-black text-white">
              S
            </div>

            <span className="font-bold tracking-tight">
              Skill<span className="text-[var(--primary)]">Match</span>
            </span>
          </Link>

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
            aria-label="Notifications"
          >
            <Bell size={17} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          </button>
        </header>

        {/* =======================================================
            DESKTOP TOP HEADER
        ======================================================= */}
        <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/85 px-6 backdrop-blur-xl lg:flex lg:px-8">
          {/* Page context */}
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />

              <p className="text-xs font-medium text-[var(--text-muted)]">
                {pageContext.eyebrow}
              </p>
            </div>

            <p className="mt-0.5 text-sm font-semibold">{pageContext.title}</p>
          </div>

          {/* Header actions */}
          <div className="ml-auto flex items-center gap-3">
            {/* Notifications */}
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--primary)]/20 hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
              aria-label="Notifications"
            >
              <Bell size={18} />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-sm shadow-[var(--primary)]/50" />
            </button>

            {/* User */}
            <div className="hidden items-center gap-3 border-l border-[var(--border)] pl-4 sm:flex">
              <div className="text-right">
                <p className="max-w-[150px] truncate text-sm font-medium">
                  {user?.name || "Employer"}
                </p>

                <p className="text-xs text-[var(--text-muted)]">Employer</p>
              </div>

              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] text-xs font-bold text-[var(--primary)]">
                {user?.name?.charAt(0)?.toUpperCase() || "E"}
              </div>
            </div>
          </div>
        </header>

        {/* =======================================================
            PAGE CONTENT
        ======================================================= */}
        <main className="relative min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
