import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Terminal,
  Zap,
  Target,
  BarChart3,
  Code2,
  Activity,
  Layers,
  LayoutTemplate,
  ChevronDown,
  Sparkles,
  Command,
  Workflow,
  Network,
  Lock,
  Cpu,
  FileCode2,
  Briefcase
} from "lucide-react";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services";
import { LocationMeta, PricingTier, Service, AnyLocationMeta, EEATLocation } from "@/types/services";
import SectionLabel from "@/components/SectionLabel";


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

// --- Next.js Configs ---
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  const params: { specialization: string; location: string }[] = [];

  for (const slug of slugs) {
    const service = getServiceBySlug(slug);
    if (!service) continue;
    const rawLocations = Array.isArray(service.locations) && service.locations.length
      ? service.locations
      : [{ slug: "new-york" }];

    const seen = new Set<string>();
    for (const loc of rawLocations) {
      const slugVal = typeof loc === "string" ? loc : loc?.slug;
      if (!slugVal || seen.has(slugVal)) continue;
      seen.add(slugVal);
      params.push({ specialization: slug, location: slugVal });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ specialization: string; location: string }> }) {
  const { specialization, location } = await params;
  
  const service = getServiceBySlug(specialization);
  if (!service) return { title: "Not Found" };

  const rawLoc = service.locations?.find((l: AnyLocationMeta) => l.slug === location);
  const loc = rawLoc as LocationMeta;
  
  if (!loc) return { title: "Location Not Found" };

  const city = loc.city;
  const seo = loc.seo || loc.localSeo;

  return {
    title: seo?.title ?? `${service.title} in ${city} | Premium Agency`,
    description: seo?.description ?? `Premium ${service.title} services in ${city}. Enterprise architecture with local precision.`,
  };
}

