import React from "react";
import { classNames } from "@/components/ui/classNames";

export type FooterIconKey =
  | "github"
  | "linkedin"
  | "email"
  | "external"
  | "arrow"
  | "none";

export type FooterLinkIconProps = {
  iconKey?: FooterIconKey;
  className?: string;
  decorative?: boolean;
};

function IconRoot({
  className,
  decorative = true,
  children,
  viewBox = "0 0 24 24",
}: {
  className?: string;
  decorative?: boolean;
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={classNames(["footer-link-icon", className])}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function FooterLinkIcon({
  iconKey,
  className,
  decorative = true,
}: FooterLinkIconProps) {
  if (!iconKey || iconKey === "none") {
    return null;
  }

  switch (iconKey) {
    case "github":
      return (
        <IconRoot className={className} decorative={decorative}>
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.35-1.33-3.35-1.33-.46-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.52 1 1.52 1 .88 1.52 2.32 1.08 2.89.83.1-.64.35-1.08.63-1.33-2.22-.25-4.56-1.1-4.56-4.92 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.26.1-2.62 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.92-1.3 2.76-1.02 2.76-1.02.55 1.36.2 2.37.1 2.62.64.69 1.03 1.58 1.03 2.67 0 3.83-2.34 4.67-4.58 4.92.36.3.68.9.68 1.81V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
          />
        </IconRoot>
      );
    case "linkedin":
      return (
        <IconRoot className={className} decorative={decorative}>
          <path
            fill="currentColor"
            d="M6.2 8.7a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8Zm1.7 11H4.5V10h3.4v9.7Zm11.6 0h-3.4v-4.8c0-1.14-.03-2.6-1.58-2.6-1.58 0-1.82 1.24-1.82 2.52v4.86H9.3V10h3.24v1.32h.05c.45-.85 1.55-1.74 3.2-1.74 3.42 0 4.04 2.25 4.04 5.18v4.94Z"
          />
        </IconRoot>
      );
    case "email":
      return (
        <IconRoot className={className} decorative={decorative}>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M3.5 6.5h17v11h-17v-11Zm0 .25L12 13l8.5-6.25"
          />
        </IconRoot>
      );
    case "external":
      return (
        <IconRoot className={className} decorative={decorative}>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M14 4.75h5.25V10M19 5 11 13M10 7H5.75v10.25H16V13"
          />
        </IconRoot>
      );
    case "arrow":
      return (
        <IconRoot className={className} decorative={decorative}>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M4.75 12h13.5M14 7.75 18.25 12 14 16.25"
          />
        </IconRoot>
      );
    default:
      return null;
  }
}
