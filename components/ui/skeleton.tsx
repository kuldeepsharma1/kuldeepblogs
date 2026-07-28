/**
 * @fileoverview Skeleton loading primitives.
 * Shimmer animation for placeholder content during loading.
 */

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/** Base skeleton with shimmer animation. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-lg bg-muted",
        "animate-[shimmer_2s_ease-in-out_infinite]",
        "bg-linear-to-r from-muted via-muted-foreground/5 to-muted bg-size-[400%_100%]",
        className
      )}
    />
  );
}

/** Text line skeleton. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

/** Card skeleton. */
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-2xl border border-border p-6 space-y-4", className)}>
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

/** Avatar skeleton. */
export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };
  return <Skeleton className={cn("rounded-full", sizes[size])} />;
}
