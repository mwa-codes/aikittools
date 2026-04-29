import Link from "next/link";
import { TOOL_CATEGORY_LABELS, TOOL_CATEGORY_ORDER, tools } from "@/lib/tools/registry";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/utils/metadata";

export const metadata: Metadata = {
  title: "Free AI Career & Online Tools — Cover Letter, Resume & More | AI Kit Tools",
  description:
    "Free AI-powered career tools for job seekers — cover letter generator, resume bullet points, ATS checker, interview prep and more. No signup required. Built for the US job market.",
  keywords:
    "free cover letter generator, AI resume tools, ATS resume checker, interview question generator, free career tools, AI Kit Tools",
  openGraph: {
    title: "Free AI Career Tools — No Signup Required | AI Kit Tools",
    description:
      "Generate cover letters, resume bullets, and interview questions with AI. Free, instant, no account needed.",
    url: "https://www.aikittools.com",
    siteName: "AI Kit Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Career Tools | AI Kit Tools",
    description: "Free AI-powered cover letter generator, ATS checker, resume tools and more.",
  },
  alternates: {
    canonical: "https://www.aikittools.com",
  },
};

function groupToolsByCategory(toolList: typeof tools) {
  const grouped: Record<string, typeof tools> = {};
  for (const tool of toolList) {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  }
  return grouped;
}

