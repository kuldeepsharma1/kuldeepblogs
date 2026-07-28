import { getAllBadges } from "@/lib/badges";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import type { Difficulty } from "@/types/learning";

export const metadata = {
  title: "Badges",
  description: "Earn skill badges by completing courses and learning paths.",
};

export default async function BadgesPage() {
  const badges = await getAllBadges();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Skill Badges
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Demonstrate your skills by earning badges. Complete courses and paths to unlock them.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge) => (
          <div
            key={badge.slug}
            className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            {/* Badge Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted transition-transform group-hover:scale-110 group-hover:shadow-lg">
              <Award className="h-10 w-10 text-muted-foreground" />
            </div>

            {/* Badge Info */}
            <h3 className="mt-5 text-base font-semibold text-foreground">{badge.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {badge.description}
            </p>

            <Badge variant={badge.difficulty as Difficulty} size="sm" className="mt-4">
              {badge.difficulty}
            </Badge>

            {/* Skills */}
            {badge.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {badge.skills.map((skill) => (
                  <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                ))}
              </div>
            )}

            {/* Requirements */}
            {badge.requirements.length > 0 && (
              <div className="mt-5 w-full border-t border-border pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Requirements
                </p>
                <ul className="space-y-1.5">
                  {badge.requirements.map((req, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 shrink-0" />
                      {req.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {badges.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Award className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No badges yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Badges will appear here as courses are added.</p>
        </div>
      )}
    </div>
  );
}
