import WorkspaceSidebar from "./WorkspaceSidebar";

/**
 * Wraps tool/tracker content with the persistent Workspace rail (Pillar 2).
 *
 * Server component — the sidebar itself is the only client piece (it reads the
 * pathname). Content keeps its own max-width and SEO markup untouched; the shell
 * just adds the rail beside it and caps the overall width.
 */
export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <WorkspaceSidebar />
        {/* Content brings its own vertical padding + max-width (ToolPageLayout / tracker). */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
