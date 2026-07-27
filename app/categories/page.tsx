import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import { Container } from "@/components/ui/container";

export const dynamic = "force-static";

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([getAllCategories(), getAllPosts()]);

  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="py-16">
        <Container className="space-y-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Categories</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              Explore the topics that shape the writing.
            </h1>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => {
              const categoryPosts = posts.filter((post) => post.category === category);
              return (
                <div key={category} className="rounded-4xl border border-zinc-200/80 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                  <Link href={`/categories?category=${encodeURIComponent(category)}`} className="text-2xl font-semibold text-zinc-950 transition-colors hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300">
                    {category}
                  </Link>
                  <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                    {categoryPosts.length} article{categoryPosts.length === 1 ? "" : "s"} in this collection.
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
}
