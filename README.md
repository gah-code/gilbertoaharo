# Gilberto A. Haro — Personal Site (SPA)

Single-page **React + TypeScript + Vite** site powered by **Contentful**.  
The landing page is composed from modular CMS sections, and article pages render deep dives with Rich Text.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Stack](#stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Local Preview Checklist](#local-preview-checklist)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Content Modeling Notes](#content-modeling-notes)
- [Safety & Publishing](#safety--publishing)
- [Docs](#docs)

---

## Overview

This repo powers a personal landing experience and long-form writing pages:

- **Landing** (`/`) renders a single `pagePersonalLanding` entry composed of modular section entries.
- **Articles** (`/articles/:slug`) render `article` entries (Rich Text + optional hero image + attachments).
- A **lean router** keeps this as a lightweight SPA without adding a routing dependency.

---

## Features

- Content-driven landing page from **Contentful modular sections**
- Article pages with **SEO metadata fallbacks**
- Minimal, reusable UI primitives (`src/components/ui`)
- Small, explicit “content layer” (`src/content/`) that isolates CMS concerns from UI concerns
- Custom SPA router with internal link interception

---

## Stack

- **React 19**, **TypeScript**, **Vite** (path alias `@` → `src`)
- **Contentful delivery SDK** + light mappers (`src/content/contentful`)
- Minimal design primitives and section renderers (`src/components/ui`, `src/components/sections`)
- Custom SPA router for:
  - `/`
  - `/articles/:slug`
  - 404

---

## Project Structure

High-level map:

- `src/pages` — `LandingPage`, `ArticlePage`, `NotFoundPage`
- `src/router` — path parsing and SPA navigation helpers
- `src/content` — source contract + Contentful client/API/adapters/types; `static/` holds fixtures for UI-first prototyping
- `src/components/sections` — per-section renderers driven by CMS content type id
- `src/components/ui` & `src/components/layout` — lightweight UI primitives and SEO wrapper
- `src/components/rich-text` — minimal rich text renderer
- `src/styles` — tokens + base resets
- `docs/` — IA, design system notes, CMS guidance

---

## Getting Started

### Prerequisites

- Node: **20.19+** or **22.12+**
- npm

### Install

```bash
npm install
