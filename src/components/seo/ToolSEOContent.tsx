interface ContentSection {
  heading: string;
  body: string | string[];
}

interface ToolSEOContentProps {
  sections: ContentSection[];
}

export default function ToolSEOContent({ sections }: ToolSEOContentProps) {
  return (
    <section className="mt-12 prose prose-gray max-w-none" aria-label="Tool information">
      {sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
          {Array.isArray(section.body) ? (
            <ul className="space-y-2 text-gray-600 text-sm leading-relaxed list-disc list-inside">
              {section.body.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
          )}
        </div>
      ))}
    </section>
  );
}
