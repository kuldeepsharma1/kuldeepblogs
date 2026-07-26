import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />
      <main className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">About</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              Writing for readers who care about craft.
            </h1>
          </div>
          <div className="rounded-4xl border border-zinc-200/80 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Kuldeep writes about the intersection of design, frontend engineering, and product clarity. The goal is not to chase every trend but to build durable, thoughtful systems that feel calm and effortless to use.
            </p>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              This publication focuses on practical ideas: architecture, usability, performance, and the subtle details that make software feel premium.
            </p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
