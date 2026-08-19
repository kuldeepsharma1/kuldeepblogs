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
  FileCode2
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

// --- Structural Layout Primitives (Strict 50/50 no-waste grid) ---
const SplitRow = ({ 
  left, 
  right, 
  isDark = false, 
  className = "" 
}: { 
  left: React.ReactNode; 
  right: React.ReactNode; 
  isDark?: boolean;
  className?: string;
}) => (
  <div className={`flex flex-col lg:flex-row border-b ${isDark ? 'border-white/10' : 'border-slate-200'} ${className}`}>
    <div className={`w-full lg:w-1/2 p-8 lg:p-16 lg:border-r ${isDark ? 'border-white/10' : 'border-slate-200'} flex flex-col justify-center`}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {left}
      </motion.div>
    </div>
    <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {right}
      </motion.div>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle, isDark = false }: { title: string; subtitle?: string; isDark?: boolean }) => (
  <div className={`p-8 lg:p-16 border-b ${isDark ? 'border-white/10 bg-[#000000]' : 'border-slate-200 bg-white'}`}>
    <h2 className={`text-4xl lg:text-6xl font-medium tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg lg:text-xl font-light max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);


// ==========================================
// CHAPTER 1: HERO (Light)
// ==========================================
const Chapter1Hero = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-white text-slate-900 border-b border-slate-200 pt-20">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8 lg:p-16 lg:border-r border-slate-200 flex flex-col justify-center min-h-[80vh]">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-slate-200 bg-slate-50 w-max text-xs font-mono uppercase tracking-widest text-slate-600 rounded-none">
            <MapPin className="w-3 h-3 text-blue-600" /> {loc.hero.badge}
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-medium tracking-tighter leading-[0.95] mb-8">
            {loc.hero.headline}
          </h1>
          
          <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 max-w-xl">
            {loc.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link href={loc.hero.primaryCTA.url} className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 text-sm font-medium hover:bg-blue-600 transition-colors rounded-none">
              {loc.hero.primaryCTA.text} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={loc.hero.secondaryCTA.url} className="inline-flex items-center gap-2 bg-transparent text-slate-900 border border-slate-200 px-8 py-4 text-sm font-medium hover:bg-slate-50 transition-colors rounded-none">
              {loc.hero.secondaryCTA.text}
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-slate-50 flex flex-col justify-center">
          <div className="mb-12 relative w-full aspect-video border border-slate-200 bg-slate-100 overflow-hidden">
             {loc.hero.heroImage?.src && (
               <Image 
                 src={loc.hero.heroImage.src} 
                 alt={loc.hero.heroImage.alt || "Architecture"} 
                 fill 
                 className="object-cover opacity-90 mix-blend-multiply grayscale"
               />
             )}
          </div>
          
          <p className="text-base text-slate-600 font-light leading-relaxed mb-12">
            {loc.hero.description}
          </p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-slate-200 pt-8">
            {loc.hero.proofPoints.map((point: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 2: TRUST & PROFILE (Dark)
// ==========================================
const Chapter2Trust = ({ loc }: { loc: AnyType }) => {
  const trustKeys = [
    { k: "Experience", v: loc.trust.experience },
    { k: "Delivery Model", v: loc.trust.deliveryModel },
    { k: "Communication", v: loc.trust.communication },
    { k: "Timezone", v: loc.trust.timezoneOverlap },
    { k: "Ownership", v: loc.trust.ownership },
    { k: "IP Protection", v: loc.trust.ipProtection },
    { k: "Security", v: loc.trust.security },
    { k: "Code Quality", v: loc.trust.codeQuality },
    { k: "Support", v: loc.trust.support },
  ];

  return (
    <section className="bg-[#050505] text-white border-b border-white/10">
      <SectionHeader title={loc.companyProfile.mission} subtitle={loc.companyProfile.remotePhilosophy} isDark={true} />
      
      {/* 50/50 Grid for Trust Points */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {trustKeys.map((item, idx) => (
          <div key={idx} className={`p-8 lg:p-12 border-b border-white/10 ${idx % 2 === 0 ? 'lg:border-r' : ''}`}>
            <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">
              {item.k}
            </div>
            <p className="text-base text-slate-400 font-light leading-relaxed">
              {item.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 3: MARKET & INSIGHTS (Light)
// ==========================================
const Chapter3Market = ({ loc }: { loc: AnyType }) => {
  const insights = [
    { k: "Ecosystem", v: loc.cityInsights.technologyEcosystem },
    { k: "Industries", v: loc.cityInsights.majorIndustries },
    { k: "Landscape", v: loc.cityInsights.businessLandscape },
    { k: "Adoption", v: loc.cityInsights.digitalAdoption },
    { k: "Startups", v: loc.cityInsights.startupEcosystem },
    { k: "Company Sizes", v: loc.cityInsights.commonCompanySizes },
    { k: "Opportunities", v: loc.cityInsights.marketOpportunities },
  ];

  return (
    <section className="bg-white text-slate-900 border-b border-slate-200">
      <SplitRow 
        left={
          <>
            <h2 className="text-4xl font-medium tracking-tight mb-8">Market Overview</h2>
            <p className="text-lg text-slate-600 font-light mb-8">{loc.cityInsights.cityOverview}</p>
            <div className="bg-slate-50 p-6 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Trend Analysis</div>
              <p className="text-sm font-medium text-slate-900 mb-4">{loc.marketOverview.trend}</p>
              <ul className="space-y-2 text-sm text-slate-600 font-light">
                <li>• {loc.marketOverview.dataPoint1}</li>
                <li>• {loc.marketOverview.dataPoint2}</li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-red-600">
                Implication: {loc.marketOverview.implication}
              </div>
            </div>
          </>
        }
        right={
          <div className="grid grid-cols-1 gap-8">
            {insights.map((item, i) => (
              <div key={i}>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">{item.k}</div>
                <p className="text-sm text-slate-700 font-light leading-relaxed">{item.v}</p>
              </div>
            ))}
          </div>
        }
      />
    </section>
  );
};

// ==========================================
// CHAPTER 4: CHALLENGES (Dark)
// ==========================================
const Chapter4Challenges = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-[#050505] text-white border-b border-white/10">
      <SectionHeader title={loc.cityInsights.whyBusinessesInvestInThisService} isDark={true} />
      
      <div className="flex flex-col">
        {loc.businessChallenges.map((challenge: AnyType, i: number) => (
          <SplitRow 
            key={challenge.id}
            isDark={true}
            left={
              <div className="pr-0 lg:pr-8">
                <div className="text-[10px] font-mono text-slate-500 mb-4">0{i+1} // {challenge.id}</div>
                <h3 className="text-3xl font-medium text-slate-100 mb-6">{challenge.title}</h3>
                <div className="mb-6">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">The Friction</div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{challenge.problem}</p>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-2">Business Impact</div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{challenge.impact}</p>
                </div>
              </div>
            }
            right={
              <div className="bg-[#111] border border-white/10 p-8 rounded-none h-full flex flex-col justify-center">
                <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers className="w-3 h-3" /> Target Architecture
                </div>
                <p className="text-lg text-slate-200 font-light leading-relaxed mb-8">
                  {challenge.ourSolution}
                </p>
                <div className="border-t border-white/10 pt-6 mt-auto">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2">Expected Outcome</div>
                  <div className="text-sm text-slate-300 font-medium flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{challenge.expectedOutcome}</span>
                  </div>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 5: SERVICES (Light)
// ==========================================
const Chapter5Services = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-white text-slate-900 border-b border-slate-200">
      <SectionHeader title={loc.whyService.title} subtitle={loc.whyService.description} isDark={false} />
      
      <div className="flex flex-col">
        {loc.services.map((svc: AnyType, i: number) => (
          <SplitRow 
            key={svc.id}
            isDark={false}
            left={
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Capability {i+1}</div>
                <h3 className="text-3xl font-medium text-slate-900 mb-6">{svc.title}</h3>
                <p className="text-base text-slate-600 font-light leading-relaxed">{svc.description}</p>
              </div>
            }
            right={
              <div className="bg-slate-50 border border-slate-200 p-8">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-4">Core Deliverables</div>
                <ul className="space-y-4">
                  {svc.deliverables.map((del: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-none shrink-0" /> {del}
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 6: TECHNOLOGY & QA (Dark)
// ==========================================
const Chapter6Technology = ({ loc }: { loc: AnyType }) => {
  // Group tech stack into pairs for 50/50 rows
  const techPairs = [];
  for (let i = 0; i < loc.technologyStack.length; i += 2) {
    techPairs.push([loc.technologyStack[i], loc.technologyStack[i + 1]]);
  }

  return (
    <section className="bg-[#050505] text-white border-b border-white/10">
      <SectionHeader title="The Composable Stack" subtitle="Precision engineering over plugin bloat. Architecture designed for scale." isDark={true} />
      
      <div className="flex flex-col">
        {techPairs.map((pair, idx) => (
          <SplitRow 
            key={idx}
            isDark={true}
            left={
              pair[0] && (
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{pair[0].category}</div>
                  <h3 className="text-2xl font-medium text-slate-100 mb-4">{pair[0].name}</h3>
                  <p className="text-sm text-slate-400 font-light mb-6">{pair[0].purpose}</p>
                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 inline-block border border-emerald-400/20">
                    + {pair[0].benefits.split(',')[0]}
                  </div>
                </div>
              )
            }
            right={
              pair[1] && (
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{pair[1].category}</div>
                  <h3 className="text-2xl font-medium text-slate-100 mb-4">{pair[1].name}</h3>
                  <p className="text-sm text-slate-400 font-light mb-6">{pair[1].purpose}</p>
                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 inline-block border border-emerald-400/20">
                    + {pair[1].benefits.split(',')[0]}
                  </div>
                </div>
              )
            }
          />
        ))}
      </div>

      <SplitRow 
        isDark={true}
        className="bg-[#111]"
        left={
          <div>
            <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">Quality Assurance</div>
            <h3 className="text-3xl font-medium mb-6">Test-Driven Execution</h3>
            <p className="text-base text-slate-400 font-light mb-8">{loc.qualityAssurance.philosophy}</p>
            <p className="text-sm text-slate-300">{loc.qualityAssurance.ciCd}</p>
          </div>
        }
        right={
          <div className="grid grid-cols-1 gap-4">
            {loc.qualityAssurance.testingTypes.map((test: string, i: number) => (
              <div key={i} className="flex items-center gap-3 border border-white/10 bg-[#050505] p-4 text-sm font-mono text-slate-300">
                <Command className="w-4 h-4 text-slate-500" /> {test}
              </div>
            ))}
          </div>
        }
      />
    </section>
  );
};

// ==========================================
// CHAPTER 7: PROCESS (Light)
// ==========================================
const Chapter7Process = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-white text-slate-900 border-b border-slate-200">
      <SectionHeader title="Engineering Lifecycle" subtitle="Structured execution from discovery to deployment." isDark={false} />
      
      <div className="flex flex-col">
        {loc.developmentProcess.map((step: AnyType, i: number) => (
          <SplitRow 
            key={i}
            isDark={false}
            left={
              <div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
                  <span className="bg-slate-900 text-white px-2 py-1">PHASE 0{i+1}</span>
                  <span>{step.duration}</span>
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">{step.stage.split('. ')[1] || step.stage}</h3>
                <p className="text-base text-slate-600 font-light mb-6">{step.objectives}</p>
                <p className="text-sm text-slate-500 italic border-l-2 border-slate-200 pl-4">{step.activities}</p>
              </div>
            }
            right={
              <div className="bg-slate-50 border border-slate-200 p-8 h-full flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Roles</div>
                    <div className="text-sm text-slate-900 font-medium">{step.responsibleRoles}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">Tooling</div>
                    <div className="text-sm text-slate-900 font-medium">{step.tools}</div>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-6 mb-6">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Outputs</div>
                  <ul className="space-y-2">
                    {step.deliverables.split(',').map((d: string, idx: number) => (
                      <li key={idx} className="text-sm text-slate-600 font-light flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-none shrink-0" /> {d.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto bg-white border border-slate-200 p-4 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Gate: {step.qualityChecks}
                </div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 8: INDUSTRIES (Dark)
// ==========================================
const Chapter8Industries = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-[#050505] text-white border-b border-white/10">
      <SectionHeader title="Sector Expertise" subtitle="Architectures tailored to specific regulatory and performance demands." isDark={true} />
      
      <div className="flex flex-col">
        {loc.industrySolutions.map((ind: AnyType, i: number) => (
          <SplitRow 
            key={i}
            isDark={true}
            left={
              <div>
                <h3 className="text-4xl font-light text-white mb-6">{ind.industry}</h3>
                <p className="text-base text-slate-400 font-light leading-relaxed mb-8">
                  <strong className="font-medium text-slate-200 block mb-2">Pain Points:</strong>
                  {ind.painPoints}
                </p>
                <div className="inline-flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-4 py-2 border border-emerald-400/20">
                  <Activity className="w-3 h-3" /> {ind.expectedOutcomes.split(',')[0]}
                </div>
              </div>
            }
            right={
              <div>
                <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">Target Architecture</div>
                <p className="text-xl text-slate-200 font-light leading-snug mb-8">
                  {ind.recommendedArchitecture}
                </p>
                <div className="mb-8">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {ind.technology.split(',').map((t: string, idx: number) => (
                      <span key={idx} className="text-xs font-mono text-slate-400 bg-[#111] border border-white/10 px-3 py-1">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Deliverables</div>
                  <p className="text-sm text-slate-300">{ind.deliverables}</p>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 9: PRICING & ENGAGEMENT (Light)
// ==========================================
const Chapter9Pricing = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-white text-slate-900 border-b border-slate-200">
      <SectionHeader title="Engagement Economics" subtitle={loc.pricing.note} isDark={false} />
      
      <div className="flex flex-col">
        {/* Engagement Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-slate-200">
          {loc.engagementModels.map((model: AnyType, i: number) => (
            <div key={i} className={`p-8 lg:p-12 ${i !== 2 ? 'border-b lg:border-b-0 lg:border-r border-slate-200' : ''} bg-slate-50`}>
              <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-4">{model.billing}</div>
              <h3 className="text-2xl font-medium mb-4">{model.title}</h3>
              <p className="text-sm font-light text-slate-600 mb-6 leading-relaxed">{model.description}</p>
              <div className="mt-auto border-t border-slate-200 pt-4 text-xs font-medium text-slate-800">
                Best for: {model.bestFor}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Tiers */}
        {loc.pricing.tiers.map((tier: AnyType, i: number) => (
          <SplitRow 
            key={i}
            isDark={false}
            left={
              <div>
                <h3 className="text-3xl font-medium text-slate-900 mb-4">{tier.name}</h3>
                <p className="text-base text-slate-600 font-light mb-8">{tier.idealFor}</p>
                <div className="flex items-center gap-3 text-sm font-mono text-slate-700 bg-slate-100 border border-slate-200 px-4 py-2 w-max">
                  <Clock className="w-4 h-4" /> Timeline: {tier.timeline}
                </div>
              </div>
            }
            right={
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-4">Scope & Investment</div>
                <div className="text-4xl font-light tracking-tight text-slate-900 mb-8">{tier.startingFrom}</div>
                <ul className="space-y-4">
                  {tier.deliverables.map((d: string, idx: number) => (
                    <li key={idx} className="text-sm text-slate-700 font-medium flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-none shrink-0" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 10: CASE STUDIES & COMPARISON (Dark)
// ==========================================
const Chapter10Cases = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-[#050505] text-white border-b border-white/10">
      <SectionHeader title="Proof of Concept" subtitle="Real-world architectural migrations and their systemic impact." isDark={true} />
      
      <div className="flex flex-col">
        {loc.caseStudies.map((caseStudy: AnyType, i: number) => (
          <SplitRow 
            key={i}
            isDark={true}
            left={
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{caseStudy.industry} / {caseStudy.timeline}</div>
                <h3 className="text-3xl font-medium text-slate-100 mb-6">{caseStudy.client}</h3>
                <div className="mb-6">
                  <strong className="text-sm font-medium text-red-400 block mb-2">Legacy Bottleneck:</strong>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{caseStudy.problem}</p>
                </div>
                <div>
                  <strong className="text-sm font-medium text-emerald-400 block mb-2">Next.js Implementation:</strong>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{caseStudy.solution}</p>
                </div>
              </div>
            }
            right={
              <div className="bg-[#111] border border-white/10 p-8 h-full flex flex-col justify-center">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Performance Metrics</div>
                <ul className="space-y-6 mb-8">
                  {caseStudy.results.map((res: string, idx: number) => (
                    <li key={idx} className="text-lg font-light text-slate-200 flex items-start gap-4">
                      <Activity className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> {res}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 border-t border-white/10 text-xs font-mono text-slate-500">
                  Stack: {caseStudy.technology}
                </div>
              </div>
            }
          />
        ))}

        {/* Comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-white/10">
           <div className="p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
              <h3 className="text-2xl font-medium mb-12">Architecture Comparison</h3>
              <div className="space-y-12">
                {loc.comparison.slice(0, 2).map((comp: AnyType, idx: number) => (
                  <div key={idx}>
                    <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">{comp.topic}</div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-medium text-emerald-400 mb-2">WebmixStudio</div>
                        <p className="text-sm text-slate-400 font-light">{comp.webmixStudio}</p>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-red-400 mb-2">Alternative</div>
                        <p className="text-sm text-slate-400 font-light">{comp.alternative}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           <div className="p-8 lg:p-16">
              <h3 className="text-2xl font-medium mb-12">Client Testimonials</h3>
              <div className="space-y-12">
                {loc.testimonials.map((test: AnyType, idx: number) => (
                  <div key={idx} className="bg-[#111] border border-white/10 p-8">
                    <p className="text-base text-slate-300 font-light italic leading-relaxed mb-6">"{test.quote}"</p>
                    <div className="text-sm font-medium text-white">{test.author}</div>
                    <div className="text-xs text-slate-500 font-mono">{test.company}</div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// CHAPTER 11: FAQ (Light)
// ==========================================
const Chapter11FAQ = ({ loc }: { loc: AnyType }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white text-slate-900 border-b border-slate-200">
      <SplitRow 
        isDark={false}
        left={
          <div className="lg:sticky lg:top-40">
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-6">Architectural Inquiries</h2>
            <p className="text-lg text-slate-600 font-light mb-12 max-w-md">Detailed responses regarding our engineering standards, localized operations in {loc.city}, and Next.js specifics.</p>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Coverage Area</div>
              <p className="text-sm font-medium text-slate-900 mb-2">{loc.coverageAreas.primary}</p>
              <p className="text-xs font-light text-slate-600 leading-relaxed mb-4">{loc.coverageAreas.description}</p>
              <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest">{loc.coverageAreas.remoteAdvantage}</div>
            </div>
          </div>
        }
        right={
          <div className="border-t border-slate-200">
            {loc.faq.map((f: AnyType, i: number) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-slate-200">
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                  >
                    <span className={`text-lg font-medium pr-8 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                      {f.question}
                    </span>
                    <span className="relative flex shrink-0 w-6 h-6 items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                        <div className="pb-6 text-sm text-slate-600 font-light leading-relaxed">
                          {f.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        }
      />
    </section>
  );
};

