import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "posts");

export interface PostMetadata {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  cover: string;
  tags: string[];
  category: string;
  readingTime: string;
  featured: boolean;
  draft: boolean;
  toc: boolean;
  imageAlt?: string;
}

export interface Post extends PostMetadata {
  content: string;
  fileName: string;
}

async function getPostFiles(): Promise<string[]> {
  const dirEntries = await fs.readdir(contentDir, { withFileTypes: true });
  return dirEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(contentDir, entry.name))
    .sort();
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await getPostFiles();
  const posts = await Promise.all(
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
        content,
        fileName: path.basename(filePath),
      } as Post;
    }),
  );

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured);
}

export async function getLatestPosts(limit = 6): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((post) => post.category)));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags)));
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}
