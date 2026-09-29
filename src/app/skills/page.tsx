import type { Metadata } from "next";
import Link from "next/link";
import { SKILL_ATTRIBUTES, SKILL_SYNERGY, GAME, PERSONALITY } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DRAPLINE skills: six attribute trees and the 3/6/9 synergy ladder",
  description:
    "How DRAPLINE skills work — the six attribute trees, the 3/6/9 synergy thresholds that gate Triple Threat, Greater Power and The Professional, the four-versus-five skill slot rule, and the documented skills in each tree.",
  alternates: { canonical: "/skills/" },
};

const FAQ = [
  {
    q: "How many skills are in DRAPLINE?",
    a: "The store page says over 200. They are grouped into six attribute trees — Horn, Claw, Wing, Scale, Roar and Neutral — and fielding three skills of one tree activates a Level 1 synergy.",
  },
  {
    q: "How do DRAPLINE synergies work?",
    a: "Three skills of one attribute gives a Level 1 synergy (Triple Threat), six gives Level 2 (Greater Power), and nine gives Level 3 (The Professional). The higher tiers are rare achievements because nine slots of one tree is a committed build.",
  },
  {
    q: "How many skills can Coo equip?",
    a: "Four by default. A strongly Rule-aligned Coo — scolded and praised consistently through the year — can equip five, which is one of the mechanical reasons to stay strict.",
  },
];

export default function SkillsPage() {
  return (
    <>
      <FaqJsonLd items={FAQ} />
      <PageHeader
        eyebrow="Systems · 6 trees"
        title="DRAPLINE skills are a synergy system, not a shopping list"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            Over {GAME.skillCount.replace("+", "")} skills ship in the game, and the interesting part is not
            any individual one — it is that the trees reward commitment. Three skills of the same attribute
            switch on a synergy; nine switch on the best one.
          </p>
        }
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">Synergy ladder</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex justify-between">
                <span>3 skills</span> <span className="font-mono text-xs text-muted-foreground">Lv.1 · 89.7%</span>
              </li>
              <li className="flex justify-between">
                <span>6 skills</span> <span className="font-mono text-xs text-muted-foreground">Lv.2 · 83.6%</span>
              </li>
              <li className="flex justify-between">
                <span>9 skills</span> <span className="font-mono text-xs text-muted-foreground">Lv.3 · 63.6%</span>
              </li>
            </ul>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">The six trees</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Each tree has a personality: Horn trades accuracy for power, Wing scales off Agility instead
            of Strength, Scale punishes things that hit you. The tree you commit to should decide which
            meal categories you buy — that is the single most important coupling in the game.
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_ATTRIBUTES.map((s) => (
              <article key={s.name} className="bg-card p-6">
                <h3 className="font-heading text-base font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">How the ladder works</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{SKILL_SYNERGY}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              The unlock rates tell the story of how people actually play: 89.7% of players have switched
              on a single synergy and 83.6% have reached the six-skill tier, but only 63.6% ever reach
              nine. The first two rungs come free to almost everyone who finishes a run; the third is
              where a build stops being incidental and starts being planned.
            </p>
            <div className="prose-wiki mt-6">
              <h3>Documented skills worth knowing</h3>
              <ul>
                <li>
                  <strong>Dynamic Vision</strong> (Horn, passive) — Accuracy +20%, the fix for Horn&apos;s
                  unreliable physical attacks.
                </li>
                <li>
                  <strong>Mindfulness</strong> (Claw, buff, 4-turn cooldown) — reduces every other
                  skill&apos;s cooldown by 2. Does not reduce its own.
                </li>
                <li>
                  <strong>Sonic Blade</strong> (Wing, magic) — power scales off Coo&apos;s own AGI rather
                  than Intelligence, which is why Agility builds have a magic route.
                </li>
                <li>
                  <strong>Wind Blade</strong> (Wing, buff, 5 turns) — deals damage equal to Coo&apos;s AGI
                  to a random target every turn while active.
                </li>
                <li>
                  <strong>Curse</strong> (Scale, 10-turn cooldown) — deals back the total damage you have
                  taken, capped at Coo&apos;s max HP. A boss killer in long fights.
                </li>
                <li>
                  <strong>Reactive Magic C</strong> (Roar, passive) — +15% counter rate when hit by magic.
                </li>
                <li>
                  <strong>Punch</strong> (Neutral) — zero cooldown starter.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What the tree choice couples to</h2>
            <div className="mt-5 space-y-4">
              <div className="panel p-5">
                <p className="text-sm font-medium">Feeding</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  A Wing build wants Agility. Feeding Meat will produce a dragon with a good stat and the
                  wrong one. See the{" "}
                  <Link href="/meals/" className="underline underline-offset-2">
                    meal table
                  </Link>
                  .
                </p>
              </div>
              <div className="panel p-5">
                <p className="text-sm font-medium">Personality</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Rule-aligned Coo equips five skills instead of four — a free extra synergy rung. Wild-aligned
                  Coo gets {PERSONALITY.wild.buff}: up to +100% critical rate when she ignores your orders,
                  with +50% damage taken.
                </p>
              </div>
              <div className="panel p-5">
                <p className="text-sm font-medium">Aura</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The aura is decided by feeding direction, so the tree, the meals and the aura are one
                  decision made three times.{" "}
                  <Link href="/auras/" className="underline underline-offset-2">
                    Check the six auras
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <SourceNote>
          Tree descriptions and quoted passive effects: in-game skill text transcribed via Fandom. The
          200+ skill count and the synergy ladder: Steam store page and the achievement descriptions for
          Triple Threat, Greater Power and The Professional. Unlock rates: Steam Community, 2026-09-29.
          Individual skill numbers beyond the documented list are not published by the game.
        </SourceNote>
      </div>
    </>
  );
}
