import React from "react";
import type {
  NavigationLinkData,
  NavigationMenuData,
  NavigationPanelData,
} from "@/content/contentful/types";
import { Link } from "../ui/Link";
import "./Navigation.css";

type ResponsiveNavProps = {
  menu: NavigationMenuData;
};

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
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

function panelContainsActiveRoute(
  cards: NavigationPanelData["cards"],
  currentPath: string,
): boolean {
  return cards.some((card) => isRouteActive(card.href, currentPath));
}

function getFocusableDrawerElements(drawer: HTMLElement): HTMLElement[] {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  return Array.from(drawer.querySelectorAll<HTMLElement>(selectors)).filter(
    (element) => {
      if (element.hasAttribute("hidden")) return false;
      if (element.closest("[hidden]")) return false;
      return true;
    },
  );
}

function NavPanelList({
  cards,
  onNavigate,
  currentPath,
}: {
  cards: NavigationPanelData["cards"];
  onNavigate?: () => void;
  currentPath: string;
}) {
  const renderIcon = (card: NavigationPanelData["cards"][number]) => {
    if (card.iconType === "asset" && card.iconUrl) {
      return <img src={card.iconUrl} alt="" />;
    }
    if ((card.iconType === "emoji" || card.iconType === "svg") && card.iconValue) {
      return card.iconValue;
    }
    return "⬜";
  };

  return (
    <ul className="nav-panel__cards">
      {cards.map((card) => {
        const isActive = isRouteActive(card.href, currentPath);
        return (
          <li key={card.id} className="nav-panel__card">
            <Link
              href={card.href}
              className={`nav-panel__card-link ${isActive ? "is-active" : ""}`}
              variant="unstyled"
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="nav-panel__card-icon" aria-hidden="true">
                {renderIcon(card)}
              </span>
              <div className="nav-panel__card-body">
                <span className="nav-panel__card-title">{card.title}</span>
                {card.description ? (
                  <span className="nav-panel__card-description">
                    {card.description}
                  </span>
                ) : null}
                {card.status === "comingSoon" ? (
                  <span className="nav-panel__pill">Coming soon</span>
                ) : card.status === "activeDefault" ? (
                  <span className="nav-panel__pill nav-panel__pill--active">
                    Featured
                  </span>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function DesktopNav({
  links,
  cta,
  openPanelId,
  onTogglePanel,
  onNavigate,
  currentPath,
}: {
  links: NavigationLinkData[];
  cta: NavigationLinkData;
  openPanelId: string | null;
  onTogglePanel: (id: string | null) => void;
  onNavigate: () => void;
  currentPath: string;
}) {
  const isCtaActive = isRouteActive(cta.href, currentPath);

  return (
    <nav aria-label="Primary" className="nav-desktop">
      <ul className="nav-list">
        {links.map((link) => {
          const isOpen = openPanelId === link.id;
          const panelId = `nav-panel-${link.id}`;
          const isActive = isRouteActive(link.href, currentPath);

          if (link.panel) {
            return (
              <li
                key={link.id}
                className="nav-list__item"
                onMouseLeave={() => onTogglePanel(null)}
              >
                <button
                  type="button"
                  className={`nav-link nav-link--button ${isActive ? "is-active" : ""}`}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => onTogglePanel(isOpen ? null : link.id)}
                  onMouseEnter={() => onTogglePanel(link.id)}
                >
                  {link.label}
                  <span aria-hidden="true" className="nav-link__caret">
                    ▾
                  </span>
                </button>
                {isOpen ? (
                  <div
                    id={panelId}
                    className={`nav-panel is-open ${link.panel.align === "left" ? "nav-panel--left" : ""}`}
                    style={
                      link.panel.widthPx
                        ? { width: `${link.panel.widthPx}px` }
                        : undefined
                    }
                    role="region"
                    aria-label={`${link.label} menu`}
                  >
                    <NavPanelList
                      cards={link.panel.cards}
                      onNavigate={onNavigate}
                      currentPath={currentPath}
                    />
                  </div>
                ) : null}
              </li>
            );
          }

          return (
            <li key={link.id} className="nav-list__item">
              <Link
                href={link.href}
                className={`nav-link ${isActive ? "is-active" : ""}`}
                variant="unstyled"
                onClick={() => {
                  onNavigate();
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li className="nav-list__item nav-list__item--cta">
          <Link
            href={cta.href}
            className={`nav-cta ${isCtaActive ? "is-active" : ""}`}
            variant="unstyled"
            onClick={onNavigate}
            aria-current={isCtaActive ? "page" : undefined}
          >
            {cta.label}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function MobileNav({
  links,
  cta,
  isOpen,
  onToggleOpen,
  openAccordions,
  toggleAccordion,
  onNavigate,
  brandLabel,
  brandHref,
  toggleButtonRef,
  currentPath,
}: {
  links: NavigationLinkData[];
  cta: NavigationLinkData;
  isOpen: boolean;
  onToggleOpen: (open: boolean) => void;
  openAccordions: Set<string>;
  toggleAccordion: (id: string) => void;
  onNavigate: () => void;
  brandLabel: string;
  brandHref: string;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
  currentPath: string;
}) {
  const brandIsActive = isRouteActive(brandHref, currentPath);
  const isCtaActive = isRouteActive(cta.href, currentPath);

  return (
    <div className="nav-mobile">
      <button
        type="button"
        ref={toggleButtonRef}
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="mobile-nav-drawer"
        onClick={() => onToggleOpen(!isOpen)}
      >
        <span className="nav-toggle__bars" aria-hidden="true" />
        <span className="nav-toggle__label">Menu</span>
      </button>
      {isOpen ? (
        <>
          <div
            className="nav-drawer is-open"
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="nav-drawer__header">
              <Link
                href={brandHref}
                className={`nav-drawer__brand ${brandIsActive ? "is-active" : ""}`}
                variant="unstyled"
                onClick={onNavigate}
                aria-current={brandIsActive ? "page" : undefined}
              >
                <span className="site-brand__dot" aria-hidden="true" />
                <span className="site-brand__label">{brandLabel}</span>
              </Link>
              <div className="nav-drawer__header-actions">
                <span className="nav-drawer__title">Navigation</span>
                <button
                  type="button"
                  className="nav-toggle nav-toggle--close"
                  onClick={() => onToggleOpen(false)}
                >
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
            </div>
            <div className="nav-drawer__body">
              <ul className="nav-drawer__list">
                {links.map((link) => {
                  const hasAccordion =
                    link.mobileBehavior === "drawerAccordion" && link.panel;
                  const isAccordionOpen =
                    hasAccordion && openAccordions.has(link.id);
                  const isActive = isRouteActive(link.href, currentPath);
                  const hasActivePanelCard =
                    hasAccordion && link.panel
                      ? panelContainsActiveRoute(link.panel.cards, currentPath)
                      : false;
                  const accordionId = `nav-accordion-${link.id}`;

                  return (
                    <li key={link.id} className="nav-drawer__item">
                      {hasAccordion ? (
                        <>
                          <button
                            type="button"
                            className={`nav-drawer__accordion-trigger ${hasActivePanelCard ? "is-active" : ""}`}
                            aria-expanded={isAccordionOpen}
                            aria-controls={accordionId}
                            onClick={() => toggleAccordion(link.id)}
                          >
                            <span>{link.label}</span>
                            <span
                              className={`nav-drawer__chevron ${isAccordionOpen ? "is-open" : ""}`}
                              aria-hidden="true"
                            >
                              ▾
                            </span>
                          </button>
                          <div
                            id={accordionId}
                            className={`nav-drawer__accordion ${isAccordionOpen ? "is-open" : ""}`}
                            hidden={!isAccordionOpen}
                          >
                            {link.panel ? (
                              <NavPanelList
                                cards={link.panel.cards}
                                onNavigate={onNavigate}
                                currentPath={currentPath}
                              />
                            ) : null}
                          </div>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          className={`nav-drawer__link ${isActive ? "is-active" : ""}`}
                          variant="unstyled"
                          onClick={onNavigate}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="nav-drawer__cta">
                <Link
                  href={cta.href}
                  className={`nav-cta ${isCtaActive ? "is-active" : ""}`}
                  variant="unstyled"
                  onClick={onNavigate}
                  aria-current={isCtaActive ? "page" : undefined}
                >
                  {cta.label}
                </Link>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="nav-drawer__overlay is-open"
            aria-label="Close navigation menu"
            onClick={() => onToggleOpen(false)}
          />
        </>
      ) : null}
    </div>
  );
}

export function ResponsiveNav({ menu }: ResponsiveNavProps) {
  const [viewportWidth, setViewportWidth] = React.useState(() =>
    typeof window === "undefined" ? menu.mobileBreakpointPx : window.innerWidth,
  );
  const [currentPath, setCurrentPath] = React.useState(() =>
    typeof window === "undefined"
      ? "/"
      : normalizePathname(window.location.pathname),
  );
  const [openPanelId, setOpenPanelId] = React.useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [openAccordions, setOpenAccordions] = React.useState<Set<string>>(() => {
    const defaults = menu.links
      .filter((link) => link.panel?.defaultOpenMobile)
      .map((link) => link.id);
    return new Set(defaults);
  });

  const navRef = React.useRef<HTMLDivElement>(null);
  const mobileToggleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const isDesktop = viewportWidth >= menu.mobileBreakpointPx;

  React.useEffect(() => {
    if (isDesktop) {
      setIsDrawerOpen(false);
    } else {
      setOpenPanelId(null);
    }
  }, [isDesktop]);

  React.useEffect(() => {
    setOpenPanelId(null);
    setIsDrawerOpen(false);
  }, [currentPath]);

  React.useEffect(() => {
    if (!openPanelId) return;
    const onClick = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setOpenPanelId(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openPanelId]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPanelId(null);
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    document.body.style.overflowX = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    };
  }, [isDrawerOpen]);

  React.useEffect(() => {
    if (isDrawerOpen) {
      const firstFocusable = navRef.current?.querySelector<HTMLElement>(
        ".nav-drawer a, .nav-drawer button",
      );
      firstFocusable?.focus();
      return;
    }

    mobileToggleRef.current?.focus();
  }, [isDrawerOpen]);

  React.useEffect(() => {
    if (!isDrawerOpen) return;

    const drawer = navRef.current?.querySelector<HTMLElement>(".nav-drawer");
    if (!drawer) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableDrawerElements(drawer);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!active || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isDrawerOpen]);

  const toggleAccordion = (id: string) =>
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const handleNavigate = () => {
    setOpenPanelId(null);
    setIsDrawerOpen(false);
  };

  return (
    <div className="nav" ref={navRef}>
      {isDesktop ? (
        <DesktopNav
          links={menu.links}
          cta={menu.cta}
          openPanelId={openPanelId}
          onTogglePanel={setOpenPanelId}
          onNavigate={handleNavigate}
          currentPath={currentPath}
        />
      ) : (
        <MobileNav
          links={menu.links}
          cta={menu.cta}
          isOpen={isDrawerOpen}
          onToggleOpen={setIsDrawerOpen}
          openAccordions={openAccordions}
          toggleAccordion={toggleAccordion}
          onNavigate={handleNavigate}
          brandLabel={menu.brandLabel}
          brandHref={menu.brandHref}
          toggleButtonRef={mobileToggleRef}
          currentPath={currentPath}
        />
      )}
    </div>
  );
}
