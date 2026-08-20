import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Guest Kuldeep | Design Engineer & Writer",
    template: "%s | Kuldeep Blogs",
  },
  description: "A premium blog and portfolio for thoughtful design, frontend craft, and modern product storytelling.",
  metadataBase: new URL("https://kuldeepblogs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kuldeep Blogs",
    description: "Premium writing on design, frontend engineering, and product craft.",
    url: "https://kuldeepblogs.com",
    siteName: "Kuldeep Blogs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuldeep Blogs",
    description: "Premium writing on design, frontend engineering, and product craft.",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ReadingProgress />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
