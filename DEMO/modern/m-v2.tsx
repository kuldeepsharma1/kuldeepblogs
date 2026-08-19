"use client";

import Link from "next/link";
import { motion, useScroll, useTransform,  } from "framer-motion";
import {
  ArrowRight,
  Check,
  GitCommit,
  Activity,
  Globe2,
} from "lucide-react";


/* -------------------------------------------------------------------------- */
/*  Types & Data Structures                                                   */
/* -------------------------------------------------------------------------- */
type AnyData = Record<string, unknown>;

interface EEATLocationPageProps {
  rawLoc: AnyData;
}

/* -------------------------------------------------------------------------- */
/*  Premium Motion Components                                                 */
/* -------------------------------------------------------------------------- */
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Main Page Component                                                       */
/* -------------------------------------------------------------------------- */
export default function EEATLocationPage({ rawLoc }: EEATLocationPageProps) {
  const data = rawLoc;
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for cinematic depth
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="bg-[#050505] min-h-screen text-zinc-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO: Cinematic Split-Screen & Technical Visualization          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden pt-32 pb-24 border-b border-white/5">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Subtle Spotlight */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
          
          {/* Left: Typography & Story */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-2xl">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[13px] font-medium mb-8 backdrop-blur-md">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </div>
                {data.localStrategy?.title || "Enterprise Next.js Architecture"}
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h1 className="text-[40px] leading-[1.05] md:text-[56px] lg:text-[64px] font-medium tracking-tight mb-8 text-white">
                {data.hero?.headline || "Engineering high-performance digital infrastructure."}
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-[18px] md:text-[20px] text-zinc-400 mb-12 leading-relaxed font-light">
                {data.hero?.subheadline || "We architect scalable, robust, and lightning-fast web applications for industry leaders demanding perfection."}
              </p>
            </FadeUp>
            
            <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center gap-5">
              <Link 
                href={data.hero?.primaryCTA?.url || "/contact"} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black text-[15px] font-medium shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-all duration-300"
              >
                {data.hero?.primaryCTA?.text || "Initiate Project"}
              </Link>
              <Link 
                href={data.hero?.secondaryCTA?.url || "/case-studies"} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-transparent border border-white/15 text-zinc-300 text-[15px] font-medium hover:bg-white/5 hover:text-white transition-colors duration-300 group"
              >
                {data.hero?.secondaryCTA?.text || "Review Architecture"}
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </FadeUp>
          </motion.div>

          {/* Right: Technical Visualization (Deployment Pipeline & Dashboard) */}
          <div className="hidden lg:block relative h-[600px] perspective-1000">
            <FadeIn delay={0.4} className="w-full h-full relative">
              {/* Main IDE/Terminal Window */}
              <div className="absolute inset-0 bg-[#0A0A0B] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden z-20 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
                {/* Window Header */}
                <div className="h-12 border-b border-white/10 bg-white/[0.02] flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                    <Globe2 className="w-3 h-3" /> production-deploy.yml
                  </div>
                </div>
                
                {/* Code Execution Area */}
                <div className="p-6 font-mono text-[13px] flex flex-col gap-5 relative h-full">
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center gap-3 text-zinc-400">
                    <GitCommit className="w-4 h-4 text-blue-500" />
                    <span>Analyzing dependencies... <span className="text-zinc-600">42ms</span></span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="flex items-center gap-3 text-zinc-400 pl-7 border-l border-white/5 ml-2">
                    <span className="text-zinc-600">→</span>
                    <span>Compiling Next.js Server Components</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }} className="flex items-center gap-3 text-zinc-400 pl-7 border-l border-white/5 ml-2">
                    <span className="text-zinc-600">→</span>
                    <span>Edge function deployment successful</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }} className="flex items-center gap-3 text-emerald-400 mt-2">
                    <Check className="w-4 h-4" />
                    <span>Deployment live across 14 regions.</span>
                  </motion.div>

                  {/* Floating Performance Metrics Component */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, type: "spring", stiffness: 100 }}
                    className="absolute bottom-6 right-6 left-6 p-5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-sans">Lighthouse Metrics</span>
                      <span className="text-[11px] text-emerald-400 font-sans flex items-center gap-1"><Activity className="w-3 h-3"/> Live</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      {[
                        { label: 'Performance', val: 100 },
                        { label: 'Accessibility', val: 100 },
                        { label: 'Best Practices', val: 100 },
                        { label: 'SEO', val: 100 }
                      ].map((metric, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div className="relative flex items-center justify-center w-12 h-12">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                              <circle cx="24" cy="24" r="20" stroke="#34d399" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="0" className="drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]" />
                            </svg>
                            <span className="absolute text-[12px] text-emerald-400 font-medium font-sans">{metric.val}</span>
                          </div>
                          <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-sans hidden sm:block">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative background glass layers */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl z-0 transform rotate-[-2deg]" />
              <div className="absolute top-10 -right-10 w-full h-full bg-[#111] rounded-2xl border border-white/5 z-10 transform rotate-[4deg]" />
            </FadeIn>
          </div>
        </div>
      </section>





      {/* ---------------------------------------------------------------- */}
      {/* 5. DEVELOPMENT PROCESS: Git-Branch Roadmap Visual                */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-zinc-950 border-y border-white/5 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <FadeUp>
              <div className="lg:sticky lg:top-40">
                <span className="text-[12px] font-medium tracking-[0.2em] text-blue-500 uppercase mb-6 block">
                  Methodology
                </span>
                <h2 className="text-[36px] md:text-[44px] font-medium tracking-tight mb-6">
                  {data.developmentProcess?.title}
                </h2>
                <p className="text-[18px] text-zinc-400 font-light leading-relaxed">
                  {data.developmentProcess?.description}
                </p>
              </div>
            </FadeUp>

            <div className="relative pl-8 md:pl-12">
              {/* The "Main Branch" Line */}
              <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-zinc-800 to-zinc-900" />

              <div className="flex flex-col gap-16">
                {data.developmentProcess?.steps?.map((step: any, i: number) => (
                  <FadeUp key={i} delay={i * 0.1} className="relative group">
                    {/* The "Commit" Node */}
                    <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-blue-500 group-hover:bg-blue-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 z-10" />
                    
                    {/* Branch line aesthetic */}
                    <div className="flex flex-col md:flex-row gap-6 md:items-baseline mb-4">
                      <span className="text-[14px] font-mono text-zinc-500">v1.0.{step.step}</span>
                      <h3 className="text-[24px] font-medium text-white">{step.title}</h3>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8 backdrop-blur-sm">
                      <p className="text-[16px] text-zinc-400 font-light leading-relaxed">
                        {step.goal}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>






    </main>
  );
}