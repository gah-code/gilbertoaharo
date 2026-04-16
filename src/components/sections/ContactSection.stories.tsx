import type { Meta, StoryObj } from "@storybook/react-vite";
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
