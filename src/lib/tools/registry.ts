export type ToolCategory = "text" | "developer" | "encoder" | "calculator" | "ai" | "career";

export interface Tool {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  icon: string;
  isAI?: boolean;
  isNew?: boolean;
}

export const tools: Tool[] = [
  {
    slug: "age-calculator",
    name: "Age Calculator",
    shortDescription: "Calculate exact age in years, months, and days.",
    description:
      "Free age calculator to find exact age from date of birth in years, months, and days, plus time left until next birthday.",
    category: "calculator",
    icon: "🎂",
    isNew: true,
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    shortDescription: "Calculate BMI and weight category instantly.",
    description:
      "Free BMI calculator for metric and imperial units. Check body mass index and category: underweight, normal, overweight, or obese.",
    category: "calculator",
    icon: "⚖️",
    isNew: true,
  },
  {
    slug: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    shortDescription: "Estimate monthly EMI, total payment, and interest.",
    description:
      "Free loan EMI calculator to estimate monthly installment, total repayment, and total interest for home, car, and personal loans.",
    category: "calculator",
    icon: "💰",
    isNew: true,
  },
  {
    slug: "random-password-generator",
    name: "Random Password Generator",
    shortDescription: "Generate secure passwords with custom options.",
    description:
      "Free random password generator. Create strong, secure passwords with custom length, symbols, numbers, and case settings.",
    category: "developer",
    icon: "🔐",
    isNew: true,
  },
  {
    slug: "invoice-generator",
    name: "Free Invoice Generator",
    shortDescription: "Create and download professional invoices as PDF.",
    description:
      "Free invoice generator to add client details, line items, and instantly download a clean invoice PDF.",
    category: "text",
    icon: "🧾",
    isNew: true,
  },
  {
    slug: "color-picker-hex-converter",
    name: "Color Picker & HEX Converter",
    shortDescription: "Convert HEX, RGB, and HSL color values instantly.",
    description:
      "Free color picker and converter for HEX, RGB, and HSL. Pick a color and copy values in one click.",
    category: "developer",
    icon: "🎨",
    isNew: true,
  },
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
    category: "encoder",
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
    slug: "case-converter",
    name: "Case Converter",
    shortDescription: "Convert text case instantly with live preview.",
    description:
      "Free online case converter. Convert text to uppercase, lowercase, title case, sentence case, or camelCase instantly.",
    category: "text",
    icon: "🔤",
    isNew: true,
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    shortDescription: "Generate placeholder paragraphs, words, or sentences.",
    description:
      "Free Lorem Ipsum generator to create placeholder text for design mockups, websites, and content drafts.",
    category: "text",
    icon: "📝",
    isNew: true,
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    shortDescription: "Minify and compress CSS code in one click.",
    description:
      "Free CSS minifier to remove comments and whitespace from CSS, reducing file size for faster page loads.",
    category: "developer",
    icon: "💻",
    isNew: true,
  },
  {
    slug: "html-entity-encoder-decoder",
    name: "HTML Entity Encoder & Decoder",
    shortDescription: "Encode or decode HTML entities instantly.",
    description:
      "Free HTML entity encoder and decoder to convert special characters to entities and decode entities back to text.",
    category: "encoder",
    icon: "🔐",
    isNew: true,
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
  {
    slug: "cover-letter-generator",
    name: "✉️ Cover Letter Generator",
    shortDescription: "Generate tailored cover letters in seconds with AI.",
    description:
      "Free AI cover letter generator. Enter your job title, company, and experience to create a professional cover letter instantly.",
    category: "career",
    icon: "✉️",
    isAI: true,
    isNew: true,
  },
  {
    slug: "resume-bullet-generator",
    name: "Resume Bullet Generator",
    shortDescription: "Turn your job duties into achievement-focused resume bullets using AI.",
    description:
      "Turn your job duties into achievement-focused resume bullets using AI.",
    category: "career",
    icon: "📝",
    isAI: true,
    isNew: true,
  },
  {
    slug: "interview-question-generator",
    name: "Interview Question Generator",
    shortDescription: "Get likely interview questions for any job title with tips on how to answer them.",
    description:
      "Get likely interview questions for any job title with tips on how to answer them.",
    category: "career",
    icon: "🎤",
    isAI: true,
    isNew: true,
  },
  {
    slug: "ats-resume-checker",
    name: "ATS Resume Checker",
    shortDescription: "Check if your resume passes ATS screening and get keyword suggestions before you apply.",
    description:
      "Check if your resume passes ATS screening and get keyword suggestions before you apply.",
    category: "career",
    icon: "🔍",
    isAI: true,
    isNew: true,
  },
  {
    slug: "linkedin-summary-generator",
    name: "LinkedIn Summary Generator",
    shortDescription: "Write a professional LinkedIn About section in seconds using AI.",
    description: "Write a professional LinkedIn About section in seconds using AI.",
    category: "career",
    icon: "💼",
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

export function getToolsBySlugs(slugs: string[]): Tool[] {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is Tool => Boolean(tool));
}

export const TOOL_CATEGORY_ORDER: ToolCategory[] = ["career", "ai", "text", "developer", "encoder", "calculator"];

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  text: "Text Tools",
  developer: "Developer Tools",
  encoder: "Encoder/Decoder",
  calculator: "Calculators",
  ai: "AI Tools",
  career: "Career Tools",
};
