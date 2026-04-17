import type {
  SectionContact,
  SectionLearning,
  SectionProjects,
  SectionSkills,
} from "@/content/contentful/types";

const makeSys = <T extends string>(id: string, type: T) => ({
  id,
  contentType: { sys: { id: type } },
});

export const skillsStorySection: SectionSkills = {
  sys: makeSys("skills-story", "sectionSkills"),
  fields: {
    internalName: "Skills Story",
    anchorId: "skills",
    eyebrow: "Capabilities",
    title: "Skills Snapshot",
    intro: "Grouped strengths across implementation, architecture, and content systems.",
    groups: [
      {
        sys: makeSys("group-frontend", "skillGroup"),
        fields: {
          internalName: "Frontend Group",
          label: "Frontend",
          description: "UI implementation, component architecture, and interaction quality.",
          iconKey: "frontend",
          skills: [
            {
              sys: makeSys("skill-react", "skill"),
              fields: {
                internalName: "React Skill",
                name: "React",
                level: "expert",
                keywords: ["hooks", "composition"],
              },
            },
            {
              sys: makeSys("skill-ts", "skill"),
              fields: {
                internalName: "TypeScript Skill",
                name: "TypeScript",
                level: "strong",
                keywords: ["types", "contracts"],
              },
            },
          ],
        },
      },
      {
        sys: makeSys("group-content", "skillGroup"),
        fields: {
          internalName: "Content Group",
          label: "Content Systems",
          description: "Content modeling, governance, and authoring workflows.",
          iconKey: "content",
          skills: [
            {
              sys: makeSys("skill-modeling", "skill"),
              fields: {
                internalName: "Modeling Skill",
                name: "Content Modeling",
                level: "core",
                keywords: ["schemas", "governance"],
              },
            },
            {
              sys: makeSys("skill-editorial", "skill"),
              fields: {
                name: "Editorial Operations",
                level: "active",
              },
            },
            {
              sys: makeSys("skill-ai", "skill"),
              fields: {
                name: "AI Workflow Design",
              },
            },
          ],
        },
      },
    ],
  },
};

export const projectsStorySection: SectionProjects = {
  sys: makeSys("projects-story", "sectionProjects"),
  fields: {
    internalName: "Projects Story",
    anchorId: "projects",
    title: "Featured Projects",
    projects: [
      {
        sys: makeSys("project-story-1", "project"),
        fields: {
          name: "Design System Migration",
          tagline: "Primitives-first rollout",
          summary: "Standardized component contracts and removed ad hoc styling.",
          techStack: ["React", "TypeScript", "Storybook"],
          links: [
            {
              sys: makeSys("project-link-1", "projectLink"),
              fields: {
                label: "Case Study",
                url: "https://example.com/case-study",
              },
            },
            {
              sys: makeSys("project-link-2", "projectLink"),
              fields: {
                label: "Source",
                url: "https://example.com/source",
              },
            },
          ],
        },
      },
    ],
  },
};

export const learningStorySection: SectionLearning = {
  sys: makeSys("learning-story", "sectionLearning"),
  fields: {
    internalName: "Learning Story",
    anchorId: "learning",
    title: "Learning in Public",
    items: [
      {
        sys: makeSys("learning-item-1", "learningItem"),
        fields: {
          topic: "Accessibility Patterns",
          description: "Improving keyboard and focus workflows.",
          status: "shipping",
          linkLabel: "Read notes",
          linkUrl: "https://example.com/notes",
        },
      },
      {
        sys: makeSys("learning-item-2", "learningItem"),
        fields: {
          topic: "Storybook Architecture",
          description: "Building component contract coverage in stories.",
          status: "practicing",
        },
      },
    ],
  },
};

export const contactStorySection: SectionContact = {
  sys: makeSys("contact-story", "sectionContact"),
  fields: {
    internalName: "Contact Story",
    anchorId: "contact",
    title: "Contact",
    intro: "Reach out for collaboration or architecture consulting.",
    email: "hello@example.com",
    links: [
      {
        sys: makeSys("social-link-1", "socialLink"),
        fields: {
          label: "GitHub",
          url: "https://github.com/example",
        },
      },
      {
        sys: makeSys("social-link-2", "socialLink"),
        fields: {
          label: "LinkedIn",
          url: "https://linkedin.com/in/example",
        },
      },
    ],
  },
};