// --- EEAT Location Page (World-Class Enterprise UI) ---
export default function EEATLocationPage({ rawLoc, service }: { rawLoc: EEATLocation; service: Service; }) {
  const cityName = rawLoc.location && !rawLoc.location.includes('[City]') 
    ? rawLoc.location 
    : rawLoc.slug.replace(/-a$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
  const loc = deepReplaceCity(rawLoc, cityName);

  return (
    <main className="bg-[#000000] min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-100 scroll-smooth antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loc.schema.configuration) }} />

      {/* --- 0. BREADCRUMBS (Minimalist Dark) --- */}
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {loc.companyProfile.name}
          </div>
        </div>
      </div>

      {/* --- 1. HERO SECTION (Refined Vercel/Linear Vibe) --- */}
      <section className="relative min-h-screen flex items-center pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* Abstract Mesh & Grid */}
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0,rgba(0,0,0,0)_50%)] pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0,rgba(0,0,0,0)_50%)] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-6 flex flex-col items-start z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(255,255,255,0.03)] cursor-default">
              <MapPin className="w-3.5 h-3.5 text-blue-400" /> {loc.hero.badge}
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-8 leading-[1.05]">
              {loc.hero.headline}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-light mb-6 max-w-xl">
              {loc.hero.subheadline}
            </p>
            
            <p className="text-base text-slate-500 leading-relaxed font-light mb-12 max-w-xl">
              {loc.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link href={loc.hero.primaryCTA.url} className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium rounded-full overflow-hidden w-full sm:w-auto transition-all hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <span className="relative z-10 flex items-center gap-3">
                  {loc.hero.primaryCTA.text} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href={loc.hero.secondaryCTA.url} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-medium w-full sm:w-auto hover:text-blue-400 transition-colors group">
                {loc.hero.secondaryCTA.text}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-16 w-full pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-6 mb-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                {loc.hero.logos?.map((logo, i) => (
                  <img key={i} src={logo.url} alt={logo.name} className="h-6 object-contain" />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {loc.hero.proofPoints?.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Verbatim Image Usage */}
          <div className="lg:col-span-6 relative h-[600px] hidden lg:block perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-[1.5s] ease-out group">
              <div className="absolute inset-10 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-1000" />
              
              <div className="absolute inset-0 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col z-10">
                <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  <div className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">{loc.companyProfile.specialty}</div>
                </div>
                <div className="relative flex-1 bg-[#050505] overflow-hidden group-hover:scale-[1.03] transition-transform duration-[1.5s]">
                  <Image 
                    src={loc.hero.heroImage.src} 
                    alt={loc.hero.heroImage.alt} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-screen"
                    priority
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                     <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <Activity className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">{loc.marketOverview.dataPoint1}</div>
                          <div className="text-sm font-medium text-white">{loc.results.stat1.value}</div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 2. TRUST / PROFILE (Major Redesign - Editorial Split/Magazine) --- */}
      <section className="py-32 bg-[#f8fafc] text-slate-900 relative rounded-t-[3rem] -mt-8 z-20 border-t border-slate-200 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left: Deep Editorial Typography */}
            <div className="sticky top-32">
              <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 text-blue-600">
                <span className="w-8 h-px bg-blue-600/50"></span>
                {loc.companyProfile.name}
              </div>
              
              <h2 className="text-4xl lg:text-[3.5rem] font-medium tracking-tight mb-8 leading-[1.1] text-slate-900">
                {loc.companyProfile.mission}
              </h2>
              
              <p className="text-xl text-slate-500 font-light leading-relaxed mb-12 max-w-xl">
                {loc.companyProfile.remotePhilosophy}
              </p>

              <div className="flex items-center gap-8 py-8 border-y border-slate-200">
                <div>
                  <div className="text-4xl font-light tracking-tight text-slate-900 mb-2">{loc.trust.years}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{loc.trust.experience}</div>
                </div>
              </div>
            </div>

            {/* Right: Immersive List of Trust Factors (No basic cards) */}
            <div className="flex flex-col gap-12 pt-8 lg:pt-0">
              
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-500 text-slate-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{loc.trust.deliveryModel}</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{loc.trust.timezoneOverlap}</p>
                  <div className="mt-4 text-xs font-medium text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full inline-block">
                    {loc.trust.communication}
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200" />

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-500 text-slate-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{loc.trust.security}</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{loc.trust.codeQuality}</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200" />

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-blue-200 group-hover:text-blue-600 transition-all duration-500 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-3">{loc.trust.ownership}</h3>
                  <p className="text-slate-500 font-light leading-relaxed">{loc.trust.ipProtection}</p>
                  <p className="text-slate-500 font-light leading-relaxed mt-2">{loc.trust.nda}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- 3. SYSTEMIC BOTTLENECKS (Refined - Dark, Sticky Scroll) --- */}
      <section className="bg-[#050505] text-white relative border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#1d4ed810_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-32">
          <div className="grid lg:grid-cols-12 gap-16 relative items-start">
            
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 text-blue-400">
                <span className="w-8 h-px bg-blue-400/50"></span>
                {loc.cityInsights.marketOpportunities}
              </div>
              <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8 leading-[1.05]">
                {loc.cityInsights.whyBusinessesInvestInThisService}
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed mb-12">
                {loc.marketOverview.implication}
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {loc.businessChallenges.slice(0, 6).map((challenge, i) => (
                <div key={challenge.id} className="relative p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-all duration-700 pointer-events-none" />
                  
                  <h3 className="text-2xl font-medium text-white mb-6 flex items-center gap-4">
                    <span className="text-slate-700 font-mono text-sm font-light">0{i+1}</span>
                    {challenge.title}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm font-light text-slate-400 leading-relaxed mb-6">
                        {challenge.problem}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-light">
                        <Activity className="w-3 h-3" /> {challenge.impact}
                      </div>
                    </div>
                    
                    <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <Zap className="w-3 h-3" /> {loc.companyProfile.specialty}
                      </div>
                      <p className="text-sm font-light text-slate-300 leading-relaxed mb-6">
                        {challenge.ourSolution}
                      </p>
                      <div className="text-xs font-medium text-emerald-400 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="leading-snug">{challenge.expectedOutcome}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* --- 4. CORE SERVICES (Major Redesign - Bento Grid) --- */}
      <section className="py-32 bg-[#ffffff] text-slate-900 border-t border-slate-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 text-blue-600">
                <span className="w-8 h-px bg-blue-600/50"></span>
                {loc.whyService.title}
              </div>
              <h2 className="text-4xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
                {loc.whyService.keyAdvantage}
              </h2>
            </div>
            <p className="text-lg text-slate-500 font-light max-w-md leading-relaxed pb-2">
              {loc.whyService.description}
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loc.services.map((svc, i) => {
              // Create variance in grid sizing
              const isLarge = i === 0 || i === 3;
              
              return (
                <div key={svc.id} className={`group bg-[#f8fafc] p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 hover:bg-white hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-700 relative overflow-hidden flex flex-col ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                  
                  {/* Subtle Abstract Graphic per card based on position */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 mb-auto">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center mb-8 text-slate-700 group-hover:text-blue-600 transition-colors duration-500">
                      {i % 3 === 0 ? <LayoutTemplate className="w-5 h-5" /> : i % 3 === 1 ? <Code2 className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                    </div>
                    <h3 className="text-3xl font-medium text-slate-900 mb-6">{svc.title}</h3>
                    <p className={`text-base text-slate-500 font-light leading-relaxed mb-10 ${isLarge ? 'max-w-2xl' : ''}`}>
                      {svc.description}
                    </p>
                  </div>
                  
                  <div className="relative z-10 pt-8 border-t border-slate-200 mt-8">
                    <div className="flex flex-wrap gap-2">
                      {svc.deliverables.map((del, idx) => (
                        <span key={idx} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- 5. DEVELOPMENT PROCESS (Major Redesign - Immersive Roadmap) --- */}
      <section className="py-32 bg-[#000000] text-white relative border-t border-white/5">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-32 max-w-4xl mx-auto">
            <div className="flex justify-center items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 text-blue-400">
              <span className="w-8 h-px bg-blue-400/50"></span>
              {loc.qualityAssurance.philosophy}
              <span className="w-8 h-px bg-blue-400/50"></span>
            </div>
            <h2 className="text-4xl lg:text-[4.5rem] font-medium tracking-tight mb-8 leading-[1.05]">
              {loc.qualityAssurance.ciCd}
            </h2>
          </div>

          <div className="relative">
            {/* The Central Axis */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:-translate-x-1/2" />
            
            <div className="space-y-24 lg:space-y-40">
              {loc.developmentProcess.map((step, i) => (
                <div key={i} className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between group">
                  
                  {/* Content (Alternating) */}
                  <div className={`w-full lg:w-[42%] pl-16 lg:pl-0 ${i % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:order-3 lg:pl-16 text-left'}`}>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                      {step.stage} • {step.duration}
                    </div>
                    <h3 className="text-3xl font-medium text-white mb-6 leading-tight">{step.objectives}</h3>
                    <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">{step.activities}</p>
                    
                    <div className={`flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-blue-400 ${i % 2 === 0 ? 'lg:justify-end' : 'justify-start'}`}>
                      <Briefcase className="w-4 h-4" /> {step.responsibleRoles}
                    </div>
                  </div>

                  {/* The Node */}
                  <div className="absolute left-6 lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 w-4 h-4 rounded-full bg-[#000] border-2 border-slate-700 group-hover:border-white transition-all duration-500 z-10 lg:order-2">
                     <div className="absolute inset-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Details (Alternating) */}
                  <div className={`w-full lg:w-[42%] pl-16 lg:pl-0 mt-8 lg:mt-0 ${i % 2 === 0 ? 'lg:order-3 lg:pl-16' : 'lg:text-right lg:pr-16'}`}>
                     <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md group-hover:bg-white/[0.04] transition-colors duration-500">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">{step.tools}</div>
                        <ul className={`space-y-4 text-sm font-light text-slate-300 ${i % 2 === 0 ? 'text-left' : 'lg:text-right text-left'}`}>
                          {step.deliverables.split(',').map((del, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              {i % 2 !== 0 && <span className="hidden lg:inline-block flex-1"></span>}
                              <span className={`w-1.5 h-1.5 mt-1.5 rounded-full shrink-0 ${i % 2 === 0 ? 'bg-blue-500' : 'lg:order-2 bg-blue-500'}`} />
                              <span className={`${i % 2 === 0 ? '' : 'lg:order-1'}`}>{del.trim()}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/10 text-xs font-light text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> {step.qualityChecks}
                        </div>
                     </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. INDUSTRY SOLUTIONS (Major Redesign - Magazine List Layout) --- */}
      <section className="py-32 bg-[#ffffff] text-slate-900 relative border-t border-slate-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="mb-24 flex flex-col lg:flex-row justify-between items-end gap-8">
            <div className="max-w-4xl">
              <SectionLabel text={loc.cityInsights.majorIndustries}/>
              <h2 className="text-4xl lg:text-[4rem] font-medium tracking-tight leading-[1.05]">
                {loc.cityInsights.businessLandscape}
              </h2>
            </div>
          </div>

          <div className="flex flex-col w-full border-t border-slate-900">
            {loc.industrySolutions.map((sol, idx) => (
              <div key={idx} className="group flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 lg:py-16 border-b border-slate-200 hover:bg-slate-50 transition-colors px-4 lg:px-8 -mx-4 lg:-mx-8">
                
                {/* Industry Name */}
                <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
                  <h3 className="text-3xl lg:text-4xl font-medium text-slate-900 group-hover:translate-x-2 transition-transform duration-500">
                    {sol.industry}
                  </h3>
                </div>

                {/* Pain Point & Solution */}
                <div className="w-full lg:w-1/3 pr-8 mb-6 lg:mb-0">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">The Challenge</div>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">
                    {sol.painPoints}
                  </p>
                </div>

                {/* Architecture & Stack */}
                <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                  <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest mb-3">Architecture</div>
                  <p className="text-sm text-slate-900 font-medium leading-relaxed mb-4">
                    {sol.recommendedArchitecture}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sol.technology.split(',').slice(0,3).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-600">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="w-full lg:w-auto shrink-0 flex justify-end">
                  <div className="flex items-center gap-3 text-xs font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                    {sol.expectedOutcomes.split(',')[0]}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 7. PRICING / INVESTMENT (Refined Stripe Premium) --- */}
      <section id="pricing" className="py-32 bg-[#050505] text-white relative border-t border-white/10">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <div className="flex justify-center items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 text-blue-400">
              <span className="w-8 h-px bg-blue-400/50"></span>
              {loc.pricing.note}
              <span className="w-8 h-px bg-blue-400/50"></span>
            </div>
            <h2 className="text-4xl lg:text-[4rem] font-medium tracking-tight leading-[1.05]">
              {loc.engagementModels[0].title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {loc.pricing.tiers.map((tier, i) => (
              <div key={i} className={`p-10 lg:p-12 rounded-[3rem] border flex flex-col relative transition-all duration-700 ${i === 1 ? 'bg-gradient-to-b from-white/10 to-transparent border-white/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] lg:-translate-y-4 z-10 backdrop-blur-2xl' : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'}`}>
                {i === 1 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-lg shadow-blue-900/50">{loc.engagementModels[1].title}</div>}
                
                <h3 className="text-2xl font-medium mb-4">{tier.name}</h3>
                <div className="text-4xl font-light text-white tracking-tight mb-8 pb-8 border-b border-white/10">
                  {tier.startingFrom}
                </div>
                
                <div className="flex items-center gap-3 mb-10 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                   <Clock className="w-4 h-4 text-blue-400" /> 
                   {tier.timeline}
                </div>

                <div className="mb-12 flex-1">
                   <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-6">{tier.idealFor}</div>
                   <ul className="space-y-4">
                     {tier.deliverables.map((d, idx) => (
                       <li key={idx} className="text-sm font-light text-slate-300 flex items-start gap-4 leading-relaxed">
                         <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${i === 1 ? 'text-blue-400' : 'text-slate-600'}`} />
                         {d}
                       </li>
                     ))}
                   </ul>
                </div>
                
                <Link href={loc.hero.primaryCTA.url} className={`w-full py-5 rounded-full text-center font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${i === 1 ? 'bg-white text-black hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  {loc.hero.primaryCTA.text} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 8. FAQ (Major Redesign - Editorial Accordion) --- */}
      <section className="py-32 bg-[#ffffff] text-slate-900 border-t border-slate-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 sticky top-32">
             <SectionLabel text={loc.trust.support}/>
            <h2 className="text-4xl lg:text-[3.5rem] font-medium tracking-tight leading-[1.1] mb-8">
              {loc.faq[0].question}
            </h2>
          </div>
          
          <div className="lg:col-span-8 border-t border-slate-900">
             {loc.faq.map((faqItem, i) => (
                <details key={i} className="group border-b border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                   <summary className="flex items-center justify-between py-8 md:py-10 cursor-pointer select-none outline-none">
                      <span className="text-2xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors pr-8 leading-snug">{faqItem.question}</span>
                      <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center shrink-0 group-open:bg-slate-900 group-open:border-slate-900 group-open:text-white transition-all duration-500">
                         <ChevronDown className="w-5 h-5 text-slate-400 group-open:text-white transition-transform group-open:-rotate-180 duration-500" />
                      </div>
                   </summary>
                   <div className="pb-10 pt-0 text-lg text-slate-500 font-light leading-relaxed max-w-3xl">
                      {faqItem.answer}
                   </div>
                </details>
             ))}
          </div>
        </div>
      </section>

      {/* --- 9. CTA (Cinematic, Emotionally Driven) --- */}
      <section className="relative py-48 bg-[#000000] text-center px-6 overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none mix-blend-screen" />
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none mix-blend-screen" />
         
         <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter mb-10 leading-[1.05]">
              {loc.companyProfile.mission}
            </h2>
            <p className="text-xl md:text-2xl font-light text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
               {loc.hero.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
               <Link href={loc.hero.primaryCTA.url} className="group w-full sm:w-auto px-12 py-6 bg-white text-black font-medium rounded-full hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  {loc.hero.primaryCTA.text} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
               </Link>
               <Link href={loc.hero.secondaryCTA.url} className="group w-full sm:w-auto px-12 py-6 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-500 flex items-center justify-center gap-3">
                  {loc.hero.secondaryCTA.text}
               </Link>
            </div>
            
            <div className="mt-32 pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-12 text-[10px] font-mono text-slate-500 uppercase tracking-widest w-full">
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 {loc.reviewer.name}
               </div>
               <div className="flex items-center gap-3">
                 <Clock className="w-4 h-4 text-blue-500" />
                 {loc.author.lastUpdated}
               </div>
               <div className="flex items-center gap-3">
                 <MapPin className="w-4 h-4 text-purple-500" />
                 {cityName}
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}

