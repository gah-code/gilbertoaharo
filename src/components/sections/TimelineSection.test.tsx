import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Asset, SectionTimeline, TimelineItem } from "@/content/contentful/types";
import { TimelineSection } from "./TimelineSection";

const contentfulTimelineUrl =
  "https://images.ctfassets.net/test-space-id/test-asset-timeline/test-timeline-image.png";

function makeAsset(id: string, url: string, title = "Timeline media"): Asset {
  return {
    sys: { id },
    fields: {
      title,
      file: {
        url,
        fileName: `${id}.png`,
        contentType: "image/png",
      },
    },
  };
}

function makeTimelineItem(
  id: string,
  title: string,
  mediaUrl?: string,
): TimelineItem {
  return {
    sys: { id, contentType: { sys: { id: "timelineItem" } } },
    fields: {
      kind: "role",
      title,
      summary: "Worked across systems and interface delivery.",
      highlights: ["Standardized section contracts"],
      tags: ["React"],
      media: mediaUrl ? makeAsset(`${id}-media`, mediaUrl) : undefined,
      mediaAlt: `${title} media`,
    },
  };
}

function makeTimelineSection(items: TimelineItem[]): SectionTimeline {
  return {
    sys: { id: "timeline-test", contentType: { sys: { id: "sectionTimeline" } } },
    fields: {
      internalName: "Timeline Test",
      anchorId: "timeline",
      title: "Timeline",
      items,
    },
  };
}

function parseSrcSet(srcSet: string | null) {
  return (srcSet ?? "").split(", ").map((entry) => {
    const [url, descriptor] = entry.split(" ");
    return {
      url: url ?? "",
      descriptor: descriptor ?? "",
      params: new URL(url ?? "").searchParams,
    };
  });
}

const timelineSection = makeTimelineSection([
  makeTimelineItem("timeline-item-1", "Lead Engineer"),
]);

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

  it("renders transformed responsive attributes for Contentful timeline media", () => {
    render(
      <TimelineSection
        section={makeTimelineSection([
          makeTimelineItem("timeline-item-contentful", "Contentful Timeline", contentfulTimelineUrl),
        ])}
      />,
    );

    const image = screen.getByRole("img", { name: "Contentful Timeline media" });
    const src = image.getAttribute("src");
    const srcSetEntries = parseSrcSet(image.getAttribute("srcset"));

    expect(src).toBeTruthy();
    expect(new URL(src ?? "").searchParams.get("w")).toBe("800");
    expect(new URL(src ?? "").searchParams.get("q")).toBe("75");
    expect(new URL(src ?? "").searchParams.get("fm")).toBe("webp");
    expect(image).toHaveAttribute("sizes", "(min-width: 768px) 316px, 90vw");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(srcSetEntries.map((entry) => entry.descriptor)).toEqual([
      "320w",
      "480w",
      "640w",
      "800w",
    ]);
    expect(srcSetEntries.map((entry) => entry.params.get("q"))).toEqual([
      "75",
      "75",
      "75",
      "75",
    ]);
    expect(srcSetEntries.map((entry) => entry.params.get("fm"))).toEqual([
      "webp",
      "webp",
      "webp",
      "webp",
    ]);
  });

  it("preserves non-Contentful timeline media behavior without responsive attributes", () => {
    const imageUrl = "https://example.com/timeline.png";
    render(
      <TimelineSection
        section={makeTimelineSection([
          makeTimelineItem("timeline-item-local", "Local Timeline", imageUrl),
        ])}
      />,
    );

    const image = screen.getByRole("img", { name: "Local Timeline media" });

    expect(image).toHaveAttribute("src", imageUrl);
    expect(image).not.toHaveAttribute("srcset");
    expect(image).not.toHaveAttribute("sizes");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
  });
});
