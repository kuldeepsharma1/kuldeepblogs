import Link from "next/link";
import { getAllTags, getAllPosts } from "@/lib/posts";
import { Container } from "@/components/ui/container";


export const dynamic = "force-static";

export default async function TagsPage() {
  const [tags, posts] = await Promise.all([getAllTags(), getAllPosts()]);

  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="py-16">
        <Container className="space-y-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Tags</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              Browse the themes and patterns that recur across the writing.
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => {
              const tagPosts = posts.filter((post) => post.tags.includes(tag));
              return (
                <Link
                  key={tag}
                  href={`/tags?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  #{tag} · {tagPosts.length}
                </Link>
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
}
