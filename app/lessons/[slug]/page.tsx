import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllLessons, getLessonBySlug } from "@/lib/lessons";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink } from "@/components/ui/button-link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Callout } from "@/components/mdx/callout";
import { Tip } from "@/components/mdx/tip";
import { Warning } from "@/components/mdx/warning";
import { ImageFigure } from "@/components/mdx/image-figure";
import { Quiz } from "@/components/Quiz";

const components = {
  Callout,
  Tip,
  Warning,
  ImageFigure,
  h2: (props: React.ComponentProps<"h2">) => <h2 className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground" {...props} />,
  h3: (props: React.ComponentProps<"h3">) => <h3 className="mt-8 scroll-mt-24 text-xl font-semibold text-foreground" {...props} />,
  p: (props: React.ComponentProps<"p">) => <p className="mt-6 text-lg leading-8 text-muted-foreground" {...props} />,
  ul: (props: React.ComponentProps<"ul">) => <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-8 text-muted-foreground" {...props} />,
  ol: (props: React.ComponentProps<"ol">) => <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-muted-foreground" {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => <blockquote className="mt-8 border-l-2 border-border pl-5 text-xl italic text-muted-foreground" {...props} />,
  table: (props: React.ComponentProps<"table">) => <table className="mt-8 w-full overflow-hidden rounded-2xl border border-border text-left text-sm" {...props} />,
  th: (props: React.ComponentProps<"th">) => <th className="border-b border-border bg-muted/50 px-4 py-3 font-semibold text-foreground" {...props} />,
  td: (props: React.ComponentProps<"td">) => <td className="border-b border-border px-4 py-3 text-muted-foreground" {...props} />,
  a: (props: React.ComponentProps<"a">) => <a className="font-medium text-foreground underline decoration-muted-foreground underline-offset-4 hover:decoration-foreground transition-colors" {...props} />,
};

export async function generateStaticParams() {
  const lessons = await getAllLessons();
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) return {};

  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: `https://kuldeepblogs.com/lessons/${lesson.slug}` },
    openGraph: {
      title: lesson.title,
      description: lesson.description,
      type: "article",
      url: `https://kuldeepblogs.com/lessons/${lesson.slug}`,
      images: lesson.cover ? [{ url: lesson.cover, width: 1200, height: 630, alt: lesson.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.description,
      images: lesson.cover ? [lesson.cover] : [],
    },
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) notFound();

  const { content } = await compileMDX({
    source: lesson.content,
    options: { 
      mdxOptions: { 
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]]
      } 
    },
    components,
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <SiteHeader />
      <main>
        <article>
          <section className="border-b border-border py-16">
            <Container className="max-w-4xl pt-16">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Link href="/lessons" className="hover:text-foreground transition-colors">← Back to lessons</Link>
                {lesson.category && (
                  <>
                    <span>•</span>
                    <span>{lesson.category}</span>
                  </>
                )}
                {lesson.readingTime && (
                  <>
                    <span>•</span>
                    <span>{lesson.readingTime}</span>
                  </>
                )}
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
                {lesson.title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground font-light">{lesson.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{lesson.author}</span>
                <span>{new Date(lesson.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {lesson.updatedAt ? <span>Updated {new Date(lesson.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> : null}
              </div>
              {lesson.tags && lesson.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {lesson.tags.map((tag) => (
                    <Link key={tag} href={`/tags?tag=${encodeURIComponent(tag)}`} className="rounded-full border border-border bg-muted/20 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </Container>
          </section>

          <section className="py-20 relative">
            <Container className="grid gap-16 lg:grid-cols-[1fr_320px]">
              <div className="max-w-3xl min-w-0">
                {lesson.cover && (
                  <div className="overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-xl mb-16">
                    <Image src={lesson.cover} alt={lesson.imageAlt ?? lesson.title} width={1400} height={900} className="h-auto w-full object-cover" />
                  </div>
                )}
                
                <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-32 prose-h2:mt-12 prose-h3:mt-8 prose-p:text-lg prose-p:leading-8 prose-a:text-foreground prose-a:underline-offset-4 prose-a:decoration-muted-foreground hover:prose-a:decoration-foreground prose-strong:text-foreground prose-pre:!p-0 prose-pre:!bg-transparent prose-pre:!m-0 prose-code:before:hidden prose-code:after:hidden">
                  {content}
                </div>
                
                {lesson.quiz && lesson.quiz.length > 0 && (
                  <div className="mt-16 pt-12 border-t border-border">
                    <h2 className="text-3xl font-bold tracking-tight mb-8">Test Your Knowledge</h2>
                    <Quiz questions={lesson.quiz} />
                  </div>
                )}
              </div>
              
              <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start hidden lg:block">
                <div className="rounded-3xl border border-border bg-muted/10 p-6 backdrop-blur-xl">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Share</h2>
                  <div className="mt-5 flex flex-col gap-3">
                    <ButtonLink href="#" variant="secondary" className="w-full justify-center">Copy link</ButtonLink>
                    <ButtonLink href="#" variant="secondary" className="w-full justify-center">Share on X</ButtonLink>
                  </div>
                </div>
              </aside>
            </Container>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
