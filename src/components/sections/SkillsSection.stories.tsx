import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkillsSection } from "./SkillsSection";
import { skillsStorySection } from "./sectionStoryFixtures";

const meta: Meta<typeof SkillsSection> = {
  title: "Sections/SkillsSection",
  component: SkillsSection,
  tags: ["autodocs"],
  args: {
    section: skillsStorySection,
  },
};

export default meta;
type Story = StoryObj<typeof SkillsSection>;

export const Default: Story = {};
