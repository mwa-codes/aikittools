import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import BmiCalculatorTool from "@/components/tool-ui/BmiCalculatorTool";

const SLUG = "bmi-calculator";

export const metadata: Metadata = {
  title: "BMI Calculator – Calculate Body Mass Index Free",
  description:
    "Calculate your BMI instantly using height and weight. See your BMI category and what it means for your health. Free online BMI calculator, no signup.",
  alternates: { canonical: "https://www.aikittools.com/bmi-calculator" },
  openGraph: {
    title: "BMI Calculator – Calculate Body Mass Index Free",
    description:
      "Calculate your BMI instantly using height and weight. See your BMI category and what it means for your health. Free online BMI calculator, no signup.",
    url: "https://www.aikittools.com/bmi-calculator",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the BMI Calculator?",
    body: "The BMI Calculator takes your height and weight and computes your Body Mass Index — a number that places you into one of four general health categories: underweight, normal weight, overweight, or obese. BMI is a widely used screening metric because it's quick, requires no equipment, and gives people a simple starting reference point for weight and health conversations. It doesn't account for factors like muscle mass or body composition, so treat it as a first approximation rather than a clinical result. This tool supports both metric and imperial units so you don't have to convert anything before entering your numbers.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Choose your preferred units — metric (cm and kg) or imperial (ft, in, and lbs).",
      "Enter your height and weight in the input fields.",
      "Your BMI value and health category display immediately.",
      "Try adjusting values to see how changes in weight or height affect the result.",
    ],
  },
  {
    heading: "Why Use BMI Calculator Online?",
    body: "Completely free with no account or signup needed. Calculations happen entirely in your browser — no personal health data is collected, transmitted, or stored anywhere. The result appears in seconds, and the clean layout works just as well on a phone as it does on a desktop. Use the result as a general reference point, and consult a healthcare professional if you have specific concerns about your health.",
  },
];

const faqs = [
  {
    question: "What is a normal BMI range?",
    answer:
      "For most adults, a BMI between 18.5 and 24.9 is considered normal. Values outside this range may indicate underweight or overweight categories.",
  },
  {
    question: "Can I calculate BMI with feet and pounds?",
    answer:
      "Yes. This calculator supports imperial input with feet, inches, and pounds, and also supports metric units.",
  },
  {
    question: "Is BMI always accurate for every person?",
    answer:
      "BMI is a useful screening metric but does not account for muscle mass, body composition, age, or medical history. Use it as guidance, not diagnosis.",
  },
  {
    question: "How often should I check my BMI?",
    answer:
      "Monthly or quarterly checks are common for general tracking, but frequency depends on your goals and professional guidance.",
  },
  {
    question: "Does this BMI calculator save my data?",
    answer:
      "No. Calculations run in your browser and no API request is required for BMI output.",
  },
];

export default function BmiCalculatorPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "ai-text-summarizer",
    "random-password-generator",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <BmiCalculatorTool />
    </ToolPageLayout>
  );
}
