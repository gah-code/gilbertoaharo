import React from "react";
import { classNames } from "./classNames";
import "./Badge.css";

export type BadgeTone = "default" | "muted" | "success" | "warning";
export type BadgeSize = "sm" | "md";

type BadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> & {
  tone?: BadgeTone;
  size?: BadgeSize;
};

export function Badge({
  children,
  className,
  tone = "default",
  size = "md",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={classNames([
        "ui-badge",
        `ui-badge--${tone}`,
        `ui-badge--${size}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </span>
  );
}
