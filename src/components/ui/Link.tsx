import React from "react";
import { handleLinkClick, isInternalHref } from "@/router/link";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function Link({
  href,
  onClick,
  children,
  target,
  rel,
  ...rest
}: LinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
      target={computedTarget}
      rel={computedRel}
      style={{ color: "inherit" }}
      {...rest}
    >
      {children}
    </a>
  );
}
