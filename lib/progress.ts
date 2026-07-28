/**
 * @fileoverview LocalStorage-backed progress engine.
 * Manages all user learning state: progress, bookmarks, quiz scores, achievements, streaks.
 *
 * All functions are client-side only and operate on a single `UserProgress` object in localStorage.
 */

import type {
  UserProgress,
  CourseProgress,
  Bookmark,
  QuizAttempt,
  ActivityEntry,
  LastVisited,
  Achievement,
} from "@/types/learning";
import { STORAGE_KEYS, defaultUserProgress } from "@/config/learning";
import { nanoid } from "nanoid";
import { format } from "date-fns";

// ─────────────────────────────────────────────
// Core Read/Write
// ─────────────────────────────────────────────

/** Reads the full progress object from localStorage. */
export function getProgress(): UserProgress {
  if (typeof window === "undefined") return { ...defaultUserProgress } as unknown as UserProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return { ...defaultUserProgress } as unknown as UserProgress;
    return { ...defaultUserProgress, ...JSON.parse(raw) } as UserProgress;
  } catch {
    return { ...defaultUserProgress } as unknown as UserProgress;
  }
}

/** Writes the full progress object to localStorage. */
function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.warn("[progress] Failed to save:", error);
  }
}

// ─────────────────────────────────────────────
// Lesson Completion
// ─────────────────────────────────────────────

/** Marks a lesson as completed and updates course progress. */
export function completeLesson(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string,
  totalLessonsInCourse: number
): UserProgress {
  const progress = getProgress();
  const lessonKey = `${courseSlug}/${moduleSlug}/${lessonSlug}`;

  if (!progress.completedLessons.includes(lessonKey)) {
    progress.completedLessons.push(lessonKey);

    // Update course progress
    if (!progress.courseProgress[courseSlug]) {
      progress.courseProgress[courseSlug] = {
        courseSlug,
        startedAt: new Date().toISOString(),
        completedLessons: [],
        totalLessons: totalLessonsInCourse,
        percentage: 0,
      };
    }

    const cp = progress.courseProgress[courseSlug];
    if (!cp.completedLessons.includes(lessonKey)) {
      cp.completedLessons.push(lessonKey);
    }
    cp.totalLessons = totalLessonsInCourse;
    cp.percentage = Math.round((cp.completedLessons.length / cp.totalLessons) * 100);

    if (cp.percentage === 100) {
      cp.completedAt = new Date().toISOString();
    }

    // Log activity
    addActivity(progress, {
      type: "lesson-completed",
      title: `Completed lesson`,
      description: lessonKey,
    });

    // Update streak
    updateStreak(progress);
  }

  saveProgress(progress);
  return progress;
}

/** Checks if a lesson is completed. */
export function isLessonCompleted(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): boolean {
  const progress = getProgress();
  return progress.completedLessons.includes(`${courseSlug}/${moduleSlug}/${lessonSlug}`);
}

// ─────────────────────────────────────────────
// Quiz
// ─────────────────────────────────────────────

/** Records a quiz attempt. */
export function recordQuizAttempt(attempt: QuizAttempt): UserProgress {
  const progress = getProgress();
  if (!progress.quizAttempts[attempt.quizId]) {
    progress.quizAttempts[attempt.quizId] = [];
  }
  progress.quizAttempts[attempt.quizId].push(attempt);

  addActivity(progress, {
    type: "quiz-completed",
    title: `Quiz completed`,
    description: `Score: ${attempt.percentage}%`,
  });

  updateStreak(progress);
  saveProgress(progress);
  return progress;
}

/** Gets the best quiz attempt for a given quiz. */
export function getBestQuizAttempt(quizId: string): QuizAttempt | null {
  const progress = getProgress();
  const attempts = progress.quizAttempts[quizId] ?? [];
  if (attempts.length === 0) return null;
  return attempts.reduce((best, a) => (a.percentage > best.percentage ? a : best));
}

// ─────────────────────────────────────────────
// Bookmarks
// ─────────────────────────────────────────────

