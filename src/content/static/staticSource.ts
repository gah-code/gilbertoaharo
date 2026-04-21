import type { ContentSource } from "../source";
import type { ArticlePageData } from "../contentful/types";
import { mapArticleListItem, mapArticlePage } from "../contentful/adapters";
import { staticArticles, staticLandingPage, staticNavigation } from "./fixtures";

export const staticSource: ContentSource = {
  async getLandingPage() {
    return staticLandingPage;
  },
  async getArticleBySlug(slug: string): Promise<ArticlePageData | null> {
    const article = staticArticles.find((entry) => entry.fields.slug === slug);
    return article ? mapArticlePage(article) : null;
  },
  async getAllArticles() {
    return staticArticles.map(mapArticleListItem);
  },
  async getNavigationMenu() {
    return staticNavigation;
  },
};
