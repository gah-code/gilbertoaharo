import { describe, expect, it } from "vitest";
import type { SectionSkills } from "@/content/contentful/types";
import { normalizeSkillsSection } from "./normalizeSkillsSection";

const additiveSection: SectionSkills = {
  sys: { id: "skills-section", contentType: { sys: { id: "sectionSkills" } } },
  fields: {
    internalName: "Skills",
    anchorId: "skills",
    eyebrow: "Capabilities",
    title: "Skills",
    intro: "Core capabilities across product delivery and content systems.",
    groups: [
      {
        sys: { id: "group-platform", contentType: { sys: { id: "skillGroup" } } },
        fields: {
          internalName: "Platform Group",
          label: "Platform Engineering",
          description: "Systems, tooling, and implementation reliability.",
          iconKey: "platform",
          skills: [
            {
              sys: { id: "skill-react", contentType: { sys: { id: "skill" } } },
              fields: {
                internalName: "React Skill",
                name: "React",
                level: "expert",
                keywords: ["hooks", "composition"],
              },
            },
            {
              sys: { id: "skill-vite", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "Vite",
                level: "core",
              },
            },
            {
              sys: { id: "skill-css", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "CSS Systems",
                level: "strong",
              },
            },
            {
              sys: { id: "skill-typescript", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "TypeScript",
                level: "active",
              },
            },
            {
              sys: { id: "skill-ux", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "UX Writing",
                level: "expanding",
              },
            },
            {
              sys: { id: "skill-modeling", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "Content Modeling",
                keywords: [" schemas ", ""],
              },
            },
          ],
        },
      },
      {
        sys: { id: "group-content", contentType: { sys: { id: "skillGroup" } } },
        fields: {
          label: "Content Operations",
        },
      },
    ],
  },
};

const fallbackSection: SectionSkills = {
  sys: { id: "skills-fallback", contentType: { sys: { id: "sectionSkills" } } },
  fields: {
    anchorId: "",
    title: "",
    groups: [
      {
        sys: { id: "", contentType: { sys: { id: "skillGroup" } } },
        fields: {
          label: "",
          skills: [
            {
              sys: { id: "", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "",
                level: "working",
              },
            },
          ],
        },
      },
    ],
  },
};

describe("normalizeSkillsSection", () => {
  it("normalizes additive fields and legacy/new level values", () => {
    const normalized = normalizeSkillsSection(additiveSection);
    const firstGroup = normalized.groups[0];

    expect(normalized.anchorId).toBe("skills");
    expect(normalized.eyebrow).toBe("Capabilities");
    expect(normalized.intro).toBe(
      "Core capabilities across product delivery and content systems.",
    );
    expect(firstGroup?.description).toBe("Systems, tooling, and implementation reliability.");
    expect(firstGroup?.iconKey).toBe("platform");
    expect(firstGroup?.skills[0]?.level).toBe("core");
    expect(firstGroup?.skills[0]?.levelLabel).toBe("Core");
    expect(firstGroup?.skills[1]?.level).toBe("core");
    expect(firstGroup?.skills[1]?.levelLabel).toBe("Core");
    expect(firstGroup?.skills[2]?.level).toBe("active");
    expect(firstGroup?.skills[2]?.levelLabel).toBe("Active");
    expect(firstGroup?.skills[3]?.level).toBe("active");
    expect(firstGroup?.skills[3]?.levelLabel).toBe("Active");
    expect(firstGroup?.skills[4]?.level).toBe("expanding");
    expect(firstGroup?.skills[4]?.levelLabel).toBe("Expanding");
    expect(firstGroup?.skills[5]?.level).toBe("expanding");
    expect(firstGroup?.skills[5]?.levelLabel).toBe("Expanding");
    expect(firstGroup?.skills[5]?.keywords).toEqual(["schemas"]);
    expect(normalized.groups[1]?.skills).toEqual([]);
  });

  it("defaults missing arrays and produces stable fallback keys", () => {
    const normalizedA = normalizeSkillsSection(fallbackSection);
    const normalizedB = normalizeSkillsSection(fallbackSection);
    const groupA = normalizedA.groups[0];
    const skillA = groupA?.skills[0];
    const groupB = normalizedB.groups[0];
    const skillB = groupB?.skills[0];

    expect(normalizedA.anchorId).toBe("skills-fallback");
    expect(normalizedA.title).toBe("Skills");
    expect(groupA?.label).toBe("Skill Group");
    expect(groupA?.id).toBeTruthy();
    expect(groupA?.key).toBe(groupB?.key);
    expect(skillA?.name).toBe("Untitled skill");
    expect(skillA?.level).toBe("expanding");
    expect(skillA?.levelLabel).toBe("Expanding");
    expect(skillA?.id).toBeTruthy();
    expect(skillA?.key).toBe(skillB?.key);
    expect(skillA?.keywords).toEqual([]);
  });
});
