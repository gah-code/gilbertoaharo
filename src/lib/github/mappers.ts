import type {
  GitHubRateLimitResponse,
  GitHubRepoContentItemResponse,
  GitHubRepoResponse,
  GitHubUserResponse,
  GithubProfile,
  GithubRateLimitStatus,
  GithubReadmeFile,
  GithubRepoContentItem,
  GithubRepositorySummary,
} from "./types";

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => asNonEmptyString(entry))
    .filter((entry): entry is string => Boolean(entry));
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "object" && value !== null) {
    return value as Record<string, unknown>;
  }
  return undefined;
}

function decodeBase64Content(value: string): string | undefined {
  const normalized = value.replace(/\n/g, "");
  if (!normalized) return undefined;

  try {
    if (typeof globalThis.atob === "function") {
      const binary = globalThis.atob(normalized);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }
  } catch {
    // Fall through to Buffer fallback.
  }

  try {
    const maybeBuffer = (
      globalThis as unknown as {
        Buffer?: {
          from: (
            input: string,
            encoding: "base64",
          ) => { toString: (encoding: "utf-8") => string };
        };
      }
    ).Buffer;

    if (maybeBuffer) {
      return maybeBuffer.from(normalized, "base64").toString("utf-8");
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function mapGithubUser(response: GitHubUserResponse): GithubProfile {
  const login = asNonEmptyString(response.login) ?? "unknown";
  return {
    login,
    name: asNonEmptyString(response.name),
    avatarUrl: asNonEmptyString(response.avatar_url),
    bio: asNonEmptyString(response.bio),
    profileUrl:
      asNonEmptyString(response.html_url) ?? `https://github.com/${login}`,
    publicRepos: asNumber(response.public_repos) ?? 0,
    followers: asNumber(response.followers) ?? 0,
    following: asNumber(response.following) ?? 0,
  };
}

export function mapGithubRepo(
  response: GitHubRepoResponse,
): GithubRepositorySummary {
  const name = asNonEmptyString(response.name) ?? "unknown";
  const fullName = asNonEmptyString(response.full_name) ?? name;
  return {
    name,
    fullName,
    description: asNonEmptyString(response.description),
    htmlUrl: asNonEmptyString(response.html_url) ?? `https://github.com/${fullName}`,
    homepage: asNonEmptyString(response.homepage),
    language: asNonEmptyString(response.language),
    stargazersCount: asNumber(response.stargazers_count) ?? 0,
    forksCount: asNumber(response.forks_count) ?? 0,
    openIssuesCount: asNumber(response.open_issues_count) ?? 0,
    updatedAt: asNonEmptyString(response.updated_at),
    defaultBranch: asNonEmptyString(response.default_branch) ?? "main",
    topics: asStringArray(response.topics),
  };
}

export function mapGithubRateLimit(
  response: GitHubRateLimitResponse,
): GithubRateLimitStatus {
  const rate = asObject(response.rate);
  const limit = asNumber(rate?.limit) ?? 0;
  const remaining = asNumber(rate?.remaining) ?? 0;
  const used = asNumber(rate?.used) ?? Math.max(0, limit - remaining);
  const resetEpochSeconds = asNumber(rate?.reset) ?? 0;

  return {
    limit,
    remaining,
    used,
    resetAt:
      resetEpochSeconds > 0
        ? new Date(resetEpochSeconds * 1000).toISOString()
        : "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapGithubReadme(response: any): GithubReadmeFile {
  const encoding = asNonEmptyString(response?.encoding) ?? "";
  const rawContent = asNonEmptyString(response?.content) ?? "";
  const decodedContent =
    encoding.toLowerCase() === "base64"
      ? decodeBase64Content(rawContent)
      : undefined;

  return {
    name: asNonEmptyString(response?.name) ?? "README.md",
    path: asNonEmptyString(response?.path) ?? "README.md",
    content: decodedContent ?? rawContent,
    encoding,
    htmlUrl: asNonEmptyString(response?.html_url),
  };
}

export function mapGithubRepoContentItem(
  response: GitHubRepoContentItemResponse,
): GithubRepoContentItem {
  return {
    name: asNonEmptyString(response.name) ?? "",
    path: asNonEmptyString(response.path) ?? "",
    type: asNonEmptyString(response.type) ?? "unknown",
    size: asNumber(response.size) ?? 0,
    htmlUrl: asNonEmptyString(response.html_url),
    downloadUrl: asNonEmptyString(response.download_url),
  };
}
