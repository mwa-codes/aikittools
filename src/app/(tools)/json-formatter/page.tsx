import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import JsonFormatterTool from "@/components/tool-ui/JsonFormatterTool";

const SLUG = "json-formatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator – Beautify JSON Online",
  description:
    "Format, validate, and beautify JSON instantly. Paste messy JSON and get clean, readable output in one click. Free online tool, no signup required.",
  alternates: { canonical: "https://www.aikittools.com/json-formatter" },
  openGraph: {
    title: "JSON Formatter & Validator – Beautify JSON Online",
    description:
      "Format, validate, and beautify JSON instantly. Paste messy JSON and get clean, readable output in one click. Free online tool, no signup required.",
    url: "https://www.aikittools.com/json-formatter",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the JSON Formatter & Validator?",
    body: "The JSON Formatter and Validator is a developer tool that takes raw, compressed, or poorly formatted JSON and turns it into clean, properly indented output that's easy to read and debug. It also validates your JSON as you paste it — if there's a missing bracket, a trailing comma, or any other syntax error, you'll see a clear message explaining what went wrong. Developers use this constantly when debugging API responses, reading config files, inspecting webhook payloads, or working with database query results. Instead of staring at a wall of minified text, one click gives you a structured, readable view.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste your raw or minified JSON into the input panel.",
      "Click Format / Beautify to expand it into readable indented output.",
      "Or click Minify to compress it back into a single line for production use.",
      "If your JSON has errors, an error message will appear explaining the issue.",
      "Click Copy to grab the formatted output for use in your project.",
    ],
  },
  {
    heading: "Why Use JSON Formatter Online?",
    body: "Free with no signup required. All formatting and validation runs locally in your browser — your JSON data is never sent to any external server, which matters when you're working with API responses containing sensitive fields, private keys, or internal data structures. There's no paste limit, no account wall, and no slowdown from server round-trips. Paste your JSON and the output is ready in milliseconds.",
  },
];

const faqs = [
  {
    question: "Does this JSON formatter work offline?",
    answer:
      "Yes. The formatting and validation logic runs entirely in your browser using JavaScript. No internet connection is required once the page has loaded.",
  },
  {
    question: "Is my JSON data sent to a server?",
    answer:
      "No. Your JSON data is processed locally in your browser. Nothing is uploaded or stored on our servers.",
  },
  {
    question: "What is the difference between formatting and minifying JSON?",
    answer:
      "Formatting adds indentation, line breaks, and spacing to make JSON human-readable. Minifying removes all unnecessary whitespace to produce the smallest possible JSON string, which is useful for reducing payload sizes in web applications.",
  },
  {
    question: "Why does the JSON validator show an error?",
    answer:
      "Common JSON errors include trailing commas (not allowed in JSON), single quotes instead of double quotes, missing quotes around keys, and comments (not supported in standard JSON). The error message shown will help you locate and fix the issue.",
  },
  {
    question: "Can I format very large JSON files?",
    answer:
      "Yes, though very large files (several megabytes) may cause slower performance due to browser memory limitations. For production use cases with extremely large datasets, a server-side tool may be more appropriate.",
  },
];

export default function JsonFormatterPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getRelatedTools(SLUG);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <JsonFormatterTool />
    </ToolPageLayout>
  );
}
