"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9 rounded-md border border-border" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 rounded-md border border-border bg-background hover:bg-muted transition-colors duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 text-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 text-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}

