import type { ArticleListItem } from "@/content/contentful/types";
import { Link } from "@/components/ui/Link";
import { buildArticlePath } from "@/router/routes";
import {
  buildContentfulImageUrl,
  buildContentfulSrcSet,
  normalizeImageUrl,
} from "@/lib/images/contentfulImage";
import "./ArticleCard.css";

const ARTICLE_CARD_IMAGE_WIDTHS = [320, 480, 640, 800];
const ARTICLE_CARD_IMAGE_SIZES =
  "(min-width: 1120px) 320px, (min-width: 768px) 33vw, 100vw";

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
  const imageUrl = normalizeImageUrl(article.heroImageUrl);
  const imageSrc = imageUrl
    ? buildContentfulImageUrl(imageUrl, {
        width: 800,
        quality: 75,
        format: "webp",
      })
    : undefined;
  const imageSrcSet = imageUrl
    ? buildContentfulSrcSet(imageUrl, ARTICLE_CARD_IMAGE_WIDTHS, {
        quality: 75,
        format: "webp",
      })
    : undefined;
  const imageSizes = imageSrcSet ? ARTICLE_CARD_IMAGE_SIZES : undefined;
  const publishedLabel = formatDate(article.publishedAt);
  const updatedLabel = formatDate(article.updatedAt);
  const dateLabel = publishedLabel ?? updatedLabel;
  const datePrefix = publishedLabel ? "Published" : "Updated";
  const dateTime = publishedLabel ? article.publishedAt : article.updatedAt;
  const hasMeta = Boolean(article.authorName || dateLabel);

  return (
    <article className="article-card">
      {imageSrc ? (
        <Link
          href={href}
          className="article-card__media"
          variant="unstyled"
        >
          <img
            src={imageSrc}
            srcSet={imageSrcSet}
            sizes={imageSizes}
            alt={article.title}
            loading="lazy"
            decoding="async"
          />
        </Link>
      ) : (
        <div className="article-card__media-placeholder" aria-hidden="true">
          <span className="article-card__media-placeholder-label">No preview image</span>
        </div>
      )}

      <div className="article-card__body">
        <h2 className="article-card__title">
          <Link href={href} variant="unstyled" className="article-card__title-link">
            {article.title}
          </Link>
        </h2>

        {hasMeta ? (
          <div className="article-card__meta" aria-label="Article metadata">
            {article.authorName ? (
              <span className="article-card__meta-item article-card__author">
                By {article.authorName}
              </span>
            ) : null}
            {dateLabel ? (
              <time className="article-card__meta-item" dateTime={dateTime}>
                {datePrefix} {dateLabel}
              </time>
            ) : null}
          </div>
        ) : null}

        {article.excerpt ? (
          <p className="article-card__excerpt">{article.excerpt}</p>
        ) : null}

        <Link
          href={href}
          variant="unstyled"
          className="article-card__cta"
          aria-label={`Read article: ${article.title}`}
        >
          Read article
        </Link>
      </div>
    </article>
  );
}
