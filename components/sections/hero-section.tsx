"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero-surface relative overflow-hidden min-h-[90vh] flex items-center pt-20 border-b border-border">
      <Container className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full bg-accent text-foreground border border-border">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-widest uppercase">Design Engineer</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="mt-5 text-5xl font-semibold tracking-tighter text-foreground sm:text-6xl lg:text-7xl leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Crafting <span className="aurora-text">thoughtful</span> <br />
            interfaces with clarity.
          </motion.h1>
          
          <motion.p 
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            I write about product design, frontend systems, and the craft of building calm digital experiences that feel as good as they look.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ButtonLink href="#writing" className="group flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all hover:scale-105 active:scale-95 bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-black/10 dark:shadow-white/10">
              Read the journal
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#work" variant="secondary" className="rounded-full px-6 py-3 font-medium transition-all hover:bg-accent border border-transparent hover:border-border">
              View selected work
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div 
          className="relative lg:ml-auto w-full max-w-md aspect-square"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-white dark:from-zinc-900 dark:to-black rounded-3xl transform rotate-3 scale-[0.95] border border-border shadow-2xl transition-transform hover:rotate-0 hover:scale-100 duration-500 ease-out z-0"></div>
          
          <div className="glass relative rounded-3xl p-8 shadow-xl h-full flex flex-col justify-between z-10 group transition-all duration-500 hover:shadow-2xl hover:border-foreground/20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Current Focus
              </p>
              <ul className="space-y-5 text-sm leading-relaxed text-foreground font-medium">
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  <span>Designing resilient design systems with accessible patterns.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  <span>Building performant, static-first experiences that ship fast.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  <span>Writing about the details that make interfaces feel effortless.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-8 flex items-center justify-between border-t border-border opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-mono text-muted-foreground">STATUS</span>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for work
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
