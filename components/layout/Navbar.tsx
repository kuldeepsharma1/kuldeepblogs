import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";

import { siteConfig } from "@/config/site";

const navItems = [...siteConfig.nav.main];

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
