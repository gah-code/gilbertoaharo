import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("applies safe defaults for external links", () => {
    render(<Link href="https://example.com">External</Link>);

    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("preserves custom rel tokens while enforcing safe target blank tokens", () => {
    render(
      <Link href="https://example.com" rel="nofollow">
        External
      </Link>,
    );

    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "rel",
      "nofollow noreferrer noopener",
    );
  });

  it("does not open mail links in a new tab by default", () => {
    render(<Link href="mailto:hello@example.com">Email</Link>);

    const link = screen.getByRole("link", { name: "Email" });
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("prevents interaction when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Link href="/internal" disabled onClick={handleClick}>
        Disabled
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Disabled" });
    fireEvent.click(link);

    expect(handleClick).not.toHaveBeenCalled();
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("supports lg size contract", () => {
    render(
      <Link href="/internal" size="lg">
        Large link
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Large link" });
    expect(link).toHaveClass("ui-link--lg");
  });
});
