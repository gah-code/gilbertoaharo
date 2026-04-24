import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NavigationMenuData } from "@/content/contentful/types";
import { ResponsiveNav } from "./ResponsiveNav";

vi.mock("@/components/ui/Link", () => ({
  Link: ({
    href,
    onClick,
    children,
    className,
    ...rest
  }: {
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  ),
}));

function createMenu(overrides?: Partial<NavigationMenuData>): NavigationMenuData {
  return {
    brandLabel: "Gilberto Haro",
    brandHref: "/",
    mobileBreakpointPx: 960,
    links: [
      {
        id: "articles",
        label: "Articles",
        href: "/articles",
        isExternal: false,
        isCta: false,
        mobileBehavior: "link",
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        isExternal: false,
        isCta: false,
        mobileBehavior: "drawerAccordion",
        panel: {
          id: "projects-panel",
          align: "left",
          mobileVariant: "accordionList",
          cards: [
            {
              id: "card-1",
              title: "Client Platform",
              description: "Platform modernization case study",
              href: "/articles/client-platform",
              status: "default",
              iconType: "emoji",
              iconValue: "🧩",
            },
          ],
        },
      },
    ],
    cta: {
      id: "contact",
      label: "Contact",
      href: "/#contact",
      isExternal: false,
      isCta: true,
      mobileBehavior: "link",
    },
    ...overrides,
  };
}

describe("ResponsiveNav accessibility", () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 375,
      writable: true,
    });
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: originalInnerWidth,
      writable: true,
    });
    window.history.pushState({}, "", "/");
  });

  it("marks matching desktop links as current page", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1280,
      writable: true,
    });
    window.history.pushState({}, "", "/articles/typed-boundaries");

    render(<ResponsiveNav menu={createMenu()} />);

    const articlesLink = screen.getByRole("link", { name: "Articles" });
    expect(articlesLink).toHaveAttribute("aria-current", "page");
    expect(articlesLink).toHaveClass("is-active");
  });

  it("opens the mobile drawer, moves focus inside, and closes on Escape", async () => {
    render(<ResponsiveNav menu={createMenu()} />);

    const toggle = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Gilberto Haro" })).toHaveFocus();
    });

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("keeps accordion content hidden from tab order when collapsed", () => {
    render(<ResponsiveNav menu={createMenu()} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    const accordionPanel = document.getElementById("nav-accordion-projects");
    expect(accordionPanel).toHaveAttribute("hidden");

    fireEvent.click(screen.getByRole("button", { name: "Projects" }));
    expect(accordionPanel).not.toHaveAttribute("hidden");
  });
});
