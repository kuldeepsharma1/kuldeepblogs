"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Terminal,
  Globe2,
  Cpu,
  Zap,
  Shield,
  Layers,
  Database,
  Code2,
  Activity
} from "lucide-react";
import {
  SiNextdotjs,
  SiVercel,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiCloudflare
} from "react-icons/si";

/* -------------------------------------------------------------------------- */
/*  Types & Data Structures                                                   */
/* -------------------------------------------------------------------------- */
type AnyData = Record<string, any>;

interface EEATLocationPageProps {
  rawLoc: AnyData;
}

export default function EEATLocationPage({ rawLoc }: EEATLocationPageProps) {
  const data = rawLoc;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic Parallax Effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div 
      ref={containerRef} 
      className="bg-[#050507] text-white font-sans selection:bg-[#4F7CFF]/30 selection:text-white overflow-hidden"
    >
      
      {/* ================================================================ */}
      {/* SECTION 1: FULLSCREEN HERO (Dark)                                */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-6 lg:px-20 border-b border-white/[0.04]">
        {/* Architectural Background Grid & Lighting */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4F7CFF]/15 blur-[120px] pointer-events-none rounded-[100%]" />

        <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center relative z-10">
          
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-10">
              <span className="w-2 h-2 rounded-full bg-[#4F7CFF] animate-pulse" />
              <span className="text-[12px] font-mono text-zinc-300 tracking-widest uppercase">
                {data.hero?.badge?.text || "Enterprise Architecture"}
              </span>
            </div>

            <h1 className="text-[64px] sm:text-[80px] lg:text-[96px] font-extralight tracking-tighter leading-[1.05] mb-8 text-white">
              {data.hero?.headline}
            </h1>

            <p className="text-[18px] sm:text-[21px] text-zinc-400 font-light max-w-2xl mb-14 leading-relaxed">
              {data.hero?.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto">
              <Link 
                href={data.hero?.primaryCTA?.url || "/contact"} 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-[#050507] text-[15px] font-medium tracking-tight shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-400"
              >
                {data.hero?.primaryCTA?.text}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href={data.hero?.secondaryCTA?.url || "/case-studies"} 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-transparent border border-white/10 text-white text-[15px] font-medium hover:bg-white/5 transition-all duration-400"
              >
                {data.hero?.secondaryCTA?.text}
              </Link>
            </div>
            
            {/* Trust Bar */}
            <div className="mt-20 pt-10 border-t border-white/[0.06] w-full flex flex-wrap items-center gap-x-12 gap-y-6">
              {data.hero?.trustBar?.map((trust: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{trust.label}</span>
                  <span className="text-[13px] text-zinc-300 font-medium">{trust.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Engineering Console Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-square max-h-[650px] rounded-[32px] bg-[#090A0F]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
          >
            <div className="h-14 bg-white/[0.02] border-b border-white/[0.06] px-6 flex items-center justify-between">
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2 tracking-widest uppercase">
                <Terminal className="w-3.5 h-3.5 text-[#4F7CFF]" /> sys_monitor.tsx
              </div>
            </div>
            
            <div className="p-10 font-mono text-[13px] text-zinc-400 space-y-8 flex-1 flex flex-col">
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-zinc-300">
                  <span className="text-[#4F7CFF] font-bold">~</span>
                  <span>yarn build && next start</span>
                </div>
                <div className="pl-5 border-l border-white/[0.06] space-y-3">
                  <p className="flex items-center gap-3 text-[#22C55E]">
                    <Check className="w-4 h-4"/> Compiled Server Components
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">→</span> Revalidating Edge Cache (NYC_01)
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">→</span> Zero Layout Shift (CLS: 0.00)
                  </p>
                  <p className="flex items-center gap-3 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] animate-pulse" /> Deploying to global edge network...
                  </p>
                </div>
              </div>

              {/* Real-time Telemetry Dashboard */}
              <div className="mt-auto p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.06] grid grid-cols-3 gap-6">
                <div>
                  <div className="text-[10px] uppercase text-zinc-500 tracking-widest mb-2">Latency</div>
                  <div className="text-[28px] font-light text-white tracking-tighter">12<span className="text-[16px] text-zinc-500 ml-1">ms</span></div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-500 tracking-widest mb-2">Uptime</div>
                  <div className="text-[28px] font-light text-[#22C55E] tracking-tighter">99.9<span className="text-[16px] text-zinc-500 ml-1">%</span></div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-500 tracking-widest mb-2">Score</div>
                  <div className="text-[28px] font-light text-[#4F7CFF] tracking-tighter">100<span className="text-[16px] text-zinc-500 ml-1">/100</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 2: EDITORIAL METRICS (Light)                             */}
      {/* ================================================================ */}
      <section className="relative bg-zinc-50 text-[#050507] py-40 px-6 lg:px-20 rounded-t-[48px] -mt-[48px] z-20">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
            <div>
              <span className="text-[11px] font-mono font-semibold tracking-widest text-[#4F7CFF] uppercase mb-8 block">
                // {data.companyProfile?.company || "The Core Philosophy"}
              </span>
              <h2 className="text-[48px] lg:text-[72px] font-light tracking-tighter leading-[1.05]">
                {data.companyProfile?.mission.split('.')[0] + "." || "Engineered without compromise."}
              </h2>
            </div>
            <div>
              <p className="text-[21px] text-zinc-600 font-light leading-relaxed mb-4">
                {data.trust?.intro}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-12 lg:p-16 rounded-[32px] bg-white border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div className="text-[80px] lg:text-[100px] font-extralight text-[#050507] tracking-tighter mb-8 leading-none">99.9%</div>
              <div>
                <h3 className="text-[20px] font-medium mb-3">{data.results?.metrics?.[3]?.title || "High Availability"}</h3>
                <p className="text-[16px] text-zinc-500 font-light leading-relaxed">{data.results?.metrics?.[3]?.description || "Architected on globally distributed edge networks."}</p>
              </div>
            </div>

            <div className="p-12 lg:p-16 rounded-[32px] bg-white border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col justify-between md:-translate-y-12">
              <div className="text-[80px] lg:text-[100px] font-extralight text-[#4F7CFF] tracking-tighter mb-8 leading-none">&lt;50ms</div>
              <div>
                <h3 className="text-[20px] font-medium mb-3">{data.results?.metrics?.[0]?.title || "Global Latency"}</h3>
                <p className="text-[16px] text-zinc-500 font-light leading-relaxed">{data.results?.metrics?.[0]?.description || "Optimized server-side rendering and edge caching."}</p>
              </div>
            </div>

            <div className="p-12 lg:p-16 rounded-[32px] bg-white border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div className="text-[80px] lg:text-[100px] font-extralight text-[#050507] tracking-tighter mb-8 leading-none">100</div>
              <div>
                <h3 className="text-[20px] font-medium mb-3">{data.results?.metrics?.[1]?.title || "Technical SEO"}</h3>
                <p className="text-[16px] text-zinc-500 font-light leading-relaxed">{data.results?.metrics?.[1]?.description || "Perfect Core Web Vitals and search foundation."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 3: ENTERPRISE PROBLEMS (Dark & Sticky)                   */}
      {/* ================================================================ */}
      <section className="relative bg-[#090A0F] text-white py-40 px-6 lg:px-20 rounded-t-[48px] -mt-[48px] z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[4fr_6fr] gap-20 lg:gap-32 items-start">
          
          <div className="lg:sticky lg:top-40">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-8 block">
              // {data.businessChallenges?.title}
            </span>
            <h2 className="text-[48px] lg:text-[64px] font-light tracking-tighter leading-[1.05] mb-8">
              System friction we eliminate.
            </h2>
            <p className="text-[21px] text-zinc-400 font-light leading-relaxed mb-12">
              {data.businessChallenges?.intro}
            </p>
          </div>

          <div className="space-y-8">
            {data.businessChallenges?.items?.map((item: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="p-10 lg:p-14 rounded-[32px] bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-mono text-[#4F7CFF] uppercase tracking-widest">ERR_VECTOR_0{i+1}</span>
                </div>
                
                <h3 className="text-[28px] lg:text-[32px] font-light text-white mb-8 group-hover:text-zinc-200 transition-colors">
                  {item.problem}
                </h3>

                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/[0.06]">
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Business Impact</div>
                    <ul className="space-y-3">
                      {item.businessImpact?.map((impact: string, idx: number) => (
                        <li key={idx} className="text-[15px] text-zinc-400 font-light flex items-start gap-3">
                          <span className="text-zinc-600 mt-1">-</span> {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-[11px] font-mono text-[#22C55E] uppercase tracking-widest mb-4">Architecture Solution</div>
                    <ul className="space-y-3">
                      {item.ourApproach?.slice(0, 3).map((approach: string, idx: number) => (
                        <li key={idx} className="text-[15px] text-zinc-200 font-light flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                          {approach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 4: TECHNOLOGY ARCHITECTURE (Light)                       */}
      {/* ================================================================ */}
      <section className="relative bg-[#050507] text-white py-40 px-6 lg:px-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[#4F7CFF]/5 blur-[160px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            <div className="max-w-3xl">
              <span className="text-[11px] font-mono tracking-widest text-[#4F7CFF] uppercase mb-8 block">
                // {data.technicalExpertise?.title}
              </span>
              <h2 className="text-[48px] lg:text-[72px] font-light tracking-tighter leading-[1.05]">
                Built on elite infrastructure primitives.
              </h2>
            </div>
            <p className="text-[21px] text-zinc-400 font-light max-w-lg leading-relaxed">
              {data.technicalExpertise?.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.08] rounded-[40px] overflow-hidden border border-white/[0.08]">
            
            <div className="bg-[#090A0F] p-12 lg:p-16 group hover:bg-[#0c0d13] transition-colors duration-700">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-10 group-hover:bg-[#4F7CFF]/10 group-hover:border-[#4F7CFF]/30 transition-all duration-500">
                <Layers className="w-7 h-7 text-zinc-400 group-hover:text-[#4F7CFF] transition-colors" />
              </div>
              <h3 className="text-[28px] font-light mb-6">Frontend Engine</h3>
              <p className="text-[17px] text-zinc-400 font-light leading-relaxed mb-10">
                {data.technicalExpertise?.specializations?.[0]?.description}
              </p>
              <div className="flex flex-wrap gap-2 text-[12px] font-mono text-zinc-500">
                {data.technologyStack?.frontend?.map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]">{tech}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#090A0F] p-12 lg:p-16 group hover:bg-[#0c0d13] transition-colors duration-700">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-10 group-hover:bg-[#4F7CFF]/10 group-hover:border-[#4F7CFF]/30 transition-all duration-500">
                <Database className="w-7 h-7 text-zinc-400 group-hover:text-[#4F7CFF] transition-colors" />
              </div>
              <h3 className="text-[28px] font-light mb-6">Data Persistence</h3>
              <p className="text-[17px] text-zinc-400 font-light leading-relaxed mb-10">
                {data.technicalExpertise?.specializations?.[4]?.description || "Strictly typed schemas, connection pooling at the edge, and zero-latency relational queries."}
              </p>
              <div className="flex flex-wrap gap-2 text-[12px] font-mono text-zinc-500">
                {data.technologyStack?.database?.map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]">{tech}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#090A0F] p-12 lg:p-16 group hover:bg-[#0c0d13] transition-colors duration-700">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-10 group-hover:bg-[#4F7CFF]/10 group-hover:border-[#4F7CFF]/30 transition-all duration-500">
                <Zap className="w-7 h-7 text-zinc-400 group-hover:text-[#4F7CFF] transition-colors" />
              </div>
              <h3 className="text-[28px] font-light mb-6">Edge Topology</h3>
              <p className="text-[17px] text-zinc-400 font-light leading-relaxed mb-10">
                Automated Git-based deployment pipelines, instant rollback protection, and global edge caching infrastructure.
              </p>
              <div className="flex flex-wrap gap-2 text-[12px] font-mono text-zinc-500">
                {data.technologyStack?.deployment?.map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]">{tech}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 5: DEVELOPMENT PROCESS (Light Horizontal roadmap)        */}
      {/* ================================================================ */}
      <section className="relative bg-zinc-50 text-[#050507] py-40 px-6 lg:px-20 rounded-t-[48px] -mt-[48px] z-40">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="mb-32 max-w-4xl">
            <span className="text-[11px] font-mono tracking-widest text-[#4F7CFF] uppercase mb-8 block">
              // {data.developmentProcess?.title}
            </span>
            <h2 className="text-[48px] lg:text-[72px] font-light tracking-tighter leading-[1.05] mb-8">
              From architectural audit to production deployment.
            </h2>
            <p className="text-[21px] text-zinc-600 font-light leading-relaxed">
              {data.developmentProcess?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.developmentProcess?.steps?.slice(0,4).map((step: any, i: number) => (
              <div key={i} className="p-10 rounded-[32px] bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-shadow duration-500">
                <div>
                  <div className="text-[11px] font-mono text-zinc-400 mb-8 tracking-widest uppercase">Phase 0{step.step || i+1}</div>
                  <h3 className="text-[24px] font-medium text-[#050507] mb-4">{step.title}</h3>
                  <p className="text-[16px] text-zinc-600 font-light leading-relaxed mb-10">{step.goal}</p>
                </div>
                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between text-[#4F7CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[11px] font-mono tracking-widest uppercase">Verified</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 6: CASE STUDIES (Dark Magazine Style)                    */}
      {/* ================================================================ */}
      <section className="relative bg-[#090A0F] text-white py-40 px-6 lg:px-20 rounded-t-[48px] -mt-[48px] z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
            <div className="max-w-3xl">
              <span className="text-[11px] font-mono tracking-widest text-[#4F7CFF] uppercase mb-8 block">
                // {data.caseStudies?.title}
              </span>
              <h2 className="text-[48px] lg:text-[72px] font-light tracking-tighter leading-[1.05]">
                Proof of engineering.
              </h2>
            </div>
            <Link href="/case-studies" className="inline-flex items-center gap-3 text-[15px] font-medium text-white hover:text-[#4F7CFF] transition-colors pb-2 border-b border-white/20 hover:border-[#4F7CFF]">
              Access complete architecture logs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {data.caseStudies?.items?.map((study: any, i: number) => (
              <div key={i} className={`group cursor-pointer flex flex-col ${i % 2 !== 0 ? 'lg:mt-32' : ''}`}>
                <div className="aspect-[4/3] rounded-[32px] bg-zinc-900 overflow-hidden relative mb-10 border border-white/[0.08]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4F7CFF]/10 via-zinc-900 to-[#050507] group-hover:scale-105 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  <div className="absolute bottom-8 left-8 px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] text-white text-[12px] font-mono tracking-widest uppercase">
                    {study.industry}
                  </div>
                </div>

                <h3 className="text-[32px] lg:text-[40px] font-light text-white mb-6 group-hover:text-[#4F7CFF] transition-colors leading-[1.1]">
                  {study.challenge}
                </h3>

                <div className="space-y-4 pt-6 border-t border-white/[0.08]">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Measurable Outcomes</div>
                  {study.outcomes?.map((outcome: string, idx: number) => (
                    <p key={idx} className="text-[17px] text-zinc-400 font-light flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF]/50" />
                      {outcome}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 7: TECH STACK (Light Floating Logos)                     */}
      {/* ================================================================ */}
      <section className="relative bg-white text-[#050507] py-40 px-6 lg:px-20 rounded-t-[48px] -mt-[48px] z-50">
        <div className="max-w-[1600px] mx-auto text-center">
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-8 block">
            {data.technologyStack?.title || "Modern Stack"}
          </span>
          
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <SiNextdotjs className="w-16 h-16 lg:w-20 lg:h-20" />
            <SiReact className="w-16 h-16 lg:w-20 lg:h-20" />
            <SiTypescript className="w-16 h-16 lg:w-20 lg:h-20" />
            <SiTailwindcss className="w-16 h-16 lg:w-20 lg:h-20" />
            <SiVercel className="w-14 h-14 lg:w-16 lg:h-16" />
            <SiPostgresql className="w-16 h-16 lg:w-20 lg:h-20" />
            <SiDocker className="w-16 h-16 lg:w-20 lg:h-20" />
            <SiPrisma className="w-16 h-16 lg:w-20 lg:h-20" />
            <SiCloudflare className="w-16 h-16 lg:w-20 lg:h-20" />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 8: COMPARISON (Light Table)                              */}
      {/* ================================================================ */}
      <section className="relative bg-zinc-50 text-[#050507] py-32 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="mb-24 text-center">
            <h2 className="text-[48px] lg:text-[64px] font-light tracking-tighter">
              {data.comparison?.title}
            </h2>
          </div>

          <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-zinc-50 border-b border-zinc-200 p-8">
              <div className="text-[12px] font-mono tracking-widest uppercase text-zinc-500">Factor</div>
              <div className="text-[12px] font-mono tracking-widest uppercase text-[#050507] font-semibold">{data.companyProfile?.company}</div>
              <div className="text-[12px] font-mono tracking-widest uppercase text-zinc-500">Typical Agencies</div>
            </div>
            
            <div className="divide-y divide-zinc-100">
              {data.comparison?.comparisons?.map((comp: any, i: number) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 p-8 gap-6 md:gap-0 hover:bg-zinc-50/50 transition-colors">
                  <div className="text-[17px] font-medium text-[#050507]">{comp.topic}</div>
                  <div className="text-[16px] text-zinc-600 font-light pr-8 flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4F7CFF] shrink-0 mt-0.5" />
                    {comp.webmixstudio}
                  </div>
                  <div className="text-[16px] text-zinc-400 font-light pr-8">
                    {comp.alternative}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


    </div>
  );
}