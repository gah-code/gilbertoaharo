import type { BadgeTone } from "@/components/ui/Badge";
import type { LearningStatus, SectionLearning } from "@/content/contentful/types";

export type NormalizedLearningItem = {
  id: string;
  topic: string;
  description?: string;
  status?: LearningStatus;
  statusTone?: BadgeTone;
  linkUrl?: string;
  linkLabel?: string;
};

export type NormalizedLearningSection = {
  anchorId: string;
  title: string;
  items: NormalizedLearningItem[];
};

function statusToTone(status?: LearningStatus): BadgeTone | undefined {
  if (!status) return undefined;
  if (status === "shipping") return "success";
  if (status === "practicing") return "default";
  return "muted";
}

export function normalizeLearningSection(
  section: SectionLearning,
): NormalizedLearningSection {
  const fields = section.fields;

  return {
    anchorId: fields.anchorId || section.sys.id,
    title: fields.title,
    items: (fields.items ?? []).map((item) => ({
      id: item.sys.id,
      topic: item.fields.topic,
      description: item.fields.description ?? undefined,
      status: item.fields.status,
      statusTone: statusToTone(item.fields.status),
      linkUrl: item.fields.linkUrl ?? undefined,
      linkLabel: item.fields.linkLabel ?? undefined,
    })),
  };
}
