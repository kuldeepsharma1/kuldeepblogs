/**
 * @fileoverview Accordion component with smooth height animation.
 * Supports single and multi-expand modes.
 */

"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  id: string;
  title: string;
  /** Optional subtitle shown to the right. */
  subtitle?: string;
  /** Optional icon. */
  icon?: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** If true, only one item can be open at a time. */
  single?: boolean;
  /** Initially open item IDs. */
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  items,
  single = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (single) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors",
                "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                "first:rounded-t-2xl last:rounded-b-2xl",
                isOpen && "text-foreground",
                !isOpen && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                {item.icon}
                <span className="truncate">{item.title}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {item.subtitle && (
                  <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                )}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
