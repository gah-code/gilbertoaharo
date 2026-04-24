import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionFooter } from "@/content/contentful/types";
import { FooterSection } from "../FooterSection";
import { footerStorySection } from "../sectionStoryFixtures";

const meta: Meta<typeof FooterSection> = {
  title: "Sections/FooterSection",
  component: FooterSection,
  tags: ["autodocs"],
  args: {
    section: footerStorySection,
  },
};

export default meta;
type Story = StoryObj<typeof FooterSection>;

export const Default: Story = {};

const minimalFooterSection: SectionFooter = {
  ...footerStorySection,
  sys: { ...footerStorySection.sys, id: "footer-story-minimal" },
  fields: {
    ...footerStorySection.fields,
    summary: "A minimal footer variant for sparse-content preview.",
    navigationGroups: [],
    socialLinks: [],
  },
};

export const Minimal: Story = {
  args: {
    section: minimalFooterSection,
  },
};
