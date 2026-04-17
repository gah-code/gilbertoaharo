import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionLearning } from "@/content/contentful/types";
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
export const RoadmapTimeline: Story = {};

const sparseLearningSection: SectionLearning = {
  ...learningStorySection,
  sys: { ...learningStorySection.sys, id: "learning-story-sparse" },
  fields: {
    internalName: "Learning Sparse Story",
    anchorId: "learning",
    title: "Learning Roadmap (Migration Compatibility)",
    items: [
      {
        sys: { id: "learning-sparse-1", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Exploratory Domain Modeling",
          linkLabel: "Read notes",
        },
      },
      {
        sys: { id: "learning-sparse-2", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Testing Playbooks",
          status: "practicing",
          linkUrl: "https://example.com/testing-playbooks",
        },
      },
    ],
  },
};

export const MigrationCompatibility: Story = {
  args: {
    section: sparseLearningSection,
  },
};
