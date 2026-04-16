import React from "react";
import { classNames } from "./classNames";
import "./Text.css";

export type TextTone = "default" | "muted";
export type TextSize = "sm" | "md" | "lg";
export type TextWeight = "regular" | "medium" | "semibold";
export type TextTracking = "normal" | "tight";

type TextProps = Omit<React.HTMLAttributes<HTMLElement>, "style"> & {
  as?: keyof HTMLElementTagNameMap;
  tone?: TextTone;
  size?: TextSize;
  weight?: TextWeight;
  tracking?: TextTracking;
  muted?: boolean;
};

export function Text({
  as: Component = "p",
  tone,
  size = "md",
  weight = "regular",
  tracking = "normal",
  muted = false,
  className,
  children,
  ...rest
}: TextProps) {
  const Element = Component;
  const resolvedTone = muted ? "muted" : (tone ?? "default");

  return (
    <Element
      className={classNames([
        "ui-text",
        `ui-text--tone-${resolvedTone}`,
        `ui-text--size-${size}`,
        `ui-text--weight-${weight}`,
        `ui-text--tracking-${tracking}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </Element>
  );
}
