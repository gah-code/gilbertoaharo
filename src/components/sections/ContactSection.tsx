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
  const hasLinks = contact.links.length > 0;

  return (
    <SectionShell anchorId={contact.anchorId} className="section-contact">
      <Stack className="contact-layout" gap="var(--space-5)">
        <Stack className="contact-header" gap="var(--space-2)">
          <Heading level={2}>{contact.title}</Heading>
          {contact.intro ? <Text className="contact-intro">{contact.intro}</Text> : null}
        </Stack>
        <Stack className="contact-actions" gap="var(--space-3)">
          <Link href={contact.emailHref} className="contact-email">
            {contact.email}
          </Link>
          {hasLinks ? (
            <Cluster className="contact-links" gap="3">
              {contact.links.map((link) => (
                <Link key={link.id} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </Cluster>
          ) : (
            <p className="contact-links__empty" role="status" aria-live="polite">
              More contact links are coming soon.
            </p>
          )}
        </Stack>
      </Stack>
    </SectionShell>
  );
}
