"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getDashboardRoute } from "@/utils/redirect";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          SkillMatch
        </Link>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-5 text-sm">

          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link href="/contacts" className="hover:text-blue-600">
            Contact
          </Link>

          {!user ? (
            <>
              <Link href="/login" className="text-blue-600">
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  router.push(getDashboardRoute(user.role))
                }
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Dashboard
              </button>

              <button
                onClick={logout}
                className="text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}