import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import WordCounterTool from "@/components/tool-ui/WordCounterTool";

const SLUG = "word-counter";

export const metadata: Metadata = buildMetadata({
  title: "Free Word Counter & Character Counter Online",
  description:
    "Count words, characters, sentences, paragraphs, and estimate reading time instantly. Free online word counter — no signup required.",
  keywords: [
    "word counter",
    "character counter",
    "online word count",
    "free word counter",
    "sentence counter",
    "reading time calculator",
    "word count tool",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is a Word Counter?",
    body: "A word counter is an online tool that instantly analyzes a piece of text and tells you how many words, characters, sentences, and paragraphs it contains. It also estimates the reading time based on an average reading speed of 200 words per minute. Whether you're writing an essay, blog post, social media caption, or professional document, a word counter helps you stay within specific limits and track your progress.",
  },
  {
    heading: "How to Use the Word Counter",
    body: [
      "Paste or type your text into the text area above.",
      "The word count, character count, sentence count, and more update in real time.",
      "Use the 'Clear' button to reset the text area.",
      "Use the 'Copy Text' button to copy your text to the clipboard.",
    ],
  },
  {
    heading: "Features of This Word Counter",
    body: [
      "Real-time word and character counting as you type.",
      "Counts characters with and without spaces.",
      "Counts sentences and paragraphs accurately.",
      "Estimates reading time based on 200 WPM average.",
      "Works entirely in your browser — nothing is sent to a server.",
      "Completely free with no usage limits.",
    ],
  },
  {
    heading: "Why Word Count Matters",
    body: "Word count is critical in many professional and academic settings. Blog posts optimized for SEO typically range from 1,500 to 3,000 words. Academic essays often have strict word limits. Tweets are capped at 280 characters. Email subject lines perform best under 50 characters. Knowing your word and character count ensures your content fits the required format and meets platform constraints.",
  },
  {
    heading: "Who Uses a Word Counter?",
    body: [
      "Students writing essays or assignments with word limits.",
      "Bloggers and content writers optimizing for SEO.",
      "Social media managers checking caption lengths.",
      "Developers testing text input fields.",
      "Translators estimating translation costs by word count.",
      "Authors tracking their writing progress.",
    ],
  },
];

const faqs = [
  {
    question: "Is this word counter free to use?",
    answer:
      "Yes, the word counter is completely free and has no usage limits. You don't need to create an account or provide any personal information.",
  },
  {
    question: "Does my text get stored or sent to a server?",
    answer:
      "No. All counting happens directly in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated by dividing the total word count by 200, which is the average reading speed for most adults in words per minute.",
  },
  {
    question: "Can I count words in languages other than English?",
    answer:
      "Yes. The tool counts words by splitting on whitespace and punctuation, which works for most Latin-script languages. Some languages like Chinese or Japanese that don't use spaces may not count accurately.",
  },
  {
    question: "What is the maximum text length?",
    answer:
      "There is no maximum text length. The tool runs locally in your browser, so the only limit is your device's available memory.",
  },
];

export default function WordCounterPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getRelatedTools(SLUG);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <WordCounterTool />
    </ToolPageLayout>
  );
}
