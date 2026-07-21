/**
 * Programmatic SEO data: "Interview Questions for [Role]" pages.
 *
 * Second programmatic flywheel — reuses the same role universe as the
 * cover-letter cluster (see cover-letter-roles.ts) but targets a different,
 * high-intent search query: "interview questions for <role>".
 *
 * Each entry is HAND-AUTHORED with genuinely unique content — not a keyword
 * find-replace. This is deliberate: Google penalizes "doorway pages" (batches
 * of near-identical pages), which would harm the whole domain. Quality per page
 * protects the existing ranked content.
 *
 * Adding a new role = append one entry here. No code changes needed; the route
 * and sitemap map over this array.
 *
 * NOTE: Slugs intentionally match the cover-letter cluster's slugs so the two
 * flywheels can cross-link cleanly (interview page ↔ cover-letter page for the
 * same role).
 */

export interface InterviewRole {
  /** URL segment: /interview-questions-for/<slug> */
  slug: string;
  /** Display role name, also prefilled into the generator. */
  role: string;
  /** Search-focused meta description (<160 chars). */
  metaDescription: string;
  /** Role-specific opening paragraph for the page. */
  intro: string;
  /** The themes interviewers probe for THIS role. */
  focusAreas: string[];
  /** A real, likely interview question for this role, with how to approach it. */
  sampleQuestion: { question: string; approach: string };
  /** Role-specific interview-prep mistakes to avoid. */
  commonMistakes: string[];
  /** 2 role-specific FAQs. */
  faqs: { question: string; answer: string }[];
}

