/**
 * @fileoverview Course data access layer.
 * Reads course MDX files from the filesystem and returns typed Course objects.
 */

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { Course, Instructor } from "@/types/learning";

const coursesDir = path.join(process.cwd(), "content", "courses");

/**
 * Reads all published courses, sorted by order then date.
 */
export async function getAllCourses(): Promise<Course[]> {
  try {
    const entries = await fs.readdir(coursesDir, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory());

    const courses = await Promise.all(
      dirs.map(async (dir) => {
        const filePath = path.join(coursesDir, dir.name, "course.mdx");
        try {
          const raw = await fs.readFile(filePath, "utf8");
          return parseCourse(raw, dir.name);
        } catch {
          return null;
        }
      })
    );

    return courses
      .filter((c): c is Course => c !== null && !c.draft)
      .sort((a, b) => a.order - b.order || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch {
    return [];
  }
}

/**
 * Gets a single course by slug.
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const filePath = path.join(coursesDir, slug, "course.mdx");
    const raw = await fs.readFile(filePath, "utf8");
    return parseCourse(raw, slug);
  } catch {
    return null;
  }
}

/**
 * Gets featured courses.
 */
export async function getFeaturedCourses(): Promise<Course[]> {
  const all = await getAllCourses();
  return all.filter((c) => c.featured);
}

/**
 * Gets courses by category.
 */
export async function getCoursesByCategory(category: string): Promise<Course[]> {
  const all = await getAllCourses();
  return all.filter((c) => c.category.toLowerCase() === category.toLowerCase());
}

/**
 * Gets related courses (same category, different slug).
 */
export async function getRelatedCourses(slug: string, limit = 3): Promise<Course[]> {
  const course = await getCourseBySlug(slug);
  if (!course) return [];
  const all = await getAllCourses();
  return all.filter((c) => c.slug !== slug && c.category === course.category).slice(0, limit);
}

// ─── Parsing ─────────────────────────────────

function parseCourse(raw: string, dirName: string): Course {
  const { data } = matter(raw);

  const instructor: Instructor = data.instructor ?? {
    name: data.author ?? "Kuldeep Sharma",
  };

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    slug: data.slug ?? dirName,
    publishedAt: normalizeDate(data.publishedAt),
    updatedAt: data.updatedAt ? normalizeDate(data.updatedAt) : undefined,
    author: data.author ?? "Kuldeep Sharma",
    cover: data.cover,
    imageAlt: data.imageAlt,
    domain: data.domain,
    category: data.category ?? "General",
    tags: data.tags ?? [],
    skills: data.skills ?? [],
    difficulty: data.difficulty ?? "beginner",
    estimatedTime: data.estimatedTime ?? "1 hour",
    prerequisites: data.prerequisites ?? [],
    objectives: data.objectives ?? [],
    instructor,
    modules: data.modules ?? [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    order: data.order ?? 0,
  };
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}
