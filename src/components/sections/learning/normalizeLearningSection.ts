import type {
  LearningItem,
  LearningStatus,
  SectionLearning,
} from "@/content/contentful/types";

export type NormalizedLearningStatusLabel = "Exploring" | "Practicing" | "Shipping";

export type NormalizedLearningAction = {
  href: string;
  label: string;
};

export type NormalizedLearningItem = {
  id: string;
  key: string;
  topic: string;
  description?: string;
  status: LearningStatus;
  statusLabel: NormalizedLearningStatusLabel;
  focusAreas: string[];
  action?: NormalizedLearningAction;
  roadmapIndex: number;
  isLast: boolean;
};

export type NormalizedLearningSection = {
  id: string;
  internalName?: string;
  anchorId: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: NormalizedLearningItem[];
};

const LEARNING_STATUS_LABELS: Record<LearningStatus, NormalizedLearningStatusLabel> = {
  exploring: "Exploring",
  practicing: "Practicing",
  shipping: "Shipping",
};

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function compactText(value?: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeStableKey(parts: Array<string | undefined>, fallback: string): string {
  const joined = parts.filter(Boolean).join("-");
  const normalized = slugify(joined);
  return normalized || fallback;
}

function normalizeStatus(status?: LearningStatus): LearningStatus {
  if (status === "shipping" || status === "practicing") return status;
  return "exploring";
}

function normalizeStringList(values?: string[]): string[] {
  return safeArray(values)
    .map((value) => value.trim())
    .filter(Boolean);
}

function normalizeAction(
  label?: string,
  href?: string,
): NormalizedLearningAction | undefined {
  const normalizedLabel = compactText(label);
  const normalizedHref = compactText(href);
  if (!normalizedLabel || !normalizedHref) return undefined;

  return {
    label: normalizedLabel,
    href: normalizedHref,
  };
}

function normalizeLearningItem(
  sectionId: string,
  item: LearningItem,
  index: number,
  totalItems: number,
): NormalizedLearningItem {
  const topic = compactText(item.fields.topic) ?? "Untitled topic";
  const keyBase = compactText(item.fields.internalName) ?? topic;
  const key = makeStableKey([sectionId, keyBase], `${sectionId}-learning-item-${index}`);
  const status = normalizeStatus(item.fields.status);

  return {
    id: compactText(item.sys.id) ?? key,
    key,
    topic,
    description: compactText(item.fields.description),
    status,
    statusLabel: LEARNING_STATUS_LABELS[status],
    focusAreas: normalizeStringList(item.fields.focusAreas),
    action: normalizeAction(item.fields.linkLabel, item.fields.linkUrl),
    roadmapIndex: index,
    isLast: index === totalItems - 1,
  };
}

export function normalizeLearningSection(
  section: SectionLearning,
): NormalizedLearningSection {
  const fields = section.fields;
  const sectionId = compactText(section.sys.id) ?? "learning-section";
  const items = safeArray(fields.items);

  return {
    id: sectionId,
    internalName: compactText(fields.internalName),
    anchorId: compactText(fields.anchorId) ?? sectionId,
    eyebrow: compactText(fields.eyebrow),
    title: compactText(fields.title) ?? "Learning",
    intro: compactText(fields.intro),
    items: items.map((item, index) =>
      normalizeLearningItem(sectionId, item, index, items.length),
    ),
  };
}
