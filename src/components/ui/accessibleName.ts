function normalizeAccessibleText(value?: string | null): string | undefined {
  const normalized = value?.replace(/\s+/g, " ").trim();
  return normalized ? normalized : undefined;
}

export function getAriaLabelWithVisibleText(
  visibleText: string,
  ariaLabel?: string | null,
): string | undefined {
  const visible = normalizeAccessibleText(visibleText);
  const label = normalizeAccessibleText(ariaLabel);

  if (!visible || !label || visible === label) {
    return undefined;
  }

  if (label.toLowerCase().includes(visible.toLowerCase())) {
    return label;
  }

  return `${visible}: ${label}`;
}
