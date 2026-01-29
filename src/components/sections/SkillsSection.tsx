import React from "react";
import type { SectionSkills } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Stack } from "../ui/Stack";

export function SkillsSection({ section }: { section: SectionSkills }) {
  const skills = section.fields;

  return (
    <SectionShell
      anchorId={skills.anchorId}
    >
      <Stack gap="var(--space-6)">
        <Heading level={2}>{skills.title}</Heading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {skills.groups.map((group) => (
            <div
              key={group.sys.id}
              style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
            >
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                }}
              >
                {group.fields.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {group.fields.skills.map((skill, index) => {
                  const level = skill.fields.level;
                  const levelLabel = level ? level.toUpperCase() : null;
                  const keywords = skill.fields.keywords ?? [];
                  const divider = index < group.fields.skills.length - 1;

                  return (
                    <div
                      key={skill.sys.id}
                      style={{
                        padding: "var(--space-3) 0",
                        borderBottom: divider
                          ? "1px solid var(--color-border-subtle)"
                          : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "var(--space-3)",
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{skill.fields.name}</div>
                        {levelLabel ? (
                          <span
                            style={{
                              border: "1px solid var(--color-text)",
                              borderRadius: "var(--radius-pill)",
                              padding: "var(--space-1) var(--space-3)",
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              background: "var(--color-surface-2)",
                              color: "var(--color-text)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {levelLabel}
                          </span>
                        ) : null}
                      </div>
                      {keywords.length ? (
                        <div
                          style={{
                            marginTop: "var(--space-1)",
                            fontSize: "13px",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {keywords.join(" / ")}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Stack>
    </SectionShell>
  );
}
