/**
 * @fileoverview Type-safe localStorage hook with SSR safety.
 * Handles serialization, deserialization, and storage events for cross-tab sync.
 */

"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Reads and parses a value from localStorage.
 * Returns `defaultValue` if the key doesn't exist or parsing fails.
 */
function readStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Hook for type-safe localStorage access.
 *
 * @param key - localStorage key
 * @param defaultValue - Value used when key is missing
 * @returns [value, setValue, removeValue]
 *
 * @example
 * ```ts
 * const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStorage(key, defaultValue)
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
          // Dispatch a custom event so other hooks on the same page update
          window.dispatchEvent(
            new StorageEvent("storage", { key, newValue: JSON.stringify(next) })
          );
        } catch (error) {
          console.warn(`[useLocalStorage] Failed to set "${key}":`, error);
        }
        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(defaultValue);
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to remove "${key}":`, error);
    }
  }, [key, defaultValue]);

  // Sync across tabs via storage event
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(e.newValue ? (JSON.parse(e.newValue) as T) : defaultValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, defaultValue]);

  return [storedValue, setValue, removeValue];
}
