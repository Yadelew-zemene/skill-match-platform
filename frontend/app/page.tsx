"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardRoute } from "@/utils/redirect";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      

      {/* HERO SECTION */}
      <main className="flex flex-1 items-center justify-center text-center px-6">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            AI-Powered Job Matching Platform
          </h2>

          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Upload your resume, get matched with jobs instantly using AI-driven skill analysis.
          </p>

          {!user && (
            <div className="flex gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="border px-6 py-3 rounded-lg"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center p-4 text-gray-500">
        © {new Date().getFullYear()} SkillMatch
      </footer>
    </div>
  );
}