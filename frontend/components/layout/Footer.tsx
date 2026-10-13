// import Link from "next/link";
// import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

// const platformLinks = [
//   { label: "Home", href: "/" },
//   { label: "How it works", href: "/#how-it-works" },
//   { label: "Candidates", href: "/#candidates" },
//   { label: "Employers", href: "/#employers" },
// ];

// const companyLinks = [
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contacts" },
//   { label: "Sign in", href: "/login" },
// ];

// function FooterLink({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <Link
//       href={href}
//       className="
//         group inline-flex items-center gap-1.5
//         text-sm
//         text-[var(--text-secondary)]
//         transition-colors duration-200
//         hover:text-[var(--primary)]
//       "
//     >
//       <span>{children}</span>

//       <ArrowUpRight
//         size={13}
//         className="
//           -translate-x-1
//           opacity-0
//           transition-all duration-200
//           group-hover:translate-x-0
//           group-hover:opacity-100
//         "
//       />
//     </Link>
//   );
// }

// function SocialLink({
//   href,
//   label,
//   children,
// }: {
//   href: string;
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noreferrer"
//       aria-label={label}
//       className="
//         flex h-9 w-9 items-center justify-center
//         rounded-xl
//         border border-[var(--border)]
//         bg-[var(--surface)]
//         text-[var(--text-secondary)]
//         shadow-sm
//         transition-all duration-200
//         hover:-translate-y-0.5
//         hover:border-[var(--primary)]/30
//         hover:bg-[var(--primary-light)]
//         hover:text-[var(--primary)]
//         hover:shadow-md
//       "
//     >
//       {children}
//     </a>
//   );
// }

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer
//       className="
//         relative overflow-hidden
//         border-t border-[var(--border)]
//         bg-[var(--surface-soft)]
//       "
//     >
//       {/* ================================================================
//           AMBIENT BACKGROUND
//       ================================================================= */}

//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none absolute
//           -left-40 -top-32
//           h-80 w-80
//           rounded-full
//           bg-[var(--primary)]/7
//           blur-3xl
//         "
//       />

//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none absolute
//           -right-40 top-24
//           h-96 w-96
//           rounded-full
//           bg-[var(--accent)]/7
//           blur-3xl
//         "
//       />

//       {/* ================================================================
//           FOOTER CONTENT
//       ================================================================= */}

//       <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
//         {/* ==============================================================
//             TOP FOOTER
//         ============================================================== */}

//         <div
//           className="
//             grid grid-cols-1
//             gap-12
//             border-b border-[var(--border)]
//             py-14
//             md:grid-cols-12
//             lg:py-16
//           "
//         >
//           {/* ============================================================
//               BRAND
//           ============================================================= */}

//           <div className="md:col-span-6 lg:col-span-7">
//             <Link
//               href="/"
//               aria-label="SkillMatch home"
//               className="group inline-flex items-center gap-3"
//             >
//               <div
//                 className="
//                   relative flex h-11 w-11
//                   items-center justify-center
//                   overflow-hidden
//                   rounded-xl
//                   bg-gradient-to-br
//                   from-[var(--primary)]
//                   to-[var(--accent)]
//                   text-sm font-black text-white
//                   shadow-sm
//                   transition-all duration-300
//                   group-hover:scale-105
//                   group-hover:shadow-lg
//                 "
//               >
//                 <span className="relative z-10">S</span>

//                 <span
//                   aria-hidden="true"
//                   className="
//                     absolute -right-4 -top-4
//                     h-9 w-9
//                     rounded-full
//                     bg-white/20
//                     blur-md
//                     transition-transform duration-500
//                     group-hover:translate-x-2
//                     group-hover:translate-y-2
//                   "
//                 />
//               </div>

//               <span
//                 className="
//                   text-xl font-bold
//                   tracking-tight
//                   text-[var(--foreground)]
//                 "
//               >
//                 Skill
//                 <span
//                   className="
//                     bg-gradient-to-r
//                     from-[var(--primary)]
//                     to-[var(--accent)]
//                     bg-clip-text
//                     text-transparent
//                   "
//                 >
//                   Match
//                 </span>
//               </span>
//             </Link>

//             <p
//               className="
//                 mt-5 max-w-lg
//                 text-sm leading-6
//                 text-[var(--text-secondary)]
//               "
//             >
//               A skill-based talent platform connecting people with opportunities
//               that align with what they can actually do.
//             </p>

//             {/* Principles */}

//             <div className="mt-6 flex flex-wrap gap-2">
//               {[
//                 "Skills first",
//                 "Relevant matches",
//                 "Opportunity for both sides",
//               ].map((item) => (
//                 <span
//                   key={item}
//                   className="
//                     rounded-full
//                     border border-[var(--border)]
//                     bg-[var(--surface)]
//                     px-3 py-1.5
//                     text-xs font-medium
//                     text-[var(--text-secondary)]
//                     transition-all duration-200
//                     hover:border-[var(--primary)]/25
//                     hover:text-[var(--primary)]
//                   "
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* ============================================================
//               PLATFORM
//           ============================================================= */}

