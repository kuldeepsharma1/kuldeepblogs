"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */
type AnyData = Record<string, any>;

interface Props {
  rawLoc: AnyData;
  service?: AnyData;
}

/* -------------------------------------------------------------------------- */
/*  Design Tokens (from Blueprint)                                            */
/* -------------------------------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* -------------------------------------------------------------------------- */
/*  Reusable Engineering Visuals                                              */
/* -------------------------------------------------------------------------- */
function ArchitectureBlueprint({ dense = false }: { dense?: boolean }) {
  return (
    <div className={`relative w-full ${dense ? "h-[420px]" : "h-[480px] md:h-[560px]"} rounded-2xl border border-black/[0.08] bg-[#FAFAFA] overflow-hidden`}>
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      {/* Layers */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
        {/* Edge / CDN */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-blue-600/30" />
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-zinc-500">Edge Network · Global</span>
          <div className="h-px flex-1 bg-blue-600/30" />
        </div>

        {/* App Router + Server Components */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          <div className="col-span-12 md:col-span-4 rounded-xl border border-black/[0.08] bg-white p-4 md:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="text-[11px] font-mono text-blue-600 mb-2">APP ROUTER</div>
            <div className="text-[13px] text-zinc-800 font-medium">Layouts · Nested Routes · Streaming</div>
          </div>
          <div className="col-span-6 md:col-span-4 rounded-xl border border-black/[0.08] bg-white p-4 md:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="text-[11px] font-mono text-blue-600 mb-2">SERVER COMPONENTS</div>
            <div className="text-[13px] text-zinc-800 font-medium">Zero client JS by default</div>
          </div>
          <div className="col-span-6 md:col-span-4 rounded-xl border border-black/[0.08] bg-white p-4 md:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="text-[11px] font-mono text-blue-600 mb-2">SERVER ACTIONS</div>
            <div className="text-[13px] text-zinc-800 font-medium">Mutations without API routes</div>
          </div>
        </div>

        {/* Data + Observability */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          <div className="col-span-7 md:col-span-8 rounded-xl border border-black/[0.08] bg-white p-4 md:p-5">
            <div className="text-[11px] font-mono text-zinc-500 mb-2">DATA LAYER</div>
            <div className="flex flex-wrap gap-2 text-[12px] text-zinc-700">
              <span className="px-2.5 py-1 rounded-md bg-zinc-100">PostgreSQL</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-100">Prisma</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-100">Redis</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-100">Edge Cache</span>
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 rounded-xl border border-black/[0.08] bg-white p-4 md:p-5">
            <div className="text-[11px] font-mono text-zinc-500 mb-2">OBSERVABILITY</div>
            <div className="text-[12px] text-zinc-700">Core Web Vitals · Real-user monitoring</div>
          </div>
        </div>

        {/* Deployment */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-emerald-600/30" />
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-zinc-500">Vercel · CI/CD · Instant Rollback</span>
          <div className="h-px flex-1 bg-emerald-600/30" />
        </div>
      </div>
    </div>
  );
}

function PerformanceStrip({ metrics }: { metrics?: any[] }) {
  const defaults = [
    { label: "LCP", value: "< 1.2s" },
    { label: "CLS", value: "0.00" },
    { label: "INP", value: "< 100ms" },
    { label: "Edge Latency", value: "12–24ms" },
    { label: "Uptime", value: "99.99%" },
  ];
  const items = metrics?.length ? metrics.slice(0, 5) : defaults;

  return (
    <div className="w-full border-t border-black/[0.06] bg-white">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-black/[0.06]">
          {items.map((m: any, i: number) => (
            <div key={i} className="py-5 px-4 text-center">
              <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-zinc-500 mb-1">
                {m.label || m.title}
              </div>
              <div className="text-[20px] md:text-[22px] font-normal text-zinc-900 tracking-tight">
                {m.value || m.description?.slice(0, 12) || "—"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */
export default function EEATLocationPage({ rawLoc }: Props) {
  const data = rawLoc;
  const cityName = data.location?.targetMarket?.city || "New York";

  // Process roadmap
  const processRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps = data.developmentProcess?.steps || [];

  useEffect(() => {
    const handleScroll = () => {
      if (!processRef.current || steps.length === 0) return;
      const rect = processRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep(index);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps.length]);

  return (
    <main className="bg-[#FAFAFA] text-zinc-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
   


      {/* ================================================================ */}
      {/* CHAPTER 6 — PROCESS (Sticky Roadmap)                             */}
      {/* ================================================================ */}
      <section ref={processRef} className="relative bg-white border-t border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-0 min-h-[180vh]">
            {/* Sticky rail */}
            <div className="lg:col-span-4 py-24 md:py-32">
              <div className="lg:sticky lg:top-32">
                <div className="text-[12px] font-mono uppercase tracking-[0.1em] text-zinc-500 mb-4">
                  Delivery Process
                </div>
                <h2 className="text-[28px] md:text-[36px] font-normal tracking-tight leading-[1.15] text-zinc-950 mb-10">
                  {data.developmentProcess?.title || "Structured execution"}
                </h2>

                <nav className="space-y-1">
                  {steps.map((step: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => {
                        const el = document.getElementById(`process-step-${i}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`w-full text-left flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${
                        activeStep === i
                          ? "bg-zinc-100 text-zinc-900"
                          : "text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      <span
                        className={`text-[12px] font-mono w-6 ${
                          activeStep === i ? "text-blue-600" : "text-zinc-400"
                        }`}
                      >
                        {String(step.step || i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] font-medium">{step.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Progressive detail */}
            <div className="lg:col-span-8 py-24 md:py-32 lg:pl-16 border-l border-black/[0.06]">
              <div className="space-y-32 md:space-y-40">
                {steps.map((step: any, i: number) => (
                  <div
                    key={i}
                    id={`process-step-${i}`}
                    className={`transition-opacity duration-500 ${
                      activeStep === i ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div className="text-[13px] font-mono text-blue-600 mb-3">
                      Phase {String(step.step || i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-[24px] md:text-[28px] font-normal text-zinc-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[16px] text-zinc-600 leading-relaxed max-w-lg mb-8">
                      {step.goal}
                    </p>
                    <div className="h-px w-12 bg-zinc-200 mb-8" />
                    <div className="text-[13px] text-zinc-500">
                      Scroll to continue through the roadmap
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CHAPTER 7 — PROOF (Editorial Case Studies)                       */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 bg-[#FAFAFA] border-t border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
            <div>
              <div className="text-[12px] font-mono uppercase tracking-[0.1em] text-zinc-500 mb-4">
                Selected Work
              </div>
              <h2 className="text-[28px] md:text-[40px] font-normal tracking-tight leading-[1.15] text-zinc-950">
                {data.caseStudies?.title || "Selected Next.js projects"}
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-zinc-700 hover:text-blue-600 transition-colors"
            >
              View all case studies
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-24 md:space-y-32">
            {(data.caseStudies?.items || []).map((cs: any, i: number) => {
              // Unique composition per case study
              if (i === 0) {
                return (
                  <article key={cs.slug || i} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    <div className="lg:col-span-7">
                      <div className="aspect-[16/10] rounded-2xl bg-zinc-200 border border-black/[0.06] overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-300" />
                        <div className="absolute bottom-5 left-5 text-[12px] font-mono uppercase tracking-[0.08em] text-zinc-700 bg-white/90 px-3 py-1.5 rounded-md">
                          {cs.industry}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <h3 className="text-[22px] md:text-[24px] font-normal text-zinc-900 mb-4 leading-snug">
                        {cs.challenge}
                      </h3>
                      <div className="text-[12px] font-mono uppercase tracking-[0.08em] text-zinc-500 mb-3">
                        Solution
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(cs.solution || []).map((s: string, idx: number) => (
                          <span key={idx} className="text-[13px] px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="text-[12px] font-mono uppercase tracking-[0.08em] text-zinc-500 mb-3">
                        Outcomes
                      </div>
                      <ul className="space-y-2 mb-8">
                        {(cs.outcomes || []).map((o: string, idx: number) => (
                          <li key={idx} className="text-[15px] text-zinc-600 flex gap-2">
                            <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                            {o}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={cs.cta || "#"}
                        className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700"
                      >
                        Read full case study
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              }

              if (i === 1) {
                return (
                  <article key={cs.slug || i} className="border border-black/[0.06] rounded-2xl bg-white p-8 md:p-12">
                    <div className="grid md:grid-cols-12 gap-8">
                      <div className="md:col-span-4">
                        <div className="text-[12px] font-mono uppercase tracking-[0.08em] text-blue-600 mb-3">
                          {cs.industry}
                        </div>
                        <h3 className="text-[22px] font-normal text-zinc-900 mb-6 leading-snug">
                          {cs.challenge}
                        </h3>
                        <Link
                          href={cs.cta || "#"}
                          className="inline-flex items-center gap-2 text-[14px] font-medium text-zinc-700 hover:text-blue-600"
                        >
                          View project
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <div className="md:col-span-8 grid sm:grid-cols-2 gap-6">
                        <div>
                          <div className="text-[12px] font-mono text-zinc-500 mb-3">Architecture</div>
                          <div className="space-y-2">
                            {(cs.solution || []).map((s: string, idx: number) => (
                              <div key={idx} className="text-[14px] text-zinc-700">{s}</div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-[12px] font-mono text-zinc-500 mb-3">Business Impact</div>
                          <div className="space-y-2">
                            {(cs.outcomes || []).map((o: string, idx: number) => (
                              <div key={idx} className="text-[14px] text-zinc-700 flex gap-2">
                                <span className="text-emerald-600">→</span> {o}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              // Third layout
              return (
                <article key={cs.slug || i} className="grid lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="text-[12px] font-mono uppercase tracking-[0.08em] text-zinc-500 mb-3">
                      {cs.industry}
                    </div>
                    <h3 className="text-[22px] md:text-[24px] font-normal text-zinc-900 mb-4 leading-snug">
                      {cs.challenge}
                    </h3>
                    <p className="text-[15px] text-zinc-600 mb-6 leading-relaxed">
                      {(cs.solution || []).join(" · ")}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {(cs.outcomes || []).map((o: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[13px] px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={cs.cta || "#"}
                      className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600"
                    >
                      Explore the work
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="aspect-[16/10] rounded-2xl bg-zinc-200 border border-black/[0.06]" />
                  </div>
                </article>
              );
            })}
          </div>

 
        </div>
      </section>

      {/* ================================================================ */}
      {/* CHAPTER 8 — PRICING                                              */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 bg-white border-t border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <div className="text-[12px] font-mono uppercase tracking-[0.1em] text-zinc-500 mb-4">
              Engagement
            </div>
            <h2 className="text-[28px] md:text-[40px] font-normal tracking-tight leading-[1.15] text-zinc-950 mb-4">
              {data.engagementModels?.title || data.pricing?.title || "Flexible engagement models"}
            </h2>
            <p className="text-[16px] text-zinc-600 leading-relaxed">
              {data.pricing?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {(data.engagementModels?.items || data.pricing?.engagements || []).map(
              (model: any, i: number) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-black/[0.08] bg-[#FAFAFA] flex flex-col"
                >
                  <h3 className="text-[18px] font-medium text-zinc-900 mb-3">
                    {model.type || model.name}
                  </h3>
                  <p className="text-[14px] text-zinc-600 leading-relaxed mb-6 flex-1">
                    {model.purpose || (model.bestFor || []).join(" · ")}
                  </p>
                  {model.bestFor && (
                    <div className="space-y-1.5">
                      {model.bestFor.map((b: string, idx: number) => (
                        <div key={idx} className="text-[13px] text-zinc-500 flex gap-2">
                          <span className="text-zinc-400">–</span> {b}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              href={data.pricing?.cta?.url || "/contact"}
              className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-[10px] bg-zinc-950 text-white text-[15px] font-medium hover:bg-blue-600 transition-colors"
            >
              {data.pricing?.cta?.text || "Request a Custom Estimate"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {data.leadMagnet && (
              <Link
                href={data.leadMagnet.cta?.url || "/contact"}
                className="text-[14px] font-medium text-zinc-600 hover:text-blue-600 transition-colors"
              >
                {data.leadMagnet.cta?.text || "Request Architecture Review"} →
              </Link>
            )}
          </div>
        </div>
      </section>

   


    </main>
  );
}