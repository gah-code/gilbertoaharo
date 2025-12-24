import React from "react";
import type { SectionSkills } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export function SkillsSection({ section }: { section: SectionSkills }) {
  const skills = section.fields;

  return (
    <SectionShell anchorId={skills.anchorId}>
      <Heading level={2}>{skills.title}</Heading>
      <Stack gap="var(--space-4)">
        {skills.groups.map((group) => (
          <Card key={group.sys.id}>
            <Heading level={4}>{group.fields.label}</Heading>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
              {group.fields.skills.map((skill) => (
                <Badge key={skill.sys.id}>{skill.fields.name}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </Stack>
    </SectionShell>
  );
}
