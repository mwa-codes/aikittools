import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import Link from "next/link";
import { tools } from "@/lib/tools/registry";

export const metadata: Metadata = buildMetadata({
  title: "About AI Kit Tools – Free Online Tools for Everyone",
  description:
    "Learn about AI Kit Tools – a collection of free, fast, and privacy-respecting online tools for text processing, JSON, QR codes, encoding, and AI.",
  keywords: ["about ai kit tools", "free online tools", "aikittools"],
  slug: "about",
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About AI Kit Tools</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p className="text-lg leading-relaxed">
          <strong className="text-gray-900">AI Kit Tools</strong> is a collection of free, fast, and
          privacy-respecting online tools designed for developers, students, writers, and anyone who
          needs quick utility tools without friction.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Our Mission</h2>
        <p className="leading-relaxed">
          The web is full of tools buried behind paywalls, sign-up forms, and intrusive ads. We
          believe that simple utility tools should be free, instant, and accessible to everyone. Our
          goal is to build the best collection of free online tools that work without signup, without
          tracking, and without unnecessary complexity.
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
          Most tools on AI Kit Tools process data entirely in your browser. This means your text,
          JSON, URLs, and encoded data never leave your device. The only exception is the AI Text
          Summarizer, which sends text to the OpenAI API — we do not store or log this data on our
          servers.
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
