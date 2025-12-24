import React from "react";

type Node = any;

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

    case "text":
      return node.value;

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
        <a key={key} href={href} target="_blank" rel="noreferrer">
          {(node.content ?? []).map((n: Node, i: number) =>
            renderNode(n, `${key}-${i}`),
          )}
        </a>
      );
    }

    default:
      return null;
  }
}

export function RichTextRenderer({ document }: { document: any }) {
  return <div>{renderNode(document, "root")}</div>;
}
