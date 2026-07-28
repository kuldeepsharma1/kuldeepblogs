/**
 * @fileoverview Responsive Breadcrumb component.
 * Truncates middle items on small screens for deep paths.
 */

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Show home icon as first item. */
  showHome?: boolean;
  className?: string;
}

export function Breadcrumb({ items, showHome = true, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {showHome && (
          <>
            <li>
              <Link
                href="/"
                className="flex items-center rounded-md p-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Home"
              >
                <Home className="h-3.5 w-3.5" />
              </Link>
            </li>
            {items.length > 0 && (
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              </li>
            )}
          </>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={item.label}>
              <li className={cn(isLast && "font-medium text-foreground")}>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded-md px-1 py-0.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="px-1 py-0.5">
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
