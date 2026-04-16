import React from "react";
import { classNames } from "./classNames";
import "./Card.css";

export type CardVariant = "default" | "subtle" | "elevated";
export type CardDensity = "sm" | "md" | "lg";

type CardProps = Omit<React.HTMLAttributes<HTMLDivElement>, "style"> & {
  variant?: CardVariant;
  density?: CardDensity;
  interactive?: boolean;
};

export function Card({
  children,
  className,
  variant = "default",
  density = "md",
  interactive = false,
  ...rest
}: CardProps) {
  return (
    <div
      className={classNames([
        "ui-card",
        `ui-card--${variant}`,
        `ui-card--${density}`,
        interactive && "ui-card--interactive",
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  );
}
