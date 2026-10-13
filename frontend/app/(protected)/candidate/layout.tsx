"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import {
  getCandidateProfile,
  getCandidateProfilePhoto,
} from "@/services/profile.service";

type NavItem = {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const workspaceItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/candidate/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Find jobs",
    href: "/candidate/jobs",
    icon: Search,
  },
  {
    name: "Applications",
    href: "/candidate/applications",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/candidate/profile",
    icon: UserRound,
  },
];

const accountItems: NavItem[] = [
  {
    name: "Settings",
    href: "/candidate/settings",
    icon: Settings,
  },
];

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
   
   useEffect(() => {
  let objectUrl: string | null = null;

  const loadProfilePhoto = async () => {
    if (!user) {
      setProfilePhotoUrl(null);
      return;
    }

    try {
      const response = await getCandidateProfile();

      if (!response.profile.profile_image_path) {
        setProfilePhotoUrl(null);
        return;
      }

      objectUrl = await getCandidateProfilePhoto();
      setProfilePhotoUrl(objectUrl);
    } catch (error) {
      console.error("Failed to load candidate profile photo:", error);
      setProfilePhotoUrl(null);
    }
  };

  loadProfilePhoto();

  return () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  };
   }, [user]);

  const isActive = (href: string) => {
    if (href === "/candidate/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getPageContext = () => {
    if (pathname === "/candidate/dashboard") {
      return {
        eyebrow: "Candidate workspace",
        title: "Your opportunity overview",
      };
    }

    if (pathname.startsWith("/candidate/jobs/")) {
      return {
        eyebrow: "Job opportunity",
        title: "Opportunity details",
      };
    }

    if (pathname.startsWith("/candidate/jobs")) {
      return {
        eyebrow: "Discover opportunities",
        title: "Find jobs that fit your skills",
      };
    }

    if (pathname.startsWith("/candidate/applications")) {
      return {
        eyebrow: "Application tracking",
        title: "Your applications",
      };
    }

    if (pathname.startsWith("/candidate/profile")) {
      return {
        eyebrow: "Candidate profile",
        title: "Your professional profile",
      };
    }

    if (pathname.startsWith("/candidate/settings")) {
      return {
        eyebrow: "Account settings",
        title: "Manage your account",
      };
    }

    return {
      eyebrow: "Candidate workspace",
      title: "SkillMatch",
    };
  };

  const pageContext = getPageContext();

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    router.push("/login");
  };

  const handleNavigation = () => {
    setMobileMenuOpen(false);
  };

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling while the mobile navigation is open.
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);
 
  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const active = isActive(item.href);
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={handleNavigation}
          className={`
            group relative flex items-center gap-3 rounded-xl
            px-3.5 py-3
            text-sm font-medium
            transition-all duration-200
            ${
              active
                ? "bg-[var(--primary-light)] text-[var(--primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
            }
          `}
        >
          {active && (
            <span
              className="
                absolute bottom-2 left-0 top-2
                w-0.5 rounded-r-full
                bg-gradient-to-b
                from-[var(--primary)]
                to-[var(--accent)]
              "
            />
          )}

          <Icon
            size={18}
            strokeWidth={active ? 2.2 : 1.8}
            className={`
              shrink-0 transition-transform duration-200
              ${!active ? "group-hover:scale-105" : ""}
            `}
          />

          <span>{item.name}</span>

          {active && (
            <span
              className="
                ml-auto h-1.5 w-1.5 rounded-full
                bg-[var(--primary)]
                shadow-sm
              "
            />
          )}
        </Link>
      );
    });
  };

  const candidateInitial = user?.name?.charAt(0)?.toUpperCase() || "C";
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ================================================================
          DESKTOP SIDEBAR
      ================================================================= */}

      <aside
        className="
          fixed inset-y-0 left-0 z-40
          hidden w-64
          border-r border-[var(--border)]
          bg-[var(--surface)]
          lg:flex lg:flex-col
        "
      >
        {/* BRAND */}

        <div className="flex h-16 shrink-0 items-center border-b border-[var(--border)] px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative">
              <div
                className="
                  absolute inset-0 rounded-lg
                  bg-gradient-to-br
                  from-[var(--primary)]
                  to-[var(--accent)]
                  opacity-30 blur-md
                  transition-opacity duration-300
                  group-hover:opacity-60
                "
              />

              <div
                className="
                  relative flex h-8 w-8 items-center justify-center
                  rounded-lg
                  bg-gradient-to-br
                  from-[var(--primary)]
                  to-[var(--accent)]
                  text-sm font-black text-white
                  shadow-sm
                "
              >
                S
              </div>
            </div>

            <span className="text-lg font-bold tracking-tight">
              Skill
              <span
                className="
                  bg-gradient-to-r
                  from-[var(--primary)]
                  to-[var(--accent)]
                  bg-clip-text
                  text-transparent
                "
              >
                Match
              </span>
            </span>
          </Link>
        </div>

        {/* WORKSPACE IDENTITY */}

        <div className="shrink-0 border-b border-[var(--border)] p-4">
          <div
            className="
              rounded-2xl
              border border-[var(--border)]
              bg-gradient-to-br
              from-[var(--surface-soft)]
              to-[var(--surface)]
              p-3
              transition-all duration-300
              hover:border-[var(--primary)]/20
              hover:shadow-sm
            "
          >
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div
                  className="
                    absolute inset-0 rounded-xl
                    bg-[var(--primary)]/20
                    blur-md
                  "
                />

                <div
                  className="
                    relative flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[var(--primary)]
                    to-[var(--accent)]
                    text-sm font-bold text-white
                  "
                >
                  {profilePhotoUrl ? (
                    <img
                      src={profilePhotoUrl}
                      alt={`${user?.name || "Candidate"} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    candidateInitial
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user?.name || "Candidate"}
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />

                  <p className="truncate text-xs text-[var(--text-muted)]">
                    Candidate workspace
                  </p>
                </div>
              </div>

              <ChevronDown
                size={15}
                className="shrink-0 text-[var(--text-muted)]"
              />
            </div>
          </div>
        </div>

        {/* NAVIGATION */}

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
          <p
            className="
              mb-3 px-3
              text-[10px] font-semibold uppercase
              tracking-[0.14em]
              text-[var(--text-muted)]
            "
          >
            Workspace
          </p>

          <nav className="space-y-1">{renderNavItems(workspaceItems)}</nav>

          {/* DISCOVERY CARD */}

          <div className="mt-8">
            <p
              className="
                mb-3 px-3
                text-[10px] font-semibold uppercase
                tracking-[0.14em]
                text-[var(--text-muted)]
              "
            >
              Discover
            </p>

            <Link
              href="/candidate/jobs"
              className="
                group relative block overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                from-[var(--primary)]
                to-[var(--accent)]
                p-px
                shadow-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-[var(--primary)]/15
              "
            >
              <div
                className="
                  relative overflow-hidden
                  rounded-[15px]
                  bg-gradient-to-br
                  from-[var(--primary)]
                  to-[var(--accent)]
                  px-4 py-4
                  text-white
                "
              >
                <div
                  className="
                    absolute -right-6 -top-6
                    h-24 w-24 rounded-full
                    bg-white/15 blur-2xl
                    transition-transform duration-500
                    group-hover:scale-125
                  "
                />

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} />

                    <span className="text-sm font-semibold">
                      Find your next role
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-white/75">
                    Explore opportunities matched to your skills and experience.
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
                    Explore jobs
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* ACCOUNT */}

          <div className="mt-8">
            <p
              className="
                mb-3 px-3
                text-[10px] font-semibold uppercase
                tracking-[0.14em]
                text-[var(--text-muted)]
              "
            >
              Account
            </p>

            <nav className="space-y-1">{renderNavItems(accountItems)}</nav>
          </div>
        </div>

        {/* FOOTER */}

        <div className="shrink-0 border-t border-[var(--border)] p-4">
          <Link
            href="/"
            className="
              mb-1 flex items-center rounded-xl
              px-3 py-2.5
              text-xs font-medium
              text-[var(--text-muted)]
              transition-all duration-200
              hover:bg-[var(--surface-soft)]
              hover:text-[var(--foreground)]
            "
          >
            ← Back to SkillMatch
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3
              rounded-xl
              px-3 py-2.5
              text-sm font-medium
              text-[var(--text-secondary)]
              transition-all duration-200
              hover:bg-red-500/5
              hover:text-red-500
            "
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ================================================================
          MOBILE NAVIGATION OVERLAY
      ================================================================= */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}

          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="
              absolute inset-0
              bg-slate-950/30
              backdrop-blur-sm
            "
          />

          {/* Drawer */}

          <aside
            className="
              absolute inset-y-0 left-0
              flex w-[min(86vw,340px)]
              flex-col
              border-r border-[var(--border)]
              bg-[var(--surface)]
              shadow-2xl
            "
          >
            {/* Drawer header */}

            <div
              className="
                flex h-16 shrink-0
                items-center justify-between
                border-b border-[var(--border)]
                px-5
              "
            >
              <Link
                href="/"
                onClick={handleNavigation}
                className="flex items-center gap-2.5"
              >
                <div
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-lg
                    bg-gradient-to-br
                    from-[var(--primary)]
                    to-[var(--accent)]
                    text-sm font-black text-white
                  "
                >
                  S
                </div>

                <span className="font-bold tracking-tight">
                  Skill
                  <span
                    className="
                      bg-gradient-to-r
                      from-[var(--primary)]
                      to-[var(--accent)]
                      bg-clip-text text-transparent
                    "
                  >
                    Match
                  </span>
                </span>
              </Link>

              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--text-secondary)]
                  transition-all duration-200
                  hover:bg-[var(--surface-soft)]
                  hover:text-[var(--foreground)]
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Mobile workspace identity */}

            <div className="shrink-0 border-b border-[var(--border)] p-4">
              <div
                className="
                  rounded-2xl
                  border border-[var(--primary)]/15
                  bg-gradient-to-br
                  from-[var(--primary-light)]
                  to-[var(--accent-light)]
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-[var(--primary)]
                      to-[var(--accent)]
                      text-sm font-bold text-white
                      shadow-sm
                    "
                  >
                    {profilePhotoUrl ? (
                      <img
                        src={profilePhotoUrl}
                        alt={`${user?.name || "Candidate"} profile`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      candidateInitial
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user?.name || "Candidate"}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      Candidate workspace
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile nav */}

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
              <p
                className="
                  mb-3 px-3
                  text-[10px] font-semibold uppercase
                  tracking-[0.14em]
                  text-[var(--text-muted)]
                "
              >
                Workspace
              </p>

              <nav className="space-y-1">{renderNavItems(workspaceItems)}</nav>

              <div className="mt-7">
                <p
                  className="
                    mb-3 px-3
                    text-[10px] font-semibold uppercase
                    tracking-[0.14em]
                    text-[var(--text-muted)]
                  "
                >
                  Account
                </p>

                <nav className="space-y-1">{renderNavItems(accountItems)}</nav>
              </div>

              <Link
                href="/candidate/jobs"
                onClick={handleNavigation}
                className="
                  mt-7 block rounded-2xl
                  bg-gradient-to-br
                  from-[var(--primary)]
                  to-[var(--accent)]
                  p-4 text-white
                  shadow-lg
                  shadow-[var(--primary)]/15
                "
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />

                  <span className="text-sm font-semibold">
                    Find your next role
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-white/75">
                  Explore opportunities matched to your skills and experience.
                </p>
              </Link>
            </div>

            {/* Mobile footer */}

            <div className="shrink-0 border-t border-[var(--border)] p-4">
              <Link
                href="/"
                onClick={handleNavigation}
                className="
                  mb-1 flex items-center rounded-xl
                  px-3 py-2.5
                  text-xs font-medium
                  text-[var(--text-muted)]
                  hover:bg-[var(--surface-soft)]
                  hover:text-[var(--foreground)]
                "
              >
                ← Back to SkillMatch
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex w-full items-center gap-3
                  rounded-xl px-3 py-2.5
                  text-sm font-medium
                  text-[var(--text-secondary)]
                  transition-colors duration-200
                  hover:bg-red-500/5
                  hover:text-red-500
                "
              >
                <LogOut size={18} />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ================================================================
          MAIN APPLICATION AREA
      ================================================================= */}

      <div className="lg:pl-64">
        {/* ==============================================================
            RESPONSIVE TOP HEADER
        ============================================================== */}

        <header
          className="
            sticky top-0 z-30
            flex h-16
            items-center justify-between
            border-b border-[var(--border)]
            bg-[var(--background)]/90
            px-4
            backdrop-blur-xl
            sm:px-6
            lg:px-8
          "
        >
          {/* MOBILE MENU + BRAND */}

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--text-secondary)]
                shadow-sm
                transition-all duration-200
                hover:border-[var(--primary)]/30
                hover:text-[var(--primary)]
              "
            >
              <Menu size={19} />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg
                  bg-gradient-to-br
                  from-[var(--primary)]
                  to-[var(--accent)]
                  text-sm font-black text-white
                "
              >
                S
              </div>

              <span className="hidden font-bold tracking-tight xs:block">
                Skill
                <span
                  className="
                    bg-gradient-to-r
                    from-[var(--primary)]
                    to-[var(--accent)]
                    bg-clip-text text-transparent
                  "
                >
                  Match
                </span>
              </span>
            </Link>
          </div>

          {/* DESKTOP CONTEXT */}

          <div className="hidden lg:block">
            <p className="text-xs text-[var(--text-muted)]">
              {pageContext.eyebrow}
            </p>

            <p className="mt-0.5 text-sm font-semibold">{pageContext.title}</p>
          </div>

          {/* MOBILE PAGE CONTEXT */}

          <div className="absolute left-1/2 hidden -translate-x-1/2 text-center sm:block lg:hidden">
            <p className="max-w-[220px] truncate text-sm font-semibold">
              {pageContext.title}
            </p>
          </div>

          {/* HEADER ACTIONS */}

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Notifications */}

            <button
              type="button"
              aria-label="Notifications"
              className="
                relative flex h-10 w-10
                items-center justify-center
                rounded-xl
                border border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--text-secondary)]
                shadow-sm
                transition-all duration-200
                hover:border-[var(--border-strong)]
                hover:bg-[var(--surface-soft)]
                hover:text-[var(--foreground)]
              "
            >
              <Bell size={18} />

              <span
                className="
                  absolute right-2.5 top-2.5
                  h-1.5 w-1.5 rounded-full
                  bg-[var(--primary)]
                  shadow-sm shadow-[var(--primary)]/40
                "
              />
            </button>

            {/* Desktop user */}

            <div
              className="
                hidden items-center gap-3
                border-l border-[var(--border)]
                pl-4
                sm:flex
              "
            >
              <div className="text-right">
                <p className="max-w-[150px] truncate text-sm font-medium">
                  {user?.name || "Candidate"}
                </p>

                <p className="text-xs text-[var(--text-muted)]">Candidate</p>
              </div>

              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-xl
                  border border-[var(--border)]
                  bg-gradient-to-br
                  from-[var(--primary-light)]
                  to-[var(--accent-light)]
                  text-xs font-bold
                  text-[var(--primary)]
                "
              >
                {profilePhotoUrl ? (
                  <img
                    src={profilePhotoUrl}
                    alt={`${user?.name || "Candidate"} profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  candidateInitial
                )}
              </div>
            </div>

            {/* Mobile avatar */}

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                border border-[var(--border)]
                bg-gradient-to-br
                from-[var(--primary-light)]
                to-[var(--accent-light)]
                text-xs font-bold
                text-[var(--primary)]
                sm:hidden
              "
            >
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt={`${user?.name || "Candidate"} profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                candidateInitial
              )}
            </div>
          </div>
        </header>

        {/* ==============================================================
            PAGE CONTENT

            Important:
            Candidate pages render ONLY here.
            They do not create another navbar/sidebar.
        ============================================================== */}

        <main
          className="
            min-h-[calc(100vh-4rem)]
            px-4 py-6
            sm:px-6 sm:py-8
            lg:px-8 lg:py-10
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
