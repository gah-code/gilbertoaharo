# Design System Architect Checklist (Context)

Purpose: a lightweight, high-level checklist to guide discovery, build-out, governance, and adoption for this project’s design system. It reflects the current repo state (tokens, layout rules, navigation work, and remaining TODOs).

## Current Snapshot (project-specific)
- Foundations: color/typography/spacing/radius/shadow/layout tokens defined; box-sizing/global rhythm set; heading component now token-driven.
- Navigation: header + responsive nav implemented with skip link, desktop dropdowns, mobile drawer, and tokenized styling; focus-visible styling in place.
- Sections: hero and skills styled; timeline uses per-item media/CTA with static fallback art; projects/learning/contact need further polish.
- Content sources: Contentful is primary; static fixtures exist for UI-first work (hero + timeline with media/CTAs); timeline data model extended for media/CTA.
- Open items: timeline styling/responsive QA, focus-state validation across components, motion tokens, state token usage, documentation of component APIs/variants, responsive token adoption, and accessibility sweeps.
- Tooling roadmap: Storybook planned for component/section docs; not yet integrated.

## Discovery
- [ ] Clarify business goals, success metrics, and target platforms/channels.
- [ ] Identify primary user journeys and accessibility requirements (WCAG targets, keyboard/focus behaviors).
- [ ] Inventory content sources (Contentful models vs. static fixtures) and planned schema changes (e.g., timeline media/CTA fields, tags usage); ensure Contentful validations/defaults align with UI expectations.
- [ ] Confirm performance/SLO targets (bundle size, LCP, TTI) and testing expectations.

## Foundations
- [ ] Validate token coverage: color (including state), typography, spacing, radius, shadow, motion, breakpoints.
- [ ] Decide motion tokens (durations/easings) and apply to focus/hover and nav/accordion interactions.
- [ ] Ensure focus-visible and state tokens are used across primitives (buttons, links, form controls, nav, cards).
- [ ] Align layout density tokens with container/section rules across all pages (main shell, header/footer, sections).
- [ ] Capture brand voice/visual cues (illustrations, photography, gradients) and how they map to tokens.

## Components (Design / Dev / Docs)
- [ ] Define API/variant standards for primitives (Button, Badge, Card, Heading, Text, Link, Stack, Container) including states (default/hover/focus/disabled).
- [ ] Document section contracts (Hero, Timeline, Skills, Projects, Learning, Contact) with expected props/data, optional fields, and fallbacks.
- [ ] Establish accessibility expectations per component (roles, aria-*, keyboard behavior, focus order).
- [ ] Provide usage examples and do/don’t guidelines; add Storybook or MDX docs when ready.
- [ ] Plan Storybook integration (collocated stories vs. docs directory, token stories, primitive/section stories, fixture data for CMS-backed components).
- [ ] Standardize responsive behavior per component/section (breakpoints, wrapping, stack vs grid).

## Governance
- [ ] Define ownership (design + engineering) and review workflow for tokens/components/sections.
- [ ] Versioning approach for tokens/components (changelogs, deprecation policy, migration notes).
- [ ] Contribution guidelines (lint/format, testing, a11y checks, naming conventions).
- [ ] Backlog triage + release cadence for DS updates; align with product milestones.

## Adoption
- [ ] Plan onboarding materials: quickstart, examples, token reference, and code recipes.
- [ ] Identify pilot surfaces (e.g., timeline/projects pages) to prove consistency and gather feedback.
- [ ] Create support channel/office hours for consumers; track issues and requests.
- [ ] Validate Contentful editor experience aligns with section contracts (field help text, validations).

## Evolution
- [ ] Instrument usage: track component/token adoption and a11y regressions (lint/CI checks, visual regression tests).
- [ ] Collect feedback loops (surveys, PR templates, retros) and feed into roadmap.
- [ ] Maintain a public roadmap of DS work (foundations, components, accessibility, performance).
- [ ] Periodically audit for platform coverage (mobile/tablet/desktop) and cross-browser support.
