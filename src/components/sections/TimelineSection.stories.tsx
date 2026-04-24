import type { Meta, StoryObj } from "@storybook/react-vite";
import { staticLandingPage } from "@/content/static/fixtures";
import type { SectionTimeline } from "@/content/contentful/types";
import { TimelineSection } from "./TimelineSection";

const timelineSection = staticLandingPage.sections.find(
  (section): section is SectionTimeline =>
    section.sys.contentType.sys.id === "sectionTimeline",
);

if (!timelineSection) {
  throw new Error("Timeline section fixture is required for storybook.");
}
const requiredTimelineSection: SectionTimeline = timelineSection;
const [firstTimelineItem] = requiredTimelineSection.fields.items;
if (!firstTimelineItem) {
  throw new Error("Timeline section fixture requires at least one timeline item.");
}

const meta: Meta<typeof TimelineSection> = {
  title: "Sections/TimelineSection",
  component: TimelineSection,
  tags: ["autodocs"],
  args: {
    section: requiredTimelineSection,
  },
};

export default meta;
type Story = StoryObj<typeof TimelineSection>;

export const Default: Story = {};

function withTimelineOverrides(
  sectionId: string,
  overrides: Partial<SectionTimeline["fields"]>,
): SectionTimeline {
  return {
    ...requiredTimelineSection,
    sys: {
      ...requiredTimelineSection.sys,
      id: sectionId,
    },
    fields: {
      ...requiredTimelineSection.fields,
      ...overrides,
    },
  };
}

export const SparseContent: Story = {
  args: {
    section: withTimelineOverrides("timeline-story-sparse", {
      intro: "A compact timeline variant with sparse optional fields.",
      items: [
        {
          ...firstTimelineItem,
          sys: {
            ...firstTimelineItem.sys,
            id: "timeline-sparse-1",
          },
          fields: {
            ...firstTimelineItem.fields,
            context: undefined,
            summary: undefined,
            tags: [],
            highlights: [],
            media: undefined,
            mediaImage: undefined,
            action: undefined,
          },
        },
      ],
    }),
  },
};

export const EmptyState: Story = {
  args: {
    section: withTimelineOverrides("timeline-story-empty", {
      items: [],
    }),
  },
};

export const LongCopyStress: Story = {
  args: {
    section: withTimelineOverrides("timeline-story-long-copy", {
      items: [
        {
          ...firstTimelineItem,
          sys: {
            ...firstTimelineItem.sys,
            id: "timeline-long-copy-1",
          },
          fields: {
            ...firstTimelineItem.fields,
            title:
              "Lead Frontend Engineer for Cross-Platform Editorial and Commerce Experience Architecture",
            summary:
              "Drove long-horizon migration planning, section contract hardening, and rollout governance across multiple publishing teams while maintaining continuity for in-flight campaigns and partner integrations.",
            highlights: [
              "Aligned design, engineering, and editorial release cadence while preserving migration safety.",
              "Reduced regressions with normalization-first section rendering and stricter contract defaults.",
              "Improved developer onboarding by documenting section ownership and fallback behavior.",
            ],
            tags: [
              "Migration Strategy",
              "Cross-Functional Delivery",
              "Editorial Systems",
              "Release Governance",
            ],
          },
        },
      ],
    }),
  },
};
