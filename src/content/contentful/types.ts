export type RichTextDocument = unknown;

export type SocialLinkKind =
  | "email"
  | "linkedin"
  | "github"
  | "x"
  | "portfolio"
  | "other";
export type TimelineItemKind = "role" | "education" | "milestone";
export type SkillLevel = "working" | "strong" | "expert";
export type HeroStyle = "typographic" | "avatar" | "image";
export type ProjectLinkKind =
  | "code"
  | "demo"
  | "case-study"
  | "article"
  | "other";
export type LearningStatus = "exploring" | "practicing" | "shipping";
export type NavMobileBehavior = "link" | "drawerAccordion";
export type NavPanelAlign = "center" | "left";
export type NavPanelMobileVariant = "dropdown" | "accordionList";
export type NavCardStatus = "default" | "activeDefault" | "comingSoon";
export type NavIconType = "emoji" | "svg" | "asset";

export type EntryTypeId =
  | "personProfile"
  | "socialLink"
  | "pagePersonalLanding"
  | "sectionHero"
  | "sectionTimeline"
  | "timelineItem"
  | "sectionSkills"
  | "skillGroup"
  | "skill"
  | "sectionProjects"
  | "project"
  | "projectLink"
  | "sectionLearning"
  | "learningItem"
  | "sectionContact"
  | "article"
  | "navigationMenu"
  | "navLink"
  | "navPanel"
  | "navCard";

export interface Sys<T extends EntryTypeId> {
  id: string;
  contentType: { sys: { id: T } };
}

export interface Entry<T extends EntryTypeId, Fields> {
  sys: Sys<T>;
  fields: Fields;
}

export interface Asset {
  sys: { id: string };
  fields: {
    title?: string;
    description?: string;
    file?: { url: string; fileName?: string; contentType?: string };
  };
}

/* ----- Core entries ----- */

export type PersonProfile = Entry<
  "personProfile",
  {
    name: string;
    title: string;
    shortBio?: string;
    location?: string;
    avatar?: Asset;
  }
>;

export type SocialLink = Entry<
  "socialLink",
  {
    label: string;
    url: string;
    kind?: SocialLinkKind;
  }
>;

export type NavCard = Entry<
  "navCard",
  {
    title: string;
    description?: string;
    href: string;
    order: number;
    status?: NavCardStatus;
    iconType?: NavIconType;
    iconValue?: string;
    iconAsset?: Asset;
  }
>;

export type NavPanel = Entry<
  "navPanel",
  {
    internalName: string;
    cards: NavCard[];
    align?: NavPanelAlign;
    widthPx?: number;
    mobileVariant?: NavPanelMobileVariant;
    defaultOpenMobile?: boolean;
  }
>;

export type NavLink = Entry<
  "navLink",
  {
    label: string;
    href: string;
    order: number;
    isCta?: boolean;
    isExternal?: boolean;
    mobileBehavior?: NavMobileBehavior;
    panel?: NavPanel;
  }
>;

export type NavigationMenu = Entry<
  "navigationMenu",
  {
    internalName: string;
    brandLabel: string;
    brandHref: string;
    links: NavLink[];
    ctaLink: NavLink;
    mobileBreakpointPx?: number;
  }
>;

/* ----- Sections ----- */

export type SectionHero = Entry<
  "sectionHero",
  {
    internalName: string;
    anchorId: string;
    title: string;
    eyebrow?: string;
    heroStyle?: HeroStyle;
    avatarImage?: Asset;
    heroImage?: Asset;
    tagline: string;
    intro: string;
    primaryActionLabel?: string;
    primaryActionHref?: string;
    secondaryActionLabel?: string;
    secondaryActionHref?: string;
    highlights?: string[];
  }
>;

export type TimelineItem = Entry<
  "timelineItem",
  {
    kind: TimelineItemKind;
    title: string;
    organization?: string;
    location?: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
    tags?: string[];
    mediaImage?: Asset;
    mediaAlt?: string;
    ctaLabel?: string;
    ctaHref?: string;
  }
