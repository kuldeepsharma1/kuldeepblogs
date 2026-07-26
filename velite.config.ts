import { defineConfig, defineCollection, s } from "velite";

const posts = defineCollection({
  name: "posts",
  pattern: "content/posts/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    slug: s.string(),
    publishedAt: s.string(),
    updatedAt: s.string().optional(),
    author: s.string(),
    cover: s.string(),
    tags: s.array(s.string()),
    category: s.string(),
    readingTime: s.string(),
    featured: s.boolean().default(false),
    draft: s.boolean().default(false),
    toc: s.boolean().default(true),
    imageAlt: s.string().optional(),
  }),
});

const lessons = defineCollection({
  name: "lessons",
  pattern: "content/lessons/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    slug: s.string(),
    publishedAt: s.string(),
    updatedAt: s.string().optional(),
    author: s.string(),
    cover: s.string().optional(),
    tags: s.array(s.string()).optional(),
    category: s.string().optional(),
    readingTime: s.string().optional(),
    featured: s.boolean().default(false),
    draft: s.boolean().default(false),
    toc: s.boolean().default(true),
    imageAlt: s.string().optional(),
    quiz: s.array(
      s.object({
        question: s.string(),
        options: s.array(s.string()),
        correctAnswer: s.number(),
        explanation: s.string().optional(),
      })
    ).optional(),
  }),
});

export default defineConfig({
  collections: { posts, lessons },
  output: {
    assets: "public/static",
    data: ".velite",
  },
});
