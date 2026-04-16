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
    title: "Core Skills",
    groups: [
      {
        sys: makeSys("group-frontend", "skillGroup"),
        fields: {
          label: "Frontend",
          skills: [
            {
              sys: makeSys("skill-react", "skill"),
              fields: {
                name: "React",
                level: "expert",
                keywords: ["hooks", "composition"],
              },
            },
            {
              sys: makeSys("skill-ts", "skill"),
              fields: {
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
          label: "Content Systems",
          skills: [
            {
              sys: makeSys("skill-modeling", "skill"),
              fields: {
                name: "Content Modeling",
                level: "strong",
                keywords: ["schemas", "governance"],
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
