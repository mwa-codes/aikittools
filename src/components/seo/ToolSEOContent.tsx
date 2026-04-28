interface ContentSection {
  heading: string;
  body: string | string[];
  subSections?: Array<{
    heading: string;
    body: string | string[];
  }>;
}

interface ToolSEOContentProps {
  sections: ContentSection[];
}

export default function ToolSEOContent({ sections }: ToolSEOContentProps) {
  return (
    <section className="mt-12 max-w-none" aria-label="Tool information">
      {sections.map((section, index) => (
        <div key={index} className="mb-5 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{section.heading}</h2>
          {Array.isArray(section.body) ? (
            <ul className="space-y-2 text-gray-700 text-sm leading-relaxed list-disc list-inside">
              {section.body.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed">{section.body}</p>
          )}
          {section.subSections?.map((subSection, subIndex) => (
            <div key={`${index}-${subIndex}`} className="mt-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{subSection.heading}</h3>
              {Array.isArray(subSection.body) ? (
                <ul className="space-y-2 text-gray-700 text-sm leading-relaxed list-disc list-inside">
                  {subSection.body.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">{subSection.body}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
