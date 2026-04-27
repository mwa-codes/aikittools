import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import JsonFormatterTool from "@/components/tool-ui/JsonFormatterTool";

const SLUG = "json-formatter";

export const metadata: Metadata = buildMetadata({
  title: "Free JSON Formatter & Validator Online – Beautify JSON Instantly",
  description:
    "Format, validate, and beautify JSON instantly with our free online JSON formatter. Minify JSON, detect errors, and get clean readable output.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "format json online",
    "json minifier",
    "validate json",
    "json pretty print",
    "online json tool",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is a JSON Formatter?",
    body: "A JSON formatter (also known as a JSON beautifier or JSON pretty printer) is an online tool that takes raw, unformatted JSON data and restructures it with proper indentation, line breaks, and spacing to make it human-readable. It also validates the JSON syntax and reports errors if the input is not valid JSON.",
  },
  {
    heading: "How to Use the JSON Formatter",
    body: [
      "Paste your raw or minified JSON into the 'Input JSON' field.",
      "The tool automatically formats it and displays the output on the right.",
      "Switch to 'Minify' mode to compress JSON by removing whitespace.",
      "If the JSON is invalid, a clear error message will appear below the input.",
      "Click 'Copy' to copy the formatted output to your clipboard.",
    ],
  },
  {
    heading: "Features",
    body: [
      "Instant formatting and validation as you type.",
      "Beautify mode with 2-space indentation for readability.",
      "Minify mode to compact JSON for production use.",
      "Clear and descriptive error messages for invalid JSON.",
      "Works entirely in the browser — your data never leaves your device.",
      "Free and unlimited use.",
    ],
  },
  {
    heading: "What Is JSON?",
    body: "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format. It is widely used in web APIs, configuration files, and data storage. JSON is easy for humans to read and write, and easy for machines to parse and generate. A valid JSON document can be an object ({}), an array ([]), a string, a number, a boolean, or null.",
  },
  {
    heading: "Common JSON Use Cases",
    body: [
      "Debugging API responses from REST or GraphQL services.",
      "Formatting configuration files for readability.",
      "Validating JSON before sending to a server.",
      "Minifying JSON to reduce file size in production.",
      "Learning JSON structure and syntax.",
    ],
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
