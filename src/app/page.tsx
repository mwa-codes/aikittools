import Link from "next/link";
import { TOOL_CATEGORY_LABELS, TOOL_CATEGORY_ORDER, tools } from "@/lib/tools/registry";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, buildMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Free Online Tools for Text, JSON, QR Codes & AI",
  description:
    "Free online tools for developers and everyone: word counter, JSON formatter, QR code generator, Base64 encoder, URL encoder, and AI text summarizer. No signup needed.",
  keywords: [
    "free online tools",
    "ai tools",
    "developer tools",
    "calculators",
    "json formatter",
    "word counter",
  ],
});

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
          <span>⚡</span> Fast · Free · No Signup
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
          Free Online Tools — <span className="text-blue-600">Fast &amp; Simple</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          No signup. No ads in the way. Just free tools that work instantly in your browser.
          Word counter, JSON formatter, QR generator, AI summarizer, and more.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
          <span className="rounded-full bg-white border border-gray-200 px-3 py-1">SEO Friendly</span>
          <span className="rounded-full bg-white border border-gray-200 px-3 py-1">Mobile First</span>
          <span className="rounded-full bg-white border border-gray-200 px-3 py-1">Privacy Focused</span>
        </div>
      </section>

      {/* Tool Categories */}
      {TOOL_CATEGORY_ORDER.map((cat) => {
        const catTools = grouped[cat];
        if (!catTools || catTools.length === 0) return null;
        return (
          <section key={cat} className="mb-12" aria-labelledby={`category-${cat}`}>
            <div className="flex items-end justify-between mb-4">
              <h2
                id={`category-${cat}`}
                className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight"
              >
                {TOOL_CATEGORY_LABELS[cat] ?? cat}
              </h2>
              <span className="text-xs text-gray-400">{catTools.length} tool{catTools.length > 1 ? "s" : ""}</span>
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
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      {tool.isAI && (
                        <span className="text-xs bg-purple-100 text-purple-700 font-medium px-2 py-0.5 rounded-full">
                          AI
                        </span>
                      )}
                      {tool.isNew && !tool.isAI && (
                        <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {tool.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

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
