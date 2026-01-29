import React from "react";

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
};

export function Container({
  as: Component = "div",
  style,
  children,
  ...rest
}: ContainerProps) {
  const Element: any = Component;
  return (
    <Element
      style={{
        maxWidth: "var(--content-max)",
        width: "100%",
        margin: "0 auto",
        padding: "0 var(--section-pad-x)",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Element>
  );
}
