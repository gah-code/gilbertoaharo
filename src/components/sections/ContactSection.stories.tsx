import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionContact } from "@/content/contentful/types";
import { ContactSection } from "./ContactSection";
import { contactStorySection } from "./sectionStoryFixtures";

const meta: Meta<typeof ContactSection> = {
  title: "Sections/ContactSection",
  component: ContactSection,
  tags: ["autodocs"],
  args: {
    section: contactStorySection,
  },
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {};

const emailOnlyContactSection: SectionContact = {
  ...contactStorySection,
  sys: { ...contactStorySection.sys, id: "contact-story-email-only" },
  fields: {
    ...contactStorySection.fields,
    intro: "Email is the best path for collaboration requests right now.",
    links: [],
  },
};

export const EmailOnly: Story = {
  args: {
    section: emailOnlyContactSection,
  },
};
