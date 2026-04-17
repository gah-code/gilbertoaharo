import type {
  Article,
  ArticlePageData,
  LandingPageData,
  NavCard,
  NavLink,
  NavPanel,
  NavigationMenu,
  NavigationMenuData,
  NavigationLinkData,
  PagePersonalLanding,
  Project,
  ProjectLink,
  SectionProjects,
  SectionEntry,
  SectionTimeline,
  TimelineItem,
} from "./types";
import { env } from "@/env";

export function mapLandingPage(page: PagePersonalLanding): LandingPageData {
  return {
    metaTitle: page.fields.metaTitle,
    metaDescription: page.fields.metaDescription,
    sections: page.fields.sections.map(mapSection),
  };
}

export function resolveProjectLink(link: ProjectLink): {
  href: string;
  label: string;
  kind?: ProjectLink["fields"]["kind"];
  variant?: ProjectLink["fields"]["variant"];
  openInNewTab: boolean;
  ariaLabel?: string;
  analyticsLabel?: string;
} {
  const prefix = env.articlePrefix;
  const articleSlug = link.fields.article?.fields.slug?.trim();
  const hrefValue = link.fields.href?.trim();
  const urlValue = link.fields.url?.trim();

  // internal article reference wins
  const href =
    articleSlug && articleSlug.length
      ? `${prefix}/${articleSlug}`
      : (hrefValue || urlValue || "#");
  const isExternal = /^https?:\/\//i.test(href);

  return {
    href,
    label: link.fields.label,
    kind: link.fields.kind,
    variant: link.fields.variant,
    openInNewTab: link.fields.openInNewTab ?? isExternal,
    ariaLabel: link.fields.ariaLabel,
    analyticsLabel: link.fields.analyticsLabel ?? link.fields.label,
  };
}

export function mapArticlePage(article: Article): ArticlePageData {
  const prefix = env.articlePrefix;
  const siteUrl = env.siteUrl;

  const canonicalFallback = siteUrl
    ? `${siteUrl}${prefix}/${article.fields.slug}`
    : `${prefix}/${article.fields.slug}`;

  const seoTitle = article.fields.metaTitle ?? article.fields.title;
  const seoDesc = article.fields.metaDescription ?? article.fields.excerpt;

  const attachments = (article.fields.attachments ?? [])
    .map((a) => a.fields.file)
    .filter(Boolean)
    .map((file) => ({
      url: file!.url.startsWith("//") ? `https:${file!.url}` : file!.url,
      fileName: file!.fileName,
      contentType: file!.contentType,
    }));

  const hero = article.fields.heroImage?.fields.file?.url;
  const heroImageUrl = hero
    ? hero.startsWith("//")
      ? `https:${hero}`
      : hero
    : undefined;

  return {
    slug: article.fields.slug,
    title: article.fields.title,
    excerpt: article.fields.excerpt,
    authorName: article.fields.author?.fields.name,
    publishedAt: article.fields.publishedAt,
    updatedAt: article.fields.updatedAt,
    heroImageUrl,
    body: article.fields.body,
    attachments,
    seo: {
      title: seoTitle,
      description: seoDesc,
      canonicalUrl: article.fields.canonicalUrl ?? canonicalFallback,
    },
  };
}

function normalizeAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function mapNavCard(card: NavCard) {
  return {
    id: card.sys.id,
    title: card.fields.title,
    description: card.fields.description,
    href: card.fields.href,
    status: card.fields.status ?? "default",
    iconType: card.fields.iconType ?? "emoji",
    iconValue: card.fields.iconValue,
    iconUrl: normalizeAssetUrl(card.fields.iconAsset?.fields.file?.url),
  };
}

function mapNavPanel(panel: NavPanel) {
  const cards = [...(panel.fields.cards ?? [])].sort(
    (a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0),
  );
  return {
    id: panel.sys.id,
    align: panel.fields.align ?? "center",
    widthPx: panel.fields.widthPx,
    mobileVariant: panel.fields.mobileVariant ?? "dropdown",
    defaultOpenMobile: panel.fields.defaultOpenMobile,
    cards: cards.map(mapNavCard),
  };
}

