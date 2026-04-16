import { describe, expect, it } from "vitest";
import type { SectionTimeline } from "@/content/contentful/types";
import { normalizeTimelineSection } from "./normalizeTimelineSection";

const section: SectionTimeline = {
  sys: { id: "timeline-section", contentType: { sys: { id: "sectionTimeline" } } },
  fields: {
    internalName: "Timeline",
    anchorId: "timeline",
    title: "Experience",
    eyebrow: "Career",
    intro: "Selected milestones.",
    items: [
      {
        sys: { id: "item-1", contentType: { sys: { id: "timelineItem" } } },
        fields: {
          kind: "role",
          title: "Senior Engineer",
          organization: "Example Inc",
          location: "Remote",
          startDateValue: "2024-01-15",
          endDateValue: "not-a-date",
          summary: "Built scalable components",
          highlights: ["Built normalization layer"],
          tags: ["React", "TS"],
          action: {
            label: "See work",
            href: "https://example.com",
            variant: "secondary",
            openInNewTab: true,
          },
        },
      },
    ],
  },
};

describe("normalizeTimelineSection", () => {
  it("produces stable view model with fallbacks", () => {
    const normalized = normalizeTimelineSection(section);
    const item = normalized.items[0];

    expect(normalized.anchorId).toBe("timeline");
    expect(item?.organizationLine).toBe("Example Inc · Remote");
    expect(item?.dateRange).toContain("2024");
    expect(item?.action?.variant).toBe("secondary");
    expect(item?.mediaSrc).toBeTruthy();
  });
});
