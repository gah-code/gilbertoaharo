import React from "react";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  weight?: "regular" | "semibold" | "bold";
};

export function Heading({
  level = 2,
  weight,
  children,
  style,
  ...rest
}: HeadingProps) {
  const fontSizeMap: Record<number, string> = {
    1: "var(--font-size-3xl)",
    2: "var(--font-size-2xl)",
    3: "var(--font-size-xl)",
    4: "var(--font-size-lg)",
    5: "var(--font-size-base)",
    6: "var(--font-size-sm)",
  };

  const lineHeightMap: Record<number, number> = {
    1: 1.12,
    2: 1.12,
    3: 1.2,
    4: 1.2,
    5: 1.3,
    6: 1.3,
  };

  const letterSpacingMap: Partial<Record<number, string>> = {
    1: "-0.02em",
    2: "-0.02em",
  };

  const fontWeightMap: Record<number, number> = {
    1: 700,
    2: 700,
    3: 700,
    4: 600,
    5: 600,
    6: 600,
  };

  const weightPresets: Record<NonNullable<HeadingProps["weight"]>, number> = {
    regular: 400,
    semibold: 600,
    bold: 700,
  };

  const resolvedWeight = weight ? weightPresets[weight] : fontWeightMap[level];

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const Element: any = Tag;

  return (
    <Element
      style={{
        margin: 0,
        fontSize: fontSizeMap[level],
        lineHeight: lineHeightMap[level],
        letterSpacing: letterSpacingMap[level],
        fontWeight: resolvedWeight,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Element>
  );
}
