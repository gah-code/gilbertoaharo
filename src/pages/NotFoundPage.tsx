import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/components/ui/Link";

export function NotFoundPage() {
  return (
    <PageShell title="Not found">
      <h1>Page not found</h1>
      <p>We couldn&apos;t find that page.</p>
      <p>
        <Link href="/">Go home</Link>
      </p>
    </PageShell>
  );
}
