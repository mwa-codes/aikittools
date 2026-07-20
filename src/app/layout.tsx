import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  defaultOpenGraphImages,
} from "@/lib/utils/metadata";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-89XMTG98WC";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aikittools.com"),
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },
  title: {
    default: SITE_NAME,
    template: "%s | AI Kit Tools",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: defaultOpenGraphImages,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  icons: {
    icon: "/aikittools_favicon.ico",
    shortcut: "/aikittools_favicon.ico",
    apple: "/logo-AK.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sitewide brand entity. Establishes "AI Kit Tools" as a single identifiable
  // organization for Google's knowledge graph and AI search engines (GEO).
  // NOTE: add official profile URLs to `sameAs` once social accounts exist —
  // that link set is what search engines use to verify the entity.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-AK.png`,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };

  return (
    <html lang="en-US" data-scroll-behavior="smooth">
      <head>
        <meta name="impact-site-verification" content="879674d4-00c9-49e2-8384-5bb6b9b8899b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-placeholder" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
