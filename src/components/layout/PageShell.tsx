import React from "react";
import { SeoHead } from "./SeoHead";
import { Container } from "../ui/Container";

type PageShellProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  children: React.ReactNode;
};

export function PageShell({
  title,
  description,
  canonicalUrl,
  children,
}: PageShellProps) {
  return (
    <div style={{ padding: "var(--space-6) 0" }}>
      <SeoHead title={title} description={description} canonicalUrl={canonicalUrl} />
      <Container as="main">
        {children}
      </Container>
    </div>
  );
}
