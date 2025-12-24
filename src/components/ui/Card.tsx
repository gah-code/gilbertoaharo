import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, style, ...rest }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        padding: "var(--space-4)",
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
