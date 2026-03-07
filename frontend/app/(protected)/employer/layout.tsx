"use client";

import Link from "next/link";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold mb-6">Employer</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/employer/dashboard">Dashboard</Link>
          <Link href="/employer/post-jobs">Post Job</Link>
          <Link href="/employer/jobs-posted">Jobs Posted</Link>
          <Link href="/employer/candidates">Candidates</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}