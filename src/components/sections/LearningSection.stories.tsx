import type { Meta, StoryObj } from "@storybook/react-vite";
import { LearningSection } from "./LearningSection";
import { learningStorySection } from "./sectionStoryFixtures";

const meta: Meta<typeof LearningSection> = {
  title: "Sections/LearningSection",
  component: LearningSection,
  tags: ["autodocs"],
  args: {
    section: learningStorySection,
  },
};

export default meta;
type Story = StoryObj<typeof LearningSection>;

export const Default: Story = {};
