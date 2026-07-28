/**
 * @fileoverview Lightweight tooltip component.
 * Pure CSS positioning with fade-in animation.
 */

"use client";

import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  content: string;
  children: ReactNode;
  /** Tooltip placement. */
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            role="tooltip"
            className={cn(
              "pointer-events-none absolute z-50 max-w-xs rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg",
              positionStyles[side]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
