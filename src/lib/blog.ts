import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  lastModified: string;
  author: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetTool: string;
  toolUrl: string;
  readingTime: string;
  featured: boolean;
  faq?: BlogFaqItem[];
}

export interface BlogPostMeta extends BlogFrontmatter {
  readingMinutes: number;
  readingTimeLabel: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function isBlogFile(name: string): boolean {
  return name.endsWith(".mdx") || name.endsWith(".md");
}

function wordCountFromBody(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function computeReadingMinutes(body: string): number {
  const words = wordCountFromBody(body);
  return Math.max(1, Math.ceil(words / 200));
}

function normalizeFaq(raw: unknown): BlogFaqItem[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: BlogFaqItem[] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const q = (row as Record<string, unknown>).question;
    const a = (row as Record<string, unknown>).answer;
    if (typeof q === "string" && typeof a === "string") {
      out.push({ question: q, answer: a });
    }
  }
  return out.length ? out : undefined;
}

function normalizeFrontmatter(raw: Record<string, unknown>): BlogFrontmatter {
  const secondary = raw.secondaryKeywords;
  return {
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    description: String(raw.description ?? ""),
    date: String(raw.date ?? ""),
    lastModified: String(raw.lastModified ?? raw.date ?? ""),
    author: String(raw.author ?? "AIKitTools Team"),
    category: String(raw.category ?? ""),
    primaryKeyword: String(raw.primaryKeyword ?? ""),
    secondaryKeywords: Array.isArray(secondary)
      ? secondary.map(String)
      : typeof secondary === "string"
        ? [secondary]
        : [],
    targetTool: String(raw.targetTool ?? ""),
    toolUrl: String(raw.toolUrl ?? ""),
    readingTime: String(raw.readingTime ?? ""),
    featured: Boolean(raw.featured),
    faq: normalizeFaq(raw.faq),
  };
}

function fileToPost(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = normalizeFrontmatter(data as Record<string, unknown>);
  if (!fm.slug || !fm.title) return null;
  const readingMinutes = computeReadingMinutes(content);
  const readingTimeLabel = `${readingMinutes} min read`;
  return {
    ...fm,
    content,
    readingMinutes,
    readingTimeLabel,
  };
}

export function getAllBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const names = fs.readdirSync(BLOG_DIR).filter(isBlogFile);
  const posts: BlogPostMeta[] = [];
  for (const name of names) {
    const full = path.join(BLOG_DIR, name);
    const post = fileToPost(full);
    if (post) {
      const { content, ...meta } = post;
      void content;
      posts.push(meta);
    }
  }
  return posts.sort(
    (a, b) =>
      new Date(b.date + "T12:00:00.000Z").getTime() -
      new Date(a.date + "T12:00:00.000Z").getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const names = fs.readdirSync(BLOG_DIR).filter(isBlogFile);
  for (const name of names) {
    const full = path.join(BLOG_DIR, name);
    const post = fileToPost(full);
    if (post && post.slug === slug) return post;
  }
  return null;
}

export function getRelatedPosts(
  category: string,
  excludeSlug: string,
  limit = 3,
): BlogPostMeta[] {
  return getAllBlogPosts()
    .filter((p) => p.category === category && p.slug !== excludeSlug)
    .slice(0, limit);
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}

export function formatBlogDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00.000Z");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
