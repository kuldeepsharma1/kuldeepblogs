/**
 * @fileoverview Learning platform configuration.
 * Defines difficulty levels, categories, badge colors, and skill metadata.
 */

import type { Difficulty, BadgeColor } from "@/types/learning";

/** Difficulty metadata with display labels and semantic colors. */
export const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bgClass: string; textClass: string }
> = {
  beginner: {
    label: "Beginner",
    color: "#22c55e",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/15",
    textClass: "text-emerald-700 dark:text-emerald-400",
  },
  intermediate: {
    label: "Intermediate",
    color: "#3b82f6",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/15",
    textClass: "text-blue-700 dark:text-blue-400",
  },
  advanced: {
    label: "Advanced",
    color: "#a855f7",
    bgClass: "bg-purple-500/10 dark:bg-purple-500/15",
    textClass: "text-purple-700 dark:text-purple-400",
  },
  expert: {
    label: "Expert",
    color: "#ef4444",
    bgClass: "bg-red-500/10 dark:bg-red-500/15",
    textClass: "text-red-700 dark:text-red-400",
  },
};

/** Badge color palette. */
export const badgeColorConfig: Record<
  BadgeColor,
  { bg: string; text: string; border: string; glow: string }
> = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500/20",
    glow: "shadow-orange-500/20",
  },
  red: {
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/20",
    glow: "shadow-red-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/20",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500/20",
    glow: "shadow-rose-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500/20",
    glow: "shadow-indigo-500/20",
  },
};

/** Course categories. */
export const courseCategories = [
  "React",
  "TypeScript",
  "CSS",
  "Next.js",
  "JavaScript",
  "Node.js",
  "Design Systems",
  "Web Performance",
  "Accessibility",
  "Testing",
] as const;

export type CourseCategory = (typeof courseCategories)[number];

/** Default values for new user progress. */
export const defaultUserProgress = {
  completedLessons: [],
  quizAttempts: {},
  bookmarks: [],
  earnedBadges: [],
  achievements: [],
  courseProgress: {},
  lastVisited: undefined,
  activityLog: [],
  streak: {
    current: 0,
    longest: 0,
    lastActiveDate: "",
    activeDates: [],
  },
} as const;

/** Storage keys for localStorage. */
export const STORAGE_KEYS = {
  PROGRESS: "kuldeep-learn-progress",
  THEME: "kuldeep-learn-theme",
  BOOKMARKS: "kuldeep-learn-bookmarks",
  SEARCH_HISTORY: "kuldeep-learn-search-history",
} as const;
