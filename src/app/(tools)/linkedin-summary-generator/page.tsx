import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import LinkedInSummaryGeneratorTool from "@/components/tool-ui/LinkedInSummaryGeneratorTool";

const SLUG = "linkedin-summary-generator";

export const metadata: Metadata = {
  title: "AI LinkedIn Summary Generator – Write Your About Section",
  description:
    "Generate a professional LinkedIn About section using AI. Enter your role and experience, get a polished summary instantly. Free, no account required.",
  keywords:
    "LinkedIn summary generator, AI LinkedIn summary, LinkedIn about section generator, LinkedIn bio generator free, professional LinkedIn summary, LinkedIn profile summary generator",
  openGraph: {
    title: "Free AI LinkedIn Summary Generator | AI Kit Tools",
    description: "Write a compelling LinkedIn About section in seconds with AI. Free, no signup required.",
    url: "https://www.aikittools.com/linkedin-summary-generator",
  },
  alternates: {
    canonical: "https://www.aikittools.com/linkedin-summary-generator",
    languages: {
      "en-US": "https://www.aikittools.com/linkedin-summary-generator",
    },
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the AI LinkedIn Summary Generator?",
    body: "This free LinkedIn summary generator uses AI to write a professional, compelling LinkedIn About section based on your job title, experience, skills, and career goals. Your LinkedIn About section is one of the first things recruiters and hiring managers read — a weak or empty summary means missed opportunities. This tool helps you write one that sounds human, professional, and specific to your career in seconds. No account required, completely free.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Enter your current job title or the role you are targeting",
      "Describe your years of experience and key skills",
      "Add your top career achievements or proud moments",
      "Describe what you are looking for or your career goals",
      "Choose your preferred tone — professional, conversational, or bold",
      "Click Generate and get your LinkedIn summary instantly",
      "Copy and paste directly into your LinkedIn About section",
      "Customize with personal details before publishing",
    ],
  },
  {
    heading: "Why Use an AI LinkedIn Summary Generator?",
    body: "Most professionals leave their LinkedIn About section blank or fill it with generic buzzwords like 'results-driven professional' that recruiters skip over. This tool writes a summary that actually sounds like you — specific to your role, experience, and goals. A strong LinkedIn summary increases profile views, recruiter messages, and connection acceptance rates. It is completely free, takes under a minute, and requires no account.",
  },
  {
    heading: "Related Tools",
    body: "Try AI Cover Letter Generator, Resume Bullet Point Generator, ATS Resume Checker, and Interview Question Generator to complete your job search toolkit.",
  },
];

const faqs = [
  {
    question: "Is this LinkedIn summary generator really free?",
    answer:
      "Yes. Completely free, no account required, no usage limits. Generate as many versions as you need until you find one you love.",
  },
  {
    question: "How long should a LinkedIn About section be?",
    answer:
      "LinkedIn shows the first 3 lines before the 'See more' button — about 300 characters. Your full About section can be up to 2,600 characters. Aim for 3-5 short paragraphs: a strong opening, your background and skills, key achievements, and what you are looking for. This tool generates a summary optimized for that structure.",
  },
  {
    question: "Should my LinkedIn summary be written in first person or third person?",
    answer:
      "First person. Writing 'I lead product teams' sounds human and approachable. Third person ('John is a product leader') sounds stiff and outdated on LinkedIn. This generator writes in first person by default.",
  },
  {
    question: "What tone should I choose?",
    answer:
      "Professional works for corporate roles like finance, law, and enterprise sales. Conversational works for startups, creative roles, and tech. Bold works for founders, executives, and people who want to stand out. When in doubt, start with Professional and regenerate with Conversational to compare.",
  },
  {
    question: "Can I use this as a fresh graduate with no experience?",
    answer:
      "Yes. Enter your degree, relevant coursework or projects, internships, and what kind of role you are looking for. The AI will write a summary that presents your background confidently even without full-time experience.",
  },
  {
    question: "Does the AI store my information?",
    answer:
      "No. Your information is sent to OpenAI for processing only and is not stored on our servers. OpenAI does not use API data for model training by default.",
  },
  {
    question: "Can I generate multiple versions?",
    answer:
      "Yes. Click Regenerate to get a different version with the same inputs, or change the tone selector and regenerate to compare different styles. Mix and match the best lines from multiple generations.",
  },
  {
    question: "Will this work for any profession or industry?",
    answer:
      "Yes — software engineer, nurse, teacher, marketing manager, accountant, freelancer, or student. The AI adapts the language, tone, and focus to your specific job title and experience automatically.",
  },
];

export default function LinkedInSummaryGeneratorPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI LinkedIn Summary Generator",
    url: "https://www.aikittools.com/linkedin-summary-generator",
    description:
      "Free AI-powered LinkedIn summary generator. Write a professional LinkedIn About section from your role, experience, and goals. No signup required.",
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
    "ats-resume-checker",
    "interview-question-generator",
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
        <LinkedInSummaryGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
