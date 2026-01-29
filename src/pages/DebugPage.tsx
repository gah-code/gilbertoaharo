import React from "react";
import { contentful } from "@/content/contentful/client";

type Summary = { type: string; total: number; sampleIds: string[] };

async function summarize(type: string): Promise<Summary> {
  const res = await contentful.getEntries({
    content_type: type,
    limit: 3,
    include: 0,
  });
  return {
    type,
    total: res.total,
    sampleIds: res.items.map((i: any) => i.sys?.id).filter(Boolean),
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
      "socialLink",
      "personProfile",
      "article",
    ];

    Promise.all(types.map(summarize))
      .then(setRows)
      .catch((e) => setErr(String(e?.message ?? e)));
  }, []);

  if (err) return <pre>Error: {err}</pre>;
  if (!rows) return <p>Loading model summary…</p>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Contentful Debug</h1>
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
  );
}
