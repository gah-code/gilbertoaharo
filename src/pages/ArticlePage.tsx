import React from "react";
import { getContentSource } from "@/content/source";
import { PageShell } from "@/components/layout/PageShell";
import { RichTextRenderer } from "@/components/rich-text/RichTextRenderer";
import type { ArticlePageData } from "@/content/contentful/types";

type ArticleState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data?: ArticlePageData | null };

export function ArticlePage({ slug }: { slug: string }) {
  const [state, setState] = React.useState<ArticleState>({ loading: true });

  React.useEffect(() => {
    const source = getContentSource();
    source
      .getArticleBySlug(slug)
      .then((data) => setState({ loading: false, data }))
      .catch((err: unknown) =>
        setState({
          loading: false,
          error: String((err as any)?.message ?? err),
        }),
      );
  }, [slug]);

  if (state.loading) {
    return (
      <PageShell>
        <p>Loading…</p>
      </PageShell>
    );
  }
  if (state.error) {
    return (
      <PageShell>
        <p>Error: {state.error}</p>
      </PageShell>
    );
  }
  if (!state.data) {
    return (
      <PageShell>
        <p>Not found.</p>
      </PageShell>
    );
  }

  const article = state.data;

  return (
    <PageShell
      title={article.seo.title}
      description={article.seo.description}
      canonicalUrl={article.seo.canonicalUrl}
    >
      <article>
        <h1>{article.title}</h1>
        {article.excerpt ? <p>{article.excerpt}</p> : null}
        {article.heroImageUrl ? <img src={article.heroImageUrl} alt="" /> : null}

        <RichTextRenderer document={article.body} />

        {article.attachments?.length ? (
          <section>
            <h2>Attachments</h2>
            <ul>
              {article.attachments.map((file) => (
                <li key={file.url}>
                  <a href={file.url} target="_blank" rel="noreferrer">
                    {file.fileName ?? file.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </PageShell>
  );
}
