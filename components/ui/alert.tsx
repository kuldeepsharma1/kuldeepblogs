/**
 * @fileoverview Semantic Alert component.
 * Used for callouts, notices, and status messages.
 */

import { cn } from "@/lib/utils";
import { Info, CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  info: {
    container: "bg-info-bg border-info/20",
    icon: "text-info",
    title: "text-info-foreground",
    IconComponent: Info,
  },
  success: {
    container: "bg-success-bg border-success/20",
    icon: "text-success",
    title: "text-success-foreground",
    IconComponent: CheckCircle2,
  },
  warning: {
    container: "bg-warning-bg border-warning/20",
    icon: "text-warning",
    title: "text-warning-foreground",
    IconComponent: AlertTriangle,
  },
  error: {
    container: "bg-error-bg border-error/20",
    icon: "text-error",
    title: "text-error-foreground",
    IconComponent: XCircle,
  },
} as const;

interface AlertProps {
  variant?: keyof typeof variants;
  title?: string;
  children: ReactNode;
  className?: string;
  /** Override icon. */
  icon?: LucideIcon;
}

export function Alert({
  variant = "info",
  title,
  children,
  className,
  icon,
}: AlertProps) {
  const config = variants[variant];
  const Icon = icon ?? config.IconComponent;

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border p-4",
        config.container,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.icon)} aria-hidden />
      <div className="min-w-0 space-y-1">
        {title && (
          <p className={cn("text-sm font-semibold", config.title)}>{title}</p>
        )}
        <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
