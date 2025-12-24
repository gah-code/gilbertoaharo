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
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid #222",
  background: "#111",
  color: "#fff",
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
