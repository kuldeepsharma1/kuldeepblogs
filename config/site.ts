/**
 * @fileoverview Site-wide configuration.
 * Single source of truth for branding, navigation, and metadata.
 */

export const siteConfig = {
  name: "KuldeepLearn",
  shortName: "KLearn",
  description:
    "A modern learning platform for frontend engineering, design systems, and product craft.",
  url: "https://kuldeepblogs.com",
  author: {
    name: "Kuldeep Sharma",
    role: "Design Engineer & Writer",
    url: "https://kuldeepblogs.com/about",
  },
  social: {
    twitter: "https://twitter.com/kuldeepsharma",
    github: "https://github.com/kuldeepsharma",
    linkedin: "https://linkedin.com/in/kuldeepsharma",
  },
  nav: {
    main: [
      { href: "/", label: "Home" },
      { href: "/blog", label: "Blog" },
      { href: "/learn", label: "Learn" },
      { href: "/about", label: "About" },
    ],
    learn: [
      { href: "/learn", label: "Dashboard" },
      { href: "/learn/courses", label: "Courses" },
      { href: "/learn/paths", label: "Learning Paths" },
      { href: "/learn/badges", label: "Badges" },
      { href: "/learn/bookmarks", label: "Bookmarks" },
      { href: "/learn/glossary", label: "Glossary" },
      { href: "/learn/resources", label: "Resources" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
