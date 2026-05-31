import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getAllBlogPosts, formatBlogDate } from "@/lib/blog";
import { careerNavItems } from "@/lib/navigation";
import { DEFAULT_OG_IMAGE_PATH, defaultOpenGraphImages } from "@/lib/utils/metadata";

export const metadata = {
  title: "Free Job Application Tracker & AI Career Tools",
  description:
    "Free job application tracker with built-in AI — generate cover letters, check your resume against ATS, and prep for interviews. No credit card. No signup to start.",
  keywords:
    "free job application tracker, AI cover letter generator, ATS resume checker, free career tools, job search tracker, track job applications online",
  openGraph: {
    title: "Free Job Application Tracker & AI Career Tools",
    description:
      "Track every job, generate AI cover letters, and ace interviews. Free career tools — no credit card required.",
    url: "https://www.aikittools.com",
    siteName: "AI Kit Tools",
    type: "website",
    images: defaultOpenGraphImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Job Application Tracker & AI Career Tools",
    description:
      "Track every job, generate AI cover letters, and ace interviews. Free career tools — no credit card required.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const latestPosts = getAllBlogPosts().slice(0, 3);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Kit Tools",
    url: "https://www.aikittools.com",
    description:
      "Free AI career tools for job seekers — job application tracker, AI cover letter generator, ATS resume checker, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.aikittools.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:whitespace-nowrap">
              Your Free Job Search Command Center
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Track every application, generate AI cover letters, check your resume against ATS, and
              prep for interviews - all free, no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tracker"
                className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Start Tracking Jobs Free
              </Link>
              <Link
                href="#career-tools"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                See All Career Tools
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1">✓ No Credit Card</span>
              <span className="inline-flex items-center gap-1">✓ No Signup to Start</span>
              <span className="inline-flex items-center gap-1">✓ AI-Powered</span>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Job searching is overwhelming. We built the tools to fix that.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                problem: "Lose track of where you applied",
                solution: "Application Tracker with status, notes & dates",
              },
              {
                problem: "Spend hours writing cover letters",
                solution: "AI writes a tailored letter in 10 seconds",
              },
              {
                problem: "Getting ghosted by ATS systems",
                solution: "ATS checker tells you exactly what to fix",
              },
            ].map((item) => (
              <article key={item.problem} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-medium text-slate-500">Problem</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{item.problem}</p>
                <p className="mt-4 text-sm font-medium text-slate-500">Solution</p>
                <p className="mt-1 text-slate-700">{item.solution}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-slate-100 p-8 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Most Popular
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                The Only Free Job Tracker with Built-In AI
              </h2>
              <p className="mt-4 text-slate-700">
                Track every job you apply to. Generate a tailored cover letter and follow-up email
                for each specific role. See your Career Health Score - your response rate, interview
                conversion, and what to fix next.
              </p>
              <ul className="mt-5 space-y-2 text-slate-700">
                <li>✓ Track unlimited applications (free account)</li>
                <li>✓ AI cover letter per job - not a template</li>
                <li>✓ AI follow-up email when you haven&apos;t heard back</li>
                <li>✓ Career Health Score: see your funnel at a glance</li>
                <li>✓ No spreadsheet</li>
              </ul>
              <Link href="/tracker" className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
                Start Tracking Free →
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="rounded-xl border border-slate-200 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">Tracker Preview</p>
                <div className="mt-4 grid gap-3">
                  {["Product Designer - Applied", "Frontend Engineer - Interview", "Growth PM - Follow Up"].map((row) => (
                    <div key={row} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                      <span className="text-sm text-slate-700">{row}</span>
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="career-tools" className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            All Career Tools - All Free
          </h2>
          <p className="mt-2 text-slate-600">6 tools built for one goal: land your next job faster.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {careerNavItems.map((tool) => {
              const Icon = tool.icon;
              return (
                <article key={tool.href} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{tool.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
                  <Link href={tool.href} className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Use Free →
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Built for Serious Job Seekers</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {["6 AI Career Tools", "100% Free to Start", "No Credit Card Ever"].map((stat) => (
              <div key={stat} className="rounded-xl bg-slate-50 p-4 text-center font-semibold text-slate-900">
                {stat}
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate-700">
            AI Kit Tools is a free career toolkit built by job seekers, for job seekers. Every tool
            is purpose-built to help you apply smarter, follow up consistently, and land more
            interviews. No upsells. No paywalls on the features that matter.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Who These Tools Are For
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Students and new grads applying to their first roles",
              "Career switchers tailoring resumes for a new field",
              "Experienced professionals managing high application volume",
            ].map((item) => (
              <article key={item} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Why AI Kit Tools Is Different
          </h2>
          <ul className="mt-5 space-y-2 text-slate-700">
            <li>Each tool focuses on a specific job-search outcome, not generic AI writing.</li>
            <li>Workflows connect together: tracker, resume optimization, interview prep, and LinkedIn.</li>
            <li>Designed for speed and clarity so you can take action in minutes, not hours.</li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { step: "Step 1: Add a job", body: "Paste the role, company, and status" },
              { step: "Step 2: Generate AI assets", body: "Cover letter + follow-up email per job" },
              { step: "Step 3: Track & improve", body: "Watch your Career Health Score rise" },
            ].map((item) => (
              <article key={item.step} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="font-semibold text-slate-900">{item.step}</h3>
                <p className="mt-2 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Job Search Resources
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs text-slate-500">
                  {formatBlogDate(post.date)} · {post.readingTimeLabel}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h3>
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
          <Link href="/blog" className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
            View All Articles →
          </Link>
        </section>

        <section className="mt-14 rounded-3xl bg-slate-900 p-8 text-white shadow-sm sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight">Start Your Job Search the Smart Way</h2>
          <p className="mt-3 text-slate-200">Free forever. No credit card. Takes 30 seconds to start.</p>
          <Link
            href="/tracker"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Open Job Tracker Free →
          </Link>
        </section>
      </div>
    </div>
  );
}
