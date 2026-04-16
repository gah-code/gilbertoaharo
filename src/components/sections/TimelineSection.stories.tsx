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

const meta: Meta<typeof TimelineSection> = {
  title: "Sections/TimelineSection",
  component: TimelineSection,
  tags: ["autodocs"],
  args: {
    section: timelineSection,
  },
};

export default meta;
type Story = StoryObj<typeof TimelineSection>;

export const Default: Story = {};