>;

export type SectionTimeline = Entry<
  "sectionTimeline",
  {
    internalName: string;
    anchorId: string;
    title: string;
    items: TimelineItem[];
  }
>;

export type Skill = Entry<
  "skill",
  {
    name: string;
    level?: SkillLevel;
    keywords?: string[];
  }
>;

export type SkillGroup = Entry<
  "skillGroup",
  {
    label: string;
    skills: Skill[];
  }
>;

export type SectionSkills = Entry<
  "sectionSkills",
  {
    internalName: string;
    anchorId: string;
    title: string;
    groups: SkillGroup[];
  }
>;

export type Article = Entry<
  "article",
  {
    internalName: string;
    slug: string;
    title: string;
    excerpt?: string;
    author?: PersonProfile;
    publishedAt?: string;
    updatedAt?: string;
    body: RichTextDocument;
    heroImage?: Asset;
    attachments?: Asset[];
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  }
>;

export type ProjectLink = Entry<
  "projectLink",
  {
    label: string;
    url?: string;
    kind?: ProjectLinkKind;
    article?: Article;
    analyticsLabel?: string;
  }
>;

export type Project = Entry<
  "project",
  {
    name: string;
    tagline?: string;
    summary?: string;
    role?: string;
    period?: string;
    techStack?: string[];
    links?: ProjectLink[];
  }
>;

export type SectionProjects = Entry<
  "sectionProjects",
  {
    internalName: string;
    anchorId: string;
    title: string;
    projects: Project[];
  }
>;

export type LearningItem = Entry<
  "learningItem",
  {
    topic: string;
    description?: string;
    status?: LearningStatus;
    linkLabel?: string;
    linkUrl?: string;
  }
>;

export type SectionLearning = Entry<
  "sectionLearning",
  {
    internalName: string;
    anchorId: string;
    title: string;
    items: LearningItem[];
  }
>;

export type SectionContact = Entry<
  "sectionContact",
  {
    internalName: string;
    anchorId: string;
    title: string;
    intro?: string;
    email: string;
    links?: SocialLink[];
  }
>;

export type SectionEntry =
  | SectionHero
  | SectionTimeline
  | SectionSkills
  | SectionProjects
  | SectionLearning
  | SectionContact;

export type PagePersonalLanding = Entry<
  "pagePersonalLanding",
  {
    internalName: string;
    slug: string;
    metaTitle: string;
    metaDescription?: string;
    sections: SectionEntry[];
  }
>;

/* ----- UI-ready data shapes ----- */

export type LandingPageData = {
  metaTitle: string;
  metaDescription?: string;
  sections: SectionEntry[];
};

export type ArticlePageData = {
  slug: string;
  title: string;
  excerpt?: string;
  authorName?: string;
  publishedAt?: string;
  updatedAt?: string;
  heroImageUrl?: string;
  body: RichTextDocument;
  attachments: Array<{ url: string; fileName?: string; contentType?: string }>;
  seo: { title: string; description?: string; canonicalUrl?: string };
};

export type NavigationCardData = {
  id: string;
  title: string;
  description?: string;
  href: string;
  status: NavCardStatus;
  iconType: NavIconType;
  iconValue?: string;
  iconUrl?: string;
};

export type NavigationPanelData = {
  id: string;
  align: NavPanelAlign;
  widthPx?: number;
  mobileVariant: NavPanelMobileVariant;
  defaultOpenMobile?: boolean;
  cards: NavigationCardData[];
};

export type NavigationLinkData = {
  id: string;
  label: string;
  href: string;
  isExternal: boolean;
  isCta: boolean;
  mobileBehavior: NavMobileBehavior;
  panel?: NavigationPanelData;
};

export type NavigationMenuData = {
  brandLabel: string;
  brandHref: string;
  links: NavigationLinkData[];
  cta: NavigationLinkData;
  mobileBreakpointPx: number;
};
