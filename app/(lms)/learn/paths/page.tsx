import Link from "next/link";
import { getAllPaths } from "@/lib/paths";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Award, Route } from "lucide-react";
import type { Difficulty } from "@/types/learning";

export const metadata = {
  title: "Learning Paths",
  description: "Structured learning journeys to become a production-ready developer.",
};

export default async function PathsPage() {
  const paths = await getAllPaths();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Learning Paths
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Curated learning journeys with courses, quizzes, and badges to earn.
        </p>
      </div>

      {/* Paths List */}
      <div className="grid gap-5">
        {paths.map((path) => (
          <Link
            key={path.slug}
            href={`/learn/paths/${path.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-foreground/10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={path.difficulty as Difficulty}>{path.difficulty}</Badge>
                  <span className="text-xs text-muted-foreground">{path.category}</span>
                </div>
                <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                  {path.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {path.description}
                </p>

                {/* Skills */}
                {path.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {path.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-5 text-sm text-muted-foreground sm:flex-col sm:items-end sm:gap-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  {path.courses.length} courses
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {path.estimatedTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  {path.badges.length} badges
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {paths.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Route className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No learning paths yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Check back soon for curated learning journeys.</p>
        </div>
      )}
    </div>
  );
}
