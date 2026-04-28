import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CaseConverterTool from "@/components/tool-ui/CaseConverterTool";

const SLUG = "case-converter";

export const metadata: Metadata = buildMetadata({
  title: "Case Converter – Convert Text to Uppercase, Lowercase, Title Case Online",
  description:
    "Convert text instantly to uppercase, lowercase, title case, sentence case, or camelCase with our free online case converter tool.",
  keywords: [
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "sentence case converter",
    "camel case converter",
    "text case tool",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is a Case Converter?",
    body: "A case converter is a fast text utility that changes how letters are capitalized without changing the meaning of your content. In daily writing, developers, marketers, students, and support teams often need the same sentence in different formats. A blog title may need Title Case, an API token label may need camelCase, and a legal paragraph may need sentence case cleanup before publishing. Manually fixing capitalization is repetitive and error-prone, especially when you are handling long text blocks or working under deadline pressure. This Case Converter helps you switch between common text formats instantly, so you can focus on writing quality instead of mechanical edits. Because everything runs directly in your browser, the experience is fast and private. There is no sign-up, no upload step, and no waiting for server processing. Paste your text, choose a format, and copy the converted output in one click.",
    subSections: [
      {
        heading: "Why consistency matters",
        body: "Consistent capitalization improves readability, trust, and formatting quality across websites, app interfaces, documentation, social posts, and internal notes. A clean capitalization style also helps maintain brand tone and editing standards.",
      },
    ],
  },
  {
    heading: "How to Use This Case Converter",
    body: "Using the tool is straightforward. Start by pasting or typing text into the input box. Then choose your preferred output mode: UPPERCASE, lowercase, Title Case, Sentence case, or camelCase. The live preview updates instantly so you can compare styles before copying. If you are refining headlines, switch between Title Case and Sentence case to match your editorial standard. If you are preparing variables for JavaScript or JSON keys, use camelCase to convert phrase-based text into developer-friendly identifiers. For social content or customer support templates, lowercase and uppercase options help you quickly adjust tone and emphasis. Once your result looks right, use the copy button to move the output into your project, CMS, chat response, or design file. This flow removes repetitive edits and keeps your workflow simple. The tool is optimized for mobile and desktop, so you can make quick capitalization adjustments from any device.",
    subSections: [
      {
        heading: "Live preview workflow",
        body: "Real-time output means fewer mistakes. You can see the transformed result immediately, adjust your original text, and copy only when it matches your exact formatting intent.",
      },
    ],
  },
  {
    heading: "Core Features",
    body: "This online Case Converter includes the capitalization modes people use most in content and development workflows. UPPERCASE transforms all letters for labels, warnings, and visual emphasis. lowercase is useful for normalization tasks and informal copy. Title Case capitalizes each word for article headings, page names, and presentation titles. Sentence case applies natural sentence capitalization and is ideal for polished body copy and UI text. camelCase converts phrases into a compact developer naming style commonly used in JavaScript object keys, variable names, and front-end props. In addition, the tool gives you a single-screen interface with immediate output and a one-click copy action. There are no heavy libraries, no complex setup options, and no hidden steps. The minimal design keeps attention on text transformation so results are fast and reliable. Whether you are converting a single line or a larger text block, the tool keeps the same simple interaction pattern.",
    subSections: [
      {
        heading: "Built for speed",
        body: "All conversions happen in-browser with lightweight logic, which keeps response time fast and avoids unnecessary network requests.",
      },
    ],
  },
  {
    heading: "Benefits and Practical Use Cases",
    body: "A Case Converter saves time in many real workflows. Content writers use it to standardize headings across landing pages, newsletters, and blog drafts. SEO teams use it to quickly test title styles for metadata and on-page headings. Developers use camelCase conversion to move from plain-language labels into code-ready naming. Product teams use sentence case to normalize interface copy and maintain consistency across buttons, alerts, and forms. Customer support agents can convert templates into the right tone for macros and replies. Students and researchers use it to format essay headings and section labels without manual retyping. The key benefit is consistency at scale. Instead of editing capitalization word by word, you can transform entire passages in seconds. This reduces formatting errors, speeds up publishing cycles, and helps teams maintain a cleaner, more professional output across channels.",
    subSections: [
      {
        heading: "Who gets the most value",
        body: "Anyone handling text frequently benefits: writers, marketers, developers, editors, support teams, and students working across multiple style conventions.",
      },
    ],
  },
  {
    heading: "Best Practices for Better Results",
    body: "Before converting, decide which style standard you need for your destination. Marketing headlines usually favor Title Case, while most product interfaces and article bodies use Sentence case. In development contexts, use camelCase only for code identifiers and not for user-facing copy. After conversion, quickly scan acronyms and brand names because they may require custom capitalization. For example, terms like API, HTML, CSS, or company-specific spelling may need small manual adjustments depending on house style. If your team follows a style guide, convert first and then do a final editorial review to ensure full alignment. For long content, convert in sections so you can validate each part before publishing. This approach keeps output accurate and avoids accidental formatting changes in mixed-language or mixed-format text. With a fast converter and a light quality check, you can keep text polished while moving faster across writing, editing, and development tasks.",
    subSections: [
      {
        heading: "Quality tip",
        body: "Use conversion for speed, then apply a quick human review for acronyms, branded terms, and special casing rules your team may enforce.",
      },
    ],
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
