"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Writing", href: "/#writing" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-5 md:px-12",
        "bg-background/70 backdrop-blur-xl border-b border-border/30 transition-all duration-300",
        isMobileMenuOpen ? "bg-background border-transparent backdrop-blur-none" : ""
      )}>
        {/* Logo - Minimalist text only */}
        <Link 
          href="/" 
          className="relative z-50 text-[13px] font-semibold tracking-[0.25em] text-foreground uppercase hover:opacity-60 transition-opacity duration-300"
        >
          Kuldeep
        </Link>
        
        {/* Desktop Nav - Clean typographic links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="relative z-50 flex items-center gap-5">
          <ModeToggle />
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Minimalist full-screen fade */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="flex flex-col gap-8 w-full max-w-sm mx-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block text-3xl font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
