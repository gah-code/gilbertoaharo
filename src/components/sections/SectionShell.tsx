import React from "react";
import { Container } from "../ui/Container";
import { Stack } from "../ui/Stack";

type SectionShellProps = {
  anchorId?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export function SectionShell({
  anchorId,
  children,
  style,
  className,
}: SectionShellProps) {
  const sectionClass = className ? `section ${className}` : "section";

  return (
    <section id={anchorId} className={sectionClass} style={style}>
      <Container>
        <Stack gap="var(--stack-gap)">{children}</Stack>
      </Container>
    </section>
  );
}
