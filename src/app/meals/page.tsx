import type { Metadata } from "next";
import Link from "next/link";

import { MEAL_CATEGORIES, MEAL_TIERS, MEAL_TRAITS, STATS } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { ItemListJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DRAPLINE meals: category-to-stat table and what each tier costs",
  description:
    "Every DRAPLINE food category and the stat it feeds, the 3,000 / 6,600 / 14,600 G star tiers, the four meal traits and the stamina costs — the feeding table the game only shows you three meals at a time.",
  alternates: { canonical: "/meals/" },
};

const FAQ = [
  {
    q: "Which DRAPLINE meal should I pick?",
    a: "Pick by category first and price second. The category decides which of the six stats grows, so it should match the skill tree you are building toward; the star rating only decides how much you pay. A 3,000 G meal in the right category beats a 14,600 G meal in the wrong one.",
  },
  {
    q: "Is a three-star meal always better?",
    a: "No. Second-tier meals often scale with your weakness — Wild Meat gives Strength +400 base and grows when Strength is low — which makes them the efficient choice for fixing a lagging stat. Third-tier meals add special effects and size, but a cheap meal you can afford every week compounds further.",
  },
  {
    q: "What are the meal traits?",
    a: "Poisonous costs 35 stamina, Rapid Growth scales its bonus off how low the fed stat is, Nutritious trades stat size for 30 stamina back, and Reversal swaps two of Coo's stats.",
  },
  {
    q: "How much do DRAPLINE meals cost?",
    a: "Three tiers: one star is 3,000 G, two stars 6,600 G, three stars 14,600 G. You can take a loan from Calico to pay, but staying indebted is one of the losing endings.",
  },
];

export default function MealsHub() {
  return (
    <>
      <ItemListJsonLd name="DRAPLINE meal categories" items={MEAL_CATEGORIES} path="/meals/" />
      <FaqJsonLd items={FAQ} />
      <PageHeader
        eyebrow="Database · 12 categories"
        title="DRAPLINE meals, sorted by the only thing that matters: which stat they grow"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            Meals are the only way to make Coo stronger. Every week offers three of them, each with a
            category, a star rating and a price — and that is the whole decision. This is the full
            category map with documented examples and numbers, instead of the three options one
            playthrough happens to show you.
          </p>
        }
        meta={
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-3 lg:w-80 lg:grid-cols-1">
            {MEAL_TIERS.map((t) => (
              <div key={t.stars} className="bg-card px-5 py-4">
                <p className="tnum font-mono text-lg">{t.price}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {"★".repeat(t.stars)} — {t.note}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="eyebrow pb-3 text-left">Category</th>
                <th className="eyebrow pb-3 text-left">Stat direction</th>
                <th className="eyebrow pb-3 text-left">Documented example</th>
                <th className="eyebrow pb-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {MEAL_CATEGORIES.map((m) => (
                <tr key={m.slug} className="border-b border-border/60 align-top">
                  <td className="py-3 pr-6">
                    <Link href={`/meals/${m.slug}/`} className="font-medium underline underline-offset-2">
                      {m.name}
                    </Link>
                  </td>
                  <td className="py-3 pr-6 font-mono text-xs">{m.stats}</td>
                  <td className="py-3 pr-6 text-muted-foreground">{m.tier1}</td>
                  <td className="py-3 text-muted-foreground">{m.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">What the six stats actually do</h2>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              {STATS.map((s) => (
                <div key={s.key} className="flex gap-6 py-3">
                  <dt className="w-14 shrink-0 font-mono text-sm font-medium">{s.key}</dt>
                  <dd className="text-sm text-muted-foreground">{s.effect}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Skills scale off specific stats, so the feeding direction and the skill tree have to
              agree. That is the whole reason the category matters more than the price.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">The four meal traits</h2>
            <ul className="mt-5 space-y-4">
              {MEAL_TRAITS.map((t) => (
                <li key={t.name} className="panel p-4">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.effect}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Meal names are procedurally prefixed — the noun (Log, Bone, Kraken) is the stable part,
              the adjective is not. Guide for a specific name and what you are really looking for is
              the noun and the numbers.
            </p>
          </div>
        </section>

        <SourceNote>
          Category examples and printed numbers: the in-game meal list as transcribed on the Fandom
          wiki, cross-checked against meal prices recorded independently. Trait behaviour and stamina
          costs: in-game observation via Fandom. Tier prices: verified against the current patch.
        </SourceNote>
      </div>
    </>
  );
}
