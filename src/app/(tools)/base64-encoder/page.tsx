import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import Base64Tool from "@/components/tool-ui/Base64Tool";

const SLUG = "base64-encoder";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder – Encode or Decode Free Online",
  description:
    "Encode text or data to Base64 and decode Base64 strings back to plain text instantly. Free online tool for developers — no signup, fast, works in browser.",
  alternates: {
    canonical: "https://www.aikittools.com/base64-encoder",
    languages: {
      "en-US": "https://www.aikittools.com/base64-encoder",
    },
  },
  openGraph: {
    title: "Base64 Encoder & Decoder – Convert Online Free",
    description:
      "Encode or decode Base64 strings instantly in your browser. Supports text and data conversion. Free online Base64 tool, no account or signup needed.",
    url: "https://www.aikittools.com/base64-encoder",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Base64 Encoder & Decoder?",
    body: "The Base64 Encoder and Decoder lets you Base64 encode text online and decode Base64 string online free in the same interface. Base64 is a widely used encoding scheme that converts data into a set of 64 safe printable characters, making it safe to transmit through systems that only handle plain text — like email, JSON APIs, or HTML attributes. You'll encounter Base64 constantly as a developer: using a Base64 encoder for images in HTML, passing credentials in HTTP headers, using a Base64 decoder for JWT tokens, or handling file data in API requests. This tool handles both encode and decode instantly.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste your plain text into the input and click Encode to convert it to Base64.",
      "Or paste a Base64 string and click Decode to reveal the original text.",
      "The output appears instantly in the result area.",
      "Click Copy to grab the value for use in your project.",
      "Use the Swap button to quickly flip the input and output for round-trip testing.",
    ],
  },
  {
    heading: "Why Use Base64 Encoder Online?",
    body: "Free, no signup required, and no data sent anywhere. The encoding and decoding happens entirely in your browser using native JavaScript functions, so you can quickly convert string to Base64 online while keeping sensitive values on your device. That means even if you're working with tokens, API secrets, or credentials in Base64 format, nothing leaves your machine. It's the safest possible way to handle this kind of conversion, and it's fast enough that there's no reason to use anything else for everyday developer tasks.",
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
  {
    question: "How do I use Base64 encoding for embedding images in HTML or CSS?",
    answer:
      "Convert your image to Base64 using this tool, then paste the output as the src value in an img tag: <img src='data:image/png;base64,YOUR_BASE64_HERE'>. This eliminates the need for a separate image file and is useful for small icons in email templates or self-contained HTML pages.",
  },
  {
    question: "Can I use this to decode a JWT token?",
    answer:
      "Partially. A JWT has three parts separated by dots. The middle part (the payload) is Base64 encoded. Paste it into the decoder to read the raw JSON payload. Note that this only decodes — it does not verify the JWT signature, so use a dedicated JWT tool if you need full validation.",
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
