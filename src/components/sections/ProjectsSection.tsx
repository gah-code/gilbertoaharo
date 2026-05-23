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
import { Inline } from "../ui/Inline";
import { getAriaLabelWithVisibleText } from "../ui/accessibleName";
import { normalizeProjectsSection } from "./projects/normalizeProjectsSection";
import "./ProjectsSection.css";

type SliderState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const EDGE_EPSILON = 2;

function getGapPx(element: HTMLElement): number {
  const styles = window.getComputedStyle(element);
  const raw = styles.columnGap || styles.gap || "0";
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getScrollStepPx(viewport: HTMLDivElement): number {
  const track = viewport.querySelector<HTMLElement>(".projects-section__track");
  const slide = viewport.querySelector<HTMLElement>(".projects-section__slide");
  const fallbackWidth = viewport.clientWidth * 0.92;
  const slideWidth = slide?.getBoundingClientRect().width ?? fallbackWidth;
  const gap = track ? getGapPx(track) : 0;
  return slideWidth + gap;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getSliderState(viewport: HTMLDivElement): SliderState {
  const maxOffset = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  return {
    canScrollPrev: viewport.scrollLeft > EDGE_EPSILON,
    canScrollNext: viewport.scrollLeft < maxOffset - EDGE_EPSILON,
  };
}

export function ProjectsSection({ section }: { section: SectionProjects }) {
  const projects = normalizeProjectsSection(section);
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const hasProjects = projects.projects.length > 0;
  const hasMultipleSlides = projects.projects.length > 1;
  const [sliderState, setSliderState] = React.useState<SliderState>({
    canScrollPrev: false,
    canScrollNext: hasMultipleSlides,
  });

  const syncSliderState = React.useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !hasMultipleSlides) {
      setSliderState({ canScrollPrev: false, canScrollNext: false });
      return;
    }

    const next = getSliderState(viewport);
    setSliderState((prev) => {
      if (
        prev.canScrollPrev === next.canScrollPrev &&
        prev.canScrollNext === next.canScrollNext
      ) {
        return prev;
      }
      return next;
    });
  }, [hasMultipleSlides]);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    syncSliderState();

    const handleScroll = () => syncSliderState();
    const handleResize = () => syncSliderState();

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [projects.projects.length, syncSliderState]);

  const scrollByDirection = React.useCallback((direction: "prev" | "next") => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const step = getScrollStepPx(viewport);
    const nextOffset = direction === "next" ? step : -step;

    viewport.scrollBy({
      left: nextOffset,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return (
    <SectionShell anchorId={projects.anchorId} className="section-projects">
      <div className="projects-section">
        <div className="projects-section__header">
          <Stack className="projects-section__header-content" gap="var(--section-header-gap)">
            {projects.eyebrow ? (
              <Text
                as="div"
                className="projects-section__eyebrow"
                tone="muted"
                size="sm"
                weight="medium"
              >
                {projects.eyebrow}
              </Text>
            ) : null}
            <Heading level={2}>{projects.title}</Heading>
            {projects.intro ? (
              <Text className="projects-section__intro" tone="muted">
                {projects.intro}
              </Text>
            ) : null}
          </Stack>
          {hasMultipleSlides ? (
            <Cluster className="projects-section__controls" gap="2" align="center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => scrollByDirection("prev")}
                disabled={!sliderState.canScrollPrev}
                aria-label="Previous project"
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => scrollByDirection("next")}
                disabled={!sliderState.canScrollNext}
                aria-label="Next project"
              >
                Next
              </Button>
            </Cluster>
          ) : null}
        </div>

        {!hasProjects ? (
          <p className="projects-section__status" role="status" aria-live="polite">
            Project highlights are being refreshed. Check back soon.
          </p>
        ) : (
          <div
            ref={viewportRef}
            className={`projects-section__viewport${hasMultipleSlides ? "" : " projects-section__viewport--single"}`}
            aria-label={hasMultipleSlides ? "Project slider" : "Featured project"}
          >
            <div
              className={`projects-section__track${hasMultipleSlides ? "" : " projects-section__track--single"}`}
            >
              {projects.projects.map((project) => (
                <article key={project.key} className="projects-section__slide">
                  <Card className="projects-section__card" variant="subtle" density="lg">
                    <Stack className="projects-section__card-content" gap="var(--card-flow-gap)">
                      {project.thumbnailSrc ? (
                        <div className="projects-section__media-frame">
                          <img
                            src={project.thumbnailSrc}
                            alt={project.thumbnailAlt ?? project.name}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div className="projects-section__media-placeholder" aria-hidden="true">
                          <span>No preview image</span>
                        </div>
                      )}

                      {project.featured ? (
                        <div className="projects-section__featured">
                          <Badge size="sm" tone="warning">
                            Featured
                          </Badge>
                        </div>
                      ) : null}

                      <Heading level={3} className="projects-section__title">
                        {project.name}
                      </Heading>

                      {project.tagline ? (
                        <Text className="projects-section__tagline" weight="medium">
                          {project.tagline}
                        </Text>
                      ) : null}

                      {project.summary ? (
                        <Text className="projects-section__summary" tone="muted">
                          {project.summary}
                        </Text>
                      ) : null}

                      {project.highlights.length ? (
                        <ul className="projects-section__highlights">
                          {project.highlights.map((highlight) => (
                            <li key={highlight}>
                              <Text as="span" size="sm" tone="muted">
                                {highlight}
                              </Text>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {project.role || project.period ? (
                        <Inline className="projects-section__meta" align="center" gap="2" wrap>
                          {project.role ? (
                            <Text as="span" size="sm" tone="muted">
                              {project.role}
                            </Text>
                          ) : null}
                          {project.role && project.period ? (
                            <Text as="span" size="sm" tone="muted">
                              ·
                            </Text>
                          ) : null}
                          {project.period ? (
                            <Text as="span" size="sm" tone="muted">
                              {project.period}
                            </Text>
                          ) : null}
                        </Inline>
                      ) : null}

                      {project.techStack.length ? (
                        <Cluster className="projects-section__chips" gap="2" align="center">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} tone="muted" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </Cluster>
                      ) : null}

                      {project.actions.length ? (
                        <Cluster className="projects-section__actions" gap="2" align="center">
                          {project.actions.map((action) => (
                            <Button
                              key={action.key}
                              href={action.href}
                              variant={action.variant}
                              size="sm"
                              aria-label={getAriaLabelWithVisibleText(
                                action.label,
                                action.ariaLabel,
                              )}
                              target={action.openInNewTab ? "_blank" : undefined}
                              rel={action.openInNewTab ? "noreferrer noopener" : undefined}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </Cluster>
                      ) : null}
                    </Stack>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
