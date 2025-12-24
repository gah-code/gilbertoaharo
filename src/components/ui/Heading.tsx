import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Heading({ level = 2, children, style, ...rest }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const Element: any = Tag;

  return (
    <Element style={{ margin: 0, ...style }} {...rest}>
      {children}
    </Element>
  );
}
