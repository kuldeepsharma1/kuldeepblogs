import Link from "next/link";
import { getAllLessons } from "@/lib/lessons";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-static";

export default async function LessonsPage() {
  const lessons = await getAllLessons();

  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />
      <main>
        <section className="border-b border-zinc-200/80 py-16 dark:border-zinc-800/80">
          <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Education</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                Interactive Lessons
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                Learn modern engineering practices with interactive quizzes and comprehensive guides.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container className="space-y-10">
            <div className="grid gap-6 lg:grid-cols-2">
              {lessons.map((lesson) => (
                <article key={lesson.slug} className="group overflow-hidden rounded-4xl border border-zinc-200/80 bg-white/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70 flex flex-col">
                  {lesson.cover && (
                    <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <img src={lesson.cover} alt={lesson.imageAlt ?? lesson.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                    </div>
                  )}
                  <div className="space-y-4 p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>{lesson.category || 'General'}</span>
                      {lesson.readingTime && (
                        <>
                          <span>•</span>
                          <span>{lesson.readingTime}</span>
                        </>
                      )}
                      {lesson.quiz && lesson.quiz.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Includes Quiz
                          </span>
                        </>
                      )}
                    </div>
                    <Link href={`/lessons/${lesson.slug}`} className="block">
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 transition-colors hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300">
                        {lesson.title}
                      </h2>
                    </Link>
                    <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300 flex-1">{lesson.description}</p>
                    <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                      <span>{lesson.author}</span>
                      <span>{new Date(lesson.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </article>
              ))}
              
              {lessons.length === 0 && (
                <div className="col-span-full py-12 text-center text-zinc-500">
                  <p>No lessons available yet. Check back soon!</p>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
