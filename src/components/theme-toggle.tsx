"use client";

import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const KEY = "dl-theme";

/**
 * Theme toggle with no React state at all.
 *
 * Both icons are rendered and CSS picks one, so there is nothing to hydrate and
 * no flash of the wrong icon. The click handler reads the class the head script
 * already applied and writes the opposite back to it, which keeps the button and
 * the painted page in agreement by construction.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* private mode: the choice still applies to this page view */
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      className="rounded-[var(--radius-control)] text-muted-foreground"
      aria-label="Toggle dark theme"
    >
      <Moon size={16} weight="bold" className="dark:hidden" />
      <Sun size={16} weight="bold" className="hidden dark:block" />
    </Button>
  );
}
