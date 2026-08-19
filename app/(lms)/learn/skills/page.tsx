import Link from "next/link";
import { getAllSkills } from "@/lib/skills";
import { getAllDomains } from "@/lib/domains";
import { Target, ArrowRight, Clock, Boxes } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/types/learning";

export const metadata = {
  title: "Skills",
  description: "Master individual skills through targeted courses and learning paths.",
};

export default async function SkillsPage() {
  const skills = await getAllSkills();
  const domains = await getAllDomains();
  
  // Create a map to quickly look up domain titles
  const domainMap = domains.reduce((acc, domain) => {
    acc[domain.slug] = domain.title;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl flex items-center gap-2">
          <Target className="h-8 w-8 text-indigo-500" />
          Skills
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Skills are the building blocks of your career. Browse skills to find courses, paths, and badges that prove your expertise.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <Link
            key={skill.slug}
            href={`/learn/skills/${skill.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-foreground/20"
          >
            <div className="flex items-center justify-between mb-4">
              <Badge variant={skill.difficulty as Difficulty} size="sm">
                {skill.difficulty}
              </Badge>
              {skill.domain && domainMap[skill.domain] && (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  <Boxes className="h-3 w-3" />
                  {domainMap[skill.domain]}
                </span>
              )}
            </div>

            <h2 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
              {skill.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {skill.description}
            </p>

            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {skill.estimatedHours}
              </span>
              <span className="flex items-center gap-1.5 text-foreground font-medium ml-auto">
                View Skill <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Target className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No skills found</h2>
          <p className="mt-1 text-sm text-muted-foreground">Check back soon for targeted skills.</p>
        </div>
      )}
    </div>
  );
}
