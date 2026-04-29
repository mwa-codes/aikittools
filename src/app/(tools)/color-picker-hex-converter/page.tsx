import type { Metadata } from "next";
import { getToolBySlug, getToolsBySlugs } from "@/lib/tools/registry";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import ColorPickerHexConverterTool from "@/components/tool-ui/ColorPickerHexConverterTool";

const SLUG = "color-picker-hex-converter";

export const metadata: Metadata = {
  title: "Color Picker & HEX Converter – RGB, HSL Tool Free",
  description:
    "Pick any color and instantly convert between HEX, RGB, and HSL formats. Free online color picker for designers and developers. No signup required.",
  alternates: { canonical: "https://www.aikittools.com/color-picker-hex-converter" },
  openGraph: {
    title: "Color Picker & HEX Converter – RGB, HSL Tool Free",
    description:
      "Pick any color and instantly convert between HEX, RGB, and HSL formats. Free online color picker for designers and developers. No signup required.",
    url: "https://www.aikittools.com/color-picker-hex-converter",
    siteName: "AI Kit Tools",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const seoSections = [
  {
    heading: "What is the Color Picker & HEX Converter?",
    body: "The Color Picker and HEX Converter is a straightforward color code converter for CSS and anyone working with digital color. Pick a color from the visual palette to find color code from color picker input and instantly see its value in HEX, RGB, and HSL — including quick HEX to RGB converter online output and HSL color picker for web design workflows. HEX is the standard shorthand used in most stylesheets, RGB gives you precise channel control, and HSL makes it intuitive to create lighter or darker variants of the same hue. Instead of mentally converting between formats or hunting through documentation, this tool gives you all three values in one place with copy buttons for each.",
  },
  {
    heading: "How to Use This Tool",
    body: [
      "Open the color picker and click or drag to select a color visually.",
      "Alternatively, type a known HEX value directly into the input field.",
      "All three formats — HEX, RGB, and HSL — update simultaneously.",
      "Click the copy icon next to whichever format you need.",
      "Use the large color preview swatch to confirm your selection before copying.",
    ],
  },
  {
    heading: "Why Use Color Picker & HEX Converter Online?",
    body: "Free to use with no account or signup needed. Converts between all three major CSS color formats instantly without any page reloads, making it easy to convert color values for Tailwind CSS classes and custom themes. Everything runs in your browser, so it's lightweight and fast even on mobile — useful during design reviews, client calls, or quick CSS edits when you don't have your usual design tools open. No extensions, no installations, just open the page and start picking colors.",
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
  {
    question: "How do I convert a HEX color code to RGB for CSS?",
    answer:
      "Paste your HEX code into the input field and the tool instantly shows the equivalent RGB values. For example, #3B82F6 converts to rgb(59, 130, 246). Copy the RGB value directly into your CSS stylesheet without any manual calculation.",
  },
  {
    question: "What is HSL and when should I use it over HEX or RGB?",
    answer:
      "HSL stands for Hue, Saturation, and Lightness. It is more intuitive than HEX or RGB when you want to adjust a color — for example, making it lighter or more saturated — because each property controls one visual aspect. Many designers prefer HSL when building color palettes or theming systems in CSS.",
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
