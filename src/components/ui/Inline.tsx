import React from "react";
import { classNames } from "./classNames";
import "./Inline.css";

export type InlineAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type InlineJustify = "start" | "center" | "end" | "between";
export type InlineGap = "1" | "2" | "3" | "4" | "6" | "8";

type InlineProps = Omit<React.HTMLAttributes<HTMLElement>, "style"> & {
  as?: keyof HTMLElementTagNameMap;
  align?: InlineAlign;
  justify?: InlineJustify;
  gap?: InlineGap;
  wrap?: boolean;
};

export function Inline({
  as: Component = "div",
  align = "center",
  justify = "start",
  gap = "3",
  wrap = false,
  className,
  children,
  ...rest
}: InlineProps) {
  const Element = Component;

  return (
    <Element
      className={classNames([
        "ui-inline",
        `ui-inline--align-${align}`,
        `ui-inline--justify-${justify}`,
        `ui-inline--gap-${gap}`,
        wrap && "ui-inline--wrap",
        className,
      ])}
      {...rest}
    >
      {children}
    </Element>
  );
}
