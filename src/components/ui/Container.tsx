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
        maxWidth: "960px",
        margin: "0 auto",
        padding: "0 var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Element>
  );
}
