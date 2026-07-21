import {
    BriefcaseBusiness,
    FileText,
    ListChecks,
    SearchCheck,
    MessageSquareQuote,
    UserRound,
    Radar,
    type LucideIcon,
} from "lucide-react";
import {
    tools,
    TOOL_CATEGORY_ORDER,
    TOOL_CATEGORY_LABELS,
    type Tool,
    type ToolCategory,
} from "@/lib/tools/registry";

/**
 * Navigation is DERIVED from the single source of truth in
 * `src/lib/tools/registry.ts`. Add a tool there (with its category) and it
 * automatically appears in the header, home page, footer, and sidebar — no
 * second list to keep in sync. Only the lucide icon lives here, keyed by slug.
 */
const TOOL_ICONS: Record<string, LucideIcon> = {
    tracker: BriefcaseBusiness,
    "cover-letter-generator": FileText,
    "resume-bullet-generator": ListChecks,
    "ats-resume-checker": SearchCheck,
    "interview-question-generator": MessageSquareQuote,
    "linkedin-summary-generator": UserRound,
    "ai-visibility-checker": Radar,
};

// Fallback so a newly registered tool without a mapped icon still renders.
const FALLBACK_ICON: LucideIcon = SearchCheck;

export interface NavItem {
    slug: string;
    name: string;
    description: string;
    href: string;
    icon: LucideIcon;
    category: ToolCategory;
}

function toNavItem(tool: Tool): NavItem {
    return {
        slug: tool.slug,
        name: tool.name,
        description: tool.shortDescription,
        href: `/${tool.slug}`,
        icon: TOOL_ICONS[tool.slug] ?? FALLBACK_ICON,
        category: tool.category,
    };
}

/** Every tool, in registry order. */
export const navItems: NavItem[] = tools.map(toNavItem);

/** Tools grouped by category, in `TOOL_CATEGORY_ORDER`. Empty groups dropped. */
export const navGroups: {
    category: ToolCategory;
    label: string;
    items: NavItem[];
}[] = TOOL_CATEGORY_ORDER.map((category) => ({
    category,
    label: TOOL_CATEGORY_LABELS[category],
    items: navItems.filter((item) => item.category === category),
})).filter((group) => group.items.length > 0);

/**
 * Backward-compatible export. Previously a hand-maintained list; now derived
 * from the registry so it can never drift again. Includes every tool (the name
 * is historical — consumers that want only career tools should read `navGroups`).
 */
export const careerNavItems: NavItem[] = navItems;
