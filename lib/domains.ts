import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { Domain } from "@/types/learning";

const domainsDir = path.join(process.cwd(), "content", "domains");

/**
 * Get all domains sorted alphabetically by title.
 */
export async function getAllDomains(): Promise<Domain[]> {
  try {
    const entries = await fs.readdir(domainsDir, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory());

    const domains = await Promise.all(
      dirs.map(async (dir) => {
        const filePath = path.join(domainsDir, dir.name, "domain.mdx");
        try {
          const raw = await fs.readFile(filePath, "utf8");
          return parseDomain(raw, dir.name);
        } catch {
          return null;
        }
      })
    );

    return domains
      .filter((d): d is Domain => d !== null && !d.draft)
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

/**
 * Get a specific domain by its slug.
 */
export async function getDomainBySlug(slug: string): Promise<Domain | null> {
  try {
    const filePath = path.join(domainsDir, slug, "domain.mdx");
    const raw = await fs.readFile(filePath, "utf8");
    return parseDomain(raw, slug);
  } catch {
    return null;
  }
}

function parseDomain(raw: string, dirName: string): Domain {
  const { data } = matter(raw);

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    slug: data.slug ?? dirName,
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    author: data.author ?? "Kuldeep Sharma",
    draft: Boolean(data.draft),
    icon: data.icon,
    colorTheme: data.colorTheme,
    featuredSkills: data.featuredSkills ?? [],
    featuredCourses: data.featuredCourses ?? [],
    learningPaths: data.learningPaths ?? [],
    estimatedHours: data.estimatedHours ?? "",
  };
}
