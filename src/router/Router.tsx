import React from "react";
import { parsePathname } from "@/router/routes";

import { LandingPage } from "@/pages/LandingPage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { ArticlePage } from "@/pages/ArticlePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { DebugPage } from "@/pages/DebugPage";

export function Router() {
  const [path, setPath] = React.useState(() => window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const route = parsePathname(path);

  switch (route.name) {
    case "landing":
      return <LandingPage />;

    case "articles":
      return <ArticlesPage />;

    case "debug":
      return <DebugPage />;

    case "article":
      return <ArticlePage slug={route.slug} />;

    default:
      return <NotFoundPage />;
  }
}
