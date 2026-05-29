import { describe, expect, it } from "vitest";
import {
  buildContentfulImageUrl,
  buildContentfulSrcSet,
  isContentfulImageUrl,
  normalizeImageUrl,
} from "./contentfulImage";

const contentfulUrl =
  "https://images.ctfassets.net/test-space-id/test-asset-id/test-image.png";

const protocolRelativeContentfulUrl =
  "//images.ctfassets.net/test-space-id/test-asset-protocol/test-protocol-image.jpg";

function paramsFor(url: string) {
  return new URL(url).searchParams;
}

describe("normalizeImageUrl", () => {
  it("returns undefined for missing or blank values", () => {
    expect(normalizeImageUrl()).toBeUndefined();
    expect(normalizeImageUrl(null)).toBeUndefined();
    expect(normalizeImageUrl("")).toBeUndefined();
    expect(normalizeImageUrl("   ")).toBeUndefined();
  });

  it("trims input and normalizes protocol-relative URLs", () => {
    expect(normalizeImageUrl(`  ${protocolRelativeContentfulUrl}  `)).toBe(
      `https:${protocolRelativeContentfulUrl}`,
    );
  });

  it("preserves absolute and local URLs", () => {
    expect(normalizeImageUrl("https://example.com/image.jpg")).toBe(
      "https://example.com/image.jpg",
    );
    expect(normalizeImageUrl("/local/image.jpg")).toBe("/local/image.jpg");
  });
});

describe("isContentfulImageUrl", () => {
  it("detects Contentful image URLs", () => {
    expect(isContentfulImageUrl(contentfulUrl)).toBe(true);
    expect(isContentfulImageUrl(protocolRelativeContentfulUrl)).toBe(true);
  });

  it("rejects non-Contentful, local, and empty URLs", () => {
    expect(isContentfulImageUrl("https://example.com/image.jpg")).toBe(false);
    expect(isContentfulImageUrl("/local/image.jpg")).toBe(false);
    expect(isContentfulImageUrl()).toBe(false);
    expect(isContentfulImageUrl(null)).toBe(false);
    expect(isContentfulImageUrl("")).toBe(false);
  });
});

describe("buildContentfulImageUrl", () => {
  it("adds Contentful transform params", () => {
    const result = buildContentfulImageUrl(contentfulUrl, {
      width: 640,
      quality: 75,
      format: "webp",
      fit: "fill",
    });
    const params = paramsFor(result);

    expect(result.startsWith(contentfulUrl)).toBe(true);
    expect(params.get("w")).toBe("640");
    expect(params.get("q")).toBe("75");
    expect(params.get("fm")).toBe("webp");
    expect(params.get("fit")).toBe("fill");
  });

  it("preserves unrelated query params and replaces existing transform params", () => {
    const result = buildContentfulImageUrl(
      `${contentfulUrl}?foo=bar&w=120&q=10&fm=jpg&fit=scale`,
      {
        width: 800,
        quality: 80,
        format: "avif",
        fit: "crop",
      },
    );
    const params = paramsFor(result);

    expect(params.get("foo")).toBe("bar");
    expect(params.get("w")).toBe("800");
    expect(params.get("q")).toBe("80");
    expect(params.get("fm")).toBe("avif");
    expect(params.get("fit")).toBe("crop");
  });

  it("ignores invalid width and quality values", () => {
    const result = buildContentfulImageUrl(contentfulUrl, {
      width: -1,
      quality: 101,
      format: "webp",
    });
    const params = paramsFor(result);

    expect(params.has("w")).toBe(false);
    expect(params.has("q")).toBe(false);
    expect(params.get("fm")).toBe("webp");
  });

  it("returns the normalized original URL for non-Contentful URLs", () => {
    expect(
      buildContentfulImageUrl("  https://example.com/image.jpg  ", { width: 640 }),
    ).toBe("https://example.com/image.jpg");
    expect(buildContentfulImageUrl("/local/image.jpg", { width: 640 })).toBe(
      "/local/image.jpg",
    );
  });

  it("does not throw for malformed input", () => {
    expect(buildContentfulImageUrl("not a url", { width: 640 })).toBe("not a url");
  });
});

describe("buildContentfulSrcSet", () => {
  it("builds sorted width descriptors and preserves transform options", () => {
    const result = buildContentfulSrcSet(contentfulUrl, [800, 320, 480], {
      quality: 75,
      format: "webp",
      fit: "fill",
    });

    expect(result).toBe(
      [
        `${contentfulUrl}?w=320&q=75&fm=webp&fit=fill 320w`,
        `${contentfulUrl}?w=480&q=75&fm=webp&fit=fill 480w`,
        `${contentfulUrl}?w=800&q=75&fm=webp&fit=fill 800w`,
      ].join(", "),
    );
  });

  it("deduplicates widths and filters invalid widths", () => {
    const result = buildContentfulSrcSet(contentfulUrl, [
      0,
      Number.NaN,
      480,
      320,
      480,
      -100,
    ]);

    expect(result).toBe(
      [
        `${contentfulUrl}?w=320 320w`,
        `${contentfulUrl}?w=480 480w`,
      ].join(", "),
    );
  });

  it("returns undefined for non-Contentful URLs", () => {
    expect(buildContentfulSrcSet("https://example.com/image.jpg", [320, 480])).toBeUndefined();
    expect(buildContentfulSrcSet("/local/image.jpg", [320, 480])).toBeUndefined();
  });

  it("returns undefined when no valid widths remain", () => {
    expect(buildContentfulSrcSet(contentfulUrl, [0, -1, Number.NaN])).toBeUndefined();
  });
});
