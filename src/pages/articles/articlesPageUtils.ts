import type { ArticleListItem } from "@/content/contentful/types";

function compactText(value?: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function getSortTimestamp(article: ArticleListItem): number {
  const iso = compactText(article.publishedAt) ?? compactText(article.updatedAt);
  if (!iso) return 0;
  const timestamp = new Date(iso).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function sortArticles(items: ArticleListItem[]): ArticleListItem[] {
  return [...items].sort((a, b) => {
    const timestampDiff = getSortTimestamp(b) - getSortTimestamp(a);
    if (timestampDiff !== 0) return timestampDiff;
    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });
}

export function normalizeArticles(items: ArticleListItem[]): ArticleListItem[] {
  const normalized = items
    .map((item) => ({
      slug: compactText(item.slug) ?? "",
      title: compactText(item.title) ?? "",
      excerpt: compactText(item.excerpt),
      authorName: compactText(item.authorName),
      publishedAt: compactText(item.publishedAt),
      updatedAt: compactText(item.updatedAt),
      heroImageUrl: compactText(item.heroImageUrl),
    }))
    .filter((item) => Boolean(item.slug) && Boolean(item.title));

  return sortArticles(normalized);
}
