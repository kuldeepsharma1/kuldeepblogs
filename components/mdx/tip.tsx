export function Tip({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 text-base leading-7 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200">{children}</div>;
}
