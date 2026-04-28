import RelatedTools from "../RelatedTools";
import FAQSection from "@/components/seo/FAQSection";
import ToolSEOContent from "@/components/seo/ToolSEOContent";
import type { Tool } from "@/lib/tools/registry";
import { SITE_NAME, SITE_URL } from "@/lib/utils/metadata";

interface FAQ {
  question: string;
  answer: string;
}

interface ContentSection {
  heading: string;
  body: string | string[];
  subSections?: Array<{
    heading: string;
    body: string | string[];
  }>;
}

interface ToolPageLayoutProps {
  tool: Tool;
  relatedTools: Tool[];
  faqs: FAQ[];
  seoSections: ContentSection[];
  children: React.ReactNode;
}

export default function ToolPageLayout({
  tool,
  relatedTools,
  faqs,
  seoSections,
  children,
}: ToolPageLayoutProps) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.description,
    url: `${SITE_URL}/${tool.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {/* Page Header */}
      <header className="mb-8 rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 px-5 sm:px-7 py-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl sm:text-4xl rounded-xl bg-white border border-slate-200 w-11 h-11 sm:w-12 sm:h-12 grid place-items-center">
            {tool.icon}
          </span>
          <div>
            {tool.isAI && (
              <span className="inline-block text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full mb-1">
                AI Powered
              </span>
            )}
            {tool.isNew && !tool.isAI && (
              <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-1">
                New
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{tool.name}</h1>
          </div>
        </div>
        <p className="text-gray-600 text-sm sm:text-base ml-0 sm:ml-[60px] leading-relaxed">{tool.description}</p>
      </header>

      {/* Tool UI */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        {children}
      </div>

      {/* SEO Content */}
      <ToolSEOContent sections={seoSections} />

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* Related Tools */}
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
