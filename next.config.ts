import type { NextConfig } from "next";
import path from "path";

// Force module resolution to always use THIS project's node_modules.
// Use process.cwd() instead of __dirname because config loaders can execute
// this file from a parent directory (e.g. /Users/MWA/Desktop), which breaks
// relative resolution for Tailwind.
const localModules = path.resolve(process.cwd(), "node_modules");
const tailwindPath = path.resolve(localModules, "tailwindcss");

const nextConfig: NextConfig = {
  // Compress responses
  compress: true,

  // Strict mode for better React practices
  reactStrictMode: true,

  // Pin workspace root: a parent folder (/Users/MWA) also has package-lock.json;
  // without this, Turbopack can pick the wrong root and / returns 404 in dev.
  turbopack: {
    root: path.resolve(process.cwd()),
    resolveAlias: {
      tailwindcss: tailwindPath,
    },
  },

  // Webpack fallback: prioritize project-local node_modules for all resolution
  webpack(config) {
    config.resolve.modules = [localModules, "node_modules"];
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: tailwindPath,
    };
    return config;
  },

  // Security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/tools/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
