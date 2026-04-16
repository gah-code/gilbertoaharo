import React from "react";
import type { SectionSkills } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Stack } from "../ui/Stack";
import { Grid } from "../ui/Grid";
import { Inline } from "../ui/Inline";
import { Badge } from "../ui/Badge";
import { Text } from "../ui/Text";
import { normalizeSkillsSection } from "./skills/normalizeSkillsSection";
import "./SkillsSection.css";

export function SkillsSection({ section }: { section: SectionSkills }) {
  const skills = normalizeSkillsSection(section);

  return (
    <SectionShell anchorId={skills.anchorId} className="section-skills">
      <Stack gap="var(--space-6)">
        <Heading level={2}>{skills.title}</Heading>
        <Grid className="skills-grid" columns="auto-fit" minItemWidth="280" gap="6">
          {skills.groups.map((group) => (
            <Stack key={group.id} className="skills-group" gap="var(--space-3)">
              <Text as="div" className="skills-group__label" size="sm" weight="semibold">
                {group.label}
              </Text>
              <Stack className="skills-group__rows" gap="0">
                {group.skills.map((skill, index) => {
                  const divider = index < group.skills.length - 1;

                  return (
                    <div
                      key={skill.id}
                      className={`skills-item${divider ? " skills-item--divider" : ""}`}
                    >
                      <Inline className="skills-item__header" justify="between" align="center" gap="3">
                        <Text as="div" className="skills-item__name" weight="semibold">
                          {skill.name}
                        </Text>
                        {skill.levelLabel ? (
                          <Badge className="skills-item__level" size="sm" tone="default">
                            {skill.levelLabel}
                          </Badge>
                        ) : null}
                      </Inline>
                      {skill.keywords.length ? (
                        <Text className="skills-item__keywords" size="sm" tone="muted">
                          {skill.keywords.join(" / ")}
                        </Text>
                      ) : null}
                    </div>
                  );
                })}
              </Stack>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </SectionShell>
  );
}
