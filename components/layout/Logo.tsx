import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group relative flex items-center gap-2 rounded-lg outline-none transition-all focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
      aria-label="Home"
    >
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-neutral-900 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-active:scale-95 dark:bg-white dark:text-neutral-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        Kuldeep
      </span>
    </Link>
  );
}
