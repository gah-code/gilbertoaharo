import { describe, expect, it } from "vitest";
import { ARTICLE_ROUTE_PREFIX, buildArticlePath, parsePathname } from "./routes";

describe("routes", () => {
  it("parses top-level routes", () => {
    expect(parsePathname("/")).toEqual({ name: "landing" });
    expect(parsePathname(ARTICLE_ROUTE_PREFIX)).toEqual({ name: "articles" });
    expect(parsePathname(`${ARTICLE_ROUTE_PREFIX}/`)).toEqual({ name: "articles" });
    expect(parsePathname("/debug")).toEqual({ name: "debug" });
    expect(parsePathname("/debug/")).toEqual({ name: "debug" });
    expect(parsePathname("/debug/github")).toEqual({ name: "debug-github" });
    expect(parsePathname("/debug/github/")).toEqual({ name: "debug-github" });
  });

  it("parses article detail routes with slug values", () => {
    expect(parsePathname(`${ARTICLE_ROUTE_PREFIX}/typed-boundaries`)).toEqual({
      name: "article",
      slug: "typed-boundaries",
    });
    expect(parsePathname(`${ARTICLE_ROUTE_PREFIX}/typed-boundaries/`)).toEqual({
      name: "article",
      slug: "typed-boundaries",
    });
  });

  it("returns not-found for unmatched paths", () => {
    expect(parsePathname("/missing")).toEqual({ name: "not-found" });
    expect(parsePathname("/articles-and-more")).toEqual({ name: "not-found" });
  });

  it("builds article paths from the configured article prefix", () => {
    expect(buildArticlePath("typed-boundaries")).toBe(
      `${ARTICLE_ROUTE_PREFIX.replace(/\/+$/, "")}/typed-boundaries`,
    );
  });
});
