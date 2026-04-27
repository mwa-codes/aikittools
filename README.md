# ⚡ AI Kit Tools

**aikittools.com** — Free, fast, SEO-optimized online tools for developers, writers, and everyone.

## 🚀 Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **OpenAI SDK** (for AI Text Summarizer)
- **qrcode** (for QR Code Generator)
- Deployed on **Vercel**

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (tools)/                  # Route group — SEO-friendly short URLs
│   │   ├── word-counter/
│   │   ├── json-formatter/
│   │   ├── qr-code-generator/
│   │   ├── base64-encoder/
│   │   ├── url-encoder-decoder/
│   │   └── ai-text-summarizer/
│   ├── api/
│   │   └── summarize/route.ts    # OpenAI API proxy (server-side only)
│   ├── about/
│   ├── privacy-policy/
│   ├── terms/
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # robots.txt
│   ├── layout.tsx                # Root layout (Header + Footer)
│   └── page.tsx                  # Homepage with tool directory
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ToolPageLayout.tsx    # Reusable tool page wrapper
│   │   └── RelatedTools.tsx
│   ├── seo/
│   │   ├── FAQSection.tsx        # With JSON-LD FAQ schema
│   │   └── ToolSEOContent.tsx
│   └── tool-ui/
│       ├── WordCounterTool.tsx
│       ├── JsonFormatterTool.tsx
│       ├── QrCodeGeneratorTool.tsx
│       ├── Base64Tool.tsx
│       ├── UrlEncoderTool.tsx
│       └── AiTextSummarizerTool.tsx
├── lib/
│   ├── tools/
│   │   └── registry.ts           # Central tool registry (add new tools here)
│   └── utils/
│       └── metadata.ts           # buildMetadata() helper
```

---

## 🔧 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/youruser/aikittools.git
cd aikittools
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-...
```

### 3. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## ➕ Adding a New Tool

1. **Register it** in `src/lib/tools/registry.ts`
2. **Create the UI component** in `src/components/tool-ui/YourTool.tsx`
3. **Create the page** in `src/app/(tools)/your-tool/page.tsx` — use `ToolPageLayout` with SEO sections and FAQs
4. That's it — the header, footer, related tools, and sitemap update automatically

---

## 🌐 SEO Features

- Per-page `<title>`, `<meta description>`, canonical URLs, OG + Twitter cards
- FAQ structured data (JSON-LD `FAQPage` schema)
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic HTML: single `<h1>`, proper `<h2>`/`<h3>` hierarchy
- 800–1200 word SEO content sections on every tool page
- Internal linking via Related Tools section

## 🔒 Security

- OpenAI API key is **server-side only** — never exposed to the browser
- Security headers configured in `next.config.ts`
- All non-AI tools process data entirely in the browser

## 📊 Future Ready

The codebase is structured for:
- **Google AdSense** — add publisher ID to `.env.local`, drop `<AdSense>` component in layout
- **Supabase** — add auth + tool usage history with minimal changes
- **Paid features** — gate tools by checking session/subscription in page components
