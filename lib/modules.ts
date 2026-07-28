/**
 * @fileoverview Module data access layer.
 * Reads module MDX frontmatter for a given course.
 */

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { Module } from "@/types/learning";

const coursesDir = path.join(process.cwd(), "content", "courses");

/**
 * Gets all modules for a given course, sorted by order.
 */
export async function getModulesByCourse(courseSlug: string): Promise<Module[]> {
  const modulesDir = path.join(coursesDir, courseSlug, "modules");

  try {
    const entries = await fs.readdir(modulesDir, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));

    const modules = await Promise.all(
      dirs.map(async (dir) => {
        const filePath = path.join(modulesDir, dir.name, "module.mdx");
        try {
          const raw = await fs.readFile(filePath, "utf8");
          return parseModule(raw, courseSlug, dir.name);
        } catch {
          return null;
        }
      })
    );

    return modules
      .filter((m): m is Module => m !== null && !m.draft)
      .sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

/**
 * Gets a single module by course and module slug.
 */
export async function getModuleBySlug(
  courseSlug: string,
  moduleSlug: string
): Promise<Module | null> {
  try {
    const filePath = path.join(coursesDir, courseSlug, "modules", moduleSlug, "module.mdx");
    const raw = await fs.readFile(filePath, "utf8");
    return parseModule(raw, courseSlug, moduleSlug);
  } catch {
    return null;
  }
}

// ─── Parsing ─────────────────────────────────

function parseModule(raw: string, courseSlug: string, dirName: string): Module {
  const { data } = matter(raw);

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    slug: data.slug ?? dirName,
    courseSlug: data.courseSlug ?? courseSlug,
    publishedAt: data.publishedAt instanceof Date ? data.publishedAt.toISOString() : String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    author: data.author ?? "Kuldeep Sharma",
    order: data.order ?? 0,
    estimatedTime: data.estimatedTime ?? "30 min",
    lessons: data.lessons ?? [],
    objectives: data.objectives ?? [],
    draft: Boolean(data.draft),
  };
}