export default function HomePage() {
  const grouped = groupToolsByCategory(tools);
  const careerTools = grouped.career ?? [];
  const aiTools = grouped.ai ?? [];
  const textPriority = ["invoice-generator", "word-counter", "case-converter"];
  const textTools = (grouped.text ?? [])
    .filter((tool) => textPriority.includes(tool.slug))
    .sort((a, b) => textPriority.indexOf(a.slug) - textPriority.indexOf(b.slug));
  const extraTextTools = (grouped.text ?? []).filter(
    (tool) => !["word-counter", "case-converter", "invoice-generator"].includes(tool.slug),
  );
  const moreCategoryOrder = TOOL_CATEGORY_ORDER.filter((cat) => !["career", "ai", "text"].includes(cat));
  const careerComingSoonTools = [
    { name: "ATS Resume Checker", icon: "🔍" },
    { name: "Interview Prep Tool", icon: "🎤" },
    { name: "LinkedIn Summary Gen", icon: "💼" },
  ];
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero */}
      <section
        className="mb-12 sm:mb-14 rounded-3xl border border-slate-200 px-6 py-10 sm:px-10 sm:py-14 text-center shadow-sm"
        style={{ background: "linear-gradient(to bottom, #ffffff, #f8fafc)" }}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
          <span>⚡</span> Career-first · Free · Instant
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
          Free AI Career Tools — <span className="text-blue-600">Land Your Next Job Faster</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          AI-powered cover letters, resume bullets, ATS checkers, and interview prep tools. Free,
          instant, no signup required.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
          <span className="rounded-full bg-white border border-gray-200 px-3 py-1">
            ✓ No Signup Required
          </span>
          <span className="rounded-full bg-white border border-gray-200 px-3 py-1">
            ✓ US Job Market Focused
          </span>
          <span className="rounded-full bg-white border border-gray-200 px-3 py-1">
            ✓ Powered by OpenAI
          </span>
        </div>
        <div className="mt-7">
          <Link
            href="/cover-letter-generator"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            ✉️ Generate a Cover Letter Free →
          </Link>
        </div>
      </section>

      {/* Career Tools */}
      <section className="mb-12" id="career-tools" aria-labelledby="category-career">
        <div className="flex items-end justify-between mb-4">
          <h2 id="category-career" className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
            🎯 Career Tools
          </h2>
          <span className="text-xs text-gray-400">Featured</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {careerTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="text-3xl shrink-0 mt-0.5 rounded-xl bg-slate-50 border border-slate-200 w-11 h-11 grid place-items-center">
                {tool.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-xs bg-purple-100 text-purple-700 font-medium px-2 py-0.5 rounded-full">
                    AI
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.shortDescription}</p>
              </div>
            </Link>
          ))}
          {careerComingSoonTools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-start gap-4 p-5 bg-white border border-dashed border-gray-300 rounded-2xl"
            >
              <span className="text-3xl shrink-0 mt-0.5 rounded-xl bg-slate-50 border border-slate-200 w-11 h-11 grid place-items-center">
                {tool.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Launching soon. Stay tuned for this career-focused AI tool.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Tools */}
      <section className="mb-12" id="ai-tools" aria-labelledby="category-ai">
        <div className="flex items-end justify-between mb-4">
          <h2 id="category-ai" className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
            🤖 AI Tools
          </h2>
          <span className="text-xs text-gray-400">{aiTools.length} tool{aiTools.length > 1 ? "s" : ""}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="text-3xl shrink-0 mt-0.5 rounded-xl bg-slate-50 border border-slate-200 w-11 h-11 grid place-items-center">
                {tool.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-xs bg-purple-100 text-purple-700 font-medium px-2 py-0.5 rounded-full">
                    AI
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Text Tools */}
      <section className="mb-12" id="text-tools" aria-labelledby="category-text">
        <div className="flex items-end justify-between mb-4">
          <h2 id="category-text" className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
            📝 Text Tools
          </h2>
          <span className="text-xs text-gray-400">{textTools.length} tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {textTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="text-3xl shrink-0 mt-0.5 rounded-xl bg-slate-50 border border-slate-200 w-11 h-11 grid place-items-center">
                {tool.icon}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* More Tools */}
      <details id="more-tools" className="mb-10 rounded-2xl border border-gray-200 bg-white p-5">
        <summary className="cursor-pointer select-none text-lg font-semibold text-gray-800">
          More Tools ↓
        </summary>
        <div className="mt-5 space-y-8">
          {extraTextTools.length > 0 && (
            <section aria-labelledby="category-more-text">
              <div className="flex items-end justify-between mb-3">
                <h3 id="category-more-text" className="text-base sm:text-lg font-semibold text-gray-800 tracking-tight">
                  More Text Tools
                </h3>
                <span className="text-xs text-gray-400">
                  {extraTextTools.length} tool{extraTextTools.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {extraTextTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <span className="text-3xl shrink-0 mt-0.5 rounded-xl bg-slate-50 border border-slate-200 w-11 h-11 grid place-items-center">
                      {tool.icon}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{tool.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {moreCategoryOrder.map((cat) => {
            const catTools = grouped[cat];
            if (!catTools || catTools.length === 0) return null;
            return (
              <section key={cat} aria-labelledby={`category-${cat}`}>
                <div className="flex items-end justify-between mb-3">
                  <h3
                    id={`category-${cat}`}
                    className="text-base sm:text-lg font-semibold text-gray-800 tracking-tight"
                  >
                    {TOOL_CATEGORY_LABELS[cat] ?? cat}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {catTools.length} tool{catTools.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <span className="text-3xl shrink-0 mt-0.5 rounded-xl bg-slate-50 border border-slate-200 w-11 h-11 grid place-items-center">
                        {tool.icon}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{tool.shortDescription}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </details>

      {/* SEO Content */}
      <section className="mt-6 sm:mt-10 rounded-3xl border border-gray-200 bg-white p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Free AI Tools for Job Seekers</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          AI Kit Tools offers free AI-powered career tools designed for the US job market. Whether
          you need a free cover letter generator, help writing resume bullet points, or want to
          check if your resume passes ATS screening — everything is free, instant, and requires no
          account.
        </p>
        <p className="text-gray-600 leading-relaxed mb-0">
          Our AI career tools are powered by OpenAI and built for job seekers applying to US
          companies. Stop spending hours on cover letters and resumes — let AI handle the first
          draft so you can focus on customizing and applying.
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="mt-6 sm:mt-10 text-center bg-white border border-gray-200 rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">More tools coming soon</h2>
        <p className="text-gray-600 mb-0 max-w-2xl mx-auto">
          We&#39;re constantly adding new free tools. Bookmark this page and check back often.
        </p>
      </section>
    </div>
  );
}
