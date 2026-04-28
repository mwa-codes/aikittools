import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import RandomPasswordGeneratorTool from "@/components/tool-ui/RandomPasswordGeneratorTool";

const SLUG = "random-password-generator";

export const metadata: Metadata = {
  title: "Random Password Generator – Strong Passwords Free",
  description:
    "Generate strong, secure random passwords with custom length, symbols, and numbers. Free online password generator. No signup, works in your browser.",
  alternates: { canonical: "https://www.aikittools.com/random-password-generator" },
  openGraph: {
    title: "Random Password Generator – Strong Passwords Free",
    description:
      "Generate strong, secure random passwords with custom length, symbols, and numbers. Free online password generator. No signup, works in your browser.",
    url: "https://www.aikittools.com/random-password-generator",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Random Password Generator?",
    body: "The Random Password Generator creates strong, unpredictable passwords built from a mix of uppercase letters, lowercase letters, numbers, and special characters. Reusing simple passwords across multiple sites puts all your accounts at risk if any one of them is breached. This tool lets you build a fresh, high-entropy password in seconds — with full control over length and character types so you can match whatever requirements a platform has. The longer and more varied the password, the harder it becomes for automated attacks to crack. Think of it as the first step in taking your account security seriously.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Drag the length slider to set your desired password length (12–24 characters is a solid starting point).",
      "Toggle checkboxes to include or exclude uppercase letters, numbers, and symbols.",
      "Click Generate to create a new random password instantly.",
      "If you don't like the result, click Generate again for a different one.",
      "Click Copy and paste it into your signup form or save it in a password manager.",
    ],
  },
  {
    heading: "Why Use Random Password Generator Online?",
    body: "Completely free with no login required. The most important detail: passwords are generated entirely inside your browser using cryptographic random functions — they are never sent to any server, never logged, and never stored anywhere. What you generate exists only on your screen until you copy it. That's the right way to handle sensitive credentials, and it's exactly how this tool works.",
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
