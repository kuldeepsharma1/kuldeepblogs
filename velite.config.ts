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

export default defineConfig({
  collections: { posts },
  output: {
    assets: "public/static",
    data: ".velite",
  },
});
