import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CssMinifierTool from "@/components/tool-ui/CssMinifierTool";

const SLUG = "css-minifier";

export const metadata: Metadata = {
  title: "CSS Minifier – Compress & Minify CSS Online Free",
  description:
    "Minify and compress CSS code instantly to reduce file size. Paste your CSS and get clean minified output. Free online CSS minifier, no signup needed.",
  alternates: { canonical: "https://www.aikittools.com/css-minifier" },
  openGraph: {
    title: "CSS Minifier – Compress & Minify CSS Online Free",
    description:
      "Minify and compress CSS code instantly to reduce file size. Paste your CSS and get clean minified output. Free online CSS minifier, no signup needed.",
    url: "https://www.aikittools.com/css-minifier",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the CSS Minifier?",
    body: "The CSS Minifier compresses your stylesheet by stripping out comments, whitespace, and redundant characters — leaving behind compact code that browsers parse just as well but download significantly faster. Every kilobyte removed from your CSS contributes to faster page load times, which improves user experience and Core Web Vitals scores. It's a standard step in front-end deployment, and this tool makes it accessible without setting up a build pipeline. Paste your readable, well-commented development CSS and get production-ready minified output in one click — no build tools, no command line required.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste your formatted CSS code into the input area.",
      "Click the Minify button to compress it instantly.",
      "Review the minified output and check the size reduction shown.",
      "Click Copy and paste the result directly into your production stylesheet or CDN file.",
    ],
  },
  {
    heading: "Why Use CSS Minifier Online?",
    body: "Completely free with no account needed. Minification runs locally in your browser — your CSS code is never uploaded anywhere, which is important for proprietary or client-specific styles. The process takes seconds and can meaningfully reduce file size, improving load speed for your users without any infrastructure changes. Keep your well-commented source styles for development, and use this tool to generate the compact version for production.",
  },
];

const faqs = [
  {
    question: "Is this CSS Minifier free to use?",
    answer:
      "Yes. The tool is fully free and available without signup.",
  },
  {
    question: "Does minification change how CSS works?",
    answer:
      "It should not. Minification removes unnecessary characters while preserving valid CSS behavior.",
  },
  {
    question: "Can I minify large stylesheets?",
    answer:
      "Yes, though very large files may be slower depending on browser memory and device performance.",
  },
  {
    question: "Is my CSS uploaded anywhere?",
    answer:
      "No. Processing happens in your browser, so your code stays local.",
  },
];

export default function CssMinifierPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "random-password-generator",
    "ai-text-summarizer",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <CssMinifierTool />
    </ToolPageLayout>
  );
}
