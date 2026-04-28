import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import LoanEmiCalculatorTool from "@/components/tool-ui/LoanEmiCalculatorTool";

const SLUG = "loan-emi-calculator";

export const metadata: Metadata = {
  title: "Loan EMI Calculator – Calculate Monthly EMI Free",
  description:
    "Calculate your monthly EMI, total interest, and total payment for any loan. Enter amount, rate, and tenure. Free online EMI calculator, no signup needed.",
  alternates: { canonical: "https://www.aikittools.com/loan-emi-calculator" },
  openGraph: {
    title: "Loan EMI Calculator – Calculate Monthly EMI Free",
    description:
      "Calculate your monthly EMI, total interest, and total payment for any loan. Enter amount, rate, and tenure. Free online EMI calculator, no signup needed.",
    url: "https://www.aikittools.com/loan-emi-calculator",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Loan EMI Calculator?",
    body: "The Loan EMI Calculator works out your monthly repayment amount, the total interest you'll pay over the life of the loan, and the total amount payable — all at once. These three numbers together give you a clear picture of what you're actually committing to before you sign anything. Borrowers who only focus on the headline interest rate often underestimate how much the loan tenure affects the total interest paid. This calculator makes it easy to compare scenarios — what if you borrow slightly less, pay it off in fewer months, or negotiate a lower rate? Run the numbers in seconds.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Enter your loan amount (principal) in the first field.",
      "Enter the annual interest rate offered by your lender.",
      "Enter the loan tenure and choose whether it's in years or months.",
      "Monthly EMI, total interest, and total repayment appear instantly.",
      "Change any value to explore and compare different loan scenarios.",
    ],
  },
  {
    heading: "Why Use Loan EMI Calculator Online?",
    body: "Free with no account required. All calculations run in your browser — your loan details and financial figures are never sent to any server. Results are instant so you can compare multiple scenarios quickly, whether you're sitting across from a lender, planning at home, or comparing offers from different banks on your phone. No registration, no ads interrupting your calculation.",
  },
];

const faqs = [
  {
    question: "What does EMI stand for?",
    answer:
      "EMI stands for Equated Monthly Installment, the fixed amount you pay every month to repay loan principal and interest.",
  },
  {
    question: "How is monthly interest rate calculated?",
    answer:
      "Monthly rate is annual interest rate divided by 12 and then divided by 100. For example, 12% annual becomes 0.01 monthly.",
  },
  {
    question: "Does longer tenure reduce EMI?",
    answer:
      "Yes. Increasing tenure usually lowers monthly EMI, but it often increases total interest paid over the full loan period.",
  },
  {
    question: "Can I use this for home, car, and personal loans?",
    answer:
      "Yes. The formula works for most amortized loans where repayments happen monthly at a stated interest rate.",
  },
  {
    question: "Does this EMI result include processing fees?",
    answer:
      "No. The result includes principal and interest only. Add lender fees and insurance separately for complete repayment planning.",
  },
];

export default function LoanEmiCalculatorPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "ai-text-summarizer",
    "random-password-generator",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <LoanEmiCalculatorTool />
    </ToolPageLayout>
  );
}
