import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllDomains, getDomainBySlug } from "@/lib/domains";
import { getSkillsBySlugs } from "@/lib/skills";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Boxes, Target, ArrowRight, BookOpen, Route } from "lucide-react";

export async function generateStaticParams() {
  const domains = await getAllDomains();
  return domains.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = await getDomainBySlug(slug);
  if (!domain) return {};
  return { title: domain.title, description: domain.description };
}

export default async function DomainDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = await getDomainBySlug(slug);
  
  if (!domain) notFound();

  const featuredSkills = await getSkillsBySlugs(domain.featuredSkills);

  return (
    <div className="space-y-10">
      <Breadcrumb
        items={[
          { label: "Learn", href: "/learn" },
          { label: "Domains", href: "/learn/domains" },
          { label: domain.title },
        ]}
      />

      {/* Hero */}
      <section className="learn-surface rounded-3xl border border-border p-8 sm:p-12 relative overflow-hidden">
        {/* Subtle background glow based on color theme */}
        <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-${domain.colorTheme || 'blue'}-500/10 blur-3xl`} />
        
        <div className="relative z-10 flex items-start gap-5 sm:gap-6">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-${domain.colorTheme || 'blue'}-500/10 border border-${domain.colorTheme || 'blue'}-500/20`}>
            <Boxes className={`h-8 w-8 text-${domain.colorTheme || 'blue'}-500`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {domain.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {domain.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-indigo-500" />
            Key Skills
          </h2>
          <Link href="/learn/skills" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            View all skills <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSkills.map((skill) => (
            <Link
              key={skill.slug}
              href={`/learn/skills/${skill.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-foreground/20"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                {skill.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {skill.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.relatedCourses.length > 0 && (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    <BookOpen className="h-3 w-3" />
                    {skill.relatedCourses.length} Courses
                  </span>
                )}
                {skill.relatedPaths.length > 0 && (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    <Route className="h-3 w-3" />
                    {skill.relatedPaths.length} Paths
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
