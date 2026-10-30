import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Mail } from "lucide-react";

const platformLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For candidates", href: "/#candidates" },
  { label: "For employers", href: "/#employers" },
];

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contacts" },
  { label: "Sign in", href: "/login" },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group inline-flex w-fit items-center gap-1.5
        text-sm text-[var(--text-secondary)]
        transition-colors duration-200
        hover:text-[var(--primary)]
      "
    >
      <span>{children}</span>

      <ArrowUpRight
        size={13}
        className="
          -translate-x-1 opacity-0
          transition-all duration-200
          group-hover:translate-x-0
          group-hover:opacity-100
        "
      />
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative isolate w-full min-w-0
        overflow-hidden
        border-t border-[var(--border)]
        bg-[var(--surface-soft)]
      "
    >
      {/* Subtle brand background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 -top-32
          h-72 w-72 rounded-full
          bg-[var(--primary)]/8
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 -bottom-32
          h-80 w-80 rounded-full
          bg-[var(--accent)]/8
          blur-3xl
        "
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-30
          [background-image:radial-gradient(#94a3b8_0.7px,transparent_0.7px)]
          [background-size:20px_20px]
        "
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main footer content */}
        <div
          className="
            grid grid-cols-1 gap-10
            border-b border-[var(--border)]
            py-10
            sm:grid-cols-2
            lg:grid-cols-12 lg:gap-8
            lg:py-12
          "
        >
          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-6">
            <Link
              href="/"
              aria-label="SkillMatch home"
              className="group inline-flex items-center gap-3"
            >
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-[var(--primary)]
                  to-[var(--accent)]
                  text-lg font-black text-white
                  shadow-md shadow-indigo-500/20
                  transition-transform duration-300
                  group-hover:scale-105
                "
              >
                S
              </div>

              <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
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

            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              Connecting talent with opportunity through skills, experience,
              and meaningful matches.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
              <BriefcaseBusiness
                size={14}
                className="text-[var(--primary)]"
              />
              <span>Skills first. Opportunities that matter.</span>
            </div>
          </div>

          {/* Platform links */}
          <div className="min-w-0 lg:col-span-3">
            <h3
              className="
                text-xs font-bold uppercase
                tracking-[0.14em]
                text-[var(--foreground)]
              "
            >
              Platform
            </h3>

            <nav className="mt-5 flex flex-col items-start gap-3">
              {platformLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Company links */}
          <div className="min-w-0 lg:col-span-3">
            <h3
              className="
                text-xs font-bold uppercase
                tracking-[0.14em]
                text-[var(--foreground)]
              "
            >
              Company
            </h3>

            <nav className="mt-5 flex flex-col items-start gap-3">
              {companyLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>

            <a
              href="mailto:support@skillmatch.ai"
              className="
                mt-6 inline-flex items-center gap-2
                text-sm text-[var(--text-secondary)]
                transition-colors duration-200
                hover:text-[var(--primary)]
              "
            >
              <Mail
                size={15}
                className="text-[var(--primary)]"
              />
              Contact support
            </a>
          </div>
        </div>

        {/* Bottom footer */}
        <div
          className="
            flex flex-col gap-3
            py-5
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p className="text-xs text-[var(--text-muted)]">
            © {year} SkillMatch. All rights reserved.
          </p>

          <p className="text-xs text-[var(--text-muted)]">
            Addis Ababa, Ethiopia
          </p>

          <p className="text-xs font-medium text-[var(--text-secondary)]">
            Built around skills. Designed for opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}