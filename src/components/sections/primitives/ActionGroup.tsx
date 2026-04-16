import React from "react";
import { Button, type ButtonVariant } from "../../ui/Button";
import { Cluster, type ClusterGap } from "../../ui/Cluster";
import "./ActionGroup.css";

export type ActionItem = {
  label: string;
  href: string;
  variant?: ButtonVariant;
  openInNewTab?: boolean;
  ariaLabel?: string;
};

type ActionGroupProps = {
  actions: ActionItem[];
  gap?: ClusterGap;
};

export function ActionGroup({
  actions,
  gap = "3",
}: ActionGroupProps) {
  if (!actions?.length) return null;

  const safeActions = actions.filter(
    (action) => Boolean(action.label) && Boolean(action.href),
  );
  if (!safeActions.length) return null;

  return (
    <Cluster className="section-action-group" gap={gap}>
      {safeActions.map((action, idx) => (
        <Button
          key={`${action.label}-${idx}`}
          href={action.href}
          target={action.openInNewTab ? "_blank" : undefined}
          rel={action.openInNewTab ? "noreferrer noopener" : undefined}
          aria-label={action.ariaLabel ?? action.label}
          variant={action.variant ?? "primary"}
        >
          {action.label}
        </Button>
      ))}
    </Cluster>
  );
}
