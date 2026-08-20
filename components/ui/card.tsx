/**
 * @fileoverview Composable Card component system.
 * Compound component pattern: Card, CardHeader, CardContent, CardFooter.
 */

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

/* ─── Card Root ─── */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant. */
  variant?: "default" | "glass" | "outline" | "elevated";
  /** Make the card interactive (hover effects). */
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", interactive = false, className, ...props }, ref) => {
    const variants = {
      default: "bg-card border border-border",
      glass: "glass",
      outline: "border border-border bg-transparent",
      elevated: "bg-card border border-border shadow-lg",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-200",
          variants[variant],
          interactive && "cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/* ─── Card Header ─── */

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-0", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

/* ─── Card Content ─── */

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

/* ─── Card Footer ─── */

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-t border-border px-6 py-4", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