/** Toggles a bookmark. Returns true if added, false if removed. */
export function toggleBookmark(bookmark: Omit<Bookmark, "addedAt">): boolean {
  const progress = getProgress();
  const idx = progress.bookmarks.findIndex((b) => b.slug === bookmark.slug && b.type === bookmark.type);

  if (idx !== -1) {
    progress.bookmarks.splice(idx, 1);
    saveProgress(progress);
    return false;
  } else {
    progress.bookmarks.push({ ...bookmark, addedAt: new Date().toISOString() });
    addActivity(progress, { type: "bookmark-added", title: `Bookmarked: ${bookmark.title}` });
    saveProgress(progress);
    return true;
  }
}

/** Checks if content is bookmarked. */
export function isBookmarked(slug: string, type: Bookmark["type"]): boolean {
  const progress = getProgress();
  return progress.bookmarks.some((b) => b.slug === slug && b.type === type);
}

/** Gets all bookmarks. */
export function getBookmarks(): Bookmark[] {
  return getProgress().bookmarks;
}

// ─────────────────────────────────────────────
// Last Visited
// ─────────────────────────────────────────────

/** Updates the "continue learning" pointer. */
export function setLastVisited(visited: Omit<LastVisited, "visitedAt">): void {
  const progress = getProgress();
  progress.lastVisited = { ...visited, visitedAt: new Date().toISOString() };
  saveProgress(progress);
}

/** Gets the last visited lesson. */
export function getLastVisited(): LastVisited | undefined {
  return getProgress().lastVisited;
}

// ─────────────────────────────────────────────
// Course Progress
// ─────────────────────────────────────────────

/** Gets progress for a specific course. */
export function getCourseProgress(courseSlug: string): CourseProgress | null {
  return getProgress().courseProgress[courseSlug] ?? null;
}

// ─────────────────────────────────────────────
// Badges
// ─────────────────────────────────────────────

/** Marks a badge as earned. */
export function earnBadge(badgeSlug: string, title: string): UserProgress {
  const progress = getProgress();
  if (!progress.earnedBadges.includes(badgeSlug)) {
    progress.earnedBadges.push(badgeSlug);

    const achievement: Achievement = {
      id: nanoid(),
      type: "badge-earned",
      title: `Earned: ${title}`,
      description: `You earned the ${title} badge!`,
      earnedAt: new Date().toISOString(),
      metadata: { badgeSlug },
    };
    progress.achievements.push(achievement);

    addActivity(progress, { type: "badge-earned", title: `Earned badge: ${title}` });
  }
  saveProgress(progress);
  return progress;
}

/** Checks if a badge has been earned. */
export function isBadgeEarned(badgeSlug: string): boolean {
  return getProgress().earnedBadges.includes(badgeSlug);
}

// ─────────────────────────────────────────────
// Activity & Streak
// ─────────────────────────────────────────────

function addActivity(
  progress: UserProgress,
  entry: Omit<ActivityEntry, "id" | "timestamp">
): void {
  progress.activityLog.unshift({
    ...entry,
    id: nanoid(),
    timestamp: new Date().toISOString(),
  });
  // Keep only the last 100 entries
  if (progress.activityLog.length > 100) {
    progress.activityLog = progress.activityLog.slice(0, 100);
  }
}

function updateStreak(progress: UserProgress): void {
  const today = format(new Date(), "yyyy-MM-dd");

  if (progress.streak.lastActiveDate === today) return;

  const yesterday = format(new Date(Date.now() - 86400000), "yyyy-MM-dd");

  if (progress.streak.lastActiveDate === yesterday) {
    progress.streak.current += 1;
  } else {
    progress.streak.current = 1;
  }

  progress.streak.lastActiveDate = today;
  progress.streak.longest = Math.max(progress.streak.longest, progress.streak.current);

  if (!progress.streak.activeDates.includes(today)) {
    progress.streak.activeDates.push(today);
    // Keep last 365 days
    if (progress.streak.activeDates.length > 365) {
      progress.streak.activeDates = progress.streak.activeDates.slice(-365);
    }
  }
}

/** Resets all progress. */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}
