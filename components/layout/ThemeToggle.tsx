"use client"

import { useTheme } from "next-themes"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"




export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="flex justify-center p-6">
      <AnimatedThemeToggler
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onThemeChange={setTheme}
      />
    </div>
  )
}
