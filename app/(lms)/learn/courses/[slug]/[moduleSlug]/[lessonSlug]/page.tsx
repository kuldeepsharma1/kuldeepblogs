import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourses } from "@/lib/courses";
import { getModulesByCourse } from "@/lib/modules";
import { getCourseLessonBySlug, getAdjacentLessons, getAllLessonsForCourse, getLessonsByModule } from "@/lib/course-lessons";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Callout } from "@/components/mdx/callout";
import { Tip } from "@/components/mdx/tip";
import { Warning } from "@/components/mdx/warning";
import { ImageFigure } from "@/components/mdx/image-figure";
import { Quiz } from "@/components/Quiz";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle2,
  List,
} from "lucide-react";

const mdxComponents = {
  Callout,
  Tip,
  Warning,
  ImageFigure,
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 scroll-mt-24 text-xl font-semibold text-foreground" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-6 text-lg leading-8 text-muted-foreground" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-8 text-muted-foreground" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-muted-foreground" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote className="mt-8 border-l-2 border-border pl-5 text-xl italic text-muted-foreground" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full overflow-hidden rounded-2xl border border-border text-left text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="border-b border-border bg-muted/50 px-4 py-3 font-semibold text-foreground" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border-b border-border px-4 py-3 text-muted-foreground" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="font-medium text-foreground underline decoration-muted-foreground underline-offset-4 hover:decoration-foreground transition-colors" {...props} />
  ),
};

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

  // Get all modules/lessons for sidebar
  const modules = await getModulesByCourse(slug);
  const modulesWithLessons = await Promise.all(
    modules.map(async (mod) => ({
      ...mod,
      lessons: await getLessonsByModule(slug, mod.slug),
    }))
  );

  const { content } = await compileMDX({
    source: lesson.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
      },
    },
    components: mdxComponents,
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

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        {/* Main Content */}
        <article className="min-w-0">
          {/* Lesson Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              {lesson.category && (
                <Badge variant="outline" size="sm">{lesson.category}</Badge>
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
                <p className="text-sm font-semibold text-foreground mb-3">Learning Objectives</p>
                <ul className="space-y-2">
                  {lesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          {/* MDX Content */}
          <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-32 prose-h2:mt-12 prose-h3:mt-8 prose-p:text-lg prose-p:leading-8 prose-a:text-foreground prose-a:underline-offset-4 prose-a:decoration-muted-foreground hover:prose-a:decoration-foreground prose-strong:text-foreground prose-pre:p-0! prose-pre:bg-transparent! prose-pre:m-0! prose-code:before:hidden prose-code:after:hidden">
            {content}
          </div>

          {/* Quiz Section */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
                Test Your Knowledge
              </h2>
              <Quiz questions={lesson.quiz as any} />
            </div>
          )}

          {/* Navigation */}
          <nav className="mt-12 pt-8 border-t border-border" aria-label="Lesson navigation">
            <div className="flex items-center justify-between gap-4">
              {adjacent.prev ? (
                <Link
                  href={`/learn/courses/${slug}/${adjacent.prev.moduleSlug}/${adjacent.prev.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all hover:bg-accent hover:-translate-x-0.5 max-w-[45%]"
                >
                  <ChevronLeft className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="font-medium text-foreground truncate">{adjacent.prev.title}</p>
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
                    <p className="font-medium text-foreground truncate">{adjacent.next.title}</p>
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
              <nav className="max-h-[60vh] overflow-y-auto" aria-label="Course content">
                {modulesWithLessons.map((mod) => (
                  <div key={mod.slug}>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {mod.title}
                    </p>
                    <ul>
                      {mod.lessons.map((l) => {
                        const isActive = l.slug === lessonSlug && mod.slug === moduleSlug;
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
