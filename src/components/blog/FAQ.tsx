export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  if (!items?.length) return null;
  return (
    <section
      className="my-12 border-t border-gray-200 pt-10 not-prose"
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <details
            key={`${item.question}-${index}`}
            className="group rounded-lg border border-gray-200 bg-white shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-semibold text-gray-900 flex-1">{item.question}</h3>
              <span className="mt-0.5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-5 pb-5 pt-0 text-[18px] leading-[1.7] text-gray-700">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
