import { BookmarksClient } from "./bookmarks-client";

export const metadata = {
  title: "Bookmarks",
  description: "Your saved courses, lessons, and resources.",
};

export default function BookmarksPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Bookmarks
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Your saved courses, lessons, and resources for quick access.
        </p>
      </div>

      <BookmarksClient />
    </div>
  );
}
