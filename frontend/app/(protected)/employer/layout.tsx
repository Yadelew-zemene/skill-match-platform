"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusSquare,
  Briefcase,
  Users,
  LogOut,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

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
    {
      name: "Candidates",
      href: "/employer/candidates",
      icon: Users,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* =========================================================
          SIDEBAR
      ========================================================= */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[var(--border)] bg-[var(--surface-soft)] lg:flex lg:flex-col">

        {/* BRAND */}
        <div className="flex h-16 items-center border-b border-[var(--border)] px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-black text-[#080A0D]">
              S
            </div>

            <span className="text-lg font-bold tracking-tight">
              Skill<span className="text-[var(--brand)]">Match</span>
            </span>
          </Link>
        </div>

        {/* WORKSPACE */}
        <div className="border-b border-[var(--border)] px-4 py-5">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-xs font-bold text-[var(--brand)]">
                {user?.name?.charAt(0)?.toUpperCase() || "E"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {user?.name || "Employer"}
                </p>

                <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                  Employer workspace
                </p>
              </div>

              <ChevronDown
                size={15}
                className="ml-auto shrink-0 text-[var(--muted-foreground)]"
              />
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Workspace
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--brand)]/10 text-[var(--brand)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className="shrink-0"
                  />

                  <span>{item.name}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* QUICK ACTION */}
          <div className="mt-8">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Quick action
            </p>

            <Link
              href="/employer/post-jobs"
              className="flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[#080A0D] transition hover:bg-[var(--brand-hover)]"
            >
              <PlusSquare size={17} />
              Post a new job
            </Link>
          </div>
        </nav>

        {/* BOTTOM */}
        <div className="border-t border-[var(--border)] p-4">

          <Link
            href="/"
            className="mb-2 flex items-center rounded-lg px-3 py-2 text-xs text-[var(--muted-foreground)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          >
            ← Back to SkillMatch
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:bg-red-500/5 hover:text-red-400"
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
            TOP HEADER
        ======================================================= */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/95 px-6 backdrop-blur-md lg:px-8">

          {/* MOBILE BRAND */}
          <Link
            href="/"
            className="flex items-center gap-2 lg:hidden"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-black text-[#080A0D]">
              S
            </div>

            <span className="font-bold">
              Skill<span className="text-[var(--brand)]">Match</span>
            </span>
          </Link>

          {/* PAGE CONTEXT */}
          <div className="hidden lg:block">
            <p className="text-xs text-[var(--muted-foreground)]">
              Employer workspace
            </p>

            <p className="mt-0.5 text-sm font-medium">
              {pathname.includes("post-jobs")
                ? "Create a new opportunity"
                : pathname.includes("jobs-posted")
                  ? "Manage your jobs"
                  : pathname.includes("candidates")
                    ? "Discover candidates"
                    : "Hiring overview"}
            </p>
          </div>

          {/* HEADER ACTIONS */}
          <div className="ml-auto flex items-center gap-3">

            {/* NOTIFICATIONS */}
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              aria-label="Notifications"
            >
              <Bell size={18} />

              {/* Notification indicator */}
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            </button>

            {/* USER */}
            <div className="hidden items-center gap-3 border-l border-[var(--border)] pl-4 sm:flex">

              <div className="text-right">
                <p className="max-w-[150px] truncate text-sm font-medium">
                  {user?.name || "Employer"}
                </p>

                <p className="text-xs text-[var(--muted-foreground)]">
                  Employer
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--brand)]">
                {user?.name?.charAt(0)?.toUpperCase() || "E"}
              </div>
            </div>
          </div>
        </header>

        {/* =======================================================
            PAGE CONTENT
        ======================================================= */}
        <main className="min-h-[calc(100vh-4rem)] px-6 py-8 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}