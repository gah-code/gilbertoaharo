import React from "react";

type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  muted?: boolean;
};

export function Text({
  as: Component = "p",
  muted = false,
  style,
  children,
  ...rest
}: TextProps) {
  const Element: any = Component;
  return (
    <Element
      style={{ margin: 0, color: muted ? "var(--muted)" : "inherit", ...style }}
      {...rest}
    >
      {children}
    </Element>
  );
}
