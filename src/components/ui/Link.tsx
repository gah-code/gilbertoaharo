import React from "react";
import { handleLinkClick, isInternalHref } from "@/router/link";
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

  const isInternal = isInternalHref(href);
  const computedTarget = target ?? (isInternal ? undefined : "_blank");
  const computedRel =
    rel ??
    (!isInternal && computedTarget === "_blank" ? "noreferrer" : undefined);

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
