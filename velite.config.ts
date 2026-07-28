import { defineConfig, defineCollection, s } from "velite";

// ─────────────────────────────────────────────
// Blog Posts (existing)
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Standalone Lessons (existing, preserved)
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Courses
// ─────────────────────────────────────────────

const courses = defineCollection({
  name: "courses",
  pattern: "content/courses/*/course.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    slug: s.string(),
    publishedAt: s.string(),
    updatedAt: s.string().optional(),
    author: s.string(),
    cover: s.string().optional(),
    imageAlt: s.string().optional(),
    category: s.string(),
    tags: s.array(s.string()).default([]),
    difficulty: s.enum(["beginner", "intermediate", "advanced", "expert"]),
    estimatedTime: s.string(),
    prerequisites: s.array(s.string()).default([]),
    objectives: s.array(s.string()).default([]),
    instructor: s.object({
      name: s.string(),
      avatar: s.string().optional(),
      role: s.string().optional(),
      bio: s.string().optional(),
      url: s.string().optional(),
    }),
    modules: s.array(s.string()).default([]),
    featured: s.boolean().default(false),
    draft: s.boolean().default(false),
    order: s.number().default(0),
  }),
});

// ─────────────────────────────────────────────
// Modules
// ─────────────────────────────────────────────

const modules = defineCollection({
  name: "modules",
  pattern: "content/courses/*/modules/*/module.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    slug: s.string(),
    courseSlug: s.string(),
    publishedAt: s.string(),
    updatedAt: s.string().optional(),
    author: s.string(),
    order: s.number(),
    estimatedTime: s.string(),
    lessons: s.array(s.string()).default([]),
    objectives: s.array(s.string()).default([]),
    draft: s.boolean().default(false),
  }),
});

// ─────────────────────────────────────────────
// Course Lessons
// ─────────────────────────────────────────────

const courseLessons = defineCollection({
  name: "courseLessons",
  pattern: "content/courses/*/modules/*/lessons/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    slug: s.string(),
    courseSlug: s.string(),
    moduleSlug: s.string(),
    publishedAt: s.string(),
    updatedAt: s.string().optional(),
    author: s.string(),
    order: s.number(),
    cover: s.string().optional(),
    imageAlt: s.string().optional(),
    category: s.string().optional(),
    tags: s.array(s.string()).default([]),
    readingTime: s.string(),
    toc: s.boolean().default(true),
    draft: s.boolean().default(false),
    objectives: s.array(s.string()).default([]),
    quiz: s.array(
      s.object({
        id: s.string().optional(),
        type: s.enum([
          "multiple-choice",
          "multiple-select",
          "true-false",
          "code-output",
          "fill-blank",
          "ordering",
          "scenario",
          "image-question",
          "match",
        ]).default("multiple-choice"),
        question: s.string(),
        options: s.array(s.string()).default([]),
        correctAnswer: s.number().optional(),
        correctAnswers: s.array(s.number()).default([]),
        explanation: s.string().optional(),
        points: s.number().default(1),
        hint: s.string().optional(),
        code: s.string().optional(),
        language: s.string().optional(),
        image: s.string().optional(),
        template: s.string().optional(),
        items: s.array(s.string()).default([]),
        correctOrder: s.array(s.number()).default([]),
        pairs: s.array(s.object({ left: s.string(), right: s.string() })).default([]),
        blanks: s.array(s.object({ id: s.string(), acceptedAnswers: s.array(s.string()) })).default([]),
      })
    ).optional(),
  }),
});

// ─────────────────────────────────────────────
// Learning Paths
// ─────────────────────────────────────────────

const learningPaths = defineCollection({
  name: "learningPaths",
  pattern: "content/paths/*/path.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    slug: s.string(),
    publishedAt: s.string(),
    updatedAt: s.string().optional(),
    author: s.string(),
    cover: s.string().optional(),
    imageAlt: s.string().optional(),
    category: s.string(),
    difficulty: s.enum(["beginner", "intermediate", "advanced", "expert"]),
    estimatedTime: s.string(),
    skills: s.array(s.string()).default([]),
    courses: s.array(s.string()).default([]),
    badges: s.array(s.string()).default([]),
    featured: s.boolean().default(false),
    draft: s.boolean().default(false),
    order: s.number().default(0),
  }),
});

// ─────────────────────────────────────────────
// Badges
// ─────────────────────────────────────────────

const badges = defineCollection({
  name: "badges",
  pattern: "content/badges/*.mdx",
  schema: s.object({
    slug: s.string(),
    title: s.string(),
    description: s.string(),
    icon: s.string(),
    color: s.enum(["blue", "green", "purple", "orange", "red", "cyan", "amber", "rose", "emerald", "indigo"]),
    difficulty: s.enum(["beginner", "intermediate", "advanced", "expert"]),
    requirements: s.array(s.object({
      type: s.enum(["complete-course", "complete-path", "pass-quiz", "complete-lessons"]),
      target: s.string(),
      label: s.string(),
    })).default([]),
    skills: s.array(s.string()).default([]),
    courses: s.array(s.string()).default([]),
    draft: s.boolean().default(false),
  }),
});

// ─────────────────────────────────────────────
// Glossary
// ─────────────────────────────────────────────

const glossary = defineCollection({
  name: "glossary",
  pattern: "content/glossary/*.mdx",
  schema: s.object({
    term: s.string(),
    slug: s.string(),
    definition: s.string(),
    relatedTerms: s.array(s.string()).default([]),
    category: s.string().optional(),
    draft: s.boolean().default(false),
  }),
});

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

export default defineConfig({
  collections: { posts, lessons, courses, modules, courseLessons, learningPaths, badges, glossary },
  output: {
    assets: "public/static",
    data: ".velite",
  },
});
