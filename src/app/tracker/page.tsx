import type { Metadata } from "next";
import TrackerApp from "@/components/tracker/TrackerApp";
import FAQSection from "@/components/seo/FAQSection";
import ToolSEOContent from "@/components/seo/ToolSEOContent";

export const metadata: Metadata = {
  title: "Free Job Application Tracker — Track Every Application | AI Kit Tools",
  description:
    "Track all your job applications in one place. Free job application tracker with AI cover letter and follow-up email generator. No spreadsheet needed.",
  keywords:
    "job application tracker, free job tracker, track job applications, job search tracker, application status tracker",
  openGraph: {
    title: "Free Job Application Tracker | AI Kit Tools",
    description:
      "Track all your job applications in one place. Free job application tracker with AI cover letter and follow-up email generator. No spreadsheet needed.",
    url: "https://www.aikittools.com/tracker",
    siteName: "AI Kit Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Job Application Tracker | AI Kit Tools",
    description:
      "Track every job application with AI-powered cover letters and follow-up emails. Free, no spreadsheet needed.",
  },
  alternates: {
    canonical: "https://www.aikittools.com/tracker",
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

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Job Application Tracker",
  url: "https://www.aikittools.com/tracker",
  description:
    "Free job application tracker with AI cover letter and follow-up email generator. Track every job application with status updates, notes, and AI tools.",
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

export default function TrackerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

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
      </header>

      {/* Tracker UI (Client Component) */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        <TrackerApp />
      </div>

      {/* SEO Content */}
      <ToolSEOContent sections={seoSections} />

      {/* FAQ */}
      <FAQSection faqs={faqs} />
    </div>
  );
}
