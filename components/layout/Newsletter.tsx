"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <div className="w-full max-w-sm">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:bg-green-950/30 dark:text-green-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Thanks for subscribing! Check your inbox.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Subscribe to the newsletter"
                className={`w-full rounded-full border bg-neutral-50 px-5 py-3 pr-28 text-sm outline-none transition-all placeholder:text-neutral-400 focus:ring-2 focus:ring-offset-1 dark:bg-neutral-900/50 dark:placeholder:text-neutral-500 dark:focus:ring-offset-neutral-950 ${
                  status === "error"
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400 dark:border-red-900 dark:focus:border-red-800 dark:focus:ring-red-800"
                    : "border-neutral-200 focus:border-neutral-300 focus:ring-neutral-200 dark:border-neutral-800 dark:focus:border-neutral-700 dark:focus:ring-neutral-800"
                }`}
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1.5 flex h-9 items-center justify-center rounded-full bg-neutral-900 px-4 text-xs font-semibold text-white transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-70 dark:bg-white dark:text-neutral-900"
              >
                {status === "loading" ? (
                  <svg
                    className="h-4 w-4 animate-spin text-white dark:text-neutral-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="pl-4 text-xs font-medium text-red-500 dark:text-red-400"
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
