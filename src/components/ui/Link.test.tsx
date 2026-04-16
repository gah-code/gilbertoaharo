import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("applies safe defaults for external links", () => {
    render(<Link href="https://example.com">External</Link>);

    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
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
});
