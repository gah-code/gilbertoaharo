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

const TEST_CONTENTFUL_IMAGE_URL =
  "https://images.ctfassets.net/test-space-id/test-asset-article/test-article-image.jpg";

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
      screen.getByText(`By ${defaultArticleListItemFixture.authorName ?? ""}`),
    ).toBeInTheDocument();
    expect(screen.getByText(/Published /)).toBeInTheDocument();
  });

  it("uses updated date label when publishedAt is missing", () => {
    render(<ArticleCard article={updatedOnlyArticleListItemFixture} />);

    expect(screen.getByText(/Updated /)).toBeInTheDocument();
    expect(screen.queryByText(/Published /)).not.toBeInTheDocument();
  });

  it("renders image when heroImageUrl exists and omits it otherwise", () => {
    const { rerender, container } = render(<ArticleCard article={defaultArticleListItemFixture} />);

    expect(
      screen.getByRole("img", { name: defaultArticleListItemFixture.title }),
    ).toBeInTheDocument();

    rerender(<ArticleCard article={noImageArticleListItemFixture} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector(".article-card__media-placeholder")).toBeInTheDocument();
  });

  it("links title and CTA to /articles/:slug", () => {
    render(<ArticleCard article={defaultArticleListItemFixture} />);

    const titleHeading = screen.getByRole("heading", {
      name: defaultArticleListItemFixture.title,
      level: 2,
    });
    const titleLink = titleHeading.querySelector("a");
    const ctaLink = screen.getByRole("link", {
      name: `Read article: ${defaultArticleListItemFixture.title}`,
    });

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
    expect(image).not.toHaveAttribute("srcset");
    expect(image).not.toHaveAttribute("sizes");
  });

  it("uses transformed responsive Contentful image URLs", () => {
    render(
      <ArticleCard
        article={{
          ...defaultArticleListItemFixture,
          heroImageUrl: TEST_CONTENTFUL_IMAGE_URL,
        }}
      />,
    );

    const image = screen.getByRole("img", {
      name: defaultArticleListItemFixture.title,
    });

    expect(image).toHaveAttribute(
      "src",
      `${TEST_CONTENTFUL_IMAGE_URL}?w=800&q=75&fm=webp`,
    );
    expect(image).toHaveAttribute(
      "srcset",
      [
        `${TEST_CONTENTFUL_IMAGE_URL}?w=320&q=75&fm=webp 320w`,
        `${TEST_CONTENTFUL_IMAGE_URL}?w=480&q=75&fm=webp 480w`,
        `${TEST_CONTENTFUL_IMAGE_URL}?w=640&q=75&fm=webp 640w`,
        `${TEST_CONTENTFUL_IMAGE_URL}?w=800&q=75&fm=webp 800w`,
      ].join(", "),
    );
    expect(image).toHaveAttribute(
      "sizes",
      "(min-width: 1120px) 320px, (min-width: 768px) 33vw, 100vw",
    );
    expect(image).toHaveAttribute("alt", defaultArticleListItemFixture.title);
  });
});
