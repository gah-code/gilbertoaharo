import { contentful } from "./client";
import type { PagePersonalLanding, Article } from "./types";

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
