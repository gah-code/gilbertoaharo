import { describe, expect, it } from "vitest";
import { getAriaLabelWithVisibleText } from "./accessibleName";

describe("getAriaLabelWithVisibleText", () => {
  it("omits aria-label when visible text is already the accessible name", () => {
    expect(getAriaLabelWithVisibleText("Contact", undefined)).toBeUndefined();
    expect(getAriaLabelWithVisibleText("Contact", "Contact")).toBeUndefined();
  });

  it("preserves labels that already contain the visible text", () => {
    expect(getAriaLabelWithVisibleText("Previous", "Previous project")).toBe(
      "Previous project",
    );
  });

  it("prefixes supplemental labels with the visible text", () => {
    expect(
      getAriaLabelWithVisibleText(
        "Contact Team",
        "Contact the team about this project",
      ),
    ).toBe("Contact Team: Contact the team about this project");
  });
});
