import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, style, ...rest }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4)",
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-soft)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
