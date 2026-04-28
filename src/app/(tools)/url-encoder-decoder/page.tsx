import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import UrlEncoderTool from "@/components/tool-ui/UrlEncoderTool";

const SLUG = "url-encoder-decoder";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder – Encode URLs Online Free",
  description:
    "Encode or decode URLs and query strings instantly. Perfect for developers and digital marketers. Free online URL encoder tool, no signup required.",
  alternates: { canonical: "https://www.aikittools.com/url-encoder-decoder" },
  openGraph: {
    title: "URL Encoder & Decoder – Encode URLs Online Free",
    description:
      "Encode or decode URLs and query strings instantly. Perfect for developers and digital marketers. Free online URL encoder tool, no signup required.",
    url: "https://www.aikittools.com/url-encoder-decoder",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the URL Encoder & Decoder?",
    body: "The URL Encoder and Decoder converts characters that aren't safe to use directly in a URL — spaces, ampersands, equals signs, and special characters — into their percent-encoded equivalents, and decodes them back to readable text when needed. If you've ever seen a URL containing %20 or %26, that's percent encoding at work. Developers need this when building query strings, passing parameters through APIs, creating redirect URLs, or debugging traffic from server logs. Digital marketers use it to safely encode campaign tracking parameters without breaking link structure.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Paste your URL or query string into the input field.",
      "Click Encode URL to convert special characters into safe percent-encoded format.",
      "Or click Decode URL to convert a percent-encoded string back to readable text.",
      "Review the output in the result panel.",
      "Click Copy to use the result in your browser, code, or tracking links.",
    ],
  },
  {
    heading: "Why Use URL Encoder Online?",
    body: "Free with no account or signup. All encoding and decoding runs in your browser with zero server involvement, so your URLs and query parameters stay private. Works on desktop and mobile, making it handy during testing sessions and quick debugging tasks away from your main machine. No page reload between encode and decode — just switch modes and the result updates instantly.",
  },
];

const faqs = [
  {
    question: "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI is designed to encode a complete URL and preserves characters like /, ?, #, and &. encodeURIComponent is designed to encode individual URL components (like a query parameter value) and encodes those reserved characters too. This tool uses encodeURIComponent, which is the safer and more common choice for encoding values within a URL.",
  },
  {
    question: "Why is a space encoded as %20 and not as +?",
    answer:
      "Both are valid representations of a space, but in different contexts. %20 is the standard percent-encoding used in URI paths and query values. The + sign is used for spaces in application/x-www-form-urlencoded format (HTML forms). Our tool uses the %20 standard (encodeURIComponent).",
  },
  {
    question: "Can I URL-encode an entire URL with this tool?",
    answer:
      "Yes, but this will encode the entire URL including ://, /, ?, and & — turning it into a single encoded string. This is useful when you want to pass a full URL as a query parameter. If you want to keep the URL structure intact but encode just the values, encode each query parameter value separately.",
  },
  {
    question: "Is URL decoding safe? Can decoding a URL expose security risks?",
    answer:
      "Decoding a URL is safe for display purposes. However, in web applications, you should always validate and sanitize decoded URL parameters before using them in queries, file paths, or HTML output to prevent injection attacks.",
  },
];

export default function UrlEncoderDecoderPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getRelatedTools(SLUG);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <UrlEncoderTool />
    </ToolPageLayout>
  );
}
