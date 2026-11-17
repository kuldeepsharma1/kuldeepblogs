import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourses } from "@/lib/courses";
import { getModulesByCourse } from "@/lib/modules";
import {
  getCourseLessonBySlug,
  getAdjacentLessons,
  getLessonsByModule,
} from "@/lib/course-lessons";
import { getCourseArtworkSrc, CourseArtwork } from "@/components/learning/course-artwork";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Callout } from "@/components/mdx/callout";
import { Tip } from "@/components/mdx/tip";
import { Warning } from "@/components/mdx/warning";
import { ImageFigure } from "@/components/mdx/image-figure";
import { LinkPreview } from "@/components/mdx/link-preview";
import {
  ArchitectureDiagram,
  EnvironmentCard,
  TopicNode,
} from "@/components/mdx/architecture-diagram";
import { Quiz } from "@/components/Quiz";
import { getLinkPreview } from "@/lib/link-previews";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

const mdxComponents = {
  ArchitectureDiagram,
  EnvironmentCard,
  TopicNode,
  Callout,
  Tip,
  Warning,
  ImageFigure,
  table: (props: React.ComponentProps<"table">) => (
    <div className="mt-8 overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

function isHttpUrl(value?: string): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isLessonImageUrl(value?: string): value is string {
  if (!value) return false;
  if (value.startsWith("/")) {
    return /\.(avif|gif|jpe?g|png|svg|webp)(?:$|[?#])/i.test(value);
  }

  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      (url.hostname === "images.openai.com" ||
        /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(url.pathname))
    );
  } catch {
    return false;
  }
}

function InlineLessonImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1400}
      height={900}
      unoptimized={src.startsWith("http://") || src.startsWith("https://")}
      sizes="(max-width: 768px) 100vw, 768px"
      className="my-4 inline-block h-auto max-h-144 max-w-full rounded-lg border border-border object-contain align-middle"
    />
  );
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  const params: { slug: string; moduleSlug: string; lessonSlug: string }[] = [];

  for (const course of courses) {
    const modules = await getModulesByCourse(course.slug);
    for (const mod of modules) {
      const lessons = await getLessonsByModule(course.slug, mod.slug);
      for (const lesson of lessons) {
        params.push({
          slug: course.slug,
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string; lessonSlug: string }>;
}) {
  const { slug, moduleSlug, lessonSlug } = await params;
  const lesson = await getCourseLessonBySlug(slug, moduleSlug, lessonSlug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string; lessonSlug: string }>;
}) {
  const { slug, moduleSlug, lessonSlug } = await params;

  const [course, lesson, adjacent] = await Promise.all([
    getCourseBySlug(slug),
    getCourseLessonBySlug(slug, moduleSlug, lessonSlug),
    getAdjacentLessons(slug, moduleSlug, lessonSlug),
  ]);

  if (!lesson || !course) notFound();

  const quizQuestions = (lesson.quiz ?? []).flatMap((question) => {
    if (
      !("options" in question) ||
      !("correctAnswer" in question) ||
      typeof question.correctAnswer !== "number"
    ) {
      return [];
    }

    return [{
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    }];
  });

  // Get all modules/lessons for sidebar
  const modules = await getModulesByCourse(slug);
  const modulesWithLessons = await Promise.all(
    modules.map(async (mod) => ({
      ...mod,
      lessons: await getLessonsByModule(slug, mod.slug),
    })),
  );

  const { content } = await compileMDX({
    source: lesson.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
      },
    },
    components: {
      ...mdxComponents,
      img: ({ src, alt }: React.ComponentProps<"img">) => {
        const imageSrc =
          typeof src === "string" && (src.startsWith("/") || isHttpUrl(src))
            ? src
            : getCourseArtworkSrc(course);
        return (
          <InlineLessonImage
            src={imageSrc}
            alt={alt || `${course.title} lesson illustration`}
          />
        );
      },
      a: async ({ href, children, ...props }: React.ComponentProps<"a">) => {
        if (href?.includes("google.com/s2/favicons")) {
          return null;
        }
        if (isLessonImageUrl(href)) {
          return (
            <InlineLessonImage
              src={href}
              alt={typeof children === "string" ? children : `${course.title} lesson image`}
            />
          );
        }
        if (href && isHttpUrl(href)) {
          return (
            <LinkPreview
              href={href}
              preview={await getLinkPreview(href)}
            >
              {children}
            </LinkPreview>
          );
        }
        return (
          <a
            href={href}
            className="font-medium text-foreground underline decoration-muted-foreground underline-offset-4 transition-colors hover:decoration-foreground"
            {...props}
          >
            {children}
          </a>
        );
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Learn", href: "/learn" },
          { label: "Courses", href: "/learn/courses" },
          { label: course.title, href: `/learn/courses/${slug}` },
          { label: lesson.title },
        ]}
      />

      <details className="group rounded-lg border border-border bg-card lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground">
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Course contents
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
        </summary>
        <nav className="max-h-72 overflow-y-auto border-t border-border py-2" aria-label="Course content">
          {modulesWithLessons.map((mod) => (
            <div key={mod.slug}>
              <p className="px-4 pb-1 pt-3 text-xs font-semibold text-muted-foreground">{mod.title}</p>
              {mod.lessons.map((item) => {
                const isActive = item.slug === lessonSlug && mod.slug === moduleSlug;
                return (
                  <Link
                    key={item.slug}
                    href={`/learn/courses/${slug}/${mod.slug}/${item.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`block px-4 py-2 text-sm ${isActive ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"}`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </details>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Main Content */}
        <article className="min-w-0">
          {/* Lesson Header */}
          <header className="mb-10">
            <CourseArtwork
              course={course}
              className="mb-8 aspect-16/6 max-h-64 w-full rounded-lg"
            />
            <div className="flex items-center gap-2 mb-3">
              {lesson.category && (
                <Badge variant="outline" size="sm">
                  {lesson.category}
                </Badge>
              )}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {lesson.readingTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight">
              {lesson.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
              {lesson.description}
            </p>

            {/* Objectives */}
            {lesson.objectives && lesson.objectives.length > 0 && (
              <div className="mt-6 rounded-xl border border-border bg-muted/20 p-5">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Learning Objectives
                </p>
                <ul className="space-y-2">
                  {lesson.objectives.map((obj, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          <div className="lesson-prose">{content}</div>
          {/* Quiz Section */}
          {quizQuestions.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
                Test Your Knowledge
              </h2>
              <Quiz questions={quizQuestions} />
            </div>
          )}

          {/* Navigation */}
          <nav
            className="mt-12 pt-8 border-t border-border"
            aria-label="Lesson navigation"
          >
            <div className="flex items-center justify-between gap-4">
              {adjacent.prev ? (
                <Link
                  href={`/learn/courses/${slug}/${adjacent.prev.moduleSlug}/${adjacent.prev.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all hover:bg-accent hover:-translate-x-0.5 max-w-[45%]"
                >
                  <ChevronLeft className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="font-medium text-foreground truncate">
                      {adjacent.prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {adjacent.next ? (
                <Link
                  href={`/learn/courses/${slug}/${adjacent.next.moduleSlug}/${adjacent.next.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all hover:bg-accent hover:translate-x-0.5 max-w-[45%] ml-auto"
                >
                  <div className="min-w-0 text-right">
                    <p className="text-xs text-muted-foreground">Next</p>
                    <p className="font-medium text-foreground truncate">
                      {adjacent.next.title}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              ) : (
                <Link
                  href={`/learn/courses/${slug}`}
                  className="group flex items-center gap-3 rounded-xl bg-foreground px-4 py-3 text-sm text-background transition-all hover:bg-foreground/90 ml-auto"
                >
                  <span className="font-medium">Back to Course</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </nav>
        </article>

        {/* Sidebar — Course Navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 bg-muted/30 border-b border-border">
                <Link
                  href={`/learn/courses/${slug}`}
                  className="text-xs font-semibold text-foreground hover:underline flex items-center gap-1.5"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {course.title}
                </Link>
              </div>
              <nav
                className="max-h-[60vh] overflow-y-auto"
                aria-label="Course content"
              >
                {modulesWithLessons.map((mod) => (
                  <div key={mod.slug}>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {mod.title}
                    </p>
                    <ul>
                      {mod.lessons.map((l) => {
                        const isActive =
                          l.slug === lessonSlug && mod.slug === moduleSlug;
                        return (
                          <li key={l.slug}>
                            <Link
                              href={`/learn/courses/${slug}/${mod.slug}/${l.slug}`}
                              className={`flex items-center gap-2 px-4 py-2 text-xs transition-colors ${
                                isActive
                                  ? "bg-accent text-foreground font-medium border-l-2 border-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                              }`}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <span className="truncate">{l.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
