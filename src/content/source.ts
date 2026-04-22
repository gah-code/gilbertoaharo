import type {
  LandingPageData,
  ArticlePageData,
  ArticleListItem,
  NavigationMenuData,
  SectionFooter,
} from "./contentful/types";
import { contentfulSource } from "./contentful/contentfulSource";
import { staticSource } from "./static/staticSource";
import { env } from "@/env";

export interface ContentSource {
  getLandingPage(): Promise<LandingPageData>;
  getArticleBySlug(slug: string): Promise<ArticlePageData | null>;
  getAllArticles(): Promise<ArticleListItem[]>;
  getNavigationMenu(): Promise<NavigationMenuData>;
  getFooter(): Promise<SectionFooter | null>;
}

export function getContentSource(): ContentSource {
  // Source selection stays client-side for now via public `VITE_CONTENT_SOURCE`.
  return env.contentSource === "static" ? staticSource : contentfulSource;
}

// import { env } from "@/env";
// import type { LandingPageData, ArticlePageData } from "./contentful/types";
// import { getPreviewEnabled } from "@/preview/previewMode";

// export interface ContentSource {
//   getLandingPage(preview: boolean): Promise<LandingPageData>;
//   getArticleBySlug(
//     preview: boolean,
//     slug: string,
//   ): Promise<ArticlePageData | null>;
// }

// import { contentfulSource } from "./contentful/contentfulSource";
// import { staticSource } from "./static/staticSource";

// export function getContentSource(): ContentSource {
//   // UI-first dev mode:
//   // VITE_CONTENT_SOURCE=static lets you build UI before CMS is fully seeded.
//   return env.contentSource === "static" ? staticSource : contentfulSource;
// }

// export function getRuntimePreviewFlag(): boolean {
//   return getPreviewEnabled();
// }
