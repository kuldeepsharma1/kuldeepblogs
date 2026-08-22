import type { ElementType } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BookOpen,
  Code2,
  Copyright,
  FileText,
  Gavel,
  Globe2,
  GraduationCap,
  Lock,
  Mail,
  Scale,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  icon: ElementType;
}

const tableOfContents: TOCItem[] = [
  { id: "acceptance", title: "1. Acceptance of Terms", icon: FileText },
  { id: "eligibility", title: "2. Eligibility & User Accounts", icon: UserCheck },
  { id: "educational-license", title: "3. License to Learn & Course Access", icon: BookOpen },
  { id: "academic-honesty", title: "4. Academic Honesty & Honor Code", icon: GraduationCap },
  { id: "intellectual-property", title: "5. Intellectual Property Rights", icon: Copyright },
  { id: "user-submissions", title: "6. Student Code & Submissions", icon: Code2 },
  { id: "acceptable-use", title: "7. Acceptable Use & Platform Rules", icon: ShieldAlert },
  { id: "certificates", title: "8. Certificates & Credentials", icon: Award },
  { id: "paid-services", title: "9. Fees, Subscriptions & Refunds", icon: Scale },
  { id: "termination", title: "10. Suspension & Termination", icon: Lock },
  { id: "disclaimers", title: "11. Disclaimers & Warranties", icon: AlertTriangle },
  { id: "limitation-liability", title: "12. Limitation of Liability", icon: ShieldAlert },
  { id: "governing-law", title: "13. Governing Law & Disputes", icon: Gavel },
  { id: "modifications", title: "14. Modifications to Terms", icon: Globe2 },
  { id: "contact", title: "15. Legal & Grievance Contact", icon: Mail },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to KuldeepLearn</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="hidden sm:inline-block text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground border border-border">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Terms of Service v2.4
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-surface relative overflow-hidden border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground border border-border">
            <Scale className="h-4 w-4 text-primary" />
            <span>Institutional Agreement</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
            Please read these Terms &amp; Conditions carefully before accessing KuldeepLearn courses, learning pathways, interactive coding labs, or curriculum resources.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
            <div>Effective Date: <span className="text-foreground font-medium">May 1, 2027</span></div>
            <span>•</span>
            <div>Last Updated: <span className="text-foreground font-medium">November 15, 2026</span></div>
            <span>•</span>
            <div>Agreement Type: <span className="text-foreground font-medium">Binding User Contract</span></div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          
          {/* Desktop Sticky Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Agreement Index
              </h2>
              <nav className="space-y-1">
                {tableOfContents.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-foreground" />
                      <span className="truncate">{item.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Legal Agreement Body */}
          <article className="space-y-16 max-w-3xl">

            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  These Terms &amp; Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Learner,&rdquo; &ldquo;User,&rdquo; or &ldquo;you&rdquo;) and <strong className="text-foreground">KuldeepLearn</strong> (&ldquo;KuldeepLearn,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), governing your access to and use of the KuldeepLearn website, structured learning paths, problem sets, video lectures, documentation, and associated digital services (collectively, the &ldquo;Platform&rdquo;).
                </p>
                <p>
                  By creating an account, clicking &ldquo;I Agree,&rdquo; or accessing any course material on the Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our{" "}
                  <Link href="/privacy-policy" className="text-foreground underline underline-offset-4 hover:opacity-80">
                    Privacy Policy
                  </Link>
                  . If you do not agree to these Terms, you must immediately cease using the Platform.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 2. Eligibility & User Accounts */}
            <section id="eligibility" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                2. Eligibility &amp; User Accounts
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground">Contractual Capacity:</strong> You must be at least 18 years of age (or the age of legal majority in your jurisdiction) to enter into this binding contract independently. If you are between 13 and 17 years old, you may only use KuldeepLearn under the supervision and verifiable consent of a parent, legal guardian, or accredited educational institution that agrees to be bound by these Terms on your behalf.
                </p>
                <p>
                  <strong className="text-foreground">Account Integrity:</strong> When registering an account, you agree to provide accurate, current, and complete information. You are solely responsible for safeguarding your authentication credentials and for all activities occurring under your account. You must notify us immediately at{" "}
                  <a href="mailto:legal@kuldeeplearn.com" className="text-foreground underline underline-offset-4">
                    legal@kuldeeplearn.com
                  </a>{" "}
                  upon discovering any unauthorized access or security breach.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 3. License to Learn & Course Access */}
            <section id="educational-license" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                3. License to Learn &amp; Course Access
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Subject to your compliance with these Terms, KuldeepLearn grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and view the courses, syllabi, lecture notes, and learning paths solely for your personal, non-commercial educational purposes.
                </p>
                <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider font-mono">
                    Explicit License Restrictions
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>You may not download (except where explicitly enabled for offline study), scrape, mirror, re-host, or redistribute KuldeepLearn video lectures, problem sets, or curriculum architectures.</li>
                    <li>You may not sell, rent, lease, or commercially exploit access to your account or our educational content.</li>
                    <li>You may not use automated bots, crawlers, or AI scrapers to harvest course content or problem solutions.</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* 4. Academic Honesty & Honor Code */}
            <section id="academic-honesty" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                4. Academic Honesty &amp; Honor Code
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Inspired by premier computer science traditions such as Harvard&apos;s CS50, KuldeepLearn upholds a strict standard of intellectual integrity. The essence of our Honor Code is simple: <strong className="text-foreground">all work you submit for evaluation or certification must be your own.</strong>
                </p>
                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Reasonable &amp; Encouraged</h3>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-muted-foreground">
                      <li>Discussing high-level concepts, algorithms, and debugging strategies with peers.</li>
                      <li>Consulting official language documentation and KuldeepLearn lecture notes.</li>
                      <li>Using built-in platform AI hints to understand error messages conceptually.</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Prohibited &amp; Dishonest</h3>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-muted-foreground">
                      <li>Copying, pasting, or adapting another learner&apos;s problem-set source code.</li>
                      <li>Publishing full solutions to graded problem sets on public repositories (e.g., GitHub).</li>
                      <li>Prompting external generative AI tools to write complete assignment solutions for submission.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* 5. Intellectual Property Rights */}
            <section id="intellectual-property" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                5. Intellectual Property Rights
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  All Platform design systems, source code, logos, trademarks, typography, course structures, problem specifications, automated test suites, video recordings, and written tutorials are the exclusive intellectual property of <strong className="text-foreground">KuldeepLearn</strong> or its licensors, protected under Indian and international copyright, trademark, and trade secret laws.
                </p>
                <p>
                  Nothing in these Terms transfers any ownership title or proprietary interest in the Platform or curriculum to you. Open-source components utilized within our learning environments remain governed by their respective open-source licenses.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 6. Student Code & Submissions */}
            <section id="user-submissions" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                6. Student Code &amp; Submissions
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground">Your Ownership:</strong> You retain full ownership and copyright over the original source code, projects, essays, and forum posts (&ldquo;User Submissions&rdquo;) that you create and submit on KuldeepLearn.
                </p>
                <p>
                  <strong className="text-foreground">Operational License to KuldeepLearn:</strong> By submitting coursework, code, or forum contributions, you grant KuldeepLearn a worldwide, non-exclusive, royalty-free license to host, store, compile, execute in sandboxed environments, evaluate via automated grading pipelines, and display your submissions back to you (and to fellow community members where you post publicly in forums).
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 7. Acceptable Use & Platform Rules */}
            <section id="acceptable-use" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                7. Acceptable Use &amp; Platform Rules
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  In accordance with applicable digital intermediary regulations and community standards, you agree not to host, display, upload, modify, publish, transmit, or share any information or code that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Belongs to another person without lawful authorization or infringes third-party intellectual property rights.</li>
                  <li>Is defamatory, obscene, harassing, hateful, invasive of another&apos;s privacy, or promotes unlawful activity.</li>
                  <li>Contains software viruses, fork bombs, cryptocurrency miners, reverse shells, or malicious code designed to escape sandboxed execution environments or disrupt Platform servers.</li>
                  <li>Attempts to bypass authentication controls, rate limits, or automated grading checks.</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* 8. Certificates & Credentials */}
            <section id="certificates" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                8. Certificates &amp; Credentials
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  KuldeepLearn may issue digital Certificates of Completion or verifiable learning credentials upon your satisfactory completion of designated course tracks and assessments.
                </p>
                <blockquote className="border-l-2 border-primary pl-4 text-foreground italic my-4">
                  Unless explicitly stated in partnership with an accredited university, KuldeepLearn is an independent online learning initiative and does not confer formal university degrees, academic credit, or state-accredited diplomas.
                </blockquote>
                <p>
                  We reserve the right to revoke any certificate if we determine that it was obtained through a violation of our Academic Honesty policy or misrepresentation of identity.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 9. Fees, Subscriptions & Refunds */}
            <section id="paid-services" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                9. Fees, Subscriptions &amp; Refunds
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Core foundational courses and open learning paths on KuldeepLearn are accessible free of charge. Where we offer optional paid tiers, verified certificate tracks, or specialized mentorship cohorts:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Pricing &amp; Taxes:</strong> All fees are displayed prior to checkout and are inclusive or exclusive of applicable taxes (such as GST) as indicated on the invoice.</li>
                  <li><strong className="text-foreground">Refund Window:</strong> Paid enrollments may be eligible for a full refund within 14 days of purchase, provided you have not completed more than 25% of the course modules or generated a verified certificate.</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* 10. Suspension & Termination */}
            <section id="termination" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                10. Suspension &amp; Termination
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  You may terminate your account at any time via your account settings or by contacting our support team.
                </p>
                <p>
                  KuldeepLearn reserves the right to suspend or permanently terminate your access to the Platform, without prior notice or liability, if you breach these Terms, violate the Academic Honesty policy, compromise the security of our code execution infrastructure, or engage in unlawful conduct. Upon termination, your right to use the Platform immediately ceases.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 11. Disclaimers & Warranties */}
            <section id="disclaimers" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                11. Disclaimers &amp; Warranties
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p className="uppercase text-xs font-mono tracking-wide text-foreground bg-muted/50 p-4 rounded-xl border border-border leading-relaxed">
                  THE PLATFORM, COURSES, CODE SANDBOXES, AI TUTORING TOOLS, AND ALL CONTENT ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED AVAILABILITY.
                </p>
                <p>
                  While we strive for pedagogical accuracy and technical reliability, we do not warrant that course materials are error-free, that AI debugging outputs will always be accurate, or that completion of any learning path guarantees employment or specific career outcomes.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 12. Limitation of Liability */}
            <section id="limitation-liability" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                12. Limitation of Liability
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  To the maximum extent permitted by applicable law, in no event shall KuldeepLearn, its founders, instructors, contributors, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages—including loss of profits, loss of code or data, business interruption, or goodwill—arising out of or in connection with your use of or inability to use the Platform.
                </p>
                <p>
                  In any event, our aggregate liability to you for all claims arising under these Terms shall not exceed the greater of (a) the total amount paid by you to KuldeepLearn during the twelve (12) months preceding the claim, or (b) INR 1,000 (or USD $15).
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 13. Governing Law & Disputes */}
            <section id="governing-law" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                13. Governing Law &amp; Dispute Resolution
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of <strong className="text-foreground">India</strong> (including the Indian Contract Act, 1872 and the Information Technology Act, 2000), without regard to conflict of law principles.
                </p>
                <p>
                  Any disputes not resolved amicably within thirty (30) days of written notice shall be subject to the exclusive jurisdiction of the competent courts located in <strong className="text-foreground">[Insert City/State, e.g., New Delhi / Bengaluru], India</strong>.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 14. Modifications to Terms */}
            <section id="modifications" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                14. Modifications to Terms
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  We reserve the right to update or modify these Terms at any time to reflect evolving legal requirements, new curriculum features, or operational changes. When we make material changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page and notify registered users via email or an in-platform banner. Continued use of KuldeepLearn after such changes take effect constitutes your acceptance of the revised Terms.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* 15. Contact & Grievance Officer */}
            <section id="contact" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                15. Legal &amp; Grievance Contact
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  For questions regarding these Terms &amp; Conditions, copyright notices, or formal grievance redressal, please reach out to our Legal &amp; Compliance Desk:
                </p>
                <div className="rounded-2xl border border-border bg-card p-6 mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">LEGAL &amp; GRIEVANCE DESK</div>
                      <a href="mailto:legal@kuldeeplearn.com" className="text-sm font-medium text-foreground hover:underline">
                        legal@kuldeeplearn.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <Gavel className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">REGISTERED ENTITY</div>
                      <p className="text-sm text-foreground font-medium">
                        KuldeepLearn Education Systems [Insert Full Legal Name &amp; Registered Address]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </article>
        </div>
      </main>

   
    </div>
  );
}