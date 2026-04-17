import timelineSearch from "@/assets/timeline/timeline-search.svg";
import timelineJourney from "@/assets/timeline/timeline-journey.svg";
import timelineCreative from "@/assets/timeline/timeline-creative.svg";
import type {
  LandingPageData,
  NavigationMenuData,
  NavigationLinkData,
  EntryTypeId,
  SectionHero,
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
    title: "Gilberto Alejandro Haro",
    name: "Gilberto Haro",
    eyebrow: "Web Engineer · Creative Technologist",
    heroStyle: "image",
    heroImage: mediaAssets[0],
    heroImageAlt: "Illustration representing discovery and research",
    lead: "Building resilient web systems with CMS-first foundations.",
    body:
      "I combine engineering, content modeling, and technical marketing ops to deliver scalable, content-driven experiences.",
    proofPoints: [
      "UI-first, CMS-second",
      "TypeScript + strong contracts",
      "Content modeling as code",
    ],
    actions: [
      {
        sys: makeSys("hero-action-primary", "linkAction"),
        fields: {
          label: "Read more",
          href: "#timeline",
          variant: "primary",
          openInNewTab: false,
        },
      } as LinkAction,
      {
        sys: makeSys("hero-action-secondary", "linkAction"),
        fields: {
          label: "View projects",
          href: "#projects",
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
    id: "nav-skills",
    label: "Skills",
    href: "#skills",
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
  sections: [heroSection, timelineSection, skillsSection],
};
