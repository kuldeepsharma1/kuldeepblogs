import Link from "next/link";
import { getAllCourses } from "@/lib/courses";
import { getAllPaths } from "@/lib/paths";
import { getAllBadges } from "@/lib/badges";
import {
  BookOpen,
  Route,
  Award,
  ArrowRight,
  Clock,
  Layers,
  TrendingUp,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/types/learning";

export const metadata = {
  title: "Learn | KuldeepLearn",
  description: "Your learning dashboard — continue learning, explore courses, and track your progress.",
};

export default async function LearnDashboard() {
  const [courses, paths, badges] = await Promise.all([
    getAllCourses(),
    getAllPaths(),
    getAllBadges(),
  ]);

  return (
    <div className="space-y-12">
      {/* Hero / Welcome */}
      <section className="learn-surface rounded-3xl border border-border p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground">
            <GraduationCap className="h-6 w-6 text-background" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Welcome to KuldeepLearn
            </h1>
            <p className="mt-2 max-w-xl text-base text-muted-foreground leading-relaxed">
              Master modern frontend development with interactive courses, hands-on quizzes, and
              structured learning paths. Start your journey today.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/learn/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/learn/paths"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-accent active:scale-[0.98]"
              >
                Explore Paths
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Courses", value: courses.length, icon: BookOpen, color: "text-blue-500" },
            { label: "Learning Paths", value: paths.length, icon: Route, color: "text-purple-500" },
            { label: "Badges Available", value: badges.length, icon: Award, color: "text-amber-500" },
            { label: "Total Lessons", value: "14+", icon: Layers, color: "text-emerald-500" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-surface-hover"
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <p className="mt-3 text-2xl font-bold tabular-nums text-foreground">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Featured Courses
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Handpicked courses to get you started</p>
          </div>
          <Link
            href="/learn/courses"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.filter((c) => c.featured).map((course) => (
            <Link
              key={course.slug}
              href={`/learn/courses/${course.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-foreground/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant={course.difficulty as Difficulty} size="sm">
                  {course.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground">{course.category}</span>
              </div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
                {course.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {course.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {course.estimatedTime}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" />
                  {course.modules.length} modules
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Learning Paths
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Structured learning journeys to level up</p>
          </div>
          <Link
            href="/learn/paths"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5">
          {paths.map((path) => (
            <Link
              key={path.slug}
              href={`/learn/paths/${path.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-foreground/10"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={path.difficulty as Difficulty} size="sm">
                      {path.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{path.category}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                    {path.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {path.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {path.courses.length} courses
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {path.estimatedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    {path.badges.length} badges
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Badges Preview */}
      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Earn Badges
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Complete courses and paths to earn skill badges</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {badges.map((badge) => (
            <Link
              key={badge.slug}
              href={`/learn/badges`}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted transition-transform group-hover:scale-110">
                <Award className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{badge.title}</h3>
              <Badge variant={badge.difficulty as Difficulty} size="sm" className="mt-2">
                {badge.difficulty}
              </Badge>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
