// src/env.ts
// Centralize env parsing so failures happen early and loudly.

const runtimeEnv = import.meta.env as Record<string, unknown>;

function readEnv(name: string): string | undefined {
  const value = runtimeEnv[name];
  return typeof value === "string" ? value : undefined;
}

function must(name: string): string {
  const value = readEnv(name);
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const env = {
  buildTarget: (readEnv("VITE_BUILD_TARGET") || "prod") as "prod" | "preview",
  contentSource: (readEnv("VITE_CONTENT_SOURCE") || "contentful") as
    | "contentful"
    | "static",

  siteUrl: readEnv("VITE_SITE_URL") || "",
  articlePrefix: readEnv("VITE_ARTICLE_ROUTE_PREFIX") || "/articles",

  contentful: {
    spaceId: must("VITE_CONTENTFUL_SPACE_ID"),
    environment: readEnv("VITE_CONTENTFUL_ENVIRONMENT") || "master",
    deliveryToken: readEnv("VITE_CONTENTFUL_DELIVERY_TOKEN") || "",
    previewToken: readEnv("VITE_CONTENTFUL_PREVIEW_TOKEN") || "",
    includeCSM:
      (readEnv("VITE_CONTENTFUL_INCLUDE_CONTENT_SOURCE_MAPS") || "false") ===
      "true",
  },
};
