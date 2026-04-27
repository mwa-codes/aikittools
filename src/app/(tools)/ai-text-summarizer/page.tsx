import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import AiTextSummarizerTool from "@/components/tool-ui/AiTextSummarizerTool";

const SLUG = "ai-text-summarizer";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Text Summarizer Online – Summarize Any Text Instantly",
  description:
    "Summarize long articles, essays, and documents in seconds with our free AI text summarizer powered by OpenAI. Get concise summaries instantly.",
  keywords: [
    "ai text summarizer",
    "text summarizer",
    "article summarizer",
    "ai summarize text",
    "free text summarizer",
    "summarize article online",
    "openai summarizer",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is an AI Text Summarizer?",
    body: "An AI text summarizer is a tool powered by artificial intelligence that reads a piece of text and produces a shorter version that preserves the key ideas and main points. Unlike simple extractive methods that copy sentences verbatim, AI summarizers (like this one powered by OpenAI) can paraphrase and synthesize information to create a genuinely concise and coherent summary.",
  },
  {
    heading: "How to Use the AI Text Summarizer",
    body: [
      "Paste your article, essay, or document text into the input box.",
      "Keep your input under 500 words for best results.",
      "Click 'Summarize with AI' and wait a few seconds.",
      "Your 3–5 sentence summary will appear below the button.",
      "Click 'Copy' to copy the summary to your clipboard.",
    ],
  },
  {
    heading: "Features",
    body: [
      "AI-powered summarization using OpenAI GPT-4o Mini.",
      "Produces 3–5 sentence summaries preserving core meaning.",
      "Word count tracker to stay within the 500-word limit.",
      "Fast response — summaries typically appear in 2–5 seconds.",
      "Simple, distraction-free interface.",
      "Free to use.",
    ],
  },
  {
    heading: "Who Benefits from AI Text Summarization?",
    body: [
      "Students who need to quickly grasp the key points of long readings.",
      "Researchers reviewing large volumes of academic papers.",
      "Professionals condensing reports and meeting notes.",
      "Bloggers and content writers getting up to speed on topics quickly.",
      "Anyone who wants to save reading time on long articles.",
    ],
  },
  {
    heading: "Limitations to Be Aware Of",
    body: "AI summarizers are powerful but not perfect. They may occasionally miss nuance, misinterpret technical jargon, or lose context from highly specialized content. Always review AI-generated summaries before citing or acting on them. This tool is designed for general-purpose text summarization and works best with news articles, blog posts, essays, and informational documents written in English.",
  },
];

const faqs = [
  {
    question: "How does the AI summarizer work?",
    answer:
      "Your text is sent securely to our server, which calls the OpenAI API using the GPT-4o Mini model. The model is instructed to produce a concise 3–5 sentence summary. Your OpenAI API key is never exposed to the browser.",
  },
  {
    question: "Is my text stored or used for training?",
    answer:
      "We do not store your text. The text is sent to OpenAI for processing as per their API usage policy. According to OpenAI's data policy, data sent via their API is not used to train their models by default. Please review OpenAI's privacy policy for details.",
  },
  {
    question: "Why is the word limit 500 words?",
    answer:
      "The 500-word limit is in place to control API costs and ensure fast response times. It covers the typical use case of summarizing an article section, a chapter, or a key passage. For longer documents, consider summarizing section by section.",
  },
  {
    question: "What language can I summarize in?",
    answer:
      "The tool works best with English text. GPT-4o Mini supports many languages, so you may get reasonable results with other languages, but quality and accuracy may vary compared to English.",
  },
  {
    question: "Is the AI summarizer accurate?",
    answer:
      "AI summaries are generally accurate for factual, well-structured text. However, AI can occasionally paraphrase incorrectly or miss subtle points. Always verify important summaries against the original source.",
  },
];

export default function AiTextSummarizerPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getRelatedTools(SLUG);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <AiTextSummarizerTool />
    </ToolPageLayout>
  );
}
