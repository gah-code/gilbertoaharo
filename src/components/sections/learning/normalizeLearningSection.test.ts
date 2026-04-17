import { describe, expect, it } from "vitest";
import type { SectionLearning } from "@/content/contentful/types";
import { normalizeLearningSection } from "./normalizeLearningSection";

const section: SectionLearning = {
  sys: { id: "learning-section", contentType: { sys: { id: "sectionLearning" } } },
  fields: {
    internalName: "Learning",
    anchorId: "learning",
    eyebrow: "Learning",
    title: "Learning",
    intro: "In-progress topics and practical experiments.",
    items: [
      {
        sys: { id: "learning-item-1", contentType: { sys: { id: "learningItem" } } },
        fields: {
          internalName: "Accessibility Patterns",
          topic: "Accessibility",
          description: "Improving keyboard workflows",
          status: "shipping",
          focusAreas: [" Keyboard UX ", "A11y", ""],
          linkLabel: "Read notes",
          linkUrl: "https://example.com/notes",
        },
      },
      {
        sys: { id: "learning-item-2", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Experimentation Playbooks",
          linkLabel: "Read draft",
        },
      },
      {
        sys: { id: "learning-item-3", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Storybook Contracts",
          status: "practicing",
          focusAreas: [],
          linkUrl: "https://example.com/storybook",
        },
      },
    ],
  },
};

const fallbackSection: SectionLearning = {
  sys: { id: "learning-fallback", contentType: { sys: { id: "sectionLearning" } } },
  fields: {
    internalName: "Learning Fallback",
    anchorId: "",
    title: "",
    items: undefined,
  },
};

describe("normalizeLearningSection", () => {
  it("normalizes additive fields, status labels, and action gating", () => {
    const normalized = normalizeLearningSection(section);
    const firstItem = normalized.items[0];
    const secondItem = normalized.items[1];
    const thirdItem = normalized.items[2];

    expect(normalized.anchorId).toBe("learning");
    expect(normalized.eyebrow).toBe("Learning");
    expect(normalized.intro).toBe("In-progress topics and practical experiments.");

    expect(firstItem?.key).toBe("learning-section-accessibility-patterns");
    expect(firstItem?.status).toBe("shipping");
    expect(firstItem?.statusLabel).toBe("Shipping");
    expect(firstItem?.focusAreas).toEqual(["Keyboard UX", "A11y"]);
    expect(firstItem?.action).toEqual({
      href: "https://example.com/notes",
      label: "Read notes",
    });
    expect(firstItem?.roadmapIndex).toBe(0);
    expect(firstItem?.isLast).toBe(false);

    expect(secondItem?.status).toBe("exploring");
    expect(secondItem?.statusLabel).toBe("Exploring");
    expect(secondItem?.focusAreas).toEqual([]);
    expect(secondItem?.action).toBeUndefined();
    expect(secondItem?.roadmapIndex).toBe(1);
    expect(secondItem?.isLast).toBe(false);

    expect(thirdItem?.key).toBe("learning-section-storybook-contracts");
    expect(thirdItem?.status).toBe("practicing");
    expect(thirdItem?.statusLabel).toBe("Practicing");
    expect(thirdItem?.action).toBeUndefined();
    expect(thirdItem?.roadmapIndex).toBe(2);
    expect(thirdItem?.isLast).toBe(true);
  });

  it("defaults missing arrays and fallback values safely", () => {
    const normalized = normalizeLearningSection(fallbackSection);

    expect(normalized.id).toBe("learning-fallback");
    expect(normalized.anchorId).toBe("learning-fallback");
    expect(normalized.title).toBe("Learning");
    expect(normalized.items).toEqual([]);
  });

  it("preserves item order as roadmap order", () => {
    const normalized = normalizeLearningSection(section);

    expect(normalized.items.map((item) => item.topic)).toEqual([
      "Accessibility",
      "Experimentation Playbooks",
      "Storybook Contracts",
    ]);
    expect(normalized.items.map((item) => item.roadmapIndex)).toEqual([0, 1, 2]);
  });
});
