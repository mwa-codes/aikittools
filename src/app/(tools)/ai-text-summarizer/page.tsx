import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import AiTextSummarizerTool from "@/components/tool-ui/AiTextSummarizerTool";

const SLUG = "ai-text-summarizer";

export const metadata: Metadata = {
  title: "AI Text Summarizer – Summarize Any Text Free, No Limit",
  description:
    "Paste any article, essay, or document and get a clear, accurate summary in seconds. Free AI summarizer powered by OpenAI. No signup, no word limit.",
  alternates: {
    canonical: "https://www.aikittools.com/ai-text-summarizer",
    languages: {
      "en-US": "https://www.aikittools.com/ai-text-summarizer",
    },
  },
  openGraph: {
    title: "AI Text Summarizer – Summarize Any Text Online",
    description:
      "Summarize long articles, essays, or documents in seconds using AI. Get a clear, concise summary instantly. Free AI text summarizer, no signup required.",
    url: "https://www.aikittools.com/ai-text-summarizer",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the AI Text Summarizer?",
    body: "The AI Text Summarizer is an AI text summarizer online free tool that uses artificial intelligence to read a piece of text and distill it into a shorter, coherent summary that captures the main points. Unlike basic approaches that just extract the first few sentences, this AI tool to shorten long documents actually understands the content and rephrases it — so even if the most important information is buried in the middle, it still makes it into the summary. Students use it to condense essay into summary online formats before diving deeper, while researchers and professionals use it to summarize long article content, reports, and meeting notes faster.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste the text you want to summarize into the input box.",
      "Stay under 500 words for best results — longer documents can be summarized in sections.",
      "Click Summarize and wait a few seconds while the AI processes your text.",
      "Read the concise summary in the output area.",
      "Click Copy to use the summary in your notes, email, or report.",
    ],
  },
  {
    heading: "Why Use AI Text Summarizer Online?",
    body: "Free to use with no account required, and it works as an automatic text summarizer no login users can start instantly. Powered by OpenAI's GPT model to produce genuine, readable summaries rather than just clipping sentences. Your text is sent to the AI for processing, so this tool is best suited for non-sensitive content like articles, essays, and public documents. If you regularly deal with long reading lists and limited time, this tool saves meaningful hours every week.",
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
  {
    question: "Can I use this to summarize a research paper or long article?",
    answer:
      "Yes. Paste the full text of a research paper, news article, or long report and the AI will generate a concise summary that captures the key points. This is useful for students reviewing sources, professionals scanning reports, or anyone who needs to quickly understand a long document without reading it in full.",
  },
  {
    question: "How is this AI summarizer different from just copying the first paragraph?",
    answer:
      "The first paragraph of an article does not always contain the most important information — especially in academic papers where conclusions appear at the end. The AI reads the entire text and identifies the most significant ideas across all sections, producing a summary that reflects the full content rather than just the introduction.",
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
