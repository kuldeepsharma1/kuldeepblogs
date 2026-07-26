import Link from "next/link";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col gap-6 py-12 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium">© {new Date().getFullYear()} Kuldeep. Crafted for calm, thoughtful reading.</p>
        <div className="flex items-center gap-6">
          <Link href="mailto:hello@kuldeep.dev" className="transition-colors hover:text-foreground">
            hello@kuldeep.dev
          </Link>
          <Link href="https://github.com" className="transition-colors hover:text-foreground">
            GitHub
          </Link>
          <Link href="https://twitter.com" className="transition-colors hover:text-foreground">
            Twitter
          </Link>
        </div>
      </Container>
    </footer>
  );
}
