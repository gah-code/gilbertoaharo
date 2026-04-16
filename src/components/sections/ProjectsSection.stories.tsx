import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProjectsSection } from "./ProjectsSection";
import { projectsStorySection } from "./sectionStoryFixtures";

const meta: Meta<typeof ProjectsSection> = {
  title: "Sections/ProjectsSection",
  component: ProjectsSection,
  tags: ["autodocs"],
  args: {
    section: projectsStorySection,
  },
};

export default meta;
type Story = StoryObj<typeof ProjectsSection>;

export const Default: Story = {};
