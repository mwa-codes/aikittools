import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CoverLetterGeneratorTool from "@/components/tool-ui/CoverLetterGeneratorTool";

const SLUG = "cover-letter-generator";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator – Tailored Letters in Seconds",
  description:
    "Generate a personalized cover letter for any job using AI. Paste the job description and get a ready-to-send letter instantly. Free, no signup required.",
  keywords:
    "free cover letter generator, AI cover letter writer, cover letter generator no sign up, cover letter maker free, AI cover letter generator",
  openGraph: {
    title: "Free AI Cover Letter Generator | AI Kit Tools",
    description: "Write a tailored cover letter in seconds with AI. Free, no signup required.",
    url: "https://www.aikittools.com/cover-letter-generator",
  },
  alternates: {
    canonical: "/cover-letter-generator",
    languages: {
      "en-US": "/cover-letter-generator",
    },
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the AI Cover Letter Generator?",
    body: "This free cover letter generator uses AI to draft a personalized cover letter from your job title, target company, and relevant experience. It works in seconds, requires no signup, and helps you move from blank page to polished first draft instantly. If you need an AI cover letter writer or a cover letter generator no sign up option, this tool is built for that exact workflow.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Enter the job title you're applying for",
      "Add the company name for a personalized touch",
      "Describe your relevant experience in a few sentences",
      "Choose your preferred tone",
      "Click Generate and get your cover letter instantly",
      "Copy and customize before sending",
    ],
  },
  {
    heading: "Why Use an AI Cover Letter Generator?",
    body: "It saves time, removes writer's block, and gives you a tailored draft for each role instead of forcing generic templates. Because the output is based on your actual experience, the letter sounds more relevant and specific. It is completely free and does not require an account, so you can generate and refine drafts as often as you need.",
  },
  {
    heading: "Related Tools",
    body: "Try Job Application Tracker, Resume Bullet Generator, ATS Resume Checker, Interview Question Generator, and LinkedIn Summary Generator for your workflow.",
  },
  {
    heading: "Bad vs Better Cover Letter Openings",
    body: [
      "Bad: I am applying for this role and think I would be a great fit.",
      "Better: I have led lifecycle campaigns that lifted trial-to-paid conversions by 22%, and I would bring that same data-driven growth approach to your team.",
      "Bad: I am passionate and hardworking.",
      "Better: Over 4 years in customer success, I improved renewal rates from 81% to 91% by redesigning onboarding and QBR workflows.",
    ],
  },
  {
    heading: "Common Mistakes This Tool Helps You Avoid",
    body: [
      "Generic first paragraph with no role or company context",
      "Repeating resume bullets without connecting them to job needs",
      "Weak closing with no call to action",
      "Overly long letters that bury your strongest value",
    ],
  },
];

const faqs = [
  {
    question: "Is this cover letter generator really free?",
    answer:
      "Yes. Completely free, no account required, no hidden limits. Just fill in the fields and generate.",
  },
  {
    question: "How do I make the cover letter sound more personal?",
    answer:
      "The more specific your experience description, the better the output. Instead of 'I have marketing experience,' write '3 years running Facebook ad campaigns with $50k monthly budgets for ecommerce brands.' Specific details produce much stronger cover letters.",
  },
  {
    question: "Can I use this for any job?",
    answer:
      "Yes — software engineer, nurse, teacher, marketing manager, barista. The AI adapts the tone and language to your job title automatically.",
  },
  {
    question: "Does the AI store my information?",
    answer:
      "No. Your information is sent to OpenAI for processing only and is not stored on our servers. OpenAI does not use API data for model training by default.",
  },
  {
    question: "How long is the generated cover letter?",
    answer:
      "Typically 3–4 paragraphs, which is the ideal length hiring managers prefer. Long enough to show value, short enough to actually be read.",
  },
  {
    question: "Is the cover letter ATS-friendly?",
    answer:
      "Yes. The generated letters use clean, plain language without tables or special formatting that ATS systems struggle with.",
  },
];

const howToSteps = [
  "Enter the job title you are applying for",
  "Add the target company name",
  "Describe your relevant experience and achievements",
  "Choose your preferred tone",
  "Click Generate and customize the final draft before sending",
];

export default function CoverLetterGeneratorPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Cover Letter Generator",
    url: "https://www.aikittools.com/cover-letter-generator",
    description:
      "Free AI-powered cover letter generator. Create tailored cover letters in seconds with no signup required.",
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
    "tracker",
    "resume-bullet-generator",
    "ats-resume-checker",
    "interview-question-generator",
    "linkedin-summary-generator",
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
        lastUpdated="May 6, 2026"
        reviewedBy="AI Kit Tools Editorial Team"
      >
        <CoverLetterGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
