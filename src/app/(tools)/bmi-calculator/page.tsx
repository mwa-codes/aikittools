import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import BmiCalculatorTool from "@/components/tool-ui/BmiCalculatorTool";

const SLUG = "bmi-calculator";

export const metadata: Metadata = buildMetadata({
  title: "BMI Calculator - Calculate Body Mass Index Online Free",
  description:
    "Calculate your Body Mass Index (BMI) instantly with our free BMI calculator. Check if you are underweight, normal, or overweight.",
  keywords: [
    "bmi calculator",
    "body mass index calculator",
    "bmi chart",
    "ideal weight calculator",
    "bmi in kg and lbs",
    "health calculator",
    "free bmi tool",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is a BMI Calculator?",
    body: "A BMI calculator is a health utility that estimates body mass index by comparing your weight to your height. BMI is a simple screening metric used worldwide to categorize adults into broad ranges such as underweight, normal, overweight, and obese. While BMI is not a complete diagnostic measure by itself, it helps people quickly understand whether their current weight may be lower or higher than recommended ranges for general health discussions. This makes BMI calculators popular among individuals tracking wellness goals, fitness coaches planning routines, and clinics doing initial assessments. Because the formula is straightforward, an online calculator gives instant results and reduces math mistakes. A good BMI tool also supports multiple unit systems so users can calculate using centimeters and kilograms or feet, inches, and pounds. This page combines a practical BMI calculator with educational content so users can understand both the number and what it means in real-world contexts.",
    subSections: [
      {
        heading: "Why people search for BMI online",
        body: "Users often want a quick baseline check before making nutrition, exercise, or lifestyle adjustments, and they prefer tools that are fast and easy to understand.",
      },
    ],
  },
  {
    heading: "How the BMI Calculator Works",
    body: "The calculator accepts your height and weight, converts values to standard metric units when needed, and applies the BMI formula: weight in kilograms divided by height in meters squared. If you select metric mode, you provide height in centimeters and weight in kilograms. If you select imperial mode, you provide height in feet and inches and weight in pounds; the tool then converts those values to metric in the background before calculating BMI. Once the value is computed, it is mapped to a category range so you can interpret the result quickly. Typical categories are underweight for BMI below 18.5, normal for 18.5 to 24.9, overweight for 25 to 29.9, and obese for 30 and above. The calculation runs entirely in the browser, so output updates instantly whenever inputs change. This approach improves performance, avoids network latency, and keeps the experience simple.",
    subSections: [
      {
        heading: "Important context",
        body: "BMI is a screening indicator, not a full diagnosis. Body composition, age, muscle mass, and medical history should also be considered for personalized health decisions.",
      },
    ],
  },
  {
    heading: "How to Use This BMI Calculator",
    body: "Start by choosing your preferred unit system. Use metric if you know your height in centimeters and weight in kilograms, or imperial if you use feet, inches, and pounds. Enter your values carefully and avoid rounding too aggressively, since small differences can slightly change the BMI value and category near threshold ranges. As soon as valid inputs are provided, the calculator displays your BMI and category label. If inputs are missing or invalid, the result area remains in a neutral state to prevent misleading output. For repeat checks, update values over time and compare changes while keeping measurement conditions consistent. For example, track weight at similar times of day and use the same scale when possible. The interface is responsive and optimized for mobile and desktop, so you can check BMI quickly from any device. This makes it useful for personal monitoring, gym intake workflows, and educational contexts.",
    subSections: [
      {
        heading: "Input accuracy tip",
        body: "Measure height and weight with reliable tools and enter values exactly to one decimal point if possible for more consistent BMI tracking.",
      },
    ],
  },
  {
    heading: "Benefits of a Free Online BMI Tool",
    body: "A browser-based BMI calculator provides speed, convenience, and accessibility. You can calculate anytime without downloading an app or building spreadsheet formulas. This is especially helpful for users who only need quick periodic checks rather than a full health platform. Supporting both metric and imperial input removes conversion friction and reduces user drop-off. Another major benefit is clear interpretation. Many calculators only return a number, but category output helps users quickly understand where they stand in standard ranges. This can motivate healthier habits by turning an abstract number into understandable context. For site owners, BMI pages can drive sustained organic traffic because they answer a recurring practical question with immediate utility. For users, the key benefit is a clean, minimal workflow that transforms two inputs into an instant result. Combined with educational explanations and FAQs, the page becomes both a tool and a reference resource.",
    subSections: [
      {
        heading: "Performance and privacy",
        body: "Client-side calculations keep interactions fast and help maintain user privacy since no API call is required for basic BMI computation.",
      },
    ],
  },
  {
    heading: "Real-Life Use Cases for BMI Calculation",
    body: "People use BMI calculators in a wide range of practical situations. Individuals beginning a fitness plan often check baseline BMI before setting goals for weight management or body composition improvements. Nutrition coaches and trainers may use BMI as one of several starting indicators during onboarding discussions. Students and educators use BMI examples in health classes to understand how public health metrics are calculated and interpreted. Employers and wellness programs sometimes include BMI checks in optional health awareness campaigns. Healthcare environments may use BMI as part of triage context, especially when discussing lifestyle risk factors. Travelers and athletes can use BMI tracking to monitor changes during long routines, seasonal shifts, or training cycles. In each case, the same value proposition applies: quick, consistent calculations with clear categories. Even when users need deeper clinical guidance later, a BMI calculator is often the first accessible step.",
    subSections: [
      {
        heading: "Use BMI responsibly",
        body: "Treat BMI as a directional indicator. Pair it with waist measurements, activity levels, and professional advice for more complete health understanding.",
      },
    ],
  },
  {
    heading: "Content and SEO Best Practices for BMI Pages",
    body: "High-performing BMI pages usually combine practical functionality with educational clarity. Start with intent-matched headings such as what BMI is, how calculation works, and how to use the tool. Add concise category explanations so users do not leave to search for interpretation elsewhere. Include frequently asked questions to capture long-tail queries like metric vs imperial conversion, healthy range context, and data privacy concerns. Keep paragraphs readable and avoid medical claims beyond common guidance unless verified by trusted references. A strong internal linking section helps users discover other productivity tools, improving on-site engagement and crawl depth. From a UX perspective, keep form fields minimal, labels clear, and result panels visually distinct. These decisions improve usability metrics while supporting search performance. The best calculator pages are not just technically correct, they are easy to scan, fast to use, and informative enough to build user trust.",
    subSections: [
      {
        heading: "Editorial recommendation",
        body: "Review content periodically to keep category messaging aligned with current public guidance and maintain user trust over time.",
      },
    ],
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
