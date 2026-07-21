import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, getToolsBySlugs, type Tool } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import InterviewQuestionGeneratorTool from "@/components/tool-ui/InterviewQuestionGeneratorTool";
import { SITE_URL } from "@/lib/utils/metadata";
import {
  getInterviewRole,
  getInterviewRoleSlugs,
  getRelatedInterviewRoles,
} from "@/lib/programmatic/interview-roles";
import { getCoverLetterRole } from "@/lib/programmatic/cover-letter-roles";

const BASE_SLUG = "interview-question-generator";

// Prerender one static page per role at build time.
export function generateStaticParams() {
  return getInterviewRoleSlugs().map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role: slug } = await params;
  const role = getInterviewRole(slug);
  if (!role) return {};

  const title = `${role.role} Interview Questions – Free AI Prep Tool`;
  const canonical = `/interview-questions-for/${role.slug}`;

  return {
    title,
    description: role.metaDescription,
    keywords: `${role.role} interview questions, interview questions for ${role.role.toLowerCase()}, ${role.role.toLowerCase()} interview prep, how to prepare for ${role.role.toLowerCase()} interview`,
    alternates: {
      canonical,
      languages: { "en-US": canonical },
    },
    openGraph: {
      title: `${role.role} Interview Questions & Answers | AI Kit Tools`,
      description: role.metaDescription,
      url: `${SITE_URL}${canonical}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function InterviewQuestionsForRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: slug } = await params;
  const role = getInterviewRole(slug);
  if (!role) notFound();

  const baseTool = getToolBySlug(BASE_SLUG)!;
  // Present the page as a role-specific variant of the interview tool.
  const tool: Tool = {
    ...baseTool,
    name: `${role.role} Interview Questions`,
    slug: `interview-questions-for/${role.slug}`,
    description: role.metaDescription,
  };

  const relatedRoles = getRelatedInterviewRoles(role.slug);
  const relatedTools = getToolsBySlugs([
    "tracker",
    "cover-letter-generator",
    "resume-bullet-generator",
    "ats-resume-checker",
  ]);

  // Cross-link to the matching cover-letter page when one exists (slugs align
  // across the two programmatic clusters).
  const coverLetterMatch = getCoverLetterRole(role.slug);

  const seoSections = [
    {
      heading: `Interview Questions for ${role.role}s`,
      body: role.intro,
    },
    {
      heading: `What Interviewers Are Really Testing in a ${role.role} Interview`,
      body: role.focusAreas,
    },
    {
      heading: "How to Use This Tool",
      body: [
        `The job title is already set to ${role.role} — adjust it if your title differs`,
        "Add the company name for more tailored questions",
        "Select your experience level so questions match your seniority",
        "Choose the interview type — behavioral, technical, or mixed",
        "Click Generate and get 10 interview questions instantly",
        "Read the answer tip for each question before your interview",
      ],
    },
    {
      heading: `A Question ${role.role}s Should Expect`,
      body: `One question that comes up often for ${role.role.toLowerCase()} roles: "${role.sampleQuestion.question}" How to approach it: ${role.sampleQuestion.approach}`,
    },
    {
      heading: `Common ${role.role} Interview Prep Mistakes to Avoid`,
      body: role.commonMistakes,
    },
  ];

  const howToSteps = [
    `Confirm or edit the job title (${role.role})`,
    "Add the company name and experience level",
    "Choose interview type: behavioral, technical, or mixed",
    "Generate 10 likely interview questions",
    "Use the answer tips to practice role-specific responses",
  ];

  return (
    <ToolPageLayout
      tool={tool}
      relatedTools={relatedTools}
      faqs={role.faqs}
      seoSections={seoSections}
      howToSteps={howToSteps}
    >
      <InterviewQuestionGeneratorTool initialJobTitle={role.role} />

      {/* Cross-cluster link: same role, matching cover-letter page. Ties the
          two programmatic flywheels together for both users and crawlers. */}
      {coverLetterMatch && (
        <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5">
          <p className="text-sm text-slate-700">
            📝 Landed the interview? Apply with a tailored letter —{" "}
            <Link
              href={`/cover-letter-for/${coverLetterMatch.slug}`}
              className="font-medium text-purple-700 underline hover:text-purple-800"
            >
              {role.role} Cover Letter Generator
            </Link>
          </p>
        </div>
      )}

      {/* Internal linking network — sibling role pages so crawlers see a
          connected content hub, not orphaned doorway pages. */}
      <nav
        aria-label="Interview questions for other roles"
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-base font-semibold text-slate-900">
          Interview questions for other roles
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {relatedRoles.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/interview-questions-for/${r.slug}`}
                className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
              >
                {r.role}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/interview-question-generator"
              className="inline-block rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100"
            >
              All roles →
            </Link>
          </li>
        </ul>
      </nav>
    </ToolPageLayout>
  );
}
