import { getGithubOwner, getGithubRepo as getGithubRepoEnv } from "@/env";
import { githubRequest } from "./client";
import {
  mapGithubRateLimit,
  mapGithubReadme,
  mapGithubRepo,
  mapGithubRepoContentItem,
  mapGithubUser,
} from "./mappers";
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

function normalizeOptional(value?: string): string | undefined {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : undefined;
}

function resolveOwner(owner?: string): string | undefined {
  return normalizeOptional(owner) ?? getGithubOwner();
}

function resolveRepo(repo?: string): string | undefined {
  return normalizeOptional(repo) ?? getGithubRepoEnv();
}

function requireOwner(operation: string, owner?: string): string {
  const resolvedOwner = resolveOwner(owner);
  if (!resolvedOwner) {
    throw new Error(
      `GitHub owner is required to ${operation}. Set VITE_GITHUB_OWNER or pass an owner argument.`,
    );
  }
  return resolvedOwner;
}

function requireOwnerRepo(
  operation: string,
  owner?: string,
  repo?: string,
): { owner: string; repo: string } {
  const resolvedOwner = resolveOwner(owner);
  const resolvedRepo = resolveRepo(repo);

  if (!resolvedOwner || !resolvedRepo) {
    throw new Error(
      `GitHub owner and repo are required to ${operation}. Set VITE_GITHUB_OWNER/VITE_GITHUB_REPO or pass arguments.`,
    );
  }

  return { owner: resolvedOwner, repo: resolvedRepo };
}

function encodePath(path?: string): string | undefined {
  const normalized = normalizeOptional(path);
  if (!normalized) return undefined;
  return normalized
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export async function getGithubProfile(owner?: string): Promise<GithubProfile> {
  const resolvedOwner = requireOwner("fetch GitHub profile", owner);
  const response = await githubRequest<GitHubUserResponse>(
    `/users/${encodeURIComponent(resolvedOwner)}`,
  );
  return mapGithubUser(response);
}

export async function getGithubRepo(
  owner?: string,
  repo?: string,
): Promise<GithubRepositorySummary> {
  const resolved = requireOwnerRepo("fetch GitHub repository", owner, repo);
  const response = await githubRequest<GitHubRepoResponse>(
    `/repos/${encodeURIComponent(resolved.owner)}/${encodeURIComponent(resolved.repo)}`,
  );
  return mapGithubRepo(response);
}

export async function getGithubReadme(
  owner?: string,
  repo?: string,
): Promise<GithubReadmeFile> {
  const resolved = requireOwnerRepo("fetch GitHub README", owner, repo);
  const response = await githubRequest<GitHubRepoContentItemResponse>(
    `/repos/${encodeURIComponent(resolved.owner)}/${encodeURIComponent(resolved.repo)}/readme`,
  );
  return mapGithubReadme(response);
}

export async function getGithubRateLimit(): Promise<GithubRateLimitStatus> {
  const response = await githubRequest<GitHubRateLimitResponse>("/rate_limit");
  return mapGithubRateLimit(response);
}

export async function listRepoContents(
  path?: string,
  owner?: string,
  repo?: string,
): Promise<GithubRepoContentItem[]> {
  const resolved = requireOwnerRepo("list repository contents", owner, repo);
  const encodedPath = encodePath(path);
  const endpoint = encodedPath
    ? `/repos/${encodeURIComponent(resolved.owner)}/${encodeURIComponent(resolved.repo)}/contents/${encodedPath}`
    : `/repos/${encodeURIComponent(resolved.owner)}/${encodeURIComponent(resolved.repo)}/contents`;

  const response = await githubRequest<
    GitHubRepoContentItemResponse | GitHubRepoContentItemResponse[]
  >(endpoint);
  const entries = Array.isArray(response) ? response : [response];
  return entries.map(mapGithubRepoContentItem);
}
