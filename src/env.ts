// src/env.ts
// Centralize env parsing so failures happen early and loudly.
// Boundary note:
// - All values read here come from Vite client env (`import.meta.env`).
// - `VITE_CONTENTFUL_DELIVERY_TOKEN` is transitional and still client-exposed.
// - `VITE_GITHUB_TOKEN` (if used) is also client-exposed by Vite and must be treated as public.
// - A later phase may move delivery access to a server-only boundary.

const clientEnv = {
  VITE_BUILD_TARGET: import.meta.env.VITE_BUILD_TARGET,
  VITE_CONTENT_SOURCE: import.meta.env.VITE_CONTENT_SOURCE,
  VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
  VITE_SITE_NAME: import.meta.env.VITE_SITE_NAME,
  VITE_ARTICLE_ROUTE_PREFIX: import.meta.env.VITE_ARTICLE_ROUTE_PREFIX,
  VITE_CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  VITE_CONTENTFUL_ENVIRONMENT: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
  VITE_CONTENTFUL_INCLUDE_CONTENT_SOURCE_MAPS:
    import.meta.env.VITE_CONTENTFUL_INCLUDE_CONTENT_SOURCE_MAPS,
  VITE_CONTENTFUL_DELIVERY_TOKEN:
    import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
  VITE_GITHUB_OWNER: import.meta.env.VITE_GITHUB_OWNER,
  VITE_GITHUB_REPO: import.meta.env.VITE_GITHUB_REPO,
  VITE_GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
  VITE_GITHUB_API_BASE: import.meta.env.VITE_GITHUB_API_BASE,
} as const;

type ClientEnvKey = keyof typeof clientEnv;

function readEnv(name: ClientEnvKey): string | undefined {
  const value = clientEnv[name];
  return typeof value === "string" ? value : undefined;
}

function must(name: ClientEnvKey): string {
  const value = readEnv(name);
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function readNonEmptyEnv(name: ClientEnvKey): string | undefined {
  const value = readEnv(name)?.trim();
  return value && value.length > 0 ? value : undefined;
}

// GitHub helpers are intentionally optional so the app can boot even when
// GitHub integration is not configured/mounted.
export function getGithubOwner(): string | undefined {
  return readNonEmptyEnv("VITE_GITHUB_OWNER");
}

export function getGithubRepo(): string | undefined {
  return readNonEmptyEnv("VITE_GITHUB_REPO");
}

export function getGithubToken(): string | undefined {
  return readNonEmptyEnv("VITE_GITHUB_TOKEN");
}

export function getGithubApiBase(): string {
  return readNonEmptyEnv("VITE_GITHUB_API_BASE") || "https://api.github.com";
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

const githubClientConfig = {
  owner: getGithubOwner(),
  repo: getGithubRepo(),
  // Optional in public-read mode; omit to avoid sending auth header.
  token: getGithubToken(),
  apiBase: getGithubApiBase(),
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
    "VITE_GITHUB_OWNER",
    "VITE_GITHUB_REPO",
    "VITE_GITHUB_API_BASE",
  ],
  temporaryClientExposed: [
    "VITE_CONTENTFUL_DELIVERY_TOKEN",
    "VITE_GITHUB_TOKEN",
  ],
  serverOnlyTarget: [
    "CONTENTFUL_DELIVERY_TOKEN",
    "CONTENTFUL_SPACE_ID",
    "CONTENTFUL_ENVIRONMENT",
    "GITHUB_TOKEN",
  ],
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
  github: {
    owner: githubClientConfig.owner,
    repo: githubClientConfig.repo,
    token: githubClientConfig.token,
    apiBase: githubClientConfig.apiBase,
  },
};
