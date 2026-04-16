import React from "react";

type StackProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof HTMLElementTagNameMap;
  gap?: string;
};

export function Stack({
  as: Component = "div",
  gap = "var(--space-4)",
  style,
  children,
  ...rest
}: StackProps) {
  const Element = Component;
  return (
    <Element
      style={{ display: "flex", flexDirection: "column", gap, ...style }}
      {...rest}
    >
      {children}
    </Element>
  );
}
