import type { Meta, StoryObj } from "@storybook/react-vite";
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
