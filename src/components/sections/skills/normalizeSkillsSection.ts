import type { SectionSkills, SkillLevel } from "@/content/contentful/types";

export type NormalizedSkill = {
  id: string;
  name: string;
  level?: SkillLevel;
  levelLabel?: string;
  keywords: string[];
};

export type NormalizedSkillGroup = {
  id: string;
  label: string;
  skills: NormalizedSkill[];
};

export type NormalizedSkillsSection = {
  anchorId: string;
  title: string;
  groups: NormalizedSkillGroup[];
};

function normalizeSkillLevel(level?: SkillLevel): string | undefined {
  return level ? level.toUpperCase() : undefined;
}

export function normalizeSkillsSection(
  section: SectionSkills,
): NormalizedSkillsSection {
  const fields = section.fields;
  const groups = (fields.groups ?? []).map((group) => ({
    id: group.sys.id,
    label: group.fields.label,
    skills: (group.fields.skills ?? []).map((skill) => ({
      id: skill.sys.id,
      name: skill.fields.name,
      level: skill.fields.level,
      levelLabel: normalizeSkillLevel(skill.fields.level),
      keywords: skill.fields.keywords ?? [],
    })),
  }));

  return {
    anchorId: fields.anchorId || section.sys.id,
    title: fields.title,
    groups,
  };
}
