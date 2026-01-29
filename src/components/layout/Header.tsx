import React from "react";
import { getContentSource } from "@/content/source";
import type { NavigationMenuData } from "@/content/contentful/types";
import { Container } from "../ui/Container";
import { Link } from "../ui/Link";
import { ResponsiveNav } from "../navigation/ResponsiveNav";

type NavState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data?: NavigationMenuData };

export function Header() {
  const [state, setState] = React.useState<NavState>({ loading: true });

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
            error: String((err as any)?.message ?? err),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const brandLabel = state.data?.brandLabel ?? "Home";
  const brandHref = state.data?.brandHref ?? "/";

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Container className="site-header__inner">
        <Link href={brandHref} className="site-brand">
          <span className="site-brand__dot" aria-hidden="true" />
          <span className="site-brand__label">{brandLabel}</span>
        </Link>
        {state.data ? (
          <ResponsiveNav menu={state.data} />
        ) : (
          <div className="nav-placeholder" aria-live="polite">
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
