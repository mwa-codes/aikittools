import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy – AI Kit Tools",
  description:
    "Privacy policy for AI Kit Tools career tools. Learn how we handle tracker data, AI requests, analytics, and your rights.",
  keywords: ["privacy policy", "aikittools privacy"],
  slug: "privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 5, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p className="leading-relaxed">
          At <strong className="text-gray-900">AI Kit Tools</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;),
          we provide career-focused tools for job seekers, including the Job Application Tracker, AI
          Cover Letter Generator, ATS Resume Checker, Resume Bullet Generator, Interview Question
          Generator, and LinkedIn Summary Generator. This policy explains what data we collect, how
          we use it, and your rights.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">1. Data We Collect</h2>
        <p className="leading-relaxed">
          We collect minimal data needed to run and improve the service. Specifically:
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            <strong>Account &amp; Tracker Data:</strong> If you create an account and use the Job
            Application Tracker, we store the application records and notes you choose to save so
            you can access them across sessions and devices.
          </li>
          <li>
            <strong>Usage Analytics:</strong> We may use privacy-friendly analytics (such as Vercel
            Analytics) to understand how visitors use the site. This does not include personally
            identifiable information.
          </li>
          <li>
            <strong>AI Tool Inputs:</strong> When you use AI-powered career tools, relevant input
            (for example job title, resume text, or prompt content) is sent to AI providers to
            generate responses. We do not sell this data.
          </li>
        </ul>
        <p className="leading-relaxed">
          Some features also run locally in your browser. For guest tracker mode, data may be stored
          locally in your browser until you clear it.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">2. Cookies</h2>
        <p className="leading-relaxed">
          We may use essential cookies or local storage to keep you signed in, maintain sessions,
          and preserve tool state. Analytics may use anonymous identifiers.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">3. Third-Party Services</h2>
        <p className="leading-relaxed">
          We use the following third-party services:
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            <strong>OpenAI:</strong> Used in AI career features. Please review{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              OpenAI&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Vercel:</strong> Used for hosting. Please review{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">4. Data Retention</h2>
        <p className="leading-relaxed">
          We retain data only as long as necessary to provide the service, secure the platform, and
          meet legal obligations. Standard server/security logs may be retained for operational use.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">5. Data Sharing and Sale</h2>
        <p className="leading-relaxed">
          We do not sell your personal data. We may share limited data with processors that help us
          operate the service (for example hosting, analytics, authentication, and AI infrastructure)
          under contractual safeguards.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">6. Children&apos;s Privacy</h2>
        <p className="leading-relaxed">
          Our services are not directed to children under 13. We do not knowingly collect personal
          information from children.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">7. Changes to This Policy</h2>
        <p className="leading-relaxed">
          We may update this policy from time to time. The date at the top of this page reflects the
          most recent update.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">8. Contact</h2>
        <p className="leading-relaxed">
          If you have any questions about this privacy policy, contact us at{" "}
          <a href="mailto:m.waqar.ahmed@gmail.com" className="text-blue-600 hover:text-blue-800">
            m.waqar.ahmed@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
