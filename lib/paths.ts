/**
 * @fileoverview Learning Path data access layer.
 */

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { LearningPath } from "@/types/learning";

const pathsDir = path.join(process.cwd(), "content", "paths");

/**
 * Gets all published learning paths, sorted by order.
 */
export async function getAllPaths(): Promise<LearningPath[]> {
  try {
    const entries = await fs.readdir(pathsDir, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory());

    const paths = await Promise.all(
      dirs.map(async (dir) => {
        const filePath = path.join(pathsDir, dir.name, "path.mdx");
        try {
          const raw = await fs.readFile(filePath, "utf8");
          return parsePath(raw, dir.name);
        } catch {
          return null;
        }
      })
    );

    return paths
      .filter((p): p is LearningPath => p !== null && !p.draft)
      .sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

/**
 * Gets a single learning path by slug.
 */
export async function getPathBySlug(slug: string): Promise<LearningPath | null> {
  try {
    const filePath = path.join(pathsDir, slug, "path.mdx");
    const raw = await fs.readFile(filePath, "utf8");
    return parsePath(raw, slug);
  } catch {
    return null;
  }
}

// ─── Parsing ─────────────────────────────────

function parsePath(raw: string, dirName: string): LearningPath {
  const { data } = matter(raw);

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    slug: data.slug ?? dirName,
    publishedAt: data.publishedAt instanceof Date ? data.publishedAt.toISOString() : String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    author: data.author ?? "Kuldeep Sharma",
    cover: data.cover,
    imageAlt: data.imageAlt,
    domain: data.domain,
    category: data.category ?? "General",
    careerGoal: data.careerGoal,
    difficulty: data.difficulty ?? "beginner",
    estimatedTime: data.estimatedTime ?? "10 hours",
    skills: data.skills ?? [],
    courses: data.courses ?? [],
    badges: data.badges ?? [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    order: data.order ?? 0,
  };
}
