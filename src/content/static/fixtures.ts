import timelineSearch from "@/assets/timeline/timeline-search.svg";
import timelineJourney from "@/assets/timeline/timeline-journey.svg";
import timelineCreative from "@/assets/timeline/timeline-creative.svg";
import type {
  LandingPageData,
  NavigationMenuData,
  NavigationLinkData,
  SectionHero,
  SectionTimeline,
  TimelineItem,
  Asset,
} from "../contentful/types";

const makeSys = <T extends string>(id: T, type: any) => ({
  id: String(id),
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
      startDate: "2023",
      endDate: "Present",
      summary: "Leading web platform delivery across marketing and content-heavy sites.",
      highlights: [
        "Built resilient CMS-first page templates and navigation",
        "Defined tokens and accessibility defaults across the design system",
      ],
      tags: ["CMS", "Design System"],
      mediaImage: mediaAssets[0],
      mediaAlt: "Looking at charts and search results",
      ctaLabel: "View projects",
      ctaHref: "#projects",
    },
  },
  {
    sys: makeSys("timeline-2", "timelineItem"),
    fields: {
      kind: "role",
      title: "Frontend Lead",
      organization: "Brightline",
      location: "Austin, TX",
      startDate: "2021",
      endDate: "2023",
      summary: "Scaled a component library and mentored engineers across squads.",
      highlights: [
        "Shipped responsive design system across marketing + product surfaces",
        "Partnered with content ops to streamline publishing workflows",
      ],
      tags: ["React", "Contentful"],
      mediaImage: mediaAssets[1],
      mediaAlt: "Journey path with milestones",
      ctaLabel: "See case study",
      ctaHref: "#",
    },
  },
  {
    sys: makeSys("timeline-3", "timelineItem"),
    fields: {
      kind: "milestone",
      title: "Content Modeling Coach",
      organization: "Freelance",
      location: "Remote",
      startDate: "2019",
      endDate: "2021",
      summary: "Advised teams on schema design and content delivery performance.",
      highlights: [
        "Introduced content model versioning and governance",
        "Reduced template sprawl with reusable sections and slots",
      ],
      tags: ["Content Modeling", "Architecture"],
      mediaImage: mediaAssets[2],
      mediaAlt: "Creative collaboration illustration",
      ctaLabel: "Book a chat",
      ctaHref: "mailto:hello@example.com",
    },
  },
];

const heroSection: SectionHero = {
  sys: makeSys("section-hero", "sectionHero"),
  fields: {
    internalName: "Hero",
    anchorId: "top",
    title: "Gilberto Alejandro Haro",
    eyebrow: "Web Engineer · Creative Technologist",
    heroStyle: "image",
    heroImage: mediaAssets[0],
    tagline: "Building resilient web systems with CMS-first foundations.",
    intro:
      "I combine engineering, content modeling, and technical marketing ops to deliver scalable, content-driven experiences.",
    primaryActionLabel: "Read more",
    primaryActionHref: "#timeline",
    secondaryActionLabel: "View projects",
    secondaryActionHref: "#projects",
    highlights: [
      "UI-first, CMS-second",
      "TypeScript + strong contracts",
      "Content modeling as code",
    ],
  },
};

const timelineSection: SectionTimeline = {
  sys: makeSys("section-timeline", "sectionTimeline"),
  fields: {
    internalName: "Timeline",
    anchorId: "timeline",
    title: "Experience",
    items: timelineItems,
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
  sections: [heroSection, timelineSection],
};
