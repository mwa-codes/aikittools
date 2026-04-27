import Link from "next/link";
import type { Tool } from "@/lib/tools/registry";

interface RelatedToolsProps {
  tools: Tool[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="text-xl font-bold text-gray-900 mb-4">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl shrink-0">{tool.icon}</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                {tool.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {tool.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
