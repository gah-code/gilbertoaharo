import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SectionSkills } from "@/content/contentful/types";
import { SkillsSection } from "./SkillsSection";

const skillsSection: SectionSkills = {
  sys: { id: "skills-test", contentType: { sys: { id: "sectionSkills" } } },
  fields: {
    internalName: "Skills Test",
    anchorId: "skills",
    title: "Skills",
    groups: [
      {
        sys: { id: "skills-group-1", contentType: { sys: { id: "skillGroup" } } },
        fields: {
          label: "Frontend",
          skills: [
            {
              sys: { id: "skill-1", contentType: { sys: { id: "skill" } } },
              fields: {
                name: "React",
                level: "core",
              },
            },
          ],
        },
      },
    ],
  },
};

const noGroupsSkillsSection: SectionSkills = {
  ...skillsSection,
  sys: { ...skillsSection.sys, id: "skills-test-no-groups" },
  fields: {
    ...skillsSection.fields,
    groups: [],
  },
};

const noSkillsInGroupSection: SectionSkills = {
  ...skillsSection,
  sys: { ...skillsSection.sys, id: "skills-test-no-skills" },
  fields: {
    ...skillsSection.fields,
    groups: [
      {
        sys: { id: "skills-group-empty", contentType: { sys: { id: "skillGroup" } } },
        fields: {
          label: "Platform",
          skills: [],
        },
      },
    ],
  },
};

describe("SkillsSection", () => {
  it("renders grouped skills when content exists", () => {
    render(<SkillsSection section={skillsSection} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders section-level empty-state status when no groups exist", () => {
    render(<SkillsSection section={noGroupsSkillsSection} />);

    expect(
      screen.getByText("Skills content is being refreshed. Check back soon."),
    ).toHaveAttribute("role", "status");
  });

  it("renders group-level empty-state status when a group has no skills", () => {
    render(<SkillsSection section={noSkillsInGroupSection} />);

    expect(screen.getByText("Skill details are being updated.")).toHaveAttribute(
      "role",
      "status",
    );
  });
});
