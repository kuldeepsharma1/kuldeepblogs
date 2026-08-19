"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Terminal,
  Activity,
  Layers,
  Command,
  Lock,
  ArrowUpRight,
  Plus,
  Minus,
  Database,
  Briefcase,
  Globe,
  Cpu,
  FileCode2,
  ChevronDown
} from "lucide-react";

// --- Types ---
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Structural Layout Primitives (50/50 Layouts) ---
const SplitSection = ({ 
  left, 
  right, 
  isDark = false, 
  reverseOnMobile = false 
}: { 
  left: React.ReactNode; 
  right: React.ReactNode; 
  isDark?: boolean;
  reverseOnMobile?: boolean;
}) => (
  <section className={`w-full ${isDark ? 'bg-[#050505] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'} border-b`}>
    <div className={`flex flex-col ${reverseOnMobile ? 'flex-col-reverse lg:flex-row' : 'lg:flex-row'} min-h-screen lg:min-h-0`}>
      <div className={`w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center lg:border-r ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="h-full">
          {left}
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="h-full">
          {right}
        </motion.div>
      </div>
    </div>
  </section>
);


// ==========================================
// CHAPTER 1: HERO (Light)
// ==========================================
const Chapter1Hero = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={false}
      left={
        <div className="flex flex-col justify-center max-w-2xl mx-auto lg:mx-0">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 mb-10 border border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-widest text-slate-700 rounded-full w-max shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-blue-600" /> {loc.hero.badge}
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[3.5rem] font-medium tracking-tighter leading-[1.05] mb-8 text-slate-900">
            {loc.hero.headline}
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg lg:text-xl text-slate-600 font-light leading-relaxed mb-12">
            {loc.hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link href={loc.hero.primaryCTA.url} className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 text-sm font-medium hover:bg-blue-600 transition-colors rounded-full shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto">
              {loc.hero.primaryCTA.text} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={loc.hero.secondaryCTA.url} className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 text-sm font-medium hover:bg-slate-50 transition-colors rounded-full w-full sm:w-auto">
              {loc.hero.secondaryCTA.text}
            </Link>
          </motion.div>
        </div>
      }
      right={
        <div className="flex flex-col justify-center h-full">
          {/* Reference to the specific image requested by user */}
          <motion.div variants={fadeUp} className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200 mb-12 shadow-2xl">
            <Image 
              src={loc.hero.heroImage?.src || "/image_8e5c5e.jpg"} 
              alt={loc.hero.heroImage?.alt || "image_8e5c5e.jpg"} 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>
          
          <motion.p variants={fadeUp} className="text-base text-slate-600 font-light leading-relaxed mb-10 max-w-xl">
            {loc.hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 border-t border-slate-200 pt-8">
            {loc.hero.proofPoints.map((point: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 text-xs font-mono text-slate-600 uppercase tracking-widest">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </span>
                <span>{point}</span>
              </div>
            ))}
          </motion.div>
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 2: TRUST & PROFILE (Dark)
// ==========================================
const Chapter2Trust = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={true}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" /> Corporate Profile
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-8">
            {loc.companyProfile.mission}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light leading-relaxed mb-12">
            {loc.companyProfile.remotePhilosophy}
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center gap-12 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-light text-white tracking-tighter mb-2">{loc.trust.years}</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Experience</div>
            </div>
            <div>
              <div className="text-3xl font-light text-white tracking-tighter mb-2">100%</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">IP Ownership</div>
            </div>
          </motion.div>
        </div>
      }
      right={
        <div className="flex flex-col gap-12">
          {[
            { title: "Delivery Model", desc: loc.trust.deliveryModel, meta: loc.trust.timezoneOverlap },
            { title: "Communication", desc: loc.trust.communication, meta: "Synchronous Overlap" },
            { title: "Security Protocols", desc: loc.trust.security, meta: loc.trust.codeQuality },
            { title: "Post-Launch SLA", desc: loc.trust.support, meta: loc.trust.ownership },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col border-b border-white/10 pb-12 last:border-0 last:pb-0">
              <h3 className="text-2xl font-medium text-slate-100 mb-4">{item.title}</h3>
              <p className="text-base text-slate-400 font-light leading-relaxed mb-6">
                {item.desc}
              </p>
              <div className=" flex flex-wrap items-center text-[10px] font-mono text-blue-300 uppercase tracking-widest   ">
                {item.meta}
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 3: MARKET & SYSTEMIC BOTTLENECKS (Light)
// ==========================================
const Chapter3Challenges = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={false}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-600" /> Market Context & Challenges
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-8">
            {loc.cityInsights.whyBusinessesInvestInThisService}
          </motion.h2>
          <motion.div variants={fadeUp} className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] shadow-sm mb-8">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Core Implication</div>
            <p className="text-base font-medium text-slate-900 leading-relaxed mb-4">{loc.marketOverview.implication}</p>
            <ul className="text-sm font-light text-slate-600 space-y-2 border-t border-slate-200 pt-4">
              <li>• {loc.marketOverview.dataPoint1}</li>
              <li>• {loc.marketOverview.dataPoint2}</li>
            </ul>
          </motion.div>
        </div>
      }
      right={
        <div className="flex flex-col gap-16">
          {loc.businessChallenges.map((challenge: AnyType, i: number) => (
            <motion.div key={challenge.id} variants={fadeUp} className="group flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-xs font-mono text-slate-500">0{i+1}</span>
                <h3 className="text-2xl font-medium text-slate-900">{challenge.title}</h3>
              </div>
              <div className="pl-12 border-l border-slate-200 ml-4 py-2">
                <div className="mb-6">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">The Friction</div>
                  <p className="text-base text-slate-600 font-light leading-relaxed">{challenge.problem}</p>
                </div>
                <div className="mb-8">
                  <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-2">Business Impact</div>
                  <p className="text-base text-slate-600 font-light leading-relaxed">{challenge.impact}</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm">
                  <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Architecture Solution
                  </div>
                  <p className="text-sm font-medium text-slate-900 mb-4">{challenge.ourSolution}</p>
                  <div className="border-t border-slate-100 pt-4 text-xs font-light text-emerald-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {challenge.expectedOutcome}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 4: CAPABILITIES (Dark)
// ==========================================
const Chapter4Services = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={true}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" /> Core Capabilities
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-8">
            {loc.whyService.keyAdvantage}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light leading-relaxed mb-12">
            {loc.whyService.description}
          </motion.p>
          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4">
            {loc.serviceBenefits.slice(0, 3).map((benefit: AnyType, i: number) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-light text-slate-200">{benefit.title}</span>
              </div>
            ))}
          </motion.div>
        </div>
      }
      right={
        <div className="flex flex-col gap-12">
          {loc.services.map((svc: AnyType, i: number) => (
            <motion.div key={svc.id} variants={fadeUp} className="bg-[#111] border border-white/10 p-8 lg:p-12 rounded-[2.5rem] hover:bg-[#151515] transition-colors">
              <div className="text-[10px] font-mono text-slate-500 mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-white">0{i+1}</span>
              </div>
              <h3 className="text-3xl font-medium text-slate-100 mb-6">{svc.title}</h3>
              <p className="text-base text-slate-400 font-light leading-relaxed mb-10">
                {svc.description}
              </p>
              <div className="border-t border-white/10 pt-6">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Deliverables</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {svc.deliverables.map((del: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" /> {del}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 5: TECHNOLOGY (Light)
// ==========================================
const Chapter5Technology = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={false}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-600" /> Architectural Stack
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-8">
            Precision engineering over plugin bloat.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-600 font-light leading-relaxed mb-12">
            The composable enterprise core. A cohesive ecosystem designed for absolute performance, SEO indexability, and unbounded scale.
          </motion.p>
        </div>
      }
      right={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loc.technologyStack.map((tech: AnyType, i: number) => (
            <motion.div key={i} variants={fadeUp} className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] hover:shadow-md hover:border-blue-200 transition-all">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{tech.category}</div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">{tech.name}</h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed mb-8 flex-1">{tech.purpose}</p>
              <div className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full inline-block">
                + {tech.benefits.split(',')[0]}
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 6: PROCESS (Dark)
// ==========================================
const Chapter6Process = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={true}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" /> Engineering Lifecycle
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-8">
            {loc.qualityAssurance.ciCd.split('.')[0]}.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light leading-relaxed mb-12">
            {loc.qualityAssurance.philosophy}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            {loc.qualityAssurance.testingTypes.map((test: string, i: number) => (
              <div key={i} className="flex items-center gap-4 text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-6 py-4 rounded-full">
                <Command className="w-4 h-4 text-blue-400" /> {test}
              </div>
            ))}
          </motion.div>
        </div>
      }
      right={
        <div className="flex flex-col gap-16 relative">
          {/* Vertical axis line */}
          <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-white/10 hidden sm:block" />
          
          {loc.developmentProcess.map((step: AnyType, i: number) => (
            <motion.div key={i} variants={fadeUp} className="relative sm:pl-16">
              <div className="absolute left-0 top-1 w-10 h-10 bg-[#050505] border-2 border-white/20 rounded-full hidden sm:flex items-center justify-center text-xs font-mono text-slate-400 z-10">
                {i+1}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">
                <span>{step.stage.split('. ')[1] || step.stage}</span>
                <span className="text-slate-500 border border-slate-700 px-2 py-1 rounded-full">{step.duration}</span>
              </div>
              <h3 className="text-2xl font-medium text-white mb-4">{step.objectives}</h3>
              <p className="text-base text-slate-400 font-light leading-relaxed mb-8">{step.activities}</p>
              
              <div className="bg-[#111] border border-white/10 p-8 rounded-[2rem]">
                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Roles</div>
                    <div className="text-sm font-medium text-slate-200">{step.responsibleRoles}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Tooling</div>
                    <div className="text-sm font-medium text-slate-200">{step.tools}</div>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Deliverables</div>
                  <div className="flex flex-col gap-3">
                    {step.deliverables.split(',').map((del: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-400 font-light">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" /> {del.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 7: SECTOR EXPERTISE (Light)
// ==========================================
const Chapter7Industries = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={false}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-600" /> Sector Expertise
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-8">
            {loc.cityInsights.businessLandscape}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-600 font-light leading-relaxed mb-12">
            Architectures tailored to specific regulatory, performance, and scaling demands.
          </motion.p>
        </div>
      }
      right={
        <div className="flex flex-col gap-12">
          {loc.industrySolutions.map((ind: AnyType, i: number) => (
            <motion.div key={i} variants={fadeUp} className="bg-slate-50 border border-slate-200 p-8 lg:p-12 rounded-[2.5rem]">
              <h3 className="text-3xl font-medium text-slate-900 mb-6">{ind.industry}</h3>
              <div className="mb-8">
                <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-2">Pain Points</div>
                <p className="text-base text-slate-600 font-light leading-relaxed">{ind.painPoints}</p>
              </div>
              <div className="mb-8">
                <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-2">Target Architecture</div>
                <p className="text-base text-slate-900 font-medium leading-relaxed">{ind.recommendedArchitecture}</p>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-6">
                {ind.technology.split(',').map((t: string, idx: number) => (
                  <span key={idx} className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                    {t.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 8: PRICING (Dark)
// ==========================================
const Chapter8Pricing = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={true}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" /> Engagement Economics
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-8">
            Transparent investment structures.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light leading-relaxed mb-12">
            {loc.pricing.note}
          </motion.p>
          <div className="flex flex-col gap-6">
            {loc.engagementModels.map((model: AnyType, i: number) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-[1.5rem]">
                <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2">{model.billing}</div>
                <h3 className="text-xl font-medium text-white mb-2">{model.title}</h3>
                <p className="text-sm font-light text-slate-400 mb-4">{model.description}</p>
                <div className="text-xs text-slate-300 font-mono">Best for: {model.bestFor}</div>
              </motion.div>
            ))}
          </div>
        </div>
      }
      right={
        <div className="flex flex-col gap-8">
          {loc.pricing.tiers.map((tier: AnyType, i: number) => (
            <motion.div key={i} variants={fadeUp} className="bg-[#111] border border-white/10 p-8 lg:p-12 rounded-[2.5rem]">
              <h3 className="text-3xl font-medium text-white mb-4">{tier.name}</h3>
              <p className="text-base text-slate-400 font-light mb-8">{tier.idealFor}</p>
              
              <div className="flex items-center gap-3 text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-max mb-10">
                <Clock className="w-4 h-4 text-blue-400" /> {tier.timeline}
              </div>

              <div className="border-t border-white/10 pt-8 mb-10">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Core Deliverables</div>
                <ul className="space-y-4">
                  {tier.deliverables.map((d: string, idx: number) => (
                    <li key={idx} className="text-sm font-light text-slate-300 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 mt-1.5" /> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Scope & Investment</div>
                  <div className="text-4xl font-light tracking-tight text-white">{tier.startingFrom}</div>
                </div>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">
                  Request Scope <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 9: PROOF & COMPARISON (Light)
// ==========================================
const Chapter9Proof = ({ loc }: { loc: AnyType }) => {
  return (
    <SplitSection 
      isDark={false}
      left={
        <div className="lg:sticky lg:top-32 max-w-xl">
          <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-600" /> Proof of Concept
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-8">
            Real-world architectural migrations and systemic impact.
          </motion.h2>
          
          <div className="space-y-12 border-t border-slate-200 pt-8 mt-12">
            <h3 className="text-2xl font-medium text-slate-900">Architecture Comparison</h3>
            {loc.comparison.slice(0, 3).map((comp: AnyType, idx: number) => (
              <motion.div key={idx} variants={fadeUp}>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{comp.topic}</div>
                <div className="grid sm:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 p-6 rounded-[2rem]">
                  <div>
                    <div className="text-xs font-medium text-emerald-600 mb-2">WebmixStudio</div>
                    <p className="text-sm text-slate-700 font-light">{comp.webmixStudio}</p>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                    <div className="text-xs font-medium text-red-500 mb-2">Alternative</div>
                    <p className="text-sm text-slate-500 font-light">{comp.alternative}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      }
      right={
        <div className="flex flex-col gap-12">
          {loc.caseStudies.map((caseStudy: AnyType, i: number) => (
            <motion.div key={i} variants={fadeUp} className="bg-white border border-slate-200 p-8 lg:p-12 rounded-[2.5rem] shadow-lg shadow-slate-100">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">{caseStudy.industry} / {caseStudy.timeline}</div>
              <h3 className="text-3xl font-medium text-slate-900 mb-8">{caseStudy.client}</h3>
              
              <div className="mb-8">
                <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-2">Legacy Bottleneck</div>
                <p className="text-base text-slate-600 font-light leading-relaxed">{caseStudy.problem}</p>
              </div>
              <div className="mb-10">
                <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-2">Next.js Implementation</div>
                <p className="text-base text-slate-600 font-light leading-relaxed">{caseStudy.solution}</p>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-[1.5rem]">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Performance Metrics</div>
                <ul className="space-y-3">
                  {caseStudy.results.map((res: string, idx: number) => (
                    <li key={idx} className="text-sm font-medium text-slate-900 flex items-center gap-3">
                      <Activity className="w-4 h-4 text-emerald-600" /> {res}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
};

// ==========================================
// CHAPTER 10: FAQ & FINAL CTA (Dark)
// ==========================================
const Chapter10CTA = ({ loc }: { loc: AnyType }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#000000] text-white border-t border-white/10 flex flex-col">
      {/* FAQ Portion */}
      <div className="w-full flex flex-col lg:flex-row border-b border-white/10">
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col lg:border-r border-white/10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="lg:sticky lg:top-32 max-w-xl">
            <motion.div variants={fadeUp} className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" /> Inquiries
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-8">
              Architectural Insights
            </motion.h2>
            <motion.div variants={fadeUp} className="bg-[#111] border border-white/10 p-8 rounded-[2rem] mt-12">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Coverage Area</div>
              <p className="text-lg font-medium text-white mb-2">{loc.coverageAreas.primary}</p>
              <p className="text-sm font-light text-slate-400 leading-relaxed mb-6">{loc.coverageAreas.description}</p>
              <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest bg-blue-900/20 border border-blue-500/20 px-4 py-2 rounded-full inline-block">
                {loc.coverageAreas.remoteAdvantage.split('by')[0] || "Premium remote engineering"}
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="border-t border-white/10">
            {loc.faq.map((f: AnyType, i: number) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-white/10">
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex justify-between items-center py-8 text-left focus:outline-none group"
                  >
                    <span className={`text-xl font-light pr-8 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {f.question}
                    </span>
                    <span className="relative flex shrink-0 w-8 h-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 group-hover:text-white transition-colors">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-base text-slate-400 font-light leading-relaxed max-w-2xl">
                          {f.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Massive CTA Portion (Strict JSON Usage) */}
      <div className="w-full py-32 lg:py-48 flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/5 text-[10px] font-mono text-slate-300 uppercase tracking-widest mb-12 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> {loc.companyProfile.name}
          </div>
          
          <h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-medium tracking-tighter leading-[0.95] mb-10 text-white">
            {loc.hero.headline}
          </h2>
          
          <p className="text-xl lg:text-3xl font-light text-slate-400 mb-16 max-w-3xl leading-relaxed">
            {loc.companyProfile.mission}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link href={loc.hero.primaryCTA.url} className="px-12 py-6 bg-white text-black text-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-3 rounded-full w-full sm:w-auto">
              {loc.hero.primaryCTA.text} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href={loc.hero.secondaryCTA.url} className="px-12 py-6 bg-transparent border border-white/20 text-white text-lg font-medium hover:bg-white/5 transition-colors rounded-full w-full sm:w-auto flex items-center justify-center">
              {loc.hero.secondaryCTA.text}
            </Link>
          </div>

          <div className="mt-32 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-slate-500 uppercase tracking-widest">
             <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4"/> {loc.reviewer.name} / {loc.reviewer.role}</div>
             <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> Node: {loc.city}</div>
             <div>Updated: {loc.author.lastUpdated}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// MAIN PAGE EXPORT
// ==========================================
export default function EEATLocationPage({ rawLoc, service }: { rawLoc: AnyType; service: AnyType; }) {
  const cityName = rawLoc.location && !rawLoc.location.includes('[City]') 
    ? rawLoc.location 
    : rawLoc.slug.replace(/-a$/, '').split('-').map((w:string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
  const loc = deepReplaceCity(rawLoc, cityName);

  return (
    <main className="bg-white min-h-screen text-slate-900 font-sans selection:bg-blue-500/30 selection:text-blue-900 scroll-smooth antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loc.schema.configuration) }} />

      {/* Navigation / Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-6 w-full z-50">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 flex justify-between items-center">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-slate-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span className="mx-3">/</span >
            <Link href={`/services/${service?.specialization || 'nextjs-development'}`} className="hover:text-slate-900 transition-colors">{service?.shortTitle || "Services"}</Link>
            <span className="mx-3">/</span >
            <span className="text-slate-900 font-bold">{cityName}</span>
          </nav>
          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            {loc.companyProfile.name}
          </div>
        </div>
      </div>

      {/* Alternating Light/Dark Chapters */}
      <Chapter1Hero loc={loc} />
      <Chapter2Trust loc={loc} />
      <Chapter3Challenges loc={loc} />
      <Chapter4Services loc={loc} />
      <Chapter5Technology loc={loc} />
      <Chapter6Process loc={loc} />
      <Chapter7Industries loc={loc} />
      <Chapter8Pricing loc={loc} />
      <Chapter9Proof loc={loc} />
      <Chapter10CTA loc={loc} />
      
    </main>
  );
}