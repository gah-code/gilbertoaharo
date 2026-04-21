import React from "react";
import { getContentSource } from "@/content/source";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { FooterSection } from "@/components/sections/FooterSection";
import { PageShell } from "@/components/layout/PageShell";
import type { LandingPageData, SectionEntry, SectionFooter } from "@/content/contentful/types";
import { getErrorMessage } from "@/lib/errors";

type LandingState =
  | { loading: true; error?: undefined; data?: undefined }
  | { loading: false; error?: string; data?: LandingPageData };

function isFooterSection(section: SectionEntry): section is SectionFooter {
  return section.sys.contentType.sys.id === "sectionFooter";
}

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
  const footer =
    state.data.footer ??
    state.data.sections.find((section): section is SectionFooter =>
      isFooterSection(section),
    );

  return (
    <PageShell
      title={state.data.metaTitle}
      description={state.data.metaDescription}
      footer={footer ? <FooterSection section={footer} /> : null}
    >
      {contentSections.map((section) => (
        <SectionRenderer key={section.sys.id} section={section} />
      ))}
    </PageShell>
  );
}
