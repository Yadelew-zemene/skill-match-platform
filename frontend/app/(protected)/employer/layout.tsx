"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusSquare, 
  Briefcase, 
  Users, 
  LogOut,
  Bell
} from "lucide-react";

export default function EmployerLayout({ children, }: { children: React.ReactNode; }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
    { name: "Post Job", href: "/employer/post-jobs", icon: PlusSquare },
    { name: "Jobs Posted", href: "/employer/jobs-posted", icon: Briefcase },
    { name: "Candidates", href: "/employer/candidates", icon: Users },
  ];
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col fixed h-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SkillMatch Pro
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive 
                    ? "bg-blue-50 text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-8 gap-4 sticky top-0 z-10">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200">
            EM
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}