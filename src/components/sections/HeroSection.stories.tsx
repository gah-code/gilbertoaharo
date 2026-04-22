import type { Meta, StoryObj } from "@storybook/react-vite";
import { staticLandingPage } from "@/content/static/fixtures";
import type { LinkAction, SectionHero } from "@/content/contentful/types";
import { HeroSection } from "./HeroSection";

const baseHeroSection = staticLandingPage.sections.find(
  (section): section is SectionHero => section.sys.contentType.sys.id === "sectionHero",
);

if (!baseHeroSection) {
  throw new Error("Hero section fixture is required for storybook.");
}
const heroSection = baseHeroSection;

function makeHeroAction(id: string, label: string, href: string, variant: "primary" | "secondary" | "text"): LinkAction {
  return {
    sys: { id, contentType: { sys: { id: "linkAction" } } },
    fields: {
      label,
      href,
      variant,
    },
  };
}

function withHeroOverrides(
  sectionId: string,
  overrides: Partial<SectionHero["fields"]>,
): SectionHero {
  return {
    ...heroSection,
    sys: {
      ...heroSection.sys,
      id: sectionId,
    },
    fields: {
      ...heroSection.fields,
      ...overrides,
    },
  };
}

const meta: Meta<typeof HeroSection> = {
  title: "Sections/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  args: {
    section: heroSection,
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {};

export const TypographicOnly: Story = {
  args: {
    section: withHeroOverrides("section-hero-typographic", {
      heroStyle: "typographic",
      heroImage: undefined,
      heroImageAlt: undefined,
      avatarImage: undefined,
      avatarImageAlt: undefined,
    }),
  },
};

export const AvatarBased: Story = {
  args: {
    section: withHeroOverrides("section-hero-avatar", {
      heroStyle: "avatar",
      avatarImage: heroSection.fields.heroImage,
      avatarImageAlt: "Portrait of Gilberto Haro",
    }),
  },
};

export const MinimalContent: Story = {
  args: {
    section: withHeroOverrides("section-hero-minimal", {
      eyebrow: undefined,
      name: "Gilberto Haro",
      title: "Scalable frontend systems for content-heavy teams.",
      lead: undefined,
      body: undefined,
      proofPoints: [],
      actions: [
        makeHeroAction(
          "hero-action-minimal-primary",
          "View Projects",
          "#projects",
          "primary",
        ),
      ],
      heroStyle: "typographic",
      heroImage: undefined,
      heroImageAlt: undefined,
      avatarImage: undefined,
      avatarImageAlt: undefined,
    }),
  },
};

export const LongCopyStressTest: Story = {
  args: {
    section: withHeroOverrides("section-hero-long-copy", {
      lead:
        "I work with product, design, and editorial teams to align interface architecture, structured content, and practical delivery workflows so systems remain maintainable under real release pressure.",
      body:
        "The goal is operational clarity: component contracts that hold up over time, content models that support both present and future publishing needs, and implementation patterns that let teams ship confidently without rebuilding foundational UI every quarter.",
      proofPoints: [
        "Design systems and component architecture with clear contracts",
        "Contentful, AEM, and structured content workflows across teams",
        "Frontend systems built for scale, clarity, and long-term maintainability",
        "This extra proof point should be clipped by the normalizer",
      ],
      actions: [
        makeHeroAction(
          "hero-action-long-primary",
          "View Projects",
          "#projects",
          "primary",
        ),
        makeHeroAction(
          "hero-action-long-secondary",
          "About Me",
          "#timeline",
          "secondary",
        ),
        makeHeroAction(
          "hero-action-long-third",
          "Extra CTA",
          "#learning",
          "text",
        ),
      ],
    }),
  },
};
