/**
 * @fileoverview Course lesson data access layer.
 * Reads lesson MDX files nested under course/module directories.
 */

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { CourseLesson } from "@/types/learning";

const coursesDir = path.join(process.cwd(), "content", "courses");

/**
 * Gets all lessons for a given module in a course, sorted by order.
 */
export async function getLessonsByModule(
  courseSlug: string,
  moduleSlug: string
): Promise<CourseLesson[]> {
  const lessonsDir = path.join(coursesDir, courseSlug, "modules", moduleSlug, "lessons");

  try {
    const files = await fs.readdir(lessonsDir);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx")).sort();

    const lessons = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(lessonsDir, file);
        const raw = await fs.readFile(filePath, "utf8");
        return parseCourseLesson(raw, courseSlug, moduleSlug, file);
      })
    );

    return lessons
      .filter((l) => !l.draft)
      .sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

/**
 * Gets a single course lesson by its identifiers.
 */
export async function getCourseLessonBySlug(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): Promise<(CourseLesson & { content: string }) | null> {
  const lessonsDir = path.join(coursesDir, courseSlug, "modules", moduleSlug, "lessons");

  try {
    const files = await fs.readdir(lessonsDir);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    for (const file of mdxFiles) {
      const filePath = path.join(lessonsDir, file);
      const raw = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(raw);
      const slug = data.slug ?? path.basename(file, ".mdx");

      if (slug === lessonSlug) {
        return { ...parseCourseLesson(raw, courseSlug, moduleSlug, file), content };
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Gets all lessons for an entire course (across all modules), sorted by module order then lesson order.
 */
export async function getAllLessonsForCourse(courseSlug: string): Promise<CourseLesson[]> {
  const modulesDir = path.join(coursesDir, courseSlug, "modules");

  try {
    const moduleEntries = await fs.readdir(modulesDir, { withFileTypes: true });
    const moduleDirs = moduleEntries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));

    const allLessons: CourseLesson[] = [];

    for (const dir of moduleDirs) {
      const lessons = await getLessonsByModule(courseSlug, dir.name);
      allLessons.push(...lessons);
    }

    return allLessons;
  } catch {
    return [];
  }
}

/**
 * Gets adjacent lessons (previous and next) for navigation.
 */
export async function getAdjacentLessons(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): Promise<{ prev: CourseLesson | null; next: CourseLesson | null }> {
  const allLessons = await getAllLessonsForCourse(courseSlug);
  const currentIndex = allLessons.findIndex(
    (l) => l.slug === lessonSlug && l.moduleSlug === moduleSlug
  );

  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
  };
}

// ─── Parsing ─────────────────────────────────

function parseCourseLesson(
  raw: string,
  courseSlug: string,
  moduleSlug: string,
  fileName: string
): CourseLesson {
  const { data, content } = matter(raw);

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    slug: data.slug ?? path.basename(fileName, ".mdx"),
    courseSlug: data.courseSlug ?? courseSlug,
    moduleSlug: data.moduleSlug ?? moduleSlug,
    publishedAt: data.publishedAt instanceof Date ? data.publishedAt.toISOString() : String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    author: data.author ?? "Kuldeep Sharma",
    order: data.order ?? 0,
    cover: data.cover,
    imageAlt: data.imageAlt,
    category: data.category,
    tags: data.tags ?? [],
    readingTime: data.readingTime ?? "5 min",
    toc: data.toc !== false,
    draft: Boolean(data.draft),
    objectives: data.objectives ?? [],
    quiz: data.quiz,
    content,
  };
}
