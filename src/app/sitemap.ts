import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/utils/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tracker`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/cover-letter-generator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/ats-resume-checker`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/resume-bullet-generator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${SITE_URL}/interview-question-generator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/linkedin-summary-generator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
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
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  return [...staticPages, ...blogArticlePages];
}
