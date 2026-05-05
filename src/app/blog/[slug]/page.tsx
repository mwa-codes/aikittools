import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedPosts,
  formatBlogDate,
} from "@/lib/blog";
import { blogMdxComponents } from "@/components/blog/mdx-components";
import { BlogBreadcrumb } from "@/components/blog/BlogBreadcrumb";
import { JsonLd } from "@/components/blog/JsonLd";
import { SITE_URL } from "@/lib/utils/metadata";

type Props = { params: Promise<{ slug: string }> };

const OG_IMAGE = `${SITE_URL}/og-image.png`;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Article not found" };
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const publishedTime = new Date(`${post.date}T12:00:00.000Z`).toISOString();
  const modifiedTime = new Date(`${post.lastModified}T12:00:00.000Z`).toISOString();

  return {
    title: post.title,
    description: post.description,
    robots: { index: true, follow: true },
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      siteName: "AI Kit Tools",
      locale: "en_US",
      publishedTime,
      modifiedTime,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.category, post.slug, 3);
  const url = `${SITE_URL}/blog/${slug}`;
  const publishedIso = new Date(`${post.date}T12:00:00.000Z`).toISOString();
  const modifiedIso = new Date(`${post.lastModified}T12:00:00.000Z`).toISOString();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    url,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AI Kit Tools",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-AK.png`,
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [articleLd, breadcrumbLd],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <BlogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight text-balance">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            <span className="text-gray-300" aria-hidden>
              ·
            </span>
            <span>{post.readingTimeLabel}</span>
            <span className="text-gray-300" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {post.category}
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Last updated: {formatBlogDate(post.lastModified)} · Reviewed by: {post.author}
          </p>
        </header>

        <div className="max-w-[720px] [&>p:first-child]:mt-0 [&>h2:first-child]:mt-0">
          <MDXRemote
            source={post.content}
            components={blogMdxComponents}
            options={{
              scope: {
                faqItems: post.faq ?? [],
              },
              // Allow JSX attribute expressions (e.g. items={faqItems}); source is trusted repo content.
              blockJS: false,
              blockDangerousJS: true,
            }}
          />
        </div>

        {related.length > 0 ? (
          <section className="mt-14 border-t border-gray-200 pt-10" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Related articles
            </h2>
            <ul className="space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group block rounded-lg border border-gray-200 bg-gray-50/80 p-4 transition hover:border-blue-200 hover:bg-white"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
                      {r.category}
                    </p>
                    <p className="mt-1 font-semibold text-gray-900 group-hover:text-blue-700">
                      {r.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{r.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex text-base font-semibold text-blue-600 hover:text-blue-800"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}
