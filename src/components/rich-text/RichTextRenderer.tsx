import React from "react";

type RichTextMark = { type: string };

type RichTextNode = {
  nodeType?: string;
  content?: RichTextNode[];
  marks?: RichTextMark[];
  value?: string;
  data?: Record<string, unknown>;
};

type AssetLike = {
  fields?: {
    file?: {
      url?: string;
      fileName?: string;
      contentType?: string;
      details?: {
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
    title?: string;
    description?: string;
  };
};

function asNode(value: unknown): RichTextNode | null {
  if (typeof value !== "object" || value === null) return null;
  return value as RichTextNode;
}

function nodeChildren(node: RichTextNode): RichTextNode[] {
  return Array.isArray(node.content) ? node.content : [];
}

function resolveAssetUrl(url?: string | null) {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function parsePositiveDimension(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : undefined;
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

function isImageAsset(contentType?: string, url?: string): boolean {
  if (contentType) return contentType.startsWith("image/");
  return /\.(avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(url ?? "");
}

function renderChildren(node: RichTextNode, key: string | number): React.ReactNode[] {
  return nodeChildren(node).map((child, i) =>
    renderNode(child, `${key}-${i}`),
  );
}

function renderLink(
  key: string | number,
  href: string | undefined,
  children: React.ReactNode,
) {
  const resolvedHref = href?.trim();
  if (!resolvedHref) return <React.Fragment key={key}>{children}</React.Fragment>;

  const isExternal = isExternalHref(resolvedHref);
  return (
    <a
      key={key}
      href={resolvedHref}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  );
}

function applyMarks(text: string, marks: RichTextMark[]) {
  return marks.reduce<React.ReactNode>((value, mark, idx) => {
    switch (mark.type) {
      case "bold":
        return <strong key={idx}>{value}</strong>;
      case "italic":
        return <em key={idx}>{value}</em>;
      case "underline":
        return <u key={idx}>{value}</u>;
      case "code":
        return <code key={idx}>{value}</code>;
      default:
        return value;
    }
  }, text);
}

function renderAsset(
  node: RichTextNode,
  key: string | number,
  inline = false,
) {
  const asset = asNode(node.data?.target) as AssetLike | null;
  const file = asset?.fields?.file;
  const url = resolveAssetUrl(file?.url);
  if (!url) return null;

  const title = asset?.fields?.title;
  const description = asset?.fields?.description;
  const alt = description || title || file?.fileName || "Embedded media";
  const width = parsePositiveDimension(file?.details?.image?.width);
  const height = parsePositiveDimension(file?.details?.image?.height);
  const isImage = isImageAsset(file?.contentType, url);

  if (!isImage) {
    const label = title || file?.fileName || "Open embedded asset";

    if (inline) {
      return (
        <span key={key} className="embedded-asset embedded-asset--inline embedded-asset--file">
          {renderLink(`${key}-link`, url, label)}
        </span>
      );
    }

    return (
      <figure key={key} className="embedded-asset embedded-asset--file">
        {renderLink(`${key}-link`, url, label)}
        {description && <figcaption>{description}</figcaption>}
      </figure>
    );
  }

  if (inline) {
    return (
      <span key={key} className="embedded-asset embedded-asset--inline">
        <img
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
        />
      </span>
    );
  }

  return (
    <figure key={key} className="embedded-asset">
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
      {(description || title) && <figcaption>{description ?? title}</figcaption>}
    </figure>
  );
}

function renderNode(node: RichTextNode, key: string | number): React.ReactNode {
  if (!node) return null;
  const children = nodeChildren(node);

  switch (node.nodeType) {
    case "document":
      return children.map((child, i) => (
        <React.Fragment key={i}>{renderNode(child, i)}</React.Fragment>
      ));

    case "paragraph":
      return (
        <p key={key}>
          {renderChildren(node, key)}
        </p>
      );

    case "text": {
      const marks = Array.isArray(node.marks) ? node.marks : [];
      return applyMarks(node.value ?? "", marks);
    }

    case "heading-1":
    case "heading-2":
      return (
        <h2 key={key}>
          {renderChildren(node, key)}
        </h2>
      );
    case "heading-3":
      return (
        <h3 key={key}>
          {renderChildren(node, key)}
        </h3>
      );
    case "heading-4":
      return (
        <h4 key={key}>
          {renderChildren(node, key)}
        </h4>
      );

    case "unordered-list":
      return (
        <ul key={key}>
          {renderChildren(node, key)}
        </ul>
      );
    case "ordered-list":
      return (
        <ol key={key}>
          {renderChildren(node, key)}
        </ol>
      );
    case "list-item":
      return (
        <li key={key}>
          {renderChildren(node, key)}
        </li>
      );

    case "quote":
      return (
        <blockquote key={key}>
          {renderChildren(node, key)}
        </blockquote>
      );

    case "hr":
      return <hr key={key} />;

    case "hyperlink": {
      const href = typeof node.data?.uri === "string" ? node.data.uri : undefined;
      return renderLink(key, href, renderChildren(node, key));
    }

    case "asset-hyperlink": {
      const asset = asNode(node.data?.target) as AssetLike | null;
      return renderLink(
        key,
        resolveAssetUrl(asset?.fields?.file?.url),
        renderChildren(node, key),
      );
    }

    case "embedded-asset-block":
      return renderAsset(node, key, false);

    case "embedded-asset-inline":
      return renderAsset(node, key, true);

    case "entry-hyperlink":
    case "embedded-entry-inline":
      return <React.Fragment key={key}>{renderChildren(node, key)}</React.Fragment>;

    default:
      return null;
  }
}

export function RichTextRenderer({
  document,
  className,
}: {
  document: unknown;
  className?: string;
}) {
  const root = asNode(document);
  if (!root) return null;
  return <div className={className}>{renderNode(root, "root")}</div>;
}
