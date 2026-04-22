import { describe, expect, it } from "vitest";
import type { Asset, LinkAction, SectionHero } from "@/content/contentful/types";
import { normalizeHeroSection } from "./normalizeHeroSection";

function makeAsset(id: string, url: string, title?: string, description?: string): Asset {
  return {
    sys: { id },
    fields: {
      title,
      description,
      file: {
        url,
        fileName: `${id}.jpg`,
        contentType: "image/jpeg",
      },
    },
  };
}

function makeAction(
  id: string,
  label: string,
  href: string,
  variant: "primary" | "secondary" | "text",
): LinkAction {
  return {
    sys: { id, contentType: { sys: { id: "linkAction" } } },
    fields: {
      label,
      href,
      variant,
    },
  };
}

describe("normalizeHeroSection", () => {
  it("normalizes modern hero fields, trims values, and applies limits", () => {
    const section: SectionHero = {
      sys: { id: "hero-modern", contentType: { sys: { id: "sectionHero" } } },
      fields: {
        internalName: "Hero",
        anchorId: " top ",
        eyebrow: "  WEB ENGINEER  ",
        name: " Gilberto Haro ",
        title: "  I build scalable interfaces. ",
        lead: "  Strategic lead copy.  ",
        body: "  Supporting body copy.  ",
        heroStyle: "image",
        heroImage: makeAsset(
          "hero-image",
          "//images.example.com/hero.jpg",
          "Hero image title",
          "Hero image description",
        ),
        proofPoints: ["  One  ", "Two", "Three", "Four"],
        actions: [
          makeAction("a1", " View Projects ", "#projects", "primary"),
          makeAction("a2", " About Me ", "#timeline", "secondary"),
          makeAction("a3", " Extra ", "#extra", "text"),
        ],
      },
    };

    const normalized = normalizeHeroSection(section);

    expect(normalized.id).toBe("hero-modern");
    expect(normalized.anchorId).toBe("top");
    expect(normalized.eyebrow).toBe("WEB ENGINEER");
    expect(normalized.name).toBe("Gilberto Haro");
    expect(normalized.title).toBe("I build scalable interfaces.");
    expect(normalized.lead).toBe("Strategic lead copy.");
    expect(normalized.body).toBe("Supporting body copy.");
    expect(normalized.proofPoints).toEqual(["One", "Two", "Three"]);
    expect(normalized.actions).toHaveLength(2);
    expect(normalized.actions[0]?.label).toBe("View Projects");
    expect(normalized.actions[1]?.label).toBe("About Me");
    expect(normalized.heroStyle).toBe("image");
    expect(normalized.media).toEqual({
      src: "https://images.example.com/hero.jpg",
      alt: "Hero image description",
      kind: "heroImage",
    });
  });

  it("supports legacy fallback fields when modern fields are absent", () => {
    const section: SectionHero = {
      sys: { id: "hero-legacy", contentType: { sys: { id: "sectionHero" } } },
      fields: {
        internalName: "Hero Legacy",
        anchorId: "",
        title: "Legacy Hero Title",
        heroStyle: "avatar",
        avatarImage: makeAsset("avatar", "//images.example.com/avatar.jpg"),
        tagline: " Legacy lead fallback ",
        intro: " Legacy body fallback ",
        highlights: [" Legacy proof 1 ", "Legacy proof 2"],
        primaryCtaLabel: "Legacy Primary",
        primaryCtaHref: "/legacy-primary",
        secondaryCtaLabel: "Legacy Secondary",
        secondaryCtaHref: "/legacy-secondary",
      },
    };

    const normalized = normalizeHeroSection(section);

    expect(normalized.anchorId).toBe("hero-legacy");
    expect(normalized.lead).toBe("Legacy lead fallback");
    expect(normalized.body).toBe("Legacy body fallback");
    expect(normalized.proofPoints).toEqual(["Legacy proof 1", "Legacy proof 2"]);
    expect(normalized.actions).toEqual([
      {
        label: "Legacy Primary",
        href: "/legacy-primary",
        variant: "primary",
        openInNewTab: false,
        ariaLabel: undefined,
      },
      {
        label: "Legacy Secondary",
        href: "/legacy-secondary",
        variant: "secondary",
        openInNewTab: false,
        ariaLabel: undefined,
      },
    ]);
    expect(normalized.heroStyle).toBe("avatar");
    expect(normalized.media?.kind).toBe("avatarImage");
    expect(normalized.media?.src).toBe("https://images.example.com/avatar.jpg");
  });
});
