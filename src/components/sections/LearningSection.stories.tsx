import type { Meta, StoryObj } from "@storybook/react-vite";
import { staticLandingPage } from "@/content/static/fixtures";
import type { SectionLearning } from "@/content/contentful/types";
import { LearningSection } from "./LearningSection";

type LearningSectionItem = NonNullable<SectionLearning["fields"]["items"]>[number];

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
  parameters: {
    docs: {
      description: {
        component:
          "Responsive roadmap contract: stacked on small, two-column grid on medium, horizontal journey on large, and wider-breathing horizontal journey on XL.",
      },
    },
  },
  args: {
    section: learningSection,
  },
};

export default meta;
type Story = StoryObj<typeof LearningSection>;

export const Default: Story = {};

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

function makeLearningItem(
  id: string,
  fields: LearningSectionItem["fields"],
): LearningSectionItem {
  return {
    sys: { id, contentType: { sys: { id: "learningItem" } } },
    fields,
  };
}

const denseLearningSection: SectionLearning = {
  ...learningSection,
  sys: { ...learningSection.sys, id: "learning-story-dense" },
  fields: {
    ...learningSection.fields,
    title: "Learning Roadmap (Dense Validation)",
    items: [
      ...(learningSection.fields.items ?? []).map((item, index) => ({
        ...item,
        sys: { ...item.sys, id: `${item.sys.id}-dense-${index}` },
      })),
      makeLearningItem("learning-dense-extra-1", {
        topic: "Release discipline checklists",
        description:
          "Codifying lightweight pre-PR and pre-release checks that scale with maintenance-focused changes.",
        status: "practicing",
        focusAreas: ["Release QA", "Checklists", "Operational Hygiene"],
        roadmapLabel: "Phase F",
        sortOrder: 50,
        linkLabel: "View release checklist",
        linkUrl: "https://example.com/release-checklist",
      }),
      makeLearningItem("learning-dense-extra-2", {
        topic: "Integration smoke-test strategy",
        description:
          "Evaluating narrow smoke paths that catch regressions without introducing brittle high-cost suites.",
        status: "exploring",
        focusAreas: ["Smoke Tests", "CI", "Reliability"],
        roadmapLabel: "Post-v2",
        sortOrder: 60,
      }),
    ],
  },
};

export const DenseRoadmap: Story = {
  args: {
    section: denseLearningSection,
  },
  parameters: {
    docs: {
      description: {
        story: "Dense roadmap state used to validate long-card rhythm, heading wrap behavior, and action spacing under higher item counts.",
      },
    },
  },
};

const badgeHeavyLearningSection: SectionLearning = {
  ...learningSection,
  sys: { ...learningSection.sys, id: "learning-story-badge-heavy" },
  fields: {
    ...learningSection.fields,
    title: "Learning Roadmap (Badge Heavy)",
    items: (learningSection.fields.items ?? []).map((item, index) => ({
      ...item,
      sys: { ...item.sys, id: `${item.sys.id}-badges-${index}` },
      fields: {
        ...item.fields,
        focusAreas: [
          "Information Architecture",
          "Headless CMS Architecture",
          "Component-Driven Development",
          "Design System Governance",
          "Release QA Discipline",
        ],
      },
    })),
  },
};

export const BadgeHeavy: Story = {
  args: {
    section: badgeHeavyLearningSection,
  },
  parameters: {
    docs: {
      description: {
        story: "Badge-heavy state for validating long multi-word chip wrapping, heading hierarchy, and readability from medium through XL breakpoints.",
      },
    },
  },
};

export const MediumGridContract: Story = {
  args: {
    section: longCopyLearningSection,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Resize canvas to medium widths (about 768px-1279px): roadmap should stay in a readable two-column contract instead of horizontal equal-width cards.",
      },
    },
  },
};

export const LargeJourneyLayout: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Resize canvas to large widths (about 1280px-1535px): roadmap should transition to horizontal journey layout without card compression.",
      },
    },
  },
};

export const XLWideJourney: Story = {
  args: {
    section: badgeHeavyLearningSection,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Resize canvas to XL widths (1536px+): horizontal journey remains, with wider Learning section/container breathing room and more comfortable card spacing.",
      },
    },
  },
};

export const WideViewportIntent: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Compatibility alias for wide-screen QA; prefer `LargeJourneyLayout` and `XLWideJourney` for explicit breakpoint validation.",
      },
    },
  },
};
