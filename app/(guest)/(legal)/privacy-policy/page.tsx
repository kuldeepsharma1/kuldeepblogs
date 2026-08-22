import type { ElementType } from "react"; 
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  FileCheck2,
  Globe2,
  GraduationCap,
  LockKeyhole,
  Mail,
  Scale,
  Shield,
  ShieldCheck,
  UserRound,
} from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  icon: ElementType;
}

const tableOfContents: TOCItem[] = [
  { id: "introduction", title: "1. Introduction & Scope", icon: ShieldCheck },
  { id: "information-collected", title: "2. Information We Collect", icon: UserRound },
  { id: "how-we-use", title: "3. How We Use Your Information", icon: BookOpen },
  { id: "legal-basis", title: "4. Legal Bases for Processing", icon: Scale },
  { id: "cookies", title: "5. Cookies & Tracking Technologies", icon: Globe2 },
  { id: "third-parties", title: "6. Third-Party Services & Subprocessors", icon: LockKeyhole },
  { id: "international-transfers", title: "7. International Data Transfers", icon: Globe2 },
  { id: "data-retention", title: "8. Data Retention Policy", icon: FileCheck2 },
  { id: "security", title: "9. Enterprise Security Measures", icon: Shield },
  { id: "your-rights", title: "10. Your Privacy Rights", icon: UserRound },
  { id: "children", title: "11. Children's Privacy", icon: GraduationCap },
  { id: "ai-features", title: "12. AI & Automated Learning Features", icon: BookOpen },
  { id: "contact", title: "13. Contact & Grievance Officer", icon: Mail },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Navigation Bar / Back button header */}
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground border border-border">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Enterprise Standard v2.4
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-surface relative overflow-hidden border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground border border-border">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>Institutional Governance</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
            At KuldeepLearn, we believe that world-class computer science and rigorous educational pathways should be matched by uncompromising data stewardship, transparency, and respect for learner privacy.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
            <div>Effective Date: <span className="text-foreground font-medium">May 1, 2027</span></div>
            <span>•</span>
            <div>Last Updated: <span className="text-foreground font-medium">November 15, 2026</span></div>
            <span>•</span>
            <div>Jurisdiction: <span className="text-foreground font-medium">Global / India / EU</span></div>
          </div>
        </div>
      </section>

      {/* Main Layout with Sticky TOC */}
      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          
          {/* Sidebar Table of Contents (Desktop Sticky) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-1.5">
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

          {/* Policy Document Content */}
          <article className="space-y-16 max-w-3xl">
            
            {/* Section 1 */}
            <section id="introduction" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                1. Introduction & Scope
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Welcome to <strong className="text-foreground">KuldeepLearn</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We operate an online educational platform offering rigorous computer science courses, structured learning paths, interactive problem sets, and curated curriculum content inspired by premier academic initiatives (such as Harvard&apos;s CS50).
                </p>
                <p>
                  This Privacy Policy details how we collect, use, disclose, and safeguard your personal information when you access our website, enroll in courses, submit code assignments, participate in discussion forums, or interact with our learning management systems.
                </p>
                <blockquote className="border-l-2 border-primary pl-4 text-foreground italic my-6">
                  &ldquo;Education is a fundamental human right, and data privacy is essential to creating a safe, trusted environment for intellectual exploration and skill development.&rdquo;
                </blockquote>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 2 */}
            <section id="information-collected" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                2. Information We Collect
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>To provide a robust, personalized learning experience, we collect information across three core categories:</p>
                
                <div className="grid gap-4 sm:grid-cols-3 mt-6">
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">A. Account Data</h3>
                    <p className="text-xs text-muted-foreground">Name, email address, password hashes, profile avatars, GitHub/Google OAuth tokens, and institutional affiliation.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">B. Educational Data</h3>
                    <p className="text-xs text-muted-foreground">Course enrollments, problem set submissions, code snippets, quiz scores, certificate progress, and timestamps.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">C. Technical Data</h3>
                    <p className="text-xs text-muted-foreground">IP addresses, browser type, device identifiers, operating system logs, session durations, and general telemetry.</p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 3 */}
            <section id="how-we-use" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                3. How We Use Your Information
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>We process your personal information strictly for legitimate educational, operational, and security purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Delivering Curriculum:</strong> Managing your course dashboards, tracking problem-set completion, and issuing verifiable completion certificates.</li>
                  <li><strong className="text-foreground">Platform Optimization:</strong> Analyzing learning patterns to refine pedagogical paths, debug code submission pipelines, and enhance UI performance.</li>
                  <li><strong className="text-foreground">Communication:</strong> Sending vital account notifications, security alerts, course announcements, and optional learning digests.</li>
                  <li><strong className="text-foreground">Academic Integrity:</strong> Detecting plagiarism, unauthorized code sharing, and safeguarding automated grading environments.</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 4 */}
            <section id="legal-basis" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                4. Legal Bases for Processing
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Depending on your jurisdiction (including the EU GDPR, Indian DPDP Act, and California Consumer Privacy Act), we process data under specific legal grounds:</p>
                <div className="space-y-3 mt-4">
                  <div className="rounded-xl bg-muted/30 p-4 border border-border">
                    <span className="font-semibold text-foreground">Performance of a Contract:</span> Providing course access, grading your code submissions, and maintaining user accounts.
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4 border border-border">
                    <span className="font-semibold text-foreground">Legitimate Interests:</span> Securing our platform, improving educational tools, and analyzing aggregated learning engagement.
                  </div>
                  <div className="rounded-xl bg-muted/30 p-4 border border-border">
                    <span className="font-semibold text-foreground">Consent:</span> Where you explicitly opt-in to marketing communications, optional analytics telemetry, or beta features.
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 5 */}
            <section id="cookies" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                5. Cookies & Tracking Technologies
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  We utilize minimal, privacy-respecting cookies and local storage tokens to maintain authenticated sessions, remember your dark/light theme preference, and measure anonymized site traffic.
                </p>
                <p>
                  You can configure your browser to refuse all or some browser cookies, though disabling essential session cookies may prevent you from logging into your KuldeepLearn dashboard or saving lab progress.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 6 */}
            <section id="third-parties" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                6. Third-Party Services & Subprocessors
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>To deliver an institutional-grade platform, KuldeepLearn partners with trusted enterprise subprocessors:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Cloud Infrastructure & Edge Hosting:</strong> Vercel & AWS for high-performance content delivery and secure database storage.</li>
                  <li><strong className="text-foreground">Authentication Providers:</strong> Secure OAuth integration via GitHub and Google.</li>
                  <li><strong className="text-foreground">Transactional Email:</strong> Resend / SendGrid for account verification and password reset notifications.</li>
                </ul>
                <p className="text-xs italic mt-2">We never sell, rent, or monetize your personal data or submitted coursework to advertisers or data brokers.</p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 7 */}
            <section id="international-transfers" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                7. International Data Transfers
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  As a global learning community, your data may be processed on servers located outside your home country. When transferring personal data internationally, we implement appropriate contractual safeguards and ensure compliance with regional data protection standards (such as Standard Contractual Clauses for EU users and applicable cross-border regulations under the Indian DPDP framework).
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 8 */}
            <section id="data-retention" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                8. Data Retention Policy
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  We retain your account profile and educational history for as long as your account remains active or as needed to provide you with learning records and verified credentials. 
                </p>
                <p>
                  If you request account deletion, we will purge your personally identifiable information within 30 days, except where retention is required for legal compliance, fraud prevention, or resolving disputes.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 9 */}
            <section id="security" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                9. Enterprise Security Measures
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  We deploy robust defense-in-depth security measures to protect your data, including end-to-end TLS encryption in transit, AES-256 encryption at rest, strict role-based access control (RBAC), automated vulnerability scanning, and secure sandboxed code execution environments for student assignments.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 10 */}
            <section id="your-rights" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                10. Your Privacy Rights
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>Depending on your legal jurisdiction, you maintain specific rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Access & Portability:</strong> Request a full export of your profile data and course progress.</li>
                  <li><strong className="text-foreground">Rectification:</strong> Correct inaccurate or outdated account information.</li>
                  <li><strong className="text-foreground">Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Close your account and delete associated records.</li>
                  <li><strong className="text-foreground">Objection & Restriction:</strong> Object to specific data processing activities or withdraw consent.</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 11 */}
            <section id="children" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                11. Children&apos;s Privacy
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  KuldeepLearn courses are designed for learners aged 13 and older. We do not knowingly collect personal information from children under 13 without verifiable parental or institutional consent. If you believe a child has provided us with personal data without proper authorization, please contact us immediately.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 12 */}
            <section id="ai-features" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                12. AI & Automated Learning Features
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Our platform may incorporate AI-assisted debugging tools and personalized study recommenders (modeled after educational mentors like CS50&apos;s Duck Debugger). Code snippets or questions submitted to AI assistants are processed securely to provide real-time feedback and are not used to train public foundational models without anonymization.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Section 13 */}
            <section id="contact" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                13. Contact & Grievance Officer
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  If you have questions, grievances, or formal requests concerning this Privacy Policy or your data rights, please contact our Privacy Team:
                </p>
                <div className="rounded-2xl border border-border bg-card p-6 mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">DIRECT INQUIRIES</div>
                      <a href="mailto:privacy@kuldeeplearn.com" className="text-sm font-medium text-foreground hover:underline">
                        privacy@kuldeeplearn.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">POSTAL / REGISTERED OFFICE</div>
                      <p className="text-sm text-foreground font-medium">
                        KuldeepLearn Education Systems [Insert Registered Address]
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