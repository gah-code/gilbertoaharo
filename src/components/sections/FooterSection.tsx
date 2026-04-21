import React from "react";
import type { SectionFooter } from "@/content/contentful/types";
import { Link } from "../ui/Link";
import { SectionShell } from "./SectionShell";
import { normalizeFooterSection } from "./footer/normalizeFooterSection";
import { FooterLinkIcon } from "./footer/FooterLinkIcon";
import "./FooterSection.css";

const EXTERNAL_REL = "noreferrer noopener";

export function FooterSection({ section }: { section: SectionFooter }) {
  const model = normalizeFooterSection(section);
  const navigationGroups = model.navigationGroups.filter(
    (group) => group.links.length > 0,
  );

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
                    aria-label={link.ariaLabel}
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
                    {group.links.map((link) => (
                      <li key={link.key}>
                        <Link
                          href={link.href}
                          aria-label={link.ariaLabel}
                          target={link.openInNewTab ? "_blank" : "_self"}
                          rel={link.openInNewTab ? EXTERNAL_REL : undefined}
                          variant="unstyled"
                          className="footer-section__nav-link"
                        >
                          <span>{link.label}</span>
                          <FooterLinkIcon
                            iconKey={link.iconKey === "arrow" ? "arrow" : undefined}
                            className="footer-section__nav-icon"
                            decorative
                          />
                        </Link>
                      </li>
                    ))}
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
