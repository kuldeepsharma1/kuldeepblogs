/**
 * @fileoverview Global keyboard shortcut registration hook.
 * Handles modifier keys and prevents conflicts with input elements.
 */

"use client";

import { useEffect, useCallback } from "react";

interface ShortcutOptions {
  /** The key to listen for (e.g., "k", "Escape", "/"). */
  key: string;
  /** Require Ctrl/Cmd modifier. */
  meta?: boolean;
  /** Require Shift modifier. */
  shift?: boolean;
  /** Require Alt modifier. */
  alt?: boolean;
  /** If true, the shortcut fires even when focused on input/textarea. */
  allowInInput?: boolean;
}

/**
 * Registers a global keyboard shortcut.
 *
 * @param options - Shortcut configuration
 * @param callback - Function to call when shortcut fires
 *
 * @example
 * ```ts
 * useKeyboardShortcut({ key: "k", meta: true }, () => setSearchOpen(true));
 * ```
 */
export function useKeyboardShortcut(
  options: ShortcutOptions,
  callback: (e: KeyboardEvent) => void
) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      // Skip if focused on editable elements, unless explicitly allowed
      if (!options.allowInInput) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable
        ) {
          return;
        }
      }

      const metaMatch = options.meta ? (e.metaKey || e.ctrlKey) : true;
      const shiftMatch = options.shift ? e.shiftKey : true;
      const altMatch = options.alt ? e.altKey : true;

      if (e.key.toLowerCase() === options.key.toLowerCase() && metaMatch && shiftMatch && altMatch) {
        e.preventDefault();
        callback(e);
      }
    },
    [options, callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}
