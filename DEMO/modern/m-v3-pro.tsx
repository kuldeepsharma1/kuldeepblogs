"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  GitCommit,
  Activity,
  ShieldCheck,
  Globe2,
  Database,
} from "lucide-react";
import { 
  SiNextdotjs, 
  SiVercel, 
} from "react-icons/si";

/* -------------------------------------------------------------------------- */
/*  Types & Data Structures                                                   */
/* -------------------------------------------------------------------------- */
type AnyData = Record<string, any>;

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
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="font-sans selection:bg-blue-500/30 selection:text-blue-900 bg-[#0B0B0C]">
      
      {/* ================================================================ */}
      {/* CHAPTER 1: INTRO (DARK - Immersive & Premium)                    */}
      {/* ================================================================ */}
      
      {/* 1. HERO */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden pt-32 pb-24 border-b border-white/5 bg-[#0B0B0C]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
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
              <Link href={data.hero?.primaryCTA?.url || "/contact"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black text-[15px] font-medium shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition-all duration-300">
                {data.hero?.primaryCTA?.text || "Initiate Project"}
              </Link>
              <Link href={data.hero?.secondaryCTA?.url || "/case-studies"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-transparent border border-white/15 text-zinc-300 text-[15px] font-medium hover:bg-white/5 hover:text-white transition-colors duration-300 group">
                {data.hero?.secondaryCTA?.text || "Review Architecture"}
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </FadeUp>
          </motion.div>

          <div className="hidden lg:block relative h-[600px] perspective-1000">
            <FadeIn delay={0.4} className="w-full h-full relative">
              <div className="absolute inset-0 bg-[#101114] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden z-20 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
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

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, type: "spring", stiffness: 100 }} className="absolute bottom-6 right-6 left-6 p-5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
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
                              <circle cx="24" cy="24" r="20" stroke="#34d399" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="0" />
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
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-2xl blur-2xl z-0 transform rotate-[-2deg]" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. TRUST & METRICS */}
      <section className="py-24 lg:py-32 bg-[#0B0B0C] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
            <FadeUp>
              <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-white leading-[1.1] mb-6">
                {data.companyProfile?.name || "Enterprise-Grade Engineering."}
              </h2>
              <p className="text-[18px] text-zinc-400 leading-relaxed font-light mb-8">
                {data.companyProfile?.mission || data.trust?.intro || "We integrate seamlessly with your in-house teams to deliver architecture that scales."}
              </p>
              <div className="space-y-6 border-t border-white/10 pt-8">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <span className="text-[15px] font-medium text-zinc-300">
                    {data.qualityStandards?.codeReview || "Strict Peer Review Process"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe2 className="w-5 h-5 text-blue-500" />
                  <span className="text-[15px] font-medium text-zinc-300">
                    {data.remoteDelivery?.communication || "Asynchronous Global Delivery"}
                  </span>
                </div>
              </div>
            </FadeUp>
            
            <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {data.trust?.trustSignals?.slice(0,4).map((signal: any, idx: number) => (
                <FadeUp key={idx} delay={idx * 0.1} className="bg-[#101114] p-10 lg:p-12 hover:bg-[#15161A] transition-colors duration-500">
                  <h3 className="text-[48px] font-light text-white mb-4 tracking-tighter">
                    {idx === 0 ? "99.9%" : idx === 1 ? "<50ms" : idx === 2 ? "Zero" : "100x"}
                  </h3>
                  <h4 className="text-[16px] font-medium text-zinc-200 mb-2">{signal.title}</h4>
                  <p className="text-[15px] text-zinc-500 leading-relaxed font-light">{signal.description}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CHAPTER 2: THE FRICTION (LIGHT - Clean, Readable, Editorial)     */}
      {/* ================================================================ */}
      <section className="bg-zinc-50 relative border-t border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 py-32">
          
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-40">
              <FadeUp>
                <span className="text-[12px] font-semibold tracking-[0.2em] text-blue-600 uppercase mb-6 block">
                  The Friction
                </span>
                <h2 className="text-[36px] md:text-[44px] font-medium tracking-tight leading-[1.1] text-zinc-900 mb-6">
                  {data.businessChallenges?.title}
                </h2>
                <p className="text-[18px] text-zinc-600 font-light leading-relaxed">
                  {data.businessChallenges?.intro}
                </p>
              </FadeUp>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {data.businessChallenges?.items?.map((item: any, i: number) => (
                <FadeUp key={i} delay={0.1} className="relative py-16 border-t border-zinc-200 first:border-0 first:pt-0">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[14px] font-mono text-zinc-400">0{i + 1}</span>
                        <h3 className="text-[24px] font-medium text-zinc-900">{item.problem}</h3>
                      </div>
                      <div className="space-y-3 pl-9">
                        {item.businessImpact?.map((impact: string, idx: number) => (
                          <p key={idx} className="text-[16px] text-zinc-600 font-light leading-relaxed">
                            {impact}
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-white rounded-xl p-8 border border-zinc-200 shadow-sm">
                      <h4 className="text-[13px] font-semibold text-zinc-900 uppercase tracking-widest mb-6">Our Resolution</h4>
                      <ul className="space-y-4">
                        {item.ourApproach?.map((approach: string, idx: number) => (
                          <li key={idx} className="flex gap-3 text-[15px] text-zinc-600 font-light leading-relaxed">
                            <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                            {approach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CHAPTER 3: ENGINEERING (DARK -> LIGHT TRANSITION)                */}
      {/* ================================================================ */}
      
      {/* 4. TECHNICAL EXPERTISE (Dark - Engineering Blueprint) */}
      <section className="py-32 bg-[#101114] text-white relative overflow-hidden border-t border-zinc-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-900/10 blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <FadeUp className="mb-20">
            <span className="text-[12px] font-medium tracking-[0.2em] text-zinc-400 uppercase mb-4 block">
              System Architecture
            </span>
            <h2 className="text-[36px] md:text-[44px] font-medium tracking-tight mb-6 max-w-2xl">
              {data.technicalExpertise?.title}
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-[#111317] p-12 group hover:bg-[#181A1F] transition-all duration-500">
              <SiNextdotjs className="w-8 h-8 mb-8 text-zinc-600 group-hover:text-white transition-colors" />
              <h3 className="text-[20px] font-medium mb-3">Application Layer</h3>
              <p className="text-[15px] text-zinc-400 font-light leading-relaxed mb-6">
                React Server Components, advanced caching topologies, and edge-rendered layouts.
              </p>
              <div className="text-[12px] font-mono text-zinc-500 group-hover:text-blue-400 transition-colors">
                {data.technologyStack?.frontend?.join(" • ") || "Next.js • React • Tailwind"}
              </div>
            </div>

            <div className="bg-[#111317] p-12 group hover:bg-[#181A1F] transition-all duration-500">
              <Database className="w-8 h-8 mb-8 text-zinc-600 group-hover:text-white transition-colors" />
              <h3 className="text-[20px] font-medium mb-3">Data Infrastructure</h3>
              <p className="text-[15px] text-zinc-400 font-light leading-relaxed mb-6">
                Multi-region relational databases, optimized ORMs, and strictly typed schemas.
              </p>
              <div className="text-[12px] font-mono text-zinc-500 group-hover:text-blue-400 transition-colors">
                {data.technologyStack?.database?.join(" • ") || "PostgreSQL • Prisma • Redis"}
              </div>
            </div>

            <div className="bg-[#111317] p-12 group hover:bg-[#181A1F] transition-all duration-500">
              <SiVercel className="w-8 h-8 mb-8 text-zinc-600 group-hover:text-white transition-colors" />
              <h3 className="text-[20px] font-medium mb-3">Deployment Topology</h3>
              <p className="text-[15px] text-zinc-400 font-light leading-relaxed mb-6">
                Automated CI/CD pipelines, instant rollbacks, and global edge network distribution.
              </p>
              <div className="text-[12px] font-mono text-zinc-500 group-hover:text-blue-400 transition-colors">
                {data.technologyStack?.deployment?.join(" • ") || "Vercel • AWS • Cloudflare"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEVELOPMENT PROCESS (Light - Elegant & Minimal) */}
      <section className="py-32 bg-white border-t border-zinc-200 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <FadeUp>
              <div className="lg:sticky lg:top-40">
                <span className="text-[12px] font-semibold tracking-[0.2em] text-blue-600 uppercase mb-6 block">
                  Methodology
                </span>
                <h2 className="text-[36px] md:text-[44px] font-medium tracking-tight mb-6 text-zinc-900">
                  {data.developmentProcess?.title}
                </h2>
                <p className="text-[18px] text-zinc-600 font-light leading-relaxed">
                  {data.developmentProcess?.description}
                </p>
              </div>
            </FadeUp>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-zinc-200 to-white" />

              <div className="flex flex-col gap-16">
                {data.developmentProcess?.steps?.map((step: any, i: number) => (
                  <FadeUp key={i} delay={i * 0.1} className="relative group">
                    <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-500 group-hover:bg-blue-500 transition-all duration-300 z-10" />
                    
                    <div className="flex flex-col md:flex-row gap-6 md:items-baseline mb-4">
                      <span className="text-[14px] font-mono text-zinc-400">v1.0.{step.step}</span>
                      <h3 className="text-[24px] font-medium text-zinc-900">{step.title}</h3>
                    </div>
                    
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8">
                      <p className="text-[16px] text-zinc-600 font-light leading-relaxed">
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

      {/* ================================================================ */}
      {/* CHAPTER 4: PROOF (LIGHT - Magazine Storytelling)                 */}
      {/* ================================================================ */}
      <section className="py-32 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <FadeUp className="max-w-2xl">
              <h2 className="text-[36px] md:text-[44px] font-medium tracking-tight mb-4 text-zinc-900">
                {data.caseStudies?.title || "Proof of Concept."}
              </h2>
              <p className="text-[18px] text-zinc-600 font-light leading-relaxed">
                {data.caseStudies?.description}
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-[14px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors group pb-1 border-b border-zinc-300 hover:border-zinc-900">
                Review all architecture logs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16">
            {data.caseStudies?.items?.map((study: any, i: number) => (
              <FadeUp key={i} delay={i * 0.1} className={i % 2 !== 0 ? "lg:mt-32" : ""}>
                <div className="group block cursor-pointer">
                  <div className="aspect-[4/3] bg-zinc-200 rounded-2xl mb-8 overflow-hidden relative shadow-sm border border-black/5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-100 to-zinc-200' : 'from-indigo-100 to-zinc-200'} group-hover:scale-105 transition-transform duration-700 ease-out`} />
                    
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      <span className="px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-lg text-zinc-900 text-[12px] font-medium border border-black/5">
                        {study.industry}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-[28px] font-medium text-zinc-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                    {study.challenge}
                  </h3>
                  
                  <div className="flex flex-col gap-4 border-l-2 border-zinc-200 pl-6 mb-8">
                    {study.outcomes?.map((outcome: string, idx: number) => (
                      <div key={idx} className="text-[16px] text-zinc-600 font-light">
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CHAPTER 5: CONCLUSION (DARK - Professional & Emotional)          */}
      {/* ================================================================ */}
      
      {/* 7. ENGAGEMENT MODELS */}
      <section className="py-32 bg-[#0B0B0C] border-t border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeUp className="mb-20 max-w-2xl">
            <span className="text-[12px] font-medium tracking-[0.2em] text-zinc-500 uppercase mb-4 block">
              Engagement
            </span>
            <h2 className="text-[36px] md:text-[44px] font-medium tracking-tight mb-6 text-white">
              {data.pricing?.title || "How we integrate."}
            </h2>
            <p className="text-[18px] text-zinc-400 font-light leading-relaxed">
              {data.pricing?.description}
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {data.pricing?.engagements?.map((engagement: any, i: number) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="h-full border-t border-white/10 pt-8 group hover:border-blue-500 transition-colors duration-500">
                  <h3 className="text-[20px] font-medium text-white mb-4">{engagement.name}</h3>
                  <p className="text-[15px] text-zinc-400 font-light leading-relaxed mb-8">
                    {engagement.purpose}
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-[14px] font-medium text-white group-hover:text-blue-400 transition-colors">
                    Discuss model <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


  

    </main>
  );
}