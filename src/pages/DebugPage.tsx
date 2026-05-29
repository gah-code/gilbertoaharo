import React from "react";
import { contentful } from "@/content/contentful/client";
import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/components/ui/Link";
import { getErrorMessage } from "@/lib/errors";
import { buildCanonicalUrl } from "@/lib/seo";

type Summary = { type: string; total: number; sampleIds: string[] };

const debugRouteSeo = {
  title: "Contentful Debug | Gilberto Haro",
  description: "Developer validation route for Contentful model and content health.",
  canonicalUrl: buildCanonicalUrl("/debug"),
};

const debugRobots = {
  index: false,
  follow: false,
};

async function summarize(type: string): Promise<Summary> {
  const res = await contentful.getEntries({
    content_type: type,
    limit: 3,
    include: 0,
  });
  return {
    type,
    total: res.total,
    sampleIds: res.items
      .map((item) => item.sys?.id)
      .filter((id): id is string => typeof id === "string"),
  };
}

export function DebugPage() {
  const [rows, setRows] = React.useState<Summary[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const types = [
      "pagePersonalLanding",
      "sectionHero",
      "sectionTimeline",
      "timelineItem",
      "sectionSkills",
      "skillGroup",
      "skill",
      "sectionProjects",
      "project",
      "projectLink",
      "sectionLearning",
      "learningItem",
      "sectionContact",
      "sectionFooter",
      "footerLinkGroup",
      "footerLink",
      "socialLink",
      "personProfile",
      "article",
    ];

    Promise.all(types.map(summarize))
      .then(setRows)
      .catch((e) => setErr(getErrorMessage(e)));
  }, []);

  if (err) {
    return (
      <PageShell
        title={debugRouteSeo.title}
        description={debugRouteSeo.description}
        canonicalUrl={debugRouteSeo.canonicalUrl}
        robots={debugRobots}
      >
        <h1>Contentful Debug</h1>
        <p>
          <Link href="/">Home</Link> · <Link href="/articles">Articles</Link>
        </p>
        <p role="alert">Error: {err}</p>
      </PageShell>
    );
  }

  if (!rows) {
    return (
      <PageShell
        title={debugRouteSeo.title}
        description={debugRouteSeo.description}
        canonicalUrl={debugRouteSeo.canonicalUrl}
        robots={debugRobots}
      >
        <h1>Contentful Debug</h1>
        <p>
          <Link href="/">Home</Link> · <Link href="/articles">Articles</Link>
        </p>
        <p role="status" aria-live="polite">
          Loading model summary…
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={debugRouteSeo.title}
      description={debugRouteSeo.description}
      canonicalUrl={debugRouteSeo.canonicalUrl}
      robots={debugRobots}
    >
      <div style={{ padding: 16 }}>
        <h1>Contentful Debug</h1>
        <p>
          <Link href="/">Home</Link> · <Link href="/articles">Articles</Link>
        </p>
        <p>Counts + sample IDs for each content type.</p>
        <ul>
          {rows.map((r) => (
            <li key={r.type}>
              <strong>{r.type}</strong>: {r.total}{" "}
              {r.sampleIds.length ? (
                <em>(sample: {r.sampleIds.join(", ")})</em>
              ) : (
                <em>(none)</em>
              )}
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
