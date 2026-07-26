"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-muted/20 py-24 sm:py-32 overflow-hidden relative">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            eyebrow="About"
            title="Quietly ambitious, deeply practical"
            description="I’m a design engineer focused on turning thoughtful ideas into polished, resilient experiences."
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-border bg-background p-8 sm:p-10 shadow-lg"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 0L33 27L60 30L33 33L30 60L27 33L0 30L27 27L30 0Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="relative z-10 space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p className="font-medium text-foreground">
              My work lives at the intersection of product thinking, system design, and frontend craftsmanship.
            </p>
            <p>
              I care about clarity over noise, structure over clutter, and interactions that feel both effortless and intentional. I believe that the best interfaces are the ones you don't even notice using.
            </p>
            <p>
              The goal is always the same: build something memorable, useful, and beautiful without making the experience feel overdesigned.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
