import React from "react";
import { getContentSource } from "@/content/source";
import type { NavigationMenuData } from "@/content/contentful/types";
import { getErrorMessage } from "@/lib/errors";
import { Container } from "../ui/Container";
import { Link } from "../ui/Link";
import { ResponsiveNav } from "../navigation/ResponsiveNav";

type NavState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data?: NavigationMenuData };

function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function Header() {
  const [state, setState] = React.useState<NavState>({ loading: true });
  const [currentPath, setCurrentPath] = React.useState(() =>
    typeof window === "undefined"
      ? "/"
      : normalizePathname(window.location.pathname),
  );

  React.useEffect(() => {
    const source = getContentSource();
    let cancelled = false;

    source
      .getNavigationMenu()
      .then((data) => {
        if (!cancelled) {
          setState({ loading: false, data });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            loading: false,
            error: getErrorMessage(err),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const brandLabel = state.data?.brandLabel ?? "Home";
  const brandHref = state.data?.brandHref ?? "/";
  const brandIsCurrentPage = currentPath === "/";

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Container className="site-header__inner">
        <Link
          href={brandHref}
          className={`site-brand ${brandIsCurrentPage ? "is-active" : ""}`}
          variant="unstyled"
          aria-current={brandIsCurrentPage ? "page" : undefined}
        >
          <span className="site-brand__dot" aria-hidden="true" />
          <span className="site-brand__label">{brandLabel}</span>
        </Link>
        {state.data ? (
          <ResponsiveNav menu={state.data} />
        ) : (
          <div
            className="nav-placeholder"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.loading ? "Loading navigation…" : "Navigation unavailable"}
            {state.error ? (
              <span className="nav-placeholder__error"> ({state.error})</span>
            ) : null}
          </div>
        )}
      </Container>
    </header>
  );
}
