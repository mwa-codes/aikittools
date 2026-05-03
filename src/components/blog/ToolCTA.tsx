import Link from "next/link";

export type ToolCTAProps = {
  toolName: string;
  toolUrl: string;
  description: string;
};

export function ToolCTA({ toolName, toolUrl, description }: ToolCTAProps) {
  const href = toolUrl.startsWith("/") ? toolUrl : `/${toolUrl}`;
  return (
    <aside
      className="my-10 rounded-xl px-6 py-7 shadow-md not-prose"
      style={{ backgroundColor: "#1E40AF" }}
      aria-label={`Try ${toolName}`}
    >
      <p className="text-white/95 text-lg leading-relaxed mb-5">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-semibold text-[#1E40AF] shadow-sm transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Open {toolName}
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    </aside>
  );
}
