import timelineSearch from "@/assets/timeline/timeline-search.svg";
import timelineJourney from "@/assets/timeline/timeline-journey.svg";
import timelineCreative from "@/assets/timeline/timeline-creative.svg";
import type {
  Article,
  LandingPageData,
  NavigationMenuData,
  NavigationLinkData,
  EntryTypeId,
  SectionHero,
  SectionLearning,
  SectionFooter,
  SectionProjects,
  SectionSkills,
  SectionTimeline,
  TimelineItem,
  Asset,
  LinkAction,
} from "../contentful/types";

const makeSys = <T extends EntryTypeId>(id: string, type: T) => ({
  id,
  contentType: { sys: { id: type } },
});

const mediaAssets: Asset[] = [
  {
    sys: { id: "timeline-media-search" },
    fields: {
      file: {
        url: timelineSearch,
        fileName: "timeline-search.svg",
        contentType: "image/svg+xml",
      },
      title: "Discovery and research",
    },
  },
  {
    sys: { id: "timeline-media-journey" },
    fields: {
      file: {
        url: timelineJourney,
        fileName: "timeline-journey.svg",
        contentType: "image/svg+xml",
      },
      title: "Journey and growth",
    },
  },
  {
    sys: { id: "timeline-media-creative" },
    fields: {
      file: {
        url: timelineCreative,
        fileName: "timeline-creative.svg",
        contentType: "image/svg+xml",
      },
      title: "Creative technology",
    },
  },
];

const staticArticleAuthor = {
  sys: makeSys("person-author-gilberto", "personProfile"),
  fields: {
    name: "Gilberto Haro",
    title: "Web Engineer",
  },
};

const richTextQaFileAsset: Asset = {
  sys: { id: "article-rich-text-qa-brief" },
  fields: {
    title: "Rich text QA brief",
    description: "A non-image embedded asset used to verify file-link rendering.",
    file: {
      url: "https://example.com/assets/rich-text-qa-brief.pdf",
      fileName: "rich-text-qa-brief.pdf",
      contentType: "application/pdf",
    },
  },
};

function makeArticleBody(paragraph: string) {
  return {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [{ nodeType: "text", value: paragraph, marks: [], data: {} }],
      },
    ],
  };
}

