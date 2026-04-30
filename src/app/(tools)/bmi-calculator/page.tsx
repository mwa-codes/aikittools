import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import BmiCalculatorTool from "@/components/tool-ui/BmiCalculatorTool";

const SLUG = "bmi-calculator";

export const metadata: Metadata = {
  title: "BMI Calculator – Calculate Body Mass Index Free",
  description:
    "Calculate your BMI instantly using height and weight. See your BMI category and what it means for your health. Free online BMI calculator, no signup.",
  alternates: {
    canonical: "https://www.aikittools.com/bmi-calculator",
    languages: {
      "en-US": "https://www.aikittools.com/bmi-calculator",
    },
  },
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
    body: "The BMI Calculator is a body mass index calculator online free that takes your height and weight and computes your BMI — a number that places you into one of four general health categories: underweight, normal weight, overweight, or obese. BMI is a widely used screening metric because it's quick, requires no equipment, and gives people a simple starting reference point to check if I am overweight using BMI ranges. This BMI calculator for adults lets you calculate BMI with height and weight in either system, and a BMI calculator in kg and cm mode is available for metric users. It doesn't account for factors like muscle mass or body composition, so treat it as a first approximation rather than a clinical result.",
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
  {
    question: "Can I use this BMI calculator with kilograms and centimeters?",
    answer:
      "Yes. The calculator supports metric units — enter your height in centimeters and your weight in kilograms to get your BMI instantly. You can also switch to imperial units (feet, inches, and pounds) depending on what you are comfortable with.",
  },
  {
    question: "Is BMI an accurate measure of health?",
    answer:
      "BMI is a useful screening tool but not a complete measure of health. It does not account for muscle mass, bone density, age, or fat distribution. Athletes may have a high BMI due to muscle rather than fat, and older adults may carry more fat at a normal BMI. Use it as a general reference and consult a healthcare professional for a complete assessment.",
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
