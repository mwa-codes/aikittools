import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { tools } from "@/lib/tools/registry";
import { SITE_URL } from "@/lib/utils/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priorityBySlug: Record<string, number> = {
    "tracker": 0.9,
    "cover-letter-generator": 0.9,
    "resume-bullet-generator": 0.9,
    "interview-question-generator": 0.9,
    "ats-resume-checker": 0.9,
    "linkedin-summary-generator": 0.9,
    "ai-text-summarizer": 0.7,
    "invoice-generator": 0.7,
    "word-counter": 0.7,
  };

  const blogPosts = getAllBlogPosts();
  const blogListingLastModified =
    blogPosts.length > 0
      ? new Date(
          Math.max(
            ...blogPosts.map((p) =>
              new Date(`${p.lastModified}T12:00:00.000Z`).getTime(),
            ),
          ),
        )
      : now;

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogListingLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogArticlePages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.lastModified}T12:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => {
    const priority = priorityBySlug[tool.slug] ?? 0.6;

    return {
      url: `${SITE_URL}/${tool.slug}`,
      lastModified: now,
      changeFrequency: priority >= 0.7 ? "weekly" : "monthly",
      priority,
    };
  });

  return [...staticPages, ...blogArticlePages, ...toolPages];
}
