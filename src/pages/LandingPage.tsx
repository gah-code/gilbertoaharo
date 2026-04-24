import React from "react";
import { getContentSource } from "@/content/source";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/components/ui/Link";
import type { ArticleListItem, LandingPageData } from "@/content/contentful/types";
import { getErrorMessage } from "@/lib/errors";
import { buildCanonicalUrl, resolveRouteSeo } from "@/lib/seo";
import { buildArticlePath } from "@/router/routes";
import "./LandingPage.css";

type LandingState =
  | { loading: true; error?: undefined; data?: undefined }
  | {
      loading: false;
      error?: string;
      data?: LandingPageData;
      latestWriting?: ArticleListItem[];
    };

function compactText(value?: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function getSortTimestamp(article: ArticleListItem): number {
  const iso = compactText(article.publishedAt) ?? compactText(article.updatedAt);
  if (!iso) return 0;
  const timestamp = new Date(iso).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function pickLatestWriting(items: ArticleListItem[], limit = 3): ArticleListItem[] {
  return [...items]
    .map((item) => ({
      ...item,
      slug: compactText(item.slug) ?? "",
      title: compactText(item.title) ?? "",
      excerpt: compactText(item.excerpt),
    }))
    .filter((item) => Boolean(item.slug) && Boolean(item.title))
    .sort((a, b) => {
      const timestampDiff = getSortTimestamp(b) - getSortTimestamp(a);
      if (timestampDiff !== 0) return timestampDiff;
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    })
    .slice(0, limit);
}

const landingRouteSeo = {
  title: "Gilberto Haro | Frontend Engineer",
  description:
    "Frontend engineering portfolio focused on content systems, design systems, and maintainable web architecture.",
  canonicalUrl: buildCanonicalUrl("/"),
};

export function LandingPage() {
  const [state, setState] = React.useState<LandingState>({ loading: true });

  React.useEffect(() => {
    const source = getContentSource();
    Promise.all([
      source.getLandingPage(),
      source.getAllArticles().catch(() => []),
    ])
      .then(([data, articles]) =>
        setState({
          loading: false,
          data,
          latestWriting: pickLatestWriting(articles),
        }),
      )
      .catch((err: unknown) =>
        setState({
          loading: false,
          error: getErrorMessage(err),
        }),
      );
  }, []);

  if (state.loading) {
    return (
      <PageShell
        title={landingRouteSeo.title}
        description={landingRouteSeo.description}
        canonicalUrl={landingRouteSeo.canonicalUrl}
      >
        <p role="status" aria-live="polite">
          Loading…
        </p>
      </PageShell>
    );
  }

  if (state.error || !state.data) {
    return (
      <PageShell
        title={landingRouteSeo.title}
        description={landingRouteSeo.description}
        canonicalUrl={landingRouteSeo.canonicalUrl}
      >
        <p role="alert">Error: {state.error ?? "Unknown error"}</p>
      </PageShell>
    );
  }

  const seo = resolveRouteSeo(
    {
      title: state.data.metaTitle,
      description: state.data.metaDescription,
      canonicalUrl: buildCanonicalUrl("/"),
    },
    landingRouteSeo,
  );

  const contentSections = state.data.sections.filter(
    (section) => section.sys.contentType.sys.id !== "sectionFooter",
  );
  const latestWriting = state.latestWriting ?? [];

  return (
    <PageShell
      title={seo.title}
      description={seo.description}
      canonicalUrl={seo.canonicalUrl}
    >
      {contentSections.map((section) => (
        <SectionRenderer key={section.sys.id} section={section} />
      ))}
      <section className="landing-discovery" aria-labelledby="landing-discovery-title">
        <p className="landing-discovery__eyebrow">Writing</p>
        <h2 id="landing-discovery-title">Latest writing</h2>
        <p className="landing-discovery__intro">
          Recent notes on frontend systems, delivery quality, and content-driven
          product work.
        </p>
        {latestWriting.length > 0 ? (
          <ul className="landing-discovery__list">
            {latestWriting.map((article) => (
              <li key={article.slug}>
                <Link href={buildArticlePath(article.slug)} className="landing-discovery__link">
                  {article.title}
                </Link>
                {article.excerpt ? (
                  <p className="landing-discovery__excerpt">{article.excerpt}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="landing-discovery__empty">
            No recent articles are published yet.
          </p>
        )}
        <div className="landing-discovery__actions">
          <Link href="/articles" className="landing-discovery__action-link">
            Browse all articles
          </Link>
          <Link href="/#projects" className="landing-discovery__action-link">
            Explore projects
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
