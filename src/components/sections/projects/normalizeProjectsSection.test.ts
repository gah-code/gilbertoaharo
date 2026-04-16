import { describe, expect, it } from "vitest";
import type { SectionProjects } from "@/content/contentful/types";
import { normalizeProjectsSection } from "./normalizeProjectsSection";

const section: SectionProjects = {
  sys: { id: "projects-section", contentType: { sys: { id: "sectionProjects" } } },
  fields: {
    internalName: "Projects",
    anchorId: "projects",
    title: "Projects",
    projects: [
      {
        sys: { id: "project-1", contentType: { sys: { id: "project" } } },
        fields: {
          name: "Portfolio",
          summary: "A CMS-first portfolio",
          techStack: ["React", "TypeScript"],
          links: [
            {
              sys: { id: "project-link-1", contentType: { sys: { id: "projectLink" } } },
              fields: {
                label: "Live",
                url: "https://example.com",
                kind: "demo",
              },
            },
          ],
        },
      },
    ],
  },
};

describe("normalizeProjectsSection", () => {
  it("maps projects and links", () => {
    const normalized = normalizeProjectsSection(section);

    expect(normalized.projects).toHaveLength(1);
    expect(normalized.projects[0]?.techStack).toEqual(["React", "TypeScript"]);
    expect(normalized.projects[0]?.links[0]?.href).toBe("https://example.com");
  });
});