function mapNavLink(link: NavLink): NavigationLinkData {
  const href = link.fields.href || "#";
  const isExternal =
    link.fields.isExternal ?? /^https?:\/\//i.test(href);

  const panel = link.fields.panel ? mapNavPanel(link.fields.panel) : undefined;
  const mobileBehavior =
    link.fields.mobileBehavior ??
    (panel ? "drawerAccordion" : "link");

  return {
    id: link.sys.id,
    label: link.fields.label,
    href,
    isExternal,
    isCta: Boolean(link.fields.isCta),
    mobileBehavior,
    panel,
  };
}

export function mapNavigationMenu(menu: NavigationMenu): NavigationMenuData {
  const links = [...(menu.fields.links ?? [])].sort(
    (a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0),
  );

  const mappedLinks = links.map(mapNavLink);
  const cta = mapNavLink(menu.fields.ctaLink);
  const fallbackBreakpoint = 960;
  const configuredBreakpoint = menu.fields.mobileBreakpointPx ?? fallbackBreakpoint;
  const mobileBreakpoint = Math.max(640, configuredBreakpoint);

  return {
    brandLabel: menu.fields.brandLabel,
    brandHref: menu.fields.brandHref,
    links: mappedLinks,
    cta,
    mobileBreakpointPx: mobileBreakpoint,
  };
}

/* -------- Timeline mapping (defensive) -------- */

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function mapTimelineItem(item: TimelineItem): TimelineItem {
  const fields = item.fields;

  return {
    sys: item.sys,
    fields: {
      kind: fields.kind,
      title: fields.title,
      organization: fields.organization,
      location: fields.location,
      context: fields.context,
      startDate: fields.startDate,
      endDate: fields.endDate,
      startDateValue: fields.startDateValue,
      endDateValue: fields.endDateValue,
      isCurrent: fields.isCurrent,
      summary: fields.summary,
      highlights: safeArray(fields.highlights),
      tags: safeArray(fields.tags),
      mediaImage: fields.mediaImage,
      media: fields.media,
      mediaAlt: fields.mediaAlt,
      action: fields.action,
      ctaLabel: fields.ctaLabel,
      ctaHref: fields.ctaHref,
    },
  };
}

function mapTimelineSection(section: SectionTimeline): SectionTimeline {
  const fields = section.fields;
  return {
    sys: section.sys,
    fields: {
      internalName: fields.internalName,
      anchorId: fields.anchorId || section.sys.id,
      title: fields.title,
      eyebrow: fields.eyebrow,
      intro: fields.intro,
      items: safeArray(fields.items).map(mapTimelineItem),
    },
  };
}

function mapProjectLink(link: ProjectLink): ProjectLink {
  const fields = link.fields;

  return {
    sys: link.sys,
    fields: {
      internalName: fields.internalName,
      label: fields.label,
      href: fields.href,
      url: fields.url,
      kind: fields.kind,
      variant: fields.variant,
      openInNewTab: fields.openInNewTab,
      ariaLabel: fields.ariaLabel,
      analyticsLabel: fields.analyticsLabel,
      article: fields.article,
    },
  };
}

function mapProject(project: Project): Project {
  const fields = project.fields;

  return {
    sys: project.sys,
    fields: {
      internalName: fields.internalName,
      name: fields.name,
      tagline: fields.tagline,
      summary: fields.summary,
      role: fields.role,
      period: fields.period,
      featured: fields.featured,
      thumbnail: fields.thumbnail,
      thumbnailAlt: fields.thumbnailAlt,
      highlights: safeArray(fields.highlights),
      techStack: safeArray(fields.techStack),
      links: safeArray(fields.links).map(mapProjectLink),
    },
  };
}

function mapProjectsSection(section: SectionProjects): SectionProjects {
  const fields = section.fields;

  return {
    sys: section.sys,
    fields: {
      internalName: fields.internalName,
      anchorId: fields.anchorId || section.sys.id,
      eyebrow: fields.eyebrow,
      title: fields.title,
      intro: fields.intro,
      projects: safeArray(fields.projects).map(mapProject),
    },
  };
}

function mapSection(section: SectionEntry): SectionEntry {
  const id = section.sys.contentType.sys.id;
  if (id === "sectionTimeline") {
    return mapTimelineSection(section as SectionTimeline);
  }
  if (id === "sectionProjects") {
    return mapProjectsSection(section as SectionProjects);
  }
  return section;
}
