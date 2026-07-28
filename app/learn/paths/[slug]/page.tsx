import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPaths, getPathBySlug } from "@/lib/paths";
import { getCourseBySlug } from "@/lib/courses";
import { getAllBadges } from "@/lib/badges";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Layers,
  Target,
} from "lucide-react";
import type { Difficulty, Course } from "@/types/learning";

export async function generateStaticParams() {
  const paths = await getAllPaths();
  return paths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = await getPathBySlug(slug);
  if (!path) return {};
  return { title: path.title, description: path.description };
}

export default async function PathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = await getPathBySlug(slug);
  if (!path) notFound();

  // Resolve courses in the path
  const coursesInPath = (
    await Promise.all(path.courses.map((cs) => getCourseBySlug(cs)))
  ).filter((c): c is Course => c !== null);

  // Resolve badges
  const allBadges = await getAllBadges();
  const pathBadges = allBadges.filter((b) => path.badges.includes(b.slug));

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Learn", href: "/learn" },
          { label: "Paths", href: "/learn/paths" },
          { label: path.title },
        ]}
      />

      {/* Hero */}
      <section className="learn-surface rounded-3xl border border-border p-8 sm:p-10">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={path.difficulty as Difficulty}>{path.difficulty}</Badge>
          <span className="text-sm text-muted-foreground">{path.category}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {path.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {path.description}
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {path.estimatedTime}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {path.courses.length} courses
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4" />
            {pathBadges.length} badges
          </span>
        </div>

        {/* Skills */}
        {path.skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {path.skills.map((skill) => (
              <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
            ))}
          </div>
        )}

        {coursesInPath.length > 0 && (
          <div className="mt-8">
            <Link
              href={`/learn/courses/${coursesInPath[0].slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
            >
              Start Learning Path
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Course Roadmap */}
      <section>
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
          <Target className="h-5 w-5 text-purple-500" />
          Courses in this Path
        </h2>

        <div className="space-y-4">
          {coursesInPath.map((course, index) => (
            <Link
              key={course.slug}
              href={`/learn/courses/${course.slug}`}
              className="group flex items-start gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-foreground/10"
            >
              {/* Order Number */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background">
                  {index + 1}
                </span>
                {index < coursesInPath.length - 1 && (
                  <div className="h-8 w-px bg-border" />
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={course.difficulty as Difficulty} size="sm">
                    {course.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{course.category}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                  {course.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {course.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
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

              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Badges */}
      {pathBadges.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-amber-500" />
            Badges You&apos;ll Earn
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {pathBadges.map((badge) => (
              <div
                key={badge.slug}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                  <Award className="h-7 w-7 text-muted-foreground" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{badge.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{badge.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
