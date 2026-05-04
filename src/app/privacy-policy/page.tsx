import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy – AI Kit Tools",
  description:
    "Privacy policy for AI Kit Tools — job tracker, AI career tools, and utilities. We respect your privacy; most tools process data in your browser and we do not sell your data.",
  keywords: ["privacy policy", "aikittools privacy"],
  slug: "privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: April 28, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p className="leading-relaxed">
          At <strong className="text-gray-900">AI Kit Tools</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), your
          privacy is important to us. This policy explains what data we collect, how we use it, and
          your rights.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">1. Data We Collect</h2>
        <p className="leading-relaxed">
          We collect minimal data. Specifically:
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            <strong>Usage Analytics:</strong> We may use privacy-friendly analytics (such as Vercel
            Analytics) to understand how visitors use the site. This does not include personally
            identifiable information.
          </li>
          <li>
            <strong>AI Summarizer Input:</strong> When you use the AI Text Summarizer, your input
            text is sent to the OpenAI API to generate a summary. We do not store this text on our
            servers.
          </li>
        </ul>
        <p className="leading-relaxed">
          All other tools (Word Counter, JSON Formatter, QR Code Generator, Base64 Encoder, URL
          Encoder/Decoder) process data <strong>entirely in your browser</strong>. No data is sent
          to our servers.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">2. Cookies</h2>
        <p className="leading-relaxed">
          We do not use tracking cookies. If we use analytics, it may use a small anonymous
          identifier, but no personal data is associated with it.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">3. Third-Party Services</h2>
        <p className="leading-relaxed">
          We use the following third-party services:
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            <strong>OpenAI:</strong> Used for the AI Text Summarizer. Please review{" "}
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
          <li>
            <strong>Google AdSense (future):</strong> We may display Google AdSense ads in the
            future. Google may use cookies to serve relevant ads.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">4. Data Retention</h2>
        <p className="leading-relaxed">
          We do not store user-submitted tool content. Server logs (standard web server access
          logs) may be retained for up to 30 days for security and debugging purposes.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">5. Children&apos;s Privacy</h2>
        <p className="leading-relaxed">
          Our services are not directed to children under 13. We do not knowingly collect personal
          information from children.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">6. Changes to This Policy</h2>
        <p className="leading-relaxed">
          We may update this policy from time to time. The date at the top of this page will reflect
          the most recent update. We encourage you to review this page periodically.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">7. Contact</h2>
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
