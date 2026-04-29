import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools/registry";
import { SITE_URL } from "@/lib/utils/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => {
    const isCareerTool = tool.category === "career";
    const isAiTool = tool.category === "ai";

    return {
      url: `${SITE_URL}/${tool.slug}`,
      lastModified: now,
      changeFrequency: isCareerTool || isAiTool ? "weekly" : "monthly",
      priority: isCareerTool ? 0.95 : isAiTool ? 0.9 : 0.8,
    };
  });

  return [...staticPages, ...toolPages];
}
