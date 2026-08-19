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
  Star,
  Users,
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
  Cpu,
  Network
} from "lucide-react";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services";
import { LocationMeta, PricingTier, Service, AnyLocationMeta, EEATLocation } from "@/types/services";
import { SiWhatsapp } from "react-icons/si";

// --- Helpers ---
const getCurrentTimeInZone = (timezone?: string) => {
  if (!timezone) return null;
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date());
  } catch {
    return null;
  }
};

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

// --- High-End UI Components ---
const EditorialLabel = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className={`flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
    <span className={`w-8 h-px ${dark ? 'bg-blue-400/50' : 'bg-blue-600/50'}`}></span>
    {children}
  </div>
);

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


// --- EEAT Location Page (Redesigned Apple/Stripe/Vercel Tier) ---
export function EEATLocationPage({ rawLoc, service }: { rawLoc: EEATLocation; service: Service; }) {
  const cityName = rawLoc.location && !rawLoc.location.includes('[City]') 
    ? rawLoc.location 
    : rawLoc.slug.replace(/-a$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
  const loc = deepReplaceCity(rawLoc, cityName);

  return (
    <main className="bg-[#000000] min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-100 scroll-smooth antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(loc.schema.configuration) }} />

      {/* --- 0. BREADCRUMBS (Minimalist Dark) --- */}
      <div className="bg-transparent pt-12 pb-6 absolute top-0 left-0 w-full z-50">
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
            SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>

      {/* --- 1. HERO SECTION (Cinematic, Dark, Linear/Vercel Vibe) --- */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Depth */}
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* Abstract Mesh Gradients */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,rgba(0,0,0,0)_50%)] pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0,rgba(0,0,0,0)_50%)] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />
        
        {/* Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Hero Copy (Left) */}
          <div className="lg:col-span-6 flex flex-col items-start z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:bg-white/10 transition-colors cursor-default">
              <MapPin className="w-3.5 h-3.5 text-blue-400" /> {loc.hero.badge}
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-8 leading-[1.05]">
              {loc.hero.headline}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-light mb-12 max-w-xl">
              {loc.hero.subheadline}
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

            {/* Elite Proof Points */}
            <div className="mt-16 w-full pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {loc.hero.proofPoints?.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual (Right) - Layered Isometric Architecture */}
          <div className="lg:col-span-6 relative h-[600px] hidden lg:block perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center transform rotate-y-[-12deg] rotate-x-[8deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-[1.5s] ease-out group">
              
              {/* Layer 1: Glowing Backplate */}
              <div className="absolute inset-10 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-1000" />
              
              {/* Layer 2: Main Image Integration (Using the specific requested image) */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col z-10">
                <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  <div className="w-3 h-3 rounded-full bg-slate-700/50" />
                  <div className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">next.config.ts — Edge Architecture</div>
                </div>
                <div className="relative flex-1 bg-[#050505] overflow-hidden group-hover:scale-[1.03] transition-transform duration-[1.5s]">
                  <Image 
                    src="/image_9f2a5a.jpg" 
                    alt="Enterprise Architecture Interface" 
                    fill 
                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-screen"
                    priority
                  />
                  {/* Overlay Data Vis */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                     <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">P99 Latency</div>
                          <div className="text-sm font-medium text-white">42ms Global</div>
                        </div>
                     </div>
                     <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 hidden xl:flex">
                        <Network className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">CDN Nodes</div>
                          <div className="text-sm font-medium text-white">275+ Active</div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Layer 3: Floating UI Elements */}
              <div className="absolute -right-8 top-1/4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl z-20 transform translate-z-12 animate-[float_6s_ease-in-out_infinite]">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    <span className="text-xs font-medium text-white uppercase tracking-wider">Build Passing</span>
                 </div>
                 <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-blue-500 rounded-full" />
                 </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- 2. AGENCY PROFILE & TRUST (Editorial Light, High Contrast Shift) --- */}
      <section className="py-32 bg-[#f8fafc] text-slate-900 relative rounded-t-[3rem] -mt-8 z-20 border-t border-slate-200 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <EditorialLabel dark={false}>The Studio</EditorialLabel>
              <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-8 leading-[1.1] text-slate-900">
                {loc.companyProfile.mission}
              </h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed mb-10">
                {loc.companyProfile.remotePhilosophy}
              </p>
              
              {/* Elevated Specialty Tag */}
              <div className="inline-flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Target className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm tracking-wide uppercase mb-2">Core Competency</h4>
                  <p className="text-slate-600 font-light leading-relaxed">{loc.companyProfile.specialty}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 pt-4 lg:pt-0">
              {[
                { title: "Engineering Depth", desc: loc.trust.experience, icon: Code2 },
                { title: "Synchronous Workflow", desc: loc.trust.timezoneOverlap, icon: Clock },
                { title: "Enterprise Security", desc: loc.trust.security, icon: ShieldCheck },
                { title: "IP Transfer", desc: loc.trust.ownership, icon: Command },
              ].map((item, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-blue-200 transition-all duration-500 flex flex-col justify-between">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-400 transition-all duration-500">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm font-light text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. SYSTEMIC BOTTLENECKS (Sticky Scroll, Dark Mode UI) --- */}
      <section className="bg-[#050505] text-white relative border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#1d4ed810_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-32">
          <div className="grid lg:grid-cols-12 gap-16 relative items-start">
            
            {/* Sticky Headline */}
            <div className="lg:col-span-5 lg:sticky lg:top-40">
              <EditorialLabel dark={true}>Systemic Bottlenecks</EditorialLabel>
              <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8 leading-[1.05]">
                Why legacy infrastructure fails in {cityName}.
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed mb-12">
                Monoliths and client-side SPA architectures crumble under enterprise demands. We re-engineer the foundation for infinite scale.
              </p>
              
              {/* Abstract Visual Representation of "Fixing the bottleneck" */}
              <div className="w-full h-48 rounded-[2rem] bg-white/5 border border-white/10 p-6 relative overflow-hidden flex flex-col justify-between group">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                 <div className="flex justify-between items-center opacity-50">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-red-400">Legacy Flow</span>
                    <div className="flex gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span><span className="w-2 h-2 bg-red-500 rounded-full"></span></div>
                 </div>
                 <div className="w-full h-px bg-gradient-to-r from-red-500/50 via-slate-700 to-emerald-500/50 my-4 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Next.js Edge</span>
                    <div className="flex gap-1"><span className="w-1 h-4 bg-emerald-500 rounded-sm"></span><span className="w-1 h-6 bg-emerald-500 rounded-sm"></span><span className="w-1 h-3 bg-emerald-500 rounded-sm"></span></div>
                 </div>
              </div>
            </div>

            {/* Scrolling Glass Panes */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {loc.businessChallenges.slice(0, 5).map((challenge, i) => (
                <div key={challenge.id} className="relative p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-all duration-700 pointer-events-none" />
                  
                  <h3 className="text-2xl font-medium text-white mb-4 flex items-center gap-4">
                    <span className="text-slate-700 font-mono text-sm font-light">0{i+1}</span>
                    {challenge.title}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">The Problem</div>
                      <p className="text-sm font-light text-slate-400 leading-relaxed mb-6">
                        {challenge.problem}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-light">
                        Impact: {challenge.impact}
                      </div>
                    </div>
                    
                    <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <Zap className="w-3 h-3" /> Architecture Shift
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

      {/* --- 4. CORE SERVICES (Bento Layout, Elegant Abstract Visuals) --- */}
      <section className="py-32 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <EditorialLabel dark={false}>Enterprise Services</EditorialLabel>
              <h2 className="text-4xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
                Engineering at the edge.
              </h2>
            </div>
            <p className="text-lg text-slate-500 font-light max-w-md leading-relaxed pb-2">
              Bespoke Next.js architectures tailored for high-traffic environments and complex integrations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loc.services.map((svc, i) => (
              <div key={svc.id} className={`group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden flex flex-col ${i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                
                {/* Abstract Vector Graphic Background */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
                  <svg className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,100 C20,0 80,0 100,100" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M0,80 C30,20 70,20 100,80" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M0,60 C40,40 60,40 100,60" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="text-2xl lg:text-3xl font-medium text-slate-900 mb-4">{svc.title}</h3>
                  <p className="text-base text-slate-500 font-light leading-relaxed mb-10 max-w-2xl">
                    {svc.description}
                  </p>
                </div>
                
                <div className="relative z-10 pt-8 border-t border-slate-200/60 mt-auto">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Core Deliverables</div>
                  <div className="flex flex-wrap gap-2">
                    {svc.deliverables.map((del, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 5. DEVELOPMENT PROCESS (Vertical Connected Journey, Dark) --- */}
      <section className="py-32 bg-[#000000] text-white relative">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <EditorialLabel dark={true}>Methodology</EditorialLabel>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8">An architecture for speed.</h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">From blueprint to global edge deployment, every phase is rigorously tested and heavily documented.</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* The Connected Line */}
            <div className="absolute left-6 md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
            
            <div className="space-y-16 md:space-y-24">
              {loc.developmentProcess.map((step, i) => (
                <div key={i} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  
                  {/* Left Side (Empty on odd, Content on even) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-3 md:pl-12 text-left'}`}>
                    <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-3">Phase 0{i+1} — {step.duration}</div>
                    <h3 className="text-2xl font-medium text-white mb-4">{step.stage}</h3>
                    <p className="text-slate-400 font-light leading-relaxed mb-6">{step.objectives}</p>
                    <div className={`text-xs font-light text-slate-500 uppercase tracking-wider flex items-center gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Users className="w-3 h-3" /> {step.responsibleRoles}
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-6 md:left-[50%] top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-500 z-10 md:order-2">
                     <div className="absolute inset-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Right Side (Abstract Graphic or List) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 mt-8 md:mt-0 ${i % 2 === 0 ? 'md:order-3 md:pl-12' : 'md:text-right md:pr-12'}`}>
                     <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors duration-500">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Outputs</div>
                        <ul className={`space-y-2 text-sm font-light text-slate-300 ${i % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                          {step.deliverables.split(',').map((del, idx) => (
                            <li key={idx}>{del.trim()}</li>
                          ))}
                        </ul>
                     </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. INDUSTRY SOLUTIONS (Magazine Layout, Light) --- */}
      <section className="py-32 bg-[#f8fafc] text-slate-900 relative border-y border-slate-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="mb-20">
            <EditorialLabel dark={false}>Vertical Solutions</EditorialLabel>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8 max-w-3xl leading-[1.05]">
              Built for highly regulated and complex markets.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {loc.industrySolutions.map((sol, idx) => (
              <div key={idx} className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between group hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-blue-200 transition-all duration-500">
                <div>
                  <h3 className="text-3xl font-medium text-slate-900 mb-8">{sol.industry}</h3>
                  <div className="space-y-6 text-sm font-light text-slate-600">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">Pain Points</span>
                      <p className="leading-relaxed">{sol.painPoints}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">Recommended Architecture</span>
                      <p className="leading-relaxed text-slate-900 font-medium">{sol.recommendedArchitecture}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex gap-2">
                    {sol.technology.split(',').slice(0,3).map((tech, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-600 whitespace-nowrap">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 whitespace-nowrap">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {sol.expectedOutcomes.split(',')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 7. PRICING / INVESTMENT (Stripe-Level Premium, Dark) --- */}
      <section id="pricing" className="py-32 bg-[#050505] text-white relative">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <EditorialLabel dark={true}>Investment</EditorialLabel>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8">Transparent scaling.</h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">{loc.pricing.note}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {loc.pricing.tiers.map((tier, i) => (
              <div key={i} className={`p-10 lg:p-12 rounded-[3rem] border flex flex-col relative transition-all duration-700 ${i === 1 ? 'bg-gradient-to-b from-white/10 to-transparent border-white/20 shadow-[0_0_80px_rgba(59,130,246,0.1)] lg:-translate-y-4 z-10 backdrop-blur-2xl' : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'}`}>
                {i === 1 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 px-6 rounded-full shadow-lg shadow-blue-900/50">Most Selected</div>}
                
                <h3 className="text-2xl font-medium mb-4">{tier.name}</h3>
                <div className="text-4xl font-light text-white tracking-tight mb-8 pb-8 border-b border-white/10">
                  {tier.startingFrom}
                </div>
                
                <div className="flex items-center gap-3 mb-10 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                   <Clock className="w-4 h-4 text-blue-400" /> 
                   Timeline: {tier.timeline}
                </div>

                <div className="mb-12 flex-1">
                   <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-6">Key Deliverables</div>
                   <ul className="space-y-4">
                     {tier.deliverables.map((d, idx) => (
                       <li key={idx} className="text-sm font-light text-slate-300 flex items-start gap-3 leading-relaxed">
                         <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${i === 1 ? 'text-blue-400' : 'text-slate-600'}`} />
                         {d}
                       </li>
                     ))}
                   </ul>
                </div>
                
                <Link href="/contact" className={`w-full py-5 rounded-full text-center font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${i === 1 ? 'bg-white text-black hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Discuss Requirements <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 8. FAQ (Ultra-Minimal, Light) --- */}
      <section className="py-32 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <div className="mb-16">
            <EditorialLabel dark={false}>Knowledge Base</EditorialLabel>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight">Questions from {cityName}</h2>
          </div>
          
          <div className="border-t border-slate-200">
             {loc.faq.map((faqItem, i) => (
                <details key={i} className="group border-b border-slate-200 [&_summary::-webkit-details-marker]:hidden">
                   <summary className="flex items-center justify-between py-8 cursor-pointer select-none outline-none">
                      <span className="text-xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors pr-8 leading-snug">{faqItem.question}</span>
                      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 group-open:bg-slate-900 group-open:border-slate-900 group-open:text-white transition-all duration-300">
                         <ChevronDown className="w-4 h-4 text-slate-400 group-open:text-white transition-transform group-open:-rotate-180 duration-500" />
                      </div>
                   </summary>
                   <div className="pb-8 pt-0 text-lg text-slate-500 font-light leading-relaxed max-w-3xl">
                      {faqItem.answer}
                   </div>
                </details>
             ))}
          </div>
        </div>
      </section>

      {/* --- 9. CTA (Massive Emotional Ending, Dark) --- */}
      <section className="relative py-48 bg-[#000000] text-center px-6 overflow-hidden">
         {/* Huge Cinematic Aura */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none mix-blend-screen" />
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none mix-blend-screen" />
         
         <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-6xl md:text-[6rem] font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter mb-10 leading-[1.05]">
              Deploy the future.
            </h2>
            <p className="text-xl md:text-2xl font-light text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed">
               Book a high-level architecture review with our {cityName} engineering leads. Actionable roadmap delivered in 48 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
               <Link href="/contact" className="group w-full sm:w-auto px-12 py-6 bg-white text-black font-medium rounded-full hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  Start the Conversation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
               </Link>
               <a href={service.cta.whatsappLink} className="group w-full sm:w-auto px-12 py-6 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-500 flex items-center justify-center gap-3">
                  <SiWhatsapp className="w-5 h-5 group-hover:text-emerald-400 transition-colors" /> Contact via WhatsApp
               </a>
            </div>
            
            <div className="mt-32 pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-12 text-[10px] font-mono text-slate-500 uppercase tracking-widest w-full">
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 Reviewed by: <span className="text-slate-300">{loc.reviewer.name}</span>
               </div>
               <div className="flex items-center gap-3">
                 <Clock className="w-4 h-4 text-blue-500" />
                 Last Updated: <span className="text-slate-300">{loc.author.lastUpdated}</span>
               </div>
               <div className="flex items-center gap-3">
                 <MapPin className="w-4 h-4 text-purple-500" />
                 Node: <span className="text-slate-300">{cityName}</span>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}

// --- Standard Location Page Wrapper ---
export default async function LocationPage({ params }: { params: Promise<{ specialization: string; location: string }> }) {
  const { specialization, location } = await params;
  const service: Service = getServiceBySlug(specialization);
  if (!service) return notFound();

  const rawLoc = service.locations?.find((l: AnyLocationMeta) => l.slug === location);
  if (!rawLoc) return notFound();

  if ((rawLoc as EEATLocation).pageType === "Location Service Landing Page") {
    return <EEATLocationPage rawLoc={rawLoc as EEATLocation} service={service} />;
  }

  // Render legacy LocationMeta if needed 
  return <div>Legacy Location Page Render</div>;
}