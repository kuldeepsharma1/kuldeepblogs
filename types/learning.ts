/**
 * @fileoverview Core type definitions for the KuldeepLearn learning platform.
 * All content-driven types align with Velite MDX frontmatter schemas.
 */

// ─────────────────────────────────────────────
// Difficulty & Status Enums
// ─────────────────────────────────────────────

export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type CourseStatus = "draft" | "published" | "archived";

export type LessonStatus = "locked" | "available" | "in-progress" | "completed";

export type CompletionStatus = "not-started" | "in-progress" | "completed";

// ─────────────────────────────────────────────
// Content Primitives
// ─────────────────────────────────────────────

/** Base metadata shared across all content types. */
export interface ContentMeta {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  draft: boolean;
}

/** An instructor or author profile. */
export interface Instructor {
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  url?: string;
}

// ─────────────────────────────────────────────
// Course System
// ─────────────────────────────────────────────

export interface Course extends ContentMeta {
  cover?: string;
  imageAlt?: string;
  category: string;
  tags: string[];
  difficulty: Difficulty;
  estimatedTime: string;
  prerequisites: string[];
  objectives: string[];
  instructor: Instructor;
  modules: string[];
  featured: boolean;
  order: number;
}

export interface Module extends ContentMeta {
  courseSlug: string;
  order: number;
  estimatedTime: string;
  lessons: string[];
  objectives: string[];
}

export interface CourseLesson extends ContentMeta {
  courseSlug: string;
  moduleSlug: string;
  order: number;
  cover?: string;
  imageAlt?: string;
  category?: string;
  tags: string[];
  readingTime: string;
  toc: boolean;
  quiz?: QuizQuestion[];
  objectives?: string[];
  content: string;
}

// ─────────────────────────────────────────────
// Learning Paths
// ─────────────────────────────────────────────

export interface LearningPath extends ContentMeta {
  cover?: string;
  imageAlt?: string;
  category: string;
  difficulty: Difficulty;
  estimatedTime: string;
  skills: string[];
  courses: string[];
  badges: string[];
  featured: boolean;
  order: number;
}

// ─────────────────────────────────────────────
// Quiz System
// ─────────────────────────────────────────────

export type QuestionType =
  | "multiple-choice"
  | "multiple-select"
  | "true-false"
  | "match"
  | "fill-blank"
  | "ordering"
  | "code-output"
  | "scenario"
  | "image-question";

/** Base question properties shared by all types. */
interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  explanation?: string;
  points: number;
  hint?: string;
  image?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  correctAnswer: number;
}

export interface MultipleSelectQuestion extends BaseQuestion {
  type: "multiple-select";
  options: string[];
  correctAnswers: number[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  correctAnswer: boolean;
}

export interface MatchQuestion extends BaseQuestion {
  type: "match";
  pairs: Array<{ left: string; right: string }>;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: "fill-blank";
  blanks: Array<{ id: string; acceptedAnswers: string[] }>;
  template: string;
}

export interface OrderingQuestion extends BaseQuestion {
  type: "ordering";
  items: string[];
  correctOrder: number[];
}

export interface CodeOutputQuestion extends BaseQuestion {
  type: "code-output";
  code: string;
  language: string;
  options: string[];
  correctAnswer: number;
}

export interface ScenarioQuestion extends BaseQuestion {
  type: "scenario";
  scenario: string;
  options: string[];
  correctAnswer: number;
}

export interface ImageQuestion extends BaseQuestion {
  type: "image-question";
  questionImage: string;
  options: string[];
  correctAnswer: number;
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion
  | MatchQuestion
  | FillBlankQuestion
  | OrderingQuestion
  | CodeOutputQuestion
  | ScenarioQuestion
  | ImageQuestion;

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizAttempt {
  quizId: string;
  answers: Record<string, unknown>;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

// ─────────────────────────────────────────────
// Badges & Achievements
// ─────────────────────────────────────────────

export type BadgeColor =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "cyan"
  | "amber"
  | "rose"
  | "emerald"
  | "indigo";

export interface Badge {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: BadgeColor;
  difficulty: Difficulty;
  requirements: BadgeRequirement[];
  skills: string[];
  courses: string[];
}

export interface BadgeRequirement {
  type: "complete-course" | "complete-path" | "pass-quiz" | "complete-lessons";
  target: string;
  label: string;
}

export interface Achievement {
  id: string;
  type: "badge-earned" | "course-completed" | "path-completed" | "streak" | "milestone";
  title: string;
  description: string;
  earnedAt: string;
  metadata?: Record<string, unknown>;
}

// ─────────────────────────────────────────────
// User Progress (localStorage-backed)
// ─────────────────────────────────────────────

export interface UserProgress {
  /** Completed lesson slugs (course/module/lesson format). */
  completedLessons: string[];
  /** Quiz attempts keyed by quiz ID. */
  quizAttempts: Record<string, QuizAttempt[]>;
  /** Bookmarked content slugs with their type. */
  bookmarks: Bookmark[];
  /** Earned badge slugs. */
  earnedBadges: string[];
  /** Earned achievements. */
  achievements: Achievement[];
  /** Course progress keyed by course slug. */
  courseProgress: Record<string, CourseProgress>;
  /** Last visited content for "Continue Learning". */
  lastVisited?: LastVisited;
  /** Activity history for timeline. */
  activityLog: ActivityEntry[];
  /** Learning streak data. */
  streak: StreakData;
}

export interface CourseProgress {
  courseSlug: string;
  startedAt: string;
  completedAt?: string;
  completedLessons: string[];
  totalLessons: number;
  percentage: number;
}

export interface Bookmark {
  slug: string;
  type: "course" | "lesson" | "path" | "resource";
  title: string;
  addedAt: string;
}

export interface LastVisited {
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  visitedAt: string;
}

export interface ActivityEntry {
  id: string;
  type: "lesson-completed" | "quiz-completed" | "course-started" | "course-completed" | "badge-earned" | "bookmark-added";
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string;
  activeDates: string[];
}

// ─────────────────────────────────────────────
// Search
// ─────────────────────────────────────────────

export type SearchResultType = "course" | "lesson" | "path" | "module" | "badge" | "glossary" | "resource";

export interface SearchResult {
  type: SearchResultType;
  title: string;
  description: string;
  slug: string;
  url: string;
  category?: string;
  tags?: string[];
}

// ─────────────────────────────────────────────
// Glossary & Resources
// ─────────────────────────────────────────────

export interface GlossaryEntry {
  term: string;
  slug: string;
  definition: string;
  relatedTerms?: string[];
  category?: string;
}

export interface Resource {
  title: string;
  slug: string;
  description: string;
  url?: string;
  type: "article" | "video" | "tool" | "book" | "documentation";
  category: string;
  tags: string[];
}
