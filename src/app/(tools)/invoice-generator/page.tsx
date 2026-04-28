import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import InvoiceGeneratorTool from "@/components/tool-ui/InvoiceGeneratorTool";

const SLUG = "invoice-generator";

export const metadata: Metadata = buildMetadata({
  title: "Free Invoice Generator – Create & Download Professional Invoices Online",
  description:
    "Create professional invoices online for free. Add client details, items, and download your invoice instantly as a PDF.",
  keywords: [
    "invoice generator",
    "free invoice maker",
    "online invoice tool",
    "download invoice pdf",
    "create professional invoice",
    "billing invoice template",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is an Invoice Generator?",
    body: "An invoice generator is a tool that helps freelancers, agencies, consultants, and small businesses create billing documents quickly without complex accounting software. A typical invoice includes the client name, line items, quantities, pricing, and a final payable total. This free invoice generator streamlines those essentials into a clean interface and lets you export the result as a PDF for easy sharing. Whether you are billing for design services, software development, marketing retainers, or one-time tasks, a reliable invoice format helps you get paid faster and look professional. Consistent invoices also support better bookkeeping, tax preparation, and client communication across recurring projects and one-off contracts.",
  },
  {
    heading: "How to Use the Invoice Generator",
    body: [
      "Enter your client name in the client field.",
      "Add one or more items with quantity and unit price.",
      "Review the auto-calculated total in the preview section.",
      "Use Add Item for additional services or products.",
      "Click Download Invoice PDF to save and send your invoice.",
    ],
  },
  {
    heading: "Features Included in This Tool",
    body: "This tool focuses on the most useful invoice actions while keeping the interface lightweight and fast. You can create multiple line items, adjust quantities, and update pricing without manual math. Totals are calculated instantly so you can avoid billing mistakes. The invoice preview gives you a quick view before export, and the PDF download option makes client delivery simple. Because the workflow is browser-based, you can generate an invoice on desktop or mobile without account setup. This is ideal for quick billing sessions when you need a clean invoice now, not a full accounting stack. The result is a practical, no-friction workflow for day-to-day invoicing needs.",
  },
  {
    heading: "Why Professional Invoices Matter",
    body: "Professional invoicing is not just about getting paid, it shapes how clients perceive your business. Clear invoices reduce confusion, prevent disputes, and speed up approval cycles. They also improve internal tracking by standardizing your billing records across projects. For freelancers and small teams, that structure becomes important during monthly reconciliation and tax filing periods. A polished invoice can also reinforce trust with first-time clients, especially when work scope includes multiple deliverables. Consistent billing documents help establish credibility and communicate that your operations are organized. Over time, this can contribute to better client retention and smoother financial planning because both parties know exactly what was delivered and billed.",
  },
  {
    heading: "Benefits for Freelancers and Agencies",
    body: "Freelancers benefit from fast invoice creation after each milestone, reducing admin overhead and improving cash flow. Agencies can use a repeatable process for different accounts while keeping line-item detail easy to read. Consultants can issue invoices right after calls, workshops, or reports without waiting for finance tools. Teams with hybrid payment schedules can include separate items for setup fees, recurring retainers, and additional revisions in one document. If you work with international clients, clear line-item structure also helps when converting or clarifying charges. A simple invoice tool saves time, improves consistency, and lowers the chance of missed revenue caused by delayed or inconsistent billing documentation.",
  },
  {
    heading: "Best Practices for Better Invoice Workflows",
    body: "Send invoices promptly after work completion or milestone approval to avoid payment delays. Use descriptive item names so clients can connect each charge to delivered value. Double-check quantity and price fields before exporting the PDF, especially for high-value work. Keep your own record of invoice dates, status, and payment confirmations in a spreadsheet or accounting platform. If you handle recurring clients, keep naming conventions consistent to simplify monthly reporting. Communicate payment terms clearly in your service agreement so invoice expectations are established early. Good invoice hygiene improves payment speed, reduces revision requests, and gives you clearer visibility into revenue trends across months and project types.",
  },
  {
    heading: "Common Use Cases",
    body: "Web developers bill feature delivery, maintenance tasks, and monthly support through itemized invoices. Designers invoice branding packages, UI audits, and creative retainers with clear quantity and rate fields. Marketing professionals bill campaign management, ad spend service fees, and monthly reporting. Tutors and coaches use invoice tools for session-based billing with quick quantity updates. Ecommerce service providers invoice setup, optimization, and advisory packages for client stores. Virtual assistants bill recurring operations and administrative services with transparent line-item breakdowns. Across these scenarios, the ability to add items, calculate totals instantly, and export a clean PDF provides a consistent billing process with less manual effort.",
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
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <InvoiceGeneratorTool />
    </ToolPageLayout>
  );
}
