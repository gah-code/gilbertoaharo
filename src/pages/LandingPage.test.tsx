import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ArticleListItem, LandingPageData } from "@/content/contentful/types";
import { getContentSource } from "@/content/source";
import { LandingPage } from "./LandingPage";

vi.mock("@/content/source", () => ({
  getContentSource: vi.fn(),
}));

vi.mock("@/components/sections/SectionRenderer", () => ({
  SectionRenderer: () => <div data-testid="section-renderer" />,
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

function makeSource(
  landingResult: Promise<LandingPageData>,
  articlesResult: Promise<ArticleListItem[]> = Promise.resolve([]),
) {
  return {
    getLandingPage: vi.fn(() => landingResult),
    getArticleBySlug: vi.fn(),
    getAllArticles: vi.fn(() => articlesResult),
    getNavigationMenu: vi.fn(),
    getFooter: vi.fn(),
  };
}

describe("LandingPage SEO", () => {
  const mockGetContentSource = vi.mocked(getContentSource);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses mapped metadata with route-level fallbacks", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(
        Promise.resolve({
          metaTitle: "Home | Gilberto Haro",
          // Missing description should fall back to route default.
          sections: [],
          footer: undefined,
        }),
      ),
    );

    render(<LandingPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading…")).not.toBeInTheDocument();
    });

    const shell = screen.getByTestId("page-shell");
    expect(shell).toHaveAttribute("data-title", "Home | Gilberto Haro");
    expect(shell).toHaveAttribute(
      "data-description",
      "Frontend engineering portfolio focused on content systems, design systems, and maintainable web architecture.",
    );
    expect(shell.getAttribute("data-canonical-url")).toContain("/");
  });

  it("renders a latest writing bridge with links to article index and project anchor", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(
        Promise.resolve({
          metaTitle: "Home | Gilberto Haro",
          metaDescription: "Landing description",
          sections: [],
          footer: undefined,
        }),
        Promise.resolve([
          {
            slug: "typed-boundaries",
            title: "Typed Boundaries",
            publishedAt: "2026-04-10T00:00:00.000Z",
          },
          {
            slug: "frontend-systems",
            title: "Frontend Systems",
            publishedAt: "2026-03-01T00:00:00.000Z",
          },
        ]),
      ),
    );

    render(<LandingPage />);

    expect(
      await screen.findByRole("heading", { name: "Latest writing", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Typed Boundaries",
      }),
    ).toHaveAttribute("href", "/articles/typed-boundaries");
    expect(
      screen.getByRole("link", { name: "Browse all articles" }),
    ).toHaveAttribute("href", "/articles");
    expect(screen.getByRole("link", { name: "Explore projects" })).toHaveAttribute(
      "href",
      "/#projects",
    );
  });

  it("falls back to route defaults when landing metadata is blank", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(
        Promise.resolve({
          metaTitle: "   ",
          metaDescription: "   ",
          sections: [],
          footer: undefined,
        }),
      ),
    );

    render(<LandingPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading…")).not.toBeInTheDocument();
    });

    const shell = screen.getByTestId("page-shell");
    expect(shell).toHaveAttribute("data-title", "Gilberto Haro | Frontend Engineer");
    expect(shell).toHaveAttribute(
      "data-description",
      "Frontend engineering portfolio focused on content systems, design systems, and maintainable web architecture.",
    );
    expect(shell.getAttribute("data-canonical-url")).toContain("/");
  });

  it("keeps safe fallback metadata on fetch error", async () => {
    mockGetContentSource.mockReturnValue(
      makeSource(Promise.reject(new Error("Failed to load landing content"))),
    );

    render(<LandingPage />);

    expect(
      await screen.findByText("Error: Failed to load landing content"),
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Error: Failed to load landing content",
    );

    const shell = screen.getByTestId("page-shell");
    expect(shell).toHaveAttribute("data-title", "Gilberto Haro | Frontend Engineer");
    expect(shell).toHaveAttribute(
      "data-description",
      "Frontend engineering portfolio focused on content systems, design systems, and maintainable web architecture.",
    );
    expect(shell.getAttribute("data-canonical-url")).toContain("/");
  });
});
