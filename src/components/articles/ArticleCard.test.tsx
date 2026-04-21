import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticleCard } from "./ArticleCard";
import {
  defaultArticleListItemFixture,
  minimalMetaArticleListItemFixture,
  noExcerptArticleListItemFixture,
  noImageArticleListItemFixture,
  updatedOnlyArticleListItemFixture,
} from "./__fixtures__/articleList.fixture";

describe("ArticleCard", () => {
  it("renders the article title", () => {
    render(<ArticleCard article={defaultArticleListItemFixture} />);

    expect(
      screen.getByRole("heading", {
        name: defaultArticleListItemFixture.title,
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it("renders excerpt when present and omits it when absent", () => {
    const { rerender } = render(<ArticleCard article={defaultArticleListItemFixture} />);

    expect(
      screen.getByText(defaultArticleListItemFixture.excerpt ?? ""),
    ).toBeInTheDocument();

    rerender(<ArticleCard article={noExcerptArticleListItemFixture} />);
    expect(
      screen.queryByText(defaultArticleListItemFixture.excerpt ?? ""),
    ).not.toBeInTheDocument();
  });

  it("renders metadata when author/date are present", () => {
    render(<ArticleCard article={defaultArticleListItemFixture} />);

    expect(
      screen.getByText(defaultArticleListItemFixture.authorName ?? ""),
    ).toBeInTheDocument();
    expect(screen.getByText(/Published /)).toBeInTheDocument();
  });

  it("uses updated date label when publishedAt is missing", () => {
    render(<ArticleCard article={updatedOnlyArticleListItemFixture} />);

    expect(screen.getByText(/Updated /)).toBeInTheDocument();
    expect(screen.queryByText(/Published /)).not.toBeInTheDocument();
  });

  it("renders image when heroImageUrl exists and omits it otherwise", () => {
    const { rerender } = render(<ArticleCard article={defaultArticleListItemFixture} />);

    expect(
      screen.getByRole("img", { name: defaultArticleListItemFixture.title }),
    ).toBeInTheDocument();

    rerender(<ArticleCard article={noImageArticleListItemFixture} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("links title and CTA to /articles/:slug", () => {
    render(<ArticleCard article={defaultArticleListItemFixture} />);

    const titleLink = screen.getByRole("link", {
      name: defaultArticleListItemFixture.title,
    });
    const ctaLink = screen.getByRole("link", { name: "Read article" });

    expect(titleLink).toHaveAttribute("href", `/articles/${defaultArticleListItemFixture.slug}`);
    expect(ctaLink).toHaveAttribute("href", `/articles/${defaultArticleListItemFixture.slug}`);
  });

  it("resolves protocol-relative image URLs", () => {
    render(
      <ArticleCard
        article={{
          ...minimalMetaArticleListItemFixture,
          heroImageUrl: "//images.example.com/articles/protocol-relative.jpg",
        }}
      />,
    );

    const image = screen.getByRole("img", {
      name: minimalMetaArticleListItemFixture.title,
    });
    expect(image).toHaveAttribute(
      "src",
      "https://images.example.com/articles/protocol-relative.jpg",
    );
  });
});
