import React from "react";
import { handleLinkClick } from "@/router/link";
import { classNames } from "./classNames";
import "./Link.css";

export type LinkVariant = "default" | "muted" | "unstyled";
export type LinkSize = "sm" | "md" | "lg";

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "style"> & {
  href: string;
  variant?: LinkVariant;
  size?: LinkSize;
  disabled?: boolean;
};

function mergeRelForTarget(rel: string | undefined, target: string | undefined) {
  const tokens = new Set(rel?.split(/\s+/).filter(Boolean));

  if (target === "_blank") {
    tokens.add("noreferrer");
    tokens.add("noopener");
  }

  return tokens.size ? Array.from(tokens).join(" ") : undefined;
}

function shouldOpenInNewTabByDefault(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    const isWebUrl = url.protocol === "http:" || url.protocol === "https:";
    return isWebUrl && url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function Link({
  href,
  onClick,
  children,
  className,
  variant = "default",
  size = "md",
  disabled = false,
  tabIndex,
  target,
  rel,
  ...rest
}: LinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
    if (event.defaultPrevented) return;
    handleLinkClick(event, href);
  };

  const computedTarget =
    target ?? (shouldOpenInNewTabByDefault(href) ? "_blank" : undefined);
  const computedRel = mergeRelForTarget(rel, computedTarget);

  return (
    <a
      href={href}
      onClick={handleClick}
      className={classNames([
        "ui-link",
        `ui-link--${variant}`,
        `ui-link--${size}`,
        disabled && "is-disabled",
        className,
      ])}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      target={computedTarget}
      rel={computedRel}
      {...rest}
    >
      {children}
    </a>
  );
}
