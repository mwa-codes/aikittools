import Link from "next/link";
import { SITE_NAME } from "@/lib/utils/metadata";
import { careerNavItems } from "@/lib/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span className="text-blue-400">⚡</span>
              <span>{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Free AI career tools for job seekers — job application tracker, cover letter generator, ATS resume checker, resume bullets, interview prep, and more. Free to start, no credit card required.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Tools</h3>
            <ul className="space-y-2">
              {careerNavItems.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Info</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Free to start. Most tools require no account. Your data is never sold or shared.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-gray-300">
            Built by MWA ·{" "}
            <Link
              href="https://mwadev.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              mwadev.me
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
