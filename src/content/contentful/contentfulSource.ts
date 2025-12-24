import type { ContentSource } from "../source";
import { fetchLandingPage, fetchArticleBySlug } from "./api";
import { mapLandingPage, mapArticlePage } from "./adapters";

export const contentfulSource: ContentSource = {
  async getLandingPage() {
    const page = await fetchLandingPage();
    return mapLandingPage(page);
  },
  async getArticleBySlug(slug) {
    const article = await fetchArticleBySlug(slug);
    return article ? mapArticlePage(article) : null;
  },
};
