import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { Skill } from "@/types/learning";

const skillsDir = path.join(process.cwd(), "content", "skills");

/**
 * Get all skills sorted alphabetically by title.
 */
export async function getAllSkills(): Promise<Skill[]> {
  try {
    const files = await fs.readdir(skillsDir);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    const skills = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(skillsDir, file);
        try {
          const raw = await fs.readFile(filePath, "utf8");
          const slug = file.replace(/\.mdx$/, "");
          return parseSkill(raw, slug);
        } catch {
          return null;
        }
      })
    );

    return skills
      .filter((s): s is Skill => s !== null && !s.draft)
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

/**
 * Get a specific skill by its slug.
 */
export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  try {
    const filePath = path.join(skillsDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    return parseSkill(raw, slug);
  } catch {
    return null;
  }
}

/**
 * Get all skills for a specific domain.
 */
export async function getSkillsByDomain(domainSlug: string): Promise<Skill[]> {
  const all = await getAllSkills();
  return all.filter((s) => s.domain === domainSlug);
}

/**
 * Get multiple skills by an array of slugs.
 */
export async function getSkillsBySlugs(slugs: string[]): Promise<Skill[]> {
  const all = await getAllSkills();
  const matchingSkills = all.filter((s) => slugs.includes(s.slug));
  
  // Return in the exact order requested by the slugs array
  return slugs
    .map((slug) => matchingSkills.find((s) => s.slug === slug))
    .filter((s): s is Skill => s !== undefined);
}

function parseSkill(raw: string, fallbackSlug: string): Skill {
  const { data } = matter(raw);

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    slug: data.slug ?? fallbackSlug,
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    author: data.author ?? "Kuldeep Sharma",
    draft: Boolean(data.draft),
    difficulty: data.difficulty ?? "beginner",
    estimatedHours: data.estimatedHours ?? "",
    relatedCourses: data.relatedCourses ?? [],
    relatedPaths: data.relatedPaths ?? [],
    prerequisites: data.prerequisites ?? [],
    badges: data.badges ?? [],
    careerRelevance: data.careerRelevance ?? "",
    relatedSkills: data.relatedSkills ?? [],
    domain: data.domain ?? "",
  };
}
