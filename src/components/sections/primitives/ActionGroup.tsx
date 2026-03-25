import React from "react";
import { Button } from "../../ui/Button";

export type ActionItem = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "text";
  openInNewTab?: boolean;
  ariaLabel?: string;
};

function actionStyle(variant: ActionItem["variant"]) {
  if (variant === "secondary") {
    return { background: "transparent", color: "var(--color-accent)" };
  }
  if (variant === "text") {
    return {
      background: "transparent",
      color: "var(--color-accent)",
      border: "none",
      padding: 0,
    };
  }
  return {};
}

type ActionGroupProps = {
  actions: ActionItem[];
  gap?: string;
  wrap?: boolean;
};

export function ActionGroup({
  actions,
  gap = "var(--space-3)",
  wrap = true,
}: ActionGroupProps) {
  if (!actions?.length) return null;

  const safeActions = actions.filter(
    (action) => Boolean(action.label) && Boolean(action.href),
  );
  if (!safeActions.length) return null;

  return (
    <div
      style={{
        display: "flex",
        gap,
        flexWrap: wrap ? "wrap" : "nowrap",
      }}
    >
      {safeActions.map((action, idx) => (
        <Button
          key={`${action.label}-${idx}`}
          href={action.href}
          target={action.openInNewTab ? "_blank" : undefined}
          rel={action.openInNewTab ? "noreferrer noopener" : undefined}
          aria-label={action.ariaLabel ?? action.label}
          style={actionStyle(action.variant)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
