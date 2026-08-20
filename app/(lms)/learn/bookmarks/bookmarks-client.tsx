"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/config/learning";
import type { UserProgress } from "@/types/learning";
import { defaultUserProgress } from "@/config/learning";
import { Bookmark, BookOpen } from "lucide-react";
import Link from "next/link";

export function BookmarksClient() {
  const [progress] = useLocalStorage<UserProgress>(
    STORAGE_KEYS.PROGRESS,
    defaultUserProgress as unknown as UserProgress
  );

  const bookmarks = progress?.bookmarks ?? [];

  return (
    <>
      {bookmarks.length > 0 ? (
        <div className="grid gap-4">
          {bookmarks.map((bookmark) => (
            <Link
              key={`${bookmark.type}-${bookmark.slug}`}
              href={
                bookmark.type === "course"
                  ? `/learn/courses/${bookmark.slug}`
                  : bookmark.type === "path"
                  ? `/learn/paths/${bookmark.slug}`
                  : `/learn/courses/${bookmark.slug}`
              }
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted shrink-0">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{bookmark.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{bookmark.type}</p>
              </div>
              <p className="text-xs text-muted-foreground ml-auto shrink-0">
                {new Date(bookmark.addedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Bookmark className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No bookmarks yet</h2>
          <p className="mt-1 text-sm text-muted-foreground max-w-xs">
            Save courses and lessons for quick access. Bookmarks are stored locally in your browser.
          </p>
          <Link
            href="/learn/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </>
  );
}
