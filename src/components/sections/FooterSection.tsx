import React from "react";
import type { SectionFooter } from "@/content/contentful/types";
import { Link } from "../ui/Link";
import { getAriaLabelWithVisibleText } from "../ui/accessibleName";
import { SectionShell } from "./SectionShell";
import { normalizeFooterSection } from "./footer/normalizeFooterSection";
import { FooterLinkIcon } from "./footer/FooterLinkIcon";
import "./FooterSection.css";

const EXTERNAL_REL = "noreferrer noopener";

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function resolveInternalPathname(href: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    return normalizePathname(url.pathname);
  } catch {
    return null;
  }
}

function isRouteActive(href: string, currentPath: string): boolean {
  const targetPath = resolveInternalPathname(href);
  if (!targetPath) return false;
  if (targetPath === "/") return currentPath === "/";
  if (currentPath === targetPath) return true;
  return currentPath.startsWith(`${targetPath}/`);
}

export function FooterSection({ section }: { section: SectionFooter }) {
  const model = normalizeFooterSection(section);
  const navigationGroups = model.navigationGroups.filter(
    (group) => group.links.length > 0,
  );
  const [currentPath, setCurrentPath] = React.useState(() =>
    typeof window === "undefined"
      ? "/"
      : normalizePathname(window.location.pathname),
  );

  React.useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <footer className="footer-section" aria-labelledby="footer-title">
      <SectionShell className="footer-section__inner">
        <div className="footer-section__top">
          <div className="footer-section__brand">
            <h2 id="footer-title" className="footer-section__title">
              <span>{model.brandTitle}</span>
              <span className="footer-section__title-dot" aria-hidden="true" />
            </h2>

            {model.brandSubtitle ? (
              <p className="footer-section__subtitle">{model.brandSubtitle}</p>
            ) : null}

            {model.summary ? (
              <p className="footer-section__summary">{model.summary}</p>
            ) : null}

            {model.socialLinks.length > 0 ? (
              <div className="footer-section__social">
                {model.socialLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    aria-label={getAriaLabelWithVisibleText(
                      link.label,
                      link.ariaLabel,
                    )}
                    target={link.openInNewTab ? "_blank" : "_self"}
                    rel={link.openInNewTab ? EXTERNAL_REL : undefined}
                    variant="unstyled"
                    className="footer-section__social-link"
                  >
                    <FooterLinkIcon
                      iconKey={link.iconKey}
                      className="footer-section__social-icon"
                      decorative
                    />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {navigationGroups.length > 0 ? (
            <div className="footer-section__nav">
              {navigationGroups.map((group) => (
                <nav
                  key={group.key}
                  className="footer-section__nav-group"
                  aria-label={group.label}
                >
                  <ul className="footer-section__nav-list">
                    {group.links.map((link) => {
                      const isActive = isRouteActive(link.href, currentPath);
                      return (
                        <li key={link.key}>
                          <Link
                            href={link.href}
                            aria-label={getAriaLabelWithVisibleText(
                              link.label,
                              link.ariaLabel,
                            )}
                            aria-current={isActive ? "page" : undefined}
                            target={link.openInNewTab ? "_blank" : "_self"}
                            rel={link.openInNewTab ? EXTERNAL_REL : undefined}
                            variant="unstyled"
                            className={`footer-section__nav-link ${isActive ? "is-active" : ""}`}
                          >
                            <span>{link.label}</span>
                            <FooterLinkIcon
                              iconKey={link.iconKey === "arrow" ? "arrow" : undefined}
                              className="footer-section__nav-icon"
                              decorative
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ))}
            </div>
          ) : null}
        </div>

        {model.legalText || model.builtWithText ? (
          <div className="footer-section__bottom">
            {model.legalText ? (
              <p className="footer-section__legal">{model.legalText}</p>
            ) : null}

            {model.builtWithText ? (
              <p className="footer-section__meta">{model.builtWithText}</p>
            ) : null}
          </div>
        ) : null}
      </SectionShell>
    </footer>
  );
}
