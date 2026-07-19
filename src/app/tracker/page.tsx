import type { Metadata } from "next";
import Link from "next/link";
import TrackerApp from "@/components/tracker/TrackerApp";
import FAQSection from "@/components/seo/FAQSection";
import ToolSEOContent from "@/components/seo/ToolSEOContent";
import RelatedTools from "@/components/RelatedTools";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";
import { getToolsBySlugs } from "@/lib/tools/registry";

const relatedTools = getToolsBySlugs([
  "cover-letter-generator",
  "resume-bullet-generator",
  "ats-resume-checker",
  "interview-question-generator",
]);

export const metadata: Metadata = {
  title: "Job Application Tracker – Track Every Application Free",
  description:
    "Free job application tracker from AI Kit Tools. Career Health Score — see your response rate, interview conversion, and what to fix first. AI cover letters and follow-ups for every application.",
  keywords:
    "job application tracker, free job tracker, track job applications, job search tracker, application status tracker",
  openGraph: {
    title: "Free Job Application Tracker | AI Kit Tools",
    description:
      "Track all your job applications in one place with AI Kit Tools. Free tracker with AI cover letters, follow-up emails, and Career Health Score — no spreadsheet needed.",
    url: "https://www.aikittools.com/tracker",
    siteName: "AI Kit Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Job Application Tracker | AI Kit Tools",
    description:
      "Track every application with AI Kit Tools — AI cover letters, follow-up emails, and Career Health Score. Free, no spreadsheet required.",
  },
  alternates: {
    canonical: "/tracker",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Job Application Tracker?",
    body: "This free job application tracker lets you organize every role you apply to — tracking statuses, notes, and dates in one place. Unlike a spreadsheet, it also lets you AI-generate a tailored cover letter and follow-up email for each specific job. No account required to track your first 5 applications. It is completely free and designed for active job seekers who want to stay organized and never miss a follow-up.",
  },
  {
    heading: "How to Use This Tracker",
    body: [
      "Add a job application with company, role, and date",
      "Set status: Applied, Interview, Offer, Rejected, or Ghosted",
      "Use AI Tools to generate a cover letter or follow-up email per job",
      "Update status as your application progresses",
      "Sign up free to save unlimited applications",
    ],
  },
  {
    heading: "Why Use a Job Application Tracker?",
    body: "Most job seekers lose track after applying to 10 or more jobs — missing follow-ups, forgetting which resume version they sent, and losing momentum. A dedicated tracker keeps everything visible at a glance so you always know where each application stands. With built-in AI tools, you can generate tailored cover letters and polished follow-up emails in seconds instead of spending an hour writing from scratch. Stay organized, follow up consistently, and land more interviews.",
  },
  {
    heading: "Tracker vs Spreadsheet: When Each Works Best",
    body: [
      "Spreadsheet is okay for short bursts and very low application volume",
      "Tracker is better when you need status changes, notes, and follow-up rhythm",
      "Tracker keeps role-specific AI assets with each application",
      "Tracker gives you a career funnel view instead of disconnected rows",
    ],
  },
  {
    heading: "What to Do If You Are Not Getting Interviews",
    body: [
      "Check ATS score for your top target role and fix missing keywords",
      "Refresh 2-3 weakest resume bullets with quantified impact",
      "Send follow-ups for applications older than 7-10 days",
      "Practice likely interview questions before your next screening call",
    ],
  },
];

const faqs = [
  {
    question: "Is this job application tracker really free?",
    answer:
      "Yes. You can track up to 5 job applications completely free with no account required. Create a free account to save unlimited applications.",
  },
  {
    question: "Do I need a spreadsheet to track job applications?",
    answer:
      "No. This tracker replaces your spreadsheet with a clean dashboard, status tracking, notes, and AI tools — all in one place.",
  },
  {
    question: "Can I generate a cover letter for each job inside the tracker?",
    answer:
      "Yes. Each application has an AI Tools button that lets you generate a tailored cover letter and follow-up email for that specific company and role.",
  },
  {
    question: "What job application statuses can I track?",
    answer:
      "You can track: Applied, Interview, Offer, Rejected, and Ghosted. Update the status as your application progresses.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Guest data is stored locally in your browser only. When you create a free account, your data is stored securely in our database and never shared.",
  },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Job Application Tracker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free job application tracker with AI cover letter and follow-up email generation. No signup required for first 5 jobs.",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to use the Job Application Tracker",
  description: "Step-by-step guide to track applications and follow up consistently.",
  totalTime: "PT10M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Add a new job", text: "Add company, role, and application date." },
    { "@type": "HowToStep", position: 2, name: "Set status", text: "Set status to Applied, Interview, Offer, Rejected, or Ghosted." },
    { "@type": "HowToStep", position: 3, name: "Generate AI assets", text: "Create a tailored cover letter or follow-up email for the role." },
    { "@type": "HowToStep", position: 4, name: "Review weekly", text: "Review stalled applications weekly and send follow-ups." },
  ],
};

export default function TrackerPage() {
  return (
    <WorkspaceShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Page Header */}
      <header className="mb-8 rounded-2xl border border-slate-200 bg-linear-to-b from-white to-slate-50 px-5 sm:px-7 py-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl sm:text-4xl rounded-xl bg-white border border-slate-200 w-11 h-11 sm:w-12 sm:h-12 grid place-items-center shrink-0">
            📋
          </span>
          <div>
            <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-1">
              New
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Job Application Tracker
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-sm sm:text-base ml-0 sm:ml-[60px] leading-relaxed">
          Track every job you apply to. Generate cover letters and follow-up emails with AI. Free,
          no spreadsheet needed.
        </p>
        <p className="text-gray-600 text-sm sm:text-base ml-0 sm:ml-[60px] mt-3 leading-relaxed">
          New to job tracking?{" "}
          <Link
            href="/blog/how-to-track-job-applications"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Read our free guide on how to track job applications →
          </Link>
        </p>
        <p className="mt-3 text-xs text-gray-500 ml-0 sm:ml-[60px]">
          Last updated: May 6, 2026 · Reviewed by: AI Kit Tools Editorial Team
        </p>
      </header>

      {/* Tracker UI (Client Component) */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        <TrackerApp />
      </div>

      {/* SEO Content */}
      <ToolSEOContent sections={seoSections} />

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* Related Tools — internal links for crawlers and users */}
      <RelatedTools tools={relatedTools} />
    </WorkspaceShell>
  );
}
