import Link from "next/link";
import Image from "next/image";
import { TOOL_CATEGORY_LABELS, TOOL_CATEGORY_ORDER, tools } from "@/lib/tools/registry";

export default function Header() {
  const defaultGroupedTools = TOOL_CATEGORY_ORDER
    .map((category) => ({
      category,
      label: TOOL_CATEGORY_LABELS[category],
      items: tools.filter((tool) => tool.category === category),
    }))
    .filter((group) => group.items.length > 0);
  const groupedTools = [
    {
      category: "career",
      label: "Career Tools",
      items: [
        { slug: "cover-letter-generator", icon: "✉️", name: "AI Cover Letter Generator" },
        { slug: "resume-bullet-generator", icon: "📝", name: "Resume Bullet Generator" },
        { slug: "ats-resume-checker", icon: "🔍", name: "ATS Resume Checker" },
        { slug: "interview-question-generator", icon: "🎤", name: "Interview Question Generator" },
        { slug: "linkedin-summary-generator", icon: "💼", name: "LinkedIn Summary Generator" },
      ],
    },
    ...defaultGroupedTools.filter((group) => group.category !== "career"),
  ];
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/logo-AK.png"
                alt="AI Kit Tools logo"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="font-semibold text-gray-900 text-sm">
                AI Kit Tools
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            <Link
              href="/"
              className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Home
            </Link>

            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                aria-haspopup="true"
              >
                Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 absolute right-0 top-full mt-2 w-[560px] rounded-xl border border-gray-200 bg-white shadow-lg p-4 transition-all">
                <div className="grid grid-cols-2 gap-4">
                  {groupedTools.map((group) => (
                    <div key={group.category}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        {group.label}
                      </p>
                      <ul className="space-y-1">
                        {group.items.map((tool) => (
                          <li key={`${group.category}-${tool.slug}-${tool.name}`}>
                            <Link
                              href={tool.slug === "#" ? "#" : `/${tool.slug}`}
                              className={
                                "comingSoon" in tool && tool.comingSoon
                                  ? "flex items-center gap-2 px-2 py-1.5 text-sm text-gray-400 rounded-md transition-colors"
                                  : "flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              }
                            >
                              <span>{tool.icon}</span>
                              <span className="truncate">{tool.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy-policy"
              className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/"
              className="ml-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              All Tools
            </Link>
          </nav>

          {/* Mobile quick link */}
          <Link
            href="/"
            className="md:hidden px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            All Tools
          </Link>
        </div>

        {/* Mobile categorized tools dropdown */}
        <details className="md:hidden pb-3">
          <summary className="list-none inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 cursor-pointer select-none">
            Browse Tools
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="mt-3 space-y-4">
            {groupedTools.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  {group.label}
                </p>
                <ul className="grid grid-cols-1 gap-1">
                  {group.items.map((tool) => (
                    <li key={`${group.category}-${tool.slug}-${tool.name}`}>
                      <Link
                        href={tool.slug === "#" ? "#" : `/${tool.slug}`}
                        className={
                          "comingSoon" in tool && tool.comingSoon
                            ? "flex items-center gap-2 px-2 py-1.5 text-sm text-gray-400 rounded-md transition-colors"
                            : "flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        }
                      >
                        <span>{tool.icon}</span>
                        <span>{tool.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                About
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Privacy
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                Terms
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
