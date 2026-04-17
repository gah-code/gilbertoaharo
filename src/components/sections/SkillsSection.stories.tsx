import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SectionSkills } from "@/content/contentful/types";
import { SkillsSection } from "./SkillsSection";
import { skillsStorySection } from "./sectionStoryFixtures";

const meta: Meta<typeof SkillsSection> = {
  title: "Sections/SkillsSection",
  component: SkillsSection,
  tags: ["autodocs"],
  args: {
    section: skillsStorySection,
  },
};

export default meta;
type Story = StoryObj<typeof SkillsSection>;

export const Default: Story = {};
export const EditorialSplitList: Story = {};

const sparseSkillsSection: SectionSkills = {
  ...skillsStorySection,
  sys: { ...skillsStorySection.sys, id: "skills-story-sparse" },
  fields: {
    anchorId: "skills",
    title: "Skills (Migration Compatibility)",
    groups: [
      {
        sys: {
          id: "group-sparse",
          contentType: { sys: { id: "skillGroup" } },
        },
        fields: {
          label: "Platform",
          skills: [
            {
              sys: {
                id: "skill-sparse-1",
                contentType: { sys: { id: "skill" } },
              },
              fields: {
                name: "Performance Optimization",
                level: "working",
              },
            },
            {
              sys: {
                id: "skill-sparse-2",
                contentType: { sys: { id: "skill" } },
              },
              fields: {
                name: "Accessibility Audits",
              },
            },
          ],
        },
      },
    ],
  },
};

export const MigrationCompatibility: Story = {
  args: {
    section: sparseSkillsSection,
  },
};
