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
  const hasGroups = skills.groups.length > 0;

  return (
    <SectionShell anchorId={skills.anchorId} className="section-skills">
      <Stack className="skills-layout" gap="var(--space-8)">
        <Stack className="skills-header" gap="var(--space-3)">
          {skills.eyebrow ? (
            <Text
              as="div"
              className="skills-eyebrow"
              tone="muted"
              size="sm"
              weight="medium"
            >
              {skills.eyebrow}
            </Text>
          ) : null}
          <Heading level={2}>{skills.title}</Heading>
          {skills.intro ? (
            <Text className="skills-intro" tone="muted">
              {skills.intro}
            </Text>
          ) : null}
        </Stack>

        {hasGroups ? (
          <Grid className="skills-grid" columns={2} gap="8" align="start">
            {skills.groups.map((group) => (
              <div key={group.key} className="skills-group">
                <Stack gap="var(--space-3)">
                  <Text
                    as="h3"
                    className="skills-group__label"
                    size="sm"
                    weight="semibold"
                    tracking="tight"
                  >
                    {group.label}
                  </Text>

                  {group.description ? (
                    <Text className="skills-group__description" tone="muted">
                      {group.description}
                    </Text>
                  ) : null}

                  {group.skills.length ? (
                    <div className="skills-group__rows">
                      {group.skills.map((skill) => (
                        <div key={skill.key} className="skills-row">
                          <Inline
                            className="skills-row__header"
                            align="center"
                            justify="between"
                            gap="2"
                          >
                            <Text
                              as="span"
                              className="skills-row__name"
                              size="sm"
                              weight="semibold"
                            >
                              {skill.name}
                            </Text>
                            <Badge className="skills-row__level" size="sm" tone="default">
                              {skill.levelLabel}
                            </Badge>
                          </Inline>

                          {skill.keywords.length ? (
                            <Text className="skills-row__keywords" size="sm" tone="muted">
                              {skill.keywords.join(" · ")}
                            </Text>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="skills-group__empty" role="status" aria-live="polite">
                      Skill details are being updated.
                    </p>
                  )}
                </Stack>
              </div>
            ))}
          </Grid>
        ) : (
          <p className="skills-empty" role="status" aria-live="polite">
            Skills content is being refreshed. Check back soon.
          </p>
        )}
      </Stack>
    </SectionShell>
  );
}
