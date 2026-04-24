import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SectionTimeline } from "@/content/contentful/types";
import { TimelineSection } from "./TimelineSection";

const timelineSection: SectionTimeline = {
  sys: { id: "timeline-test", contentType: { sys: { id: "sectionTimeline" } } },
  fields: {
    internalName: "Timeline Test",
    anchorId: "timeline",
    title: "Timeline",
    items: [
      {
        sys: { id: "timeline-item-1", contentType: { sys: { id: "timelineItem" } } },
        fields: {
          kind: "role",
          title: "Lead Engineer",
          summary: "Worked across systems and interface delivery.",
          highlights: ["Standardized section contracts"],
          tags: ["React"],
        },
      },
    ],
  },
};

const emptyTimelineSection: SectionTimeline = {
  ...timelineSection,
  sys: { ...timelineSection.sys, id: "timeline-test-empty" },
  fields: {
    ...timelineSection.fields,
    items: [],
  },
};

describe("TimelineSection", () => {
  it("renders timeline cards when items exist", () => {
    render(<TimelineSection section={timelineSection} />);

    expect(screen.getByText("Lead Engineer")).toBeInTheDocument();
    expect(screen.queryByText(/Timeline details are being refreshed/i)).not.toBeInTheDocument();
  });

  it("renders an explicit empty-state status when timeline items are absent", () => {
    render(<TimelineSection section={emptyTimelineSection} />);

    expect(
      screen.getByText("Timeline details are being refreshed. Check back soon."),
    ).toHaveAttribute("role", "status");
  });
});
