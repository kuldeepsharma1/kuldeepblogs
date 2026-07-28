import Link from "next/link";
import { getAllCourses } from "@/lib/courses";
import { Badge } from "@/components/ui/badge";
import { Clock, Layers, ArrowRight, BookOpen } from "lucide-react";
import type { Difficulty } from "@/types/learning";

export const metadata = {
  title: "Courses",
  description: "Browse all available courses on KuldeepLearn. Learn React, TypeScript, CSS, and more.",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Courses
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          {courses.length} courses available — from beginner to expert.
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/learn/courses/${course.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-foreground/10"
          >
            {/* Card Top Accent */}
            <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-1 flex-col p-6">
              {/* Meta */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={course.difficulty as Difficulty} size="sm">
                  {course.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground">{course.category}</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
                {course.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {course.description}
              </p>

              {/* Stats */}
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {course.estimatedTime}
                </span>
                <span className="flex items-center gap-1">
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
