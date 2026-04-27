import type { Metadata } from "next";

const SITE_NAME = "AI Kit Tools";
const SITE_URL = "https://aikittools.com";
const SITE_DESCRIPTION =
  "Free online tools for text, JSON, QR codes, encoding, and AI – all in one place. Fast, simple, no signup required.";

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
  const url = slug ? `${SITE_URL}/${slug}` : SITE_URL;
  const image = ogImage ?? `${SITE_URL}/og-default.png`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: keywords.join(", "),
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
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
