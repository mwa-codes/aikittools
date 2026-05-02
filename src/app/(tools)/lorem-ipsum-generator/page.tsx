import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import LoremIpsumGeneratorTool from "@/components/tool-ui/LoremIpsumGeneratorTool";

const SLUG = "lorem-ipsum-generator";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator – Placeholder Text, Instant Free",
  description:
    "Generate lorem ipsum paragraphs, sentences, or words instantly. Choose the exact amount of placeholder text you need. Free, no signup, copy with one click.",
  alternates: {
    canonical: "https://www.aikittools.com/lorem-ipsum-generator",
    languages: {
      "en-US": "https://www.aikittools.com/lorem-ipsum-generator",
    },
  },
  openGraph: {
    title: "Lorem Ipsum Generator – Free Placeholder Text Tool",
    description:
      "Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Copy instantly for design mockups and prototypes. Free, no signup required.",
    url: "https://www.aikittools.com/lorem-ipsum-generator",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Lorem Ipsum Generator?",
    body: "The Lorem Ipsum Generator is a dummy text generator for web design that produces classic placeholder text designers and developers have relied on for decades. When you're building a website layout, designing a UI component, or creating a presentation template, you need placeholder text for mockups that looks realistic without distracting from the structural decisions you're making. This lorem ipsum paragraph generator lets you generate any amount of text by paragraphs, sentences, or word count — so whether you need a short label or several full pages of mock content, you get exactly what you ask for. It supports the traditional \"Lorem ipsum dolor sit amet...\" opening that most designers recognize.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Choose your preferred output format: paragraphs, sentences, or words.",
      "Enter the quantity you want to generate.",
      "Click the Generate button to produce the placeholder text.",
      "Review the output, then click Copy to move it into Figma, your code editor, or CMS.",
    ],
  },
  {
    heading: "Why Use Lorem Ipsum Generator Online?",
    body: "Free, instant, and zero friction — no account needed, no ads interrupting your workflow, so you can generate filler text online free whenever you need it. You can generate as much or as little placeholder text as your project requires, and regenerate as many times as you like with different settings. Works in any modern browser on any device, so this fake text generator for UI prototypes is handy even when you're working away from your usual setup. The whole process takes under ten seconds from opening the page to copying the output.",
  },
];

const faqs = [
  {
    question: "Is this Lorem Ipsum Generator free?",
    answer:
      "Yes. It is completely free and available without registration.",
  },
  {
    question: "Can I generate by words, sentences, and paragraphs?",
    answer:
      "Yes. The generator supports all three modes so you can match your exact design or development need.",
  },
  {
    question: "Is the generated text SEO content for real pages?",
    answer:
      "No. Lorem Ipsum is placeholder text and should be replaced with meaningful content before publishing pages for search visibility.",
  },
  {
    question: "Can I use this on mobile?",
    answer:
      "Yes. The tool is responsive and works across modern mobile and desktop browsers.",
  },
  {
    question: "Can I generate lorem ipsum paragraphs for a website mockup?",
    answer:
      "Yes. Select paragraphs as your output type, choose how many you need, and click Generate. The result is ready to paste directly into Figma, Adobe XD, HTML, or any design tool as placeholder text for your layout mockup.",
  },
  {
    question: "Is lorem ipsum real Latin?",
    answer:
      "Lorem ipsum is derived from Cicero's 'de Finibus Bonorum et Malorum' written in 45 BC, but the standard lorem ipsum passage has been scrambled and altered over centuries. It resembles Latin but is not meaningful text — which is exactly why designers use it, so readers focus on layout rather than content.",
  },
];

export default function LoremIpsumGeneratorPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "random-password-generator",
    "ai-text-summarizer",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <LoremIpsumGeneratorTool />
    </ToolPageLayout>
  );
}
