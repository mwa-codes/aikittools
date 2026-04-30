# AI Kit Tools

Free AI career tools and online utilities built with Next.js and TypeScript.

Live site: [https://www.aikittools.com](https://www.aikittools.com)

## What This Project Includes

- 20+ free tools across Career, AI, Text, Developer, Encoder/Decoder, and Calculator categories
- SEO-focused tool pages with metadata helpers, structured content, and sitemap support
- AI-powered tools via server-side API routes using the OpenAI SDK
- Fast, mobile-friendly UI built with Tailwind CSS v4

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- OpenAI SDK
- jsPDF + qrcode

## Local Development

1) Install dependencies

```bash
npm install
```

2) Create `.env.local` (if you want AI features)

```bash
OPENAI_API_KEY=your_api_key_here
```

3) Start development server

```bash
npm run dev
```

4) Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Core Paths

- `src/app` - routes, pages, API routes, and layout
- `src/app/(tools)` - individual tool pages
- `src/components/tool-ui` - tool UI components
- `src/components/layout` - header, footer, and shared layout components
- `src/lib/tools/registry.ts` - central tool registry and categories
- `src/lib/utils/metadata.ts` - metadata helpers/constants

## Adding a New Tool

1. Add tool metadata in `src/lib/tools/registry.ts`
2. Create its UI component in `src/components/tool-ui`
3. Create its route in `src/app/(tools)/<tool-slug>/page.tsx`
4. Add any API route in `src/app/api` if server-side logic is needed

The homepage/category sections and internal linking use the registry, so new tools integrate cleanly.

## Deployment

Optimized for deployment on Vercel.
