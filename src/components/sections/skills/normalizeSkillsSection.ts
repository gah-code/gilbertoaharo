import type {
  AdditiveSkillLevel,
  SectionSkills,
  Skill,
  SkillGroup,
  SkillLevel,
} from "@/content/contentful/types";

export type NormalizedSkillLevel = AdditiveSkillLevel;

export type NormalizedSkillLevelLabel = "Core" | "Active" | "Expanding";

export type NormalizedSkill = {
  id: string;
  key: string;
  internalName?: string;
  name: string;
  level: NormalizedSkillLevel;
  levelLabel: NormalizedSkillLevelLabel;
  keywords: string[];
};

export type NormalizedSkillGroup = {
  id: string;
  key: string;
  internalName?: string;
  label: string;
  description?: string;
  iconKey?: string;
  skills: NormalizedSkill[];
};

export type NormalizedSkillsSection = {
  anchorId: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  groups: NormalizedSkillGroup[];
};

const SKILL_LEVEL_LABELS: Record<NormalizedSkillLevel, NormalizedSkillLevelLabel> = {
  core: "Core",
  active: "Active",
  expanding: "Expanding",
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

function normalizeSkillLevel(level?: SkillLevel): NormalizedSkillLevel {
  if (level === "expert" || level === "core") return "core";
  if (level === "strong" || level === "active") return "active";
  return "expanding";
}

function normalizeKeywords(value?: string[]): string[] {
  return safeArray(value)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function normalizeSkill(
  skill: Skill,
  groupKey: string,
  skillIndex: number,
): NormalizedSkill {
  const skillName = compactText(skill.fields.name) ?? "Untitled skill";
  const skillKey = makeStableKey(
    [groupKey, skill.sys.id, skill.fields.internalName, skillName],
    `${groupKey}-skill-${skillIndex}`,
  );
  const normalizedLevel = normalizeSkillLevel(skill.fields.level);

  return {
    id: compactText(skill.sys.id) ?? skillKey,
    key: skillKey,
    internalName: compactText(skill.fields.internalName),
    name: skillName,
    level: normalizedLevel,
    levelLabel: SKILL_LEVEL_LABELS[normalizedLevel],
    keywords: normalizeKeywords(skill.fields.keywords),
  };
}

function normalizeGroup(
  group: SkillGroup,
  sectionId: string,
  groupIndex: number,
): NormalizedSkillGroup {
  const label =
    compactText(group.fields.label) ??
    compactText(group.fields.internalName) ??
    "Skill Group";
  const groupKey = makeStableKey(
    [sectionId, group.sys.id, group.fields.internalName, label],
    `${sectionId}-group-${groupIndex}`,
  );

  return {
    id: compactText(group.sys.id) ?? groupKey,
    key: groupKey,
    internalName: compactText(group.fields.internalName),
    label,
    description: compactText(group.fields.description),
    iconKey: compactText(group.fields.iconKey),
    skills: safeArray(group.fields.skills).map((skill, skillIndex) =>
      normalizeSkill(skill, groupKey, skillIndex),
    ),
  };
}

export function normalizeSkillsSection(
  section: SectionSkills,
): NormalizedSkillsSection {
  const fields = section.fields;
  const sectionId = compactText(section.sys.id) ?? "skills-section";

  return {
    anchorId: compactText(fields.anchorId) ?? sectionId,
    eyebrow: compactText(fields.eyebrow),
    title: compactText(fields.title) ?? "Skills",
    intro: compactText(fields.intro),
    groups: safeArray(fields.groups).map((group, groupIndex) =>
      normalizeGroup(group, sectionId, groupIndex),
    ),
  };
}
