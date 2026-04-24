import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SectionLearning } from "@/content/contentful/types";
import { LearningSection } from "./LearningSection";

const sectionWithItems: SectionLearning = {
  sys: { id: "learning-test", contentType: { sys: { id: "sectionLearning" } } },
  fields: {
    internalName: "Learning Test",
    anchorId: "learning",
    title: "Learning",
    items: [
      {
        sys: { id: "learning-item-1", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Section Contract Hardening",
          description: "Incremental improvements across section behavior and responsiveness.",
          status: "practicing",
        },
      },
    ],
  },
};

const sectionWithoutItems: SectionLearning = {
  ...sectionWithItems,
  sys: { ...sectionWithItems.sys, id: "learning-test-empty" },
  fields: {
    ...sectionWithItems.fields,
    items: [],
  },
};

describe("LearningSection", () => {
  it("renders roadmap items when data is available", () => {
    render(<LearningSection section={sectionWithItems} />);

    expect(screen.getByText("Section Contract Hardening")).toBeInTheDocument();
    expect(screen.queryByText(/Learning roadmap updates are in progress/i)).not.toBeInTheDocument();
  });

  it("renders an explicit empty status when no roadmap items are available", () => {
    render(<LearningSection section={sectionWithoutItems} />);

    expect(
      screen.getByText("Learning roadmap updates are in progress. Check back soon."),
    ).toHaveAttribute("role", "status");
  });
});
