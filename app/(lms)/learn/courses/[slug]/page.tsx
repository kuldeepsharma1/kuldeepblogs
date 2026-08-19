import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug, getRelatedCourses } from "@/lib/courses";
import { getModulesByCourse } from "@/lib/modules";
import { getLessonsByModule } from "@/lib/course-lessons";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Avatar } from "@/components/ui/avatar";
import {
  Clock,
  Layers,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Target,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  FileText,
} from "lucide-react";
import type { Difficulty } from "@/types/learning";

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const modules = await getModulesByCourse(slug);
  const relatedCourses = await getRelatedCourses(slug);

  // Get lesson counts per module
  const modulesWithLessons = await Promise.all(
    modules.map(async (mod) => {
      const lessons = await getLessonsByModule(slug, mod.slug);
      return { ...mod, lessonsList: lessons };
    })
  );

  const totalLessons = modulesWithLessons.reduce((sum, m) => sum + m.lessonsList.length, 0);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Learn", href: "/learn" },
          { label: "Courses", href: "/learn/courses" },
          { label: course.title },
        ]}
      />

      {/* Hero */}
      <section className="learn-surface rounded-3xl border border-border p-8 sm:p-10">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={course.difficulty as Difficulty}>{course.difficulty}</Badge>
          <span className="text-sm text-muted-foreground">{course.category}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {course.description}
        </p>

        {/* Stats Row */}
        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {course.estimatedTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="h-4 w-4" />
            {modules.length} modules
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            {totalLessons} lessons
          </span>
        </div>

        {/* Instructor */}
        <div className="mt-6 flex items-center gap-3">
          <Avatar alt={course.instructor.name} size="sm" />
          <div>
            <p className="text-sm font-medium text-foreground">{course.instructor.name}</p>
            {course.instructor.role && (
              <p className="text-xs text-muted-foreground">{course.instructor.role}</p>
            )}
          </div>
        </div>

        {/* Start Button */}
        {modulesWithLessons.length > 0 && modulesWithLessons[0].lessonsList.length > 0 && (
          <div className="mt-8">
            <Link
              href={`/learn/courses/${slug}/${modulesWithLessons[0].slug}/${modulesWithLessons[0].lessonsList[0].slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
            >
              Start Course
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div className="space-y-10">
          {/* Learning Objectives */}
          {course.objectives.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-blue-500" />
                What you&apos;ll learn
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Course Modules */}
          <section>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-purple-500" />
              Course Content
            </h2>

            <div className="space-y-4">
              {modulesWithLessons.map((mod, moduleIndex) => (
                <div key={mod.slug} className="rounded-2xl border border-border bg-card overflow-hidden">
                  {/* Module Header */}
                  <div className="flex items-center justify-between px-5 py-4 bg-muted/30">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-background shrink-0">
                        {moduleIndex + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">{mod.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {mod.lessonsList.length} lessons · {mod.estimatedTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <ul className="divide-y divide-border">
                    {mod.lessonsList.map((lesson, lessonIndex) => (
                      <li key={lesson.slug}>
                        <Link
                          href={`/learn/courses/${slug}/${mod.slug}/${lesson.slug}`}
                          className="flex items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-accent group"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                            {lessonIndex + 1}
                          </span>
                          <span className="flex-1 text-foreground group-hover:text-foreground/80 truncate">
                            {lesson.title}
                          </span>
                          <span className="text-xs text-muted-foreground shrink-0">{lesson.readingTime}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-warning" />
                Prerequisites
              </h3>
              <ul className="space-y-2">
                {course.prerequisites.map((prereq, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {course.tags.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Related Courses</h3>
              <ul className="space-y-3">
                {relatedCourses.map((rc) => (
                  <li key={rc.slug}>
                    <Link
                      href={`/learn/courses/${rc.slug}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <GraduationCap className="h-4 w-4 shrink-0" />
                      <span className="truncate">{rc.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
