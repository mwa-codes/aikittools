export type ToolCategory = "ai" | "career";

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
    slug: "tracker",
    name: "Job Application Tracker",
    shortDescription: "Track every job you apply to with AI cover letters and follow-up emails.",
    description:
      "Free job application tracker. Track every role you apply to, update statuses, add notes, and generate AI cover letters and follow-up emails — no spreadsheet needed.",
    category: "career",
    icon: "📋",
    isNew: true,
  },
  {
    slug: "cover-letter-generator",
    name: "AI Cover Letter Generator",
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

export const TOOL_CATEGORY_ORDER: ToolCategory[] = ["career", "ai"];

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  ai: "AI Tools",
  career: "Career Tools",
};
