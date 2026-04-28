import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/metadata";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import ColorPickerHexConverterTool from "@/components/tool-ui/ColorPickerHexConverterTool";

const SLUG = "color-picker-hex-converter";

export const metadata: Metadata = buildMetadata({
  title: "Color Picker & HEX Converter – Convert HEX, RGB & HSL Colors Online",
  description:
    "Pick colors and convert between HEX, RGB, and HSL instantly with our free color picker tool. Fast and easy for designers and developers.",
  keywords: [
    "color picker",
    "hex converter",
    "hex to rgb",
    "rgb to hsl",
    "color converter online",
    "web color tool",
  ],
  slug: SLUG,
});

const seoSections = [
  {
    heading: "What Is a Color Picker & HEX Converter?",
    body: "A color picker and converter helps designers and developers choose a color visually and translate it into technical formats used in code and design systems. The most common formats are HEX, RGB, and HSL. HEX is popular for CSS and design handoff, RGB is useful for digital color channels, and HSL is often easier when adjusting hue, saturation, or lightness. Instead of manually calculating conversions, this tool gives you instant values and one-click copy actions. That saves time when building landing pages, app interfaces, marketing graphics, and component libraries. It is a practical utility for anyone working with digital colors in websites, products, or brand assets.",
  },
  {
    heading: "How to Use the Color Converter",
    body: [
      "Choose a color with the picker input.",
      "Optionally type a valid HEX value in the input field.",
      "View the generated HEX, RGB, and HSL values instantly.",
      "Copy any format with a single click for use in your project.",
      "Repeat until you find the exact color tone you need.",
    ],
  },
  {
    heading: "Core Features",
    body: "This tool is built for speed and clarity. You get a native color picker for quick visual selection, live conversion into three common formats, and copy buttons for each value. The large color preview helps validate your choice before using it in production. Developers can paste directly into CSS, Tailwind custom variables, or component styles. Designers can share exact values with teammates to avoid interpretation differences. The interface is intentionally minimal so the main task stays front and center: pick, convert, copy, and move on. It works well for quick tasks and repeated workflows where accurate color communication matters across design and engineering.",
  },
  {
    heading: "Understanding HEX, RGB, and HSL",
    body: "HEX values represent red, green, and blue channels in hexadecimal notation, usually as #RRGGBB. RGB expresses the same channels in decimal form, such as rgb(59, 130, 246). HSL represents color by hue angle plus saturation and lightness percentages, such as hsl(217, 91%, 60%). Each format has strengths depending on your workflow. HEX is compact and common in style guides, RGB is useful for image and canvas logic, and HSL is ideal when creating color variants because you can adjust lightness and saturation more intuitively. Knowing how to switch between these formats makes color systems easier to maintain and scale.",
  },
  {
    heading: "Benefits for Designers and Developers",
    body: "Designers benefit from quick format conversion during handoff, mood board creation, and brand refinement. Developers benefit when implementing UI states like hover, disabled, and active variants that require controlled color adjustments. Product teams can maintain consistency by storing shared tokens in a single format and converting when needed. Content teams can also use accurate color values in campaign assets to keep visual identity aligned. By reducing manual conversion steps, this tool minimizes mistakes and speeds up execution. In modern workflows where multiple tools and contributors touch the same visual system, instant conversion supports cleaner collaboration and more consistent final output.",
  },
  {
    heading: "Common Use Cases",
    body: "Frontend engineers use this converter to tune button colors, backgrounds, borders, and text contrasts during UI implementation. Designers use it to align Figma tokens with production-ready CSS values. Marketers use consistent brand colors across landing pages, email blocks, and ad creatives. Theme builders use HSL outputs to generate dark mode variants and accessible color ramps. Plugin and extension developers use RGB values for canvas rendering and chart styling. Educators and students use it to understand digital color models in practice. Across all these use cases, instant copy functionality helps reduce friction between choosing a color and applying it in real work.",
  },
  {
    heading: "Tips for Better Color Workflows",
    body: "Always check contrast when selecting text and background combinations, especially for accessibility compliance. Start with a base brand color, then create lighter and darker variants in HSL for consistent UI states. Store approved colors in a shared design token file to avoid drift across pages and campaigns. When collaborating across teams, include both human-friendly labels and exact values, such as Primary Blue — #3B82F6. Use this tool during QA to verify that implemented colors match design references. Fast conversion tools are most valuable when paired with a clear system, because repeatable standards keep your interface cohesive as your product grows.",
  },
];

const faqs = [
  {
    question: "What color formats does this tool support?",
    answer:
      "It supports HEX, RGB, and HSL. You can pick a color and instantly view all three formats.",
  },
  {
    question: "Can I copy color values with one click?",
    answer:
      "Yes. Each format has its own copy button so you can quickly paste values into code or design tools.",
  },
  {
    question: "Is this color converter useful for CSS?",
    answer:
      "Yes. HEX, RGB, and HSL are all CSS-friendly formats, so you can paste values directly into stylesheets or inline styles.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No. The tool runs directly in your browser with no installation or signup needed.",
  },
  {
    question: "Can I use it on mobile devices?",
    answer:
      "Yes. The interface is responsive and works on mobile, tablet, and desktop browsers.",
  },
];

export default function ColorPickerHexConverterPage() {
  const tool = getToolBySlug(SLUG)!;
  const relatedTools = getToolsBySlugs([
    "word-counter",
    "json-formatter",
    "qr-code-generator",
    "ai-text-summarizer",
  ]);

  return (
    <ToolPageLayout tool={tool} relatedTools={relatedTools} faqs={faqs} seoSections={seoSections}>
      <ColorPickerHexConverterTool />
    </ToolPageLayout>
  );
}
