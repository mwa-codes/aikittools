import { NextResponse, type NextRequest } from "next/server";

/**
 * Return HTTP 410 Gone for the 16 utility tools removed on 2026-05-02 when the
 * site pivoted to career-only.
 *
 * Why 410 and not a 301 redirect: these tools are gone for good and have no
 * relevant career-tool equivalent. The previous config redirected them to
 * unrelated pages (e.g. /invoice-generator -> /cover-letter-generator), which
 * Google treats as a soft-404 — it passes no equity and keeps the dead URLs in
 * the index as "Page with redirect" errors. A 410 tells crawlers the content is
 * permanently removed so these URLs drop out of the index cleanly, freeing crawl
 * budget for the career pages we actually want indexed.
 *
 * If any of these are ever revived, remove its slug here and add a real page.
 */
const GONE_SLUGS = new Set([
  "ai-text-summarizer",
  "invoice-generator",
  "word-counter",
  "case-converter",
  "lorem-ipsum-generator",
  "random-password-generator",
  "color-picker-hex-converter",
  "json-formatter",
  "css-minifier",
  "qr-code-generator",
  "base64-encoder",
  "url-encoder-decoder",
  "html-entity-encoder-decoder",
  "age-calculator",
  "bmi-calculator",
  "loan-emi-calculator",
]);

export function proxy(request: NextRequest) {
  // First path segment, e.g. "/invoice-generator" -> "invoice-generator".
  const slug = request.nextUrl.pathname.split("/")[1];

  if (GONE_SLUGS.has(slug)) {
    return new NextResponse(
      "<!doctype html><title>410 Gone</title><h1>410 — Gone</h1><p>This tool has been permanently removed. Explore our free career tools at <a href=\"/\">aikittools.com</a>.</p>",
      {
        status: 410,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }

  return NextResponse.next();
}

export const config = {
  // Only run on the dead top-level slugs; skip everything else (assets, api,
  // career pages) so the middleware adds no overhead to live routes.
  matcher: [
    "/ai-text-summarizer",
    "/invoice-generator",
    "/word-counter",
    "/case-converter",
    "/lorem-ipsum-generator",
    "/random-password-generator",
    "/color-picker-hex-converter",
    "/json-formatter",
    "/css-minifier",
    "/qr-code-generator",
    "/base64-encoder",
    "/url-encoder-decoder",
    "/html-entity-encoder-decoder",
    "/age-calculator",
    "/bmi-calculator",
    "/loan-emi-calculator",
  ],
};
