import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Kuldeep | Design Engineer & Writer",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full bg-white text-zinc-950 antialiased transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <ReadingProgress />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
