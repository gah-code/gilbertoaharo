import React from "react";
import type { SectionEntry } from "@/content/contentful/types";

import { HeroSection } from "./HeroSection";
import { TimelineSection } from "./TimelineSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { LearningSection } from "./LearningSection";
import { ContactSection } from "./ContactSection";

type SectionTypeId = SectionEntry["sys"]["contentType"]["sys"]["id"];
type SectionById<TId extends SectionTypeId> = Extract<
  SectionEntry,
  { sys: { contentType: { sys: { id: TId } } } }
>;

type SectionRendererMap = {
  [K in SectionTypeId]: (section: SectionById<K>) => React.ReactNode;
};

const sectionRenderers = {
  sectionHero: (section) => <HeroSection section={section} />,
  sectionTimeline: (section) => <TimelineSection section={section} />,
  sectionSkills: (section) => <SkillsSection section={section} />,
  sectionProjects: (section) => <ProjectsSection section={section} />,
  sectionLearning: (section) => <LearningSection section={section} />,
  sectionContact: (section) => <ContactSection section={section} />,
} satisfies SectionRendererMap;

function isSectionById<TId extends SectionTypeId>(
  section: SectionEntry,
  id: TId,
): section is SectionById<TId> {
  return section.sys.contentType.sys.id === id;
}

export function SectionRenderer({ section }: { section: SectionEntry }) {
  if (isSectionById(section, "sectionHero")) {
    return sectionRenderers.sectionHero(section);
  }
  if (isSectionById(section, "sectionTimeline")) {
    return sectionRenderers.sectionTimeline(section);
  }
  if (isSectionById(section, "sectionSkills")) {
    return sectionRenderers.sectionSkills(section);
  }
  if (isSectionById(section, "sectionProjects")) {
    return sectionRenderers.sectionProjects(section);
  }
  if (isSectionById(section, "sectionLearning")) {
    return sectionRenderers.sectionLearning(section);
  }
  if (isSectionById(section, "sectionContact")) {
    return sectionRenderers.sectionContact(section);
  }
  return null;
}
