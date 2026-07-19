import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE_PATH, defaultOpenGraphImages } from "@/lib/utils/metadata";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";

/**
 * Ensures tool pages keep a default share image when their `openGraph` omits `images`
 * (Next merges layout + page metadata; this guarantees OG/Twitter images for all tools).
 */
export const metadata: Metadata = {
  openGraph: { images: defaultOpenGraphImages },
  twitter: { images: [DEFAULT_OG_IMAGE_PATH] },
};

export default function ToolsGroupLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
