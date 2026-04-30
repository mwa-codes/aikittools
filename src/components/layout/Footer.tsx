import Link from "next/link";
import { SITE_NAME } from "@/lib/utils/metadata";
import { tools } from "@/lib/tools/registry";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const prioritizedSlugs = [
    "cover-letter-generator",
    "ai-text-summarizer",
    "resume-bullet-point-generator",
    "word-counter",
    "case-converter",
    "invoice-generator",
    "json-formatter",
    "qr-code-generator",
  ];
  const footerTools = tools
    .filter((tool) => prioritizedSlugs.includes(tool.slug))
    .sort((a, b) => prioritizedSlugs.indexOf(a.slug) - prioritizedSlugs.indexOf(b.slug));
  const hiddenToolsCount = Math.max(0, tools.length - footerTools.length);

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
              Free AI career tools and online utilities. Cover letters, resume bullets, ATS
              checkers and more — free, instant, no signup.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Tools</h3>
            <ul className="space-y-2">
              {footerTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View all tools
                  {hiddenToolsCount > 0 ? ` (+${hiddenToolsCount})` : ""}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
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
              All tools are free to use. No account required. Your data stays in your browser.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built for speed &amp; SEO · Hosted on{" "}
            <span className="text-gray-400">Vercel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
