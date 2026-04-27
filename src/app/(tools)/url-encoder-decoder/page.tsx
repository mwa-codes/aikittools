import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import UrlEncoderTool from "@/components/tool-ui/UrlEncoderTool";

const SLUG = "url-encoder-decoder";

export const metadata: Metadata = buildMetadata({
  title: "Free URL Encoder & Decoder Online – Percent-Encode URLs Instantly",
  description:
    "Encode or decode URLs and query strings with our free online URL encoder/decoder. Percent-encode special characters for safe web use. No signup required.",
  keywords: [
    "url encoder",
    "url decoder",
    "percent encoding",
    "encode url online",
    "decode url online",
    "url encoding tool",
    "urlencode",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is URL Encoding?",
    body: "URL encoding (also called percent-encoding) is a process that converts special characters in a URL into a format that can be safely transmitted over the internet. Characters like spaces, ampersands (&), question marks (?), and non-ASCII characters are replaced with a percent sign (%) followed by two hexadecimal digits. For example, a space becomes %20 and & becomes %26. URL encoding ensures that data passed in URLs is interpreted correctly by web servers and browsers.",
  },
  {
    heading: "How to Use the URL Encoder / Decoder",
    body: [
      "Select 'Encode URL' to convert a plain text string or URL into a percent-encoded format.",
      "Select 'Decode URL' to convert a percent-encoded URL back to readable text.",
      "Paste or type your input into the left text area.",
      "The output appears instantly in the right panel.",
      "Click 'Copy' to copy the result, or 'Swap & Reverse' to use the output as input.",
    ],
  },
  {
    heading: "Features",
    body: [
      "Instant encoding and decoding using the native encodeURIComponent / decodeURIComponent functions.",
      "Handles all special characters including spaces, Unicode, and reserved characters.",
      "Clear error messages for invalid encoded input.",
      "Swap & Reverse button for quick round-trip testing.",
      "Runs entirely in your browser — no data is sent to a server.",
      "Free and unlimited.",
    ],
  },
  {
    heading: "When Do You Need URL Encoding?",
    body: [
      "When building query parameters for API requests (e.g., search terms with spaces).",
      "When constructing redirect URLs that contain other URLs as parameters.",
      "When working with form data that includes special characters.",
      "When debugging encoded URLs from server logs or analytics tools.",
      "When creating links that include non-ASCII characters (accented letters, CJK characters).",
    ],
  },
  {
    heading: "What Characters Get Encoded?",
    body: "The encodeURIComponent function used by this tool encodes all characters except: A–Z, a–z, 0–9, -, _, ., !, ~, *, ', (, and ). This includes spaces (encoded as %20), /, ?, #, &, =, and all Unicode characters outside the ASCII range. If you need to encode a complete URL while preserving its structure, you should encode each component (path segments, query values) individually.",
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
