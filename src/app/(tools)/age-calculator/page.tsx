import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import AgeCalculatorTool from "@/components/tool-ui/AgeCalculatorTool";

const SLUG = "age-calculator";

export const metadata: Metadata = {
  title: "Age Calculator – Calculate Your Exact Age Online",
  description:
    "Calculate your exact age in years, months, and days from your date of birth. See your next birthday countdown too. Free online age calculator, no signup.",
  alternates: { canonical: "https://www.aikittools.com/age-calculator" },
  openGraph: {
    title: "Age Calculator – Calculate Your Exact Age Online",
    description:
      "Calculate your exact age in years, months, and days from your date of birth. See your next birthday countdown too. Free online age calculator, no signup.",
    url: "https://www.aikittools.com/age-calculator",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Age Calculator?",
    body: "The Age Calculator works out your exact age in years, months, and days based on your date of birth and today's date. It handles the calendar arithmetic that trips people up — different month lengths, leap years, mid-month boundaries — so the result is precise rather than approximate. Beyond your age, it also shows the number of days remaining until your next birthday, which is a small but genuinely useful detail for milestone planning, setting reminders, or checking eligibility requirements. People use it for filling out forms, verifying age criteria, tracking anniversaries, and countless everyday situations where \"roughly 30\" just isn't specific enough.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Click the date picker and select your date of birth.",
      "Your exact age in years, months, and days appears immediately.",
      "Scroll down to see how many days remain until your next birthday.",
      "Change the date at any time to recalculate — useful for checking someone else's age.",
    ],
  },
  {
    heading: "Why Use Age Calculator Online?",
    body: "Free and instant with no account or signup. The entire calculation happens in your browser — your date of birth is never sent to any server or stored anywhere. The result is available immediately on any device, whether you're at your desk filling out a form or quickly double-checking something on your phone. No app to install, no registration step, just open the page and pick your date.",
  },
];

const faqs = [
  {
    question: "How does the age calculator determine my exact age?",
    answer:
      "It compares your date of birth with today and returns completed years, then remaining months and days, while handling calendar month lengths correctly.",
  },
  {
    question: "Can I use this age calculator on mobile?",
    answer:
      "Yes. The calculator is responsive and works on modern phones, tablets, and desktops without any installation.",
  },
  {
    question: "Does this tool store my date of birth?",
    answer:
      "No. The calculation happens in your browser, and your date input is not sent to a server.",
  },
  {
    question: "Why is my next birthday countdown useful?",
    answer:
      "It helps you track upcoming milestones and set reminders for events, planning, or administrative deadlines.",
  },
  {
    question: "Can I calculate someone else's age too?",
    answer:
      "Yes. Enter any valid birth date and the tool will calculate exact age instantly.",
  },
];

export default function AgeCalculatorPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "ai-text-summarizer",
    "random-password-generator",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <AgeCalculatorTool />
    </ToolPageLayout>
  );
}
