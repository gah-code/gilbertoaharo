import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ArticlePageData } from "@/content/contentful/types";
import { getContentSource } from "@/content/source";
import { ArticlePage } from "./ArticlePage";

vi.mock("@/content/source", () => ({
  getContentSource: vi.fn(),
}));

vi.mock("@/components/rich-text/RichTextRenderer", () => ({
  RichTextRenderer: () => <div data-testid="rich-text-renderer" />,
}));

vi.mock("@/components/layout/PageShell", () => ({
  PageShell: ({
    title,
    description,
    canonicalUrl,
    children,
  }: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    children: React.ReactNode;
  }) => (
    <div
      data-testid="page-shell"
      data-title={title ?? ""}
      data-description={description ?? ""}
      data-canonical-url={canonicalUrl ?? ""}
    >
      {children}
    </div>
  ),
}));

function makeSource(result: Promise<ArticlePageData | null>) {
  return {
    getLandingPage: vi.fn(),
    getArticleBySlug: vi.fn(() => result),
    getAllArticles: vi.fn(),
    getNavigationMenu: vi.fn(),
    getFooter: vi.fn(),
  };
}

function makeArticle(overrides?: Partial<ArticlePageData>): ArticlePageData {
  return {
    slug: "typed-boundaries",
    title: "Typed Boundaries in Frontend Systems",
    excerpt: "A practical guide to typed boundaries and adaptation layers.",
    body: { nodeType: "document", data: {}, content: [] },
    attachments: [],
    seo: {
      title: "Typed Boundaries | Gilberto Haro",
      description: "How to keep CMS and UI contracts safe and maintainable.",
      canonicalUrl: "https://gilbertoharo.com/articles/typed-boundaries",
    },
    ...overrides,
  };
}

describe("ArticlePage SEO", () => {
  const mockGetContentSource = vi.mocked(getContentSource);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses mapped article SEO values", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(Promise.resolve(makeArticle())),
    );

    render(<ArticlePage slug="typed-boundaries" />);

    await waitFor(() => {
      expect(screen.getByText("Typed Boundaries in Frontend Systems")).toBeInTheDocument();
    });

    const shell = screen.getByTestId("page-shell");
    expect(shell).toHaveAttribute("data-title", "Typed Boundaries | Gilberto Haro");
    expect(shell).toHaveAttribute(
      "data-description",
      "How to keep CMS and UI contracts safe and maintainable.",
    );
    expect(shell).toHaveAttribute(
      "data-canonical-url",
      "https://gilbertoharo.com/articles/typed-boundaries",
    );
    expect(screen.getByRole("link", { name: "All articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/#projects",
    );
  });

  it("falls back to safe SEO values when article SEO fields are blank", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(
        Promise.resolve(
          makeArticle({
            seo: { title: "", description: "", canonicalUrl: "" },
          }),
        ),
      ),
    );

    render(<ArticlePage slug="typed-boundaries" />);

    await waitFor(() => {
      expect(screen.getByText("Typed Boundaries in Frontend Systems")).toBeInTheDocument();
    });

    const shell = screen.getByTestId("page-shell");
    expect(shell).toHaveAttribute(
      "data-title",
      "Typed Boundaries in Frontend Systems",
    );
    expect(shell).toHaveAttribute(
      "data-description",
      "A practical guide to typed boundaries and adaptation layers.",
    );
    expect(shell.getAttribute("data-canonical-url")).toContain(
      "/articles/typed-boundaries",
    );
  });

  it("uses not-found SEO when the requested article is missing", async () => {
    mockGetContentSource.mockReturnValue(makeSource(Promise.resolve(null)));

    render(<ArticlePage slug="missing-article" />);

    expect(await screen.findByRole("status")).toHaveTextContent("Not found.");

    const shell = screen.getByTestId("page-shell");
    expect(shell).toHaveAttribute("data-title", "Article not found | Gilberto Haro");
    expect(shell).toHaveAttribute(
      "data-description",
      "The requested article could not be found.",
    );
    expect(shell.getAttribute("data-canonical-url")).toContain("/articles");
    expect(screen.getByRole("link", { name: "Browse all articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
  });

  it("announces loading state accessibly while waiting for article data", () => {
    mockGetContentSource.mockReturnValue(
      makeSource(new Promise<ArticlePageData | null>(() => {})),
    );

    render(<ArticlePage slug="typed-boundaries" />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading…");
  });
});