export const interviewRoles: InterviewRole[] = [
  {
    slug: "software-engineer",
    role: "Software Engineer",
    metaDescription:
      "Free AI interview question generator for software engineers. Get likely coding, system-design, and behavioral questions with answer tips — no signup.",
    intro:
      "Software engineering interviews test far more than whether you can code. Interviewers are reading for how you break down an ambiguous problem, how you reason about trade-offs, and whether you can explain your thinking out loud. Prepare for a mix of coding, system design, and behavioral rounds — and practice narrating your approach, because a silent correct answer scores worse than a clearly-reasoned imperfect one.",
    focusAreas: [
      "Data structures, algorithms, and Big-O reasoning under time pressure",
      "System design and trade-offs (for mid/senior roles)",
      "Debugging and how you handle a failing test live",
      "Behavioral: ownership, collaboration, and a project you shipped",
    ],
    sampleQuestion: {
      question: "Tell me about a technically difficult bug you tracked down.",
      approach:
        "Use a clear arc: the symptom, how you isolated it, the root cause, and the fix — plus what you changed so it couldn't recur. Show your debugging method, not just that you got lucky.",
    },
    commonMistakes: [
      "Coding in silence instead of narrating your approach",
      "Jumping to code before clarifying the problem's constraints",
      "Memorizing solutions instead of practicing the reasoning",
      "No concrete story ready for the behavioral round",
    ],
    faqs: [
      {
        question: "How do I prepare for the coding round specifically?",
        answer:
          "Practice out loud and on a whiteboard or blank editor, not just in an IDE with autocomplete. Interviewers score your communication and problem decomposition as much as the final solution — talk through your approach before you type.",
      },
      {
        question: "What behavioral questions do software engineers get asked?",
        answer:
          "Expect questions about a hard bug, a disagreement with a teammate, a project you owned end to end, and a time you missed a deadline. Prepare two or three specific stories using the STAR framework — Situation, Task, Action, Result.",
      },
    ],
  },
  {
    slug: "registered-nurse",
    role: "Registered Nurse",
    metaDescription:
      "Free AI interview question generator for registered nurses. Get likely clinical, behavioral, and scenario questions with answer tips — no signup.",
    intro:
      "Nursing interviews blend clinical judgment with the human side of care. Managers want to know you can prioritize under pressure, communicate with families and physicians, and stay composed when a shift goes sideways. Expect scenario questions — 'what would you do if…' — where they're listening for patient safety, clear escalation, and calm decision-making, not a textbook recitation.",
    focusAreas: [
      "Clinical scenarios: prioritization, deterioration, and escalation",
      "Patient safety and how you handle a medication error",
      "Communication with families, physicians, and the care team",
      "Fit for the specific unit and shift (ICU, ER, med-surg, peds)",
    ],
    sampleQuestion: {
      question: "Tell me about a time you disagreed with a physician's order.",
      approach:
        "Show respectful advocacy: you raised a specific patient-safety concern, used the chain of command, and kept the patient's wellbeing central. Emphasize that you spoke up without making it a conflict.",
    },
    commonMistakes: [
      "Giving textbook answers instead of real clinical examples",
      "Not naming the specialty or unit you're interviewing for",
      "Downplaying a past error instead of showing what you learned",
      "Forgetting to mention how you communicate with the care team",
    ],
    faqs: [
      {
        question: "What scenario questions do nurse interviews include?",
        answer:
          "Expect 'what would you do if' prompts — a patient deteriorating, two patients needing you at once, a family member upset, a med error caught. Interviewers listen for prioritization, patient safety, and clear escalation up the chain of command.",
      },
      {
        question: "How do I prepare as a new-grad nurse?",
        answer:
          "Lead with your clinical rotations and a specific patient you cared for. Managers expect less experience but look hard for genuine interest in their specialty, teachability, and how you handle pressure. Have one calm-under-stress story ready.",
      },
    ],
  },
  {
    slug: "project-manager",
    role: "Project Manager",
    metaDescription:
      "Free AI interview question generator for project managers. Get likely delivery, stakeholder, and behavioral questions with answer tips — no signup.",
    intro:
      "Project manager interviews are a test of how you tell a delivery story. Interviewers probe how you handle slipping timelines, competing stakeholders, and scope creep — the situations where a PM actually earns their keep. They're less interested in which methodology you name and more in whether you can show judgment when a plan meets reality. Prepare stories where you drove an outcome despite constraints.",
    focusAreas: [
      "Handling a project that slipped or went over budget",
      "Stakeholder management and resolving competing priorities",
      "Scope creep, risk, and how you say no",
      "Methodology in practice (Agile, Scrum) tied to real delivery",
    ],
    sampleQuestion: {
      question: "Tell me about a project that was falling behind. What did you do?",
      approach:
        "Walk through diagnosis, the trade-offs you surfaced, the stakeholders you realigned, and the outcome with a number. Show you managed scope and expectations rather than just working the team harder.",
    },
    commonMistakes: [
      "Naming methodologies without a delivery story behind them",
      "Vague answers with no scale, budget, or timeline numbers",
      "Blaming the team or stakeholders for a failed project",
      "Ignoring the stakeholder-communication side of the role",
    ],
    faqs: [
      {
        question: "What's the most common project manager interview question?",
        answer:
          "Some version of 'tell me about a project that didn't go to plan.' Interviewers want to see how you diagnose problems, renegotiate scope, and communicate with stakeholders under pressure — not a story where everything went perfectly.",
      },
      {
        question: "Should I talk about methodologies like Agile or Scrum?",
        answer:
          "Mention them only in service of a real outcome. Saying you 'ran Agile ceremonies' means little; saying you 'used sprint planning to cut a slipping timeline back on track' shows judgment. Lead with delivery, back it with method.",
      },
    ],
  },
  {
    slug: "marketing-manager",
    role: "Marketing Manager",
    metaDescription:
      "Free AI interview question generator for marketing managers. Get likely strategy, metrics, and campaign questions with answer tips — no signup.",
    intro:
      "Marketing manager interviews probe whether you drive measurable results or just make things look good. Expect to walk through a campaign end to end — the goal, the budget, the channels, and the number you moved. Interviewers also test strategic judgment: how you'd prioritize channels, respond to a flat quarter, or defend a budget. Come with metrics and a point of view.",
    focusAreas: [
      "A campaign you owned, with the metrics it moved (CAC, ROAS, conversion)",
      "Channel strategy and how you prioritize a limited budget",
      "Responding to underperformance or a flat growth quarter",
      "Cross-functional work with sales, product, and leadership",
    ],
    sampleQuestion: {
      question: "Walk me through a campaign you ran and its results.",
      approach:
        "Structure it as goal → strategy → execution → result with a metric. Own your specific contribution, name what you'd do differently, and tie the result to business impact, not just impressions.",
    },
    commonMistakes: [
      "Talking about 'passion for brands' instead of results",
      "No metrics — marketing managers are judged on numbers",
      "Claiming team results without naming your specific role",
      "No point of view on the interviewer's actual product or market",
    ],
    faqs: [
      {
        question: "What metrics should I be ready to discuss?",
        answer:
          "Know two or three campaigns cold, with the numbers: growth rate, CAC, ROAS, conversion lift, or revenue influenced. Interviewers will push on specifics, so be ready to explain how you measured and what you'd optimize next time.",
      },
      {
        question: "How do I answer questions about a campaign that failed?",
        answer:
          "Pick a real one, own the miss, and focus on the diagnosis and what changed afterward. Interviewers respect a manager who reads data honestly far more than one who claims every campaign was a win.",
      },
    ],
  },
  {
    slug: "accountant",
    role: "Accountant",
    metaDescription:
      "Free AI interview question generator for accountants. Get likely technical, compliance, and behavioral questions with answer tips — no signup.",
    intro:
      "Accounting interviews test technical accuracy, integrity, and systems fluency. Expect questions on your specialty — tax, audit, reconciliations, month-end close — plus scenario questions about catching errors and handling deadlines. Interviewers listen for precision in how you answer, because sloppiness in the room signals sloppiness in the books. Know your software and be ready to talk through a real close.",
    focusAreas: [
      "Technical depth in your specialty (tax, audit, reporting, AP/AR)",
      "Month-end close, reconciliations, and catching discrepancies",
      "Software fluency (QuickBooks, SAP, NetSuite, Excel)",
      "Accuracy under deadline and how you handle a found error",
    ],
    sampleQuestion: {
      question: "Walk me through how you close the books at month-end.",
      approach:
        "Give a clear, ordered process — accruals, reconciliations, review, reporting — and mention a control you use to catch errors. Concrete steps signal you've actually owned a close, not just assisted one.",
    },
    commonMistakes: [
      "Vague 'detail-oriented' claims with no example",
      "Not knowing the software the role requires",
      "Fumbling a basic technical question like accrual vs. cash",
      "Downplaying a past error instead of showing the control you added",
    ],
    faqs: [
      {
        question: "What technical questions should I expect?",
        answer:
          "Be ready to explain your specialty in plain terms — the difference between accrual and cash accounting, how you reconcile an account, or how you'd handle a variance you can't explain. Interviewers test that your knowledge is genuine, not memorized.",
      },
      {
        question: "How do I answer a question about a mistake in the books?",
        answer:
          "Describe a real error, how you caught or corrected it, and the control or check you added so it couldn't recur. In accounting, showing you build safeguards matters more than claiming you never make mistakes.",
      },
    ],
  },
  {
    slug: "data-analyst",
    role: "Data Analyst",
    metaDescription:
      "Free AI interview question generator for data analysts. Get likely SQL, analysis, and stakeholder questions with answer tips — no signup.",
    intro:
      "Data analyst interviews test whether you turn data into decisions, not just charts. Expect a technical portion — SQL, spreadsheet logic, maybe a take-home — and a communication portion where you explain an analysis to a non-technical stakeholder. Interviewers listen for how you frame a business question and what you'd recommend, so prepare an example where your analysis actually changed something.",
    focusAreas: [
      "SQL and spreadsheet logic, often tested live or via take-home",
      "Framing a business question and choosing the right metric",
      "Explaining findings to non-technical stakeholders",
      "An analysis that drove a decision or a dollar figure",
    ],
    sampleQuestion: {
      question: "Tell me about an analysis that changed a business decision.",
      approach:
        "Frame the business question, the data you used, the insight, and the decision it drove — ideally with a number. Show you connect analysis to action, not just produce a dashboard nobody reads.",
    },
    commonMistakes: [
      "Describing dashboards you built but not decisions they drove",
      "Freezing on a live SQL question instead of thinking aloud",
      "Ignoring the stakeholder-communication side of the role",
      "No specific example where your analysis moved a metric",
    ],
    faqs: [
      {
        question: "Will I have to write SQL in the interview?",
        answer:
          "Often, yes — either live or as a take-home. Practice joins, aggregations, and window functions, and get comfortable talking through your query as you write it. Interviewers care about your logic as much as the correct answer.",
      },
      {
        question: "How do I show business impact as a data analyst?",
        answer:
          "Have one analysis ready where you can name the question, the insight, and the decision it changed — revenue recovered, churn reduced, a process fixed. The strongest analysts connect their SQL to a real outcome, not just a chart.",
      },
    ],
  },
  {
    slug: "customer-service-representative",
    role: "Customer Service Representative",
    metaDescription:
      "Free AI interview question generator for customer service reps. Get likely scenario and behavioral questions with answer tips — no signup.",
    intro:
      "Customer service interviews are almost entirely scenario-based. Interviewers want to see how you handle an angry customer, an impossible request, or a mistake that was your fault. They're reading for patience, problem-solving, and whether you can de-escalate without losing your own composure. Come with specific stories of tough interactions you turned around.",
    focusAreas: [
      "De-escalating an upset or angry customer",
      "Handling a request you can't fulfill",
      "Owning a mistake and making it right",
      "Balancing empathy with efficiency and metrics (CSAT, handle time)",
    ],
    sampleQuestion: {
      question: "Tell me about a time you dealt with a difficult customer.",
      approach:
        "Describe the situation, how you stayed calm, the steps you took to solve it, and the outcome. Emphasize listening and ownership — interviewers want proof you turn frustration into resolution, not just survive it.",
    },
    commonMistakes: [
      "Claiming to be a 'people person' without a specific story",
      "Describing a conflict you lost your temper in",
      "Ignoring the metrics side (CSAT, resolution time)",
      "No example of turning an angry customer around",
    ],
    faqs: [
      {
        question: "What if I don't have formal customer service experience?",
        answer:
          "Draw from any role where you handled people under pressure — retail, hospitality, volunteering. A specific story of calming a tense situation and solving the problem carries real weight, even from outside a call center.",
      },
      {
        question: "How do I answer 'tell me about a difficult customer'?",
        answer:
          "Pick a real interaction, stay factual, and focus on your actions: you listened, stayed calm, found a solution, and followed through. End with the outcome — a customer who stayed, a problem fixed. Avoid badmouthing the customer.",
      },
    ],
  },
  {
    slug: "sales-representative",
    role: "Sales Representative",
    metaDescription:
      "Free AI interview question generator for sales reps. Get likely quota, pipeline, and objection-handling questions with answer tips — no signup.",
    intro:
      "A sales interview is itself a sales call — interviewers are watching how you sell yourself. Expect direct questions about quota attainment, your biggest deal, and how you handle rejection. They'll also role-play objections to see you think on your feet. Come with numbers, a clear process, and the resilience that separates closers from order-takers.",
    focusAreas: [
      "Quota attainment and your biggest closed deal",
      "Your sales process, from prospecting to close",
      "Handling objections and rejection (often role-played live)",
      "CRM discipline and how you build pipeline",
    ],
    sampleQuestion: {
      question: "Sell me this pen.",
      approach:
        "Don't list features — ask what they need it for, then sell to that need. The exercise tests whether you discover before you pitch. Confidence and a question-first approach beat a rehearsed monologue.",
    },
    commonMistakes: [
      "No numbers — the fastest way to get screened out in sales",
      "Talking about activity ('made 100 calls') over results",
      "Freezing during a live objection or role-play",
      "Not researching what the company actually sells",
    ],
    faqs: [
      {
        question: "How do I prepare for a 'sell me this' role-play?",
        answer:
          "Lead with discovery questions before you pitch anything — understand the need, then connect the product to it. Interviewers use this to test whether you listen and qualify, or just talk. Stay calm and treat objections as questions.",
      },
      {
        question: "What numbers should I be ready to give?",
        answer:
          "Know your quota attainment as a percentage, your ranking on the team, deal size, and sales cycle. 'Hit 130% of a $1.2M quota, top 3 of 40 reps' answers most questions before they're fully asked.",
      },
    ],
  },
  {
    slug: "teacher",
    role: "Teacher",
    metaDescription:
      "Free AI interview question generator for teachers. Get likely classroom, behavioral, and philosophy questions with answer tips — no signup.",
    intro:
      "Teaching interviews probe your classroom management, your instructional approach, and your fit with the school's community. Expect scenario questions — a disruptive student, a parent complaint, a struggling learner — where committees listen for concrete strategies, not just philosophy. Come ready to describe your teaching in action, with real examples of student growth.",
    focusAreas: [
      "Classroom management and handling disruption",
      "Differentiating instruction for varied learners",
      "Communicating with parents and handling a complaint",
      "Your teaching philosophy backed by classroom examples",
    ],
    sampleQuestion: {
      question: "How do you handle a disruptive student?",
      approach:
        "Describe a specific, calm strategy — clear expectations, redirection, understanding the cause — and give a real example. Committees want a concrete approach that keeps the whole class learning, not a philosophy statement.",
    },
    commonMistakes: [
      "Stating a teaching philosophy with no classroom example",
      "Ignoring the specific school's mission or community",
      "Generic answers to classroom-management scenarios",
      "No evidence of student outcomes or growth",
    ],
    faqs: [
      {
        question: "What classroom scenarios should I prepare for?",
        answer:
          "Prepare for a disruptive student, a struggling learner, a difficult parent conversation, and differentiating a lesson for mixed abilities. Committees want specific strategies and a real example for each, not abstract philosophy.",
      },
      {
        question: "How do I show student outcomes without test data?",
        answer:
          "Use any concrete growth: reading levels, a project a class completed, a behavior turnaround, a student you reached. Specific classroom stories are as persuasive to a hiring committee as standardized scores.",
      },
    ],
  },
  {
    slug: "graphic-designer",
    role: "Graphic Designer",
    metaDescription:
      "Free AI interview question generator for graphic designers. Get likely portfolio, process, and critique questions with answer tips — no signup.",
    intro:
      "A graphic design interview centers on your portfolio and the thinking behind it. Interviewers will ask you to walk through a project — the brief, your choices, the result — and probe how you handle feedback and creative disagreement. They want a designer who solves business problems, not just makes things pretty. Be ready to defend decisions and take critique gracefully.",
    focusAreas: [
      "Walking through a portfolio project and your design decisions",
      "How you take and respond to critique or client feedback",
      "The problem behind the work, not just the visuals",
      "Tool fluency and collaboration with marketing or product",
    ],
    sampleQuestion: {
      question: "Walk me through a project in your portfolio.",
      approach:
        "Frame it as brief → constraints → your decisions → outcome. Explain why you made each choice, not just what you made. Interviewers are testing your thinking and how you connect design to a business goal.",
    },
    commonMistakes: [
      "Describing visuals instead of the problem they solved",
      "Getting defensive when asked to justify a design choice",
      "Not bringing or clearly presenting a portfolio",
      "Treating feedback as an attack rather than input",
    ],
    faqs: [
      {
        question: "How should I present my portfolio in the interview?",
        answer:
          "Pick three to four projects relevant to their work and tell each as a story: the problem, your choices, the result. Interviewers care more about your reasoning and how you handle constraints than about the polish of every pixel.",
      },
      {
        question: "How do I handle critique of my work in the room?",
        answer:
          "Treat it as collaboration — listen, ask clarifying questions, and explain your reasoning without getting defensive. How you receive feedback tells the interviewer exactly what you'd be like to work with day to day.",
      },
    ],
  },
  {
    slug: "human-resources-specialist",
    role: "Human Resources Specialist",
    metaDescription:
      "Free AI interview question generator for HR specialists. Get likely compliance, conflict, and behavioral questions with answer tips — no signup.",
    intro:
      "HR interviews test discretion, judgment, and the ability to balance employee advocacy with business needs. Expect scenario questions about workplace conflict, a sensitive complaint, or a compliance gray area — where interviewers listen for confidentiality, fairness, and process. You're being evaluated on tone as much as content, since you'd be handling the company's most sensitive conversations.",
    focusAreas: [
      "Handling a workplace conflict or harassment complaint",
      "Balancing employee advocacy with business needs",
      "Compliance knowledge and HRIS/ATS systems",
      "Confidentiality and judgment in gray-area situations",
    ],
    sampleQuestion: {
      question: "How would you handle an employee complaint about their manager?",
      approach:
        "Show a fair, confidential process: listen fully, document, investigate impartially, and follow policy. Emphasize you protect confidentiality and stay neutral rather than taking a side before you have the facts.",
    },
    commonMistakes: [
      "Vague 'passionate about people' language with no substance",
      "Taking sides in a conflict scenario before gathering facts",
      "Ignoring compliance and documentation in your answers",
      "Not specifying your HR specialty or systems experience",
    ],
    faqs: [
      {
        question: "What scenario questions do HR interviews include?",
        answer:
          "Expect a conflict between employees, a complaint about a manager, a policy someone violated, and a confidential situation. Interviewers listen for fairness, documentation, discretion, and knowing when to escalate — not a rush to judgment.",
      },
      {
        question: "How formal should my answers be?",
        answer:
          "Professional but warm — you're demonstrating the exact tone you'd use with employees. HR interviewers judge your communication closely, so be polished, measured, and human rather than stiff or overly casual.",
      },
    ],
  },
  {
    slug: "business-analyst",
    role: "Business Analyst",
    metaDescription:
      "Free AI interview question generator for business analysts. Get likely requirements, stakeholder, and process questions with answer tips — no signup.",
    intro:
      "Business analyst interviews test how you bridge business needs and technical solutions. Expect questions on gathering requirements, managing conflicting stakeholders, and a process you improved. Interviewers listen for structured thinking — how you'd elicit, document, and validate requirements — and for a real example where your work changed how the business operated. Come with a process-improvement story.",
    focusAreas: [
      "Eliciting and documenting requirements from stakeholders",
      "Handling conflicting or unclear stakeholder requests",
      "A process you analyzed and improved, with the outcome",
      "Tools and methods (SQL, Jira, process mapping, Agile)",
    ],
    sampleQuestion: {
      question: "How do you gather requirements when stakeholders disagree?",
      approach:
        "Describe a structured process: interviews and workshops, documenting the conflict, tracing each need back to a business goal, and facilitating a decision. Show you drive clarity rather than just recording contradictions.",
    },
    commonMistakes: [
      "Confusing the BA role with pure data analysis or PM work",
      "No example of a process you actually improved",
      "Skipping stakeholder management in your answers",
      "Vague about the methods and tools you've genuinely used",
    ],
    faqs: [
      {
        question: "How is a BA interview different from a data analyst one?",
        answer:
          "A BA interview emphasizes requirements, stakeholders, and process change; a data analyst interview emphasizes querying and insight. Lead with elicitation, documentation, and a process you improved, and be ready to show structured thinking.",
      },
      {
        question: "Should I mention methodologies like Agile or Six Sigma?",
        answer:
          "Yes, if you've genuinely used them — but tie each to a result. Saying you 'worked in Agile' means little; saying you 'used process mapping to eliminate a manual handoff costing 15 hours a week' shows real analysis.",
      },
    ],
  },
  {
    slug: "operations-manager",
    role: "Operations Manager",
    metaDescription:
      "Free AI interview question generator for operations managers. Get likely efficiency, leadership, and crisis questions with answer tips — no signup.",
    intro:
      "Operations manager interviews probe how you make things run better without breaking the team. Expect questions on an efficiency gain you drove, how you led people through change, and how you handled an operational crisis. Interviewers want numbers — cost, time, quality — plus evidence you can lead. Come with a story where you improved a system and the people running it stayed with you.",
    focusAreas: [
      "An efficiency or cost improvement, with real numbers",
      "Leading and scaling a team through change",
      "Handling an operational crisis or breakdown",
      "Balancing quality, cost, and speed under pressure",
    ],
    sampleQuestion: {
      question: "Tell me about a process you improved and the impact it had.",
      approach:
        "Structure it as problem → analysis → change → measurable result. Include the people side — how you got the team to adopt it. Interviewers want both the operational number and the leadership behind it.",
    },
    commonMistakes: [
      "Describing responsibilities instead of improvements made",
      "No numbers on cost, time, or quality",
      "Ignoring the people-leadership side of operations",
      "Not tailoring answers to the industry (retail vs. manufacturing vs. SaaS)",
    ],
    faqs: [
      {
        question: "What metrics should I be ready to discuss?",
        answer:
          "Know cost savings, efficiency gains, error reduction, and team size managed. A line like 'cut processing time 40% while holding 99% accuracy across a team of 24' answers most operations interview questions with one story.",
      },
      {
        question: "How do I show leadership in an operations interview?",
        answer:
          "Pair every process story with the people behind it — how you got buy-in, coached the team, or led through a change. Operations is a people role as much as a systems one, and interviewers screen for both.",
      },
    ],
  },
  {
    slug: "administrative-assistant",
    role: "Administrative Assistant",
    metaDescription:
      "Free AI interview question generator for administrative assistants. Get likely organization, judgment, and scenario questions with tips — no signup.",
    intro:
      "Administrative assistant interviews test organization, discretion, and grace under competing demands. Expect scenario questions — two executives needing you at once, a calendar conflict, a confidential document — where interviewers listen for prioritization and judgment. They want proof you're the reliable operational backbone an office runs on, so come with specific examples of keeping things from falling through the cracks.",
    focusAreas: [
      "Prioritizing when everything feels urgent",
      "Managing calendars, travel, and competing demands",
      "Discretion with confidential information",
      "Software fluency and a system you streamlined",
    ],
    sampleQuestion: {
      question: "How do you prioritize when two executives need you at once?",
      approach:
        "Describe a clear method: assess urgency and impact, communicate expectations to both, and deliver. Give a real example. Interviewers want to see calm triage, not panic or an inability to say when something will be done.",
    },
    commonMistakes: [
      "Underselling the role as 'just admin' instead of showing impact",
      "No example of a system or process you improved",
      "Vague answers to prioritization scenarios",
      "Not knowing the software tools the role requires",
    ],
    faqs: [
      {
        question: "How do I stand out in an admin assistant interview?",
        answer:
          "Lead with a specific save — a chaotic calendar you tamed, a system you streamlined, a deadline you rescued. Concrete reliability beats claiming to be 'detail-oriented,' which every candidate says.",
      },
      {
        question: "What scenario questions should I prepare for?",
        answer:
          "Expect competing priorities, a scheduling conflict, a confidential situation, and a last-minute change. Interviewers listen for how you triage, communicate, and follow through — reliability under pressure is the core of the role.",
      },
    ],
  },
  {
    slug: "data-scientist",
    role: "Data Scientist",
    metaDescription:
      "Free AI interview question generator for data scientists. Get likely modeling, stats, and business-impact questions with answer tips — no signup.",
    intro:
      "Data science interviews span statistics, modeling, coding, and — crucially — business judgment. Expect technical rounds on ML fundamentals and a case where you explain how you'd frame a business problem. Interviewers listen for whether you connect models to decisions, not just accuracy scores. Prepare to walk through a project end to end, including how it reached production and what it changed.",
    focusAreas: [
      "ML and statistics fundamentals, often tested directly",
      "Framing a business problem before choosing a model",
      "A project end to end — from data to production impact",
      "Communicating results to non-technical decision-makers",
    ],
    sampleQuestion: {
      question: "Walk me through a model you built and its business impact.",
      approach:
        "Frame the business problem, your approach and why, how it reached production, and the metric it moved. Interviewers want the full arc — a clever model that never shipped scores lower than a simple one that did.",
    },
    commonMistakes: [
      "Listing algorithms instead of the decisions they drove",
      "No mention of how a model reached production",
      "Ignoring the stakeholder-communication half of the job",
      "Treating it like a research defense rather than a business case",
    ],
    faqs: [
      {
        question: "What technical topics should I review?",
        answer:
          "Refresh statistics (hypothesis testing, bias-variance), core ML (regularization, evaluation metrics, overfitting), and be ready to code in Python or write SQL live. Many interviews also include a case on framing a messy, open-ended business problem.",
      },
      {
        question: "How do I show business impact, not just modeling skill?",
        answer:
          "Have one project ready where you name the decision your work changed and the metric it moved — revenue, churn, forecast accuracy. Interviewers increasingly screen for scientists whose models ship and change what a team does.",
      },
    ],
  },
  {
    slug: "product-manager",
    role: "Product Manager",
    metaDescription:
      "Free AI interview question generator for product managers. Get likely product-sense, prioritization, and behavioral questions with tips — no signup.",
    intro:
      "Product manager interviews test the core PM skills directly: product sense, prioritization, and execution. Expect a product-design question ('how would you improve X'), a prioritization case, and behavioral rounds on shipping and stakeholder conflict. Interviewers listen for structured thinking, user empathy, and outcomes over feature lists. Prepare a framework for open-ended questions and a story where a bet you made paid off.",
    focusAreas: [
      "Product-sense questions ('how would you improve…')",
      "Prioritization and trade-offs under real constraints",
      "A product you shipped and the outcome metric it moved",
      "Working across engineering, design, and data",
    ],
    sampleQuestion: {
      question: "How would you improve our product?",
      approach:
        "Structure it: clarify the goal and user, identify pain points, propose prioritized solutions, and name how you'd measure success. Interviewers grade the framework and user empathy more than any single clever idea.",
    },
    commonMistakes: [
      "Jumping to solutions before defining the user and goal",
      "Listing features shipped instead of outcomes moved",
      "Sounding like a project manager, not a product owner",
      "No structured framework for open-ended product questions",
    ],
    faqs: [
      {
        question: "How do I answer 'how would you improve X' questions?",
        answer:
          "Use a structure: clarify the objective and target user, map their pain points, brainstorm and prioritize solutions, then define success metrics. Interviewers want to see your reasoning process, not a lucky guess at the 'right' feature.",
      },
      {
        question: "What's tested in a PM behavioral round?",
        answer:
          "Expect stories about shipping something users adopted, a prioritization call you made, a conflict with engineering or a stakeholder, and a failure. Frame each around the outcome and your judgment, using the STAR structure.",
      },
    ],
  },
  {
    slug: "ux-designer",
    role: "UX Designer",
    metaDescription:
      "Free AI interview question generator for UX designers. Get likely portfolio, process, and whiteboard questions with answer tips — no signup.",
    intro:
      "UX design interviews center on your portfolio and your process — often including a live whiteboard or design exercise. Interviewers walk through your case studies asking why, probing research, decisions, and outcomes. They may pose a design challenge to watch you think. Come ready to explain the user problem behind each project and to defend decisions with reasoning, not taste.",
    focusAreas: [
      "Portfolio case studies: research, decisions, and outcomes",
      "Your end-to-end process, from research to testing",
      "A live whiteboard or design-challenge exercise",
      "Collaboration with product and engineering",
    ],
    sampleQuestion: {
      question: "Walk me through your design process on a recent project.",
      approach:
        "Tell it as problem → research → ideation → testing → outcome. Emphasize the user problem and how evidence shaped your decisions. Interviewers want a designer who validates, not one who designs on instinct alone.",
    },
    commonMistakes: [
      "Describing visuals instead of the user problem solved",
      "No mention of research or testing behind the work",
      "Freezing on the whiteboard instead of narrating your thinking",
      "Treating UX and UI as interchangeable",
    ],
    faqs: [
      {
        question: "How do I prepare for a UX whiteboard challenge?",
        answer:
          "Practice narrating a design out loud: clarify the problem and users, sketch flows, and explain trade-offs as you go. Interviewers care far more about your process and communication than a polished result in the room.",
      },
      {
        question: "What should my portfolio walkthrough emphasize?",
        answer:
          "Lead with the user problem and how research shaped your decisions, then the outcome. Interviewers probe 'why' at every step, so be ready to justify choices with evidence rather than aesthetic preference.",
      },
    ],
  },
  {
    slug: "devops-engineer",
    role: "DevOps Engineer",
    metaDescription:
      "Free AI interview question generator for DevOps engineers. Get likely CI/CD, cloud, and incident questions with answer tips — no signup.",
    intro:
      "DevOps interviews test how you make software ship faster and more reliably. Expect questions on CI/CD pipelines, infrastructure as code, your cloud platform, and — importantly — how you handle a production incident. Interviewers want automation instincts and calm under an outage, plus evidence you collaborate with dev teams rather than gatekeep them. Prepare an incident story and a pipeline you built.",
    focusAreas: [
      "CI/CD, IaC, and your cloud platform (AWS, GCP, Azure)",
      "Handling a production incident or outage",
      "Automating manual, error-prone toil",
      "Reliability metrics (uptime, MTTR, deploy frequency)",
    ],
    sampleQuestion: {
      question: "Walk me through how you'd respond to a production outage.",
      approach:
        "Show a calm, structured incident process: detect, triage, mitigate, communicate, then run a blameless postmortem. Interviewers want composure and a system for learning, not heroics that leave no lasting fix.",
    },
    commonMistakes: [
      "Listing tools without the reliability or speed gains they produced",
      "No structured approach to the incident-response question",
      "Ignoring collaboration — DevOps is a culture, not a silo",
      "Rusty on the specific cloud or stack the role uses",
    ],
    faqs: [
      {
        question: "What's the most common DevOps interview question?",
        answer:
          "Some version of 'how do you handle a production incident.' Interviewers want a calm, structured process — detect, mitigate, communicate, postmortem — and evidence you fix root causes rather than just restart the box.",
      },
      {
        question: "Which technical areas should I review?",
        answer:
          "Refresh CI/CD pipeline design, infrastructure as code (Terraform), containers and orchestration, and the DORA metrics — deploy frequency, lead time, MTTR, change-fail rate. Be ready to discuss a pipeline you actually built.",
      },
    ],
  },
  {
    slug: "web-developer",
    role: "Web Developer",
    metaDescription:
      "Free AI interview question generator for web developers. Get likely coding, framework, and project questions with answer tips — no signup.",
    intro:
      "Web developer interviews mix practical coding with questions about the sites you've shipped. Expect JavaScript and framework questions, a live or take-home build, and discussion of performance, accessibility, and your stack. Interviewers want to see real shipped work and clear reasoning about trade-offs. Have a project ready you can walk through — the problem, your choices, and the result.",
    focusAreas: [
      "JavaScript fundamentals and your framework (React, Next.js)",
      "A live coding exercise or take-home build",
      "Performance, accessibility, and Core Web Vitals",
      "A shipped project and the decisions behind it",
    ],
    sampleQuestion: {
      question: "Tell me about a site or feature you built and the challenges you faced.",
      approach:
        "Walk through the problem, your technical choices, a hard trade-off, and the result — ideally with a performance or conversion number. Show you ship real work and reason about trade-offs, not just follow tutorials.",
    },
    commonMistakes: [
      "Listing frameworks instead of walking through real work",
      "No mention of performance, accessibility, or results",
      "Coding in silence during the live exercise",
      "Rusty on JavaScript fundamentals behind the framework",
    ],
    faqs: [
      {
        question: "What coding questions do web developer interviews include?",
        answer:
          "Expect JavaScript fundamentals (closures, async, the event loop), a framework-specific question, and often a live build or take-home. Practice explaining your reasoning aloud — interviewers grade communication alongside correctness.",
      },
      {
        question: "How do I stand out for a front-end role?",
        answer:
          "Have a shipped project to discuss with real numbers — a load-time improvement, an accessibility fix, a conversion lift. Concrete results and clear reasoning about trade-offs beat a long list of technologies you've touched.",
      },
    ],
  },
  {
    slug: "it-support-specialist",
    role: "IT Support Specialist",
    metaDescription:
      "Free AI interview question generator for IT support specialists. Get likely troubleshooting, ticketing, and scenario questions with tips — no signup.",
    intro:
      "IT support interviews test both technical troubleshooting and patience with non-technical users. Expect scenario questions — a user who can't log in, a printer down before a big meeting, a spike in tickets — where interviewers listen for a methodical process and clear communication. They want someone who fixes problems fast without making people feel talked down to. Come ready to walk through your diagnostic steps.",
    focusAreas: [
      "Methodical troubleshooting across hardware, software, and networks",
      "Explaining a fix to a frustrated, non-technical user",
      "Prioritizing tickets when several are urgent",
      "Certifications and systems the role names (A+, ITIL, ticketing tools)",
    ],
    sampleQuestion: {
      question: "A user says their computer 'isn't working.' How do you troubleshoot?",
      approach:
        "Show a structured method: ask clarifying questions, reproduce the issue, isolate the cause layer by layer, fix, then confirm with the user. Interviewers want a process and calm communication, not a lucky guess.",
    },
    commonMistakes: [
      "Jumping to a fix before diagnosing the actual problem",
      "Ignoring the customer-service side of the role",
      "No structured troubleshooting method in your answers",
      "Leaving out certifications the role requests",
    ],
    faqs: [
      {
        question: "What troubleshooting questions should I expect?",
        answer:
          "Expect open scenarios — a user can't connect, an app keeps crashing, email is down. Interviewers want to hear a repeatable method: clarify, reproduce, isolate, fix, verify. Narrate your steps rather than jumping to a single guess.",
      },
      {
        question: "How do I stand out for an entry-level IT support role?",
        answer:
          "Lead with a specific fix — a recurring issue you documented, a home lab you built, a user you unblocked. Pair technical skill with patience; interviewers hire for the person who stays calm with a frustrated user.",
      },
    ],
  },
  {
    slug: "medical-assistant",
    role: "Medical Assistant",
    metaDescription:
      "Free AI interview question generator for medical assistants. Get likely clinical, administrative, and scenario questions with tips — no signup.",
    intro:
      "Medical assistant interviews cover the clinical and administrative sides of keeping a clinic running. Expect questions on your clinical skills — vitals, injections, rooming — plus scenarios about a difficult patient or a busy front desk. Interviewers listen for accuracy, EHR fluency, and a calm bedside manner. Be ready to show you keep both the clinical and admin sides moving without dropping either.",
    focusAreas: [
      "Clinical skills (vitals, injections, phlebotomy, EKG)",
      "EHR systems, scheduling, and documentation accuracy",
      "Handling an anxious or difficult patient",
      "Juggling clinical and front-desk duties in a busy clinic",
    ],
    sampleQuestion: {
      question: "How do you handle an anxious or upset patient?",
      approach:
        "Describe how you stay calm, listen, explain what's happening, and involve the provider when needed. Give a real example. Interviewers want warmth plus composure — the person who steadies the room.",
    },
    commonMistakes: [
      "Not specifying clinical vs. administrative strengths",
      "Vague 'caring person' claims without a clinical example",
      "Leaving out EHR systems and certification status",
      "Ignoring the specialty (pediatrics, cardiology, urgent care)",
    ],
    faqs: [
      {
        question: "What should I emphasize as a medical assistant candidate?",
        answer:
          "Balance clinical competence with bedside manner and organization. Interviewers assume the clinical basics; they hire for the assistant who calms nervous patients, keeps documentation accurate, and helps a busy clinic run smoothly.",
      },
      {
        question: "How do I interview as a new-grad medical assistant?",
        answer:
          "Lead with your externship, the clinical skills you practiced, and the EHR you trained on. Name the specialty you want and why. Managers expect less experience but look for genuine interest and teachability.",
      },
    ],
  },
  {
    slug: "certified-nursing-assistant",
    role: "Certified Nursing Assistant",
    metaDescription:
      "Free AI interview question generator for CNAs. Get likely patient-care, scenario, and behavioral questions with answer tips — no signup.",
    intro:
      "CNA interviews test compassion, stamina, and reliability — you're the person patients see most. Expect scenario questions about a resident who refuses care, a heavy assignment, or an emergency on the floor. Interviewers listen for patient dignity, teamwork, and how you handle the physical and emotional demands. Come with real examples of caring for people through hard moments.",
    focusAreas: [
      "Direct patient care (ADLs, mobility, vitals, hygiene)",
      "Handling a resident who refuses care or is agitated",
      "Reliability and teamwork across demanding shifts",
      "Preserving patient dignity under time pressure",
    ],
    sampleQuestion: {
      question: "What would you do if a resident refused your care?",
      approach:
        "Show patience and respect: understand why, offer choices, try again later, and communicate with the nurse. Interviewers want dignity-first care, not forcing the issue or ignoring it.",
    },
    commonMistakes: [
      "Focusing on tasks instead of patient dignity and outcomes",
      "Not naming the care setting you're experienced in",
      "Downplaying the physical and emotional demands",
      "No example of handling a hard moment with a resident",
    ],
    faqs: [
      {
        question: "What should a CNA interview emphasize most?",
        answer:
          "Compassion backed by reliability. Interviewers assume the clinical basics; they hire the CNA who shows up on time, handles the hard moments with dignity, and that families and nurses trust. Have one caring-under-pressure story ready.",
      },
      {
        question: "How do I interview for a CNA role with no experience?",
        answer:
          "Lead with your clinical training, certification, and any caregiving — even for family. Name the setting you want and why. Genuine motivation and a calm, respectful manner carry real weight for new CNAs.",
      },
    ],
  },
  {
    slug: "pharmacy-technician",
    role: "Pharmacy Technician",
    metaDescription:
      "Free AI interview question generator for pharmacy technicians. Get likely accuracy, insurance, and scenario questions with tips — no signup.",
    intro:
      "Pharmacy tech interviews test accuracy, speed, and the customer-service side of the counter. Expect questions on prescription processing, catching errors, handling insurance rejections, and dealing with an upset customer. Interviewers listen for a spotless attention to detail and calm under a busy counter. Be ready to show you protect accuracy while keeping the line moving.",
    focusAreas: [
      "Prescription-filling accuracy and how you catch errors",
      "Insurance and claims processing, including rejections",
      "Handling an upset or waiting customer",
      "Certification (PTCB/CPhT) and pharmacy systems",
    ],
    sampleQuestion: {
      question: "How do you ensure accuracy when the pharmacy is slammed?",
      approach:
        "Describe your checks — verifying against the original, double-checking dosages, never rushing a fill. Give an example of catching an error. Interviewers want proof that volume never compromises your accuracy.",
    },
    commonMistakes: [
      "Not emphasizing accuracy — the core of the job",
      "Leaving out PTCB certification or registration status",
      "Ignoring insurance and claims-processing experience",
      "Forgetting the retail customer-service dimension",
    ],
    faqs: [
      {
        question: "What accuracy questions should I expect?",
        answer:
          "Expect questions about how you verify a fill, what you do when you catch an error, and how you stay accurate under volume. Describe concrete checks and a real error you caught — accuracy is the single most important signal here.",
      },
      {
        question: "Does the interview differ for retail vs. hospital pharmacy?",
        answer:
          "Yes. Retail interviews probe speed, volume, and customer service; hospital interviews probe accuracy, IV/compounding, and working with clinical staff. Tailor your examples to the setting you're interviewing for.",
      },
    ],
  },
  {
    slug: "physical-therapist",
    role: "Physical Therapist",
    metaDescription:
      "Free AI interview question generator for physical therapists. Get likely clinical, outcomes, and patient-motivation questions with tips — no signup.",
    intro:
      "Physical therapist interviews test clinical judgment and the ability to motivate patients through hard recoveries. Expect questions on your specialty, your treatment approach, and a patient who wasn't progressing or wasn't adherent. Interviewers listen for evidence-based reasoning plus the relationship skill that keeps patients doing their exercises. Come with outcome-focused examples.",
    focusAreas: [
      "Clinical reasoning and your specialty (ortho, neuro, sports, geriatrics)",
      "A patient who stalled or wasn't following the plan",
      "Measurable functional outcomes and progress",
      "Building rapport that keeps patients adherent",
    ],
    sampleQuestion: {
      question: "How do you handle a patient who isn't progressing?",
      approach:
        "Show clinical problem-solving: reassess, adjust the plan, address barriers to adherence, and communicate honestly. Interviewers want evidence-based judgment paired with the motivation skills that keep patients engaged.",
    },
    commonMistakes: [
      "Describing treatments instead of patient outcomes",
      "Not naming your specialty or preferred setting",
      "Ignoring the motivational, relationship side of PT",
      "Leaving out licensure and certification details",
    ],
    faqs: [
      {
        question: "What clinical scenarios should I prepare for?",
        answer:
          "Expect a patient who's plateaued, one who won't do home exercises, and a complex case with multiple issues. Interviewers listen for reassessment, evidence-based adjustments, and how you motivate patients to stay adherent.",
      },
      {
        question: "How do I discuss outcomes without breaking confidentiality?",
        answer:
          "Use functional milestones and aggregate results — 'returned most post-op patients to full activity on schedule' — never patient-identifying details. Ranges and rates show impact while staying HIPAA-safe in the interview.",
      },
    ],
  },
  {
    slug: "dental-hygienist",
    role: "Dental Hygienist",
    metaDescription:
      "Free AI interview question generator for dental hygienists. Get likely clinical, patient-care, and scenario questions with tips — no signup.",
    intro:
      "Dental hygienist interviews test clinical skill and the gentle, trust-building manner that keeps patients coming back. Expect questions on your clinical procedures, handling an anxious patient, and educating someone on their oral health. Interviewers also read for fit with the practice's pace and personality. Come ready to pair technical competence with genuine chairside warmth.",
    focusAreas: [
      "Clinical procedures (scaling, root planing, x-rays, charting)",
      "Managing an anxious or resistant patient",
      "Patient education and building long-term rapport",
      "Practice-management software and sterilization protocols",
    ],
    sampleQuestion: {
      question: "How do you handle a patient who's afraid of the dentist?",
      approach:
        "Describe how you build trust: explain each step, go slow, check in often, and give the patient control. A real example of calming an anxious patient shows the chairside manner that retains a practice's patients.",
    },
    commonMistakes: [
      "Ignoring the patient-relationship side of hygiene",
      "Leaving out RDH licensure and certifications",
      "Not mentioning specific software or procedures",
      "A generic manner that ignores the practice's style",
    ],
    faqs: [
      {
        question: "What should a dental hygienist interview emphasize?",
        answer:
          "Licensure plus the chairside manner that retains patients. Practices assume clinical competence; they hire the hygienist that anxious patients trust and request by name, and who fits the team's culture and pace.",
      },
      {
        question: "How do I show fit with a specific practice?",
        answer:
          "Reference their patient base and style, and ask about their software and protocols. Showing you've thought about their day-to-day — not just any hygienist job — sets you apart in a small, close-knit office.",
      },
    ],
  },
  {
    slug: "electrician",
    role: "Electrician",
    metaDescription:
      "Free AI interview question generator for electricians. Get likely safety, code, and troubleshooting questions with answer tips — no signup.",
    intro:
      "Electrician interviews test safety, code knowledge, and hands-on troubleshooting. Expect questions on your license level, the work you've done, a tricky diagnostic, and how you handle a safety hazard on site. Contractors listen for a clean safety record and sound judgment — one careless answer about cutting corners can end the interview. Come ready to talk code, safety, and real jobs.",
    focusAreas: [
      "License level and the type of work you specialize in",
      "Code knowledge (NEC) and passing inspection",
      "Troubleshooting a fault or diagnostic problem",
      "Safety record and handling a hazard on site",
    ],
    sampleQuestion: {
      question: "Walk me through how you'd troubleshoot a circuit that keeps tripping.",
      approach:
        "Show a safe, logical method: isolate the circuit, check for overloads and shorts, test systematically, and follow code. Lead with safety at every step — contractors screen hard for judgment, not just speed.",
    },
    commonMistakes: [
      "Any answer that downplays safety or code compliance",
      "Not stating your license level clearly",
      "Vague about the type of electrical work you do",
      "No structured method for the troubleshooting question",
    ],
    faqs: [
      {
        question: "What should an electrician interview emphasize?",
        answer:
          "Safety, code knowledge, and your license level, backed by real jobs. Contractors screen first on whether you work safely and to code — a clean safety record and sound judgment matter more than raw speed.",
      },
      {
        question: "What technical questions might come up?",
        answer:
          "Expect a troubleshooting scenario (a tripping breaker, a dead circuit), questions on NEC code, and how you'd handle an unsafe situation on site. Walk through a safe, logical method rather than jumping to a conclusion.",
      },
    ],
  },
  {
    slug: "hvac-technician",
    role: "HVAC Technician",
    metaDescription:
      "Free AI interview question generator for HVAC technicians. Get likely diagnostic, certification, and customer questions with tips — no signup.",
    intro:
      "HVAC interviews test diagnostic skill, certifications, and how you treat customers in their homes. Expect questions on a tricky system fault, your EPA and NATE certs, and handling a customer during a breakdown in peak season. Contractors want a tech who fixes it right the first time and leaves the home clean and the customer happy. Come with real diagnostic stories.",
    focusAreas: [
      "Diagnosing a system fault and your troubleshooting method",
      "EPA 608 and NATE certifications and system experience",
      "Customer service during a breakdown or peak season",
      "First-visit fix rate and working cleanly in homes",
    ],
    sampleQuestion: {
      question: "Walk me through diagnosing a unit that isn't cooling.",
      approach:
        "Show a systematic method — check airflow, refrigerant, electrical, and controls in order — and explain how you confirm the fix. Interviewers want a repeatable diagnostic process, not a parts-swapping guess.",
    },
    commonMistakes: [
      "No structured diagnostic method in your answers",
      "Leaving out EPA 608 or NATE certification",
      "Ignoring the customer-service side of in-home work",
      "Not specifying residential vs. commercial experience",
    ],
    faqs: [
      {
        question: "What technical questions should I expect?",
        answer:
          "Expect a diagnostic scenario — a unit not cooling, a strange noise, a recurring fault. Walk through a systematic method (airflow, refrigerant, electrical, controls) and how you confirm the fix, rather than guessing at parts.",
      },
      {
        question: "How do I stand out in an HVAC interview?",
        answer:
          "Pair technical skill with reliability and customer manner. Contractors lose customers to techs who are late or messy — show a high first-visit fix rate plus respect for the customer's home and time.",
      },
    ],
  },
  {
    slug: "welder",
    role: "Welder",
    metaDescription:
      "Free AI interview question generator for welders. Get likely certification, process, and safety questions with answer tips — no signup.",
    intro:
      "Welding interviews often include a weld test, but the conversation still matters. Expect questions on your processes and certifications, the materials and positions you're qualified for, reading blueprints, and safety. Shops want a welder who passes inspection the first time and works safely. Be ready to speak precisely about your certs, your pass rate, and the specs you've worked to.",
    focusAreas: [
      "Processes (MIG, TIG, stick, flux-core) and positions",
      "Certifications (AWS) and code qualifications",
      "Blueprint reading and working to spec",
      "Weld-inspection pass rate and shop safety",
    ],
    sampleQuestion: {
      question: "What do you do when a weld fails inspection?",
      approach:
        "Show accountability: identify why it failed, correct the technique or settings, and re-weld to spec. Interviewers want a welder who owns quality and learns from a failed X-ray, not one who gets defensive.",
    },
    commonMistakes: [
      "Not listing your specific processes and certifications",
      "Vague about materials and positions you're qualified for",
      "Any answer that treats safety casually",
      "No sense of your inspection or X-ray pass rate",
    ],
    faqs: [
      {
        question: "Will there be a weld test in the interview?",
        answer:
          "Often, yes — many shops require a practical weld test alongside the conversation. Come prepared to demonstrate the processes and positions you claim, and to talk precisely about your certifications and pass rate.",
      },
      {
        question: "What should I emphasize in the interview conversation?",
        answer:
          "Your certifications, the processes and positions you're qualified in, and your inspection pass rate. A high first-pass or X-ray rate tells a shop you save them rework and failed inspections — lead with it if you have the number.",
      },
    ],
  },
  {
    slug: "truck-driver",
    role: "Truck Driver",
    metaDescription:
      "Free AI interview question generator for truck drivers. Get likely safety, record, and route questions with answer tips — no signup.",
    intro:
      "Truck driver interviews are quick and practical — carriers screen on your record, endorsements, and reliability. Expect questions on your CDL class and endorsements, your safety history, how you handle a delay or bad weather, and your availability for the routes they run. Recruiters want a safe, dependable driver who runs legal and on time. Come with a clean record and clear route preferences.",
    focusAreas: [
      "CDL class, endorsements, and safety record",
      "Handling a delay, breakdown, or bad-weather run",
      "Route experience and availability (OTR, regional, local)",
      "Hours-of-service compliance and equipment care",
    ],
    sampleQuestion: {
      question: "What would you do if you were running behind on a delivery?",
      approach:
        "Show you never compromise safety or hours-of-service rules: communicate the delay early, stay legal, and keep the load secure. Recruiters screen for drivers who run safe and honest over ones who cut corners to save time.",
    },
    commonMistakes: [
      "Any answer suggesting you'd bend safety or HOS rules",
      "Not stating CDL class and endorsements upfront",
      "Vague about your safety record and miles driven",
      "Ignoring the route type the carrier is hiring for",
    ],
    faqs: [
      {
        question: "What do carriers ask in a driver interview?",
        answer:
          "Expect questions on your CDL class and endorsements, accident and violation history, how you handle delays or bad weather, and your availability. Carriers screen first on safety and reliability, so lead with your clean record.",
      },
      {
        question: "How do I interview as a new CDL holder?",
        answer:
          "Lead with your fresh CDL, endorsements, and clean record, then emphasize reliability and willingness to run the routes they need. Many carriers hire new grads — show them you're safe, dependable, and eager to learn.",
      },
    ],
  },
  {
    slug: "financial-analyst",
    role: "Financial Analyst",
    metaDescription:
      "Free AI interview question generator for financial analysts. Get likely modeling, technical, and business questions with answer tips — no signup.",
    intro:
      "Financial analyst interviews test modeling skill, business judgment, and communication. Expect technical questions on valuation, forecasting, and Excel, plus a case where you explain how an analysis drove a decision. Interviewers listen for precision and for whether leadership would act on your work. Come ready to walk through a real analysis and the recommendation it produced.",
    focusAreas: [
      "Financial modeling, forecasting, and variance analysis",
      "Technical concepts (valuation, NPV, the three statements)",
      "An analysis that influenced a real decision",
      "Communicating numbers to non-finance stakeholders",
    ],
    sampleQuestion: {
      question: "Tell me about an analysis that changed a decision.",
      approach:
        "Frame the business question, your analysis, the recommendation, and the dollar impact. Interviewers want an analyst whose work leadership acts on — connect the model to a decision, not just a clean spreadsheet.",
    },
    commonMistakes: [
      "Describing models built without the decisions they drove",
      "Fumbling a core technical question like how the statements link",
      "Ignoring the communication side of the analyst role",
      "Vague about the modeling and tools you actually use",
    ],
    faqs: [
      {
        question: "What technical questions should I review?",
        answer:
          "Refresh valuation methods, how the three financial statements connect, NPV and DCF basics, and common Excel modeling. Be ready to explain a concept simply — interviewers test that your knowledge is genuine, not memorized.",
      },
      {
        question: "How technical should my answers be?",
        answer:
          "Show the rigor, but keep the story readable for a non-finance interviewer who may be in the room. Lead with the business impact of your analysis, then demonstrate the modeling depth behind it when asked.",
      },
    ],
  },
  {
    slug: "executive-assistant",
    role: "Executive Assistant",
    metaDescription:
      "Free AI interview question generator for executive assistants. Get likely judgment, discretion, and scenario questions with tips — no signup.",
    intro:
      "Executive assistant interviews test judgment, discretion, and grace under chaos. Expect scenario questions — a double-booked CEO, a last-minute travel collapse, a confidential situation — where interviewers listen for independent decision-making and absolute reliability. You're being evaluated as a leader's right hand, so come with stories where you anticipated a need or salvaged a crisis on your own.",
    focusAreas: [
      "Independent judgment calls made on a leader's behalf",
      "Managing complex calendars, travel, and competing demands",
      "Discretion with highly confidential information",
      "Anticipating needs and salvaging a last-minute crisis",
    ],
    sampleQuestion: {
      question: "Tell me about a time you solved a problem for an executive without being asked.",
      approach:
        "Describe a moment you anticipated a need or defused a crisis independently — a trip you salvaged, a conflict you caught. Interviewers want proof you act as a proactive right hand, not just a task-taker.",
    },
    commonMistakes: [
      "Underselling the role as scheduling instead of leadership support",
      "No examples of judgment calls made independently",
      "Missing discretion and confidentiality as core themes",
      "Generic answers that don't fit executive-level support",
    ],
    faqs: [
      {
        question: "How is an EA interview different from an admin assistant one?",
        answer:
          "An EA interview probes judgment, discretion, and directly enabling a leader; an admin interview probes broad office operations. Lead with independent decisions you made and confidential situations you handled with discretion.",
      },
      {
        question: "What makes an EA candidate stand out?",
        answer:
          "A specific moment you saved an executive's day — a trip you rescued, a conflict you defused, a project you quietly drove. Concrete judgment and anticipation beat calling yourself 'highly organized.'",
      },
    ],
  },
  {
    slug: "recruiter",
    role: "Recruiter",
    metaDescription:
      "Free AI interview question generator for recruiters. Get likely sourcing, metrics, and behavioral questions with answer tips — no signup.",
    intro:
      "Recruiter interviews test your craft directly — you sell and screen for a living, so interviewers watch how you sell yourself and read them. Expect questions on your pipeline metrics, a hard role you filled, how you source, and how you handle a hiring manager who keeps rejecting candidates. Come with numbers and a clear process from first touch to close.",
    focusAreas: [
      "Sourcing strategy and filling a hard-to-fill role",
      "Metrics: time-to-fill, offer-accept rate, quality of hire",
      "Managing a difficult or indecisive hiring manager",
      "Candidate experience from first touch to close",
    ],
    sampleQuestion: {
      question: "How do you handle a hiring manager who rejects every candidate?",
      approach:
        "Show you recalibrate: revisit the scorecard, present market data, and align on must-haves versus nice-to-haves. Interviewers want a recruiter who partners with and pushes back on hiring managers, not one who just keeps sourcing blindly.",
    },
    commonMistakes: [
      "No recruiting metrics in a metrics-heavy field",
      "Talking about activity ('screened lots of resumes') over results",
      "Ignoring candidate experience as a core skill",
      "A generic pitch — ironic for someone who screens them",
    ],
    faqs: [
      {
        question: "What metrics should I be ready to discuss?",
        answer:
          "Know your time-to-fill, offer-accept rate, quality of hire, and roles closed. 'Filled 45 technical roles at a 31-day average and 88% accept rate' answers most questions and shows you run a real, measurable process.",
      },
      {
        question: "How do I show sourcing skill in the interview?",
        answer:
          "Walk through a genuinely hard role you filled — where you searched, how you engaged passive candidates, and how you closed. Interviewers want creativity and persistence, not just posting a job and waiting for applicants.",
      },
    ],
  },
  {
    slug: "account-manager",
    role: "Account Manager",
    metaDescription:
      "Free AI interview question generator for account managers. Get likely retention, growth, and difficult-client questions with tips — no signup.",
    intro:
      "Account manager interviews test how you retain and grow revenue by making clients successful. Expect questions on saving an at-risk account, growing a book of business, and handling a difficult or unhappy client. Interviewers listen for relationship skill and commercial instinct together. Come with stories where you turned a shaky account into a renewal or an expansion.",
    focusAreas: [
      "Saving an at-risk or churning account",
      "Growing an account through upsell and expansion",
      "Handling a difficult or unhappy client",
      "Balancing client advocacy with your company's goals",
    ],
    sampleQuestion: {
      question: "Tell me about a time you saved an account at risk of churning.",
      approach:
        "Walk through how you spotted the risk, diagnosed the root cause, rebuilt trust, and the outcome. Interviewers want proof you retain revenue through relationships and problem-solving, not discounts alone.",
    },
    commonMistakes: [
      "Confusing account management with pure sales hunting",
      "No numbers on retention, renewal, or expansion",
      "Ignoring the multi-stakeholder relationship skill",
      "No example of turning around an unhappy client",
    ],
    faqs: [
      {
        question: "How is an account manager interview different from a sales one?",
        answer:
          "A sales interview probes hunting and closing new business; an account manager interview probes retaining and expanding existing clients. Lead with retention, relationship-building, and a churn save rather than net-new logos.",
      },
      {
        question: "What metrics should I be ready to give?",
        answer:
          "Know your net revenue retention, renewal rate, and expansion revenue. A line like 'held 96% NRR while growing my book from $2.1M to $3.4M' shows you both keep and grow accounts — exactly what interviewers screen for.",
      },
    ],
  },
  {
    slug: "bookkeeper",
    role: "Bookkeeper",
    metaDescription:
      "Free AI interview question generator for bookkeepers. Get likely software, reconciliation, and accuracy questions with answer tips — no signup.",
    intro:
      "Bookkeeper interviews test accuracy, organization, and software fluency. Expect questions on reconciliations, month-end close, the accounting software you use, and how you handle books that don't balance. Small businesses are trusting you with their finances, so interviewers listen closely for precision and trustworthiness. Come ready to walk through your process and a discrepancy you caught.",
    focusAreas: [
      "Reconciliations, AP/AR, and month-end close",
      "Software fluency (QuickBooks, Xero, Excel)",
      "Catching and resolving discrepancies",
      "Accuracy and confidentiality with financial data",
    ],
    sampleQuestion: {
      question: "What do you do when the books don't balance?",
      approach:
        "Describe a systematic reconciliation — trace transactions, check for duplicates and timing, isolate the discrepancy. Give an example of an error you caught. Interviewers want methodical accuracy, not guesswork.",
    },
    commonMistakes: [
      "Vague 'detail-oriented' claims with no example",
      "Not knowing the accounting software the role uses",
      "Leaving out AP/AR, payroll, or close experience",
      "No example of catching or fixing an error",
    ],
    faqs: [
      {
        question: "What software questions should I expect?",
        answer:
          "Expect questions about the exact platform they use — usually QuickBooks or Xero — plus Excel. Be ready to describe how you use it day to day, since software fluency is a primary screen for bookkeeping roles.",
      },
      {
        question: "How do I show accuracy in the interview?",
        answer:
          "Give a concrete example — a clean audit, a close you shortened, an error you caught before it reached a tax return. Specific proof of precision beats the word 'meticulous,' which every candidate claims.",
      },
    ],
  },
  {
    slug: "retail-sales-associate",
    role: "Retail Sales Associate",
    metaDescription:
      "Free AI interview question generator for retail sales associates. Get likely service, sales, and scenario questions with tips — no signup.",
    intro:
      "Retail interviews are quick and scenario-driven — managers want to know you can sell, serve, and stay reliable through a rush. Expect questions on a tough customer, an upsell you made, and your availability. Interviewers read for a positive attitude and dependability as much as sales skill. Come with a specific story of turning a browser into a buyer or handling a difficult customer.",
    focusAreas: [
      "Customer service and turning browsers into buyers",
      "Handling a difficult customer or a return dispute",
      "Reliability and availability during peak hours",
      "Upselling, loyalty sign-ups, and hitting sales targets",
    ],
    sampleQuestion: {
      question: "How would you handle a customer who's unhappy with a purchase?",
      approach:
        "Show you stay friendly, listen, and solve within policy — and turn the moment into loyalty. Give a real example. Managers want an associate who protects the customer relationship, not one who argues over a return.",
    },
    commonMistakes: [
      "Claiming to be a 'people person' with no sales proof",
      "Vague on availability, which retail screens hard",
      "No example of an upsell or a service save",
      "Ignoring the specific store or brand you're interviewing with",
    ],
    faqs: [
      {
        question: "What if I don't have retail experience yet?",
        answer:
          "Draw on any role with customers or teamwork — food service, volunteering, school jobs. A specific story of helping someone or handling a rush shows the exact skills retail managers want, even without a sales title.",
      },
      {
        question: "What do retail managers care about most?",
        answer:
          "Attitude, reliability, and basic sales instinct. Managers hire associates who show up for their shifts, stay positive with customers, and can nudge a sale. Emphasize dependability and a genuine, helpful manner.",
      },
    ],
  },
  {
    slug: "server",
    role: "Server",
    metaDescription:
      "Free AI interview question generator for restaurant servers. Get likely service, scenario, and teamwork questions with answer tips — no signup.",
    intro:
      "Server interviews are fast and practical — managers want to know you deliver great hospitality and stay sharp in the weeds. Expect scenario questions on a mistake with an order, an unhappy table, and juggling a full section. Interviewers read for hustle, a warm manner, and reliability on busy nights. Come with a specific story of handling pressure or turning a bad table around.",
    focusAreas: [
      "High-volume, multi-table service under pressure",
      "Handling a wrong order or an unhappy table",
      "Teamwork with kitchen and bar during a rush",
      "Reliability for nights, weekends, and holidays",
    ],
    sampleQuestion: {
      question: "What would you do if a table was unhappy with their meal?",
      approach:
        "Show you stay calm, apologize sincerely, fix it fast, and loop in the kitchen or manager as needed. Give a real example. Managers want a server who turns a complaint into a saved guest, not one who gets flustered.",
    },
    commonMistakes: [
      "Generic 'hard worker' claims with no service example",
      "Vague on availability for nights and weekends",
      "No example of staying calm in the weeds",
      "Ignoring the specific restaurant's style and pace",
    ],
    faqs: [
      {
        question: "What do restaurant managers look for in a server interview?",
        answer:
          "Hospitality, hustle, and reliability. Managers hire servers who keep guests happy during a rush and show up for busy shifts. A specific story of handling a full section or a difficult table shows you can do both.",
      },
      {
        question: "How do I interview for a server role with no experience?",
        answer:
          "Lead with any customer-facing or fast-paced role, your genuine interest in hospitality, and your availability. Restaurants train constantly and hire for attitude, energy, and a warm manner more than for a resume.",
      },
    ],
  },
  {
    slug: "warehouse-associate",
    role: "Warehouse Associate",
    metaDescription:
      "Free AI interview question generator for warehouse associates. Get likely safety, productivity, and reliability questions with tips — no signup.",
    intro:
      "Warehouse interviews are quick and focused on reliability, safety, and productivity. Expect questions on your equipment experience, how you stay safe and accurate under a quota, and your attendance. Supervisors want associates who show up, hit their numbers, and don't cause accidents. Come ready to speak plainly about your safety record, any certifications, and your work ethic.",
    focusAreas: [
      "Picking, packing, and order-fulfillment accuracy",
      "Equipment (forklift, pallet jack) and certifications",
      "Working safely and following OSHA/warehouse rules",
      "Hitting productivity quotas and attendance reliability",
    ],
    sampleQuestion: {
      question: "How do you stay accurate and safe when you're working fast?",
      approach:
        "Describe the checks and safe habits you keep even under a quota — verifying picks, following lift protocols, never cutting corners. Supervisors want proof that speed never comes at the cost of safety or accuracy.",
    },
    commonMistakes: [
      "Any answer that treats safety as optional under pressure",
      "Vague on attendance and reliability, which warehouses prioritize",
      "Leaving out equipment certifications like forklift",
      "No sense of productivity or accuracy standards",
    ],
    faqs: [
      {
        question: "What do warehouse supervisors care about most?",
        answer:
          "Reliability, safety, and productivity. Supervisors hire associates who show up on time, hit their numbers, and don't cause accidents. Emphasize your attendance, safe habits, and any equipment certifications you hold.",
      },
      {
        question: "Do I need forklift certification for the interview?",
        answer:
          "If you have it, mention it early — many roles require or prefer it. If you don't, emphasize your reliability, safety mindset, and willingness to get certified; many warehouses train on the job for the right attitude.",
      },
    ],
  },
  {
    slug: "social-media-manager",
    role: "Social Media Manager",
    metaDescription:
      "Free AI interview question generator for social media managers. Get likely strategy, metrics, and content questions with answer tips — no signup.",
    intro:
      "Social media manager interviews test strategy, content instinct, and whether you tie social to business results. Expect questions on a campaign you grew, how you'd handle a PR moment or a troll, and your take on the brand's current accounts. Interviewers want growth numbers linked to real outcomes and a point of view. Come with metrics and a specific idea for their brand.",
    focusAreas: [
      "A campaign or account you grew, with metrics tied to business results",
      "Content strategy, calendar, and community management",
      "Handling a crisis, negative comment, or PR moment",
      "A point of view on the interviewer's own social presence",
    ],
    sampleQuestion: {
      question: "How would you handle a negative comment going viral on our page?",
      approach:
        "Show a calm crisis process: respond quickly and authentically, escalate per policy, and know when to take it offline. Interviewers want judgment under public pressure, not a defensive or ignored response.",
    },
    commonMistakes: [
      "Follower counts with no business outcome attached",
      "No point of view on the brand's actual voice or audience",
      "No plan for handling a crisis or negative comment",
      "Listing every platform instead of your strongest results",
    ],
    faqs: [
      {
        question: "Should I reference the company's own social accounts?",
        answer:
          "Yes — a sharp, specific observation about their current content plus one concrete idea to improve it shows initiative and strategic thinking, and sets you far apart from candidates who only talk in generalities.",
      },
      {
        question: "What metrics should I be ready to discuss?",
        answer:
          "Growth rate and engagement, but above all a business result the social work drove — traffic, signups, sales. Tie your follower numbers to something the company cares about rather than leading with vanity metrics.",
      },
    ],
  },
  {
    slug: "content-writer",
    role: "Content Writer",
    metaDescription:
      "Free AI interview question generator for content writers. Get likely writing, SEO, and process questions with answer tips — no signup.",
    intro:
      "Content writer interviews test your writing, your SEO awareness, and your process — often with a writing test. Expect questions on your portfolio, how you research an unfamiliar topic, how you optimize for search, and how you handle edits. Interviewers want a writer who produces content that ranks and converts, not just reads well. Come ready to discuss a piece that drove real results.",
    focusAreas: [
      "Your portfolio and a piece that drove traffic or leads",
      "SEO fundamentals and writing for search intent",
      "Researching an unfamiliar topic quickly and accurately",
      "Taking edits and adapting to a brand voice",
    ],
    sampleQuestion: {
      question: "How do you approach writing about a topic you don't know well?",
      approach:
        "Describe your research process — credible sources, expert input, outlining before drafting — and how you verify facts. Interviewers want a writer who ramps fast and gets it right, not one who fakes expertise.",
    },
    commonMistakes: [
      "A flat writing test that doesn't show real skill",
      "No portfolio link or published examples ready",
      "Ignoring SEO when the role is search-driven",
      "Describing topics written about instead of results driven",
    ],
    faqs: [
      {
        question: "Will there be a writing test?",
        answer:
          "Very often, yes — a short prompt or an edit exercise. Treat it as your best sample: research quickly, structure clearly, and match the brand's voice. It usually matters more than anything you say in the conversation.",
      },
      {
        question: "How do I show results as a content writer?",
        answer:
          "Point to a piece that ranked, drove traffic, or generated leads, with the number if you have it. If your work is newer, bring your two strongest, most relevant clips and be ready to explain the thinking behind them.",
      },
    ],
  },
  {
    slug: "digital-marketing-specialist",
    role: "Digital Marketing Specialist",
    metaDescription:
      "Free AI interview question generator for digital marketing specialists. Get likely channel, metrics, and testing questions with tips — no signup.",
    intro:
      "Digital marketing interviews test whether you drive measurable results across channels. Expect questions on campaign performance, how you'd allocate a budget, your experience with analytics and ad platforms, and a test you ran. Interviewers want numbers — CAC, ROAS, conversion — and evidence you optimize with data. Come ready to walk through a channel result and how you'd approach their funnel.",
    focusAreas: [
      "Channel results (paid search, social, email, SEO) with metrics",
      "Budget allocation and prioritizing channels",
      "Analytics and ad tools (GA4, Meta, Google Ads)",
      "A/B testing and campaign optimization",
    ],
    sampleQuestion: {
      question: "How would you allocate a limited budget across channels?",
      approach:
        "Show a data-driven approach: start from goals and past performance, weight toward what converts, and reserve a slice to test. Interviewers want disciplined prioritization backed by metrics, not spending spread evenly by habit.",
    },
    commonMistakes: [
      "Talking about 'passion for marketing' instead of results",
      "No performance metrics in a numbers-driven role",
      "Ignoring the analytics and testing side of the work",
      "Listing every channel instead of your strongest one",
    ],
    faqs: [
      {
        question: "What metrics should I be ready to discuss?",
        answer:
          "Know CAC, ROAS, conversion rate, and CTR for campaigns you ran, plus how you measured them. Interviewers push on specifics — be ready to explain what you'd optimize next and how you'd read a channel that's underperforming.",
      },
      {
        question: "Specialist or generalist — how should I position myself?",
        answer:
          "Mirror the role. If it's channel-specific (paid, SEO, email), lead with that depth; if it's a generalist role, show one strong result in each core channel. Don't claim mastery everywhere — interviewers probe what you list.",
      },
    ],
  },
];

/** Look up a single role by its URL slug. */
export function getInterviewRole(slug: string): InterviewRole | undefined {
  return interviewRoles.find((r) => r.slug === slug);
}

/** All slugs — used by generateStaticParams to prerender one page per role. */
export function getInterviewRoleSlugs(): string[] {
  return interviewRoles.map((r) => r.slug);
}

/**
 * A few sibling roles for internal linking (excludes the current one).
 *
 * Rotates the window based on the current role's position so link equity is
 * distributed across the whole set — not funneled into the first few roles the
 * way a plain `.slice(0, count)` would. Every page links onward to different
 * siblings, and wraps around the end of the list.
 */
export function getRelatedInterviewRoles(
  currentSlug: string,
  count = 4,
): InterviewRole[] {
  const others = interviewRoles.filter((r) => r.slug !== currentSlug);
  if (others.length <= count) return others;

  const index = interviewRoles.findIndex((r) => r.slug === currentSlug);
  const start = index < 0 ? 0 : index % others.length;

  // Take `count` roles starting at `start`, wrapping around the end.
  return Array.from(
    { length: count },
    (_, i) => others[(start + i) % others.length],
  );
}
