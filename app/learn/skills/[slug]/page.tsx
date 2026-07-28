import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSkills, getSkillBySlug, getSkillsBySlugs } from "@/lib/skills";
import { getDomainBySlug } from "@/lib/domains";
import { getCourseBySlug } from "@/lib/courses";
import { getPathBySlug } from "@/lib/paths";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, ArrowRight, BookOpen, Route, Boxes, Briefcase } from "lucide-react";
import type { Difficulty, Course, LearningPath } from "@/types/learning";

export async function generateStaticParams() {
  const skills = await getAllSkills();
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) return {};
  return { title: skill.title, description: skill.description };
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  
  if (!skill) notFound();

  // Resolve related content
  const domain = skill.domain ? await getDomainBySlug(skill.domain) : null;
  const relatedSkills = await getSkillsBySlugs(skill.relatedSkills);
  
  const relatedCourses = (
    await Promise.all(skill.relatedCourses.map((cs) => getCourseBySlug(cs)))
  ).filter((c): c is Course => c !== null);
  
  const relatedPaths = (
    await Promise.all(skill.relatedPaths.map((ps) => getPathBySlug(ps)))
  ).filter((p): p is LearningPath => p !== null);

  return (
    <div className="space-y-10">
      <Breadcrumb
        items={[
          { label: "Learn", href: "/learn" },
          { label: "Skills", href: "/learn/skills" },
          { label: skill.title },
        ]}
      />

      {/* Hero */}
      <section className="learn-surface rounded-3xl border border-border p-8 sm:p-12 relative">
        <div className="flex items-center gap-3 mb-5">
          <Badge variant={skill.difficulty as Difficulty}>{skill.difficulty}</Badge>
          {domain && (
            <Link href={`/learn/domains/${domain.slug}`} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
              <Boxes className="h-3.5 w-3.5" />
              {domain.title}
            </Link>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          {skill.title}
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
          {skill.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
          <span className="flex items-center gap-2 text-foreground font-medium">
            <Clock className="h-4.5 w-4.5 text-muted-foreground" />
            {skill.estimatedHours} to master
          </span>
          <span className="flex items-center gap-2 text-foreground font-medium">
            <BookOpen className="h-4.5 w-4.5 text-muted-foreground" />
            {relatedCourses.length} Courses
          </span>
          <span className="flex items-center gap-2 text-foreground font-medium">
            <Route className="h-4.5 w-4.5 text-muted-foreground" />
            {relatedPaths.length} Paths
          </span>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div className="space-y-10">
          
          {/* Why learn this skill? */}
          <section>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-amber-500" />
              Career Relevance
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">
              {skill.careerRelevance}
            </div>
          </section>

          {/* Courses */}
          {relatedCourses.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Learn {skill.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedCourses.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/learn/courses/${course.slug}`}
                    className="group rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-1 hover:border-foreground/20"
                  >
                    <Badge variant={course.difficulty as Difficulty} size="sm" className="mb-3">
                      {course.difficulty}
                    </Badge>
                    <h3 className="font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Paths */}
          {relatedPaths.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <Route className="h-5 w-5 text-purple-500" />
                Featured in Learning Paths
              </h2>
              <div className="grid gap-4">
                {relatedPaths.map((path) => (
                  <Link
                    key={path.slug}
                    href={`/learn/paths/${path.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md hover:border-foreground/20"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{path.estimatedTime} · {path.courses.length} courses</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {skill.prerequisites.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Prerequisites</h3>
              <ul className="space-y-3">
                {skill.prerequisites.map((prereq) => (
                  <li key={prereq} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedSkills.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Related Skills</h3>
              <div className="flex flex-wrap gap-2">
                {relatedSkills.map((rs) => (
                  <Link key={rs.slug} href={`/learn/skills/${rs.slug}`} className="text-xs font-medium bg-muted border border-border hover:bg-muted/80 text-foreground px-2.5 py-1.5 rounded-md transition-colors">
                    {rs.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
