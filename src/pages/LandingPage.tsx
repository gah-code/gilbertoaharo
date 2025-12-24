import React from "react";
import { getContentSource } from "@/content/source";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { PageShell } from "@/components/layout/PageShell";
import type { LandingPageData } from "@/content/contentful/types";

type LandingState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data?: LandingPageData };

export function LandingPage() {
  const [state, setState] = React.useState<LandingState>({ loading: true });

  React.useEffect(() => {
    const source = getContentSource();
    source
      .getLandingPage()
      .then((data) => setState({ loading: false, data }))
      .catch((err: unknown) =>
        setState({
          loading: false,
          error: String((err as any)?.message ?? err),
        }),
      );
  }, []);

  if (state.loading) {
    return (
      <PageShell>
        <p>Loading…</p>
      </PageShell>
    );
  }

  if (state.error || !state.data) {
    return (
      <PageShell>
        <p>Error: {state.error ?? "Unknown error"}</p>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={state.data.metaTitle}
      description={state.data.metaDescription}
    >
      {state.data.sections.map((section) => (
        <SectionRenderer key={section.sys.id} section={section} />
      ))}
    </PageShell>
  );
}
