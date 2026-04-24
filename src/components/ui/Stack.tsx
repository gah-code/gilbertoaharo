import React from "react";

export type StackGap = "1" | "2" | "3" | "4" | "6" | "8" | "10" | "12" | "16";

function resolveGap(gap: StackGap | string) {
  if (/^\d+$/.test(gap)) {
    return `var(--space-${gap})`;
  }
  return gap;
}

export type StackProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof HTMLElementTagNameMap;
  gap?: StackGap | string;
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
      style={{ display: "flex", flexDirection: "column", gap: resolveGap(gap), ...style }}
      {...rest}
    >
      {children}
    </Element>
  );
}
