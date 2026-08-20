/**
 * @fileoverview Multi-variant Badge component.
 * Used for difficulty levels, statuses, categories, and skills.
 */

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variantStyles = {
  default:
    "bg-secondary text-secondary-foreground",
  outline:
    "border border-border bg-transparent text-foreground",
  success:
    "bg-success-bg text-success-foreground",
  warning:
    "bg-warning-bg text-warning-foreground",
  error:
    "bg-error-bg text-error-foreground",
  info:
    "bg-info-bg text-info-foreground",
  beginner:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  intermediate:
    "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  advanced:
    "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  expert:
    "bg-red-500/10 text-red-700 dark:text-red-400",
} as const;

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
} as const;

export type BadgeVariant = keyof typeof variantStyles;
export type BadgeSize = keyof typeof sizeStyles;

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  /** Optional leading icon. */
  icon?: ReactNode;
}

/** A small status indicator with semantic color variants. */
export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  icon,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium leading-none whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
