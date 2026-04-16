import React from "react";
import "./ProofList.css";

type ProofListProps = {
  items: string[];
};

export function ProofList({ items }: ProofListProps) {
  if (!items?.length) return null;

  return (
    <ul className="proof-list">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
