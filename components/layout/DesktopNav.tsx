"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export interface NavLink {
  href: string;
  label: string;
}

interface DesktopNavProps {
  items: NavLink[];
}

export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
      {items.map((item, index) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
          >
            <span
              className={`relative z-10 ${
                isActive
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {item.label}
            </span>

            {/* Hover Background (Magnetic effect approximation) */}
            {hoveredIndex === index && (
              <motion.div
                layoutId="nav-hover"
                className="absolute inset-0 z-0 rounded-full bg-neutral-100 dark:bg-neutral-800/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {/* Active Indicator Underline */}
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full bg-neutral-900 dark:bg-white"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
