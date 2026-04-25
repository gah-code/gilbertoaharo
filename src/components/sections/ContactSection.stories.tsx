import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionContact } from "@/content/contentful/types";
import { ContactSection } from "./ContactSection";
import { contactStorySection } from "./sectionStoryFixtures";

const meta: Meta<typeof ContactSection> = {
  title: "Sections/ContactSection",
  component: ContactSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ContactSection stories validate hierarchy, CTA grouping, and fallback behavior for sparse contact-link states.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Fallback variant when only the primary email CTA is available.",
      },
    },
  },
  args: {
    section: emailOnlyContactSection,
  },
};

const linkDenseContactSection: SectionContact = {
  ...contactStorySection,
  sys: { ...contactStorySection.sys, id: "contact-story-link-dense" },
  fields: {
    ...contactStorySection.fields,
    links: [
      ...(contactStorySection.fields.links ?? []),
      {
        sys: { id: "social-link-3", contentType: { sys: { id: "socialLink" } } },
        fields: {
          label: "Resume",
          url: "https://example.com/resume",
        },
      },
      {
        sys: { id: "social-link-4", contentType: { sys: { id: "socialLink" } } },
        fields: {
          label: "Newsletter",
          url: "https://example.com/newsletter",
        },
      },
    ],
  },
};

export const LinkDense: Story = {
  parameters: {
    docs: {
      description: {
        story: "Wrap behavior check for larger contact-link sets without changing section composition.",
      },
    },
  },
  args: {
    section: linkDenseContactSection,
  },
};
