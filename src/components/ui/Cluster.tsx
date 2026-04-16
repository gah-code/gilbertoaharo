import React from "react";
import { classNames } from "./classNames";
import "./Cluster.css";

export type ClusterAlign = "start" | "center" | "end" | "baseline";
export type ClusterJustify = "start" | "center" | "end" | "between";
export type ClusterGap = "1" | "2" | "3" | "4" | "6";

type ClusterProps = Omit<React.HTMLAttributes<HTMLElement>, "style"> & {
  as?: keyof HTMLElementTagNameMap;
  align?: ClusterAlign;
  justify?: ClusterJustify;
  gap?: ClusterGap;
};

export function Cluster({
  as: Component = "div",
  align = "center",
  justify = "start",
  gap = "3",
  className,
  children,
  ...rest
}: ClusterProps) {
  const Element = Component;

  return (
    <Element
      className={classNames([
        "ui-cluster",
        `ui-cluster--align-${align}`,
        `ui-cluster--justify-${justify}`,
        `ui-cluster--gap-${gap}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </Element>
  );
}
