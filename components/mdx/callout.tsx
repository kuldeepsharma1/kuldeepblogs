import { cn } from "@/lib/cn";

interface CalloutProps {
  children: React.ReactNode;
  type?: "note" | "tip" | "warning";
}

export function Callout({ children, type = "note" }: CalloutProps) {
  const styles = {
    note: "border-zinc-300 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
    tip: "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200",
    warning: "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200",
  };

  return (
    <div className={cn("mt-8 rounded-2xl border p-5 text-base leading-7", styles[type])}>
      {children}
    </div>
  );
}
