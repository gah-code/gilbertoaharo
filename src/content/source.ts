import type { LandingPageData, ArticlePageData } from "./contentful/types";
import { contentfulSource } from "./contentful/contentfulSource";

export interface ContentSource {
  getLandingPage(): Promise<LandingPageData>;
  getArticleBySlug(slug: string): Promise<ArticlePageData | null>;
}

export function getContentSource(): ContentSource {
  // Swap this for a fixture-backed source later if you need local prototyping.
  return contentfulSource;
}
