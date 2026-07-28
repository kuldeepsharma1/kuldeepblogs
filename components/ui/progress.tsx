/**
 * @fileoverview Animated progress indicators.
 * Linear progress bar and circular progress ring, both with Framer Motion.
 */

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ─── Linear Progress Bar ─── */

interface ProgressBarProps {
  /** Percentage 0-100. */
  value: number;
  /** Visual size. */
  size?: "sm" | "md" | "lg";
  /** Color scheme. */
  variant?: "default" | "success" | "warning" | "info";
  /** Show percentage label. */
  showLabel?: boolean;
  className?: string;
}

const barSizes = { sm: "h-1", md: "h-2", lg: "h-3" };

const barColors = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
};

export function ProgressBar({
  value,
  size = "md",
  variant = "default",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-medium tabular-nums">{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className={cn("w-full overflow-hidden rounded-full bg-muted", barSizes[size])}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round(clamped)}% complete`}
      >
        <motion.div
          className={cn("h-full rounded-full", barColors[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/* ─── Circular Progress ─── */

interface CircularProgressProps {
  /** Percentage 0-100. */
  value: number;
  /** Diameter in pixels. */
  size?: number;
  /** Stroke width in pixels. */
  strokeWidth?: number;
  /** Color of the progress arc. */
  color?: string;
  /** Show percentage text in center. */
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 6,
  color = "var(--primary)",
  showLabel = true,
  className,
}: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${Math.round(clamped)}% complete`}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-semibold tabular-nums text-foreground">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
