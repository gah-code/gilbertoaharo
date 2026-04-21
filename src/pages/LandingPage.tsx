import React from "react";
import { getContentSource } from "@/content/source";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { PageShell } from "@/components/layout/PageShell";
import type { LandingPageData } from "@/content/contentful/types";
import { getErrorMessage } from "@/lib/errors";

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
          error: getErrorMessage(err),
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

  const contentSections = state.data.sections.filter(
    (section) => section.sys.contentType.sys.id !== "sectionFooter",
  );
  return (
    <PageShell title={state.data.metaTitle} description={state.data.metaDescription}>
      {contentSections.map((section) => (
        <SectionRenderer key={section.sys.id} section={section} />
      ))}
    </PageShell>
  );
}
