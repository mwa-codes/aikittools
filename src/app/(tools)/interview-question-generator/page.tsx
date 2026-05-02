import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import InterviewQuestionGeneratorTool from "../../../components/tool-ui/InterviewQuestionGeneratorTool";

const SLUG = "interview-question-generator";

export const metadata: Metadata = {
  title: "AI Interview Question Generator – Prep for Any Role Free",
  description:
    "Get likely interview questions for any job title or industry, with suggested answers. Free AI tool, no signup needed. Start preparing in under 30 seconds.",
  keywords:
    "interview question generator, AI interview prep, job interview questions, interview questions for software engineer, free interview prep tool, interview questions by job title",
  openGraph: {
    title: "Free AI Interview Question Generator | AI Kit Tools",
    description:
      "Get 10 likely interview questions for any job title with answer tips. Free, instant, no signup required.",
    url: "https://www.aikittools.com/interview-question-generator",
    images: [
      {
        url: "https://www.aikittools.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free AI Interview Question Generator — AI Kit Tools",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aikittools.com/interview-question-generator",
    languages: {
      "en-US": "https://www.aikittools.com/interview-question-generator",
    },
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the AI Interview Question Generator?",
    body: "This free interview question generator uses AI to predict the most likely questions you will face in your next job interview based on your specific job title. Instead of reading generic interview guides, you get questions tailored to your actual role — whether you are a software engineer, marketing manager, registered nurse, or barista. Each question comes with a practical answer tip so you know exactly how to approach it. Free, instant, and no account required.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Enter the job title you are interviewing for",
      "Optionally add the company name for more tailored questions",
      "Select your experience level so questions match your seniority",
      "Choose the interview type — behavioral, technical, or mixed",
      "Click Generate and get 10 interview questions instantly",
      "Read the answer tip for each question before your interview",
      "Copy all questions to use in your prep notes",
    ],
  },
  {
    heading: "Why Use an AI Interview Question Generator?",
    body: "Most job seekers walk into interviews underprepared because they practice generic questions that never come up. This tool predicts role-specific questions by analyzing what interviewers actually ask for your job title. The answer tips give you a framework for each response so you are not starting from scratch. It is completely free, requires no account, and takes under 30 seconds to generate 10 targeted questions.",
  },
  {
    heading: "Related Tools",
    body: "Try AI Cover Letter Generator, Resume Bullet Point Generator, AI Text Summarizer, and Free Invoice Generator for your job search workflow.",
  },
];

const faqs = [
  {
    question: "Is this interview question generator really free?",
    answer:
      "Yes. Completely free, no account required, no usage limits. Enter your job title and generate as many times as you need.",
  },
  {
    question: "How accurate are the generated interview questions?",
    answer:
      "The AI generates questions based on common interview patterns for your specific job title and experience level. Most questions will be highly relevant, but every interview is different. Use these as a preparation framework, not a guaranteed prediction.",
  },
  {
    question: "What is the difference between behavioral and technical questions?",
    answer:
      "Behavioral questions ask about past experiences and situations, for example 'Tell me about a time you handled a difficult colleague.' Technical questions test job-specific knowledge and skills, for example 'Explain the difference between REST and GraphQL.' Mixed gives you a combination of both.",
  },
  {
    question: "Can I use this for any job or industry?",
    answer:
      "Yes — software engineer, nurse, teacher, sales manager, graphic designer, accountant. The AI tailors the questions to your specific job title and adjusts the language and focus automatically.",
  },
  {
    question: "Does the AI store my information?",
    answer:
      "No. Your input is sent to OpenAI for processing only and is not stored on our servers. OpenAI does not use API data for model training by default.",
  },
  {
    question: "Should I add the company name?",
    answer:
      "Adding the company name helps the AI generate more contextually relevant questions. For example, a software engineer interviewing at a startup gets different questions than one interviewing at a large enterprise. It is optional but recommended.",
  },
  {
    question: "How should I use the answer tips?",
    answer:
      "Each answer tip gives you a framework or key point to hit in your response. Use it as a starting structure, then add your own specific examples and experiences. The STAR method works well for behavioral questions — Situation, Task, Action, Result.",
  },
  {
    question: "Are these questions ATS or HR friendly?",
    answer:
      "These are interview questions, not resume content, so ATS does not apply. The questions are based on real interview patterns used by US hiring managers and HR teams across industries.",
  },
];

export default function InterviewQuestionGeneratorPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Interview Question Generator",
    url: "https://www.aikittools.com/interview-question-generator",
    description:
      "Free AI-powered interview question generator. Get 10 likely interview questions for any job title with answer tips. No signup required.",
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
    "cover-letter-generator",
    "resume-bullet-generator",
    "ai-text-summarizer",
    "invoice-generator",
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
        <InterviewQuestionGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
