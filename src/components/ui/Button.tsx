import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Link } from "./Link";
import { classNames } from "./classNames";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
};

type ButtonAsButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return "href" in props && typeof props.href === "string" && props.href.length > 0;
}

export function Button(props: ButtonProps) {
  if (isLinkProps(props)) {
    const {
      href,
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled = false,
      onClick,
      tabIndex,
      ...rest
    } = props;

    const classes = classNames([
      "ui-button",
      `ui-button--${variant}`,
      `ui-button--${size}`,
      fullWidth && "ui-button--full",
      disabled && "is-disabled",
      className,
    ]);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    type,
    disabled,
    ...rest
  } = props;

  const classes = classNames([
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth && "ui-button--full",
    disabled && "is-disabled",
    className,
  ]);

  return (
    <button
      type={type ?? "button"}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
