import Link from "next/link";
import { GAME } from "@/data/game";

const COLUMNS = [
  {
    title: "Database",
    links: [
      { href: "/auras/", label: "All six auras" },
      { href: "/meals/", label: "Meal table" },
      { href: "/characters/", label: "Cast and calamities" },
      { href: "/achievements/", label: "Achievements" },
      { href: "/endings/", label: "Endings" },
      { href: "/skills/", label: "Skills and synergies" },
      { href: "/soundtrack/", label: "Soundtrack (22 tracks)" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/guide/", label: "Start here" },
      { href: "/guide/beginner/", label: "First year walkthrough" },
      { href: "/guide/personality/", label: "Rule, Wild and auras" },
      { href: "/guide/money/", label: "Money and debt" },
      { href: "/guide/faq/", label: "FAQ" },
      { href: "/updates/", label: "Patch log" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/tools/aura-planner/", label: "Aura planner" },
      { href: "/tools/meal-compare/", label: "Meal tier comparison" },
      { href: "/achievements/", label: "Achievement checklist" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-sm font-semibold tracking-tight">Drapline Field Lab</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            An independent, fan-made reference for DRAPLINE. Numbers come from Steam&apos;s own APIs
            and in-game text; nothing here is estimated.
          </p>
          <a
            href={GAME.steamUrl}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block text-sm font-medium underline underline-offset-2"
          >
            Buy DRAPLINE on Steam
          </a>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            Not affiliated with KANAWO or Vaka Game Magazine. DRAPLINE and its artwork belong to
            them.
          </p>
          <p className="sm:ml-auto">
            <Link href="/about/" className="underline underline-offset-2">
              About &amp; sources
            </Link>{" "}
            · Data checked {GAME.reviews.asOf} · patch{" "}
            <Link href="/updates/" className="underline underline-offset-2">
              1.0.2
            </Link>{" "}
            ·{" "}
            <Link href="/privacy/" className="underline underline-offset-2">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
