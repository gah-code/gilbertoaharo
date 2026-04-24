import React from "react";
import { classNames } from "./classNames";
import "./Heading.css";

export type HeadingWeight = "regular" | "semibold" | "bold";
export type HeadingSize =
  | "auto"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "display";
export type HeadingTone = "default" | "muted";
export type HeadingTracking = "auto" | "normal" | "tight";

export type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, "style"> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: HeadingSize;
  weight?: HeadingWeight;
  tone?: HeadingTone;
  tracking?: HeadingTracking;
};

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function Heading({
  level = 2,
  size = "auto",
  weight,
  tone = "default",
  tracking = "auto",
  className,
  children,
  ...rest
}: HeadingProps) {
  const sizeMap: Record<number, Exclude<HeadingSize, "auto">> = {
    1: "3xl",
    2: "2xl",
    3: "xl",
    4: "lg",
    5: "md",
    6: "sm",
  };
  const defaultWeightByLevel: Record<number, HeadingWeight> = {
    1: "bold",
    2: "bold",
    3: "bold",
    4: "semibold",
    5: "semibold",
    6: "semibold",
  };

  const resolvedSize = size === "auto" ? sizeMap[level] : size;
  const resolvedWeight = weight ?? defaultWeightByLevel[level];
  const resolvedTracking =
    tracking === "auto"
      ? level <= 2
        ? "tight"
        : "normal"
      : tracking;

  const Tag = `h${level}` as HeadingTag;

  return (
    <Tag
      className={classNames([
        "ui-heading",
        `ui-heading--size-${resolvedSize}`,
        `ui-heading--weight-${resolvedWeight}`,
        `ui-heading--tone-${tone}`,
        `ui-heading--tracking-${resolvedTracking}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </Tag>
  );
}
