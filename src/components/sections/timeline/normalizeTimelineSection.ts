import type {
  SectionTimeline,
  TimelineAction,
  TimelineItem,
  TimelineMedia,
} from "@/content/contentful/types";
import type { ButtonVariant } from "@/components/ui/Button";
import timelineSearch from "@/assets/timeline/timeline-search.svg";
import timelineJourney from "@/assets/timeline/timeline-journey.svg";
import timelineCreative from "@/assets/timeline/timeline-creative.svg";

export type NormalizedTimelineAction = {
  label: string;
  href: string;
  variant: ButtonVariant;
  openInNewTab: boolean;
  ariaLabel?: string;
};

export type NormalizedTimelineItem = {
  id: string;
  kind: string;
  title: string;
  organizationLine?: string;
  context?: string;
  dateRange?: string;
  summary?: string;
  highlights: string[];
  tags: string[];
  mediaSrc?: string;
  mediaAlt: string;
  flip: boolean;
  action?: NormalizedTimelineAction;
};

export type NormalizedTimelineSection = {
  anchorId: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: NormalizedTimelineItem[];
};

const timelineFallbackMedia = [
  { src: timelineSearch, alt: "Search and discovery illustration" },
  { src: timelineJourney, alt: "Journey path illustration" },
  { src: timelineCreative, alt: "Creative technology illustration" },
];

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value?: string | null) {
  const parsed = parseDate(value);
  if (!parsed) return value ?? "";
  return parsed.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function getTimelineDateRange(item: TimelineItem) {
  const startRaw = item.fields.startDateValue ?? item.fields.startDate;
  const endRaw =
    item.fields.isCurrent === true
      ? "Present"
      : item.fields.endDateValue ?? item.fields.endDate;

  const start = formatDate(startRaw);
  const end = formatDate(endRaw);

  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return undefined;
}

function resolveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function resolveMedia(media?: TimelineMedia) {
  if (!media) {
    return undefined;
  }

  if ("fields" in media) {
    const src = resolveAssetUrl(media.fields.file?.url);
    return src ? { src, alt: media.fields.title } : undefined;
  }

  if (media.src) {
    return { src: media.src, alt: media.alt };
  }

  return undefined;
}

function resolveAction(
  action?: TimelineAction,
  legacy?: { label?: string; href?: string },
): NormalizedTimelineAction | undefined {
  if (action && "fields" in action) {
    const fields = action.fields;
    return {
      label: fields.label,
      href: fields.href,
      variant: fields.variant ?? "text",
      openInNewTab: fields.openInNewTab ?? false,
      ariaLabel: fields.ariaLabel,
    };
  }

  if (action && "label" in action && "href" in action) {
    return {
      label: action.label,
      href: action.href,
      variant: action.variant ?? "text",
      openInNewTab: action.openInNewTab ?? false,
      ariaLabel: action.ariaLabel,
    };
  }

  if (legacy?.label && legacy.href) {
    return {
      label: legacy.label,
      href: legacy.href,
      variant: "text",
      openInNewTab: false,
    };
  }

  return undefined;
}

export function normalizeTimelineSection(
  section: SectionTimeline,
): NormalizedTimelineSection {
  const fields = section.fields;

  const items = (fields.items ?? []).map((item, index) => {
    const fallback = timelineFallbackMedia[index % timelineFallbackMedia.length];
    const media =
      resolveMedia(item.fields.media ?? item.fields.mediaImage) ??
      (fallback ? { src: fallback.src, alt: fallback.alt } : undefined);

    const organizationLine = [item.fields.organization, item.fields.location]
      .filter(Boolean)
      .join(" · ");

    return {
      id: item.sys.id || `${item.fields.title}-${index}`,
      kind: item.fields.kind,
      title: item.fields.title,
      organizationLine: organizationLine || undefined,
      context: item.fields.context ?? undefined,
      dateRange: getTimelineDateRange(item),
      summary: item.fields.summary ?? undefined,
      highlights: item.fields.highlights ?? [],
      tags: item.fields.tags ?? [],
      mediaSrc: media?.src,
      mediaAlt:
        item.fields.mediaAlt ??
        media?.alt ??
        item.fields.mediaImage?.fields.title ??
        fallback?.alt ??
        item.fields.title,
      flip: Boolean(media?.src) && index % 2 === 1,
      action: resolveAction(item.fields.action, {
        label: item.fields.ctaLabel,
        href: item.fields.ctaHref,
      }),
    };
  });

  return {
    anchorId: fields.anchorId || section.sys.id,
    eyebrow: fields.eyebrow ?? undefined,
    title: fields.title,
    intro: fields.intro ?? undefined,
    items,
  };
}
