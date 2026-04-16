import type { Meta, StoryObj } from "@storybook/react-vite";
import { staticLandingPage } from "@/content/static/fixtures";
import type { SectionHero } from "@/content/contentful/types";
import { HeroSection } from "./HeroSection";

const heroSection = staticLandingPage.sections.find(
  (section): section is SectionHero => section.sys.contentType.sys.id === "sectionHero",
);

if (!heroSection) {
  throw new Error("Hero section fixture is required for storybook.");
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
