import React from "react";

function isModifiedClick(event: React.MouseEvent<HTMLElement>) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  );
}

export function isInternalHref(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

export function navigate(href: string) {
  const url = new URL(href, window.location.origin);
  const target = url.pathname + (url.search || "") + (url.hash || "");

  if (
    window.location.pathname === url.pathname &&
    window.location.search === url.search &&
    window.location.hash === url.hash
  ) {
    return;
  }

  window.history.pushState({}, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function handleLinkClick(
  event: React.MouseEvent<HTMLElement>,
  href: string,
) {
  if (isModifiedClick(event)) return;
  if (!isInternalHref(href)) return;

  event.preventDefault();
  navigate(href);
}
