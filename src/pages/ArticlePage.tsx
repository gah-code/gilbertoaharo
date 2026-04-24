import React from "react";
import { getContentSource } from "@/content/source";
import { PageShell } from "@/components/layout/PageShell";
import { RichTextRenderer } from "@/components/rich-text/RichTextRenderer";
import { Link } from "@/components/ui/Link";
import type { ArticlePageData } from "@/content/contentful/types";
import { env } from "@/env";
import { getErrorMessage } from "@/lib/errors";
import { buildCanonicalUrl, resolveRouteSeo } from "@/lib/seo";
import "./ArticlePage.css";

type ArticleState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data?: ArticlePageData | null };

const articleIndexPath = env.articlePrefix;

const articleRouteSeo = {
  title: "Article | Gilberto Haro",
  description:
    "Long-form writing on frontend engineering, content systems, and interface architecture.",
  canonicalUrl: buildCanonicalUrl(articleIndexPath),
};

const articleNotFoundSeo = {
  title: "Article not found | Gilberto Haro",
  description: "The requested article could not be found.",
  canonicalUrl: buildCanonicalUrl(articleIndexPath),
};

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
          error: getErrorMessage(err),
        }),
      );
  }, [slug]);

  if (state.loading) {
    return (
      <PageShell
        title={articleRouteSeo.title}
        description={articleRouteSeo.description}
        canonicalUrl={articleRouteSeo.canonicalUrl}
      >
        <p role="status" aria-live="polite">
          Loading…
        </p>
      </PageShell>
    );
  }
  if (state.error) {
    return (
      <PageShell
        title={articleRouteSeo.title}
        description={articleRouteSeo.description}
        canonicalUrl={articleRouteSeo.canonicalUrl}
      >
        <p role="alert">Error: {state.error}</p>
        <p>
          <Link href={articleIndexPath}>Return to all articles</Link>
        </p>
      </PageShell>
    );
  }
  if (!state.data) {
    return (
      <PageShell
        title={articleNotFoundSeo.title}
        description={articleNotFoundSeo.description}
        canonicalUrl={articleNotFoundSeo.canonicalUrl}
      >
        <p role="status" aria-live="polite">
          Not found.
        </p>
        <p>
          <Link href={articleIndexPath}>Browse all articles</Link>
        </p>
      </PageShell>
    );
  }

  const article = state.data;
  const seo = resolveRouteSeo(
    {
      title: article.seo.title || article.title,
      description: article.seo.description || article.excerpt,
      canonicalUrl:
        article.seo.canonicalUrl ||
        buildCanonicalUrl(`${articleIndexPath}/${article.slug}`),
    },
    articleRouteSeo,
  );

  return (
    <PageShell
      title={seo.title}
      description={seo.description}
      canonicalUrl={seo.canonicalUrl}
    >
      <article className="article-page">
        <nav className="article-page__context" aria-label="Article navigation">
          <Link href={articleIndexPath} className="article-page__context-link">
            All articles
          </Link>
          <Link href="/" className="article-page__context-link">
            Home
          </Link>
          <Link href="/#projects" className="article-page__context-link">
            Projects
          </Link>
        </nav>

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
            <h2>Attachments and resources</h2>
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

        <nav className="article-page__footer-nav" aria-label="Continue browsing">
          <Link href={articleIndexPath} className="article-page__context-link">
            Browse all articles
          </Link>
          <Link href="/#projects" className="article-page__context-link">
            Explore projects
          </Link>
        </nav>
      </article>
    </PageShell>
  );
}
