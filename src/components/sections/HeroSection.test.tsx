import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Asset, SectionHero } from "@/content/contentful/types";
import { HeroSection } from "./HeroSection";

const contentfulHeroUrl =
  "https://images.ctfassets.net/i36fvclphdnv/hero-id/hero-design.jpeg";

function makeAsset(id: string, url: string, description = "Hero image"): Asset {
  return {
    sys: { id },
    fields: {
      title: description,
      description,
      file: {
        url,
        fileName: `${id}.jpg`,
        contentType: "image/jpeg",
      },
    },
  };
}

function makeHeroSection(url: string): SectionHero {
  return {
    sys: { id: "hero-test", contentType: { sys: { id: "sectionHero" } } },
    fields: {
      internalName: "Hero Test",
      anchorId: "top",
      title: "Frontend systems for structured content",
      heroStyle: "image",
      heroImage: makeAsset("hero-image", url),
      heroImageAlt: "Hero image",
    },
  };
}

function parseSrcSet(srcSet: string | null) {
  return (srcSet ?? "").split(", ").map((entry) => {
    const [url, descriptor] = entry.split(" ");
    return {
      url: url ?? "",
      descriptor: descriptor ?? "",
      params: new URL(url ?? "").searchParams,
    };
  });
}

describe("HeroSection", () => {
  it("renders transformed responsive attributes for Contentful hero images", () => {
    render(<HeroSection section={makeHeroSection(contentfulHeroUrl)} />);

    const image = screen.getByRole("img", { name: "Hero image" });
    const src = image.getAttribute("src");
    const srcSetEntries = parseSrcSet(image.getAttribute("srcset"));

    expect(src).toBeTruthy();
    expect(new URL(src ?? "").searchParams.get("w")).toBe("1200");
    expect(new URL(src ?? "").searchParams.get("q")).toBe("75");
    expect(new URL(src ?? "").searchParams.get("fm")).toBe("webp");
    expect(image).toHaveAttribute("sizes", "(min-width: 1024px) 40vw, 90vw");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("decoding", "async");
    expect(srcSetEntries.map((entry) => entry.descriptor)).toEqual([
      "480w",
      "720w",
      "960w",
      "1200w",
    ]);
    expect(srcSetEntries.map((entry) => entry.params.get("q"))).toEqual([
      "75",
      "75",
      "75",
      "75",
    ]);
    expect(srcSetEntries.map((entry) => entry.params.get("fm"))).toEqual([
      "webp",
      "webp",
      "webp",
      "webp",
    ]);
  });

  it("preserves non-Contentful hero image behavior without responsive attributes", () => {
    const imageUrl = "https://example.com/hero.jpg";
    render(<HeroSection section={makeHeroSection(imageUrl)} />);

    const image = screen.getByRole("img", { name: "Hero image" });

    expect(image).toHaveAttribute("src", imageUrl);
    expect(image).not.toHaveAttribute("srcset");
    expect(image).not.toHaveAttribute("sizes");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("decoding", "async");
  });
});
