/**
 * @fileoverview Accessible Tabs component with animated indicator.
 * Follows WAI-ARIA Tabs pattern with keyboard navigation.
 */

"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, type ReactNode, type KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  children: (activeTab: string) => ReactNode;
  className?: string;
}

/**
 * Accessible tabs with animated underline indicator.
 * Uses render-prop pattern for maximum flexibility.
 */
export function Tabs({ tabs, defaultTab, onChange, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabListRef = useRef<HTMLDivElement>(null);

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeEl = tabRefs.current.get(activeTab);
    if (activeEl && tabListRef.current) {
      const listRect = tabListRef.current.getBoundingClientRect();
      const tabRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: tabRect.left - listRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab]);

  const handleSelect = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextTab = tabs[nextIndex];
    handleSelect(nextTab.id);
    tabRefs.current.get(nextTab.id)?.focus();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className="relative flex border-b border-border"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => handleSelect(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-t-lg",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}

        {/* Animated underline indicator */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-foreground"
          animate={indicatorStyle}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {activeTab === tab.id && children(activeTab)}
        </div>
      ))}
    </div>
  );
}
