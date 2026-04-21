import React from "react";
import { SeoHead } from "./SeoHead";
import { Container } from "../ui/Container";
import { Header } from "./Header";

type PageShellProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function PageShell({
  title,
  description,
  canonicalUrl,
  children,
  footer,
}: PageShellProps) {
  return (
    <div className="page-shell">
      <SeoHead title={title} description={description} canonicalUrl={canonicalUrl} />
      <Header />
      <Container as="main" id="main-content">
        {children}
      </Container>
      {footer}
    </div>
  );
}
