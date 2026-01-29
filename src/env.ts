// src/env.ts
// Centralize env parsing so failures happen early and loudly.

function must(name: string): string {
  const v = (import.meta.env as any)[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return String(v);
}

export const env = {
  buildTarget: String(import.meta.env.VITE_BUILD_TARGET || "prod") as
    | "prod"
    | "preview",
  contentSource: String(import.meta.env.VITE_CONTENT_SOURCE || "contentful") as
    | "contentful"
    | "static",

  siteUrl: String(import.meta.env.VITE_SITE_URL || ""),
  articlePrefix: String(
    import.meta.env.VITE_ARTICLE_ROUTE_PREFIX || "/articles",
  ),

  contentful: {
    spaceId: must("VITE_CONTENTFUL_SPACE_ID"),
    environment: String(
      import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master",
    ),
    deliveryToken: String(import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN || ""),
    previewToken: String(import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN || ""),
    includeCSM:
      String(
        import.meta.env.VITE_CONTENTFUL_INCLUDE_CONTENT_SOURCE_MAPS || "false",
      ) === "true",
  },
};
