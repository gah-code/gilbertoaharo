import timelineSearch from "@/assets/timeline/timeline-search.svg";
import timelineJourney from "@/assets/timeline/timeline-journey.svg";
import timelineCreative from "@/assets/timeline/timeline-creative.svg";
import type {
  Asset,
  SectionContact,
  SectionFooter,
  SectionLearning,
  SectionProjects,
  SectionSkills,
} from "@/content/contentful/types";

const makeSys = <T extends string>(id: string, type: T) => ({
  id,
  contentType: { sys: { id: type } },
});

const makeAsset = (id: string, url: string, title: string): Asset => ({
  sys: { id },
  fields: {
    title,
    file: {
      url,
      fileName: `${id}.svg`,
      contentType: "image/svg+xml",
    },
  },
});

const projectStoryMedia = [
  makeAsset("project-story-media-1", timelineSearch, "Analytics and search visuals"),
  makeAsset("project-story-media-2", timelineJourney, "Journey and process visuals"),
  makeAsset("project-story-media-3", timelineCreative, "Creative engineering visuals"),
];

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
    eyebrow: "Selected Work",
    title: "Featured Projects",
    intro: "Recent platform and product projects that balance delivery quality with editorial clarity.",
    projects: [
      {
        sys: makeSys("project-story-1", "project"),
        fields: {
          internalName: "Design System Migration",
          name: "Design System Migration",
          tagline: "Primitives-first rollout",
          summary: "Standardized component contracts and removed ad hoc styling.",
          role: "Lead Engineer",
          period: "2024 — 2025",
          featured: true,
          thumbnail: projectStoryMedia[0],
          thumbnailAlt: "Design system dashboards and component previews",
          highlights: [
            "Consolidated cross-team UI patterns into shared primitives",
            "Improved consistency and reduced duplicate implementations",
          ],
          techStack: ["React", "TypeScript", "Storybook"],
          links: [
            {
              sys: makeSys("project-link-1", "projectLink"),
              fields: {
                internalName: "Case Study Link",
                label: "Case Study",
                href: "https://example.com/case-study",
                url: "https://example.com/case-study",
                kind: "case-study",
                analyticsLabel: "ds-migration-case-study",
              },
            },
            {
              sys: makeSys("project-link-2", "projectLink"),
              fields: {
                label: "Demo",
                url: "https://example.com/demo",
                kind: "demo",
                openInNewTab: false,
              },
            },
            {
              sys: makeSys("project-link-3", "projectLink"),
              fields: {
                label: "Source",
                url: "https://example.com/source",
                kind: "code",
              },
            },
          ],
        },
      },
      {
        sys: makeSys("project-story-2", "project"),
        fields: {
          internalName: "Content Operations Platform",
          name: "Content Operations Platform",
          tagline: "Model-first editorial workflows",
          summary: "Unified authoring flows and content QA around reusable entry patterns.",
          role: "Content Systems Architect",
          period: "2023 — 2024",
          thumbnail: projectStoryMedia[1],
          highlights: [
            "Reduced editorial friction with reusable content blocks",
            "Shipped governance checks without blocking publishing flow",
          ],
          techStack: ["Contentful", "TypeScript", "Automation"],
          links: [
            {
              sys: makeSys("project-link-4", "projectLink"),
              fields: {
                label: "Read Story",
                href: "https://example.com/article",
                url: "https://example.com/legacy-article",
                kind: "article",
                variant: "primary",
              },
            },
            {
              sys: makeSys("project-link-5", "projectLink"),
              fields: {
                label: "Workflow Demo",
                url: "https://example.com/workflow-demo",
                kind: "demo",
              },
            },
          ],
        },
      },
      {
        sys: makeSys("project-story-3", "project"),
        fields: {
          internalName: "Performance Baseline Program",
          name: "Performance Baseline Program",
          tagline: "Practical performance governance",
          summary: "Introduced budgets, observability, and release checks to keep core journeys fast.",
          role: "Web Platform",
          period: "2022 — 2023",
          thumbnail: projectStoryMedia[2],
          highlights: [
            "Added baseline budgets and CI gating for key user journeys",
            "Improved release confidence with repeatable diagnostics",
          ],
          techStack: ["Lighthouse CI", "Vite", "Testing Library"],
          links: [
            {
              sys: makeSys("project-link-6", "projectLink"),
              fields: {
                label: "Repository",
                url: "https://example.com/perf-source",
                kind: "code",
                openInNewTab: true,
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
    eyebrow: "Learning",
    title: "Learning in Public",
    intro: "What I am exploring right now and how those ideas are translating into shipped work.",
    items: [
      {
        sys: makeSys("learning-item-1", "learningItem"),
        fields: {
          internalName: "Discovery Baseline",
          topic: "Discovery Baseline",
          description: "Mapping current section behavior and missing contracts.",
          focusAreas: ["Audit", "Structure", "Risk Mapping"],
          roadmapLabel: "Phase A",
          sortOrder: 10,
          isNextUp: false,
          linkLabel: "View discovery notes",
          linkUrl: "https://example.com/discovery-notes",
        },
      },
      {
        sys: makeSys("learning-item-2", "learningItem"),
        fields: {
          internalName: "Storybook Architecture",
          topic: "Storybook Architecture",
          description: "Building contract coverage in stories and interaction tests.",
          status: "practicing",
          focusAreas: ["Contract Tests", "Component APIs", "QA"],
          roadmapLabel: "Phase C",
          sortOrder: 30,
          isNextUp: false,
          linkLabel: "Read Storybook strategy",
          linkUrl: "https://example.com/storybook-strategy",
        },
      },
      {
        sys: makeSys("learning-item-3", "learningItem"),
        fields: {
          internalName: "Accessibility Patterns",
          topic: "Accessibility Patterns",
          description: "Rolling proven keyboard and focus patterns into production screens.",
          status: "shipping",
          focusAreas: ["Keyboard UX", "A11y Audits", "Semantic HTML"],
          roadmapLabel: "Phase B",
          sortOrder: 20,
          isNextUp: false,
          linkLabel: "Read notes",
          linkUrl: "https://example.com/notes",
        },
      },
      {
        sys: makeSys("learning-item-4", "learningItem"),
        fields: {
          topic: "Content Modeling for Additive Migrations",
          description: "Testing additive fields while preserving legacy compatibility.",
          status: "exploring",
          focusAreas: ["Contentful", "Migrations", "Backfill Strategy"],
          roadmapLabel: "Phase D",
          sortOrder: 40,
          isNextUp: true,
          linkLabel: "Migration checklist",
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

export const footerStorySection: SectionFooter = {
  sys: makeSys("footer-story", "sectionFooter"),
  fields: {
    internalName: "Footer Story",
    brandTitle: "Gilberto Haro",
    brandSubtitle: "Web Engineer · Content Systems",
    summary:
      "A calm editorial footer that closes the page with clear navigation and simple social links.",
    navigationGroups: [
      {
        sys: makeSys("footer-story-group-site", "footerLinkGroup"),
        fields: {
          label: "Site",
          links: [
            {
              sys: makeSys("footer-story-link-about", "footerLink"),
              fields: {
                label: "About",
                href: "#top",
                kind: "nav",
                iconKey: "arrow",
              },
            },
            {
              sys: makeSys("footer-story-link-experience", "footerLink"),
              fields: {
                label: "Experience",
                href: "#timeline",
                kind: "nav",
                iconKey: "arrow",
              },
            },
            {
              sys: makeSys("footer-story-link-projects", "footerLink"),
              fields: {
                label: "Projects",
                href: "#projects",
                kind: "nav",
                iconKey: "arrow",
              },
            },
            {
              sys: makeSys("footer-story-link-learning", "footerLink"),
              fields: {
                label: "Learning",
                href: "#learning",
                kind: "nav",
                iconKey: "arrow",
              },
            },
          ],
        },
      },
      {
        sys: makeSys("footer-story-group-links", "footerLinkGroup"),
        fields: {
          label: "More",
          links: [
            {
              sys: makeSys("footer-story-link-resume", "footerLink"),
              fields: {
                label: "Resume",
                href: "https://example.com/resume",
                kind: "cta",
              },
            },
            {
              sys: makeSys("footer-story-link-contact", "footerLink"),
              fields: {
                label: "Contact",
                href: "mailto:hello@example.com",
                kind: "nav",
                iconKey: "arrow",
                openInNewTab: false,
              },
            },
          ],
        },
      },
    ],
    socialLinks: [
      {
        sys: makeSys("footer-story-social-github", "footerLink"),
        fields: {
          label: "GitHub",
          href: "https://github.com/example",
          kind: "social",
          iconKey: "github",
        },
      },
      {
        sys: makeSys("footer-story-social-linkedin", "footerLink"),
        fields: {
          label: "LinkedIn",
          href: "https://linkedin.com/in/example",
          kind: "social",
          iconKey: "linkedin",
        },
      },
      {
        sys: makeSys("footer-story-social-email", "footerLink"),
        fields: {
          label: "Email",
          href: "mailto:hello@example.com",
          kind: "email",
          iconKey: "email",
          openInNewTab: false,
        },
      },
    ],
    legalText: "© 2026 Gilberto Haro. All rights reserved.",
    builtWithText: "Built with React, TypeScript, and Storybook.",
  },
};
