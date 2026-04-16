import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders native button mode by default", () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("prevents click and tab focus for disabled link mode", () => {
    const handleClick = vi.fn();
    render(
      <Button href="/contact" disabled onClick={handleClick}>
        Contact
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Contact" });
    fireEvent.click(link);

    expect(handleClick).not.toHaveBeenCalled();
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });
});
