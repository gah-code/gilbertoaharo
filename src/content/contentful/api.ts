import { contentful } from "./client";
import type {
  PagePersonalLanding,
  Article,
  NavigationMenu,
  SectionFooter,
} from "./types";

export async function fetchLandingPage(): Promise<PagePersonalLanding> {
  const res = await contentful.getEntries({
    content_type: "pagePersonalLanding",
    limit: 1,
    include: 10,
  });

  const entry = res.items[0] as unknown as PagePersonalLanding | undefined;
  if (!entry) throw new Error("No pagePersonalLanding entry found.");
  return entry;
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const res = await contentful.getEntries({
    content_type: "article",
    "fields.slug": slug,
    limit: 1,
    include: 10,
  });

  return (res.items[0] as unknown as Article | undefined) ?? null;
}

export async function fetchAllArticles(): Promise<Article[]> {
  const limit = 100;
  const allArticles: Article[] = [];
  let skip = 0;
  let total = Infinity;

  while (skip < total) {
    const res = await contentful.getEntries({
      content_type: "article",
      limit,
      skip,
      include: 2,
    });

    const batch = res.items as unknown as Article[];
    allArticles.push(...batch);
    total = res.total;
    skip += batch.length;

    if (batch.length === 0) {
      break;
    }
  }

  return allArticles;
}

export async function fetchNavigationMenu(): Promise<NavigationMenu> {
  const res = await contentful.getEntries({
    content_type: "navigationMenu",
    limit: 1,
    include: 5,
  });

  const entry = res.items[0] as unknown as NavigationMenu | undefined;
  if (!entry) throw new Error("No navigationMenu entry found.");
  return entry;
}

export async function fetchGlobalFooter(): Promise<SectionFooter | null> {
  const res = await contentful.getEntries({
    content_type: "sectionFooter",
    limit: 1,
    include: 10,
  });

  return (res.items[0] as unknown as SectionFooter | undefined) ?? null;
}
