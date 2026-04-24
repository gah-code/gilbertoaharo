import { describe, expect, it } from "vitest";
import {
  mapGithubRateLimit,
  mapGithubReadme,
  mapGithubRepo,
  mapGithubUser,
} from "./mappers";

describe("github mappers", () => {
  it("maps GitHub user response into profile view model", () => {
    const mapped = mapGithubUser({
      login: "octocat",
      name: "The Octocat",
      avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
      bio: "GitHub mascot",
      html_url: "https://github.com/octocat",
      public_repos: 8,
      followers: 100,
      following: 0,
    });

    expect(mapped).toEqual({
      login: "octocat",
      name: "The Octocat",
      avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
      bio: "GitHub mascot",
      profileUrl: "https://github.com/octocat",
      publicRepos: 8,
      followers: 100,
      following: 0,
    });
  });

  it("maps GitHub repository response into repository summary", () => {
    const mapped = mapGithubRepo({
      name: "hello-world",
      full_name: "octocat/hello-world",
      description: "This your first repo!",
      html_url: "https://github.com/octocat/hello-world",
      homepage: "https://example.com",
      language: "TypeScript",
      stargazers_count: 42,
      forks_count: 7,
      open_issues_count: 3,
      updated_at: "2026-04-20T10:20:30.000Z",
      default_branch: "main",
      topics: ["portfolio", "website"],
    });

    expect(mapped).toEqual({
      name: "hello-world",
      fullName: "octocat/hello-world",
      description: "This your first repo!",
      htmlUrl: "https://github.com/octocat/hello-world",
      homepage: "https://example.com",
      language: "TypeScript",
      stargazersCount: 42,
      forksCount: 7,
      openIssuesCount: 3,
      updatedAt: "2026-04-20T10:20:30.000Z",
      defaultBranch: "main",
      topics: ["portfolio", "website"],
    });
  });

  it("maps GitHub rate limit response into app-safe status", () => {
    const mapped = mapGithubRateLimit({
      rate: {
        limit: 60,
        remaining: 42,
        used: 18,
        reset: 1_777_777_777,
      },
    });

    expect(mapped.limit).toBe(60);
    expect(mapped.remaining).toBe(42);
    expect(mapped.used).toBe(18);
    expect(mapped.resetAt).toBe("2026-05-03T03:09:37.000Z");
  });

  it("handles missing optional fields defensively", () => {
    const profile = mapGithubUser({
      login: "octocat",
    });
    const repo = mapGithubRepo({
      name: "hello-world",
    });
    const rateLimit = mapGithubRateLimit({});

    expect(profile.name).toBeUndefined();
    expect(profile.publicRepos).toBe(0);
    expect(repo.description).toBeUndefined();
    expect(repo.defaultBranch).toBe("main");
    expect(repo.topics).toEqual([]);
    expect(rateLimit).toEqual({
      limit: 0,
      remaining: 0,
      used: 0,
      resetAt: "",
    });
  });

  it("decodes base64 README content when possible", () => {
    const mapped = mapGithubReadme({
      name: "README.md",
      path: "README.md",
      encoding: "base64",
      content: "IyBIZWxsbyBXb3JsZAo=",
      html_url: "https://github.com/octocat/hello-world/blob/main/README.md",
    });

    expect(mapped.content).toBe("# Hello World\n");
    expect(mapped.encoding).toBe("base64");
    expect(mapped.htmlUrl).toBe(
      "https://github.com/octocat/hello-world/blob/main/README.md",
    );
  });
});
