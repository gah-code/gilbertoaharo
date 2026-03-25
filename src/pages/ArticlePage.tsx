import React from "react";
import { getContentSource } from "@/content/source";
import { PageShell } from "@/components/layout/PageShell";
import { RichTextRenderer } from "@/components/rich-text/RichTextRenderer";
import type { ArticlePageData } from "@/content/contentful/types";
import "@/styles/pages/article.css";

type ArticleState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data?: ArticlePageData | null };

function resolveAssetUrl(url?: string | null) {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function formatDate(iso?: string) {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatFileType(contentType?: string) {
  if (!contentType) return undefined;
  if (contentType === "application/pdf") return "PDF";
  const [type, subtype] = contentType.split("/");
  if (!subtype) return type.toUpperCase();
  return `${subtype.toUpperCase()} ${type.toUpperCase() === "IMAGE" ? "image" : type}`;
}

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
      <article className="article-page">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            {article.authorName ? <span>{article.authorName}</span> : null}
            {article.publishedAt ? (
              <time dateTime={article.publishedAt}>
                Published {formatDate(article.publishedAt)}
              </time>
            ) : null}
            {article.updatedAt ? (
              <time dateTime={article.updatedAt}>
                Updated {formatDate(article.updatedAt)}
              </time>
            ) : null}
          </div>
          {article.excerpt ? <p className="article-excerpt">{article.excerpt}</p> : null}
        </header>

        {article.heroImageUrl ? (
          <figure className="article-hero">
            <img
              src={resolveAssetUrl(article.heroImageUrl)}
              alt={article.title}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : null}

        <div className="article-body">
          <RichTextRenderer document={article.body} className="article-body__content" />
        </div>

        {article.attachments?.length ? (
          <section className="attachments">
            <h2>Attachments</h2>
            <ul className="attachments-list">
              {article.attachments.map((file) => {
                const label = file.fileName ?? file.url;
                const typeLabel = formatFileType(file.contentType);
                const href = resolveAssetUrl(file.url);
                return (
                  <li key={file.url} className="attachment">
                    <div className="attachment__info">
                      <a href={href} target="_blank" rel="noreferrer noopener">
                        {label}
                      </a>
                      {typeLabel ? <span className="attachment__type">{typeLabel}</span> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </article>
    </PageShell>
  );
}
