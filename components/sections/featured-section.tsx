"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Layers } from "lucide-react";

const writingItems = [
  {
    title: "Designing for calm in a noisy product landscape",
    meta: "Essay • 8 min read",
  },
  {
    title: "How structure reduces cognitive load in modern UIs",
    meta: "Writing • 6 min read",
  },
  {
    title: "A practical approach to accessible motion",
    meta: "Guide • 5 min read",
  },
];

const workItems = [
  {
    title: "Aether OS",
    description: "A premium desktop experience focused on clarity, hierarchy, and delight.",
  },
  {
    title: "Northstar Studio",
    description: "A design system foundation for product teams shipping at scale.",
  },
  {
    title: "Monarch Commerce",
    description: "A high-conversion editorial storefront with a refined content rhythm.",
  },
];

export function FeaturedSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-background">
      <Container className="grid gap-16 lg:grid-cols-2 relative z-10">
        
        {/* Writing Bento Box */}
        <motion.div 
          id="writing" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-[2rem] border border-border bg-muted/30 p-8 shadow-sm backdrop-blur-sm transition-all hover:bg-muted/50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-border/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-background border border-border shadow-sm">
              <BookOpen className="w-5 h-5 text-foreground" />
            </div>
            <SectionHeading
              title="Notes on interface craft"
              description="Short essays and practical thinking on design systems, product quality, and elegant frontends."
            />
          </div>

          <div className="space-y-3">
            {writingItems.map((item, i) => (
              <motion.article 
                key={item.title} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group/item flex items-center justify-between rounded-2xl border border-transparent p-4 transition-all hover:bg-background hover:border-border hover:shadow-sm cursor-pointer"
              >
                <div>
                  <h3 className="text-[15px] font-medium text-foreground group-hover/item:text-foreground transition-colors">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-background opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">
                   <ArrowUpRight className="w-4 h-4 text-foreground" />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Work Bento Box */}
        <motion.div 
          id="work" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-[2rem] border border-border bg-foreground text-background p-8 shadow-xl overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="p-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md">
              <Layers className="w-5 h-5 text-background" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-background">Builds shaped by restraint</h2>
              <p className="mt-2 text-[15px] text-background/70">A few projects where clarity, performance, and premium detail mattered most.</p>
            </div>
          </div>

          <div className="space-y-3 relative z-10">
            {workItems.map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group/item flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-background">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-background/70">{item.description}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 w-8 h-8 rounded-full bg-white text-foreground flex items-center justify-center sm:opacity-0 sm:-translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">
                   <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
