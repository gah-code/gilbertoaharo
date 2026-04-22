// src/env.ts
// Centralize env parsing so failures happen early and loudly.
// Boundary note:
// - All values read here come from Vite client env (`import.meta.env`).
// - `VITE_CONTENTFUL_DELIVERY_TOKEN` is transitional and still client-exposed.
// - A later phase may move delivery access to a server-only boundary.

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

const publicClientConfig = {
  buildTarget: (readEnv("VITE_BUILD_TARGET") || "prod") as "prod" | "preview",
  contentSource: (readEnv("VITE_CONTENT_SOURCE") || "contentful") as
    | "contentful"
    | "static",
  siteUrl: readEnv("VITE_SITE_URL") || "",
  articlePrefix: readEnv("VITE_ARTICLE_ROUTE_PREFIX") || "/articles",
  siteName: readEnv("VITE_SITE_NAME") || "",
};

const contentfulClientConfig = {
  spaceId: must("VITE_CONTENTFUL_SPACE_ID"),
  environment: readEnv("VITE_CONTENTFUL_ENVIRONMENT") || "master",
  includeCSM:
    (readEnv("VITE_CONTENTFUL_INCLUDE_CONTENT_SOURCE_MAPS") || "false") ===
    "true",
  temporaryClientExposedDeliveryToken:
    readEnv("VITE_CONTENTFUL_DELIVERY_TOKEN") || "",
};

export const envClassification = {
  publicClient: [
    "VITE_BUILD_TARGET",
    "VITE_CONTENT_SOURCE",
    "VITE_SITE_URL",
    "VITE_SITE_NAME",
    "VITE_ARTICLE_ROUTE_PREFIX",
    "VITE_CONTENTFUL_SPACE_ID",
    "VITE_CONTENTFUL_ENVIRONMENT",
    "VITE_CONTENTFUL_INCLUDE_CONTENT_SOURCE_MAPS",
  ],
  temporaryClientExposed: ["VITE_CONTENTFUL_DELIVERY_TOKEN"],
  serverOnlyTarget: [
    "CONTENTFUL_DELIVERY_TOKEN",
    "CONTENTFUL_SPACE_ID",
    "CONTENTFUL_ENVIRONMENT",
  ],
  unusedOrObsolete: ["VITE_CONTENTFUL_USE_PREVIEW", "VITE_CONTENTFUL_PREVIEW_TOKEN"],
} as const;

export const env = {
  ...publicClientConfig,
  // Preserve existing runtime shape for current callers.
  contentful: {
    spaceId: contentfulClientConfig.spaceId,
    environment: contentfulClientConfig.environment,
    includeCSM: contentfulClientConfig.includeCSM,
    deliveryToken: contentfulClientConfig.temporaryClientExposedDeliveryToken,
  },
};
