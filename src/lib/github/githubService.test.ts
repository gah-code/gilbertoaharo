import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/env", () => ({
  getGithubApiBase: vi.fn(() => "https://api.github.com"),
  getGithubOwner: vi.fn(() => "octocat"),
  getGithubRepo: vi.fn(() => "hello-world"),
  getGithubToken: vi.fn(() => undefined),
}));

import {
  getGithubApiBase,
  getGithubOwner,
  getGithubRepo,
  getGithubToken,
} from "@/env";
import { GithubApiError, githubRequest } from "./client";
import {
  getGithubProfile,
  getGithubRateLimit,
  getGithubReadme,
  getGithubRepo as getGithubRepository,
  listRepoContents,
} from "./githubService";

const mockedGetGithubApiBase = vi.mocked(getGithubApiBase);
const mockedGetGithubOwner = vi.mocked(getGithubOwner);
const mockedGetGithubRepo = vi.mocked(getGithubRepo);
const mockedGetGithubToken = vi.mocked(getGithubToken);

const fetchMock = vi.fn<typeof fetch>();

function jsonResponse(body: unknown, status = 200, statusText = "OK") {
  return new Response(JSON.stringify(body), {
    status,
    statusText,
    headers: { "Content-Type": "application/json" },
  });
}

describe("github service layer", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);

    mockedGetGithubApiBase.mockReturnValue("https://api.github.com");
    mockedGetGithubOwner.mockReturnValue("octocat");
    mockedGetGithubRepo.mockReturnValue("hello-world");
    mockedGetGithubToken.mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sets default GitHub headers without Authorization when token is absent", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ rate: {} }));

    await githubRequest("/rate_limit");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = new Headers(init?.headers);

    expect(url).toBe("https://api.github.com/rate_limit");
    expect(headers.get("Accept")).toBe("application/vnd.github+json");
    expect(headers.get("X-GitHub-Api-Version")).toBe("2022-11-28");
    expect(headers.has("Authorization")).toBe(false);
  });

  it("adds Authorization header only when token exists", async () => {
    mockedGetGithubToken.mockReturnValue("token_123");
    fetchMock.mockResolvedValueOnce(jsonResponse({ rate: {} }));

    await githubRequest("/rate_limit");

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = new Headers(init?.headers);
    expect(headers.get("Authorization")).toBe("Bearer token_123");
  });

  it("throws GithubApiError on non-OK response with normalized fields", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        {
          message: "API rate limit exceeded",
          documentation_url:
            "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting",
        },
        403,
        "Forbidden",
      ),
    );

    let thrown: unknown;
    try {
      await githubRequest("/rate_limit");
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(GithubApiError);
    if (!(thrown instanceof GithubApiError)) {
      throw new Error("Expected GithubApiError");
    }
    expect(thrown.status).toBe(403);
    expect(thrown.statusText).toBe("Forbidden");
    expect(thrown.message).toBe("API rate limit exceeded");
    expect(thrown.documentationUrl).toContain("rate-limiting");
  });

  it("returns mapped profile data through getGithubProfile", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        login: "octocat",
        name: "The Octocat",
        html_url: "https://github.com/octocat",
        public_repos: 8,
      }),
    );

    const profile = await getGithubProfile();
    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];

    expect(url).toBe("https://api.github.com/users/octocat");
    expect(profile).toEqual({
      login: "octocat",
      name: "The Octocat",
      avatarUrl: undefined,
      bio: undefined,
      profileUrl: "https://github.com/octocat",
      publicRepos: 8,
      followers: 0,
      following: 0,
    });
  });

  it("returns mapped repository summary through getGithubRepo", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        name: "portfolio",
        full_name: "octocat/portfolio",
        html_url: "https://github.com/octocat/portfolio",
        stargazers_count: 5,
        forks_count: 1,
        open_issues_count: 0,
        default_branch: "main",
      }),
    );

    const repo = await getGithubRepository();
    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];

    expect(url).toBe("https://api.github.com/repos/octocat/hello-world");
    expect(repo.name).toBe("portfolio");
    expect(repo.fullName).toBe("octocat/portfolio");
    expect(repo.stargazersCount).toBe(5);
  });

  it("returns mapped README and decodes base64 content", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        name: "README.md",
        path: "README.md",
        encoding: "base64",
        content: "IyBIZWxsbyBXb3JsZAo=",
        html_url: "https://github.com/octocat/hello-world/blob/main/README.md",
      }),
    );

    const readme = await getGithubReadme();
    expect(readme.content).toBe("# Hello World\n");
  });

  it("returns mapped rate limit status", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        rate: {
          limit: 60,
          remaining: 59,
          used: 1,
          reset: 1_777_777_777,
        },
      }),
    );

    const rateLimit = await getGithubRateLimit();
    expect(rateLimit).toEqual({
      limit: 60,
      remaining: 59,
      used: 1,
      resetAt: "2026-05-03T03:09:37.000Z",
    });
  });

  it("maps repository contents from both object and array payloads", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse([
        {
          name: "README.md",
          path: "README.md",
          type: "file",
          size: 123,
          html_url: "https://github.com/octocat/hello-world/blob/main/README.md",
          download_url:
            "https://raw.githubusercontent.com/octocat/hello-world/main/README.md",
        },
      ]),
    );

    const entries = await listRepoContents();
    expect(entries).toEqual([
      {
        name: "README.md",
        path: "README.md",
        type: "file",
        size: 123,
        htmlUrl: "https://github.com/octocat/hello-world/blob/main/README.md",
        downloadUrl:
          "https://raw.githubusercontent.com/octocat/hello-world/main/README.md",
      },
    ]);
  });

  it("throws when owner/repo are missing for repo-specific requests", async () => {
    mockedGetGithubOwner.mockReturnValue(undefined);
    mockedGetGithubRepo.mockReturnValue(undefined);

    await expect(getGithubRepository()).rejects.toThrow(
      "GitHub owner and repo are required",
    );
    await expect(listRepoContents()).rejects.toThrow(
      "GitHub owner and repo are required",
    );

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
