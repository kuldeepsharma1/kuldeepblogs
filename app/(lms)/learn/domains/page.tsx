import Link from "next/link";
import { getAllDomains } from "@/lib/domains";
import { Boxes, ArrowRight, Clock, Target } from "lucide-react";

export const metadata = {
  title: "Domains",
  description: "Explore broad domains of knowledge like Frontend, Backend, and AI.",
};

export default async function DomainsPage() {
  const domains = await getAllDomains();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl flex items-center gap-2">
          <Boxes className="h-8 w-8 text-blue-500" />
          Domains
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Domains represent the highest level of knowledge categorization. Explore domains to discover skills, courses, and structured learning paths tailored to your career goals.
        </p>
      </div>

      {/* Domain Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {domains.map((domain) => (
          <Link
            key={domain.slug}
            href={`/learn/domains/${domain.slug}`}
            className="group flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-foreground/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground">
                <Boxes className="h-6 w-6 text-background" />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                <Clock className="h-3.5 w-3.5" />
                {domain.estimatedHours}
              </span>
            </div>

            <h2 className="text-xl font-bold text-foreground group-hover:text-foreground/80 transition-colors">
              {domain.title}
            </h2>
            <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
              {domain.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {domain.featuredSkills.slice(0, 3).map((skill) => (
                <span key={skill} className="text-xs font-medium bg-muted/50 border border-border px-2.5 py-1 rounded-md text-foreground">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center text-sm font-medium text-foreground">
              Explore Domain
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </div>
          </Link>
        ))}
      </div>

      {domains.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Boxes className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No domains found</h2>
          <p className="mt-1 text-sm text-muted-foreground">Check back soon for new content domains.</p>
        </div>
      )}
    </div>
  );
}
