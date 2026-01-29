// src/preview/previewMode.ts
// Preview should be *allowed* only on preview builds.
// In prod builds, we ignore URL toggles to avoid draft leakage.

import { env } from "@/env";

const KEY = "gilbertoaharo:preview";

export function isPreviewAllowed(): boolean {
  return env.buildTarget === "preview";
}

export function getPreviewEnabled(): boolean {
  if (!isPreviewAllowed()) return false;

  // URL toggle: ?preview=true
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("preview") === "true";

  // Persist for this session so navigation doesn't drop preview state.
  if (fromUrl) sessionStorage.setItem(KEY, "true");

  return sessionStorage.getItem(KEY) === "true";
}

export function disablePreview() {
  sessionStorage.removeItem(KEY);
  // optional: force reload to clear any cached draft data
  window.location.href = window.location.pathname;
}
