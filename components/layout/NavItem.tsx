import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function NavItem({ href, label, onClick, className }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
        isActive
          ? "text-neutral-900 dark:text-white"
          : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
