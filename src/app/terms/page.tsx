import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service – AI Kit Tools",
  description:
    "Terms of service for AI Kit Tools career products, including the job tracker and AI job search tools.",
  keywords: ["terms of service", "aikittools terms"],
  slug: "terms",
});

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 5, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p className="leading-relaxed">
          By accessing or using <strong className="text-gray-900">AI Kit Tools</strong>{" "}
          (aikittools.com), you agree to be bound by these Terms of Service. If you do not agree,
          please do not use our services.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">1. Use of Service</h2>
        <p className="leading-relaxed">
          AI Kit Tools provides career-focused software and AI tools for job seekers. You agree to
          use the service only for lawful purposes. You must not:
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Use the service to process illegal, harmful, or offensive content.</li>
          <li>Attempt to reverse engineer, disrupt, or resell the service.</li>
          <li>Use automated scraping or bots to excessively consume server resources.</li>
          <li>Use the AI tools to generate misleading, harmful, discriminatory, or deceptive content.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">2. Intellectual Property</h2>
        <p className="leading-relaxed">
          The AI Kit Tools name, logo, and website design are the intellectual property of AI Kit
          Tools. Subject to applicable law and third-party provider terms, outputs generated from
          your inputs belong to you.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">3. Disclaimer of Warranties</h2>
        <p className="leading-relaxed">
          The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that
          the tools will always be available, accurate, or error-free. AI-generated content may be
          inaccurate or incomplete, and does not constitute legal, hiring, or professional advice.
          Always review outputs before using them in applications or communications.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">4. Limitation of Liability</h2>
        <p className="leading-relaxed">
          To the maximum extent permitted by law, AI Kit Tools shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use of the service.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">5. Third-Party Services</h2>
        <p className="leading-relaxed">
          Parts of our AI functionality rely on third-party providers such as OpenAI. By using those
          features, you also agree to relevant third-party terms, including{" "}
          <a
            href="https://openai.com/policies/usage-policies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            OpenAI&apos;s usage policies
          </a>
          .
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">6. Account and Access</h2>
        <p className="leading-relaxed">
          Some features may require an account. You are responsible for maintaining account security
          and for activities under your account. We may suspend or terminate access for abuse,
          security risk, or violations of these terms.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">7. Changes to Terms</h2>
        <p className="leading-relaxed">
          We reserve the right to modify these terms at any time. Continued use of the service
          after changes constitutes your acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">8. Governing Law</h2>
        <p className="leading-relaxed">
          These terms are governed by applicable law. Any disputes shall be handled in good faith
          and may be escalated to arbitration if necessary.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">9. Contact</h2>
        <p className="leading-relaxed">
          Questions about these terms? Contact us at{" "}
          <a href="mailto:m.waqar.ahmed@gmail.com" className="text-blue-600 hover:text-blue-800">
            m.waqar.ahmed@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
