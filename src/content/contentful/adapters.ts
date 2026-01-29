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
  ProjectLink,
} from "./types";

export function mapLandingPage(page: PagePersonalLanding): LandingPageData {
  return {
    metaTitle: page.fields.metaTitle,
    metaDescription: page.fields.metaDescription,
    sections: page.fields.sections,
  };
}

export function resolveProjectLink(link: ProjectLink): {
  href: string;
  label: string;
  analyticsLabel?: string;
} {
  const prefix = String(
    import.meta.env.VITE_ARTICLE_ROUTE_PREFIX || "/articles",
  );

  // internal article reference wins
  const slug = link.fields.article?.fields.slug;
  const href = slug ? `${prefix}/${slug}` : (link.fields.url ?? "#");

  return {
    href,
    label: link.fields.label,
    analyticsLabel: link.fields.analyticsLabel ?? link.fields.label,
  };
}

export function mapArticlePage(article: Article): ArticlePageData {
  const prefix = String(
    import.meta.env.VITE_ARTICLE_ROUTE_PREFIX || "/articles",
  );
  const siteUrl = String(import.meta.env.VITE_SITE_URL || "");

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
