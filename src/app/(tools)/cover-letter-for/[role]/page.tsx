import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, getToolsBySlugs, type Tool } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CoverLetterGeneratorTool from "@/components/tool-ui/CoverLetterGeneratorTool";
import { SITE_URL } from "@/lib/utils/metadata";
import {
  getCoverLetterRole,
  getCoverLetterRoleSlugs,
  getRelatedCoverLetterRoles,
} from "@/lib/programmatic/cover-letter-roles";

const BASE_SLUG = "cover-letter-generator";

// Prerender one static page per role at build time.
export function generateStaticParams() {
  return getCoverLetterRoleSlugs().map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role: slug } = await params;
  const role = getCoverLetterRole(slug);
  if (!role) return {};

  const title = `${role.role} Cover Letter Generator – Free AI Tool`;
  const canonical = `/cover-letter-for/${role.slug}`;

  return {
    title,
    description: role.metaDescription,
    keywords: `${role.role} cover letter, cover letter for ${role.role.toLowerCase()}, free ${role.role.toLowerCase()} cover letter generator, AI cover letter ${role.role.toLowerCase()}`,
    alternates: {
      canonical,
      languages: { "en-US": canonical },
    },
    openGraph: {
      title: `Free ${role.role} Cover Letter Generator | AI Kit Tools`,
      description: role.metaDescription,
      url: `${SITE_URL}${canonical}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CoverLetterForRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: slug } = await params;
  const role = getCoverLetterRole(slug);
  if (!role) notFound();

  const baseTool = getToolBySlug(BASE_SLUG)!;
  // Present the page as a role-specific variant of the cover letter tool.
  const tool: Tool = {
    ...baseTool,
    name: `${role.role} Cover Letter Generator`,
    slug: `cover-letter-for/${role.slug}`,
    description: role.metaDescription,
  };

  const relatedRoles = getRelatedCoverLetterRoles(role.slug);
  const relatedTools = getToolsBySlugs([
    "tracker",
    "resume-bullet-generator",
    "ats-resume-checker",
    "interview-question-generator",
  ]);

  const seoSections = [
    {
      heading: `Cover Letter Generator for ${role.role}s`,
      body: role.intro,
    },
    {
      heading: `What Hiring Managers Look For in a ${role.role} Cover Letter`,
      body: role.keySkills,
    },
    {
      heading: "How to Use This Tool",
      body: [
        `The job title is already set to ${role.role} — adjust it if your title differs`,
        "Add the company name for a personalized touch",
        "Describe your relevant experience in a few sentences",
        "Choose your preferred tone",
        "Click Generate and get your cover letter instantly",
        "Copy and customize before sending",
      ],
    },
    {
      heading: `A Stronger Opening Line for ${role.role}s`,
      body: `Instead of a generic "I am applying for this role," lead with specific impact. For example: "${role.sampleOpening}"`,
    },
    {
      heading: `Common ${role.role} Cover Letter Mistakes to Avoid`,
      body: role.commonMistakes,
    },
  ];

  const howToSteps = [
    `Confirm or edit the job title (${role.role})`,
    "Add the company name",
    "Describe your relevant experience",
    "Choose a tone",
    "Generate and copy your cover letter",
  ];

  return (
    <ToolPageLayout
      tool={tool}
      relatedTools={relatedTools}
      faqs={role.faqs}
      seoSections={seoSections}
      howToSteps={howToSteps}
    >
      <CoverLetterGeneratorTool initialJobTitle={role.role} />

      {/* Internal linking network — sibling role pages so crawlers see a
          connected content hub, not orphaned doorway pages. */}
      <nav
        aria-label="Cover letters for other roles"
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-base font-semibold text-slate-900">
          Cover letters for other roles
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {relatedRoles.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/cover-letter-for/${r.slug}`}
                className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {r.role}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/cover-letter-generator"
              className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              All roles →
            </Link>
          </li>
        </ul>
      </nav>
    </ToolPageLayout>
  );
}
