import React from "react";
import type { RobotsMeta } from "@/lib/seo";
import { SeoHead } from "./SeoHead";
import { Container } from "../ui/Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

type PageShellProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: RobotsMeta;
  keywords?: string[];
  children: React.ReactNode;
};

export function PageShell({
  title,
  description,
  canonicalUrl,
  robots,
  keywords,
  children,
}: PageShellProps) {
  return (
    <div className="page-shell">
      <SeoHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        robots={robots}
        keywords={keywords}
      />
      <Header />
      <Container as="main" id="main-content">
        {children}
      </Container>
      <Footer />
    </div>
  );
}
