import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import Base64Tool from "@/components/tool-ui/Base64Tool";

const SLUG = "base64-encoder";

export const metadata: Metadata = buildMetadata({
  title: "Free Base64 Encoder & Decoder Online",
  description:
    "Encode text to Base64 or decode Base64 strings instantly. Free online Base64 encoder and decoder tool — fast, private, no signup needed.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "encode base64 online",
    "decode base64 online",
    "base64 converter",
    "base64 to text",
    "text to base64",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is Base64 Encoding?",
    body: "Base64 is a binary-to-text encoding scheme that converts binary data into an ASCII string format using 64 printable characters (A–Z, a–z, 0–9, +, and /). It is commonly used to safely transmit binary data over text-based protocols such as email, JSON APIs, and HTML data URIs. Base64 encoding increases the size of data by approximately 33%, but ensures it can be safely transmitted without data corruption.",
  },
  {
    heading: "How to Use the Base64 Encoder / Decoder",
    body: [
      "Select 'Encode' to convert plain text to Base64.",
      "Select 'Decode' to convert a Base64 string back to plain text.",
      "Paste or type your input into the left text area.",
      "The result appears instantly in the output panel on the right.",
      "Click 'Copy' to copy the output, or 'Swap & Reverse' to use the output as input.",
    ],
  },
  {
    heading: "Features",
    body: [
      "Instant encoding and decoding as you type.",
      "Full Unicode and UTF-8 support.",
      "Clear error messages for invalid Base64 input.",
      "Swap & Reverse button to quickly flip encode/decode.",
      "Runs entirely in the browser — nothing is sent to a server.",
      "Completely free with no usage limits.",
    ],
  },
  {
    heading: "Common Uses of Base64",
    body: [
      "Embedding images directly in HTML or CSS as data URIs.",
      "Encoding binary attachments in email (MIME standard).",
      "Passing binary data in JSON API payloads.",
      "Encoding credentials in HTTP Basic Authentication headers.",
      "Storing small binary files in databases as text.",
      "Encoding JWT (JSON Web Token) payloads.",
    ],
  },
  {
    heading: "Is Base64 Encryption?",
    body: "No. Base64 is an encoding scheme, not encryption. It does not protect your data from unauthorized access. Anyone who receives a Base64-encoded string can trivially decode it. Base64 is purely for ensuring data survives transmission through text-only systems. For security, you should use proper encryption algorithms like AES alongside Base64 if needed.",
  },
];

const faqs = [
  {
    question: "Can I encode and decode binary files with this tool?",
    answer:
      "This tool is designed for text input. To encode binary files (images, PDFs, etc.) to Base64, you would need a tool that supports file uploads. Our text encoder/decoder covers the most common text-based use case.",
  },
  {
    question: "Why does my decoded output look garbled?",
    answer:
      "If the Base64 string was encoded from binary data (an image, for example) rather than plain text, the decoded output will appear as garbled characters. This tool is optimized for text-to-text encoding.",
  },
  {
    question: "Does Base64 encoding make data secure?",
    answer:
      "No. Base64 is not encryption. It is an encoding format, meaning anyone with access to the Base64 string can decode it instantly. Never use Base64 as a security measure.",
  },
  {
    question: "What is the difference between Base64 and Base64 URL?",
    answer:
      "Standard Base64 uses + and / characters which are unsafe in URLs. Base64 URL encoding replaces + with - and / with _, making it safe to use in URL parameters. This tool implements standard Base64.",
  },
];

export default function Base64EncoderPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getRelatedTools(SLUG);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <Base64Tool />
    </ToolPageLayout>
  );
}
