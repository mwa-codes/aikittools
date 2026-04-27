export interface Tool {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: "text" | "developer" | "ai" | "encoder" | "generator";
  icon: string;
  isAI?: boolean;
  isNew?: boolean;
}

export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    shortDescription: "Count words, characters, sentences & reading time.",
    description:
      "Free online word and character counter. Instantly count words, characters, sentences, paragraphs, and estimate reading time.",
    category: "text",
    icon: "📝",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Format, validate, and beautify JSON instantly.",
    description:
      "Free online JSON formatter and validator. Beautify, minify, and validate your JSON data with clear error messages.",
    category: "developer",
    icon: "🔧",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    shortDescription: "Generate QR codes from any text or URL.",
    description:
      "Free online QR code generator. Turn any text or URL into a downloadable QR code instantly.",
    category: "generator",
    icon: "📱",
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    shortDescription: "Encode and decode Base64 strings instantly.",
    description:
      "Free online Base64 encoder and decoder. Easily encode plain text to Base64 or decode Base64 back to readable text.",
    category: "encoder",
    icon: "🔐",
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder / Decoder",
    shortDescription: "Encode and decode URLs for use in web applications.",
    description:
      "Free online URL encoder and decoder. Encode special characters for safe URL use or decode percent-encoded URLs instantly.",
    category: "encoder",
    icon: "🔗",
  },
  {
    slug: "ai-text-summarizer",
    name: "AI Text Summarizer",
    shortDescription: "Summarize long text in seconds using AI.",
    description:
      "Free AI-powered text summarizer. Paste any article, document, or passage and get a concise summary powered by OpenAI.",
    category: "ai",
    icon: "🤖",
    isAI: true,
    isNew: true,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(currentSlug: string, count = 4): Tool[] {
  return tools.filter((t) => t.slug !== currentSlug).slice(0, count);
}
