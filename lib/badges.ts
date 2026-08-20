/**
 * @fileoverview Badge data access layer.
 */

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { Badge, BadgeColor, Difficulty, BadgeRequirement } from "@/types/learning";

const badgesDir = path.join(process.cwd(), "content", "badges");

/**
 * Gets all published badges.
 */
export async function getAllBadges(): Promise<Badge[]> {
  try {
    const files = await fs.readdir(badgesDir);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    const badges = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(badgesDir, file);
        const raw = await fs.readFile(filePath, "utf8");
        return parseBadge(raw, file);
      })
    );

    return badges.filter((b): b is Badge => b !== null);
  } catch {
    return [];
  }
}

/**
 * Gets a single badge by slug.
 */
export async function getBadgeBySlug(slug: string): Promise<Badge | null> {
  try {
    const filePath = path.join(badgesDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    return parseBadge(raw, `${slug}.mdx`);
  } catch {
    return null;
  }
}

// ─── Parsing ─────────────────────────────────

function parseBadge(raw: string, fileName: string): Badge | null {
  const { data } = matter(raw);
  if (data.draft) return null;

  return {
    slug: data.slug ?? path.basename(fileName, ".mdx"),
    title: data.title ?? "",
    description: data.description ?? "",
    icon: data.icon ?? "Award",
    color: (data.color ?? "blue") as BadgeColor,
    difficulty: (data.difficulty ?? "beginner") as Difficulty,
    requirements: (data.requirements ?? []) as BadgeRequirement[],
    skills: data.skills ?? [],
    courses: data.courses ?? [],
  };
}
