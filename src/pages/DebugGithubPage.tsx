import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/components/ui/Link";
import {
  getGithubProfile,
  getGithubRateLimit,
  getGithubReadme,
  getGithubRepo,
} from "@/lib/github/githubService";
import type {
  GithubProfile,
  GithubRateLimitStatus,
  GithubReadmeFile,
  GithubRepositorySummary,
} from "@/lib/github/types";
import { getErrorMessage } from "@/lib/errors";
import { buildCanonicalUrl } from "@/lib/seo";

type DebugGithubState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error: string; data?: undefined }
  | {
      loading: false;
      error?: undefined;
      data: {
        profile: GithubProfile;
        repo: GithubRepositorySummary;
        rateLimit: GithubRateLimitStatus;
        readme?: GithubReadmeFile;
      };
    };

const debugGithubRouteSeo = {
  title: "GitHub Debug | Gilberto Haro",
  description: "Developer validation route for the Phase 1 GitHub service layer.",
  canonicalUrl: buildCanonicalUrl("/debug/github"),
};

const debugRobots = {
  index: false,
  follow: false,
};

export function DebugGithubPage() {
  const [state, setState] = React.useState<DebugGithubState>({
    loading: true,
  });

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profile, repo, rateLimit] = await Promise.all([
          getGithubProfile(),
          getGithubRepo(),
          getGithubRateLimit(),
        ]);

        let readme: GithubReadmeFile | undefined;
        try {
          readme = await getGithubReadme();
        } catch {
          // README fetch is optional for this debug surface.
        }

        if (!cancelled) {
          setState({
            loading: false,
            data: { profile, repo, rateLimit, readme },
          });
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setState({
            loading: false,
            error: getErrorMessage(error),
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.loading) {
    return (
      <PageShell
        title={debugGithubRouteSeo.title}
        description={debugGithubRouteSeo.description}
        canonicalUrl={debugGithubRouteSeo.canonicalUrl}
        robots={debugRobots}
      >
        <h1>GitHub Debug</h1>
        <p>
          <Link href="/">Home</Link> · <Link href="/articles">Articles</Link>
        </p>
        <p role="status" aria-live="polite">
          Loading GitHub debug data…
        </p>
      </PageShell>
    );
  }

  if (state.error) {
    return (
      <PageShell
        title={debugGithubRouteSeo.title}
        description={debugGithubRouteSeo.description}
        canonicalUrl={debugGithubRouteSeo.canonicalUrl}
        robots={debugRobots}
      >
        <h1>GitHub Debug</h1>
        <p>
          <Link href="/">Home</Link> · <Link href="/articles">Articles</Link>
        </p>
        <p role="alert">Error: {state.error}</p>
      </PageShell>
    );
  }

  const data = state.data;
  if (!data) {
    return (
      <PageShell
        title={debugGithubRouteSeo.title}
        description={debugGithubRouteSeo.description}
        canonicalUrl={debugGithubRouteSeo.canonicalUrl}
        robots={debugRobots}
      >
        <h1>GitHub Debug</h1>
        <p>
          <Link href="/">Home</Link> · <Link href="/articles">Articles</Link>
        </p>
        <p role="status" aria-live="polite">
          GitHub debug data unavailable.
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={debugGithubRouteSeo.title}
      description={debugGithubRouteSeo.description}
      canonicalUrl={debugGithubRouteSeo.canonicalUrl}
      robots={debugRobots}
    >
      <section>
        <h1>GitHub Debug</h1>
        <p>
          <Link href="/">Home</Link> · <Link href="/articles">Articles</Link>
        </p>
        <p>Validation surface for Phase 1 GitHub integration.</p>

        <h2>Profile</h2>
        <pre>{JSON.stringify(data.profile, null, 2)}</pre>

        <h2>Repository</h2>
        <pre>{JSON.stringify(data.repo, null, 2)}</pre>

        <h2>Rate Limit</h2>
        <pre>{JSON.stringify(data.rateLimit, null, 2)}</pre>

        <h2>README</h2>
        {data.readme ? (
          <pre>{JSON.stringify(data.readme, null, 2)}</pre>
        ) : (
          <p>README not available.</p>
        )}
      </section>
    </PageShell>
  );
}
