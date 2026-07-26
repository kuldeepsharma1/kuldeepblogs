import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-20 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">This page does not exist.</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          The article or page you are looking for may have moved, or it may never have existed. Return to the journal to continue exploring.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/blog" variant="secondary">Open the blog</ButtonLink>
        </div>
      </Container>
    </div>
  );
}
