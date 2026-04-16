import type { ContentSource } from "../source";
import type { ArticlePageData } from "../contentful/types";
import { staticLandingPage, staticNavigation } from "./fixtures";

export const staticSource: ContentSource = {
  async getLandingPage() {
    return staticLandingPage;
  },
  async getArticleBySlug(slug: string): Promise<ArticlePageData | null> {
    void slug;
    return null;
  },
  async getNavigationMenu() {
    return staticNavigation;
  },
};
