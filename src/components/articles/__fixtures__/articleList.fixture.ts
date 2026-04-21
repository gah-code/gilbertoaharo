import type { ArticleListItem } from "@/content/contentful/types";

export const defaultArticleListItemFixture: ArticleListItem = {
  slug: "resilient-content-systems",
  title: "Designing Resilient Content Systems for Fast Teams",
  excerpt:
    "How section contracts and additive models reduce regressions without slowing editorial teams.",
  authorName: "Gilberto Haro",
  publishedAt: "2026-03-10T09:00:00.000Z",
  updatedAt: "2026-03-12T08:30:00.000Z",
  heroImageUrl: "https://images.example.com/articles/resilient-content-systems.jpg",
};

export const noImageArticleListItemFixture: ArticleListItem = {
  ...defaultArticleListItemFixture,
  slug: "editorial-frontend-partnership",
  title: "Editorial and Frontend: A Better Operating Rhythm",
  heroImageUrl: undefined,
};

export const noExcerptArticleListItemFixture: ArticleListItem = {
  ...defaultArticleListItemFixture,
  slug: "thoughtful-interface-work",
  title: "Thoughtful Interface Work at Production Speed",
  excerpt: undefined,
};

export const minimalMetaArticleListItemFixture: ArticleListItem = {
  slug: "minimal-meta",
  title: "Minimal Metadata Example",
};

export const updatedOnlyArticleListItemFixture: ArticleListItem = {
  ...defaultArticleListItemFixture,
  slug: "updated-only",
  title: "Maintaining Typed Content Pipelines",
  publishedAt: undefined,
  updatedAt: "2026-04-12T12:45:00.000Z",
};

export const longTitleArticleListItemFixture: ArticleListItem = {
  ...defaultArticleListItemFixture,
  slug: "long-title",
  title:
    "A Very Long Article Title That Intentionally Wraps Across Multiple Lines to Validate Card Typography, Spacing, and CTA Stability at Narrow Widths",
};
