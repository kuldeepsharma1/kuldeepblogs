import Link from "next/link";
import { getAllCourses } from "@/lib/courses";
import { CourseArtwork } from "@/components/learning/course-artwork";
import { Badge } from "@/components/ui/badge";
import { Clock, Layers, BookOpen, ArrowUpRight } from "lucide-react";
import type { Difficulty } from "@/types/learning";

export const metadata = {
  title: "Courses",
  description: "Browse all available courses on KuldeepLearn. Learn React, TypeScript, CSS, and more.",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Learning library
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Courses</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Practical tracks built to take you from concepts to confident work.
          </p>
        </div>
        <p className="text-sm tabular-nums text-muted-foreground">
          <span className="font-semibold text-foreground">{courses.length}</span> courses
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/learn/courses/${course.slug}`}
            className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CourseArtwork
              course={course}
              className="aspect-video w-full"
            />

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2">
                <Badge variant={course.difficulty as Difficulty} size="sm">
                  {course.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground">{course.category}</span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-foreground">
                {course.title}
              </h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {course.estimatedTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  {course.modules.length} modules
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No courses yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Check back soon for new courses.</p>
        </div>
      )}
    </div>
  );
}
