import React from "react";
import { Container } from "../ui/Container";
import { Stack } from "../ui/Stack";

type SectionShellProps = {
  anchorId?: string;
  children: React.ReactNode;
};

export function SectionShell({ anchorId, children }: SectionShellProps) {
  return (
    <section id={anchorId} style={{ padding: "var(--space-8) 0" }}>
      <Container>
        <Stack gap="var(--space-4)">{children}</Stack>
      </Container>
    </section>
  );
}
