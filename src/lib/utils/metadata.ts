import type { Metadata } from "next";

const SITE_NAME = "AI Kit Tools";
const SITE_URL = "https://www.aikittools.com";
const SITE_DESCRIPTION =
  "Free AI career tools for job seekers — job application tracker, AI cover letters, ATS resume checker, resume bullets, interview prep, and LinkedIn help — plus free utilities. Start free, no credit card required.";

/** Default share image; path is resolved with `metadataBase` in the root layout. */
export const DEFAULT_OG_IMAGE_PATH = "/og-image.png";
export const DEFAULT_OG_IMAGE_ALT =
  "AI Kit Tools — job application tracker and AI career tools for job seekers";

export const defaultOpenGraphImages: NonNullable<Metadata["openGraph"]>["images"] = [
  {
    url: DEFAULT_OG_IMAGE_PATH,
    width: 1200,
    height: 630,
    alt: DEFAULT_OG_IMAGE_ALT,
  },
];

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
  const image = ogImage ?? `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: path, languages: { "en-US": path } },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
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
