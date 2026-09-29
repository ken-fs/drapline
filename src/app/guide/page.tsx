import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { GAME } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";

export const metadata: Metadata = {
  title: "DRAPLINE guides — where to start and what a year looks like",
  description:
    "Four guides that cover a DRAPLINE run end to end: the first year week by week, the Rule/Wild personality system, the money and debt math, and the questions everyone asks first.",
  alternates: { canonical: "/guide/" },
};

const GUIDES = [
  {
    href: "/guide/beginner/",
    title: "The first year, week by week",
    desc: "What happens in each season, the four boss weeks, and the three habits that decide whether the run survives to week 48.",
    meta: "Start here · 8 min",
  },
  {
    href: "/guide/personality/",
    title: "Rule, Wild and what they really change",
    desc: "The sliding bar, the two permanent buffs it grants, the fifth skill slot, and why the aura is a different system entirely.",
    meta: "Mechanics · 6 min",
  },
  {
    href: "/guide/money/",
    title: "Money, debt and the ending it causes",
    desc: "Where gold comes from, what meals cost, and the arithmetic that separates a loan from a lost run.",
    meta: "Economy · 5 min",
  },
  {
    href: "/guide/faq/",
    title: "FAQ",
    desc: "How long a run takes, whether the aura matters mechanically, how many endings there really are, and the rest of the questions the game does not answer.",
    meta: "14 answers",
  },
];

const SEASONS = [
  { w: "Weeks 1–20", s: "Spring", note: "Setup: naming Coo, the first meals, meeting the village, and Morgentiana's offer." },
  { w: "June, Week 4", s: "First calamity", note: "Cham, Melty or Thunder. A health check more than a wall." },
  { w: "Sept, Week 4", s: "Second calamity", note: "Labryn or Noir. Also the aura deadline — the check runs right after." },
  { w: "Oct, Week 1", s: "Aura locks", note: "Coo's portrait becomes permanent for the year." },
  { w: "Dec, Week 4", s: "Third calamity", note: "Moon. The fight that punishes coasting through autumn." },
  { w: "Mar (Y2), Week 4", s: "Final calamity", note: "Ouroboros, at run week 48, followed by the ending." },
];

export default function GuideHub() {
  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="A DRAPLINE run is 48 weeks long and about an hour of your time"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            The game is built for repetition — a full run is short, endings branch, and the interesting
            decisions repeat every seven in-game days. These guides cover the systems rather than one
            lucky route: what each season demands, how personality and aura differ, and where the money
            maths breaks.
          </p>
        }
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">Shape of a run</p>
            <p className="tnum mt-1 font-mono text-lg">{GAME.weeksPerRun} weeks</p>
            <p className="mt-1 text-xs text-muted-foreground">Four boss weeks. One aura check.</p>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="group bg-card p-6 transition-colors hover:bg-muted/50">
              <h2 className="text-lg font-semibold tracking-tight">{g.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{g.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">{g.meta}</span>
                <ArrowRight size={14} weight="bold" className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">The year at a glance</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow pb-3 text-left">When</th>
                  <th className="eyebrow pb-3 text-left">What</th>
                  <th className="eyebrow pb-3 text-left">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {SEASONS.map((s) => (
                  <tr key={s.w} className="border-b border-border/60 align-top">
                    <td className="tnum py-3 pr-6 font-mono text-xs">{s.w}</td>
                    <td className="py-3 pr-6 font-medium">{s.s}</td>
                    <td className="py-3 text-muted-foreground">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { href: "/auras/", t: "Six auras", d: "What the October check is reading, and how to steer it." },
            { href: "/meals/", t: "Meal table", d: "The category-to-stat map with printed numbers." },
            { href: "/endings/", t: "Endings", d: "Five named outcomes and the 25 futures that follow." },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="panel p-5 transition-colors hover:border-foreground/30">
              <p className="text-sm font-semibold">{x.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
            </Link>
          ))}
        </section>

        <SourceNote>
          Season and boss-window structure assembled from in-game progress reports transcribed by the
          community and cross-checked against the achievement set. Run length per the store page
          (&ldquo;as little as about one hour&rdquo;).
        </SourceNote>
      </div>
    </>
  );
}
