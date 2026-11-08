"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  MessageSquare,
  Send,
  User,
  Loader2,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  BriefcaseBusiness,
  Users,
  Lightbulb,
} from "lucide-react";
import {
  submitContactMessage,
  type ContactMessagePayload,
} from "@/services/contact.service";

export default function ContactPage() {
  const [form, setForm] = useState<ContactMessagePayload>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await submitContactMessage(form);

      toast.success(response.message);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Unable to send your message. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  return (
    <main className="overflow-hidden bg-[#f8faff]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-blue-100/70 bg-white">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #dce8ff 1px, transparent 1px), linear-gradient(to bottom, #dce8ff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        {/* Glowing gradients */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[110px]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-teal-300/20 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-300/20 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm shadow-blue-100/60">
              <Sparkles size={14} className="text-teal-600" />
              LET'S CONNECT
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Every great connection
              <span className="mt-2 block bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                starts with a conversation.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Have a question about SkillMatch, need help using the platform, or
              want to share an idea? We'd love to hear from you.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-600" />
                Questions and support
              </span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-600" />
                Feedback and suggestions
              </span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-600" />
                Partnership inquiries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="relative px-6 py-16 sm:py-20">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-teal-100/50 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="pt-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              Get in touch
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Let's make the right connections happen.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
              SkillMatch brings candidates and employers closer through
              skills-based opportunities. Your questions, feedback, and ideas
              help us make that experience better.
            </p>

            {/* Contact topics */}
            <div className="mt-10 space-y-4">
              <div className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors duration-300 group-hover:bg-blue-100">
                  <Users size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Candidate support
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Questions about your profile, applications, or finding
                    opportunities that match your skills.
                  </p>
                </div>
              </div>

              <div className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors duration-300 group-hover:bg-teal-100">
                  <BriefcaseBusiness size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Employer inquiries
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Interested in discovering skilled candidates or learning how
                    SkillMatch can support your hiring process?
                  </p>
                </div>
              </div>

              <div className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 transition-colors duration-300 group-hover:bg-indigo-100">
                  <Lightbulb size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Ideas and feedback
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Share suggestions, report an issue, or tell us how we can
                    improve the platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-teal-50/70 p-4">
              <MessageSquare
                size={20}
                className="mt-0.5 shrink-0 text-blue-700"
              />
              <p className="text-sm leading-6 text-slate-600">
                Not sure where to start? Just tell us what's on your mind. We'll
                use your message to understand how best to help.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative">
            {/* Form glow */}
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-blue-400/30 via-indigo-300/20 to-teal-400/30 opacity-70 blur-xl" />

            <div className="relative rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-xl shadow-blue-950/[0.04] sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
                    <Mail size={21} />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Complete the form and send your message to our team.
                  </p>
                </div>

                <div className="hidden rounded-xl bg-teal-50 p-3 text-teal-700 sm:block">
                  <Send size={21} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      maxLength={100}
                      required
                      autoComplete="name"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      maxLength={150}
                      required
                      autoComplete="email"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    maxLength={200}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Your message
                    </label>

                    <span className="text-xs text-slate-400">
                      {form.message.length}/5000
                    </span>
                  </div>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    maxLength={5000}
                    minLength={10}
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-700/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending your message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  By submitting this form, you agree to be contacted regarding
                  your message.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden border-t border-blue-100 bg-white px-6 py-14">
        <div className="pointer-events-none absolute -left-20 -top-32 h-72 w-72 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-32 h-72 w-72 rounded-full bg-teal-200/30 blur-[90px]" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-teal-700">SKILLMATCH</p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Better opportunities begin with better connections.
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Discover a more skills-focused approach to connecting talent with
              opportunity.
            </p>
          </div>

          <a
            href="/"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-700 hover:text-white"
          >
            Explore SkillMatch
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </section>
    </main>
  );
}
