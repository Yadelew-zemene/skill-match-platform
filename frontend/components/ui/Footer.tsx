import Link from "next/link";
import { Zap, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Zap className="text-blue-600 fill-blue-600" size={24} />
            <span className="text-2xl font-bold tracking-tight">SkillMatch</span>
          </Link>
          <p className="text-gray-500 leading-relaxed mb-6">
            Leveraging evolutionary AI to bridge the gap between human potential and industrial demand.
          </p>
          <div className="flex gap-4">
            <Twitter className="text-gray-400 hover:text-blue-600 cursor-pointer" size={20} />
            <Linkedin className="text-gray-400 hover:text-blue-600 cursor-pointer" size={20} />
            <Github className="text-gray-400 hover:text-blue-600 cursor-pointer" size={20} />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6">Product</h4>
          <ul className="space-y-4 text-gray-600 text-sm">
            <li><Link href="/how-it-works">How it Works</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6">Company</h4>
          <ul className="space-y-4 text-gray-600 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6">Support</h4>
          <p className="text-sm text-gray-600 mb-2">Questions or feedback?</p>
          <p className="text-sm font-bold text-blue-600">support@skillmatch.ai</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-200 text-center text-sm text-gray-400">
        © 2026 SkillMatch Platform. A technical collaboration inspired by iCog Labs.
      </div>
    </footer>
  );
}