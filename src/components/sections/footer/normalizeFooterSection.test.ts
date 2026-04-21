import { describe, expect, it } from "vitest";
import type { SectionFooter } from "@/content/contentful/types";
import { normalizeFooterSection } from "./normalizeFooterSection";

const section: SectionFooter = {
  sys: { id: "footer-section", contentType: { sys: { id: "sectionFooter" } } },
  fields: {
    internalName: "Footer",
    brandTitle: "Gilberto Haro",
    brandSubtitle: "Web Engineer",
    summary: "A quiet editorial footer.",
    navigationGroups: [
      {
        sys: { id: "group-site", contentType: { sys: { id: "footerLinkGroup" } } },
        fields: {
          internalName: "Site Group",
          label: "Site",
          links: [
            {
              sys: { id: "link-about", contentType: { sys: { id: "footerLink" } } },
              fields: {
                internalName: "About Link",
                label: "About",
                href: "#top",
                iconKey: "arrow",
              },
            },
            {
              sys: { id: "link-docs", contentType: { sys: { id: "footerLink" } } },
              fields: {
                label: "Docs",
                href: "https://example.com/docs",
                iconKey: "external",
              },
            },
            {
              sys: { id: "link-work", contentType: { sys: { id: "footerLink" } } },
              fields: {
                label: "Work",
                href: "/work",
              },
            },
            {
              sys: { id: "link-mail", contentType: { sys: { id: "footerLink" } } },
              fields: {
                label: "Email Team",
                href: "mailto:hello@example.com",
              },
            },
            {
              sys: { id: "link-invalid", contentType: { sys: { id: "footerLink" } } },
              fields: {
                label: "Invalid",
                href: "   ",
              },
            },
          ],
        },
      },
    ],
    socialLinks: [
      {
        sys: { id: "social-github", contentType: { sys: { id: "footerLink" } } },
        fields: {
          label: "GitHub",
          href: "https://github.com/example",
          iconKey: "github",
        },
      },
      {
        sys: { id: "social-email", contentType: { sys: { id: "footerLink" } } },
        fields: {
          internalName: "Social Email Link",
          label: "Email",
          href: "mailto:hello@example.com",
          iconKey: "email",
        },
      },
      {
        sys: { id: "social-invalid", contentType: { sys: { id: "footerLink" } } },
        fields: {
          label: "Invalid",
        },
      },
    ],
    legalText: "© 2026 Gilberto Haro",
    builtWithText: "Built with React and TypeScript",
  },
};

const fallbackSection: SectionFooter = {
  sys: { id: "footer-fallback", contentType: { sys: { id: "sectionFooter" } } },
  fields: {
    internalName: "Footer Fallback",
    brandTitle: "",
    navigationGroups: undefined,
    socialLinks: undefined,
    legalText: "   ",
    builtWithText: "   ",
  },
};

describe("normalizeFooterSection", () => {
  it("normalizes links and applies openInNewTab defaults by href type", () => {
    const normalized = normalizeFooterSection(section);
    const group = normalized.navigationGroups[0];

    expect(normalized.brandTitle).toBe("Gilberto Haro");
    expect(normalized.summary).toBe("A quiet editorial footer.");
    expect(group?.key).toBe("Site Group");
    expect(group?.links).toHaveLength(4);
    expect(group?.links[0]?.key).toBe("About Link");
    expect(group?.links[0]?.openInNewTab).toBe(false);
    expect(group?.links[0]?.kind).toBe("nav");
    expect(group?.links[0]?.iconKey).toBe("arrow");
    expect(group?.links[1]?.key).toBe("Docs");
    expect(group?.links[1]?.openInNewTab).toBe(true);
    expect(group?.links[1]?.iconKey).toBe("external");
    expect(group?.links[2]?.openInNewTab).toBe(false);
    expect(group?.links[3]?.kind).toBe("email");
    expect(group?.links[3]?.openInNewTab).toBe(false);

    expect(normalized.socialLinks).toHaveLength(2);
    expect(normalized.socialLinks[0]?.kind).toBe("social");
    expect(normalized.socialLinks[0]?.openInNewTab).toBe(true);
    expect(normalized.socialLinks[0]?.iconKey).toBe("github");
    expect(normalized.socialLinks[1]?.key).toBe("Social Email Link");
    expect(normalized.socialLinks[1]?.kind).toBe("email");
    expect(normalized.socialLinks[1]?.iconKey).toBe("email");
    expect(normalized.socialLinks[1]?.openInNewTab).toBe(false);
  });

  it("defaults missing arrays and empty text fields safely", () => {
    const normalized = normalizeFooterSection(fallbackSection);

    expect(normalized.brandTitle).toBe("Footer");
    expect(normalized.navigationGroups).toEqual([]);
    expect(normalized.socialLinks).toEqual([]);
    expect(normalized.legalText).toBeUndefined();
    expect(normalized.builtWithText).toBeUndefined();
  });
});
