import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools/registry";
import { SITE_URL } from "@/lib/utils/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priorityBySlug: Record<string, number> = {
    "cover-letter-generator": 0.9,
    "resume-bullet-generator": 0.9,
    "interview-question-generator": 0.9,
    "ats-resume-checker": 0.9,
    "ai-text-summarizer": 0.7,
    "invoice-generator": 0.7,
    "word-counter": 0.7,
  };

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => {
    const priority = priorityBySlug[tool.slug] ?? 0.6;

    return {
      url: `${SITE_URL}/${tool.slug}`,
      lastModified: now,
      changeFrequency: priority >= 0.7 ? "weekly" : "monthly",
      priority,
    };
  });

  return [...staticPages, ...toolPages];
}
