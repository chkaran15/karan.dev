"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
      onClick={toggleTheme}
      className="group border-border bg-background/70 text-foreground hover:border-premium/60 hover:text-accent focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-[0_8px_18px_-14px_var(--premium-glow)] backdrop-blur-xl transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
