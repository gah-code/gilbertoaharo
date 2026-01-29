import React from "react";
import {
  getPreviewEnabled,
  disablePreview,
  isPreviewAllowed,
} from "./previewMode";

export function PreviewBanner() {
  const enabled = getPreviewEnabled();
  if (!isPreviewAllowed() || !enabled) return null;

  return (
    <div style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
      <strong>Preview mode</strong> (draft content)
      <button style={{ marginLeft: 12 }} onClick={disablePreview}>
        Exit preview
      </button>
    </div>
  );
}
