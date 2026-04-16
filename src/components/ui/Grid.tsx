import React from "react";
import { classNames } from "./classNames";
import "./Grid.css";

export type GridColumns = 1 | 2 | 3 | 4 | "auto-fit";
export type GridMinItemWidth = "220" | "260" | "280" | "320";
export type GridGap = "2" | "3" | "4" | "6" | "8";
export type GridAlign = "start" | "center" | "stretch";

type GridProps = Omit<React.HTMLAttributes<HTMLElement>, "style"> & {
  as?: keyof HTMLElementTagNameMap;
  columns?: GridColumns;
  minItemWidth?: GridMinItemWidth;
  gap?: GridGap;
  align?: GridAlign;
};

export function Grid({
  as: Component = "div",
  columns = "auto-fit",
  minItemWidth = "280",
  gap = "4",
  align = "stretch",
  className,
  children,
  ...rest
}: GridProps) {
  const Element = Component;

  return (
    <Element
      className={classNames([
        "ui-grid",
        `ui-grid--cols-${columns}`,
        `ui-grid--min-${minItemWidth}`,
        `ui-grid--gap-${gap}`,
        `ui-grid--align-${align}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </Element>
  );
}
