import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { ArticleListItem } from "@/content/contentful/types";
import { getContentSource } from "@/content/source";
import { ArticlesPage } from "./ArticlesPage";

vi.mock("@/content/source", () => ({
  getContentSource: vi.fn(),
}));

vi.mock("@/components/layout/PageShell", () => ({
  PageShell: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-shell">{children}</div>
  ),
}));

function makeSource(itemsResult: Promise<ArticleListItem[]>) {
  return {
    getLandingPage: vi.fn(),
    getArticleBySlug: vi.fn(),
    getAllArticles: vi.fn(() => itemsResult),
    getNavigationMenu: vi.fn(),
    getFooter: vi.fn(),
  };
}

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

describe("ArticlesPage", () => {
  const mockGetContentSource = vi.mocked(getContentSource);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    mockGetContentSource.mockReturnValue(
      makeSource(new Promise<ArticleListItem[]>(() => {})),
    );

    render(<ArticlesPage />);
    expect(screen.getByText("Loading articles…")).toBeInTheDocument();
  });

  it("shows error state when getAllArticles rejects", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(Promise.reject(new Error("Fetch failed"))),
    );

    render(<ArticlesPage />);

    expect(await screen.findByText("Error: Fetch failed")).toBeInTheDocument();
  });

  it("shows empty state when getAllArticles returns []", async () => {
    mockGetContentSource.mockReturnValue(makeSource(Promise.resolve([])));

    render(<ArticlesPage />);

    expect(await screen.findByText("No articles found.")).toBeInTheDocument();
  });

  it("renders page framing text", async () => {
    mockGetContentSource.mockReturnValue(makeSource(Promise.resolve([])));

    render(<ArticlesPage />);

    expect(screen.getByText("Writing")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Articles", level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText(
        /Notes and long-form writing on web engineering, content systems, and thoughtful interface work\./,
      ),
    ).toBeInTheDocument();
    expect(await screen.findByText("No articles found.")).toBeInTheDocument();
  });

  it("renders article cards and applies sorted order", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(
        Promise.resolve([
          makeArticle({
            slug: "older",
            title: "Older Article",
            publishedAt: "2026-01-01T00:00:00.000Z",
          }),
          makeArticle({
            slug: "missing-title",
            title: "   ",
            publishedAt: "2026-02-01T00:00:00.000Z",
          }),
          makeArticle({
            slug: "newer",
            title: "Newer Article",
            publishedAt: "2026-04-01T00:00:00.000Z",
          }),
        ]),
      ),
    );

    render(<ArticlesPage />);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Newer Article", level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Older Article", level: 2 })).toBeInTheDocument();
    });

    const orderedCardHeadings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);

    expect(orderedCardHeadings).toEqual(["Newer Article", "Older Article"]);
    expect(screen.getAllByRole("link", { name: "Read article" })).toHaveLength(2);
  });
});
