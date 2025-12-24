import React from "react";
import { parsePathname, RouteMatch } from "./routes";
import { LandingPage } from "@/pages/LandingPage";
import { ArticlePage } from "@/pages/ArticlePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function Router() {
  const [path, setPath] = React.useState(() => window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const match: RouteMatch = React.useMemo(
    () => parsePathname(path),
    [path],
  );

  switch (match.name) {
    case "landing":
      return <LandingPage />;
    case "article":
      return <ArticlePage slug={match.slug} />;
    default:
      return <NotFoundPage />;
  }
}
