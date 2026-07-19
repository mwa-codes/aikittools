/**
 * Programmatic SEO data: "Cover Letter for [Role]" pages.
 *
 * Each entry is HAND-AUTHORED with genuinely unique content — not a keyword
 * find-replace. This is deliberate: Google penalizes "doorway pages" (batches of
 * near-identical pages), which would harm the whole domain. Quality per page
 * protects the existing ranked content.
 *
 * Adding a new role = append one entry here. No code changes needed; the route
 * and sitemap map over this array.
 */

export interface CoverLetterRole {
  /** URL segment: /cover-letter-for/<slug> */
  slug: string;
  /** Display role name, also prefilled into the generator. */
  role: string;
  /** Search-focused meta description (<160 chars). */
  metaDescription: string;
  /** Role-specific opening paragraph for the page. */
  intro: string;
  /** Skills hiring managers look for in THIS role. */
  keySkills: string[];
  /** A real, tailored example opening line for this role. */
  sampleOpening: string;
  /** Role-specific mistakes to avoid. */
  commonMistakes: string[];
  /** 2 role-specific FAQs. */
  faqs: { question: string; answer: string }[];
}

export const coverLetterRoles: CoverLetterRole[] = [
  {
    slug: "software-engineer",
    role: "Software Engineer",
    metaDescription:
      "Free AI cover letter generator for software engineers. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A software engineer cover letter should do what your resume can't: connect your technical work to the impact it created. Hiring managers skim for signals of ownership, collaboration, and shipping real products — not a list of languages. This tool drafts a tailored letter from your experience so you can focus on the details that matter.",
    keySkills: [
      "Shipping production code, not just side projects",
      "Collaboration across product, design, and QA",
      "Ownership of a feature or system end to end",
      "Measurable impact (latency, uptime, adoption)",
    ],
    sampleOpening:
      "I cut our checkout API's p95 latency from 800ms to 210ms by redesigning the caching layer — the kind of performance work I'd bring to your platform team.",
    commonMistakes: [
      "Listing every language and framework instead of showing impact",
      "Rewriting your resume in paragraph form",
      "No mention of the team or product you'd be joining",
      "Generic 'passionate about technology' opening",
    ],
    faqs: [
      {
        question: "Should a software engineer cover letter include code or links?",
        answer:
          "Skip pasted code. One line pointing to a GitHub profile or a shipped product is enough — the letter's job is to show impact and fit, and the interview is where technical depth gets tested.",
      },
      {
        question: "How technical should the cover letter be?",
        answer:
          "Match the role. For a backend role, name the systems you built and the results. Avoid deep jargon a recruiter won't parse on the first read — the first reader is often non-technical.",
      },
    ],
  },
  {
    slug: "registered-nurse",
    role: "Registered Nurse",
    metaDescription:
      "Free AI cover letter generator for registered nurses. Create a tailored, compassionate, ATS-friendly nursing cover letter in seconds.",
    intro:
      "A nursing cover letter has to balance clinical competence with the human side of care. Hiring managers on a unit want to see your specialty, your certifications, and evidence that you stay calm under pressure. This tool drafts a letter that leads with patient outcomes and fits the specific unit you're applying to.",
    keySkills: [
      "Specialty and unit experience (ICU, ER, med-surg, pediatrics)",
      "Active licensure and certifications (RN, BLS, ACLS)",
      "Patient outcomes and safety record",
      "Communication with families and care teams",
    ],
    sampleOpening:
      "In three years on a 32-bed med-surg floor, I maintained a zero-fall record across my patient assignments while precepting four new grads — I'd bring that same standard to your cardiac unit.",
    commonMistakes: [
      "Not naming the specialty or unit you're applying to",
      "Leaving out licensure and certification status",
      "Focusing on tasks instead of patient outcomes",
      "Ignoring the shift or setting the posting specifies",
    ],
    faqs: [
      {
        question: "Should I list my nursing certifications in the cover letter?",
        answer:
          "Yes — mention active licensure (RN) and key certifications (BLS, ACLS, specialty certs) early. Many healthcare ATS systems and managers screen for them before anything else.",
      },
      {
        question: "How do I write a nursing cover letter as a new grad?",
        answer:
          "Lead with clinical rotations, your capstone, and specific skills you practiced. Name the unit you're targeting and why. New-grad managers expect less experience but look hard for genuine interest in their specialty.",
      },
    ],
  },
  {
    slug: "project-manager",
    role: "Project Manager",
    metaDescription:
      "Free AI cover letter generator for project managers. Create a results-focused, ATS-friendly PM cover letter in seconds — no signup.",
    intro:
      "A project manager cover letter is itself a test of communication: can you frame a story around outcomes, constraints, and stakeholders? Hiring managers look for delivery evidence — on time, on budget, aligned teams — not a recitation of methodologies. This tool builds a letter around the results you drove.",
    keySkills: [
      "On-time, on-budget delivery with real numbers",
      "Stakeholder and cross-functional coordination",
      "Methodology fit (Agile, Scrum, waterfall) to the role",
      "Risk management and scope control",
    ],
    sampleOpening:
      "I delivered a $2M platform migration three weeks early by renegotiating scope with five stakeholder teams — the kind of delivery discipline your PMO is hiring for.",
    commonMistakes: [
      "Listing certifications (PMP, CSM) without delivery results",
      "Vague claims like 'managed multiple projects' with no scale",
      "No mention of stakeholders or cross-team work",
      "Naming a methodology the job posting doesn't use",
    ],
    faqs: [
      {
        question: "Should I mention my PMP or Scrum certification?",
        answer:
          "Mention it once, then immediately back it with a delivered result. A certification opens the door; evidence of shipping projects on time and on budget is what gets the interview.",
      },
      {
        question: "How do I show project impact without breaking confidentiality?",
        answer:
          "Use ranges and relative figures — 'a multi-million-dollar migration' or 'cut delivery time by 20%.' You can show scale and impact without disclosing protected client or budget details.",
      },
    ],
  },
  {
    slug: "marketing-manager",
    role: "Marketing Manager",
    metaDescription:
      "Free AI cover letter generator for marketing managers. Create a metrics-driven, ATS-friendly marketing cover letter in seconds.",
    intro:
      "A marketing manager cover letter is a sample of your marketing. If it can't tell a sharp, benefit-led story about you, why would a hiring manager trust you with their brand? They look for campaign results, channel expertise, and a point of view. This tool drafts a letter anchored in the numbers you moved.",
    keySkills: [
      "Campaign results with real metrics (CAC, ROAS, conversion)",
      "Channel depth (paid, lifecycle, content, SEO)",
      "Budget ownership and team leadership",
      "Brand and positioning judgment",
    ],
    sampleOpening:
      "I grew organic signups 140% in eight months by rebuilding our content-to-trial funnel — the kind of full-funnel growth work your team is scaling toward.",
    commonMistakes: [
      "Talking about 'passion for brands' instead of results",
      "No metrics — marketing managers are judged on numbers",
      "Listing every channel instead of your strongest one",
      "Ignoring the company's actual product or market",
    ],
    faqs: [
      {
        question: "What metrics should a marketing manager cover letter include?",
        answer:
          "Pick two or three that map to the role: growth rate, CAC or ROAS, conversion lift, or revenue influenced. Specific numbers beat adjectives every time in a marketing hire.",
      },
      {
        question: "How do I stand out if my results were team efforts?",
        answer:
          "Name your specific contribution — 'I owned the paid channel that drove 60% of signups.' Managers expect team results; they want to know exactly what you drove within them.",
      },
    ],
  },
  {
    slug: "accountant",
    role: "Accountant",
    metaDescription:
      "Free AI cover letter generator for accountants. Create a precise, ATS-friendly accounting cover letter in seconds — no signup required.",
    intro:
      "An accountant's cover letter should signal exactly what a finance hire needs: accuracy, integrity, and relevant systems experience. Hiring managers scan for your specialty (audit, tax, AP/AR), your software, and your credentials. This tool drafts a clean, precise letter that mirrors the profession's standards.",
    keySkills: [
      "Specialty (tax, audit, financial reporting, AP/AR)",
      "Software fluency (QuickBooks, SAP, NetSuite, Excel)",
      "Credentials (CPA, CMA, or progress toward them)",
      "Accuracy and compliance track record",
    ],
    sampleOpening:
      "I closed monthly books for a $40M business in five days instead of ten by automating three reconciliation workflows — the efficiency I'd bring to your finance team.",
    commonMistakes: [
      "Not naming your accounting specialty",
      "Leaving out the software the job posting requires",
      "Vague 'detail-oriented' claims with no proof",
      "Typos or number errors — fatal in this field",
    ],
    faqs: [
      {
        question: "Should I mention my CPA status in the cover letter?",
        answer:
          "Yes. State whether you're a licensed CPA, a candidate, or working toward eligibility. Many accounting roles filter on it, so make it easy to find in the first paragraph.",
      },
      {
        question: "How important is accounting software experience in the letter?",
        answer:
          "Very. Name the specific systems from the job posting you've used. A tax role wanting NetSuite experience will screen for it, so mirror the posting's exact tools.",
      },
    ],
  },
  {
    slug: "data-analyst",
    role: "Data Analyst",
    metaDescription:
      "Free AI cover letter generator for data analysts. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A data analyst cover letter should prove you turn data into decisions, not just dashboards. Hiring managers want to see the business question you answered and what changed because of it. This tool drafts a tailored letter that leads with impact so your SQL and visualization skills land in context.",
    keySkills: [
      "Translating messy data into a clear recommendation",
      "SQL, Excel, and a BI tool the posting names",
      "Communicating findings to non-technical stakeholders",
      "A decision or dollar figure your analysis moved",
    ],
    sampleOpening:
      "My cohort analysis flagged a churn spike in month-two users, and the retention fix it prompted recovered an estimated $180K in annual revenue.",
    commonMistakes: [
      "Listing tools without a single result they produced",
      "Describing dashboards you built but not decisions they drove",
      "Ignoring the stakeholder communication side of the role",
      "No mention of the specific domain (finance, product, marketing)",
    ],
    faqs: [
      {
        question: "Should I quantify results in a data analyst cover letter?",
        answer:
          "Always. This is the one role where numbers are expected. Lead with a metric you moved — revenue, retention, hours saved — and name the analysis that got you there.",
      },
      {
        question: "Which tools should I mention?",
        answer:
          "Mirror the job posting. If it asks for SQL, Tableau, and Python, name your real experience with each. Don't pad with tools you've barely touched — interviewers probe them.",
      },
    ],
  },
  {
    slug: "customer-service-representative",
    role: "Customer Service Representative",
    metaDescription:
      "Free AI cover letter generator for customer service reps. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A customer service cover letter should show you stay calm under pressure and solve problems people actually feel. Hiring managers look for empathy, reliability, and a track record of turning frustrated customers into loyal ones. This tool drafts a letter that puts those human skills front and center.",
    keySkills: [
      "De-escalating upset customers with patience",
      "Hitting response-time and satisfaction (CSAT) targets",
      "Knowing the product well enough to solve, not deflect",
      "Reliability across shifts and high-volume periods",
    ],
    sampleOpening:
      "I held a 96% CSAT score across 60+ daily tickets by treating every frustrated customer as a problem to solve, not a call to end.",
    commonMistakes: [
      "Claiming to be a 'people person' without proof",
      "No metrics (CSAT, resolution time, ticket volume)",
      "Ignoring the specific channel — phone, chat, or email",
      "Overlooking product knowledge as a core skill",
    ],
    faqs: [
      {
        question: "What if I don't have formal customer service experience?",
        answer:
          "Draw from any role where you handled people under pressure — retail, hospitality, volunteering. The skills transfer, and a specific story of calming a tense situation carries real weight.",
      },
      {
        question: "Should I mention specific metrics?",
        answer:
          "Yes, if you have them. CSAT scores, average resolution time, or ticket volume make you concrete. No numbers? Describe a specific save — a customer you kept from cancelling.",
      },
    ],
  },
  {
    slug: "sales-representative",
    role: "Sales Representative",
    metaDescription:
      "Free AI cover letter generator for sales representatives. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A sales cover letter is itself a sales pitch — if you can't sell yourself in three paragraphs, why would they trust you with their pipeline? Hiring managers scan for quota attainment, deal size, and hunger. This tool drafts a letter that leads with numbers and closes with confidence.",
    keySkills: [
      "Quota attainment (% of target, ranking on the team)",
      "Deal size and sales cycle you're used to",
      "Prospecting and pipeline-building, not just closing",
      "CRM discipline and the specific tools they use",
    ],
    sampleOpening:
      "I closed 127% of my $1.2M annual quota last year by rebuilding a cold outbound motion that doubled qualified pipeline in two quarters.",
    commonMistakes: [
      "No numbers — the fastest way to get screened out in sales",
      "Focusing on activity ('made 100 calls') over results",
      "Generic enthusiasm instead of a track record",
      "Not researching what the company actually sells",
    ],
    faqs: [
      {
        question: "What numbers matter most in a sales cover letter?",
        answer:
          "Quota attainment as a percentage, deal size, and ranking on your team. 'Hit 130% of quota, top 3 of 40 reps' tells a hiring manager everything in one line.",
      },
      {
        question: "How do I write a sales cover letter with no closed deals yet?",
        answer:
          "Lead with the activity metrics and learning velocity: calls made, meetings booked, ramp speed. Show the raw drive and coachability that predict a strong closer.",
      },
    ],
  },
  {
    slug: "teacher",
    role: "Teacher",
    metaDescription:
      "Free AI cover letter generator for teachers. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A teacher cover letter should show your classroom philosophy in action, not just state it. Principals and hiring committees look for evidence you can manage a room, reach different learners, and fit the school's culture. This tool drafts a letter that pairs your teaching approach with concrete classroom results.",
    keySkills: [
      "Classroom management and student engagement",
      "Differentiated instruction for varied learners",
      "Measurable student growth (test scores, milestones)",
      "Grade level, subject, and certification specifics",
    ],
    sampleOpening:
      "By restructuring my third-grade reading blocks around small-group instruction, I moved 80% of below-level readers to grade level within one school year.",
    commonMistakes: [
      "Stating a teaching philosophy with no classroom example",
      "Ignoring the specific school's mission or community",
      "Omitting certifications, grade levels, or subjects",
      "No evidence of student outcomes or growth",
    ],
    faqs: [
      {
        question: "Should I mention the specific school in my teacher cover letter?",
        answer:
          "Yes. Reference the school's mission, a program you'd contribute to, or its community. Committees can tell a mass-mailed letter from one written for their school, and it matters.",
      },
      {
        question: "How do I show student outcomes without standardized test data?",
        answer:
          "Use any concrete growth: reading levels, project completion, behavior improvements, a struggling student you reached. Specific classroom stories are as persuasive as scores.",
      },
    ],
  },
  {
    slug: "graphic-designer",
    role: "Graphic Designer",
    metaDescription:
      "Free AI cover letter generator for graphic designers. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A graphic designer cover letter should point to your portfolio and explain the thinking behind the work. Hiring managers want to see that you solve business problems with design, not just make things pretty. This tool drafts a letter that frames your creative work in terms of results.",
    keySkills: [
      "A portfolio link with work relevant to their industry",
      "Design thinking — the problem behind each project",
      "Tool fluency (Figma, Adobe CC) the posting names",
      "Collaboration with marketing, product, or clients",
    ],
    sampleOpening:
      "My rebrand of a struggling DTC skincare line lifted their add-to-cart rate 34% — design work that moved the business, not just the aesthetic.",
    commonMistakes: [
      "Forgetting to include a portfolio link",
      "Describing visuals instead of the problem they solved",
      "Listing software without showing applied results",
      "A visually plain letter for a visual role (still keep it ATS-clean)",
    ],
    faqs: [
      {
        question: "Do I still need a cover letter if I have a portfolio?",
        answer:
          "Yes. The portfolio shows what you made; the letter explains why it worked and how you think. Together they're far stronger than a link alone — the letter frames the work.",
      },
      {
        question: "Should my cover letter be visually designed?",
        answer:
          "Keep the submitted file ATS-clean and text-based so it parses. Show your visual skill in the portfolio. A heavily designed letter often breaks in applicant tracking systems.",
      },
    ],
  },
  {
    slug: "human-resources-specialist",
    role: "Human Resources Specialist",
    metaDescription:
      "Free AI cover letter generator for HR specialists. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "An HR cover letter is read by people who read cover letters for a living — so it has to be sharp. Hiring managers look for discretion, process knowledge, and the ability to balance employee advocacy with business needs. This tool drafts a letter that signals both people skills and operational rigor.",
    keySkills: [
      "Full-cycle recruiting or a specialty (benefits, ER, L&D)",
      "HRIS systems and compliance knowledge",
      "Balancing employee advocacy with business needs",
      "Metrics like time-to-fill or retention improvements",
    ],
    sampleOpening:
      "I cut our average time-to-fill from 52 to 31 days by rebuilding the intake process with hiring managers — without sacrificing candidate quality.",
    commonMistakes: [
      "Vague 'passionate about people' language with no substance",
      "Not specifying your HR specialty or generalist scope",
      "Ignoring compliance and systems experience",
      "No metrics in a role that increasingly runs on them",
    ],
    faqs: [
      {
        question: "How formal should an HR cover letter be?",
        answer:
          "Professional but human — you're demonstrating the exact communication tone you'd use with employees. Polished and warm beats stiff. HR readers judge your writing closely.",
      },
      {
        question: "Should I mention specific HR software?",
        answer:
          "Yes. Name the HRIS and ATS platforms you've used (Workday, BamboHR, Greenhouse). Systems fluency is a real screening factor and signals you can ramp quickly.",
      },
    ],
  },
  {
    slug: "business-analyst",
    role: "Business Analyst",
    metaDescription:
      "Free AI cover letter generator for business analysts. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A business analyst cover letter should show you bridge the gap between business needs and technical solutions. Hiring managers look for requirements-gathering skill, stakeholder management, and process improvements that stuck. This tool drafts a letter framed around the problems you solved.",
    keySkills: [
      "Requirements gathering and clear documentation",
      "Translating between business and technical teams",
      "Process improvement with measurable outcomes",
      "Tools the posting names (SQL, Jira, Visio, Tableau)",
    ],
    sampleOpening:
      "By mapping and redesigning our order-to-cash workflow, I eliminated a manual handoff that had been costing the team 15 hours a week.",
    commonMistakes: [
      "Confusing the BA role with pure data analysis or PM work",
      "No example of a process you actually improved",
      "Skipping stakeholder management as a core skill",
      "Vague about which methodologies and tools you know",
    ],
    faqs: [
      {
        question: "How is a business analyst cover letter different from a data analyst one?",
        answer:
          "A BA letter emphasizes requirements, stakeholders, and process change; a data analyst letter emphasizes analysis and insight. Lead with the side that matches the posting's focus.",
      },
      {
        question: "Should I mention specific methodologies?",
        answer:
          "Yes, if the posting does. Agile, Waterfall, Six Sigma — name what you've genuinely used and tie it to a result, not just a certification line.",
      },
    ],
  },
  {
    slug: "operations-manager",
    role: "Operations Manager",
    metaDescription:
      "Free AI cover letter generator for operations managers. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "An operations manager cover letter should prove you make things run better, cheaper, and faster without breaking the team. Hiring managers look for efficiency gains, people leadership, and calm under operational pressure. This tool drafts a letter built around the systems and results you own.",
    keySkills: [
      "Efficiency and cost-reduction with real numbers",
      "Leading and scaling teams",
      "Process and supply-chain or service-delivery improvements",
      "Balancing quality, cost, and speed",
    ],
    sampleOpening:
      "I restructured our fulfillment operation to cut order processing time 40% while holding a 99.2% accuracy rate across a team of 24.",
    commonMistakes: [
      "Describing responsibilities instead of improvements made",
      "No numbers on cost, time, or quality",
      "Ignoring the people-leadership side of operations",
      "Not tailoring to the industry (retail vs. manufacturing vs. SaaS)",
    ],
    faqs: [
      {
        question: "What metrics matter most for an operations manager?",
        answer:
          "Cost savings, efficiency gains, error/defect reduction, and team size managed. A line like 'cut costs 18% while scaling the team from 8 to 20' lands immediately.",
      },
      {
        question: "How do I show leadership in the letter?",
        answer:
          "Name the size of teams you've led and a specific outcome you drove through them. Operations is a people role as much as a process one, and managers screen for both.",
      },
    ],
  },
  {
    slug: "administrative-assistant",
    role: "Administrative Assistant",
    metaDescription:
      "Free AI cover letter generator for administrative assistants. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "An administrative assistant cover letter should show you're the reliable operational backbone an office runs on. Hiring managers look for organization, discretion, and the ability to juggle competing priorities without dropping anything. This tool drafts a letter that highlights exactly those strengths.",
    keySkills: [
      "Calendar, travel, and inbox management for executives",
      "Juggling competing priorities and deadlines",
      "Discretion with confidential information",
      "Software fluency (Outlook, Google Workspace, Slack)",
    ],
    sampleOpening:
      "I managed calendars and travel for three executives across time zones while cutting our expense-report turnaround from a week to two days.",
    commonMistakes: [
      "Underselling the role as 'just admin' instead of showing impact",
      "No examples of the tools or systems you master",
      "Missing organization and reliability as core themes",
      "Generic letter that ignores the specific office's needs",
    ],
    faqs: [
      {
        question: "How do I make an administrative assistant cover letter stand out?",
        answer:
          "Lead with a specific save — a system you streamlined, a chaotic calendar you tamed. Concrete reliability beats adjectives like 'detail-oriented' every time.",
      },
      {
        question: "Which skills should I emphasize?",
        answer:
          "Mirror the posting: if it stresses executive support, lead with that; if it's front-desk and scheduling, lead there. Name the exact software tools they list.",
      },
    ],
  },
];

/** Look up a single role by its URL slug. */
export function getCoverLetterRole(slug: string): CoverLetterRole | undefined {
  return coverLetterRoles.find((r) => r.slug === slug);
}

/** All slugs — used by generateStaticParams to prerender one page per role. */
export function getCoverLetterRoleSlugs(): string[] {
  return coverLetterRoles.map((r) => r.slug);
}

/** A few sibling roles for internal linking (excludes the current one). */
export function getRelatedCoverLetterRoles(
  currentSlug: string,
  count = 4,
): CoverLetterRole[] {
  return coverLetterRoles.filter((r) => r.slug !== currentSlug).slice(0, count);
}
