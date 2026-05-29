import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_SEO_KEYWORDS } from "@/lib/seo";
import { SeoHead } from "./SeoHead";

function getDescriptionMeta() {
  return document.querySelector('meta[name="description"]');
}

function getRobotsMeta() {
  return document.querySelector('meta[name="robots"]');
}

function getKeywordsMeta() {
  return document.querySelector('meta[name="keywords"]');
}

function getCanonicalLink() {
  return document.querySelector('link[rel="canonical"]');
}

describe("SeoHead", () => {
  const runtimeEnv = import.meta.env as unknown as Record<string, string | undefined>;
  const originalSiteName = runtimeEnv.VITE_SITE_NAME;

  afterEach(() => {
    getDescriptionMeta()?.remove();
    getRobotsMeta()?.remove();
    getKeywordsMeta()?.remove();
    getCanonicalLink()?.remove();
    document.title = "";
    runtimeEnv.VITE_SITE_NAME = originalSiteName;
  });

  it("writes title, description, and canonical values", () => {
    render(
      <SeoHead
        title="Landing | Gilberto Haro"
        description="Landing route description."
        canonicalUrl="https://gilbertaharo.com/"
      />,
    );

    expect(document.title).toBe("Landing | Gilberto Haro");
    expect(getDescriptionMeta()).toHaveAttribute(
      "content",
      "Landing route description.",
    );
    expect(getCanonicalLink()).toHaveAttribute(
      "href",
      "https://gilbertaharo.com/",
    );
    expect(getRobotsMeta()).toHaveAttribute("content", "index, follow");
    expect(getKeywordsMeta()).toHaveAttribute(
      "content",
      DEFAULT_SEO_KEYWORDS.join(", "),
    );
  });

  it("falls back to site name when title is absent", () => {
    runtimeEnv.VITE_SITE_NAME = "Gilberto Haro";

    render(<SeoHead description="Debug route description." />);

    expect(document.title).toBe("Gilberto Haro");
  });

  it("removes description and canonical tags when omitted on rerender", () => {
    const { rerender } = render(
      <SeoHead
        title="Articles | Gilberto Haro"
        description="Articles route description."
        canonicalUrl="https://gilbertaharo.com/articles"
      />,
    );

    rerender(<SeoHead title="Not found | Gilberto Haro" />);

    expect(document.title).toBe("Not found | Gilberto Haro");
    expect(getDescriptionMeta()).toBeNull();
    expect(getCanonicalLink()).toBeNull();
    expect(getRobotsMeta()).toHaveAttribute("content", "index, follow");
    expect(getKeywordsMeta()).toHaveAttribute(
      "content",
      DEFAULT_SEO_KEYWORDS.join(", "),
    );
  });

  it("supports route-level robots and keywords overrides", () => {
    const { rerender } = render(
      <SeoHead
        title="Debug | Gilberto Haro"
        robots={{ index: false, follow: false }}
        keywords={[" debug ", "", "Contentful", "Contentful"]}
      />,
    );

    expect(getRobotsMeta()).toHaveAttribute("content", "noindex, nofollow");
    expect(getKeywordsMeta()).toHaveAttribute("content", "debug, Contentful");

    rerender(<SeoHead title="Landing | Gilberto Haro" />);

    expect(getRobotsMeta()).toHaveAttribute("content", "index, follow");
    expect(getKeywordsMeta()).toHaveAttribute(
      "content",
      DEFAULT_SEO_KEYWORDS.join(", "),
    );
  });
});
