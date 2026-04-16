import { describe, expect, it } from "vitest";
import type { SectionContact } from "@/content/contentful/types";
import { normalizeContactSection } from "./normalizeContactSection";

const section: SectionContact = {
  sys: { id: "contact-section", contentType: { sys: { id: "sectionContact" } } },
  fields: {
    internalName: "Contact",
    anchorId: "contact",
    title: "Contact",
    intro: "Let us collaborate",
    email: "hello@example.com",
    links: [
      {
        sys: { id: "social-1", contentType: { sys: { id: "socialLink" } } },
        fields: {
          label: "GitHub",
          url: "https://github.com/example",
          kind: "github",
        },
      },
    ],
  },
};

describe("normalizeContactSection", () => {
  it("normalizes email + social links", () => {
    const normalized = normalizeContactSection(section);

    expect(normalized.emailHref).toBe("mailto:hello@example.com");
    expect(normalized.links[0]?.href).toBe("https://github.com/example");
  });
});
