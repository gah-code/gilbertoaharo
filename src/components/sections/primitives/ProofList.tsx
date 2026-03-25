import React from "react";

type ProofListProps = {
  items: string[];
};

export function ProofList({ items }: ProofListProps) {
  if (!items?.length) return null;

  return (
    <ul
      style={{
        paddingLeft: "20px",
        margin: 0,
        color: "var(--color-text-muted)",
        display: "grid",
        gap: "var(--space-2)",
      }}
    >
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