//           <div className="md:col-span-3 lg:col-span-2">
//             <h3
//               className="
//                 text-[11px] font-bold uppercase
//                 tracking-[0.16em]
//                 text-[var(--foreground)]
//               "
//             >
//               Platform
//             </h3>

//             <nav className="mt-5 flex flex-col items-start gap-3.5">
//               {platformLinks.map((link) => (
//                 <FooterLink key={link.href} href={link.href}>
//                   {link.label}
//                 </FooterLink>
//               ))}
//             </nav>
//           </div>

//           {/* ============================================================
//               COMPANY
//           ============================================================= */}

//           <div className="md:col-span-3 lg:col-span-3">
//             <h3
//               className="
//                 text-[11px] font-bold uppercase
//                 tracking-[0.16em]
//                 text-[var(--foreground)]
//               "
//             >
//               Company
//             </h3>

//             <nav className="mt-5 flex flex-col items-start gap-3.5">
//               {companyLinks.map((link) => (
//                 <FooterLink key={link.href} href={link.href}>
//                   {link.label}
//                 </FooterLink>
//               ))}
//             </nav>

//             {/* Contact */}

//             <a
//               href="mailto:support@skillmatch.ai"
//               className="
//                 group mt-6 inline-flex items-center gap-2.5
//                 text-sm font-medium
//                 text-[var(--text-secondary)]
//                 transition-colors duration-200
//                 hover:text-[var(--primary)]
//               "
//             >
//               <span
//                 className="
//                   flex h-8 w-8
//                   items-center justify-center
//                   rounded-lg
//                   border border-[var(--primary)]/10
//                   bg-[var(--primary-light)]
//                   text-[var(--primary)]
//                 "
//               >
//                 <Mail size={15} />
//               </span>

//               <span>support@skillmatch.ai</span>
//             </a>
//           </div>
//         </div>

//         {/* ==============================================================
//             LOWER FOOTER
//         ============================================================== */}

//         <div
//           className="
//             flex flex-col gap-6
//             py-6
//             sm:flex-row
//             sm:items-center
//             sm:justify-between
//           "
//         >
//           {/* Copyright */}

//           <div
//             className="
//               flex flex-col gap-1
//               sm:flex-row
//               sm:items-center
//               sm:gap-3
//             "
//           >
//             <p className="text-xs text-[var(--text-muted)]">
//               © {year} SkillMatch
//             </p>

//             <span
//               className="
//                 hidden h-1 w-1 rounded-full
//                 bg-[var(--border-strong)]
//                 sm:block
//               "
//             />

//             <p className="text-xs text-[var(--text-muted)]">
//               Addis Ababa, Ethiopia
//             </p>
//           </div>

//           {/* Social */}

//           <div className="flex items-center gap-2">
//             <SocialLink
//               href="https://www.linkedin.com"
//               label="SkillMatch on LinkedIn"
//             >
//               <Linkedin size={15} />
//             </SocialLink>

//             <SocialLink href="https://github.com" label="SkillMatch on GitHub">
//               <Github size={15} />
//             </SocialLink>
//           </div>

//           {/* Tagline */}

