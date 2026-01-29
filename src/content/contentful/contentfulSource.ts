import type { ContentSource } from "../source";
import { fetchLandingPage, fetchArticleBySlug, fetchNavigationMenu } from "./api";
import { mapLandingPage, mapArticlePage, mapNavigationMenu } from "./adapters";

export const contentfulSource: ContentSource = {
  async getLandingPage() {
    const page = await fetchLandingPage();
    return mapLandingPage(page);
  },
  async getArticleBySlug(slug) {
    const article = await fetchArticleBySlug(slug);
    return article ? mapArticlePage(article) : null;
  },
  async getNavigationMenu() {
    const menu = await fetchNavigationMenu();
    return mapNavigationMenu(menu);
  },
};
