import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export function BlogBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="text-gray-400 select-none" aria-hidden>
                &gt;
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium line-clamp-2">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
