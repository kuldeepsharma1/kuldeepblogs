import { AboutSection } from "@/components/sections/about-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">

      <main>
        <HeroSection />
        <FeaturedSection />
        <AboutSection />
      </main>

    </div>
  );
}
