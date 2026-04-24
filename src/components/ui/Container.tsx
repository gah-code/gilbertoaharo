import React from "react";

export type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof HTMLElementTagNameMap;
  maxWidth?: string;
  paddingX?: string;
};

export function Container({
  as: Component = "div",
  maxWidth = "var(--content-max)",
  paddingX = "var(--section-pad-x)",
  style,
  children,
  ...rest
}: ContainerProps) {
  const Element = Component;
  return (
    <Element
      style={{
        maxWidth,
        width: "100%",
        margin: "0 auto",
        padding: `0 ${paddingX}`,
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Element>
  );
}
