import { describe, expect, it } from "vitest";
import type { Article, Asset, SectionProjects } from "@/content/contentful/types";
import { normalizeProjectsSection } from "./normalizeProjectsSection";

const linkedArticle: Article = {
  sys: { id: "article-1", contentType: { sys: { id: "article" } } },
  fields: {
    internalName: "Platform Refresh Notes",
    slug: "platform-refresh-notes",
    title: "Platform Refresh Notes",
    body: { nodeType: "document", content: [] },
  },
};

const makeAsset = (id: string, url: string, title?: string): Asset => ({
  sys: { id },
  fields: {
    title,
    file: { url, fileName: `${id}.jpg`, contentType: "image/jpeg" },
  },
});

const section: SectionProjects = {
  sys: { id: "projects-section", contentType: { sys: { id: "sectionProjects" } } },
  fields: {
    internalName: "Projects",
    anchorId: "projects",
    eyebrow: "Selected Work",
    title: "Projects",
    intro: "A few highlighted projects.",
    projects: [
      {
        sys: { id: "project-1", contentType: { sys: { id: "project" } } },
        fields: {
          internalName: "Portfolio Platform",
          name: "Portfolio Platform",
          tagline: "A maintainable section architecture",
          summary: "A CMS-first portfolio implementation.",
          role: "Lead Engineer",
          period: "2024",
          featured: true,
          thumbnail: makeAsset("asset-1", "//images.example.com/p1.jpg", "Project One Cover"),
          thumbnailAlt: "Portfolio dashboard preview",
          highlights: [" Faster releases ", "", "Shared contracts"],
          techStack: ["React", "", " TypeScript "],
          links: [
            {
              sys: { id: "project-link-1", contentType: { sys: { id: "projectLink" } } },
              fields: {
                internalName: "Article Link",
                label: "Read more",
                href: "https://example.com/will-be-ignored",
                url: "https://example.com/legacy",
                kind: "article",
                article: linkedArticle,
                analyticsLabel: "portfolio-notes",
              },
            },
            {
              sys: { id: "project-link-2", contentType: { sys: { id: "projectLink" } } },
              fields: {
                label: "Demo",
                href: "https://example.com/demo",
                kind: "demo",
              },
            },
            {
              sys: { id: "project-link-3", contentType: { sys: { id: "projectLink" } } },
              fields: {
                label: "Case Study (Custom Variant)",
                href: "https://example.com/case-study",
                kind: "case-study",
                variant: "text",
              },
            },
            {
              sys: { id: "project-link-4", contentType: { sys: { id: "projectLink" } } },
              fields: {
                label: "Contact Team",
                href: "/contact",
                kind: "other",
                ariaLabel: "Contact the team about this project",
              },
            },
            {
              sys: { id: "project-link-5", contentType: { sys: { id: "projectLink" } } },
              fields: {
                label: "Blank URL",
                kind: "other",
                url: "   ",
              },
            },
            {
              sys: { id: "project-link-6", contentType: { sys: { id: "projectLink" } } },
              fields: {
                label: "External Demo in Same Tab",
                href: "https://example.com/demo-inline",
                kind: "demo",
                openInNewTab: false,
              },
            },
          ],
        },
      },
      {
        sys: { id: "project-2", contentType: { sys: { id: "project" } } },
        fields: {
          name: "Project Two",
          thumbnail: makeAsset("asset-2", "//images.example.com/p2.jpg", "Project Two Cover"),
        },
      },
      {
        sys: { id: "project-3", contentType: { sys: { id: "project" } } },
        fields: {
          name: "Project Three",
          thumbnail: makeAsset("asset-3", "//images.example.com/p3.jpg"),
        },
      },
    ],
  },
};

const fallbackSection = {
  sys: { id: "projects-fallback", contentType: { sys: { id: "sectionProjects" } } },
  fields: {
    internalName: "Fallback",
    anchorId: "",
    title: "",
    projects: undefined,
  },
} as unknown as SectionProjects;

describe("normalizeProjectsSection", () => {
  it("normalizes additive section/project fields and action semantics", () => {
    const normalized = normalizeProjectsSection(section);
    const firstProject = normalized.projects[0];
    const secondProject = normalized.projects[1];
    const thirdProject = normalized.projects[2];

    expect(normalized.anchorId).toBe("projects");
    expect(normalized.eyebrow).toBe("Selected Work");
    expect(normalized.intro).toBe("A few highlighted projects.");

    expect(firstProject?.featured).toBe(true);
    expect(firstProject?.thumbnailSrc).toBe("https://images.example.com/p1.jpg");
    expect(firstProject?.thumbnailAlt).toBe("Portfolio dashboard preview");
    expect(firstProject?.highlights).toEqual(["Faster releases", "Shared contracts"]);
    expect(firstProject?.techStack).toEqual(["React", "TypeScript"]);
    expect(firstProject?.actions).toHaveLength(5);
    expect(firstProject?.actions[0]?.href).toBe("/articles/platform-refresh-notes");
    expect(firstProject?.actions[0]?.label).toBe("Read about Portfolio Platform");
    expect(firstProject?.actions[0]?.variant).toBe("primary");
    expect(firstProject?.actions[0]?.openInNewTab).toBe(false);
    expect(firstProject?.actions[1]?.variant).toBe("secondary");
    expect(firstProject?.actions[1]?.openInNewTab).toBe(true);
    expect(firstProject?.actions[2]?.variant).toBe("text");
    expect(firstProject?.actions[3]?.openInNewTab).toBe(false);
    expect(firstProject?.actions[3]?.ariaLabel).toBe(
      "Contact the team about this project",
    );
    expect(firstProject?.actions[4]?.openInNewTab).toBe(false);
    expect(firstProject?.actions.some((action) => action.label === "Blank URL")).toBe(false);

    expect(secondProject?.featured).toBe(false);
    expect(secondProject?.highlights).toEqual([]);
    expect(secondProject?.techStack).toEqual([]);
    expect(secondProject?.actions).toEqual([]);
    expect(secondProject?.thumbnailAlt).toBe("Project Two Cover");

    expect(thirdProject?.thumbnailAlt).toBe("Project Three");
  });

  it("defaults missing arrays and fallback values safely", () => {
    const normalized = normalizeProjectsSection(fallbackSection);

    expect(normalized.id).toBe("projects-fallback");
    expect(normalized.anchorId).toBe("projects-fallback");
    expect(normalized.title).toBe("Projects");
    expect(normalized.projects).toEqual([]);
  });
});
