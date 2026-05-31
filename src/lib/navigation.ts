import {
    BriefcaseBusiness,
    FileText,
    ListChecks,
    SearchCheck,
    MessageSquareQuote,
    UserRound,
} from "lucide-react";

export const careerNavItems = [
    {
        slug: "tracker",
        name: "Job Application Tracker",
        description: "Track every application with AI tools built in",
        href: "/tracker",
        icon: BriefcaseBusiness,
    },
    {
        slug: "cover-letter-generator",
        name: "AI Cover Letter Generator",
        description: "Tailored cover letters in 10 seconds",
        href: "/cover-letter-generator",
        icon: FileText,
    },
    {
        slug: "resume-bullet-generator",
        name: "Resume Bullet Generator",
        description: "Turn duties into achievement-focused bullets",
        href: "/resume-bullet-generator",
        icon: ListChecks,
    },
    {
        slug: "ats-resume-checker",
        name: "ATS Resume Checker",
        description: "See if your resume passes ATS before you apply",
        href: "/ats-resume-checker",
        icon: SearchCheck,
    },
    {
        slug: "interview-question-generator",
        name: "Interview Question Generator",
        description: "Know what they'll ask before you walk in",
        href: "/interview-question-generator",
        icon: MessageSquareQuote,
    },
    {
        slug: "linkedin-summary-generator",
        name: "LinkedIn Summary Generator",
        description: "Write a professional About section instantly",
        href: "/linkedin-summary-generator",
        icon: UserRound,
    },
] as const;
