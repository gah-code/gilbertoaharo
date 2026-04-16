import type { SectionProjects } from "@/content/contentful/types";
import { resolveProjectLink } from "@/content/contentful/adapters";

export type NormalizedProjectLink = {
  href: string;
  label: string;
  analyticsLabel?: string;
};

export type NormalizedProject = {
  id: string;
  name: string;
  tagline?: string;
  summary?: string;
  techStack: string[];
  links: NormalizedProjectLink[];
};

export type NormalizedProjectsSection = {
  anchorId: string;
  title: string;
  projects: NormalizedProject[];
};

export function normalizeProjectsSection(
  section: SectionProjects,
): NormalizedProjectsSection {
  const fields = section.fields;

  return {
    anchorId: fields.anchorId || section.sys.id,
    title: fields.title,
    projects: (fields.projects ?? []).map((project) => ({
      id: project.sys.id,
      name: project.fields.name,
      tagline: project.fields.tagline ?? undefined,
      summary: project.fields.summary ?? undefined,
      techStack: project.fields.techStack ?? [],
      links: (project.fields.links ?? []).map(resolveProjectLink),
    })),
  };
}
