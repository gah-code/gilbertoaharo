import React from "react";

type Node = any;

function resolveAssetUrl(url?: string | null) {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function applyMarks(text: string, marks: Array<{ type: string }>) {
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

function renderAsset(node: Node, key: string | number, inline = false) {
  const asset = node?.data?.target;
  const file = asset?.fields?.file;
  const url = resolveAssetUrl(file?.url);
  if (!url) return null;

  const title = asset?.fields?.title;
  const description = asset?.fields?.description;
  const alt = description || title || file?.fileName || "Embedded media";

  if (inline) {
    return (
      <span key={key} className="embedded-asset embedded-asset--inline">
        <img src={url} alt={alt} loading="lazy" decoding="async" />
      </span>
    );
  }

  return (
    <figure key={key} className="embedded-asset">
      <img src={url} alt={alt} loading="lazy" decoding="async" />
      {(description || title) && <figcaption>{description ?? title}</figcaption>}
    </figure>
  );
}

function renderNode(node: Node, key: string | number): React.ReactNode {
  if (!node) return null;

  switch (node.nodeType) {
    case "document":
      return (node.content ?? []).map((n: Node, i: number) => (
        <React.Fragment key={i}>{renderNode(n, i)}</React.Fragment>
      ));

    case "paragraph":
      return (
        <p key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </p>
      );

    case "text": {
      const marks = node.marks ?? [];
      return applyMarks(node.value ?? "", marks);
    }

    case "heading-2":
      return (
        <h2 key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </h2>
      );
    case "heading-3":
      return (
        <h3 key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </h3>
      );
    case "heading-4":
      return (
        <h4 key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </h4>
      );

    case "unordered-list":
      return (
        <ul key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </ul>
      );
    case "ordered-list":
      return (
        <ol key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </ol>
      );
    case "list-item":
      return (
        <li key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </li>
      );

    case "quote":
      return (
        <blockquote key={key}>
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </blockquote>
      );

    case "hr":
      return <hr key={key} />;

    case "hyperlink": {
      const href = node.data?.uri;
      return (
        <a key={key} href={href} target="_blank" rel="noreferrer noopener">
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </a>
      );
    }

    case "embedded-asset-block":
      return renderAsset(node, key, false);

    case "embedded-asset-inline":
      return renderAsset(node, key, true);

    default:
      return null;
  }
}

export function RichTextRenderer({
  document,
  className,
}: {
  document: any;
  className?: string;
}) {
  return <div className={className}>{renderNode(document, "root")}</div>;
}
