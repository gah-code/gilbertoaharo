import { describe, expect, it } from "vitest";
import type { SectionLearning } from "@/content/contentful/types";
import { normalizeLearningSection } from "./normalizeLearningSection";

const section: SectionLearning = {
  sys: { id: "learning-section", contentType: { sys: { id: "sectionLearning" } } },
  fields: {
    internalName: "Learning",
    anchorId: "learning",
    eyebrow: "Learning",
    title: "Learning Roadmap",
    intro: "Current roadmap priorities.",
    items: [
      {
        sys: { id: "learning-item-a", contentType: { sys: { id: "learningItem" } } },
        fields: {
          internalName: "Search Modeling Program",
          topic: "Search-native content modeling",
          description: "Modeling entries for retrieval quality and taxonomy reuse.",
          status: "shipping",
          focusAreas: [" Retrieval ", "", "Taxonomy", "   "],
          roadmapLabel: "Q2 2025",
          sortOrder: 2,
          linkLabel: "Read modeling notes",
          linkUrl: " https://example.com/learning/search-modeling ",
        },
      },
      {
        sys: { id: "learning-item-b", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Design system foundations",
          description: "Refining primitives and section-level contracts.",
          roadmapLabel: "Q3 2025",
          sortOrder: 1,
          linkLabel: "Checklist",
        },
      },
      {
        sys: { id: "learning-item-c", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Storybook workflow",
          status: "practicing",
          focusAreas: ["Storybook"],
          linkUrl: "https://example.com/learning/storybook-workflow",
        },
      },
      {
        sys: { id: "learning-item-d", contentType: { sys: { id: "learningItem" } } },
        fields: {
          internalName: "Advanced TypeScript Patterns",
          topic: "Advanced TypeScript patterns",
          status: "exploring",
          focusAreas: ["Type Inference", "Unions"],
          roadmapLabel: "Q1 2026",
          sortOrder: 4,
          isNextUp: true,
          linkLabel: "Track roadmap",
          linkUrl: "https://example.com/learning/typescript-roadmap",
        },
      },
    ],
  },
};

const missingItemsSection: SectionLearning = {
  sys: { id: "learning-empty", contentType: { sys: { id: "sectionLearning" } } },
  fields: {
    internalName: "Learning Empty",
    anchorId: "",
    title: "",
    items: undefined,
  },
};

const sortOrderCollisionSection: SectionLearning = {
  sys: { id: "learning-collision", contentType: { sys: { id: "sectionLearning" } } },
  fields: {
    internalName: "Learning Collision",
    anchorId: "learning-collision",
    title: "Learning Collision",
    items: [
      {
        sys: { id: "learning-collision-1", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Fallback First",
          roadmapLabel: "Fallback",
        },
      },
      {
        sys: { id: "learning-collision-2", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Explicit First",
          roadmapLabel: "Explicit",
          sortOrder: 1,
        },
      },
      {
        sys: { id: "learning-collision-3", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Explicit Second",
          roadmapLabel: "Explicit",
          sortOrder: 2,
        },
      },
    ],
  },
};

describe("normalizeLearningSection", () => {
  it("normalizes section and roadmap item fields with expected defaults", () => {
    const normalized = normalizeLearningSection(section);
    const [firstItem, secondItem, thirdItem, fourthItem] = normalized.items;

    // section-level fields
    expect(normalized.anchorId).toBe("learning");
    expect(normalized.eyebrow).toBe("Learning");
    expect(normalized.title).toBe("Learning Roadmap");
    expect(normalized.intro).toBe("Current roadmap priorities.");

    // item ordering and sortOrder behavior
    expect(normalized.items.map((item) => item.topic)).toEqual([
      "Design system foundations",
      "Search-native content modeling",
      "Storybook workflow",
      "Advanced TypeScript patterns",
    ]);
    expect(normalized.items.map((item) => item.sortOrder)).toEqual([1, 2, 3, 4]);
    expect(normalized.items.map((item) => item.roadmapIndex)).toEqual([0, 1, 2, 3]);
    expect(normalized.items.map((item) => item.isLast)).toEqual([
      false,
      false,
      false,
      true,
    ]);

    // key behavior: fallback to topic and prefer internalName when present
    expect(firstItem?.key).toBe("learning-section-design-system-foundations");
    expect(secondItem?.key).toBe("learning-section-search-modeling-program");

    // status defaults and labels
    expect(firstItem?.status).toBe("exploring");
    expect(firstItem?.statusLabel).toBe("Exploring");
    expect(secondItem?.status).toBe("shipping");
    expect(secondItem?.statusLabel).toBe("Shipping");
    expect(thirdItem?.status).toBe("practicing");
    expect(thirdItem?.statusLabel).toBe("Practicing");

    // roadmap metadata
    expect(firstItem?.roadmapLabel).toBe("Q3 2025");
    expect(secondItem?.roadmapLabel).toBe("Q2 2025");
    expect(thirdItem?.roadmapLabel).toBe("Step 3");
    expect(fourthItem?.roadmapLabel).toBe("Q1 2026");
    expect(fourthItem?.isNextUp).toBe(true);
    expect(firstItem?.isNextUp).toBe(false);

    // focusAreas defaults + falsey filtering
    expect(firstItem?.focusAreas).toEqual([]);
    expect(secondItem?.focusAreas).toEqual(["Retrieval", "Taxonomy"]);

    // action gating
    expect(secondItem?.action).toEqual({
      label: "Read modeling notes",
      href: "https://example.com/learning/search-modeling",
    });
    expect(firstItem?.action).toBeUndefined();
    expect(thirdItem?.action).toBeUndefined();
  });

  it("defaults items to an empty list and uses section fallbacks safely", () => {
    const normalized = normalizeLearningSection(missingItemsSection);

    expect(normalized.id).toBe("learning-empty");
    expect(normalized.anchorId).toBe("learning-empty");
    expect(normalized.title).toBe("Learning");
    expect(normalized.items).toEqual([]);
  });

  it("uses index+1 as sortOrder fallback for missing values", () => {
    const normalized = normalizeLearningSection(section);
    const item = normalized.items.find((entry) => entry.topic === "Storybook workflow");

    expect(item?.sortOrder).toBe(3);
    expect(item?.roadmapLabel).toBe("Step 3");
  });

  it("sorts explicit sortOrder entries ahead of fallback entries when values collide", () => {
    const normalized = normalizeLearningSection(sortOrderCollisionSection);

    expect(normalized.items.map((item) => item.topic)).toEqual([
      "Explicit First",
      "Fallback First",
      "Explicit Second",
    ]);
    expect(normalized.items.map((item) => item.sortOrder)).toEqual([1, 1, 2]);
  });
});
