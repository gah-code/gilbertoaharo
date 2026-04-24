import React from "react";
import { classNames } from "./classNames";
import "./Text.css";

export type TextTone = "default" | "muted";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "regular" | "medium" | "semibold";
export type TextTracking = "normal" | "tight";
export type TextKind =
  | "body"
  | "bodyLarge"
  | "bodySmall"
  | "meta"
  | "eyebrow"
  | "caption";

export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, "style"> & {
  as?: keyof HTMLElementTagNameMap;
  kind?: TextKind;
  tone?: TextTone;
  size?: TextSize;
  weight?: TextWeight;
  tracking?: TextTracking;
  muted?: boolean;
};

const textDefaultsByKind: Record<
  TextKind,
  {
    size: TextSize;
    weight: TextWeight;
    tracking: TextTracking;
    tone: TextTone;
  }
> = {
  body: {
    size: "md",
    weight: "regular",
    tracking: "normal",
    tone: "default",
  },
  bodyLarge: {
    size: "lg",
    weight: "regular",
    tracking: "normal",
    tone: "default",
  },
  bodySmall: {
    size: "sm",
    weight: "regular",
    tracking: "normal",
    tone: "default",
  },
  meta: {
    size: "sm",
    weight: "medium",
    tracking: "normal",
    tone: "muted",
  },
  eyebrow: {
    size: "xs",
    weight: "semibold",
    tracking: "tight",
    tone: "muted",
  },
  caption: {
    size: "xs",
    weight: "regular",
    tracking: "normal",
    tone: "muted",
  },
};

export function Text({
  as: Component = "p",
  kind = "body",
  tone,
  size,
  weight,
  tracking,
  muted = false,
  className,
  children,
  ...rest
}: TextProps) {
  const Element = Component;
  const defaults = textDefaultsByKind[kind];
  const resolvedSize = size ?? defaults.size;
  const resolvedWeight = weight ?? defaults.weight;
  const resolvedTracking = tracking ?? defaults.tracking;
  const resolvedTone = muted ? "muted" : (tone ?? defaults.tone);

  return (
    <Element
      className={classNames([
        "ui-text",
        `ui-text--kind-${kind}`,
        `ui-text--tone-${resolvedTone}`,
        `ui-text--size-${resolvedSize}`,
        `ui-text--weight-${resolvedWeight}`,
        `ui-text--tracking-${resolvedTracking}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </Element>
  );
}
