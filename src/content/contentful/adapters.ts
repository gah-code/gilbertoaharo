import type {
  Article,
  ArticlePageData,
  LandingPageData,
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
