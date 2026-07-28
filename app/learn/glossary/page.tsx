import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { BookText } from "lucide-react";

export const metadata = {
  title: "Glossary",
  description: "A glossary of key terms and concepts used across KuldeepLearn courses.",
};

interface GlossaryEntry {
  term: string;
  slug: string;
  definition: string;
  category?: string;
}

async function getGlossary(): Promise<GlossaryEntry[]> {
  const dir = path.join(process.cwd(), "content", "glossary");
  try {
    const files = await fs.readdir(dir);
    const entries = await Promise.all(
      files
        .filter((f) => f.endsWith(".mdx"))
        .map(async (f) => {
          const raw = await fs.readFile(path.join(dir, f), "utf8");
          const { data } = matter(raw);
          return {
            term: data.term ?? "",
            slug: data.slug ?? path.basename(f, ".mdx"),
            definition: data.definition ?? "",
            category: data.category,
          } as GlossaryEntry;
        })
    );
    return entries.sort((a, b) => a.term.localeCompare(b.term));
  } catch {
    return [];
  }
}

export default async function GlossaryPage() {
  const entries = await getGlossary();

  // Group by first letter
  const grouped = entries.reduce<Record<string, GlossaryEntry[]>>((acc, entry) => {
    const letter = entry.term[0]?.toUpperCase() ?? "#";
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(entry);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Glossary
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Key terms and concepts used across courses.
        </p>
      </div>

      {/* Letter Navigation */}
      {letters.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {/* Entries */}
      <div className="space-y-8">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2 mb-4">
              {letter}
            </h2>
            <dl className="space-y-4">
              {grouped[letter].map((entry) => (
                <div key={entry.slug} className="rounded-xl border border-border bg-card p-5">
                  <dt className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {entry.term}
                    {entry.category && (
                      <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {entry.category}
                      </span>
                    )}
                  </dt>
                  <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {entry.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookText className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No glossary entries yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Terms will appear here as content is added.</p>
        </div>
      )}
    </div>
  );
}
