import React from "react";
import { getContentSource } from "@/content/source";
import type { SectionFooter } from "@/content/contentful/types";
import { FooterSection } from "../sections/FooterSection";

type FooterState =
  | { loading: true; data?: undefined; error?: undefined }
  | { loading: false; data: SectionFooter | null; error?: undefined }
  | { loading: false; data: null; error: true };

export function Footer() {
  const [state, setState] = React.useState<FooterState>({
    loading: true,
  });

  React.useEffect(() => {
    const source = getContentSource();
    let cancelled = false;

    source
      .getFooter()
      .then((data) => {
        if (!cancelled) {
          setState({
            loading: false,
            data,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            loading: false,
            data: null,
            error: true,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.loading || state.error || !state.data) return null;

  return <FooterSection section={state.data} />;
}
