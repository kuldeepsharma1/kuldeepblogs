"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Example static categories for search UI demo
const searchCategories = [
  { label: "Blog Posts", type: "post" },
  { label: "Design Resources", type: "resource" },
  { label: "Tutorials", type: "tutorial" },
];

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/50 text-neutral-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950 md:w-auto md:justify-start md:px-3"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <span className="ml-2 hidden text-sm font-medium text-neutral-500 md:block dark:text-neutral-400">
          Search...
        </span>
        <kbd className="ml-4 hidden rounded border border-neutral-200 bg-neutral-100 px-1.5 font-mono text-[10px] font-medium text-neutral-500 md:block dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] sm:pt-[25vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm dark:bg-neutral-950/60"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="relative w-[95%] max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center border-b border-neutral-100 px-4 dark:border-neutral-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 text-neutral-400 dark:text-neutral-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search posts, resources, and more..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-4 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
                <kbd className="hidden rounded border border-neutral-200 bg-neutral-100 px-1.5 font-mono text-[10px] font-medium text-neutral-500 sm:block dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 md:max-h-[400px]">
                {query === "" ? (
                  <div className="space-y-4">
                    <p className="px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Quick Links
                    </p>
                    <div className="space-y-1">
                      {searchCategories.map((cat) => (
                        <button
                          key={cat.label}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
                        >
                          {cat.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4 opacity-50"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-14 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-neutral-400 dark:text-neutral-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      No results found
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      We couldn't find anything for "{query}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
