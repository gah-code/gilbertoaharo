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

const emptyLearningSection: SectionLearning = {
  ...learningSection,
  sys: { ...learningSection.sys, id: "learning-story-empty" },
  fields: {
    ...learningSection.fields,
    title: "Learning (No Active Items)",
    items: [],
  },
};

export const EmptyState: Story = {
  args: {
    section: emptyLearningSection,
  },
};

const longCopyLearningSection: SectionLearning = {
  ...learningSection,
  sys: { ...learningSection.sys, id: "learning-story-long-copy" },
  fields: {
    ...learningSection.fields,
    items: (learningSection.fields.items ?? []).map((item, index) => ({
      ...item,
      sys: { ...item.sys, id: `${item.sys.id}-long-${index}` },
      fields: {
        ...item.fields,
        topic:
          index === 0
            ? "Building resilient taxonomy-driven content models for mixed editorial and product surfaces"
            : item.fields.topic,
        description:
          index === 0
            ? "Documenting how additive schema migrations, editorial workflows, and section contracts stay aligned as teams ship frequent updates across multiple channels."
            : item.fields.description,
      },
    })),
  },
};

export const LongCopyStress: Story = {
  args: {
    section: longCopyLearningSection,
  },
};
