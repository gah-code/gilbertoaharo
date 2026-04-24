import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SectionContact } from "@/content/contentful/types";
import { ContactSection } from "./ContactSection";

const contactSection: SectionContact = {
  sys: { id: "contact-test", contentType: { sys: { id: "sectionContact" } } },
  fields: {
    internalName: "Contact Test",
    anchorId: "contact",
    title: "Contact",
    email: "hello@example.com",
    links: [
      {
        sys: { id: "contact-link-1", contentType: { sys: { id: "socialLink" } } },
        fields: {
          label: "GitHub",
          url: "https://github.com/example",
        },
      },
    ],
  },
};

const emailOnlyContactSection: SectionContact = {
  ...contactSection,
  sys: { ...contactSection.sys, id: "contact-test-email-only" },
  fields: {
    ...contactSection.fields,
    links: [],
  },
};

describe("ContactSection", () => {
  it("renders contact links when available", () => {
    render(<ContactSection section={contactSection} />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/example",
    );
  });

  it("renders an explicit status when only email is available", () => {
    render(<ContactSection section={emailOnlyContactSection} />);

    expect(screen.getByText("More contact links are coming soon.")).toHaveAttribute(
      "role",
      "status",
    );
  });
});
