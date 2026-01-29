import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ children, style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "var(--space-1) var(--space-3)",
        borderRadius: "var(--radius-pill)",
        background: "var(--color-surface-2)",
        color: "var(--color-text)",
        fontSize: "12px",
        letterSpacing: "0.02em",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
