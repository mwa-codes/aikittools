import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, formatBlogMonthYear } from "@/lib/blog";
import { JsonLd } from "@/components/blog/JsonLd";
import { SITE_URL, DEFAULT_OG_IMAGE_PATH, defaultOpenGraphImages } from "@/lib/utils/metadata";

export const metadata: Metadata = {
  title: "Free Job Search Tips & Career Advice",
  description:
    "Career advice from AI Kit Tools — resume tips, cover letters, job search strategy, and tracker guides for US job seekers. Free AI career tools included.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/blog", languages: { "en-US": "/blog" } },
  openGraph: {
    title: "Free Job Search Tips & Career Advice | AI Kit Tools",
    description:
      "Career advice from AI Kit Tools — resume tips, cover letters, job search strategy, and tracker guides for US job seekers. Free AI career tools included.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "AI Kit Tools",
    locale: "en_US",
    images: defaultOpenGraphImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Job Search Tips & Career Advice | AI Kit Tools",
    description:
      "Career advice from AI Kit Tools — resume tips, cover letters, job search strategy, and tracker guides for US job seekers. Free AI career tools included.",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function BlogListingPage() {
  const posts = getAllBlogPosts().sort(
    (a, b) =>
      new Date(`${b.date}T12:00:00.000Z`).getTime() -
      new Date(`${a.date}T12:00:00.000Z`).getTime(),
  );
  const featuredSlug = "how-to-track-job-applications";
  const featuredPost = posts.find((post) => post.slug === featuredSlug) ?? posts[0];
  const otherPosts = posts.filter((post) => post.slug !== featuredPost?.slug);
  const newestSlug = posts[0]?.slug;
  const lastUpdated =
    posts.length > 0
      ? formatBlogMonthYear(posts[0].lastModified)
      : new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
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
          <p className="mt-3 text-sm text-gray-500">
            Last updated: {lastUpdated} · Reviewed by: AI Kit Tools Editorial Team
          </p>
        </header>

        {posts.length > 0 ? (
          <>
            <article className="group mb-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                  {featuredPost.category}
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  Featured
                </span>
                {featuredPost.slug === newestSlug ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    New
                  </span>
                ) : null}
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="rounded-sm hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="mt-3 text-base leading-relaxed text-gray-700">{featuredPost.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                <time dateTime={featuredPost.lastModified}>
                  Updated {formatBlogMonthYear(featuredPost.lastModified)}
                </time>
                <span aria-hidden className="text-gray-300">
                  ·
                </span>
                <span>{featuredPost.readingTimeLabel}</span>
              </div>

              <div className="mt-5">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                >
                  Read featured article
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </article>

            {otherPosts.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {otherPosts.map((post) => (
                  <li key={post.slug}>
                    <article className="group h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                          {post.category}
                        </span>
                        {post.featured ? (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                            Featured
                          </span>
                        ) : null}
                        {post.slug === newestSlug ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            New
                          </span>
                        ) : null}
                      </div>

                      <h2 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="rounded-sm hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-gray-700 line-clamp-3">{post.description}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm">
                        <time dateTime={post.lastModified}>
                          Updated {formatBlogMonthYear(post.lastModified)}
                        </time>
                        <span aria-hidden className="text-gray-300">
                          ·
                        </span>
                        <span>{post.readingTimeLabel}</span>
                      </div>

                      <div className="mt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                        >
                          Read article
                          <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">
            No articles published yet. Check back soon for fresh job-search guides.
          </div>
        )}
      </div>
    </>
  );
}
