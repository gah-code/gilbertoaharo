import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageShell } from "./PageShell";

vi.mock("./SeoHead", () => ({
  SeoHead: ({
    title,
    description,
    canonicalUrl,
  }: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
  }) => (
    <div
      data-testid="seo-head"
      data-title={title ?? ""}
      data-description={description ?? ""}
      data-canonical-url={canonicalUrl ?? ""}
    />
  ),
}));

vi.mock("./Header", () => ({
  Header: () => <div data-testid="page-header" />,
}));

vi.mock("./Footer", () => ({
  Footer: () => <div data-testid="page-footer" />,
}));

describe("PageShell", () => {
  it("renders shared shell chrome and main landmark", () => {
    render(
      <PageShell>
        <div>Page content</div>
      </PageShell>,
    );

    expect(screen.getByTestId("page-header")).toBeInTheDocument();
    expect(screen.getByTestId("page-footer")).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(main).toContainElement(screen.getByText("Page content"));
  });

  it("passes route metadata values to SeoHead", () => {
    render(
      <PageShell
        title="Route Title"
        description="Route description."
        canonicalUrl="https://example.com/route"
      >
        <div>Page content</div>
      </PageShell>,
    );

    const seoHead = screen.getByTestId("seo-head");
    expect(seoHead).toHaveAttribute("data-title", "Route Title");
    expect(seoHead).toHaveAttribute("data-description", "Route description.");
    expect(seoHead).toHaveAttribute("data-canonical-url", "https://example.com/route");
  });
});
