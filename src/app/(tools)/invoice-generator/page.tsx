import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import InvoiceGeneratorTool from "@/components/tool-ui/InvoiceGeneratorTool";

const SLUG = "invoice-generator";

export const metadata: Metadata = {
  title: "Free Invoice Generator – Create & Download PDF",
  description:
    "Create professional invoices and download as PDF instantly. Add client details, line items, and totals. Free online invoice generator, no signup required.",
  alternates: {
    canonical: "https://www.aikittools.com/invoice-generator",
    languages: {
      "en-US": "https://www.aikittools.com/invoice-generator",
    },
  },
  openGraph: {
    title: "Free Invoice Generator – Create & Download PDF",
    description:
      "Create professional invoices and download as PDF instantly. Add client details, line items, and totals. Free online invoice generator, no signup required.",
    url: "https://www.aikittools.com/invoice-generator",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Free Invoice Generator?",
    body: "The Free Invoice Generator is a free invoice generator for freelancers and teams that need to create invoice online and download PDF files in minutes — no Word templates, no Excel formulas, no subscription required. Fill in your business name, add your client's details, set the invoice number and date, then add as many line items as you need with descriptions, quantities, and rates. Totals calculate automatically so there's no manual math involved, making it a simple invoice maker for small business use and an invoice template generator no account users can start immediately. When you're ready, one click produces a clean, printable PDF for client billing with a professional invoice creator free workflow.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Fill in your business name, address, and contact details at the top.",
      "Add your client's name and details in the client section.",
      "Set the invoice number, issue date, and due date.",
      "Add line items with descriptions, quantities, and unit rates — totals calculate instantly.",
      "Click Download PDF to save and send your finished invoice.",
    ],
  },
  {
    heading: "Why Use Invoice Generator Online?",
    body: "Completely free with no subscription, account, or signup required. Your invoice data stays entirely in your browser and is never stored on any server — so your client information and billing details remain private. Generate as many invoices as you need for as many clients as you have, with no usage limits or watermarks on the downloaded PDF.",
  },
];

const faqs = [
  {
    question: "Is this invoice generator free to use?",
    answer:
      "Yes. You can create and download invoices for free with no account required.",
  },
  {
    question: "Can I add multiple products or services in one invoice?",
    answer:
      "Yes. Use the Add Item button to include as many line items as needed, each with its own quantity and price.",
  },
  {
    question: "Does the invoice total calculate automatically?",
    answer:
      "Yes. The tool calculates line totals and the grand total instantly based on your quantities and prices.",
  },
  {
    question: "In which format is the invoice downloaded?",
    answer:
      "The invoice is downloaded as a PDF file, making it easy to share and print.",
  },
  {
    question: "Can I use this tool on mobile devices?",
    answer:
      "Yes. The invoice generator is responsive and works on mobile, tablet, and desktop browsers.",
  },
  {
    question: "Can freelancers use this invoice generator for client billing?",
    answer:
      "Yes. This tool is built with freelancers in mind — add your name or business name, your client's details, a list of services with rates, and download a clean PDF invoice in seconds. There is no account required and no limit on how many invoices you can generate.",
  },
  {
    question: "Can I save or reuse invoice templates?",
    answer:
      "Currently the tool does not save templates between sessions since everything runs in your browser without a backend. You can save the filled PDF and use it as a visual reference to refill the form next time, or keep a copy of your standard line items in a text file to paste in quickly.",
  },
];

export default function InvoiceGeneratorPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "qr-code-generator",
    "ai-text-summarizer",
  ]);

  return (
    <ToolPageLayout
      tool={tool}
      relatedTools={relatedTools}
      faqs={faqs}
      seoSections={seoSections}
      maxWidthClassName="max-w-7xl"
    >
      <InvoiceGeneratorTool />
    </ToolPageLayout>
  );
}
