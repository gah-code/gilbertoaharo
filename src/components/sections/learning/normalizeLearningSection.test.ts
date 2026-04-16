import { describe, expect, it } from "vitest";
import type { SectionLearning } from "@/content/contentful/types";
import { normalizeLearningSection } from "./normalizeLearningSection";

const section: SectionLearning = {
  sys: { id: "learning-section", contentType: { sys: { id: "sectionLearning" } } },
  fields: {
    internalName: "Learning",
    anchorId: "learning",
    title: "Learning",
    items: [
      {
        sys: { id: "learning-item-1", contentType: { sys: { id: "learningItem" } } },
        fields: {
          topic: "Accessibility",
          description: "Improving keyboard workflows",
          status: "shipping",
          linkLabel: "Read notes",
          linkUrl: "https://example.com/notes",
        },
      },
    ],
  },
};

describe("normalizeLearningSection", () => {
  it("maps learning status to badge tones", () => {
    const normalized = normalizeLearningSection(section);

    expect(normalized.items[0]?.statusTone).toBe("success");
    expect(normalized.items[0]?.linkLabel).toBe("Read notes");
  });
});
