import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import WordCounterTool from "@/components/tool-ui/WordCounterTool";

const SLUG = "word-counter";

export const metadata: Metadata = {
  title: "Word Counter – Count Words & Characters Online",
  description:
    "Instantly count words, characters, sentences, paragraphs, and reading time. Paste your text and get results in seconds. Free, no signup required.",
  alternates: {
    canonical: "https://www.aikittools.com/word-counter",
    languages: {
      "en-US": "https://www.aikittools.com/word-counter",
    },
  },
  openGraph: {
    title: "Word Counter – Count Words & Characters Online",
    description:
      "Instantly count words, characters, sentences, paragraphs, and reading time. Paste your text and get results in seconds. Free, no signup required.",
    url: "https://www.aikittools.com/word-counter",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Word Counter?",
    body: "The Word Counter is a free online tool built for writers, students, bloggers, and anyone who needs to track content length in real time. As you type or paste text, this online word counter without login instantly counts words, characters with and without spaces, sentences, paragraphs, and estimated reading time. Whether you're writing a 280-character tweet and need a character counter for Twitter, drafting a 500-word essay with a word counter for essays, or polishing a 2,000-word post with a word count checker for SEO content, knowing your exact count matters. Hitting a word limit in an application form or staying within a reading time target becomes effortless when the feedback is live and immediate. No registration, no downloads — paste your text and the numbers are already there.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste or type your text into the input box — counts update live as you write.",
      "Check the word count, character count, sentence count, and reading time in the stats panel.",
      "Use the Clear button to reset the input and start fresh.",
      "Click Copy to copy your text back to the clipboard when you're done.",
    ],
  },
  {
    heading: "Why Use Word Counter Online?",
    body: "This word counter is completely free with no account or signup of any kind. All the analysis runs directly in your browser — your text is never uploaded to a server or stored anywhere, which matters when you're working on drafts you haven't published yet. It works equally well on phones, tablets, and desktops, so you can check your count wherever you happen to be writing and quickly check reading time of article drafts before publishing. The reading time estimate is based on an average of 200 words per minute, giving you a realistic sense of how long your content will take to read.",
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
  {
    question: "Can I use this as a word counter for essays and assignments?",
    answer:
      "Yes. The tool is ideal for academic writing — paste your essay draft and instantly see whether you're within your assignment word limit. It counts words, sentences, and paragraphs separately, giving you a full picture of your content length without any login.",
  },
  {
    question: "Does this work as a character counter for Twitter and social media?",
    answer:
      "Absolutely. Twitter allows 280 characters per tweet and LinkedIn has its own limits for posts and headlines. Paste your text and watch the character count update in real time so you never exceed the platform limit before posting.",
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
