export function Warning({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-base leading-7 text-amber-800 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200">{children}</div>;
}
