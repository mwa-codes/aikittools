import Link from "next/link";
import { tools } from "@/lib/tools/registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Kit Tools – Free Online Tools for Text, JSON, QR Codes & AI",
  description:
    "Free online tools for developers and everyone: word counter, JSON formatter, QR code generator, Base64 encoder, URL encoder, and AI text summarizer. No signup needed.",
};

const categoryLabels: Record<string, string> = {
  text: "Text Tools",
  developer: "Developer Tools",
  encoder: "Encoder / Decoder Tools",
  generator: "Generator Tools",
  ai: "AI Tools",
};

const categoryOrder = ["text", "developer", "encoder", "generator", "ai"];

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Free Online Tools — <span className="text-blue-600">Fast &amp; Simple</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          No signup. No ads in the way. Just free tools that work instantly in your browser.
          Word counter, JSON formatter, QR generator, AI summarizer, and more.
        </p>
      </section>

      {/* Tool Categories */}
      {categoryOrder.map((cat) => {
        const catTools = grouped[cat];
        if (!catTools || catTools.length === 0) return null;
        return (
          <section key={cat} className="mb-10" aria-labelledby={`category-${cat}`}>
            <h2
              id={`category-${cat}`}
              className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200"
            >
              {categoryLabels[cat] ?? cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <span className="text-3xl shrink-0 mt-0.5">{tool.icon}</span>
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
      <section className="mt-12 text-center bg-blue-50 border border-blue-100 rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">More tools coming soon</h2>
        <p className="text-gray-500 mb-0">
          We&#39;re constantly adding new free tools. Bookmark this page and check back often.
        </p>
      </section>
    </div>
  );
}
