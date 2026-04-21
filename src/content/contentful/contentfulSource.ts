import type { ContentSource } from "../source";
import {
  fetchLandingPage,
  fetchArticleBySlug,
  fetchAllArticles,
  fetchNavigationMenu,
  fetchGlobalFooter,
} from "./api";
import {
  mapLandingPage,
  mapArticlePage,
  mapArticleListItem,
  mapNavigationMenu,
} from "./adapters";

export const contentfulSource: ContentSource = {
  async getLandingPage() {
    const [page, footer] = await Promise.all([
      fetchLandingPage(),
      fetchGlobalFooter(),
    ]);
    return mapLandingPage(page, footer);
  },
  async getArticleBySlug(slug) {
    const article = await fetchArticleBySlug(slug);
    return article ? mapArticlePage(article) : null;
  },
  async getAllArticles() {
    const articles = await fetchAllArticles();
    return articles.map(mapArticleListItem);
  },
  async getNavigationMenu() {
    const menu = await fetchNavigationMenu();
    return mapNavigationMenu(menu);
  },
};
