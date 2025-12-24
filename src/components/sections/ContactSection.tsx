import React from "react";
import type { SectionContact } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Link } from "../ui/Link";

export function ContactSection({ section }: { section: SectionContact }) {
  const contact = section.fields;

  return (
    <SectionShell anchorId={contact.anchorId}>
      <Heading level={2}>{contact.title}</Heading>
      {contact.intro ? <Text>{contact.intro}</Text> : null}
      <Stack gap="var(--space-2)">
        <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
        {contact.links?.length ? (
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            {contact.links.map((link) => (
              <Link key={link.sys.id} href={link.fields.url}>
                {link.fields.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Stack>
    </SectionShell>
  );
}
