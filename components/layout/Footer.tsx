import Link from "next/link";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { Newsletter } from "./Newsletter";

const footerLinks = {
  column2: {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "Lessons", href: "/learn" },
      { name: "Categories", href: "/categories" },
      { name: "About", href: "/about" },
    ],
  },
  column3: {
    title: "Resources",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "RSS Feed", href: "/rss.xml" },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-neutral-200/60 bg-white pt-16 dark:border-neutral-800/60 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Column 1 */}
          <div className="space-y-8 xl:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              Premium writing on design, frontend engineering, and product craft. Building beautiful experiences one pixel at a time.
            </p>
            <SocialLinks />
          </div>

          {/* Columns 2, 3, 4 */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            {/* Column 2 */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {footerLinks.column2.title}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLinks.column2.links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {footerLinks.column3.title}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLinks.column3.links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div className="md:col-span-1 sm:col-span-2 md:mt-0">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Subscribe
              </h3>
              <p className="mt-6 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                Get the latest posts delivered right to your inbox.
              </p>
              <Newsletter />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-neutral-200/60 pt-8 sm:mt-20 lg:mt-24 dark:border-neutral-800/60">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs leading-5 text-neutral-500 dark:text-neutral-400">
              &copy; {currentYear} Kuldeep. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span>v1.0.0</span>
              <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
              <span className="flex items-center gap-1">
                Built with
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-neutral-900 transition-colors hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
                >
                  Next.js
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
