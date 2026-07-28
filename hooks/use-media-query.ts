/**
 * @fileoverview Media query hook for responsive breakpoint detection.
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Hook that returns whether a CSS media query matches.
 *
 * @param query - CSS media query string, e.g. "(min-width: 768px)"
 * @returns `true` if the query matches, `false` otherwise
 *
 * @example
 * ```ts
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** Convenience breakpoint hooks matching Tailwind defaults. */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
