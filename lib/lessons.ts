import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "lessons");

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface LessonMetadata {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  cover?: string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  featured?: boolean;
  draft?: boolean;
  toc?: boolean;
  imageAlt?: string;
  quiz?: Question[];
}

export interface Lesson extends LessonMetadata {
  content: string;
  fileName: string;
}

async function getLessonFiles(): Promise<string[]> {
  try {
    const dirEntries = await fs.readdir(contentDir, { withFileTypes: true });
    return dirEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => path.join(contentDir, entry.name))
      .sort();
  } catch (e) {
    // Return empty array if directory doesn't exist yet
    return [];
  }
}

export async function getAllLessons(): Promise<Lesson[]> {
  const files = await getLessonFiles();
  const lessons = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(source);
      const slug = (data.slug as string) ?? path.basename(filePath, ".mdx");

      return {
        ...data,
        publishedAt: data.publishedAt instanceof Date ? data.publishedAt.toISOString() : String(data.publishedAt),
        updatedAt: data.updatedAt instanceof Date ? data.updatedAt.toISOString() : data.updatedAt ? String(data.updatedAt) : undefined,
        slug,
        tags: (data.tags as string[]) ?? [],
        featured: Boolean(data.featured),
        draft: Boolean(data.draft),
        toc: data.toc !== false,
        quiz: data.quiz as Question[] | undefined,
        content,
        fileName: path.basename(filePath),
      } as Lesson;
    }),
  );

  return lessons
    .filter((lesson) => !lesson.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  const lessons = await getAllLessons();
  return lessons.find((lesson) => lesson.slug === slug) ?? null;
}
