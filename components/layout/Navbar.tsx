import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/lessons", label: "Lessons" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-8">
        <Logo />
        <DesktopNav items={navItems} />
      </div>
      
      <div className="flex items-center gap-3 lg:gap-4">
        <SearchDialog />
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <MobileNav items={navItems} />
      </div>
    </div>
  );
}
