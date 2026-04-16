import React from "react";
import type { SectionProjects } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Cluster } from "../ui/Cluster";
import { normalizeProjectsSection } from "./projects/normalizeProjectsSection";
import "./ProjectsSection.css";

export function ProjectsSection({ section }: { section: SectionProjects }) {
  const projects = normalizeProjectsSection(section);

  return (
    <SectionShell anchorId={projects.anchorId} className="section-projects">
      <Heading level={2}>{projects.title}</Heading>
      <Stack gap="var(--space-4)">
        {projects.projects.map((project) => {
          const links = project.links;
          return (
            <Card key={project.id} className="projects-card">
              <Stack gap="var(--space-3)">
                <Heading level={3}>{project.name}</Heading>
                {project.tagline ? (
                  <Text tone="muted">{project.tagline}</Text>
                ) : null}
                {project.summary ? <Text>{project.summary}</Text> : null}
                {project.techStack.length ? (
                  <Cluster className="projects-tech" gap="2" align="center">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} tone="muted">
                        {tech}
                      </Badge>
                    ))}
                  </Cluster>
                ) : null}
                {links.length ? (
                  <Cluster className="projects-links" gap="2" align="center">
                    {links.map((link, index) => (
                      <Button
                        key={link.href}
                        href={link.href}
                        variant={index === 0 ? "primary" : "secondary"}
                        size="sm"
                      >
                        {link.label}
                      </Button>
                    ))}
                  </Cluster>
                ) : null}
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </SectionShell>
  );
}
