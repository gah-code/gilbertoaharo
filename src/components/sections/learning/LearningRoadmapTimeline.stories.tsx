import type { Meta, StoryObj } from "@storybook/react-vite";
import { LearningRoadmapTimeline } from "./LearningRoadmapTimeline";
import type { NormalizedLearningItem } from "./normalizeLearningSection";

type RoadmapSeed = {
  topic: string;
  description?: string;
  status: NormalizedLearningItem["status"];
  focusAreas: string[];
  roadmapLabel: string;
  sortOrder: number;
  isNextUp?: boolean;
  action?: NormalizedLearningItem["action"];
};

const STATUS_LABELS: Record<
  NormalizedLearningItem["status"],
  NormalizedLearningItem["statusLabel"]
> = {
  exploring: "Exploring",
  practicing: "Practicing",
  shipping: "Shipping",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildRoadmapItems(seeds: RoadmapSeed[]): NormalizedLearningItem[] {
  const sorted = [...seeds].sort((a, b) => a.sortOrder - b.sortOrder);

  return sorted.map((seed, index) => {
    const key = `learning-story-${slugify(seed.topic)}`;

    return {
      id: key,
      key,
      topic: seed.topic,
      description: seed.description,
      status: seed.status,
      statusLabel: STATUS_LABELS[seed.status],
      focusAreas: seed.focusAreas,
      roadmapLabel: seed.roadmapLabel,
      sortOrder: seed.sortOrder,
      isNextUp: Boolean(seed.isNextUp),
      action: seed.action,
      roadmapIndex: index,
      isLast: index === sorted.length - 1,
    };
  });
}

const defaultRoadmapItems = buildRoadmapItems([
  {
    topic: "Search-native content modeling",
    description:
      "Modeling content for retrieval quality, reusable taxonomy, and query-friendly section structures.",
    status: "shipping",
    focusAreas: ["Content Architecture", "Search Semantics", "Taxonomy"],
    roadmapLabel: "Q2 2025",
    sortOrder: 1,
    action: {
      label: "Read modeling notes",
      href: "https://example.com/learning/search-native-content-modeling",
    },
  },
  {
    topic: "Design system foundations",
    description:
      "Hardening primitive contracts, tokens, and section composition rules for long-term consistency.",
    status: "practicing",
    focusAreas: ["Tokens", "Primitives", "Section Contracts"],
    roadmapLabel: "Q3 2025",
    sortOrder: 2,
    action: {
      label: "View system checklist",
      href: "https://example.com/learning/design-system-foundations",
    },
  },
  {
    topic: "Storybook workflow",
    description:
      "Standardizing stories, interaction tests, and review flows to improve UI delivery quality.",
    status: "practicing",
    focusAreas: ["Storybook", "Interaction Tests", "Review Workflow"],
    roadmapLabel: "Q4 2025",
    sortOrder: 3,
    action: {
      label: "Read Storybook workflow notes",
      href: "https://example.com/learning/storybook-workflow",
    },
  },
  {
    topic: "Advanced TypeScript patterns",
    description:
      "Applying advanced type patterns to strengthen section boundaries and migration safety.",
    status: "exploring",
    focusAreas: ["Type Inference", "Discriminated Unions", "Type-Level Utilities"],
    roadmapLabel: "Q1 2026",
    sortOrder: 4,
    isNextUp: true,
    action: {
      label: "Track TypeScript roadmap",
      href: "https://example.com/learning/advanced-typescript-patterns",
    },
  },
]);

const meta: Meta<typeof LearningRoadmapTimeline> = {
  title: "Sections/LearningRoadmapTimeline",
  component: LearningRoadmapTimeline,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "var(--space-6)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    items: defaultRoadmapItems,
  },
};

export default meta;
type Story = StoryObj<typeof LearningRoadmapTimeline>;

export const Default: Story = {};

export const MissingOptionalFields: Story = {
  args: {
    items: buildRoadmapItems([
      {
        topic: "Search-native content modeling",
        status: "shipping",
        focusAreas: [],
        roadmapLabel: "Q2 2025",
        sortOrder: 1,
      },
      {
        topic: "Design system foundations",
        description: "Working through primitive contract alignment.",
        status: "practicing",
        focusAreas: [],
        roadmapLabel: "Q3 2025",
        sortOrder: 2,
      },
      {
        topic: "Storybook workflow",
        status: "practicing",
        focusAreas: ["Storybook"],
        roadmapLabel: "Q4 2025",
        sortOrder: 3,
      },
      {
        topic: "Advanced TypeScript patterns",
        status: "exploring",
        focusAreas: [],
        roadmapLabel: "Q1 2026",
        sortOrder: 4,
        isNextUp: true,
      },
    ]),
  },
};

export const MobilePreview: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "26rem", margin: "0 auto", padding: "var(--space-4)" }}>
        <Story />
      </div>
    ),
  ],
};

export const DenseRoadmap: Story = {
  args: {
    items: buildRoadmapItems([
      {
        topic: "Search-native content modeling",
        status: "shipping",
        focusAreas: ["Content Architecture"],
        roadmapLabel: "Q2 2025",
        sortOrder: 1,
      },
      {
        topic: "Design system foundations",
        status: "practicing",
        focusAreas: ["Tokens", "Primitives"],
        roadmapLabel: "Q3 2025",
        sortOrder: 2,
      },
      {
        topic: "Storybook workflow",
        status: "practicing",
        focusAreas: ["Storybook", "Tests"],
        roadmapLabel: "Q4 2025",
        sortOrder: 3,
      },
      {
        topic: "Advanced TypeScript patterns",
        status: "exploring",
        focusAreas: ["Type Inference", "Unions"],
        roadmapLabel: "Q1 2026",
        sortOrder: 4,
        isNextUp: true,
      },
      {
        topic: "Authoring workflow telemetry",
        status: "exploring",
        focusAreas: ["Metrics", "DX"],
        roadmapLabel: "Q2 2026",
        sortOrder: 5,
      },
      {
        topic: "Schema governance automation",
        status: "exploring",
        focusAreas: ["Automation", "Validation"],
        roadmapLabel: "Q3 2026",
        sortOrder: 6,
      },
    ]),
  },
};
