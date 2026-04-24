export type GitHubUserResponse = {
  login?: string | null;
  name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  html_url?: string | null;
  public_repos?: number | null;
  followers?: number | null;
  following?: number | null;
};

export type GitHubRepoResponse = {
  name?: string | null;
  full_name?: string | null;
  description?: string | null;
  html_url?: string | null;
  homepage?: string | null;
  language?: string | null;
  stargazers_count?: number | null;
  forks_count?: number | null;
  open_issues_count?: number | null;
  updated_at?: string | null;
  default_branch?: string | null;
  topics?: string[] | null;
};

export type GitHubRepoContentItemResponse = {
  name?: string | null;
  path?: string | null;
  type?: string | null;
  size?: number | null;
  html_url?: string | null;
  download_url?: string | null;
  content?: string | null;
  encoding?: string | null;
};

export type GitHubRateLimitResponse = {
  rate?: {
    limit?: number | null;
    remaining?: number | null;
    reset?: number | null;
    used?: number | null;
  } | null;
};

export type GitHubErrorResponse = {
  message?: string;
  documentation_url?: string;
};

export type GithubProfile = {
  login: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
};

export type GithubRepositorySummary = {
  name: string;
  fullName: string;
  description?: string;
  htmlUrl: string;
  homepage?: string;
  language?: string;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  updatedAt?: string;
  defaultBranch: string;
  topics: string[];
};

export type GithubReadmeFile = {
  name: string;
  path: string;
  content: string;
  encoding: string;
  htmlUrl?: string;
};

export type GithubRateLimitStatus = {
  limit: number;
  remaining: number;
  resetAt: string;
  used: number;
};

export type GithubRepoContentItem = {
  name: string;
  path: string;
  type: string;
  size: number;
  htmlUrl?: string;
  downloadUrl?: string;
};
