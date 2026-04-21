import type { Meta, StoryObj } from "@storybook/react-vite";
import { staticLandingPage } from "@/content/static/fixtures";
import type { SectionLearning } from "@/content/contentful/types";
import { LearningSection } from "./LearningSection";

const learningSection = staticLandingPage.sections.find(
  (section): section is SectionLearning =>
    section.sys.contentType.sys.id === "sectionLearning",
);

if (!learningSection) {
  throw new Error("Learning section fixture is required for storybook.");
}

const meta: Meta<typeof LearningSection> = {
  title: "Sections/LearningSection",
  component: LearningSection,
  tags: ["autodocs"],
  args: {
    section: learningSection,
  },
};

export default meta;
type Story = StoryObj<typeof LearningSection>;

export const Default: Story = {};
export const RoadmapTimeline: Story = {};

const sparseLearningSection: SectionLearning = {
  ...learningSection,
  sys: { ...learningSection.sys, id: "learning-story-sparse" },
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
