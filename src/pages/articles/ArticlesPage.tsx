import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Link } from "@/components/ui/Link";
import { getContentSource } from "@/content/source";
import type { ArticleListItem } from "@/content/contentful/types";
import { getErrorMessage } from "@/lib/errors";
import { env } from "@/env";
import { buildCanonicalUrl } from "@/lib/seo";
import { normalizeArticles } from "./articlesPageUtils";
import "./ArticlesPage.css";

type ArticlesState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data: ArticleListItem[] };

const articlesRouteSeo = {
  title: "Articles | Gilberto Haro",
  description:
    "Writing on frontend engineering, content systems, and digital experience design.",
  canonicalUrl: buildCanonicalUrl(env.articlePrefix),
};

export function ArticlesPage() {
  const [state, setState] = React.useState<ArticlesState>({
    loading: true,
  });

  React.useEffect(() => {
    const source = getContentSource();
    source
      .getAllArticles()
      .then((items) =>
        setState({
          loading: false,
          data: normalizeArticles(items),
        }),
      )
      .catch((err: unknown) =>
        setState({
          loading: false,
          error: getErrorMessage(err),
          data: [],
        }),
      );
  }, []);

  return (
    <PageShell
      title={articlesRouteSeo.title}
      description={articlesRouteSeo.description}
      canonicalUrl={articlesRouteSeo.canonicalUrl}
    >
      <section className="articles-page" aria-busy={state.loading}>
        <header className="articles-page__header">
          <p className="articles-page__eyebrow">Writing</p>
          <h1 className="articles-page__title">Articles</h1>
          <p className="articles-page__intro">
            Notes and long-form writing on web engineering, content systems, and
            thoughtful interface work.
          </p>
          <div className="articles-page__actions">
            <Link href="/" className="articles-page__action-link">
              Back to homepage
            </Link>
            <Link href="/#projects" className="articles-page__action-link">
              Explore projects
            </Link>
          </div>
        </header>

        {state.loading ? (
          <p className="articles-page__status" role="status" aria-live="polite">
            Loading articles…
          </p>
        ) : null}

        {!state.loading && state.error ? (
          <p className="articles-page__status" role="alert">
            Error: {state.error}
          </p>
        ) : null}

        {!state.loading && !state.error && state.data.length === 0 ? (
          <p className="articles-page__status" role="status" aria-live="polite">
            No articles found yet. Check back soon, or return to the{" "}
            <Link href="/" className="articles-page__inline-link">
              homepage
            </Link>
            .
          </p>
        ) : null}

        {!state.loading && !state.error && state.data.length > 0 ? (
          <div className="articles-page__grid">
            {state.data.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}
