import { afterEach, describe, expect, it, vi } from "vitest";

async function loadSeo(siteUrl: string) {
  vi.resetModules();
  vi.stubEnv("VITE_SITE_URL", siteUrl);
  return import("./seo");
}

describe("buildCanonicalUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses the production canonical fallback when VITE_SITE_URL is blank", async () => {
    const { buildCanonicalUrl } = await loadSeo("");

    expect(buildCanonicalUrl("/")).toBe("https://gilbertaharo.com/");
    expect(buildCanonicalUrl("/articles")).toBe(
      "https://gilbertaharo.com/articles",
    );
    expect(buildCanonicalUrl("articles/resilient-content-systems")).toBe(
      "https://gilbertaharo.com/articles/resilient-content-systems",
    );
  });

  it("uses a valid configured site URL", async () => {
    const { buildCanonicalUrl } = await loadSeo("https://preview.example.com/");

    expect(buildCanonicalUrl("/articles")).toBe(
      "https://preview.example.com/articles",
    );
  });

  it("falls back to the production canonical when VITE_SITE_URL is invalid", async () => {
    const { buildCanonicalUrl } = await loadSeo("not a url");

    expect(buildCanonicalUrl("/articles")).toBe(
      "https://gilbertaharo.com/articles",
    );
  });

  it("normalizes relative canonical overrides to absolute URLs", async () => {
    const { resolveCanonicalUrl } = await loadSeo("");

    expect(resolveCanonicalUrl("/articles/custom-canonical")).toBe(
      "https://gilbertaharo.com/articles/custom-canonical",
    );
  });

  it("preserves valid absolute canonical overrides", async () => {
    const { resolveCanonicalUrl } = await loadSeo("");

    expect(resolveCanonicalUrl("https://syndicated.example.com/article")).toBe(
      "https://syndicated.example.com/article",
    );
  });
});

describe("metadata format helpers", () => {
  it("formats robots directives", async () => {
    const { formatRobotsMeta } = await loadSeo("");

    expect(formatRobotsMeta({ index: true, follow: true })).toBe("index, follow");
    expect(formatRobotsMeta({ index: false, follow: true })).toBe("noindex, follow");
    expect(formatRobotsMeta({ index: false, follow: false })).toBe(
      "noindex, nofollow",
    );
  });

  it("formats concise keyword metadata with empty and duplicate values removed", async () => {
    const { formatKeywords } = await loadSeo("");

    expect(formatKeywords([" React ", "", "Contentful", "React"])).toBe(
      "React, Contentful",
    );
  });
});
