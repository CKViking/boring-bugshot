export const demoExamples = [
  {
    slug: "weak-cta",
    number: "01",
    title: "The invisible conversion path",
    shortTitle: "Weak CTA",
    type: "Design",
    language: "English",
    viewport: "Desktop · 1440 × 900",
    description: "A polished SaaS landing page whose primary action is vague, pale, and no stronger than the surrounding links.",
    context: "The main goal of this page is to get visitors to start a free trial.",
  },
  {
    slug: "mobile-overflow",
    number: "02",
    title: "The purchase action that does not fit",
    shortTitle: "Mobile overflow",
    type: "Automatic",
    language: "English",
    viewport: "Mobile · 390 × 844",
    description: "A product page with desktop-sized content, clipped navigation, and an add-to-cart button that escapes the mobile viewport.",
    context: "Mobile product page at 390 pixels width. The purchase button should be fully usable.",
  },
  {
    slug: "unlabelled-form",
    number: "03",
    title: "The form that loses its meaning",
    shortTitle: "Unlabelled newsletter",
    type: "Accessibility",
    language: "English",
    viewport: "Desktop · 1200 × 800",
    description: "An editorial newsletter card that relies on placeholders, weak contrast, and a generic submit action.",
    context: "Visitors should understand what they are signing up for and submit the form confidently.",
  },
  {
    slug: "checkout-error",
    number: "04",
    title: "The checkout dead end",
    shortTitle: "Unhelpful error",
    type: "UX",
    language: "English",
    viewport: "Desktop · 1200 × 850",
    description: "A completed checkout form shows a technical error without identifying the affected field or explaining how to recover.",
    context: "The user tried to complete checkout after entering their address.",
  },
] as const;

export type DemoSlug = (typeof demoExamples)[number]["slug"];

export function getDemoExample(slug: string) {
  return demoExamples.find((example) => example.slug === slug);
}
