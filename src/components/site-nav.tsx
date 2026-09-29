"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { href: "/tools/", label: "Tools" },
  { href: "/auras/", label: "Auras" },
  { href: "/meals/", label: "Meals" },
  { href: "/characters/", label: "Cast" },
  { href: "/achievements/", label: "Achievements" },
  { href: "/endings/", label: "Endings" },
  { href: "/guide/", label: "Guide" },
];

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <ScaleMark />
          <span className="font-heading text-[15px] font-semibold tracking-tight">
            Drapline<span className="text-muted-foreground"> Lab</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                "rounded-[var(--radius-control)] px-3 py-1.5 text-sm transition-colors " +
                (isActive(l.href)
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-[var(--radius-control)] sm:inline-flex">
            <a href="https://store.steampowered.com/app/3103780/DRAPLINE/" target="_blank" rel="noopener">
              DRAPLINE on Steam
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-[var(--radius-control)] lg:hidden"
                aria-label="Open menu"
              >
                <List size={18} weight="bold" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="px-4 pt-4 text-sm font-semibold">Menu</SheetTitle>
              <nav className="mt-4 flex flex-col px-2" aria-label="Mobile">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={
                      "rounded-[var(--radius-container)] px-3 py-2.5 text-sm " +
                      (isActive(l.href)
                        ? "bg-muted font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground")
                    }
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/**
 * A single dragon scale, drawn as a shield-ish rhombus with an inner facet
 * line. Reads as a scale rather than a generic polygon, and it is not the
 * game's own logo — this is a fan reference, not a storefront.
 */
function ScaleMark() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" aria-hidden="true" className="shrink-0">
      <path
        d="M10 1.4c3.6 2.5 6.4 4 8.6 4.6-.4 5.6-1.8 9.7-4.2 12.4C12.4 20.4 11.2 21 10 21.6c-1.2-.6-2.4-1.2-4.4-3.2C3.2 15.7 1.8 11.6 1.4 6 3.6 5.4 6.4 3.9 10 1.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 4.6v13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <path d="M4.6 8.8c3.4 1.4 7.4 1.4 10.8 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
