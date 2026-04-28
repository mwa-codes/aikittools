import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import RandomPasswordGeneratorTool from "@/components/tool-ui/RandomPasswordGeneratorTool";

const SLUG = "random-password-generator";

export const metadata: Metadata = buildMetadata({
  title: "Random Password Generator – Create Strong & Secure Passwords Online",
  description:
    "Generate strong and secure passwords instantly with our free random password generator. Customize length, symbols, and numbers easily.",
  keywords: [
    "random password generator",
    "secure password generator",
    "strong password tool",
    "create password online",
    "password maker",
    "generate random password",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is a Random Password Generator?",
    body: "A random password generator is a security-focused tool that creates hard-to-guess passwords using unpredictable character combinations. Instead of choosing common words, names, or dates, this tool builds passwords using uppercase letters, lowercase letters, numbers, and symbols based on your settings. The goal is to create credentials that are far more resistant to brute-force attacks, credential stuffing, and guessing attempts. For modern online accounts, strong unique passwords are essential. Reusing weak passwords across multiple websites can expose your email, banking, social, and work accounts all at once if one platform is breached. With this generator, you can quickly create a fresh password in seconds and use a password manager to save it securely.",
  },
  {
    heading: "How to Use This Password Generator",
    body: [
      "Choose your desired password length with the slider.",
      "Select the character types you want: uppercase, lowercase, numbers, and symbols.",
      "Click Generate Password to create a new secure password instantly.",
      "Review the generated value and click Copy to Clipboard.",
      "Paste it into your signup or account settings form and save it in a password manager.",
    ],
  },
  {
    heading: "Key Features",
    body: "This generator is designed for speed, flexibility, and practical security. You can create short passwords for low-risk logins or long complex strings for critical accounts. Each generated password includes configurable character sets so you can match platform rules quickly. The tool can include at least one character from each selected group, helping avoid rejections on sites that enforce complexity requirements. Copy-to-clipboard support saves time when creating multiple account passwords in a row. Most importantly, generation happens directly in your browser session for a fast, simple workflow. You can regenerate as many times as needed until you find a password format that meets your account policy and personal preferences.",
  },
  {
    heading: "Why Strong Passwords Matter for SEO and Business",
    body: "Website security affects trust, brand reputation, and long-term growth. If your admin accounts or team tools use weak passwords, a compromise can lead to malware injections, spam pages, redirects, or content tampering. Those incidents often hurt search visibility, trigger browser warnings, and reduce user confidence. For business owners, preventing account compromise is not only an IT concern, it is also an operational and marketing concern. Strong password practices reduce downtime risk, protect private customer data, and help maintain a stable website experience. By generating unique passwords for hosting dashboards, CMS accounts, analytics tools, and team logins, you lower the chance that a single leaked password can impact your entire online presence.",
  },
  {
    heading: "Best Practices for Password Security",
    body: "Use a different password for every account, especially for email, domain registrar, payment providers, and admin dashboards. Prefer lengths of 14 to 24 characters when possible. Enable two-factor authentication (2FA) on all important services for an extra layer of protection. Avoid storing passwords in plain text files or chat messages. Instead, use a reputable password manager that can generate, sync, and autofill securely. Rotate passwords after suspected breaches, shared access handoffs, or team departures. Never rely on memorable patterns like CompanyName123! because they are easier to guess than they appear. A random generator plus a password manager is one of the simplest and most effective security workflows for individuals and teams.",
  },
  {
    heading: "Common Use Cases",
    body: "Freelancers use password generators when creating accounts for new clients and project tools. Developers use them for staging dashboards, API platforms, and cloud infrastructure logins. Agencies generate secure credentials before handing over websites to clients. Ecommerce operators use unique passwords for payment gateways, analytics suites, and inventory systems. Students and remote workers use random passwords to protect university portals and productivity apps. Families also use these tools to secure shared streaming or utility accounts. In each case, the benefit is the same: less reliance on weak repeated passwords and a significantly lower chance of unauthorized account access caused by credential reuse or predictable patterns.",
  },
  {
    heading: "Tips for Managing Generated Passwords",
    body: "After generating a password, save it immediately in your password manager and add clear labels so you can locate it later. Group accounts by category, such as finance, business, social, and infrastructure, to simplify audits. Use password health reports to identify reused or weak entries and replace them with newly generated alternatives. If a website limits symbols, regenerate with a custom setting that still keeps high entropy through length and mixed characters. For team environments, avoid sharing raw passwords over email and use secure vault sharing with role-based access. Regular housekeeping keeps your credential inventory clean, secure, and easy to maintain as your number of accounts grows.",
  },
];

const faqs = [
  {
    question: "Is this random password generator free?",
    answer:
      "Yes. You can generate unlimited passwords for free with no signup required.",
  },
  {
    question: "Are generated passwords strong enough for important accounts?",
    answer:
      "Yes, when you use sufficient length and multiple character types. For sensitive accounts, use longer passwords and enable two-factor authentication.",
  },
  {
    question: "Should I use symbols in my password?",
    answer:
      "In most cases yes, because symbols increase complexity. If a website has strict rules, adjust the options and regenerate until it accepts your password.",
  },
  {
    question: "Does this tool store my generated passwords?",
    answer:
      "No password history is saved by this page. Generate and copy what you need, then store it securely in your password manager.",
  },
  {
    question: "How often should I change my passwords?",
    answer:
      "Change passwords immediately after a suspected breach, shared-account turnover, or security incident. Otherwise, focus on strong unique passwords with 2FA.",
  },
];

export default function RandomPasswordGeneratorPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "qr-code-generator",
    "ai-text-summarizer",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <RandomPasswordGeneratorTool />
    </ToolPageLayout>
  );
}
