import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ children, style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "999px",
        background: "#f3f4f6",
        color: "#111",
        fontSize: "12px",
        letterSpacing: "0.02em",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
