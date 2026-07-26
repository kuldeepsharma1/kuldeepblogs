import Link from "next/link";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-static";

export default async function BlogPage() {
  const [posts, categories, tags] = await Promise.all([getAllPosts(), getAllCategories(), getAllTags()]);

  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />
      <main>
        <section className="border-b border-zinc-200/80 py-16 dark:border-zinc-800/80">
          <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Journal</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                Essays, notes, and deep dives on modern product engineering.
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                Explore practical writing on frontend systems, design quality, and the details that make digital experiences feel effortless.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/categories">Browse categories</ButtonLink>
              <ButtonLink href="/tags" variant="secondary">
                Explore tags
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container className="space-y-10">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories?category=${encodeURIComponent(category)}`}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-zinc-200/70 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {posts.map((post) => (
                <article key={post.slug} className="group overflow-hidden rounded-4xl border border-zinc-200/80 bg-white/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70">
                  <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img src={post.cover} alt={post.imageAlt ?? post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="block">
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 transition-colors hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">{post.description}</p>
                    <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                      <span>{post.author}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
