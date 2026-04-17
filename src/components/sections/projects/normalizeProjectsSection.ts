import type { ButtonVariant } from "@/components/ui/Button";
import { resolveProjectLink } from "@/content/contentful/adapters";
import type {
  Project,
  ProjectLinkKind,
  ProjectLinkVariant,
  SectionProjects,
} from "@/content/contentful/types";

export type NormalizedProjectAction = {
  key: string;
  href: string;
  label: string;
  variant: ButtonVariant;
  openInNewTab: boolean;
  ariaLabel?: string;
  analyticsLabel?: string;
};

export type NormalizedProject = {
  id: string;
  key: string;
  internalName?: string;
  name: string;
  tagline?: string;
  summary?: string;
  role?: string;
  period?: string;
  featured: boolean;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  highlights: string[];
  techStack: string[];
  actions: NormalizedProjectAction[];
};

export type NormalizedProjectsSection = {
  id: string;
  anchorId: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  projects: NormalizedProject[];
};

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function compactText(value?: string | null): string | undefined {
  const next = value?.trim();
  return next ? next : undefined;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeStableKey(parts: Array<string | undefined>, fallback: string): string {
  const joined = parts.filter(Boolean).join("-");
  const normalized = slugify(joined);
  return normalized || fallback;
}

function mapActionVariant(kind?: ProjectLinkKind): ButtonVariant {
  if (kind === "case-study" || kind === "article") return "primary";
  if (kind === "demo") return "secondary";
  return "text";
}

function resolveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function normalizeStringList(values?: string[]): string[] {
  return safeArray(values)
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveButtonVariant(
  variant?: ProjectLinkVariant,
  kind?: ProjectLinkKind,
): ButtonVariant {
  if (variant === "primary" || variant === "secondary" || variant === "text") {
    return variant;
  }
  return mapActionVariant(kind);
}

function normalizeProjectAction(
  project: Project,
  projectKey: string,
  actionIndex: number,
): NormalizedProjectAction | null {
  const link = project.fields.links?.[actionIndex];
  if (!link) return null;

  const resolved = resolveProjectLink(link);
  const href = compactText(resolved.href);
  if (!href || href === "#") return null;

  const label = compactText(resolved.label);
  if (!label) return null;

  const key = makeStableKey(
    [projectKey, link.sys.id, resolved.kind, label],
    `${projectKey}-action-${actionIndex}`,
  );

  return {
    key,
    href,
    label,
    variant: resolveButtonVariant(resolved.variant, resolved.kind),
    openInNewTab: resolved.openInNewTab,
    ariaLabel: compactText(resolved.ariaLabel),
    analyticsLabel: compactText(resolved.analyticsLabel),
  };
}

function normalizeProject(
  project: Project,
  sectionId: string,
  projectIndex: number,
): NormalizedProject {
  const name = compactText(project.fields.name) ?? "Untitled project";
  const key = makeStableKey(
    [sectionId, project.sys.id, project.fields.internalName, name],
    `${sectionId}-project-${projectIndex}`,
  );
  const thumbnailSrc = resolveAssetUrl(project.fields.thumbnail?.fields.file?.url);
  const thumbnailAlt = thumbnailSrc
    ? compactText(project.fields.thumbnailAlt) ??
      compactText(project.fields.thumbnail?.fields.title) ??
      name
    : undefined;
  const links = safeArray(project.fields.links);

  return {
    id: compactText(project.sys.id) ?? key,
    key,
    internalName: compactText(project.fields.internalName),
    name,
    tagline: compactText(project.fields.tagline),
    summary: compactText(project.fields.summary),
    role: compactText(project.fields.role),
    period: compactText(project.fields.period),
    featured: Boolean(project.fields.featured),
    thumbnailSrc,
    thumbnailAlt,
    highlights: normalizeStringList(project.fields.highlights),
    techStack: normalizeStringList(project.fields.techStack),
    actions: links
      .map((_, actionIndex) => normalizeProjectAction(project, key, actionIndex))
      .filter((action): action is NormalizedProjectAction => Boolean(action)),
  };
}

export function normalizeProjectsSection(
  section: SectionProjects,
): NormalizedProjectsSection {
  const fields = section.fields;
  const sectionId = compactText(section.sys.id) ?? "projects-section";

  return {
    id: sectionId,
    anchorId: compactText(fields.anchorId) ?? sectionId,
    eyebrow: compactText(fields.eyebrow),
    title: compactText(fields.title) ?? "Projects",
    intro: compactText(fields.intro),
    projects: safeArray(fields.projects).map((project, projectIndex) =>
      normalizeProject(project, sectionId, projectIndex),
    ),
  };
}
