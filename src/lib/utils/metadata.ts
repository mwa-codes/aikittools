import type { Metadata } from "next";

const SITE_NAME = "AI Kit Tools";
const SITE_URL = "https://aikittools.com";
const SITE_DESCRIPTION =
  "Free AI tools and online utilities including calculators, developer tools, and AI-powered tools.";

export function buildMetadata({
  title,
  description,
  keywords,
  slug,
  ogImage,
}: {
  title: string;
  description: string;
  keywords: string[];
  slug?: string;
  ogImage?: string;
}): Metadata {
  const path = slug ? `/${slug}` : "/";
  const image = ogImage ?? `${SITE_URL}/og-default.png`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export { SITE_NAME, SITE_URL, SITE_DESCRIPTION };
