import React from "react";
import type {
  SectionEntry,
  SectionHero,
  SectionTimeline,
  SectionSkills,
  SectionProjects,
  SectionLearning,
  SectionContact,
} from "@/content/contentful/types";

import { HeroSection } from "./HeroSection";
import { TimelineSection } from "./TimelineSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { LearningSection } from "./LearningSection";
import { ContactSection } from "./ContactSection";

export function SectionRenderer({ section }: { section: SectionEntry }) {
  const id = section.sys.contentType.sys.id;

  switch (id) {
    case "sectionHero":
      return <HeroSection section={section as SectionHero} />;
    case "sectionTimeline":
      return <TimelineSection section={section as SectionTimeline} />;
    case "sectionSkills":
      return <SkillsSection section={section as SectionSkills} />;
    case "sectionProjects":
      return <ProjectsSection section={section as SectionProjects} />;
    case "sectionLearning":
      return <LearningSection section={section as SectionLearning} />;
    case "sectionContact":
      return <ContactSection section={section as SectionContact} />;
    default:
      return null;
  }
}
