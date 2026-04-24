import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SectionProjects } from "@/content/contentful/types";
import { ProjectsSection } from "./ProjectsSection";

const singleProjectSection: SectionProjects = {
  sys: { id: "projects-test", contentType: { sys: { id: "sectionProjects" } } },
  fields: {
    internalName: "Projects Test",
    anchorId: "projects",
    title: "Projects",
    projects: [
      {
        sys: { id: "project-test-1", contentType: { sys: { id: "project" } } },
        fields: {
          name: "Project One",
          summary: "Single project card for fallback checks.",
          links: [],
        },
      },
    ],
  },
};

const emptyProjectsSection: SectionProjects = {
  ...singleProjectSection,
  sys: { ...singleProjectSection.sys, id: "projects-test-empty" },
  fields: {
    ...singleProjectSection.fields,
    projects: [],
  },
};

const multiProjectsSection: SectionProjects = {
  ...singleProjectSection,
  sys: { ...singleProjectSection.sys, id: "projects-test-multi" },
  fields: {
    ...singleProjectSection.fields,
    projects: [
      ...(singleProjectSection.fields.projects ?? []),
      {
        sys: { id: "project-test-2", contentType: { sys: { id: "project" } } },
        fields: {
          name: "Project Two",
          summary: "Second project to activate slider controls.",
          links: [],
        },
      },
    ],
  },
};

describe("ProjectsSection", () => {
  it("renders an explicit status message when no projects are available", () => {
    render(<ProjectsSection section={emptyProjectsSection} />);

    expect(
      screen.getByText("Project highlights are being refreshed. Check back soon."),
    ).toHaveAttribute("role", "status");
  });

  it("uses a non-slider single-card layout when only one project exists", () => {
    render(<ProjectsSection section={singleProjectSection} />);

    expect(screen.queryByRole("button", { name: "Previous" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Featured project")).toBeInTheDocument();
  });

  it("shows slider controls when multiple projects are available", () => {
    render(<ProjectsSection section={multiProjectsSection} />);

    expect(
      screen.getByRole("button", { name: "Scroll to previous project" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Scroll to next project" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Project slider")).toBeInTheDocument();
  });
});
