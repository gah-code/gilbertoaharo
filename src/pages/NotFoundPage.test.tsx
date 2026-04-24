import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NotFoundPage } from "./NotFoundPage";

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

vi.mock("@/components/ui/Link", () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("NotFoundPage SEO", () => {
  it("sets explicit not-found route metadata", () => {
    render(<NotFoundPage />);

    expect(screen.getByRole("heading", { name: "Page not found", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Homepage" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/#projects",
    );
    const shell = screen.getByTestId("page-shell");
    expect(shell).toHaveAttribute("data-title", "Page not found | Gilberto Haro");
    expect(shell).toHaveAttribute(
      "data-description",
      "The requested page is unavailable. Return to the homepage to continue browsing.",
    );
    expect(shell.getAttribute("data-canonical-url")).toContain("/404");
  });
});
