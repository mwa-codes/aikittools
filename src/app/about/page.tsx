import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import Link from "next/link";
import { tools } from "@/lib/tools/registry";

export const metadata: Metadata = buildMetadata({
  title: "About AI Kit Tools – Job Tracker & AI Career Tools",
  description:
    "Learn about AI Kit Tools: free job application tracker, AI cover letters, ATS resume check, and interview prep for US job seekers — plus fast, privacy-respecting utilities.",
  keywords: [
    "about ai kit tools",
    "free job application tracker",
    "ai career tools",
    "aikittools",
  ],
  slug: "about",
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About AI Kit Tools</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p className="text-lg leading-relaxed">
          <strong className="text-gray-900">AI Kit Tools</strong> focuses on{" "}
          <strong className="text-gray-900">free AI career tools</strong> for job seekers — including a
          job application tracker, cover letter and resume help, ATS checks, and interview prep —
          alongside fast, privacy-respecting utilities for everyday tasks.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Our Mission</h2>
        <p className="leading-relaxed">
          Job search tools shouldn&apos;t be locked behind paywalls or noisy signup funnels. We build
          simple, useful career tools (and free utilities) that are fast, honest, and easy to use —
          most with no account required to get started. Our goal is to help you stay organized, sound
          professional, and move applications forward without friction.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">What We Offer</h2>
        <ul className="space-y-2">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/${tool.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {tool.icon} {tool.name}
              </Link>{" "}
              — {tool.shortDescription}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Privacy First</h2>
        <p className="leading-relaxed">
          Many tools on AI Kit Tools process data entirely in your browser — so drafts, JSON, URLs,
          and encoded content often never leave your device. Features that use AI (cover letters,
          resume checks, summarizer, etc.) send only what you submit to the OpenAI API to generate a
          result; we do not sell your data.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Built for Speed</h2>
        <p className="leading-relaxed">
          AI Kit Tools is built with Next.js and deployed on Vercel. Pages are server-rendered for
          fast initial loads, and tool interactions are handled entirely on the client side for
          instant responsiveness. We obsess over Core Web Vitals so your tools load fast, every
          time.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Contact</h2>
        <p className="leading-relaxed">
          Have a suggestion for a new tool, found a bug, or want to partner with us? Reach out at{" "}
          <a
            href="mailto:m.waqar.ahmed@gmail.com"
            className="text-blue-600 hover:text-blue-800"
          >
            m.waqar.ahmed@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
