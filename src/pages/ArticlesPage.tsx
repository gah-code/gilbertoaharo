import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getContentSource } from "@/content/source";
import type { ArticleListItem } from "@/content/contentful/types";
import { getErrorMessage } from "@/lib/errors";
import { normalizeArticles } from "./articles/articlesPageUtils";
import "./ArticlesPage.css";

type ArticlesState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data: ArticleListItem[] };

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
      title="Articles | Gilberto Haro"
      description="Writing on frontend engineering, content systems, and digital experience design."
      canonicalUrl="https://gilbertoharo.com/articles"
    >
      <section className="articles-page">
        <header className="articles-page__header">
          <p className="articles-page__eyebrow">Writing</p>
          <h1 className="articles-page__title">Articles</h1>
          <p className="articles-page__intro">
            Notes and long-form writing on web engineering, content systems, and
            thoughtful interface work.
          </p>
        </header>

        {state.loading ? (
          <p className="articles-page__status">Loading articles…</p>
        ) : null}

        {!state.loading && state.error ? (
          <p className="articles-page__status">Error: {state.error}</p>
        ) : null}

        {!state.loading && !state.error && state.data.length === 0 ? (
          <p className="articles-page__status">No articles found.</p>
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
