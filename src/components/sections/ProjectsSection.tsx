import React from "react";
import type { SectionProjects } from "@/content/contentful/types";
import { resolveProjectLink } from "@/content/contentful/adapters";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function ProjectsSection({ section }: { section: SectionProjects }) {
  const projects = section.fields;

  return (
    <SectionShell anchorId={projects.anchorId}>
      <Heading level={2}>{projects.title}</Heading>
      <Stack gap="var(--space-4)">
        {projects.projects.map((project) => {
          const links = (project.fields.links ?? []).map(resolveProjectLink);
          return (
            <Card key={project.sys.id}>
              <Stack gap="var(--space-3)">
                <Heading level={3}>{project.fields.name}</Heading>
                {project.fields.tagline ? (
                  <Text muted>{project.fields.tagline}</Text>
                ) : null}
                {project.fields.summary ? (
                  <Text>{project.fields.summary}</Text>
                ) : null}
                {project.fields.techStack?.length ? (
                  <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                    {project.fields.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                ) : null}
                {links.length ? (
                  <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                    {links.map((link) => (
                      <Button key={link.href} href={link.href}>
                        {link.label}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </SectionShell>
  );
}
