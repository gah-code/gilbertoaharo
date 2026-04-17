import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionProjects } from "@/content/contentful/types";
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
export const Slider: Story = {};
export const RichCards: Story = {};

const singleProjectSection: SectionProjects = {
  ...projectsStorySection,
  sys: { ...projectsStorySection.sys, id: "projects-story-single" },
  fields: {
    ...projectsStorySection.fields,
    title: "Featured Project",
    projects: (projectsStorySection.fields.projects ?? []).slice(0, 1),
  },
};

export const SingleProject: Story = {
  args: {
    section: singleProjectSection,
  },
};