const richTextFormattingQaBody = {
  nodeType: "document",
  data: {},
  content: [
    {
      nodeType: "paragraph",
      data: {},
      content: [
        {
          nodeType: "text",
          value: "This QA article exercises the rich text renderer with ",
          marks: [],
          data: {},
        },
        {
          nodeType: "text",
          value: "bold",
          marks: [{ type: "bold" }],
          data: {},
        },
        { nodeType: "text", value: ", ", marks: [], data: {} },
        {
          nodeType: "text",
          value: "italic",
          marks: [{ type: "italic" }],
          data: {},
        },
        { nodeType: "text", value: ", ", marks: [], data: {} },
        {
          nodeType: "text",
          value: "underlined",
          marks: [{ type: "underline" }],
          data: {},
        },
        { nodeType: "text", value: ", and ", marks: [], data: {} },
        {
          nodeType: "text",
          value: "inline code",
          marks: [{ type: "code" }],
          data: {},
        },
        { nodeType: "text", value: " marks.", marks: [], data: {} },
      ],
    },
    {
      nodeType: "heading-1",
      data: {},
      content: [
        {
          nodeType: "text",
          value: "Body heading one should render as heading two",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: "paragraph",
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "A deliberately longer paragraph checks reading rhythm and line length across mobile, tablet, and desktop widths. It includes enough text to wrap naturally without relying on forced breaks, so the article measure and paragraph spacing can be reviewed in a realistic flow.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: "heading-2",
      data: {},
      content: [{ nodeType: "text", value: "Heading two section", marks: [], data: {} }],
    },
    {
      nodeType: "heading-3",
      data: {},
      content: [{ nodeType: "text", value: "Heading three subsection", marks: [], data: {} }],
    },
    {
      nodeType: "heading-4",
      data: {},
      content: [{ nodeType: "text", value: "Heading four detail", marks: [], data: {} }],
    },
    {
      nodeType: "unordered-list",
      data: {},
      content: [
        {
          nodeType: "list-item",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              data: {},
              content: [{ nodeType: "text", value: "Unordered item with concise copy.", marks: [], data: {} }],
            },
          ],
        },
        {
          nodeType: "list-item",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              data: {},
              content: [{ nodeType: "text", value: "Second unordered item for spacing review.", marks: [], data: {} }],
            },
          ],
        },
      ],
    },
    {
      nodeType: "ordered-list",
      data: {},
      content: [
        {
          nodeType: "list-item",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              data: {},
              content: [{ nodeType: "text", value: "First ordered step.", marks: [], data: {} }],
            },
          ],
        },
        {
          nodeType: "list-item",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              data: {},
              content: [{ nodeType: "text", value: "Second ordered step.", marks: [], data: {} }],
            },
          ],
        },
      ],
    },
    {
      nodeType: "quote",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value: "Blockquotes should feel intentional without overwhelming the article flow.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    { nodeType: "hr", data: {}, content: [] },
    {
      nodeType: "paragraph",
      data: {},
      content: [
        { nodeType: "text", value: "Review an ", marks: [], data: {} },
        {
          nodeType: "hyperlink",
          data: { uri: "https://example.com/editorial/rich-text-rendering-contract" },
          content: [
            {
              nodeType: "text",
              value: "external renderer reference",
              marks: [],
              data: {},
            },
          ],
        },
        { nodeType: "text", value: " and an ", marks: [], data: {} },
        {
          nodeType: "hyperlink",
          data: { uri: "/articles/resilient-content-systems" },
          content: [
            {
              nodeType: "text",
              value: "internal article reference",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "text",
          value: " in the same paragraph.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: "paragraph",
      data: {},
      content: [
        {
          nodeType: "hyperlink",
          data: {
            uri: "https://example.com/really-long-rich-text-formatting-check-with-a-long-readable-link-label-and-no-layout-overflow",
          },
          content: [
            {
              nodeType: "text",
              value:
                "A long descriptive link label that should wrap cleanly without causing horizontal scrolling in the article column",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    {
      nodeType: "embedded-asset-block",
      data: { target: mediaAssets[0] },
      content: [],
    },
    {
      nodeType: "embedded-asset-block",
      data: { target: richTextQaFileAsset },
      content: [],
    },
  ],
};

export const staticArticles: Article[] = [
  {
    sys: makeSys("article-rich-text-formatting-qa", "article"),
    fields: {
      internalName: "Rich Text Formatting QA",
      slug: "rich-text-formatting-qa",
      title: "Rich Text Formatting QA",
      excerpt:
        "A static article fixture that exercises supported Contentful rich text formatting.",
      author: staticArticleAuthor,
      publishedAt: "2026-05-19T09:00:00.000Z",
      updatedAt: "2026-05-19T09:00:00.000Z",
      body: richTextFormattingQaBody,
      heroImage: mediaAssets[0],
      attachments: [richTextQaFileAsset],
      metaTitle: "Rich Text Formatting QA",
      metaDescription:
        "Static QA coverage for article headings, lists, links, marks, and embedded assets.",
    },
  },
  {
    sys: makeSys("article-resilient-content-systems", "article"),
    fields: {
      internalName: "Resilient Content Systems",
      slug: "resilient-content-systems",
      title: "Designing Resilient Content Systems for Fast Teams",
      excerpt:
        "How section contracts and additive models reduce regressions without slowing editorial teams.",
      author: staticArticleAuthor,
      publishedAt: "2026-03-10T09:00:00.000Z",
      updatedAt: "2026-03-12T08:30:00.000Z",
      body: makeArticleBody(
        "Resilient systems come from clear section contracts, predictable defaults, and steady migration paths.",
      ),
      heroImage: mediaAssets[0],
      metaTitle: "Designing Resilient Content Systems",
      metaDescription:
        "A practical approach to content modeling and section contracts for product teams.",
    },
  },
  {
    sys: makeSys("article-editorial-frontend-partnership", "article"),
    fields: {
      internalName: "Editorial + Frontend Partnership",
      slug: "editorial-frontend-partnership",
      title: "Editorial and Frontend: A Better Operating Rhythm",
      excerpt:
        "A lightweight operating model for engineering and content teams shipping the same surfaces.",
      author: staticArticleAuthor,
      updatedAt: "2026-02-02T15:15:00.000Z",
      body: makeArticleBody(
        "When teams share a language for sections and states, quality rises while delivery friction drops.",
      ),
      heroImage: mediaAssets[1],
      metaTitle: "Editorial and Frontend Operating Rhythm",
      metaDescription:
        "Operating agreements and implementation patterns for editorial and frontend collaboration.",
    },
  },
  {
    sys: makeSys("article-thoughtful-interface-work", "article"),
    fields: {
      internalName: "Thoughtful Interface Work",
      slug: "thoughtful-interface-work",
      title: "Thoughtful Interface Work at Production Speed",
      excerpt:
        "Balancing craft, accessibility, and delivery pressure in modern frontend systems.",
      publishedAt: "2025-11-15T12:00:00.000Z",
      body: makeArticleBody(
        "Thoughtful interfaces are built through constraints, not decoration: strong hierarchy, calm interaction, and clear intent.",
      ),
      heroImage: mediaAssets[2],
      metaTitle: "Thoughtful Interface Work",
      metaDescription:
        "Principles for maintaining interface quality while shipping quickly.",
    },
  },
];

const timelineItems: TimelineItem[] = [
  {
    sys: makeSys("timeline-1", "timelineItem"),
    fields: {
      kind: "role",
      title: "Senior Web Engineer",
      organization: "Studio North",
      location: "Remote",
      context: "Marketing platform · Content ops",
      startDate: "2023",
      startDateValue: "2023-03-01",
      isCurrent: true,
      summary: "Leading web platform delivery across marketing and content-heavy sites.",
      highlights: [
        "Built resilient CMS-first page templates and navigation",
        "Defined tokens and accessibility defaults across the design system",
      ],
      tags: ["CMS", "Design System"],
      mediaImage: mediaAssets[0],
      media: mediaAssets[0],
      mediaAlt: "Looking at charts and search results",
      action: {
        sys: makeSys("timeline-1-action", "linkAction"),
        fields: {
          label: "View projects",
          href: "#projects",
          variant: "text",
          openInNewTab: false,
        },
      } as LinkAction,
    },
  },
  {
    sys: makeSys("timeline-2", "timelineItem"),
    fields: {
      kind: "role",
      title: "Frontend Lead",
      organization: "Brightline",
      location: "Austin, TX",
      context: "Design system leadership",
      startDate: "2021",
      startDateValue: "2021-01-01",
      endDate: "2023",
      endDateValue: "2023-12-31",
      summary: "Scaled a component library and mentored engineers across squads.",
      highlights: [
        "Shipped responsive design system across marketing + product surfaces",
        "Partnered with content ops to streamline publishing workflows",
      ],
      tags: ["React", "Contentful"],
      mediaImage: mediaAssets[1],
      media: mediaAssets[1],
      mediaAlt: "Journey path with milestones",
      action: {
        sys: makeSys("timeline-2-action", "linkAction"),
        fields: {
          label: "See case study",
          href: "#",
          variant: "secondary",
          openInNewTab: false,
        },
      } as LinkAction,
    },
  },
  {
    sys: makeSys("timeline-3", "timelineItem"),
    fields: {
      kind: "milestone",
      title: "Content Modeling Coach",
      organization: "Freelance",
      location: "Remote",
      context: "Advisory",
      startDate: "2019",
      startDateValue: "2019-01-01",
      endDate: "2021",
      endDateValue: "2021-06-30",
      summary: "Advised teams on schema design and content delivery performance.",
      highlights: [
        "Introduced content model versioning and governance",
        "Reduced template sprawl with reusable sections and slots",
      ],
      tags: ["Content Modeling", "Architecture"],
      mediaImage: mediaAssets[2],
      media: mediaAssets[2],
      mediaAlt: "Creative collaboration illustration",
      action: {
        sys: makeSys("timeline-3-action", "linkAction"),
        fields: {
          label: "Book a chat",
          href: "mailto:hello@example.com",
          variant: "text",
          openInNewTab: false,
        },
      } as LinkAction,
    },
  },
];

const heroSection: SectionHero = {
  sys: makeSys("section-hero", "sectionHero"),
  fields: {
    internalName: "Hero",
    anchorId: "top",
    title: "I build scalable interfaces and content systems for modern web experiences.",
    name: "Gilberto Haro",
    eyebrow: "WEB ENGINEER · CONTENT SYSTEMS · FRONTEND ARCHITECTURE",
    heroStyle: "image",
    heroImage: mediaAssets[0],
    heroImageAlt: "Editorial-style visual representing structured content and frontend systems",
    lead:
      "I help teams turn structured content, component design, and frontend engineering into maintainable digital products.",
    body:
      "My work combines React UI development, content modeling, and delivery workflows to create systems that are easier to scale, easier to manage, and clearer for both users and teams.",
    proofPoints: [
      "Design systems and component architecture",
      "Contentful, AEM, and structured content workflows",
      "Frontend systems built for scale and clarity",
    ],
    actions: [
      {
        sys: makeSys("hero-action-primary", "linkAction"),
        fields: {
          label: "View Projects",
          href: "#projects",
          variant: "primary",
          openInNewTab: false,
        },
      } as LinkAction,
      {
        sys: makeSys("hero-action-secondary", "linkAction"),
        fields: {
          label: "About Me",
          href: "#timeline",
          variant: "secondary",
          openInNewTab: false,
        },
      } as LinkAction,
    ],
  },
};

const timelineSection: SectionTimeline = {
  sys: makeSys("section-timeline", "sectionTimeline"),
  fields: {
    internalName: "Timeline",
    anchorId: "timeline",
    eyebrow: "Experience",
    title: "Experience",
    intro: "A few highlights from the last few years of building and leading content-forward products.",
    items: timelineItems,
  },
};

const projectsSection: SectionProjects = {
  sys: makeSys("section-projects", "sectionProjects"),
  fields: {
    internalName: "Projects",
    anchorId: "projects",
    eyebrow: "Selected Work",
    title: "Selected Projects",
    intro: "A few product and platform builds with measurable outcomes and strong execution detail.",
    projects: [
      {
        sys: makeSys("project-platform-refresh", "project"),
        fields: {
          internalName: "Platform Refresh",
          name: "Platform Refresh",
          tagline: "Resilient web foundations for content-heavy pages",
          summary:
            "Modernized rendering and section contracts so teams could ship content changes faster with fewer regressions.",
          role: "Lead Engineer",
          period: "2024 — Present",
          featured: true,
          thumbnail: mediaAssets[0],
          thumbnailAlt: "Dashboard showing rollout progress and content metrics",
          highlights: [
            "Reduced regressions by standardizing section contracts",
            "Accelerated authoring velocity with reusable content patterns",
          ],
          techStack: ["React", "TypeScript", "Storybook"],
          links: [
            {
              sys: makeSys("project-platform-refresh-link-case-study", "projectLink"),
              fields: {
                internalName: "Platform Refresh Case Study",
                label: "Case Study",
                href: "https://example.com/platform-refresh/case-study",
                kind: "case-study",
                analyticsLabel: "platform-refresh-case-study",
              },
            },
            {
              sys: makeSys("project-platform-refresh-link-demo", "projectLink"),
              fields: {
                label: "Live Demo",
                href: "https://example.com/platform-refresh/live",
                url: "https://example.com/platform-refresh/demo",
                kind: "demo",
                openInNewTab: false,
              },
            },
            {
              sys: makeSys("project-platform-refresh-link-code", "projectLink"),
              fields: {
                label: "Source",
                url: "https://example.com/platform-refresh/code",
                kind: "code",
                ariaLabel: "Open platform refresh source code",
              },
            },
          ],
        },
      },
      {
        sys: makeSys("project-editorial-workflow", "project"),
        fields: {
          internalName: "Editorial Workflow Toolkit",
          name: "Editorial Workflow Toolkit",
          tagline: "Governance and publishing quality, built into the flow",
          summary:
            "Designed reusable entry patterns and checks that reduced publishing friction while improving content quality.",
          role: "Content Systems",
          period: "2023 — 2024",
          thumbnail: mediaAssets[1],
          highlights: [
            "Introduced authoring QA gates with clear escalation paths",
            "Lowered time-to-publish across high-volume pages",
          ],
          techStack: ["Contentful", "CI", "Automation"],
          links: [
            {
              sys: makeSys("project-editorial-workflow-link-article", "projectLink"),
              fields: {
                label: "Implementation Notes",
                url: "https://example.com/editorial-workflow/article",
                kind: "article",
                variant: "primary",
                openInNewTab: true,
              },
            },
            {
              sys: makeSys("project-editorial-workflow-link-demo", "projectLink"),
              fields: {
                label: "Workflow Demo",
                href: "https://example.com/editorial-workflow/demo",
                url: "https://example.com/editorial-workflow/legacy-demo",
                kind: "demo",
              },
            },
          ],
        },
      },
      {
        sys: makeSys("project-performance-baseline", "project"),
        fields: {
          internalName: "Performance Baseline Program",
          name: "Performance Baseline Program",
          tagline: "Clear metrics and predictable performance across releases",
          summary:
            "Established practical performance budgets and CI checks to keep critical user journeys fast as the site scaled.",
          role: "Web Platform",
          period: "2022 — 2023",
          thumbnail: mediaAssets[2],
          highlights: [
            "Added release-time performance budgets and alerts",
            "Improved median LCP across core pages by double digits",
          ],
          techStack: ["Lighthouse CI", "Vite", "TypeScript"],
          links: [
            {
              sys: makeSys("project-performance-baseline-link-code", "projectLink"),
              fields: {
                label: "Repository",
                href: "https://example.com/performance-baseline/code",
                url: "https://example.com/performance-baseline/legacy-code",
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

const skillsSection: SectionSkills = {
  sys: makeSys("section-skills", "sectionSkills"),
  fields: {
    internalName: "Skills",
    anchorId: "skills",
    eyebrow: "Capabilities",
    title: "Skills Snapshot",
    intro: "A practical view of where I drive the most impact right now.",
    groups: [
      {
        sys: makeSys("skills-group-frontend", "skillGroup"),
        fields: {
          internalName: "Frontend Group",
          label: "Frontend Architecture",
          description: "Design-system execution, component contracts, and UX polish.",
          iconKey: "frontend",
          skills: [
            {
              sys: makeSys("skills-react", "skill"),
              fields: {
                internalName: "React Skill",
                name: "React",
                level: "expert",
                keywords: ["hooks", "composition", "state"],
              },
            },
            {
              sys: makeSys("skills-ts", "skill"),
              fields: {
                name: "TypeScript",
                level: "active",
                keywords: ["type safety", "contracts"],
              },
            },
          ],
        },
      },
      {
        sys: makeSys("skills-group-content", "skillGroup"),
        fields: {
          label: "Content Systems",
          description: "Content modeling and editorial workflows for scalable delivery.",
          iconKey: "content",
          skills: [
            {
              sys: makeSys("skills-modeling", "skill"),
              fields: {
                name: "Content Modeling",
                level: "core",
                keywords: ["schema design", "governance"],
              },
            },
            {
              sys: makeSys("skills-ai-workflows", "skill"),
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

const learningSection: SectionLearning = {
  sys: makeSys("section-learning", "sectionLearning"),
  fields: {
    internalName: "Learning",
    anchorId: "learning",
    eyebrow: "Learning",
    title: "Learning in Public",
    intro: "Roadmap milestones reflecting the current Contentful learning timeline and priorities.",
    items: [
      {
        sys: makeSys("learning-search-native-content-modeling", "learningItem"),
        fields: {
          internalName: "Search-native Content Modeling",
          topic: "Search-native content modeling",
          description:
            "Modeling content for retrieval quality, reusable taxonomy, and query-friendly section structures.",
          status: "shipping",
          focusAreas: ["Content Architecture", "Search Semantics", "Taxonomy"],
          roadmapLabel: "Q2 2025",
          sortOrder: 1,
          isNextUp: false,
          linkLabel: "Read modeling notes",
          linkUrl: "https://example.com/learning/search-native-content-modeling",
        },
      },
      {
        sys: makeSys("learning-design-system-foundations", "learningItem"),
        fields: {
          internalName: "Design System Foundations",
          topic: "Design system foundations",
          description:
            "Hardening primitive contracts, tokens, and section composition rules for long-term consistency.",
          status: "practicing",
          focusAreas: ["Tokens", "Primitives", "Section Contracts"],
          roadmapLabel: "Q3 2025",
          sortOrder: 2,
          isNextUp: false,
          linkLabel: "View system checklist",
          linkUrl: "https://example.com/learning/design-system-foundations",
        },
      },
      {
        sys: makeSys("learning-storybook-workflow", "learningItem"),
        fields: {
          internalName: "Storybook Workflow",
          topic: "Storybook workflow",
          description:
            "Standardizing stories, interaction tests, and review flows to improve UI delivery quality.",
          status: "practicing",
          focusAreas: ["Storybook", "Interaction Tests", "Review Workflow"],
          roadmapLabel: "Q4 2025",
          sortOrder: 3,
          isNextUp: false,
          linkLabel: "Read Storybook workflow notes",
          linkUrl: "https://example.com/learning/storybook-workflow",
        },
      },
      {
        sys: makeSys("learning-advanced-typescript-patterns", "learningItem"),
        fields: {
          internalName: "Advanced TypeScript Patterns",
          topic: "Advanced TypeScript patterns",
          description:
            "Applying advanced type patterns to strengthen section boundaries and migration safety.",
          status: "exploring",
          focusAreas: ["Type Inference", "Discriminated Unions", "Type-Level Utilities"],
          roadmapLabel: "Q1 2026",
          sortOrder: 4,
          isNextUp: true,
          linkLabel: "Track TypeScript roadmap",
          linkUrl: "https://example.com/learning/advanced-typescript-patterns",
        },
      },
    ],
  },
};

const footerSection: SectionFooter = {
  sys: makeSys("section-footer", "sectionFooter"),
  fields: {
    internalName: "Footer",
    brandTitle: "Gilberto Haro",
    brandSubtitle: "Web Engineer · Content Systems",
    summary:
      "Building resilient web experiences with clear section contracts and editorially calm design.",
    navigationGroups: [
      {
        sys: makeSys("footer-group-site", "footerLinkGroup"),
        fields: {
          internalName: "Footer Site Links",
          label: "Site",
          links: [
            {
              sys: makeSys("footer-link-about", "footerLink"),
              fields: {
                label: "About",
                href: "#top",
                kind: "nav",
                iconKey: "arrow",
              },
            },
            {
              sys: makeSys("footer-link-experience", "footerLink"),
              fields: {
                label: "Experience",
                href: "#timeline",
                kind: "nav",
                iconKey: "arrow",
              },
            },
            {
              sys: makeSys("footer-link-projects", "footerLink"),
              fields: {
                label: "Projects",
                href: "#projects",
                kind: "nav",
                iconKey: "arrow",
              },
            },
            {
              sys: makeSys("footer-link-learning", "footerLink"),
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
        sys: makeSys("footer-group-connect", "footerLinkGroup"),
        fields: {
          internalName: "Footer Connect Links",
          label: "Connect",
          links: [
            {
              sys: makeSys("footer-link-contact", "footerLink"),
              fields: {
                label: "Contact",
                href: "mailto:hello@example.com",
                kind: "nav",
                iconKey: "arrow",
                openInNewTab: false,
              },
            },
            {
              sys: makeSys("footer-link-resume", "footerLink"),
              fields: {
                label: "Resume",
                href: "https://example.com/resume",
                kind: "cta",
              },
            },
          ],
        },
      },
    ],
    socialLinks: [
      {
        sys: makeSys("footer-social-github", "footerLink"),
        fields: {
          label: "GitHub",
          href: "https://github.com/example",
          kind: "social",
          iconKey: "github",
        },
      },
      {
        sys: makeSys("footer-social-linkedin", "footerLink"),
        fields: {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/example",
          kind: "social",
          iconKey: "linkedin",
        },
      },
      {
        sys: makeSys("footer-social-email", "footerLink"),
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
    builtWithText: "Built with React, TypeScript, and Contentful.",
  },
};

const navLinks: NavigationLinkData[] = [
  {
    id: "nav-hero",
    label: "About",
    href: "#top",
    isExternal: false,
    isCta: false,
    mobileBehavior: "link",
  },
  {
    id: "nav-timeline",
    label: "Experience",
    href: "#timeline",
    isExternal: false,
    isCta: false,
    mobileBehavior: "link",
  },
  {
    id: "nav-projects",
    label: "Projects",
    href: "#projects",
    isExternal: false,
    isCta: false,
    mobileBehavior: "link",
  },
  {
    id: "nav-skills",
    label: "Skills",
    href: "#skills",
    isExternal: false,
    isCta: false,
    mobileBehavior: "link",
  },
  {
    id: "nav-learning",
    label: "Learning",
    href: "#learning",
    isExternal: false,
    isCta: false,
    mobileBehavior: "link",
  },
];

export const staticNavigation: NavigationMenuData = {
  brandLabel: "Gilberto Haro",
  brandHref: "#top",
  links: navLinks,
  cta: {
    id: "nav-contact",
    label: "Contact",
    href: "mailto:hello@example.com",
    isExternal: true,
    isCta: true,
    mobileBehavior: "link",
  },
  mobileBreakpointPx: 960,
};

export const staticLandingPage: LandingPageData = {
  metaTitle: "Gilberto Haro — Personal Site",
  metaDescription:
    "Frontend and content systems engineer delivering resilient, content-driven experiences.",
  sections: [heroSection, timelineSection, projectsSection, skillsSection, learningSection],
  footer: footerSection,
};
