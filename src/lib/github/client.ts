import { getGithubApiBase, getGithubToken } from "@/env";
import type { GitHubErrorResponse } from "./types";

type GithubApiErrorParams = {
  status: number;
  statusText: string;
  message: string;
  documentationUrl?: string;
};

export class GithubApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly documentationUrl?: string;

  constructor({
    status,
    statusText,
    message,
    documentationUrl,
  }: GithubApiErrorParams) {
    super(message);
    this.name = "GithubApiError";
    this.status = status;
    this.statusText = statusText;
    this.documentationUrl = documentationUrl;
  }
}

function toSafeObject(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "object" && value !== null) {
    return value as Record<string, unknown>;
  }
  return undefined;
}

function isGitHubErrorResponse(value: unknown): value is GitHubErrorResponse {
  const shape = toSafeObject(value);
  if (!shape) return false;
  const hasMessage = typeof shape.message === "string";
  const hasDocs =
    shape.documentation_url === undefined ||
    typeof shape.documentation_url === "string";
  return hasMessage && hasDocs;
}

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

async function readJsonSafely(response: Response): Promise<unknown | undefined> {
  const raw = await response.text();
  if (!raw) return undefined;

  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function defaultErrorMessage(response: Response): string {
  const statusLine = `${response.status} ${response.statusText}`.trim();
  return statusLine.length > 0
    ? `GitHub request failed: ${statusLine}`
    : "GitHub request failed.";
}

export async function githubRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = joinUrl(getGithubApiBase(), path);
  const headers = new Headers(init.headers);

  headers.set("Accept", "application/vnd.github+json");
  headers.set("X-GitHub-Api-Version", "2022-11-28");

  const token = getGithubToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  const payload = await readJsonSafely(response);

  if (!response.ok) {
    const errorShape = isGitHubErrorResponse(payload) ? payload : undefined;
    throw new GithubApiError({
      status: response.status,
      statusText: response.statusText,
      message: errorShape?.message ?? defaultErrorMessage(response),
      documentationUrl: errorShape?.documentation_url,
    });
  }

  if (payload === undefined) {
    throw new GithubApiError({
      status: response.status,
      statusText: response.statusText,
      message: "GitHub API returned an empty or invalid JSON response.",
    });
  }

  return payload as T;
}
