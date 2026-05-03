import type { ComponentPropsWithoutRef } from "react";
import { ToolCTA } from "@/components/blog/ToolCTA";
import { FAQ } from "@/components/blog/FAQ";

const articleBody =
  "text-[18px] leading-[1.7] text-gray-800";

export const blogMdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h2
      className="mt-10 text-2xl font-bold text-gray-900 first:mt-0 scroll-mt-24"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-10 text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 scroll-mt-24"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-xl font-semibold text-gray-900 scroll-mt-24" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 text-lg font-semibold text-gray-900 scroll-mt-24" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className={`mt-5 ${articleBody}`} {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className={`mt-5 list-disc pl-6 space-y-2 ${articleBody}`} {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className={`mt-5 list-decimal pl-6 space-y-2 ${articleBody}`} {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1 marker:text-gray-500" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-4 border-blue-200 bg-blue-50/60 py-3 pl-5 pr-4 text-gray-800 italic"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
  ToolCTA,
  FAQ,
};
