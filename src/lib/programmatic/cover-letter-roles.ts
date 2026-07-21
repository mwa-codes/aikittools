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
  {
    slug: "data-scientist",
    role: "Data Scientist",
    metaDescription:
      "Free AI cover letter generator for data scientists. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A data scientist cover letter has to prove you connect models to business outcomes, not just accuracy scores. Hiring managers want to see the problem you framed, the approach you chose, and the decision your work changed. This tool drafts a letter that leads with impact so your technical depth lands in context.",
    keySkills: [
      "Framing a business problem before reaching for a model",
      "The stack the posting names (Python, SQL, PyTorch, dbt)",
      "Moving a metric — revenue, churn, forecast accuracy",
      "Communicating results to non-technical decision-makers",
    ],
    sampleOpening:
      "My demand-forecasting model cut overstock 23% in its first quarter, freeing roughly $400K in working capital — the kind of applied ML I'd bring to your supply-chain team.",
    commonMistakes: [
      "Listing algorithms instead of the decisions they drove",
      "No mention of how the model reached production",
      "Ignoring the stakeholder-communication half of the job",
      "Treating it as a research CV rather than a business case",
    ],
    faqs: [
      {
        question: "Should a data scientist cover letter mention specific models?",
        answer:
          "Only in service of a result. 'Built a gradient-boosted churn model that recovered $1.2M in retained revenue' works; a list of algorithms with no outcome reads like a syllabus.",
      },
      {
        question: "How do I show impact if my work was research or exploratory?",
        answer:
          "Frame the insight and what it enabled — a decision reversed, a hypothesis killed early, a roadmap redirected. Exploratory work still changes what a team does next; name that.",
      },
    ],
  },
  {
    slug: "product-manager",
    role: "Product Manager",
    metaDescription:
      "Free AI cover letter generator for product managers. Create an outcome-driven, ATS-friendly PM cover letter in seconds — no signup.",
    intro:
      "A product manager cover letter is a test of the core PM skill: telling a crisp story about a problem, the bet you made, and the outcome. Hiring managers look for user empathy, prioritization judgment, and shipped results — not a feature list. This tool drafts a letter built around the products you moved.",
    keySkills: [
      "Owning an outcome metric (activation, retention, revenue)",
      "Prioritization and saying no under real constraints",
      "Working across engineering, design, and data",
      "Discovery — talking to users, not just stakeholders",
    ],
    sampleOpening:
      "I rebuilt our onboarding flow around a single activation metric and lifted week-one retention from 34% to 51% in two quarters — the outcome focus I'd bring to your growth team.",
    commonMistakes: [
      "Listing features shipped instead of outcomes moved",
      "No evidence of prioritization or trade-off decisions",
      "Sounding like a project manager, not a product owner",
      "Ignoring the specific product you'd be working on",
    ],
    faqs: [
      {
        question: "What's the difference between a PM and project manager cover letter?",
        answer:
          "A PM letter emphasizes outcomes, user problems, and product bets; a project manager letter emphasizes delivery, timelines, and coordination. Lead with the side the posting actually hires for.",
      },
      {
        question: "How do I write a PM cover letter without a traditional PM title?",
        answer:
          "Show the PM work you already do — defining a problem, aligning a team, shipping something users adopted. Founders, engineers, and analysts all have product stories; frame yours around outcomes.",
      },
    ],
  },
  {
    slug: "ux-designer",
    role: "UX Designer",
    metaDescription:
      "Free AI cover letter generator for UX designers. Create a portfolio-backed, ATS-friendly UX cover letter in seconds — no signup required.",
    intro:
      "A UX designer cover letter should point to your portfolio and explain the thinking the case studies can't fully show. Hiring managers want evidence you solve user problems and measure the result, not just polished screens. This tool drafts a letter that frames your design work around outcomes.",
    keySkills: [
      "A portfolio link with relevant, outcome-driven case studies",
      "Research-to-design process, not just visual craft",
      "Tools the posting names (Figma, prototyping, testing)",
      "Collaboration with product and engineering",
    ],
    sampleOpening:
      "My redesign of a checkout flow cut drop-off 28% after five rounds of usability testing — design decisions grounded in research, which is how I'd approach your product.",
    commonMistakes: [
      "Forgetting the portfolio link — the first thing they open",
      "Describing visuals instead of the user problem solved",
      "No mention of research or testing behind the work",
      "Treating UX and UI as interchangeable in the letter",
    ],
    faqs: [
      {
        question: "Do I need a cover letter if my portfolio is strong?",
        answer:
          "Yes. The portfolio shows the work; the letter shows how you think, why you made calls, and how you collaborate. Together they're far stronger than a link alone — the letter frames the case studies.",
      },
      {
        question: "Should I mention specific design tools?",
        answer:
          "Name the ones the posting lists that you genuinely use — Figma, prototyping, or research tools. But lead with process and outcomes; tools are table stakes, not the differentiator.",
      },
    ],
  },
  {
    slug: "devops-engineer",
    role: "DevOps Engineer",
    metaDescription:
      "Free AI cover letter generator for DevOps engineers. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A DevOps engineer cover letter should show you make software ship faster and more reliably. Hiring managers look for automation that removed toil, reliability wins, and fluency with their stack. This tool drafts a letter that leads with the operational outcomes you drove.",
    keySkills: [
      "CI/CD, IaC, and the cloud the posting names (AWS, GCP, Azure)",
      "Reliability wins — uptime, MTTR, incident reduction",
      "Automating away manual, error-prone toil",
      "Working with dev teams, not gatekeeping them",
    ],
    sampleOpening:
      "I cut our deploy time from 40 minutes to 6 by rebuilding the pipeline on containerized runners — and dropped failed deploys by 70% in the process.",
    commonMistakes: [
      "Listing tools without the reliability or speed gains they produced",
      "No numbers on uptime, deploy frequency, or MTTR",
      "Ignoring the collaboration side — DevOps is a culture, not a silo",
      "Naming a cloud or stack the posting doesn't use",
    ],
    faqs: [
      {
        question: "What metrics belong in a DevOps cover letter?",
        answer:
          "Deploy frequency, lead time for changes, MTTR, and uptime — the DORA metrics hiring managers recognize. Pair one or two with the automation that moved them.",
      },
      {
        question: "How do I show DevOps experience from a sysadmin or dev background?",
        answer:
          "Point to the automation and reliability work you already own — a pipeline you built, an on-call rotation you improved, infrastructure you codified. The mindset matters more than the title.",
      },
    ],
  },
  {
    slug: "web-developer",
    role: "Web Developer",
    metaDescription:
      "Free AI cover letter generator for web developers. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A web developer cover letter should connect the sites you built to the results they delivered — speed, conversions, accessibility. Hiring managers skim for shipped work and fluency with their stack, not a framework laundry list. This tool drafts a letter that puts your best work in context.",
    keySkills: [
      "Shipped, live sites — ideally with a link",
      "The stack the posting names (React, Next.js, TypeScript)",
      "Performance, accessibility, and Core Web Vitals wins",
      "Collaboration with designers and backend teams",
    ],
    sampleOpening:
      "I rebuilt a marketing site on Next.js and cut Largest Contentful Paint from 4.1s to 1.2s, lifting organic conversions 18% — the performance focus I'd bring to your front-end team.",
    commonMistakes: [
      "Listing every framework instead of linking real work",
      "No mention of performance, accessibility, or results",
      "Rewriting the resume in paragraph form",
      "Ignoring the specific product or stack in the posting",
    ],
    faqs: [
      {
        question: "Should I include portfolio or GitHub links in the letter?",
        answer:
          "Yes — one line with a link to live work or a strong GitHub profile is worth more than a paragraph of description. Make it easy to click through to something real.",
      },
      {
        question: "Front-end, back-end, or full-stack — how do I position myself?",
        answer:
          "Match the posting. If it's front-end heavy, lead with UI and performance work; if full-stack, show one strong example of each. Don't claim depth everywhere — pick your real strengths.",
      },
    ],
  },
  {
    slug: "it-support-specialist",
    role: "IT Support Specialist",
    metaDescription:
      "Free AI cover letter generator for IT support specialists. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "An IT support cover letter should show you fix problems fast and keep people productive without making them feel talked down to. Hiring managers look for troubleshooting range, ticket metrics, and patience. This tool drafts a letter that pairs technical skill with the people side of support.",
    keySkills: [
      "Troubleshooting across hardware, software, and networks",
      "Ticketing systems and resolution-time metrics",
      "Clear communication with non-technical users",
      "Certifications the posting names (CompTIA A+, ITIL)",
    ],
    sampleOpening:
      "I handled 40+ daily tickets at a 94% first-contact resolution rate while cutting average response time from 3 hours to 45 minutes across a 300-person office.",
    commonMistakes: [
      "Listing technologies without support outcomes",
      "No metrics on ticket volume or resolution time",
      "Ignoring the customer-service side of the role",
      "Leaving out relevant certifications the posting requests",
    ],
    faqs: [
      {
        question: "Should I list my IT certifications in the cover letter?",
        answer:
          "Yes — name active certs like CompTIA A+, Network+, or ITIL early if the posting asks for them. Many IT roles screen on certifications before reading anything else.",
      },
      {
        question: "How do I stand out for an entry-level IT support role?",
        answer:
          "Lead with a specific fix — a recurring issue you documented, a user you unblocked, a home lab you built. Concrete problem-solving beats 'passionate about technology' every time.",
      },
    ],
  },
  {
    slug: "medical-assistant",
    role: "Medical Assistant",
    metaDescription:
      "Free AI cover letter generator for medical assistants. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A medical assistant cover letter should show you keep a clinic running smoothly while making patients feel cared for. Hiring managers want to see clinical skills, EHR fluency, and a calm, organized presence. This tool drafts a letter that balances the clinical and administrative sides of the role.",
    keySkills: [
      "Clinical skills (vitals, injections, phlebotomy, EKG)",
      "EHR systems (Epic, Cerner) and scheduling",
      "Patient rooming, intake, and bedside manner",
      "Certification (CMA, RMA) and specialty setting",
    ],
    sampleOpening:
      "In a high-volume family practice, I roomed 30+ patients a day, kept our EHR documentation audit-ready, and became the go-to for calming anxious first-time patients.",
    commonMistakes: [
      "Not specifying clinical vs. administrative strengths",
      "Leaving out EHR systems and certification status",
      "Generic 'caring person' claims without a clinical example",
      "Ignoring the specialty (pediatrics, cardiology, urgent care)",
    ],
    faqs: [
      {
        question: "Should I mention my CMA or RMA certification?",
        answer:
          "Yes, early. State whether you're a certified (CMA, RMA) or registered medical assistant, plus any specialty skills. Clinics often screen on certification before scheduling an interview.",
      },
      {
        question: "How do I write a medical assistant cover letter as a new grad?",
        answer:
          "Lead with your externship, the clinical skills you practiced, and the EHR you trained on. Name the specialty you're targeting. New-grad hiring managers expect less experience but look for genuine fit.",
      },
    ],
  },
  {
    slug: "certified-nursing-assistant",
    role: "Certified Nursing Assistant",
    metaDescription:
      "Free AI cover letter generator for CNAs. Create a compassionate, ATS-friendly certified nursing assistant cover letter in seconds.",
    intro:
      "A CNA cover letter should show the heart and stamina the role demands — you're the person patients see most. Hiring managers look for compassion, reliability, and comfort with the physical realities of care. This tool drafts a letter that leads with the patient-first mindset units need.",
    keySkills: [
      "Direct patient care (ADLs, mobility, vitals, hygiene)",
      "Setting experience (long-term care, hospital, rehab)",
      "Reliability across demanding shifts",
      "Active CNA certification and any specialty training",
    ],
    sampleOpening:
      "Across two years in a 90-bed skilled nursing facility, I cared for up to 12 residents a shift, and families regularly asked for me by name because I never rushed their loved ones.",
    commonMistakes: [
      "Not naming the care setting you're experienced in",
      "Leaving out active CNA certification status",
      "Focusing on tasks instead of patient dignity and outcomes",
      "Ignoring the physical and shift demands the posting lists",
    ],
    faqs: [
      {
        question: "What should a CNA cover letter emphasize most?",
        answer:
          "Compassion backed by reliability. Managers assume the clinical basics; they hire for the person who shows up on time, handles the hard moments with dignity, and families trust.",
      },
      {
        question: "How do I write a CNA cover letter with no experience?",
        answer:
          "Lead with your clinical training, your certification, and any caregiving — even for family. Name the setting you want (long-term care, hospital) and why. Genuine motivation carries real weight here.",
      },
    ],
  },
  {
    slug: "pharmacy-technician",
    role: "Pharmacy Technician",
    metaDescription:
      "Free AI cover letter generator for pharmacy technicians. Create a precise, ATS-friendly pharmacy tech cover letter in seconds.",
    intro:
      "A pharmacy technician cover letter should signal accuracy, speed, and the customer-service side of the counter. Hiring managers look for prescription-processing volume, systems fluency, and a spotless attention to detail. This tool drafts a letter that mirrors the precision the role demands.",
    keySkills: [
      "Prescription filling accuracy and volume",
      "Pharmacy systems and insurance/claims processing",
      "Certification (PTCB/CPhT) and state registration",
      "Customer service at a busy counter",
    ],
    sampleOpening:
      "I processed 250+ prescriptions a day with a zero-error record over 18 months, while resolving insurance rejections that used to send patients away empty-handed.",
    commonMistakes: [
      "No mention of accuracy — the core of the job",
      "Leaving out PTCB certification or state registration",
      "Ignoring insurance and claims-processing experience",
      "Forgetting the retail customer-service dimension",
    ],
    faqs: [
      {
        question: "Should I mention my PTCB certification?",
        answer:
          "Yes, early. State your CPhT certification and state registration status. Retail and hospital pharmacies both screen on it, and it signals you can start with minimal ramp-up.",
      },
      {
        question: "Retail vs. hospital pharmacy — does the letter change?",
        answer:
          "Yes. For retail, emphasize volume, speed, and customer service; for hospital, emphasize accuracy, IV/compounding experience, and working with clinical staff. Mirror the setting in the posting.",
      },
    ],
  },
  {
    slug: "physical-therapist",
    role: "Physical Therapist",
    metaDescription:
      "Free AI cover letter generator for physical therapists. Create a tailored, ATS-friendly PT cover letter in seconds — no signup required.",
    intro:
      "A physical therapist cover letter should show clinical expertise and the ability to motivate patients through hard recoveries. Hiring managers look for your specialty, your outcomes, and your fit with their setting. This tool drafts a letter that leads with patient progress and clinical judgment.",
    keySkills: [
      "Specialty and setting (ortho, neuro, sports, geriatrics)",
      "Licensure (DPT, state license) and any certifications",
      "Measurable patient outcomes and functional gains",
      "Building rapport that keeps patients adherent",
    ],
    sampleOpening:
      "In an outpatient ortho clinic, I returned 90% of my post-op ACL patients to sport within their target timeline by pairing evidence-based protocols with plans they'd actually follow at home.",
    commonMistakes: [
      "Not naming your specialty or preferred setting",
      "Leaving out licensure and certification details",
      "Describing treatments instead of patient outcomes",
      "Ignoring the motivational, relationship side of PT",
    ],
    faqs: [
      {
        question: "Should I mention my DPT and licensure in the cover letter?",
        answer:
          "Yes. State your DPT, active state license, and any specialty certifications (OCS, SCS) early. Clinics screen on licensure and often on specialty fit before anything else.",
      },
      {
        question: "How do I show outcomes without breaking patient confidentiality?",
        answer:
          "Use aggregate results and functional milestones — 'returned 90% of post-op patients to full activity' — never patient-identifying details. Ranges and rates show impact while staying HIPAA-safe.",
      },
    ],
  },
  {
    slug: "dental-hygienist",
    role: "Dental Hygienist",
    metaDescription:
      "Free AI cover letter generator for dental hygienists. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A dental hygienist cover letter should show clinical skill and the gentle, trust-building manner that keeps patients coming back. Hiring managers look for licensure, clinical range, and a personality that fits their practice. This tool drafts a letter that pairs technical competence with chairside warmth.",
    keySkills: [
      "Clinical skills (scaling, root planing, x-rays, charting)",
      "Licensure (RDH) and local anesthesia certification",
      "Patient education and anxiety management",
      "Practice-management software and sterilization protocols",
    ],
    sampleOpening:
      "Over four years in a busy general practice, I built a loyal patient base by making even the most anxious patients comfortable — my recall retention ran well above the office average.",
    commonMistakes: [
      "Leaving out RDH licensure and certifications",
      "Not mentioning software or specific clinical procedures",
      "Ignoring the patient-relationship side of hygiene",
      "A generic letter that ignores the practice's style",
    ],
    faqs: [
      {
        question: "What should a dental hygienist cover letter lead with?",
        answer:
          "Licensure plus the chairside manner that retains patients. Practices assume clinical competence; they hire the hygienist patients request by name and who fits the team's culture.",
      },
      {
        question: "Should I mention specific dental software or procedures?",
        answer:
          "Yes — name the practice-management software (Dentrix, Eaglesoft) and any procedures the posting emphasizes. Familiarity signals a short ramp-up, which busy offices value.",
      },
    ],
  },
  {
    slug: "electrician",
    role: "Electrician",
    metaDescription:
      "Free AI cover letter generator for electricians. Create a tailored, ATS-friendly electrician cover letter in seconds — no signup required.",
    intro:
      "An electrician cover letter should prove you work safely, read code, and get the job done right the first time. Hiring managers look for your license level, the work you're experienced in, and a clean safety record. This tool drafts a letter that leads with the skills contractors actually screen for.",
    keySkills: [
      "License level (apprentice, journeyman, master)",
      "Work type (residential, commercial, industrial)",
      "Code knowledge (NEC) and safety record",
      "Blueprint reading and specific systems experience",
    ],
    sampleOpening:
      "As a licensed journeyman, I wired 40+ residential new-builds to NEC code with zero failed inspections last year and a clean safety record across every job site.",
    commonMistakes: [
      "Not stating your license level upfront",
      "Leaving out the type of electrical work you specialize in",
      "No mention of safety record or code compliance",
      "Generic letter that ignores the contractor's project type",
    ],
    faqs: [
      {
        question: "What should an electrician cover letter mention first?",
        answer:
          "Your license level and the type of work you do — residential, commercial, or industrial. Contractors screen on both immediately, so make them impossible to miss in the first line.",
      },
      {
        question: "Do electricians even need a cover letter?",
        answer:
          "A short one helps, especially for commercial and union roles. It's where you state your license, safety record, and availability — the exact things a hiring foreman wants before calling you in.",
      },
    ],
  },
  {
    slug: "hvac-technician",
    role: "HVAC Technician",
    metaDescription:
      "Free AI cover letter generator for HVAC technicians. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "An HVAC technician cover letter should show you diagnose fast, fix it right, and treat customers' homes with respect. Hiring managers look for certifications, the systems you know, and reliability during peak season. This tool drafts a letter that leads with the credentials and skills contractors screen for.",
    keySkills: [
      "EPA 608 certification and any NATE certification",
      "System experience (residential, commercial, refrigeration)",
      "Diagnostic speed and first-visit fix rate",
      "Customer service in people's homes",
    ],
    sampleOpening:
      "I ran 8–10 service calls a day through peak summer with a 92% first-visit resolution rate, and my customer reviews consistently mentioned how clean and respectful I left their homes.",
    commonMistakes: [
      "Leaving out EPA 608 or NATE certification",
      "Not specifying residential vs. commercial experience",
      "Ignoring the customer-service side of in-home work",
      "No mention of diagnostic skill or fix rate",
    ],
    faqs: [
      {
        question: "Which HVAC certifications should I mention?",
        answer:
          "Lead with EPA 608 (required to handle refrigerant) and NATE if you have it. Name any manufacturer-specific training the posting lists. Certifications are often the first screen.",
      },
      {
        question: "How do I stand out for an HVAC role?",
        answer:
          "Pair technical skill with reliability and customer manner. Contractors lose customers to techs who are late or messy — a clean record on both, plus a high first-visit fix rate, wins the interview.",
      },
    ],
  },
  {
    slug: "welder",
    role: "Welder",
    metaDescription:
      "Free AI cover letter generator for welders. Create a tailored, ATS-friendly welder cover letter in seconds — no signup required.",
    intro:
      "A welder cover letter should show your certifications, the processes you've mastered, and a record of passing inspection. Hiring managers look for the specific welds they need, your materials experience, and safety. This tool drafts a letter that leads with the qualifications shops actually screen for.",
    keySkills: [
      "Processes (MIG, TIG, stick, flux-core) and positions",
      "Certifications (AWS) and any code qualifications",
      "Materials and thicknesses you're experienced with",
      "Blueprint reading and weld-inspection pass rate",
    ],
    sampleOpening:
      "AWS-certified in TIG and MIG, I welded pressure-vessel components to spec with a 98% first-pass X-ray rate over two years in a high-tolerance fabrication shop.",
    commonMistakes: [
      "Not listing your specific processes and certifications",
      "Leaving out materials and positions you're qualified for",
      "No mention of inspection or X-ray pass rates",
      "Ignoring the code or spec the posting requires",
    ],
    faqs: [
      {
        question: "What should a welder cover letter list first?",
        answer:
          "Your certifications and processes — AWS certs, plus MIG/TIG/stick and the positions you're qualified in. Shops screen on exact capabilities, so put them in the opening line.",
      },
      {
        question: "How important is my weld pass rate?",
        answer:
          "Very. A high first-pass or X-ray rate tells a shop you save them rework and failed inspections. If you have the number, lead with it — it's the most credible signal of skill.",
      },
    ],
  },
  {
    slug: "truck-driver",
    role: "Truck Driver",
    metaDescription:
      "Free AI cover letter generator for truck drivers. Create a tailored, ATS-friendly CDL driver cover letter in seconds — no signup required.",
    intro:
      "A truck driver cover letter should show a clean record, the endorsements you hold, and the routes you can run. Carriers look for CDL class, safety history, and reliability. This tool drafts a letter that leads with the exact qualifications a recruiter needs to move you forward.",
    keySkills: [
      "CDL class (A/B) and endorsements (Hazmat, Tanker, Doubles)",
      "Clean driving record and safety history",
      "Route experience (OTR, regional, local, dedicated)",
      "On-time delivery and equipment care",
    ],
    sampleOpening:
      "With a Class A CDL, Hazmat and Tanker endorsements, and 300,000 accident-free miles, I've run OTR routes with a 99% on-time delivery record and zero DOT violations.",
    commonMistakes: [
      "Not stating CDL class and endorsements upfront",
      "Leaving out your safety record and miles driven",
      "Ignoring the route type the carrier is hiring for",
      "No mention of on-time delivery or equipment care",
    ],
    faqs: [
      {
        question: "What should a truck driver cover letter mention first?",
        answer:
          "Your CDL class, endorsements, and safety record. Recruiters screen on exactly these, so put your Class A/B, Hazmat/Tanker endorsements, and accident-free miles in the opening line.",
      },
      {
        question: "How do I write a driver cover letter as a new CDL holder?",
        answer:
          "Lead with your fresh CDL, endorsements, and clean record, then emphasize reliability and willingness to run the routes they need. Many carriers hire new grads — show them you're safe and dependable.",
      },
    ],
  },
  {
    slug: "financial-analyst",
    role: "Financial Analyst",
    metaDescription:
      "Free AI cover letter generator for financial analysts. Create a metrics-driven, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A financial analyst cover letter should show you turn numbers into decisions leadership acts on. Hiring managers look for modeling skill, business judgment, and a recommendation that changed something. This tool drafts a letter that leads with the impact behind your analysis.",
    keySkills: [
      "Financial modeling, forecasting, and variance analysis",
      "Excel depth plus tools the posting names (SQL, Tableau)",
      "A recommendation that influenced a real decision",
      "Communicating to non-finance stakeholders",
    ],
    sampleOpening:
      "My margin analysis of our product lines flagged a pricing gap that, once corrected, added an estimated $1.4M in annual gross profit — the decision-focused analysis I'd bring to your FP&A team.",
    commonMistakes: [
      "Describing models built without the decisions they drove",
      "No numbers in a role that runs entirely on them",
      "Ignoring the communication side of the analyst job",
      "Vague about the tools and modeling you actually use",
    ],
    faqs: [
      {
        question: "What should a financial analyst cover letter emphasize?",
        answer:
          "A specific analysis that changed a decision, with the dollar impact. Hiring managers want an analyst whose work leadership acts on — not just clean models, but models that moved the business.",
      },
      {
        question: "How technical should it be?",
        answer:
          "Name your modeling and tools (Excel, SQL, the ERP or BI platform), but keep the story readable for a non-finance first reader. Lead with impact, then show the rigor behind it.",
      },
    ],
  },
  {
    slug: "executive-assistant",
    role: "Executive Assistant",
    metaDescription:
      "Free AI cover letter generator for executive assistants. Create a tailored, ATS-friendly EA cover letter in seconds — no signup required.",
    intro:
      "An executive assistant cover letter should show you make a leader more effective and handle chaos without dropping anything. Hiring managers look for discretion, judgment, and the ability to run point on complex logistics. This tool drafts a letter that signals you're the operational right hand they need.",
    keySkills: [
      "Complex calendar, travel, and inbox management for executives",
      "Discretion with highly confidential information",
      "Anticipating needs and making judgment calls independently",
      "Coordinating across teams, boards, and outside partners",
    ],
    sampleOpening:
      "I ran point for a CEO across three time zones — from board prep to last-minute travel changes — and became the person the whole leadership team came to when something had to get done right.",
    commonMistakes: [
      "Underselling the role as scheduling instead of leadership support",
      "No examples of judgment calls made independently",
      "Missing discretion and confidentiality as core themes",
      "Generic letter that ignores the specific executive's needs",
    ],
    faqs: [
      {
        question: "How is an EA cover letter different from an admin assistant one?",
        answer:
          "An EA letter emphasizes judgment, discretion, and directly enabling a leader; an admin letter emphasizes office operations broadly. Lead with the high-trust, executive-support side for EA roles.",
      },
      {
        question: "What makes an executive assistant cover letter stand out?",
        answer:
          "A specific moment you saved an executive's day — a trip you salvaged, a conflict you defused, a project you quietly drove. Concrete judgment beats 'highly organized' every time.",
      },
    ],
  },
  {
    slug: "recruiter",
    role: "Recruiter",
    metaDescription:
      "Free AI cover letter generator for recruiters. Create a results-driven, ATS-friendly recruiter cover letter in seconds — no signup required.",
    intro:
      "A recruiter cover letter is a demonstration of your craft — you write persuasive outreach for a living, so this letter has to sell. Hiring managers look for pipeline results, time-to-fill, and quality of hire. This tool drafts a letter that leads with the metrics talent teams care about.",
    keySkills: [
      "Full-cycle recruiting or a specialty (tech, exec, high-volume)",
      "Metrics: time-to-fill, offer-accept rate, quality of hire",
      "Sourcing skill and candidate-experience focus",
      "ATS and sourcing tools the posting names",
    ],
    sampleOpening:
      "I filled 45 technical roles last year at a 31-day average time-to-fill and an 88% offer-accept rate by rebuilding our sourcing and candidate-experience process from first touch to close.",
    commonMistakes: [
      "No recruiting metrics in a metrics-heavy field",
      "Focusing on activity ('screened lots of resumes') over results",
      "Ignoring candidate experience as a core skill",
      "A generic letter — ironic for someone who screens them",
    ],
    faqs: [
      {
        question: "What metrics should a recruiter cover letter include?",
        answer:
          "Time-to-fill, offer-accept rate, quality of hire, and volume of roles closed. 'Filled 45 roles at a 31-day average' tells a talent leader more than any adjective could.",
      },
      {
        question: "How do I write a recruiter cover letter switching specialties?",
        answer:
          "Show that your process transfers — sourcing, screening, and closing work across domains. Name what you'd ramp on (the new function's skills) and lead with your strongest fill metrics.",
      },
    ],
  },
  {
    slug: "account-manager",
    role: "Account Manager",
    metaDescription:
      "Free AI cover letter generator for account managers. Create a relationship-driven, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "An account manager cover letter should show you grow and keep revenue by making clients successful. Hiring managers look for retention, upsell, and the relationship skill that renews contracts. This tool drafts a letter that leads with the book of business you protected and grew.",
    keySkills: [
      "Retention and renewal rates on your accounts",
      "Upsell and expansion revenue you drove",
      "Relationship-building with multiple stakeholders",
      "CRM discipline and the tools the posting names",
    ],
    sampleOpening:
      "I grew my book from $2.1M to $3.4M in 18 months while holding 96% net revenue retention — expansion that came from making clients successful, not pushing product.",
    commonMistakes: [
      "No numbers on retention, renewal, or expansion",
      "Confusing account management with pure sales hunting",
      "Ignoring the multi-stakeholder relationship skill",
      "Not researching the company's product or client base",
    ],
    faqs: [
      {
        question: "What metrics matter most for an account manager?",
        answer:
          "Net revenue retention, renewal rate, and expansion/upsell revenue. A line like 'held 96% NRR while growing the book 60%' shows you both keep and grow accounts.",
      },
      {
        question: "How is an account manager letter different from a sales one?",
        answer:
          "A sales letter emphasizes hunting and closing new business; an account manager letter emphasizes retaining and expanding existing clients. Lead with relationships and retention for AM roles.",
      },
    ],
  },
  {
    slug: "bookkeeper",
    role: "Bookkeeper",
    metaDescription:
      "Free AI cover letter generator for bookkeepers. Create a precise, ATS-friendly bookkeeper cover letter in seconds — no signup required.",
    intro:
      "A bookkeeper cover letter should signal accuracy, organization, and the software fluency small businesses depend on. Hiring managers look for clean books, reconciliation skill, and trustworthiness with their finances. This tool drafts a letter that mirrors the precision the role requires.",
    keySkills: [
      "Software fluency (QuickBooks, Xero, Excel)",
      "AP/AR, reconciliation, and month-end close",
      "Payroll and sales-tax filing experience",
      "Accuracy and confidentiality with financial data",
    ],
    sampleOpening:
      "I keep clean, audit-ready books for a dozen small-business clients, closing each month within five days and catching reconciliation errors before they ever reached a tax return.",
    commonMistakes: [
      "Not naming the accounting software the posting uses",
      "Vague 'detail-oriented' claims with no proof",
      "Leaving out AP/AR, payroll, or close experience",
      "Typos or number errors — disqualifying in this role",
    ],
    faqs: [
      {
        question: "What software should a bookkeeper cover letter mention?",
        answer:
          "Name the exact platform the posting uses — usually QuickBooks or Xero — plus Excel. Software fluency is a primary screen for bookkeeping roles, so make it easy to spot.",
      },
      {
        question: "How do I show accuracy in a bookkeeper cover letter?",
        answer:
          "Give a concrete example — a clean audit, a close you shortened, an error you caught. Specific proof of precision beats the word 'meticulous,' which every applicant claims.",
      },
    ],
  },
  {
    slug: "retail-sales-associate",
    role: "Retail Sales Associate",
    metaDescription:
      "Free AI cover letter generator for retail sales associates. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A retail sales associate cover letter should show you sell, serve, and keep the floor running through a rush. Hiring managers look for customer service, sales numbers, and reliability. This tool drafts a letter that turns everyday retail experience into a clear case for the hire.",
    keySkills: [
      "Customer service and upselling on the floor",
      "Sales metrics (per-hour sales, conversion, loyalty sign-ups)",
      "POS systems, inventory, and merchandising",
      "Reliability during peak hours and holiday rushes",
    ],
    sampleOpening:
      "I consistently ranked top-three in sales among 20 associates by turning browsers into buyers — and my loyalty-program sign-up rate was double the store average.",
    commonMistakes: [
      "Claiming to be a 'people person' with no sales proof",
      "No metrics on sales, conversion, or sign-ups",
      "Ignoring reliability and availability, which retail screens hard",
      "A generic letter that ignores the specific store or brand",
    ],
    faqs: [
      {
        question: "What if I don't have retail experience yet?",
        answer:
          "Draw on any role with customers or teamwork — food service, volunteering, school jobs. A specific story of helping someone or handling a rush shows the exact skills retail managers want.",
      },
      {
        question: "Should I mention sales numbers?",
        answer:
          "Yes, if you have them — sales rank, conversion, loyalty sign-ups, or upsell rate. Retail is measurable, and a concrete number sets you apart from applicants who only claim enthusiasm.",
      },
    ],
  },
  {
    slug: "server",
    role: "Server",
    metaDescription:
      "Free AI cover letter generator for restaurant servers. Create a tailored, ATS-friendly server cover letter in seconds — no signup required.",
    intro:
      "A server cover letter should show you deliver great hospitality and stay sharp under a full section. Hiring managers look for service skill, speed, and reliability on tough shifts. This tool drafts a letter that turns restaurant experience into a strong case for the hire.",
    keySkills: [
      "High-volume, multi-table service under pressure",
      "Upselling, wine/menu knowledge, and check averages",
      "POS systems and teamwork with kitchen and bar",
      "Reliability for nights, weekends, and holiday rushes",
    ],
    sampleOpening:
      "I handled a 6-table section during weekend rushes at a high-volume restaurant while keeping my check averages among the highest on the floor through genuine menu knowledge.",
    commonMistakes: [
      "Generic 'hard worker' claims with no service example",
      "Ignoring the specific restaurant's style (fine dining vs. casual)",
      "No mention of check averages, upselling, or volume",
      "Overlooking availability, which restaurants screen closely",
    ],
    faqs: [
      {
        question: "What should a server cover letter highlight?",
        answer:
          "Hospitality plus the ability to stay calm in the weeds. Managers hire servers who keep guests happy during a rush and don't call out on busy nights — show both with a specific story.",
      },
      {
        question: "How do I write a server cover letter with no experience?",
        answer:
          "Lead with any customer or fast-paced role, plus your genuine interest in hospitality and your availability. Restaurants train constantly; they hire for attitude, reliability, and a warm manner.",
      },
    ],
  },
  {
    slug: "warehouse-associate",
    role: "Warehouse Associate",
    metaDescription:
      "Free AI cover letter generator for warehouse associates. Create a tailored, ATS-friendly cover letter in seconds — no signup required.",
    intro:
      "A warehouse associate cover letter should show you're reliable, safe, and productive on the floor. Hiring managers look for equipment experience, a clean safety record, and the stamina to hit quota. This tool drafts a letter that leads with what warehouse supervisors actually screen for.",
    keySkills: [
      "Picking, packing, and order-fulfillment accuracy",
      "Equipment (forklift, pallet jack) and certifications",
      "Safety record and OSHA awareness",
      "Meeting productivity quotas and attendance reliability",
    ],
    sampleOpening:
      "I consistently exceeded my pick rate by 15% at a high-volume distribution center while maintaining 99.8% order accuracy and a spotless safety record across two years.",
    commonMistakes: [
      "No mention of productivity, accuracy, or safety numbers",
      "Leaving out equipment certifications like forklift",
      "Ignoring attendance and reliability, which warehouses prioritize",
      "A generic letter that ignores the shift or role type",
    ],
    faqs: [
      {
        question: "What should a warehouse cover letter emphasize?",
        answer:
          "Reliability, safety, and productivity. Supervisors hire associates who show up, hit their numbers, and don't cause accidents — a clean record on all three, with any equipment certs, wins.",
      },
      {
        question: "Do I need forklift certification in the letter?",
        answer:
          "If you have it, absolutely — name it, since many roles require or prefer it. If you don't, emphasize your reliability and willingness to get certified; many warehouses train on the job.",
      },
    ],
  },
  {
    slug: "social-media-manager",
    role: "Social Media Manager",
    metaDescription:
      "Free AI cover letter generator for social media managers. Create a metrics-driven, ATS-friendly cover letter in seconds — no signup.",
    intro:
      "A social media manager cover letter is a sample of your voice and strategy. Hiring managers look for growth numbers, content that performed, and a point of view on their brand. This tool drafts a letter anchored in the audiences you grew and the results you drove.",
    keySkills: [
      "Audience growth and engagement metrics per platform",
      "Content strategy, calendar, and community management",
      "Paid social and analytics tools the posting names",
      "A campaign or post that drove real business results",
    ],
    sampleOpening:
      "I grew a brand's TikTok from 4K to 120K followers in eight months, and the traffic it drove converted to a 30% lift in monthly signups — growth tied to revenue, not just vanity metrics.",
    commonMistakes: [
      "Follower counts with no business outcome attached",
      "No point of view on the brand's actual voice or audience",
      "Listing every platform instead of your strongest results",
      "Ignoring the analytics and paid side of the role",
    ],
    faqs: [
      {
        question: "What metrics should a social media manager cover letter include?",
        answer:
          "Growth rate, engagement, and — most important — a business result the social work drove (traffic, signups, sales). Tie the follower numbers to something the company actually cares about.",
      },
      {
        question: "Should I reference the company's own social accounts?",
        answer:
          "Yes — a sharp, specific observation about their current content and one idea to improve it shows initiative and strategic thinking, and sets you far apart from generic applicants.",
      },
    ],
  },
  {
    slug: "content-writer",
    role: "Content Writer",
    metaDescription:
      "Free AI cover letter generator for content writers. Create a tailored, ATS-friendly content writer cover letter in seconds — no signup.",
    intro:
      "A content writer cover letter is a live writing sample — if it's flat, no portfolio saves it. Hiring managers look for range, SEO awareness, and content that drove traffic or conversions. This tool drafts a letter that shows your voice and ties your writing to results.",
    keySkills: [
      "A portfolio with published, relevant clips",
      "SEO fundamentals and search-driven content",
      "Range across formats (blog, long-form, email, landing pages)",
      "Content that moved a metric — traffic, leads, rankings",
    ],
    sampleOpening:
      "A pillar guide I wrote and optimized reached the top three for its target keyword and now drives 12,000 organic visits a month — writing built to rank and convert, not just read well.",
    commonMistakes: [
      "A flat letter that doesn't showcase actual writing skill",
      "No portfolio link or published examples",
      "Ignoring SEO when the role is search-driven",
      "Describing topics written about instead of results driven",
    ],
    faqs: [
      {
        question: "Should a content writer cover letter show voice?",
        answer:
          "Absolutely — it's your best writing sample. A letter that's crisp, specific, and well-structured proves the skill directly. A generic one undercuts even a strong portfolio.",
      },
      {
        question: "How do I show results as a content writer?",
        answer:
          "Point to a piece that ranked, drove traffic, or generated leads, with the number. If your work is newer, show range and quality with your two strongest, most relevant clips.",
      },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    role: "Digital Marketing Specialist",
    metaDescription:
      "Free AI cover letter generator for digital marketing specialists. Create a metrics-driven, ATS-friendly cover letter in seconds.",
    intro:
      "A digital marketing specialist cover letter should prove you drive measurable results across channels. Hiring managers look for campaign performance, channel depth, and comfort with analytics. This tool drafts a letter anchored in the numbers you moved.",
    keySkills: [
      "Channel results (paid search, social, email, SEO)",
      "Metrics: CAC, ROAS, conversion rate, CTR",
      "Analytics and ad tools the posting names (GA4, Meta, Google Ads)",
      "A/B testing and campaign optimization",
    ],
    sampleOpening:
      "I cut our blended CAC by 34% in two quarters by reallocating spend toward the channels that actually converted and rebuilding our landing pages around a single tested offer.",
    commonMistakes: [
      "Talking about 'passion for marketing' instead of results",
      "No performance metrics in a numbers-driven role",
      "Listing every channel instead of your strongest one",
      "Ignoring the analytics and testing side of the work",
    ],
    faqs: [
      {
        question: "What metrics should a digital marketing cover letter include?",
        answer:
          "Pick two or three that map to the role — CAC, ROAS, conversion lift, or channel growth. Specific performance numbers beat adjectives every time in a marketing hire.",
      },
      {
        question: "Specialist or generalist — how should I position myself?",
        answer:
          "Mirror the posting. If it's channel-specific (paid, SEO, email), lead with that depth; if it's a generalist role, show one strong result in each core channel. Don't claim mastery everywhere.",
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

/**
 * A few sibling roles for internal linking (excludes the current one).
 *
 * Rotates the window based on the current role's position so link equity is
 * distributed across the whole set — not funneled into the first few roles the
 * way a plain `.slice(0, count)` would. Every page links onward to different
 * siblings, and wraps around the end of the list.
 */
export function getRelatedCoverLetterRoles(
  currentSlug: string,
  count = 4,
): CoverLetterRole[] {
  const others = coverLetterRoles.filter((r) => r.slug !== currentSlug);
  if (others.length <= count) return others;

  const index = coverLetterRoles.findIndex((r) => r.slug === currentSlug);
  const start = index < 0 ? 0 : index % others.length;

  // Take `count` roles starting at `start`, wrapping around the end.
  return Array.from(
    { length: count },
    (_, i) => others[(start + i) % others.length],
  );
}
