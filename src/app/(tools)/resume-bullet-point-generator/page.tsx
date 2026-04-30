import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const SLUG = "resume-bullet-point-generator";

export const metadata: Metadata = {
  title: "AI Resume Bullet Point Generator (Coming Soon) | AI Kit Tools",
  description:
    "Generate stronger, achievement-focused resume bullet points with AI. This tool is coming soon to AI Kit Tools.",
  alternates: {
    canonical: "https://www.aikittools.com/resume-bullet-point-generator",
    languages: {
      "en-US": "https://www.aikittools.com/resume-bullet-point-generator",
    },
  },
  openGraph: {
    title: "AI Resume Bullet Point Generator (Coming Soon) | AI Kit Tools",
    description: "Generate stronger, achievement-focused resume bullet points with AI. Coming soon.",
    url: "https://www.aikittools.com/resume-bullet-point-generator",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "AI Resume Bullet Point Generator (Coming Soon)",
    body: "This upcoming tool will help you turn basic responsibilities into stronger, results-oriented resume bullet points tailored to your role and industry.",
  },
];

const faqs = [
  {
    question: "When will this tool launch?",
    answer:
      "Soon. We are actively working on it and will publish it here as soon as the first version is ready.",
  },
];

export default function ResumeBulletPointGeneratorPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs(["cover-letter-generator", "ai-text-summarizer", "word-counter"]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h2 className="text-sm font-semibold text-amber-900 mb-1">Coming soon</h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          We are building this tool now. Check back shortly for the full AI resume bullet point generator.
        </p>
      </div>
    </ToolPageLayout>
  );
}
