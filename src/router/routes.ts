const defaultArticlePrefix = "/articles";

function normalizePrefix(prefix: string) {
  if (!prefix) return defaultArticlePrefix;
  if (!prefix.startsWith("/")) return `/${prefix}`;
  return prefix;
}

export const ARTICLE_ROUTE_PREFIX = normalizePrefix(
  (import.meta.env.VITE_ARTICLE_ROUTE_PREFIX as string) || defaultArticlePrefix,
);

export type RouteMatch =
  | { name: "landing" }
  | { name: "article"; slug: string }
  | { name: "not-found" };

export function parsePathname(pathname: string): RouteMatch {
  const cleanPath = pathname || "/";
  const normalizedPrefix = ARTICLE_ROUTE_PREFIX.replace(/\/+$/, "");
  const normalizedPath =
    cleanPath.length > 1 && cleanPath.endsWith("/")
      ? cleanPath.slice(0, -1)
      : cleanPath;

  if (normalizedPath === "/") {
    return { name: "landing" };
  }

  if (normalizedPath.startsWith(`${normalizedPrefix}/`)) {
    const slug = normalizedPath.slice(normalizedPrefix.length + 1);
    if (slug) {
      return { name: "article", slug };
    }
  }

  return { name: "not-found" };
}

export function buildArticlePath(slug: string) {
  return `${ARTICLE_ROUTE_PREFIX.replace(/\/+$/, "")}/${slug}`;
}
