import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import AIVisibilityCheckerTool from "@/components/tool-ui/AIVisibilityCheckerTool";

const SLUG = "ai-visibility-checker";

export const metadata: Metadata = {
  title: "AI Visibility Checker – See If ChatGPT Recommends Your Brand",
  description:
    "Free AI visibility checker (GEO). Find out whether AI models like ChatGPT mention your brand when people ask for recommendations, which competitors show up instead, and how to improve. No signup.",
  keywords:
    "AI visibility checker, GEO checker, generative engine optimization, is my brand cited by ChatGPT, share of model, AI search visibility, does ChatGPT recommend my brand, brand visibility in AI",
  openGraph: {
    title: "Free AI Visibility Checker (GEO) | AI Kit Tools",
    description:
      "See if AI models recommend your brand — and who they name instead. Free, no signup required.",
    url: "https://www.aikittools.com/ai-visibility-checker",
  },
  alternates: {
    canonical: "/ai-visibility-checker",
    languages: {
      "en-US": "/ai-visibility-checker",
    },
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the AI Visibility Checker?",
    body: "This free tool shows you whether AI models like ChatGPT mention your brand when someone asks them for a recommendation. As more people ask AI assistants 'what's the best X?' instead of searching Google, being named in those answers — your 'share of model' — is becoming as important as ranking in search results. This process is called Generative Engine Optimization (GEO). Enter your brand and category, and the tool asks an AI the questions your customers would ask, then reports whether you showed up, how prominently, and which competitors the AI named instead.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Enter your brand or product name exactly as customers would say it",
      "Describe your category the way someone would ask an AI (e.g. 'project management software')",
      "Optionally add a specific question your customers might ask",
      "Click Check AI Visibility",
      "Review your score, the per-question breakdown, and the competitors named instead",
      "Use the improvement tips to raise your visibility over time",
    ],
  },
  {
    heading: "Why AI Visibility (GEO) Matters Now",
    body: "AI assistants increasingly answer questions directly instead of sending users to a list of links. When someone asks ChatGPT for the best tool, service, or product in your space, the brands it names capture that intent — and the ones it omits become invisible, no matter how well they rank on Google. Checking your AI visibility tells you where you stand today so you can decide whether GEO deserves a place in your marketing.",
  },
  {
    heading: "How the Score Works",
    body: "The tool asks an AI model several realistic recommendation questions about your category. It then checks each answer for your brand and weighs two things: how often you were mentioned across the answers, and how early you appeared in each one. A higher score means the AI names your brand readily and prominently; a low or zero score means the AI rarely or never brings you up unprompted.",
  },
  {
    heading: "How to Improve Your AI Visibility",
    body: [
      "Get featured in 'best of' listicles and comparison articles AI models are trained on",
      "Build authentic presence on Reddit, Quora, and industry communities",
      "Add structured data (Organization and Product schema) to your website",
      "Earn authoritative third-party citations and, if you qualify, a Wikipedia page",
      "Publish 'alternatives to [competitor]' content that positions your brand in the category",
    ],
  },
];

const faqs = [
  {
    question: "Is this AI visibility checker really free?",
    answer:
      "Yes. It's free with a small daily limit on the number of checks to keep it available for everyone. No account or signup is required.",
  },
  {
    question: "Does this check live ChatGPT or Google search results?",
    answer:
      "No. It measures whether an AI model mentions your brand from its trained knowledge when asked for recommendations — often called your 'share of model.' It does not scrape live search results or real-time citations. Think of it as a directional signal of how present your brand is in the AI's knowledge, not an exact live measurement.",
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer:
      "GEO is the practice of improving how often and how favorably AI assistants mention your brand in their answers. It's the AI-era counterpart to SEO: instead of optimizing to rank in a list of links, you optimize to be named in the AI's synthesized recommendation.",
  },
  {
    question: "Why did I get a different score when I ran it again?",
    answer:
      "AI models are probabilistic — they can phrase answers differently each time, so your brand may appear in one run and not the next. That's why the score is a directional signal. Run it a few times to get a feel for the range rather than treating a single number as exact.",
  },
  {
    question: "My brand scored zero. What does that mean?",
    answer:
      "It means the AI didn't mention your brand unprompted when asked for recommendations in your category. That's common for newer or smaller brands. Use the improvement tips — listicles, community presence, structured data, and citations are the main levers that influence what AI models recommend.",
  },
  {
    question: "Which AI model does this use?",
    answer:
      "This tool queries OpenAI's GPT model. Different AI engines (Perplexity, Gemini, Claude) may give different results because they're trained and updated differently. Checking one strong model gives you a solid directional read on your overall AI visibility.",
  },
];

const howToSteps = [
  "Enter your brand or product name",
  "Describe your category the way a customer would ask an AI",
  "Optionally add a specific customer question",
  "Click Check AI Visibility",
  "Review your score, breakdown, competitors, and improvement tips",
];

export default function AIVisibilityCheckerPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Visibility Checker",
    url: "https://www.aikittools.com/ai-visibility-checker",
    description:
      "Free AI visibility checker (GEO). See whether AI models mention your brand when people ask for recommendations, which competitors appear, and how to improve.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "AI Kit Tools",
      url: "https://www.aikittools.com",
    },
  };

  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "cover-letter-generator",
    "resume-bullet-generator",
    "linkedin-summary-generator",
    "ats-resume-checker",
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <ToolPageLayout
        tool={tool}
        relatedTools={relatedTools}
        faqs={faqs}
        seoSections={seoSections}
        howToSteps={howToSteps}
        lastUpdated="July 21, 2026"
        reviewedBy="AI Kit Tools Editorial Team"
      >
        <AIVisibilityCheckerTool />
      </ToolPageLayout>
    </>
  );
}
