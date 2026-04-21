import type { ArticleListItem } from "@/content/contentful/types";
import { Link } from "@/components/ui/Link";
import { buildArticlePath } from "@/router/routes";
import "./ArticleCard.css";

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

export function ArticleCard({ article }: { article: ArticleListItem }) {
  const href = buildArticlePath(article.slug);
  const imageUrl = resolveAssetUrl(article.heroImageUrl);
  const publishedLabel = formatDate(article.publishedAt);
  const updatedLabel = formatDate(article.updatedAt);
  const dateLabel = publishedLabel ?? updatedLabel;
  const datePrefix = publishedLabel ? "Published" : "Updated";
  const dateTime = publishedLabel ? article.publishedAt : article.updatedAt;
  const hasMeta = Boolean(article.authorName || dateLabel);

  return (
    <article className="article-card">
      {imageUrl ? (
        <Link
          href={href}
          className="article-card__media"
          aria-label={`Read article: ${article.title}`}
          variant="unstyled"
        >
          <img
            src={imageUrl}
            alt={article.title}
            loading="lazy"
            decoding="async"
          />
        </Link>
      ) : null}

      <div className="article-card__body">
        <h2 className="article-card__title">
          <Link href={href} variant="unstyled" className="article-card__title-link">
            {article.title}
          </Link>
        </h2>

        {hasMeta ? (
          <div className="article-card__meta">
            {article.authorName ? <span>{article.authorName}</span> : null}
            {dateLabel ? (
              <time dateTime={dateTime}>
                {datePrefix} {dateLabel}
              </time>
            ) : null}
          </div>
        ) : null}

        {article.excerpt ? (
          <p className="article-card__excerpt">{article.excerpt}</p>
        ) : null}

        <Link href={href} variant="unstyled" className="article-card__cta">
          Read article
        </Link>
      </div>
    </article>
  );
}
