import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CaseConverterTool from "@/components/tool-ui/CaseConverterTool";

const SLUG = "case-converter";

export const metadata: Metadata = {
  title: "Case Converter – UPPERCASE, lowercase, Title & camelCase",
  description:
    "Convert text between uppercase, lowercase, title case, sentence case, camelCase, and snake_case instantly. Free online tool, no signup, live preview included.",
  alternates: {
    canonical: "https://www.aikittools.com/case-converter",
    languages: {
      "en-US": "https://www.aikittools.com/case-converter",
    },
  },
  openGraph: {
    title: "Case Converter – Convert Text Case Online Free",
    description:
      "Convert any text to UPPERCASE, lowercase, Title Case, camelCase, snake_case and more. Instant results, no signup needed. Free online tool.",
    url: "https://www.aikittools.com/case-converter",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Case Converter?",
    body: "The Case Converter is a free text case changer without signup that instantly switches any text between multiple capitalization styles. Whether you need to convert text to uppercase online for a header, use a title case converter for headings, generate a camelCase generator for JavaScript variables, apply a snake_case converter for developers, or switch to PascalCase for a class name, this tool handles it in one click. It's especially useful for developers and writers who constantly move between naming conventions and don't want to retype or manually fix capitalization across long blocks of text.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Type or paste your text into the input box.",
      "Click the button for the case style you want — UPPERCASE, lowercase, Title Case, etc.",
      "The result appears instantly in the output area.",
      "Switch to a different case at any time without re-entering your text.",
      "Click Copy to grab the converted result and paste it wherever you need it.",
    ],
  },
  {
    heading: "Why Use Case Converter Online?",
    body: "Completely free with no login or account required. You can switch between case formats as many times as you like without refreshing the page. Everything runs in your browser — your text is never transmitted to any server, which is important when converting sensitive content like API keys, internal documentation, or client-facing copy. Works on any device, so quick formatting fixes are always just a paste away.",
  },
];

const faqs = [
  {
    question: "Is this Case Converter free to use?",
    answer:
      "Yes. The tool is completely free, with no account required and no usage limits.",
  },
  {
    question: "Does the Case Converter process text on a server?",
    answer:
      "No. Conversion happens directly in your browser, which keeps the experience fast and private.",
  },
  {
    question: "What case formats are supported?",
    answer:
      "You can convert text to UPPERCASE, lowercase, Title Case, Sentence case, and camelCase.",
  },
  {
    question: "Can I use this for coding tasks?",
    answer:
      "Yes. The camelCase mode is useful for converting phrase-based labels into JavaScript-friendly naming.",
  },
  {
    question: "Will punctuation and spacing be preserved?",
    answer:
      "In most cases yes. The converter focuses on letter casing while keeping your existing punctuation and spacing structure.",
  },
  {
    question: "Can I use this to convert text to snake_case for programming?",
    answer:
      "Yes. The snake_case option converts any text into lowercase words joined by underscores — the standard naming format used in Python, Ruby, and database column names. Paste your variable names or phrases and convert them in one click without writing any code.",
  },
  {
    question: "What is the difference between camelCase and PascalCase?",
    answer:
      "camelCase starts with a lowercase letter and capitalizes each subsequent word — for example, myVariableName. PascalCase capitalizes every word including the first — for example, MyVariableName. camelCase is common in JavaScript and Java, while PascalCase is standard for class names and React components.",
  },
];

export default function CaseConverterPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "random-password-generator",
    "ai-text-summarizer",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <CaseConverterTool />
    </ToolPageLayout>
  );
}