//           <p
//             className="
//               text-xs
//               text-[var(--text-muted)]
//               sm:text-right
//             "
//           >
//             Built around skills. Designed for opportunity.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const platformLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Candidates", href: "/#candidates" },
  { label: "Employers", href: "/#employers" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contacts" },
  { label: "Sign in", href: "/login" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Settings", href: "#" },
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
        group inline-flex items-center gap-1.5
        text-sm font-medium
        text-[var(--text-secondary,#64748b)]
        transition-colors duration-200
        hover:text-[var(--primary,#2563eb)]
      "
    >
      <span>{children}</span>
      <ArrowUpRight
        size={13}
        className="
          -translate-x-1 opacity-0
          transition-all duration-200
          group-hover:translate-x-0 group-hover:opacity-100
        "
      />
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="
        flex h-9 w-9 items-center justify-center
        rounded-xl
        border border-[var(--border,#e2e8f0)]
        bg-[var(--surface,#ffffff)]
        text-[var(--text-secondary,#64748b)]
        shadow-xs
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-[var(--primary,#2563eb)]/30
        hover:bg-[var(--primary-light,#eff6ff)]
        hover:text-[var(--primary,#2563eb)]
        hover:shadow-md
      "
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative overflow-hidden
        border-t border-[var(--border,#e2e8f0)]
        bg-[var(--surface-soft,#f8fafc)]
      "
    >
      {/* ================================================================
          BACKGROUND GRAPHICS & GLOWS
      ================================================================= */}
      {/* Grid Pattern Overlay */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]
          [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]
          opacity-40
        "
      />

      {/* Ambient Lighting */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 -top-32
          h-96 w-96
          rounded-full
          bg-[var(--primary,#2563eb)]/10
          blur-3xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 top-1/2
          h-96 w-96
          rounded-full
          bg-[var(--accent,#8b5cf6)]/10
          blur-3xl
        "
      />

      {/* ================================================================
          MAIN CONTAINER
      ================================================================= */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 gap-12 border-b border-[var(--border,#e2e8f0)] py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-5">
            <Link
              href="/"
              aria-label="SkillMatch Home"
              className="group inline-flex items-center gap-3"
            >
              <div
                className="
                  relative flex h-11 w-11
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-br from-[var(--primary,#2563eb)] to-[var(--accent,#8b5cf6)]
                  text-base font-black text-white
                  shadow-md shadow-blue-500/20
                  transition-all duration-300
                  group-hover:scale-105 group-hover:shadow-lg
                "
              >
                <span className="relative z-10">S</span>
                <span
                  aria-hidden="true"
                  className="
                    absolute -right-4 -top-4
                    h-9 w-9 rounded-full bg-white/25
                    blur-md
                    transition-transform duration-500
                    group-hover:translate-x-2 group-hover:translate-y-2
                  "
                />
              </div>

              <span className="text-2xl font-bold tracking-tight text-[var(--foreground,#0f172a)]">
                Skill
                <span className="bg-gradient-to-r from-[var(--primary,#2563eb)] to-[var(--accent,#8b5cf6)] bg-clip-text text-transparent">
                  Match
                </span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary,#64748b)]">
              Next-generation talent matching powered by verified capabilities.
              We bridge the gap between skilled individuals and forward-thinking
              companies.
            </p>

            {/* Platform Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "Skills First", icon: Sparkles },
                { label: "Verified Profile", icon: ShieldCheck },
              ].map((item) => (
                <span
                  key={item.label}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full border border-[var(--border,#e2e8f0)]
                    bg-[var(--surface,#ffffff)]/80
                    px-3 py-1 text-xs font-medium
                    text-[var(--text-secondary,#64748b)]
                    backdrop-blur-xs
                    transition-all duration-200
                    hover:border-[var(--primary,#2563eb)]/30 hover:text-[var(--primary,#2563eb)]
                  "
                >
                  <item.icon
                    size={12}
                    className="text-[var(--primary,#2563eb)]"
                  />
                  {item.label}
                </span>
              ))}
            </div>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground,#0f172a)]">
                Stay updated
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-2.5 flex max-w-md items-center gap-2"
              >
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary,#64748b)]"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="
                      w-full rounded-xl border border-[var(--border,#e2e8f0)]
                      bg-[var(--surface,#ffffff)]
                      py-2 pl-9 pr-3 text-sm
                      text-[var(--foreground,#0f172a)] placeholder:text-[var(--text-muted,#94a3b8)]
                      shadow-2xs transition-all duration-200
                      focus:border-[var(--primary,#2563eb)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary,#2563eb)]/15
                    "
                  />
                </div>
                <button
                  type="submit"
                  className="
                    inline-flex items-center justify-center gap-1.5
                    rounded-xl bg-[var(--primary,#2563eb)]
                    px-4 py-2 text-sm font-medium text-white
                    shadow-sm transition-all duration-200
                    hover:bg-[var(--primary,#2563eb)]/90 hover:shadow-md
                    active:scale-95
                  "
                >
                  <span>Subscribe</span>
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Column 1: Platform */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground,#0f172a)]">
                Platform
              </h3>
              <nav className="flex flex-col gap-3">
                {platformLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground,#0f172a)]">
                Company
              </h3>
              <nav className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="col-span-2 space-y-4 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground,#0f172a)]">
                Legal & Support
              </h3>
              <nav className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </nav>

              <div className="pt-2">
                <a
                  href="mailto:support@skillmatch.ai"
                  className="
                    group inline-flex items-center gap-2
                    text-xs font-medium text-[var(--text-secondary,#64748b)]
                    transition-colors duration-200 hover:text-[var(--primary,#2563eb)]
                  "
                >
                  <Mail size={14} className="text-[var(--primary,#2563eb)]" />
                  <span>support@skillmatch.ai</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div
          className="
            flex flex-col gap-6 py-6
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          {/* Copyright & Location */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted,#94a3b8)]">
            <p>© {year} SkillMatch Inc. All rights reserved.</p>
            <span className="hidden h-1 w-1 rounded-full bg-[var(--border,#e2e8f0)] sm:block" />
            <p>Addis Ababa, Ethiopia</p>
          </div>

          {/* System Status & Social Links */}
          <div className="flex items-center gap-6">
            {/* System Status Pill */}
            <div className="flex items-center gap-2 rounded-full border border-[var(--border,#e2e8f0)] bg-[var(--surface,#ffffff)] px-3 py-1 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium text-[var(--text-secondary,#64748b)]">
                Systems Normal
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <SocialLink
                href="https://www.linkedin.com"
                label="SkillMatch on LinkedIn"
              >
                <Linkedin size={15} />
              </SocialLink>
              <SocialLink
                href="https://github.com"
                label="SkillMatch on GitHub"
              >
                <Github size={15} />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
