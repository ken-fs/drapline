"use client";

import { useState } from "react";
import Link from "next/link";
import { MEAL_CATEGORIES, MEAL_TIERS } from "@/data/game";

/**
 * Meal affordability comparison.
 *
 * Only documented numbers are computed with: the three tier prices and the
 * printed stat values from the meal list. Where a category has no recorded
 * numbers at a tier, the cell says so instead of estimating — an invented
 * number here would be worse than a blank, because players would plan on it.
 */
export function MealCompare() {
  const [gold, setGold] = useState(15000);
  const [weeks, setWeeks] = useState(12);

  const rows = MEAL_TIERS.map((t) => {
    const priceNum = Number(t.price.replace(/[^\d]/g, ""));
    const affordableWeeks = Math.floor(gold / priceNum);
    return {
      ...t,
      priceNum,
      affordableWeeks,
      covers: affordableWeeks >= weeks,
      weekly: (priceNum / gold) * 100,
    };
  });

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="panel p-5">
          <span className="eyebrow">Gold on hand</span>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={3000}
              max={60000}
              step={500}
              value={gold}
              onChange={(e) => setGold(Number(e.target.value))}
              className="flex-1 accent-[var(--lime-text)]"
            />
            <span className="tnum w-20 text-right font-mono text-lg">{gold.toLocaleString()}</span>
          </div>
        </label>
        <label className="panel p-5">
          <span className="eyebrow">Weeks left to feed</span>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={48}
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="flex-1 accent-[var(--lime-text)]"
            />
            <span className="tnum w-20 text-right font-mono text-lg">{weeks}</span>
          </div>
        </label>
      </div>

      <div className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.stars} className="bg-card p-6">
            <p className="eyebrow">{"★".repeat(r.stars)} tier</p>
            <p className="tnum mt-2 font-mono text-2xl">{r.price}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{r.note}</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Weeks your gold buys</dt>
                <dd className="tnum font-mono">{r.affordableWeeks}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Covers remaining weeks</dt>
                <dd className={`font-medium ${r.covers ? "" : "text-[var(--ember-deep)]"}`}>
                  {r.covers ? "Yes" : "No"}
                </dd>
              </div>
            </dl>
            {!r.covers && (
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Short by {weeks - r.affordableWeeks} weeks. Borrowing the difference from Calico is what
                turns a shopping problem into the Use Responsibly ending.
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <p className="eyebrow">What each category gives, where numbers exist</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="eyebrow pb-3 text-left">Category</th>
                <th className="eyebrow pb-3 text-left">Stat direction</th>
                <th className="eyebrow pb-3 text-left">Documented output</th>
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
                  <td className="py-3 font-mono text-xs text-muted-foreground">{m.tier1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          Second-tier meals frequently scale their bonus off how low the fed stat is, and third-tier
          meals sometimes add special effects. Neither rule has published numbers that hold across all
          categories, so this table shows the documented first-tier values and nothing it cannot
          support.
        </p>
      </div>
    </div>
  );
}
