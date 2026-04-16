import { describe, expect, it } from "vitest";
import type { SectionSkills } from "@/content/contentful/types";
import { normalizeSkillsSection } from "./normalizeSkillsSection";

const section: SectionSkills = {
  sys: { id: "skills-section", contentType: { sys: { id: "sectionSkills" } } },
  fields: {
    internalName: "Skills",
    anchorId: "skills",
    title: "Skills",
    groups: [
      {
        sys: { id: "group-1", contentType: { sys: { id: "skillGroup" } } },
        fields: {
          label: "Frontend",
          skills: [
            {
              sys: { id: "skill-1", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "React",
                level: "expert",
                keywords: ["hooks", "state"],
              },
            },
          ],
        },
      },
    ],
  },
};

describe("normalizeSkillsSection", () => {
  it("normalizes groups and skill labels", () => {
    const normalized = normalizeSkillsSection(section);

    expect(normalized.anchorId).toBe("skills");
    expect(normalized.groups[0]?.skills[0]?.levelLabel).toBe("EXPERT");
    expect(normalized.groups[0]?.skills[0]?.keywords).toEqual(["hooks", "state"]);
  });
});
