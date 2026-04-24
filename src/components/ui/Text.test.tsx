import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("applies default class contract for body kind", () => {
    render(<Text>Body copy</Text>);

    const text = screen.getByText("Body copy");
    expect(text).toHaveClass("ui-text--kind-body");
    expect(text).toHaveClass("ui-text--size-md");
    expect(text).toHaveClass("ui-text--tone-default");
  });

  it("applies eyebrow kind defaults", () => {
    render(<Text kind="eyebrow">Section label</Text>);

    const text = screen.getByText("Section label");
    expect(text).toHaveClass("ui-text--kind-eyebrow");
    expect(text).toHaveClass("ui-text--size-xs");
    expect(text).toHaveClass("ui-text--weight-semibold");
  });

  it("allows explicit prop overrides on kind defaults", () => {
    render(
      <Text kind="meta" tone="default" size="lg">
        Overridden
      </Text>,
    );

    const text = screen.getByText("Overridden");
    expect(text).toHaveClass("ui-text--kind-meta");
    expect(text).toHaveClass("ui-text--size-lg");
    expect(text).toHaveClass("ui-text--tone-default");
  });
});
