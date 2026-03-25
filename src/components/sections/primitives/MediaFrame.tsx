import React from "react";

type MediaFrameProps =
  | {
      kind: "avatar";
      src: string;
      alt?: string;
      size?: number;
    }
  | {
      kind: "image";
      src: string;
      alt?: string;
      maxWidth?: string;
    };

export function MediaFrame(props: MediaFrameProps) {
  if (props.kind === "avatar") {
    const { src, alt, size = 220 } = props;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={src}
          alt={alt ?? ""}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "var(--radius-pill)",
            objectFit: "cover",
            border: "1px solid var(--color-border-subtle)",
            background: "var(--color-surface)",
          }}
        />
      </div>
    );
  }

  const { src, alt, maxWidth = "520px" } = props;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={src}
        alt={alt ?? ""}
        style={{
          width: "100%",
          maxWidth,
          borderRadius: "var(--radius-lg)",
          objectFit: "cover",
          border: "1px solid var(--color-border-subtle)",
          background: "var(--color-surface)",
        }}
      />
    </div>
  );
}
