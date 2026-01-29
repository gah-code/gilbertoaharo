import React from "react";
import { Link } from "./Link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
};

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  padding: "var(--space-3) var(--space-4)",
  borderRadius: "var(--radius-pill)",
  border: "1px solid var(--color-accent)",
  background: "var(--color-accent)",
  color: "var(--color-surface)",
  cursor: "pointer",
  textDecoration: "none",
};

export function Button({ href, children, style, ...rest }: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        style={{ ...baseStyle, ...style }}
        {...(rest as any)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" style={{ ...baseStyle, ...style }} {...rest}>
      {children}
    </button>
  );
}
