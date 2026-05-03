import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, formatBlogDate } from "@/lib/blog";
import { JsonLd } from "@/components/blog/JsonLd";
import { SITE_URL } from "@/lib/utils/metadata";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "Free Job Search Tips & Career Advice",
  description:
    "Practical career advice, resume tips, cover letter guides, and job search strategies for US job seekers. Free tools included.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Free Job Search Tips & Career Advice | AI Kit Tools",
    description:
      "Practical career advice, resume tips, cover letter guides, and job search strategies for US job seekers. Free tools included.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "AI Kit Tools",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "AI Kit Tools — Career tips and free job search tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Job Search Tips & Career Advice | AI Kit Tools",
    description:
      "Practical career advice, resume tips, cover letter guides, and job search strategies for US job seekers. Free tools included.",
    images: [OG_IMAGE],
  },
};

export default function BlogListingPage() {
  const posts = getAllBlogPosts();
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
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            Practical career advice, resume tips, cover letter guides, and job search strategies for
            US job seekers—with free tools you can use today.
          </p>
        </header>

        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {post.category}
                  </span>
                  <span aria-hidden className="text-gray-300">
                    ·
                  </span>
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                  <span aria-hidden className="text-gray-300">
                    ·
                  </span>
                  <span>{post.readingTimeLabel}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-sm"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[18px] leading-[1.7] text-gray-700">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Read article →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
