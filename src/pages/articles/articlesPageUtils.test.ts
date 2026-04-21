import { describe, expect, it } from "vitest";
import type { ArticleListItem } from "@/content/contentful/types";
import {
  getSortTimestamp,
  normalizeArticles,
  sortArticles,
} from "./articlesPageUtils";

function makeArticle(
  overrides: Partial<ArticleListItem> & Pick<ArticleListItem, "slug" | "title">,
): ArticleListItem {
  return {
    slug: overrides.slug,
    title: overrides.title,
    excerpt: overrides.excerpt,
    authorName: overrides.authorName,
    publishedAt: overrides.publishedAt,
    updatedAt: overrides.updatedAt,
    heroImageUrl: overrides.heroImageUrl,
  };
}

describe("articlesPageUtils", () => {
  it("filters invalid items missing slug or title", () => {
    const normalized = normalizeArticles([
      makeArticle({ slug: "valid", title: "Valid title" }),
      makeArticle({ slug: "   ", title: "Missing slug after trim" }),
      makeArticle({ slug: "missing-title", title: "   " }),
      makeArticle({ slug: "", title: "Missing slug" }),
    ]);

    expect(normalized).toHaveLength(1);
    expect(normalized[0]?.slug).toBe("valid");
  });

  it("trims optional strings and preserves valid article fields", () => {
    const normalized = normalizeArticles([
      makeArticle({
        slug: "  first-article  ",
        title: "  First Article  ",
        excerpt: "  Trim this excerpt.  ",
        authorName: "  Gilberto Haro  ",
        publishedAt: " 2026-03-10T09:00:00.000Z ",
        updatedAt: " 2026-03-12T08:30:00.000Z ",
        heroImageUrl: " https://images.example.com/first.jpg ",
      }),
    ]);

    expect(normalized).toEqual([
      {
        slug: "first-article",
        title: "First Article",
        excerpt: "Trim this excerpt.",
        authorName: "Gilberto Haro",
        publishedAt: "2026-03-10T09:00:00.000Z",
        updatedAt: "2026-03-12T08:30:00.000Z",
        heroImageUrl: "https://images.example.com/first.jpg",
      },
    ]);
  });

  it("preserves already-valid fields", () => {
    const item = makeArticle({
      slug: "kept",
      title: "Kept Title",
      excerpt: "Kept excerpt",
      authorName: "Kept Author",
      publishedAt: "2026-05-01T00:00:00.000Z",
      updatedAt: "2026-05-02T00:00:00.000Z",
      heroImageUrl: "https://images.example.com/kept.jpg",
    });

    const normalized = normalizeArticles([item]);
    expect(normalized[0]).toEqual(item);
  });

  it("sortArticles sorts by publishedAt descending", () => {
    const sorted = sortArticles([
      makeArticle({
        slug: "older",
        title: "Older",
        publishedAt: "2026-01-01T00:00:00.000Z",
      }),
      makeArticle({
        slug: "newer",
        title: "Newer",
        publishedAt: "2026-04-01T00:00:00.000Z",
      }),
    ]);

    expect(sorted.map((item) => item.slug)).toEqual(["newer", "older"]);
  });

  it("falls back to updatedAt descending when publishedAt is missing", () => {
    const sorted = sortArticles([
      makeArticle({
        slug: "updated-older",
        title: "Updated Older",
        updatedAt: "2026-01-05T00:00:00.000Z",
      }),
      makeArticle({
        slug: "updated-newer",
        title: "Updated Newer",
        updatedAt: "2026-02-01T00:00:00.000Z",
      }),
    ]);

    expect(sorted.map((item) => item.slug)).toEqual([
      "updated-newer",
      "updated-older",
    ]);
  });

  it("falls back to title ascending when timestamps are equal or invalid", () => {
    const sorted = sortArticles([
      makeArticle({ slug: "c-title", title: "Charlie", publishedAt: "invalid-date" }),
      makeArticle({ slug: "a-title", title: "alpha", publishedAt: "invalid-date" }),
      makeArticle({ slug: "b-title", title: "Bravo", publishedAt: "invalid-date" }),
    ]);

    expect(sorted.map((item) => item.title)).toEqual(["alpha", "Bravo", "Charlie"]);
  });

  it("getSortTimestamp returns 0 for invalid or missing dates", () => {
    expect(getSortTimestamp(makeArticle({ slug: "missing", title: "Missing" }))).toBe(0);
    expect(
      getSortTimestamp(
        makeArticle({
          slug: "invalid",
          title: "Invalid",
          publishedAt: "not-a-date",
          updatedAt: "also-not-a-date",
        }),
      ),
    ).toBe(0);
  });
});
