import React from "react";
import type { SectionContact } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Link } from "../ui/Link";
import { Cluster } from "../ui/Cluster";
import { normalizeContactSection } from "./contact/normalizeContactSection";
import "./ContactSection.css";

export function ContactSection({ section }: { section: SectionContact }) {
  const contact = normalizeContactSection(section);

  return (
    <SectionShell anchorId={contact.anchorId} className="section-contact">
      <Heading level={2}>{contact.title}</Heading>
      {contact.intro ? <Text>{contact.intro}</Text> : null}
      <Stack gap="var(--space-2)">
        <Link href={contact.emailHref}>{contact.email}</Link>
        {contact.links.length ? (
          <Cluster className="contact-links" gap="3">
            {contact.links.map((link) => (
              <Link key={link.id} href={link.href}>
                {link.label}
              </Link>
            ))}
          </Cluster>
        ) : null}
      </Stack>
    </SectionShell>
  );
}
