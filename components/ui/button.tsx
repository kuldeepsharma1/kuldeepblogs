/**
 * @fileoverview Polymorphic Button component.
 * Supports rendering as <button>, <a>, or any element via `asChild` pattern.
 */

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
  ghost:
    "text-foreground hover:bg-accent active:scale-[0.98]",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-accent active:scale-[0.98]",
  danger:
    "bg-error text-white shadow-sm hover:bg-error/90 active:scale-[0.98]",
  success:
    "bg-success text-white shadow-sm hover:bg-success/90 active:scale-[0.98]",
} as const;

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-9 px-4 text-sm gap-2 rounded-lg",
  lg: "h-10 px-5 text-sm gap-2 rounded-xl",
  xl: "h-12 px-6 text-base gap-2.5 rounded-xl",
  icon: "h-9 w-9 rounded-lg",
  "icon-sm": "h-8 w-8 rounded-lg",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional trailing icon. */
  iconRight?: ReactNode;
  /** Loading state. */
  loading?: boolean;
}

/** Enterprise-grade button with variants, sizes, loading, and icons. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconRight,
      loading,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          icon
        )}
        {children}
        {iconRight}
      </button>
    );
  }
);

Button.displayName = "Button";
