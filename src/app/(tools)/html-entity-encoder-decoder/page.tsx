import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import HtmlEntityEncoderDecoderTool from "@/components/tool-ui/HtmlEntityEncoderDecoderTool";

const SLUG = "html-entity-encoder-decoder";

export const metadata: Metadata = {
  title: "HTML Entity Encoder & Decoder – Free Online Tool",
  description:
    "Encode or decode HTML entities instantly. Convert special characters to HTML-safe format and back. Free online tool, works in browser, no signup needed.",
  alternates: {
    canonical: "https://www.aikittools.com/html-entity-encoder-decoder",
    languages: {
      "en-US": "https://www.aikittools.com/html-entity-encoder-decoder",
    },
  },
  openGraph: {
    title: "HTML Entity Encoder & Decoder – Free Online Tool",
    description:
      "Encode or decode HTML entities instantly. Convert special characters to HTML-safe format and back. Free online tool, works in browser, no signup needed.",
    url: "https://www.aikittools.com/html-entity-encoder-decoder",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the HTML Entity Encoder & Decoder?",
    body: "The HTML Entity Encoder and Decoder helps you HTML encode special characters online by converting characters that have special meaning in HTML — like &lt;, &gt;, &amp;, and quotation marks — into their entity equivalents, and decodes them back to their original form. When you display raw HTML inside a page without encoding these characters, browsers interpret them as markup rather than text, so this tool can encode angle brackets for HTML display and convert ampersand to HTML entity output when needed. Web developers, technical writers, and documentation teams use this HTML entity decoder for web developers workflows to safely display code snippets, handle user-generated content, and prepare text for CMS systems that auto-escape certain characters.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste your plain text or HTML snippet into the input box.",
      "Click Encode to convert special characters into safe HTML entity codes.",
      "Click Decode to convert HTML entities back into readable plain text.",
      "Review the output in the result panel before copying.",
      "Click Copy and paste the result into your template, documentation, or code.",
    ],
  },
  {
    heading: "Why Use HTML Entity Encoder Online?",
    body: "Completely free with no account needed, making it an easy way to escape HTML characters online free in seconds. Processing happens locally in your browser — no text is transmitted to any external server, which matters when working with internal code snippets or content you haven't published yet. Results are instant, the interface works on any device, and it handles the kind of conversion that developers reach for multiple times a week without thinking about it.",
  },
];

const faqs = [
  {
    question: "What does HTML entity encoding do?",
    answer:
      "It converts special characters such as <, >, and & into HTML entity codes so they can be displayed safely in HTML content.",
  },
  {
    question: "When should I decode HTML entities?",
    answer:
      "Decode entities when you need to inspect or reuse escaped content as readable plain text.",
  },
  {
    question: "Is this tool safe for sensitive text?",
    answer:
      "Yes. Processing runs locally in your browser and does not require server-side uploads.",
  },
  {
    question: "Can I use this with CMS content?",
    answer:
      "Yes. It is useful for preparing and debugging text copied between CMS editors, templates, and rendered pages.",
  },
  {
    question: "Why do I need to encode HTML entities in my content?",
    answer:
      "If you display raw HTML characters like < or > inside a webpage without encoding them, the browser interprets them as HTML tags rather than displayable text. This can break your layout or create security vulnerabilities. Encoding converts them to &lt; and &gt; so the browser renders the characters visually without treating them as markup.",
  },
  {
    question: "What is the difference between HTML encoding and URL encoding?",
    answer:
      "HTML encoding converts characters to HTML entity format (like &amp; for &) so they display correctly inside HTML documents. URL encoding converts characters to percent format (like %26 for &) so they transmit correctly in URLs. They serve different contexts and the encoded output is not interchangeable.",
  },
];

export default function HtmlEntityEncoderDecoderPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "random-password-generator",
    "ai-text-summarizer",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <HtmlEntityEncoderDecoderTool />
    </ToolPageLayout>
  );
}
