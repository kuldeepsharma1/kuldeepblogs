"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Globe,
  Terminal,
  Zap,
  Activity,
  Code2,
  Layers,
  ChevronDown,
  Command,
  Workflow,
  Network,
  Lock,
  Cpu,
  FileCode2,
  Briefcase,
  Database,
  Layout,
  Server,
  Cloud,
  ArrowUpRight
} from "lucide-react";
import { EEATLocation } from "@/types/services";

// --- Types (Assuming these match your internal structures based on the JSON provided) ---
type AnyType = any;

// --- Helpers ---
function deepReplaceCity<T>(obj: T, cityName: string): T {
  if (typeof obj === "string") {
    return obj.replace(/\[City\]/gi, cityName).replace(/\[CITY\]/g, cityName) as any;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepReplaceCity(item, cityName)) as any;
  }
  if (obj !== null && typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = deepReplaceCity((obj as any)[key], cityName);
    }
    return newObj;
  }
  return obj;
}

// --- Animation Primitives ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Sub-Components ---

const HeroSection = ({ loc }: { loc: AnyType }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.9]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Dynamic Evolving Background */}
      <motion.div style={{ y: y1, opacity, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,78,216,0.15)_0%,transparent_50%)]" />
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-purple-900/20 blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
      </motion.div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Typographic Storytelling */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer} 
          className="lg:col-span-7 flex flex-col items-start"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">{loc.hero.badge}</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tighter text-white leading-[0.95] mb-8">
            {loc.hero.headline.split(' ').map((word: string, i: number) => (
              <span key={i} className={word.includes(loc.city) ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" : ""}>
                {word}{" "}
              </span>
            ))}
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl lg:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
            {loc.hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link href={loc.hero.primaryCTA.url} className="group relative inline-flex items-center justify-center px-8 py-5 bg-white text-black font-medium rounded-full overflow-hidden w-full sm:w-auto transition-transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                {loc.hero.primaryCTA.text}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Link>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
              <span>{loc.hero.proofPoints[0]}</span>
              <span className="w-1 h-1 bg-slate-700 rounded-full" />
              <span>{loc.hero.proofPoints[1]}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Abstract Engineering Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative h-[600px] hidden lg:block perspective-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.01] rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="h-12 border-b border-white/10 bg-black/40 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <div className="ml-4 text-[10px] font-mono text-slate-500 flex-1 text-center">edge-network-routing.ts</div>
            </div>
            <div className="flex-1 p-6 relative font-mono text-xs text-slate-400 overflow-hidden bg-[#0a0a0a]">
              {/* Simulated Code/Terminal output */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="space-y-4"
              >
                <div className="text-blue-400">{`> Initiating Next.js Edge Deployment...`}</div>
                <div className="text-emerald-400">{`✓ Validating ${loc.city} CDN nodes`}</div>
                <div className="text-purple-400">{`✓ Compiling Server Components`}</div>
                <div className="opacity-50">
                  {`[Wait] - Generating static pages (SSG)`}<br/>
                  {`[Wait] - Optimizing images for Core Web Vitals`}<br/>
                  {`[Done] - Route /api/v1/data hydrated`}
                </div>
                <div className="text-white mt-8">{`Deployed successfully to Edge Network.`}</div>
                <div className="flex items-center gap-2 mt-4 text-emerald-400">
                  <Activity className="w-4 h-4 animate-pulse" /> Global latency: &lt; 50ms
                </div>
              </motion.div>
              {/* Overlay abstract shape */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-600/20 to-transparent blur-2xl pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustArchitecture = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-black text-white border-t border-white/10 py-32 relative">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-24 items-start">
        {/* Left: Sticky Philosophy */}
        <div className="lg:sticky lg:top-40">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-slate-700" /> {loc.companyProfile.name}
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-8">
            {loc.companyProfile.mission}
          </h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed mb-12">
            {loc.companyProfile.remotePhilosophy}
          </p>
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-light text-white mb-2">{loc.trust.years}</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Enterprise Experience</div>
            </div>
            <div>
              <div className="text-3xl font-light text-white mb-2">{loc.trust.deliveryModel.split(' ')[0]}</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Delivery Model</div>
            </div>
          </div>
        </div>

        {/* Right: Trust Systems */}
        <div className="flex flex-col">
          {[
            { icon: Globe, title: "Timezone & Collaboration", desc: loc.trust.timezoneOverlap, sub: loc.trust.communication },
            { icon: ShieldCheck, title: "Security & Compliance", desc: loc.trust.security, sub: loc.trust.codeQuality },
            { icon: Lock, title: "IP & Ownership", desc: loc.trust.ownership, sub: loc.trust.ipProtection }
          ].map((item, i) => (
            <div key={i} className="group border-b border-white/10 py-12 last:border-0 relative">
              {/* Hover highlight */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -mx-8 px-8 rounded-2xl" />
              <div className="relative z-10 flex gap-8 items-start">
                <div className="mt-1 opacity-40 group-hover:opacity-100 group-hover:text-blue-400 transition-all duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-white text-slate-200 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-6">{item.desc}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                    {item.sub.substring(0, 50)}...
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChallengesInvestigation = ({ loc }: { loc: AnyType }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]); // Adjust based on number of items

  return (
    <section ref={containerRef} className="bg-[#050505] relative h-[400vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-white/10">
        <div className="absolute top-20 left-6 lg:left-12 z-20">
          <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-4">
            <span className="w-12 h-px bg-blue-500/50" /> Systemic Bottlenecks
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-white max-w-xl">
            {loc.cityInsights.whyBusinessesInvestInThisService}
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-6 lg:pl-[40vw] pr-24 items-center mt-32 w-max">
          {loc.businessChallenges.map((challenge: AnyType, i: number) => (
            <div key={challenge.id} className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[55vh] flex flex-col shrink-0">
              <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-colors">
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />
                
                <div>
                  <div className="text-[100px] font-light text-white/5 leading-none absolute top-4 right-8 pointer-events-none select-none">
                    0{i+1}
                  </div>
                  <h3 className="text-3xl font-medium text-white mb-6 relative z-10">{challenge.title}</h3>
                  <div className="grid grid-cols-2 gap-8 relative z-10">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">The Problem</div>
                      <p className="text-sm font-light text-slate-400 leading-relaxed">{challenge.problem}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-3">Business Impact</div>
                      <p className="text-sm font-light text-slate-400 leading-relaxed">{challenge.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/10 mt-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2">Architectural Solution</div>
                      <p className="text-sm font-medium text-white mb-3">{challenge.ourSolution}</p>
                      <div className="text-xs font-light text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> {challenge.expectedOutcome}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const EditorialServices = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-black text-white py-32 border-t border-white/10">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-3xl">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-slate-700" /> Core Capabilities
            </div>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
              {loc.whyService.keyAdvantage}
            </h2>
          </div>
          <p className="text-lg text-slate-400 font-light max-w-md leading-relaxed pb-2">
            {loc.whyService.description}
          </p>
        </div>

        {/* Asymmetrical Layout */}
        <div className="grid md:grid-cols-12 gap-4 auto-rows-min">
          {loc.services.map((svc: AnyType, i: number) => {
            // Determine grid span based on index to break standard card patterns
            let spanClass = "md:col-span-4";
            if (i === 0) spanClass = "md:col-span-8"; // Large hero feature
            else if (i === 3) spanClass = "md:col-span-12 flex flex-col md:flex-row"; // Full width split
            else if (i === 4) spanClass = "md:col-span-6";
            else if (i === 5) spanClass = "md:col-span-6";

            return (
              <div 
                key={svc.id} 
                className={`group bg-[#080808] border border-white/5 p-10 hover:bg-[#0c0c0c] transition-colors duration-500 rounded-3xl overflow-hidden relative ${spanClass}`}
              >
                {/* Subtle Hover Glow */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className={i === 3 ? "md:w-1/2 md:pr-12" : ""}>
                  <div className="text-[10px] font-mono text-slate-600 mb-8">{`// ${svc.id}`}</div>
                  <h3 className="text-2xl lg:text-3xl font-medium mb-6">{svc.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-10">
                    {svc.description}
                  </p>
                </div>
                
                <div className={`${i === 3 ? "md:w-1/2 md:border-l md:border-t-0 border-t border-white/10 md:pl-12 pt-8 md:pt-0" : "pt-8 border-t border-white/10"} flex flex-col justify-end`}>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Deliverables</div>
                  <ul className="space-y-3">
                    {svc.deliverables.map((del: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 font-light">
                        <span className="w-1 h-1 bg-white/20 rounded-full mt-2 shrink-0" />
                        {del}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ArchitectureGraph = ({ loc }: { loc: AnyType }) => {
  // We'll transform the technology array into a visual node graph
  return (
    <section className="bg-[#020202] py-32 border-t border-white/10 overflow-hidden relative">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-20">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-8 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-slate-700" /> Technology Stack <span className="w-12 h-px bg-slate-700" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6">
            The Composable Enterprise Core
          </h2>
          <p className="text-lg font-light text-slate-400">
            A cohesive ecosystem, not a list of logos. Every layer serves a specific performance mandate.
          </p>
        </div>

        {/* The Graph */}
        <div className="relative max-w-5xl mx-auto">
          {/* Abstract connections (SVG background) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
            <path d="M 150 100 Q 500 50, 850 100" fill="transparent" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 150 300 Q 500 350, 850 300" fill="transparent" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 500 50 Q 500 200, 500 350" fill="transparent" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {loc.technologyStack.map((tech: AnyType, i: number) => {
              // Map categories to distinct visual treatments
              const isCore = tech.category === "Framework" || tech.category === "Deployment";
              return (
                <div key={i} className={`group p-6 rounded-2xl bg-black/50 border ${isCore ? 'border-white/20' : 'border-white/5'} backdrop-blur-md hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-500 flex flex-col relative`}>
                  {isCore && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                  )}
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{tech.category}</div>
                  <h3 className="text-xl font-medium text-white mb-2">{tech.name}</h3>
                  <p className="text-xs font-light text-slate-400 leading-relaxed flex-1 mb-4">{tech.purpose}</p>
                  <div className="text-[10px] font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    + {tech.benefits.split(',')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessRoadmap = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-black text-white py-32 border-t border-white/10 relative">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 relative">
        
        <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
          <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-blue-500/50" /> Engineering Lifecycle
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-8">
            {loc.qualityAssurance.ciCd.split('.')[0]}.
          </h2>
          <p className="text-slate-400 font-light leading-relaxed mb-8">
            {loc.qualityAssurance.philosophy}
          </p>
          <div className="flex flex-col gap-4">
            {loc.qualityAssurance.testingTypes.map((test: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm font-mono text-slate-300 bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                <Command className="w-4 h-4 text-blue-400" /> {test}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 relative">
          {/* Central Axis Line */}
          <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          
          <div className="space-y-24">
            {loc.developmentProcess.map((step: AnyType, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative pl-20 lg:pl-32 group"
              >
                {/* Node */}
                <div className="absolute left-6 lg:left-12 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-black border-2 border-slate-600 group-hover:border-white group-hover:bg-white transition-all duration-500 z-10" />
                
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                  {step.stage} <span className="mx-2">|</span> {step.duration}
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">{step.objectives}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{step.activities}</p>
                
                <div className="bg-[#080808] border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-4">
                    <CheckCircle2 className="w-3 h-3" /> Quality Gates
                  </div>
                  <p className="text-sm text-slate-300 font-light mb-6">{step.qualityChecks}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.split(',').map((del: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/5 text-slate-300 text-xs font-medium rounded-md border border-white/5">
                        {del.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const EditorialIndustries = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-[#050505] text-white py-32 border-t border-white/10">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="mb-24">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-slate-700" /> {loc.cityInsights.majorIndustries.split(',')[0]} & Beyond
          </div>
          <h2 className="text-4xl lg:text-6xl font-medium tracking-tight max-w-4xl">
            {loc.cityInsights.businessLandscape}
          </h2>
        </div>

        <div className="flex flex-col">
          {loc.industrySolutions.map((ind: AnyType, i: number) => (
            <div key={i} className="group border-t border-white/10 py-16 flex flex-col lg:flex-row gap-12 lg:items-center hover:bg-white/[0.01] transition-colors -mx-6 px-6 lg:-mx-12 lg:px-12">
              <div className="lg:w-1/3">
                <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white/50 group-hover:text-white transition-colors duration-500 mb-4">
                  {ind.industry}
                </h3>
                <p className="text-sm font-light text-slate-500 leading-relaxed">
                  {ind.painPoints}
                </p>
              </div>

              <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">Target Architecture</div>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
                    {ind.recommendedArchitecture}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ind.technology.split(',').map((t: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-mono text-slate-500 border border-white/10 px-2 py-1 rounded">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-4">Outcomes</div>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {ind.expectedOutcomes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingMatrix = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-black text-white py-32 border-t border-white/10">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-8">
            Engagement Economics
          </h2>
          <p className="text-lg font-light text-slate-400">
            {loc.pricing.note}
          </p>
        </div>

        {/* Tabular/Matrix presentation instead of generic cards */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Headers */}
            <div className="grid grid-cols-4 gap-6 pb-8 border-b border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <div className="col-span-1">Architecture Profile</div>
              <div className="col-span-1">Timeline</div>
              <div className="col-span-1">Core Deliverables</div>
              <div className="col-span-1 text-right">Investment Target</div>
            </div>

            {/* Rows */}
            {loc.pricing.tiers.map((tier: AnyType, i: number) => (
              <div key={i} className="grid grid-cols-4 gap-6 py-12 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-start">
                <div className="col-span-1 pr-8">
                  <h3 className="text-xl font-medium mb-3">{tier.name}</h3>
                  <p className="text-xs font-light text-slate-400 leading-relaxed">{tier.idealFor}</p>
                </div>
                
                <div className="col-span-1">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock className="w-4 h-4 text-slate-500" /> {tier.timeline}
                  </div>
                </div>

                <div className="col-span-1 pr-8">
                  <ul className="space-y-3">
                    {tier.deliverables.map((d: string, idx: number) => (
                      <li key={idx} className="text-xs font-light text-slate-300 flex items-start gap-2">
                        <span className="w-1 h-1 bg-white/20 rounded-full mt-1.5 shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-1 text-right flex flex-col justify-between h-full">
                  <div className="text-2xl font-light tracking-tight mb-4">{tier.startingFrom}</div>
                  <Link href="/contact" className="inline-block text-[10px] font-mono text-blue-400 uppercase tracking-widest hover:text-white transition-colors">
                    Request Scope ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MinimalFAQ = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-[#050505] text-white py-32 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-medium tracking-tight mb-16">
          Architectural Inquiries
        </h2>
        <div className="space-y-2">
          {loc.faq.map((f: AnyType, i: number) => (
            <details key={i} className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center py-8 cursor-pointer select-none">
                <span className="text-xl font-light text-slate-200 group-hover:text-white transition-colors pr-8">
                  {f.question}
                </span>
                <span className="relative flex shrink-0 w-6 h-6 items-center justify-center">
                  <span className="absolute w-full h-px bg-slate-500 group-open:rotate-180 transition-transform duration-500" />
                  <span className="absolute h-full w-px bg-slate-500 group-open:rotate-90 transition-transform duration-500" />
                </span>
              </summary>
              <div className="pb-10 pt-2 text-slate-400 font-light leading-relaxed">
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="relative bg-black text-white min-h-[80vh] flex items-center justify-center overflow-hidden py-32 border-t border-white/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none mix-blend-screen" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-5xl md:text-[5rem] lg:text-[7rem] font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-[0.95] mb-8">
          Build Faster.
        </h2>
        <p className="text-xl font-light text-slate-400 mb-16 max-w-2xl leading-relaxed">
          {loc.companyProfile.mission}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href={loc.hero.primaryCTA.url} className="px-12 py-6 bg-white text-black font-medium rounded-full hover:scale-105 transition-all duration-500 flex items-center gap-3">
            {loc.hero.primaryCTA.text}
          </Link>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-left">
            <div>Node: {loc.city}</div>
            <div>Latency: &lt; 50ms</div>
            <div>Status: Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Page Export ---

export default function EEATLocationPage({ rawLoc, service }: { rawLoc: EEATLocation; service: AnyType; }) {
  // Compute city safely
  const cityName = rawLoc.location && !rawLoc.location.includes('[City]') 
    ? rawLoc.location 
    : rawLoc.slug.replace(/-a$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
  // Replace tokens in JSON dynamically
  const loc = deepReplaceCity(rawLoc, cityName);

  return (
    <main className="bg-black min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-100 scroll-smooth antialiased">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loc.schema.configuration) }} />

      {/* Minimalist Dark Breadcrumbs */}
      <div className="bg-transparent pt-32 pb-6 absolute top-0 left-0 w-full z-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <nav aria-label="Breadcrumb" className="flex items-center text-[10px] font-medium text-slate-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-3 text-slate-700">/</span>
            <Link href={`/services/${service.specialization}`} className="hover:text-white transition-colors">{service.shortTitle || "Services"}</Link>
            <span className="mx-3 text-slate-700">/</span>
            <span className="text-slate-200">{cityName}</span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {loc.companyProfile.name} Systems
          </div>
        </div>
      </div>

      <HeroSection loc={loc} />
      <TrustArchitecture loc={loc} />
      <ChallengesInvestigation loc={loc} />
      <EditorialServices loc={loc} />
      <ArchitectureGraph loc={loc} />
      <ProcessRoadmap loc={loc} />
      <EditorialIndustries loc={loc} />
      <PricingMatrix loc={loc} />
      <MinimalFAQ loc={loc} />
      <FinalCTA loc={loc} />
    </main>
  );
}