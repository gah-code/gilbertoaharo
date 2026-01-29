import React from "react";
import type {
  NavigationLinkData,
  NavigationMenuData,
  NavigationPanelData,
} from "@/content/contentful/types";
import { Link } from "../ui/Link";

type ResponsiveNavProps = {
  menu: NavigationMenuData;
};

function NavPanelList({
  cards,
  onNavigate,
}: {
  cards: NavigationPanelData["cards"];
  onNavigate?: () => void;
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
      {cards.map((card) => (
        <li key={card.id} className="nav-panel__card">
          <Link
            href={card.href}
            className="nav-panel__card-link"
            onClick={onNavigate}
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
      ))}
    </ul>
  );
}

function DesktopNav({
  links,
  cta,
  openPanelId,
  onTogglePanel,
  onNavigate,
}: {
  links: NavigationLinkData[];
  cta: NavigationLinkData;
  openPanelId: string | null;
  onTogglePanel: (id: string | null) => void;
  onNavigate: () => void;
}) {
  return (
    <nav aria-label="Primary" className="nav-desktop">
      <ul className="nav-list">
        {links.map((link) => {
          const isOpen = openPanelId === link.id;
          const panelId = `nav-panel-${link.id}`;

          if (link.panel) {
            return (
              <li
                key={link.id}
                className="nav-list__item"
                onMouseLeave={() => onTogglePanel(null)}
              >
                <button
                  className="nav-link nav-link--button"
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
                <div
                  id={panelId}
                  className={`nav-panel ${isOpen ? "is-open" : ""} ${link.panel.align === "left" ? "nav-panel--left" : ""}`}
                  style={
                    link.panel.widthPx
                      ? { width: `${link.panel.widthPx}px` }
                      : undefined
                  }
                  role="region"
                  aria-label={`${link.label} menu`}
                >
                  <NavPanelList cards={link.panel.cards} onNavigate={onNavigate} />
                </div>
              </li>
            );
          }

          return (
            <li key={link.id} className="nav-list__item">
              <Link
                href={link.href}
                className="nav-link"
                onClick={() => {
                  onNavigate();
                }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li className="nav-list__item nav-list__item--cta">
          <Link
            href={cta.href}
            className="nav-cta"
            onClick={onNavigate}
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
}) {
  return (
    <div className="nav-mobile">
      <button
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        onClick={() => onToggleOpen(!isOpen)}
      >
        <span className="nav-toggle__bars" aria-hidden="true" />
        <span className="nav-toggle__label">Menu</span>
      </button>
      <div
        className={`nav-drawer ${isOpen ? "is-open" : ""}`}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="nav-drawer__header">
          <Link href={brandHref} className="nav-drawer__brand" onClick={onNavigate}>
            <span className="site-brand__dot" aria-hidden="true" />
            <span className="site-brand__label">{brandLabel}</span>
          </Link>
          <div className="nav-drawer__header-actions">
            <span className="nav-drawer__title">Navigation</span>
            <button className="nav-toggle nav-toggle--close" onClick={() => onToggleOpen(false)}>
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
              const accordionId = `nav-accordion-${link.id}`;

              return (
                <li key={link.id} className="nav-drawer__item">
                  {hasAccordion ? (
                    <>
                      <button
                        className="nav-drawer__accordion-trigger"
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
                      >
                        {link.panel ? (
                          <NavPanelList
                            cards={link.panel.cards}
                            onNavigate={onNavigate}
                          />
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="nav-drawer__link"
                      onClick={onNavigate}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="nav-drawer__cta">
            <Link href={cta.href} className="nav-cta" onClick={onNavigate}>
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`nav-drawer__overlay ${isOpen ? "is-open" : ""}`}
        onClick={() => onToggleOpen(false)}
      />
    </div>
  );
}

export function ResponsiveNav({ menu }: ResponsiveNavProps) {
  const [viewportWidth, setViewportWidth] = React.useState(() =>
    typeof window === "undefined" ? menu.mobileBreakpointPx : window.innerWidth,
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

  React.useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    return () => {
      document.body.style.overflow = "";
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
        />
      )}
    </div>
  );
}
