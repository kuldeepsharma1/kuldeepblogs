"use client";

import { useState, } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Navbar } from "./Navbar";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Determine if we should show the glassmorphism background
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Determine if we should hide the header (scrolling down past 100px)
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed left-0 right-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? "bg-white/70 shadow-sm backdrop-blur-lg border-b border-neutral-200/50 dark:bg-neutral-950/70 dark:border-neutral-800/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6 lg:px-8">
        <Navbar />
      </div>
    </motion.header>
  );
}
