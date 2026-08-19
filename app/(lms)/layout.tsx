import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  BookOpen,
  GraduationCap,
  Route,
  Award,
  Bookmark,
  LayoutDashboard,
  BookText,
  Boxes,
  Target,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Metadata } from "next";

const sidebarLinks = [
  { href: "/learn", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn/domains", label: "Domains", icon: Boxes },
  { href: "/learn/skills", label: "Skills", icon: Target },
  { href: "/learn/courses", label: "Courses", icon: BookOpen },
  { href: "/learn/paths", label: "Learning Paths", icon: Route },
  { href: "/learn/badges", label: "Badges", icon: Award },
  { href: "/learn/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/learn/glossary", label: "Glossary", icon: BookText },
];
export const metadata: Metadata = {
  title: {
    default: "learn Kuldeep | Design Engineer & Writer",
    template: "%s | Kuldeep Blogs",
  },
  description: "A premium blog and portfolio for thoughtful design, frontend craft, and modern product storytelling.",
  metadataBase: new URL("https://kuldeepblogs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kuldeep Blogs",
    description: "Premium writing on design, frontend engineering, and product craft.",
    url: "https://kuldeepblogs.com",
    siteName: "Kuldeep Blogs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuldeep Blogs",
    description: "Premium writing on design, frontend engineering, and product craft.",
  },
};
/**
 * Layout for the /learn section.
 * Renders a sidebar on desktop and passes children as the main content area.
 */
export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-60 border-r border-sidebar-border bg-sidebar lg:block">
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="border-b border-sidebar-border px-5 py-4">
            <Link href="/learn" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <GraduationCap className="h-4.5 w-4.5 text-background" />
              </div>
              <div>
                <p className="text-sm font-semibold text-sidebar-foreground">KuldeepLearn</p>
                <p className="text-[10px] text-muted-foreground">Learning Platform</p>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Learning navigation">
            <ul className="space-y-1">
              {sidebarLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <link.icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-sidebar-border px-5 py-4">
             <ThemeToggle />
            <p className="text-[10px] text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.author.name}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <div className="sticky top-16 z-20 border-b border-border bg-background/80 backdrop-blur-lg lg:hidden">
        <nav className="flex overflow-x-auto px-4 py-2 gap-1 no-scrollbar" aria-label="Learning navigation">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="lg:pl-60">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
