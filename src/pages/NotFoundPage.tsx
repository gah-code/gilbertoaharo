import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/components/ui/Link";
import { buildCanonicalUrl } from "@/lib/seo";

const notFoundRouteSeo = {
  title: "Page not found | Gilberto Haro",
  description:
    "The requested page is unavailable. Return to the homepage to continue browsing.",
  canonicalUrl: buildCanonicalUrl("/404"),
};

export function NotFoundPage() {
  return (
    <PageShell
      title={notFoundRouteSeo.title}
      description={notFoundRouteSeo.description}
      canonicalUrl={notFoundRouteSeo.canonicalUrl}
    >
      <h1>Page not found</h1>
      <p>We couldn&apos;t find that page.</p>
      <p>Try one of these destinations:</p>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/#projects">Projects</Link>
        </li>
      </ul>
    </PageShell>
  );
}
