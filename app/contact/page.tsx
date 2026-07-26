import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink } from "@/components/ui/button-link";

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />
      <main className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              Reach out for collaborations or thoughtful conversations.
            </h1>
          </div>
          <div className="rounded-4xl border border-zinc-200/80 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              If you are working on a product, editorial experience, or design system with a strong focus on quality, I would love to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="mailto:hello@kuldeep.dev">Email me</ButtonLink>
              <ButtonLink href="https://github.com" variant="secondary">GitHub</ButtonLink>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