// ==========================================
// CHAPTER 12: FINAL CTA (Dark, Strict JSON)
// ==========================================
const Chapter12CTA = ({ loc }: { loc: AnyType }) => {
  return (
    <section className="bg-[#000000] text-white py-32 lg:py-48 flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-12 rounded-none">
          <ShieldCheck className="w-3 h-3 text-emerald-500" /> {loc.companyProfile.name}
        </div>
        
        {/* Strictly using JSON data for the massive CTA text, avoiding hardcodes */}
        <h2 className="text-5xl md:text-[5rem] lg:text-[6.5rem] font-medium tracking-tighter leading-[0.95] mb-10 text-white">
          {loc.companyProfile.mission.replace('To engineer', 'Engineer').split('for forward-thinking')[0]}
        </h2>
        
        <p className="text-xl lg:text-2xl font-light text-slate-400 mb-16 max-w-2xl">
          {loc.hero.subheadline.split('.')[0]}.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href={loc.hero.primaryCTA.url} className="px-10 py-5 bg-white text-black text-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-3 rounded-none">
            {loc.hero.primaryCTA.text} <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href={loc.hero.secondaryCTA.url} className="px-10 py-5 bg-transparent border border-white/20 text-white text-lg font-medium hover:bg-white/5 transition-colors rounded-none">
            {loc.hero.secondaryCTA.text}
          </Link>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
           <div>{loc.reviewer.name} / {loc.reviewer.role}</div>
           <div>{loc.author.lastUpdated}</div>
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
            <span className="text-slate-900">{cityName}</span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-none bg-blue-600" />
            {loc.companyProfile.name}
          </div>
        </div>
      </div>

      <Chapter1Hero loc={loc} />
      <Chapter2Trust loc={loc} />
      <Chapter3Market loc={loc} />
      <Chapter4Challenges loc={loc} />
      <Chapter5Services loc={loc} />
      <Chapter6Technology loc={loc} />
      <Chapter7Process loc={loc} />
      <Chapter8Industries loc={loc} />
      <Chapter9Pricing loc={loc} />
      <Chapter10Cases loc={loc} />
      <Chapter11FAQ loc={loc} />
      <Chapter12CTA loc={loc} />
      
    </main>
  );
}