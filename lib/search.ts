/**
 * @fileoverview Fuse.js-powered search engine.
 * Creates a unified search index across all content types.
 */

import Fuse, { type IFuseOptions } from "fuse.js";
import type { SearchResult } from "@/types/learning";

/** Fuse.js search options optimized for learning content. */
const fuseOptions: IFuseOptions<SearchResult> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.25 },
    { name: "category", weight: 0.15 },
    { name: "tags", weight: 0.2 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

let fuseInstance: Fuse<SearchResult> | null = null;

/**
 * Initializes or resets the search index with the given items.
 */
export function initSearchIndex(items: SearchResult[]): void {
  fuseInstance = new Fuse(items, fuseOptions);
}

/**
 * Performs a fuzzy search across the index.
 * @param query - Search query string.
 * @param limit - Maximum results to return.
 * @returns Array of search results with scores.
 */
export function search(query: string, limit = 20): SearchResult[] {
  if (!fuseInstance || !query.trim()) return [];

  const results = fuseInstance.search(query, { limit });
  return results.map((r) => r.item);
}

/**
 * Filters search results by type.
 */
export function searchByType(
  query: string,
  type: SearchResult["type"],
  limit = 10
): SearchResult[] {
  return search(query, limit * 3).filter((r) => r.type === type).slice(0, limit);
}

/**
 * Gets the current search index instance (for external use).
 */
export function getSearchIndex(): Fuse<SearchResult> | null {
  return fuseInstance;
}

/**
 * Builds a SearchResult array from raw content data.
 * This is a helper to transform course/lesson/path data into searchable items.
 */
export function buildSearchItem(
  type: SearchResult["type"],
  title: string,
  description: string,
  slug: string,
  urlPrefix: string,
  category?: string,
  tags?: string[]
): SearchResult {
  return {
    type,
    title,
    description,
    slug,
    url: `${urlPrefix}/${slug}`,
    category,
    tags,
  };
}
