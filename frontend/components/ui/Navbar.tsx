"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"
import { Zap, Menu } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">SkillMatch</span>
        </Link>

        {/* Home Navigations */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Home</Link>
          <Link href="/about" className="text-sm font-semibold text-gray-600 hover:text-blue-600">About Us</Link>
          <Link href="/contacts" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Link 
              href={user.role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard'}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-blue-600">Log in</Link>
              <Link href="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}