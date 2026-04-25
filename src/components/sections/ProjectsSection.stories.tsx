import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionProjects } from "@/content/contentful/types";
import { ProjectsSection } from "./ProjectsSection";
import { projectsStorySection } from "./sectionStoryFixtures";

const meta: Meta<typeof ProjectsSection> = {
  title: "Sections/ProjectsSection",
  component: ProjectsSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ProjectsSection stories focus on slider behavior, card hierarchy, and realistic content variability (single, empty, long copy, missing media).",
      },
    },
  },
  args: {
    section: projectsStorySection,
  },
};

export default meta;
type Story = StoryObj<typeof ProjectsSection>;

export const Default: Story = {};

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

const emptyProjectsSection: SectionProjects = {
  ...projectsStorySection,
  sys: { ...projectsStorySection.sys, id: "projects-story-empty" },
  fields: {
    ...projectsStorySection.fields,
    title: "Projects",
    intro: "A realistic empty-state variant for CMS-first preview workflows.",
    projects: [],
  },
};

export const EmptyState: Story = {
  args: {
    section: emptyProjectsSection,
  },
};

const longCopyProjectsSection: SectionProjects = {
  ...projectsStorySection,
  sys: { ...projectsStorySection.sys, id: "projects-story-long-copy" },
  fields: {
    ...projectsStorySection.fields,
    projects: (projectsStorySection.fields.projects ?? []).map((project, index) => ({
      ...project,
      sys: { ...project.sys, id: `${project.sys.id}-long-${index}` },
      fields: {
        ...project.fields,
        name:
          index === 0
            ? "Cross-Channel Editorial Platform Consolidation and Delivery Program"
            : project.fields.name,
        tagline:
          index === 0
            ? "Long-form metadata and summary stress test for rhythm and scan quality"
            : project.fields.tagline,
        summary:
          index === 0
            ? "Unified fragmented publishing workflows across multiple teams while preserving existing campaign schedules, compatibility with legacy page models, and stable delivery velocity through additive migration sequencing."
            : project.fields.summary,
        thumbnail: index === 1 ? undefined : project.fields.thumbnail,
      },
    })),
  },
};

export const LongCopyAndMissingMedia: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stress case for dense metadata, longer summaries, and missing media fallback inside the same project set.",
      },
    },
  },
  args: {
    section: longCopyProjectsSection,
  },
};
