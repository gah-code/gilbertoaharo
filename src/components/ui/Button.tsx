import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { Link } from "./Link";

type BaseProps = { children: ReactNode };

type ButtonAsButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return "href" in props && typeof props.href === "string" && props.href.length > 0;
}

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

export function Button(props: ButtonProps) {
  if (isLinkProps(props)) {
    const { href, children, style, ...rest } = props;
    return (
      <Link href={href} style={{ ...baseStyle, ...style }} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, style, type, ...rest } = props;
  return (
    <button
      type={type ?? "button"}
      style={{ ...baseStyle, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
