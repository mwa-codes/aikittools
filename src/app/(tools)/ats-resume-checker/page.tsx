import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import AtsResumeCheckerTool from "../../../components/tool-ui/AtsResumeCheckerTool";

const SLUG = "ats-resume-checker";

export const metadata: Metadata = {
  title: "ATS Resume Checker – See If Your Resume Passes Screening",
  description:
    "Upload your resume and check if it passes ATS filters before you apply. AI-powered, free, no signup. Built for US job seekers using real job descriptions.",
  keywords:
    "ATS resume checker, free ATS checker, resume ATS scanner, ATS resume scanner free, applicant tracking system checker, resume keyword checker, ATS friendly resume checker",
  openGraph: {
    title: "Free ATS Resume Checker | AI Kit Tools",
    description:
      "Check if your resume passes ATS screening. Get a match score and missing keywords instantly. Free, no signup required.",
    url: "https://www.aikittools.com/ats-resume-checker",
  },
  alternates: {
    canonical: "https://www.aikittools.com/ats-resume-checker",
    languages: {
      "en-US": "https://www.aikittools.com/ats-resume-checker",
    },
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the ATS Resume Checker?",
    body: "This free ATS resume checker uses AI to compare your resume against a job description and tell you exactly how well it matches what applicant tracking systems are looking for. ATS software is used by over 90% of US employers to automatically filter resumes before a human ever sees them. If your resume is missing the right keywords or is formatted incorrectly, it gets rejected automatically. This tool identifies missing keywords, calculates a match score, and tells you exactly what to fix — all free, no account required.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste your full resume text into the resume field",
      "Paste the job description you are applying for",
      "Click Check ATS Score to analyze the match",
      "Review your ATS match score out of 100",
      "See which important keywords are missing from your resume",
      "See which keywords you already have that match",
      "Add the missing keywords naturally into your resume",
      "Re-check until your score is above 75",
    ],
  },
  {
    heading: "Why Use a Free ATS Resume Checker?",
    body: "Most job seekers never see their application get rejected by ATS — they just never hear back. This tool shows you exactly why that happens and what to fix. By matching your resume keywords to the job description before applying, you dramatically increase the chance of a human recruiter actually seeing your resume. Unlike paid tools like Jobscan, this checker is completely free with no account and no usage limits.",
  },
  {
    heading: "Related Tools",
    body: "Try Job Application Tracker, AI Cover Letter Generator, Resume Bullet Generator, Interview Question Generator, and LinkedIn Summary Generator for your complete job search workflow.",
  },
  {
    heading: "What This ATS Checker Does and Does Not Do",
    body: [
      "Does: Compare resume language against a specific job description",
      "Does: Surface missing and matched keywords for faster targeting",
      "Does not: Guarantee interviews or hiring outcomes",
      "Does not: Fully validate visual formatting in exported PDF templates",
    ],
  },
  {
    heading: "Where to Place Missing Keywords Naturally",
    body: [
      "Summary: include your 2-3 most important role keywords",
      "Experience bullets: tie each keyword to a real accomplishment",
      "Skills section: list exact tool and platform terms from the posting",
      "Project section: reinforce domain terms recruiters expect",
    ],
  },
];

const faqs = [
  {
    question: "What is ATS and why does it matter?",
    answer:
      "ATS stands for Applicant Tracking System. It is software used by over 90% of US employers to automatically scan, filter, and rank resumes before a human recruiter reviews them. Resumes that do not match enough keywords from the job description are automatically rejected. A strong ATS score significantly increases your chance of getting an interview.",
  },
  {
    question: "Is this ATS resume checker really free?",
    answer:
      "Yes. Completely free, no account required, no usage limits. Paste your resume and job description and check as many times as you need.",
  },
  {
    question: "What ATS score should I aim for?",
    answer:
      "Aim for a score of 75 or above before applying. A score below 60 means your resume is likely missing too many critical keywords and may be filtered out automatically. Above 80 is excellent and means your resume is well-matched to the job description.",
  },
  {
    question: "Should I keyword stuff my resume to get a higher score?",
    answer:
      "No. Add missing keywords naturally into your existing bullet points and descriptions. Keyword stuffing — repeating words unnaturally — is easy for human recruiters to spot and will hurt your chances in the human review stage even if you pass the ATS filter.",
  },
  {
    question: "Does resume format affect ATS?",
    answer:
      "Yes. ATS systems struggle with tables, columns, headers and footers, text boxes, and graphics. Use a simple single-column format with standard section headings like Work Experience, Education, and Skills. This tool checks keywords, not formatting — use a plain text resume for the most accurate results.",
  },
  {
    question: "Does the AI store my resume?",
    answer:
      "No. Your resume and job description are sent to OpenAI for processing only and are not stored on our servers. OpenAI does not use API data for model training by default. Do not paste resumes containing sensitive personal information like social security numbers.",
  },
  {
    question: "How is this different from Jobscan?",
    answer:
      "Jobscan charges a monthly subscription and limits free scans. This tool is completely free with no limits and no account. The core functionality — comparing resume keywords against a job description — is the same.",
  },
  {
    question: "Can I use this for any job or industry?",
    answer:
      "Yes. Software engineer, nurse, accountant, teacher, sales manager — paste any resume and any job description and the AI analyzes the keyword match for that specific role and industry.",
  },
];

const howToSteps = [
  "Paste your full resume text",
  "Paste the exact job description",
  "Click Check ATS Score",
  "Review missing keywords and keyword matches",
  "Update resume language and re-check until your score improves",
];

export default function AtsResumeCheckerPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ATS Resume Checker",
    url: "https://www.aikittools.com/ats-resume-checker",
    description:
      "Free AI-powered ATS resume checker. Paste your resume and job description to get an ATS match score and missing keywords instantly. No signup required.",
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
        <AtsResumeCheckerTool />
      </ToolPageLayout>
    </>
  );
}
