import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SectionEntry } from "@/content/contentful/types";
import { SectionRenderer } from "./SectionRenderer";

const sections: SectionEntry[] = [
  {
    sys: { id: "hero", contentType: { sys: { id: "sectionHero" } } },
    fields: {
      internalName: "Hero",
      anchorId: "hero",
      title: "Hero Title",
      heroStyle: "typographic",
      proofPoints: [],
      actions: [],
    },
  },
  {
    sys: { id: "timeline", contentType: { sys: { id: "sectionTimeline" } } },
    fields: {
      internalName: "Timeline",
      anchorId: "timeline",
      title: "Timeline Title",
      items: [
        {
          sys: { id: "timeline-item", contentType: { sys: { id: "timelineItem" } } },
          fields: {
            kind: "role",
            title: "Role",
          },
        },
      ],
    },
  },
  {
    sys: { id: "skills", contentType: { sys: { id: "sectionSkills" } } },
    fields: {
      internalName: "Skills",
      anchorId: "skills",
      title: "Skills Title",
      groups: [],
    },
  },
  {
    sys: { id: "projects", contentType: { sys: { id: "sectionProjects" } } },
    fields: {
      internalName: "Projects",
      anchorId: "projects",
      title: "Projects Title",
      projects: [],
    },
  },
  {
    sys: { id: "learning", contentType: { sys: { id: "sectionLearning" } } },
    fields: {
      internalName: "Learning",
      anchorId: "learning",
      title: "Learning Title",
      items: [],
    },
  },
  {
    sys: { id: "contact", contentType: { sys: { id: "sectionContact" } } },
    fields: {
      internalName: "Contact",
      anchorId: "contact",
      title: "Contact Title",
      email: "hello@example.com",
      links: [],
    },
  },
  {
    sys: { id: "footer", contentType: { sys: { id: "sectionFooter" } } },
    fields: {
      internalName: "Footer",
      brandTitle: "Footer Title",
      summary: "Footer summary text.",
      navigationGroups: [],
      socialLinks: [],
      legalText: "Copyright 2026",
      builtWithText: "Built with React and TypeScript",
    },
  },
];

describe("SectionRenderer", () => {
  it("renders every supported section id via typed map", () => {
    sections.forEach((section) => {
      render(<SectionRenderer section={section} />);
    });

    expect(screen.getByText("Hero Title")).toBeInTheDocument();
    expect(screen.getByText("Timeline Title")).toBeInTheDocument();
    expect(screen.getByText("Skills Title")).toBeInTheDocument();
    expect(screen.getByText("Projects Title")).toBeInTheDocument();
    expect(screen.getByText("Learning Title")).toBeInTheDocument();
    expect(screen.getByText("Contact Title")).toBeInTheDocument();
    expect(screen.getByText("Footer Title")).toBeInTheDocument();
  });
});
