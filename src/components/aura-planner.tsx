"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AURAS, MEAL_CATEGORIES } from "@/data/game";
import { cn } from "@/lib/utils";

type Focus = "offense" | "defense" | "intelligence" | "unsure";
type Treatment = "lenient" | "strict" | "unsure";

const FOCUS_LABEL: Record<Focus, string> = {
  offense: "Attack stats (Strength / Agility)",
  defense: "Defence stats (HP / Vitality / Resilience)",
  intelligence: "Intelligence-led",
  unsure: "Not sure / spread evenly",
};

const TREATMENT_LABEL: Record<Treatment, string> = {
  lenient: "Lenient — let Coo eat, skip the scolding",
  strict: "Strict — refuse the food, scold the failures",
  unsure: "Not sure",
};

/**
 * Aura planner.
 *
 * The mapping is small enough to be exact: three feeding directions against two
 * treatments cover five of the six auras, and the sixth (Whimsical) is the
 * Intelligence direction under strict handling with one extra condition. Where
 * the player is unsure, the planner says so rather than inventing a verdict —
 * "unsure" is a real answer for a first run.
 */
export function AuraPlanner() {
  const [focus, setFocus] = useState<Focus>("offense");
  const [treatment, setTreatment] = useState<Treatment>("lenient");

  const result = useMemo(() => {
    if (focus === "unsure" || treatment === "unsure") return null;
    const slug =
      focus === "offense"
        ? treatment === "lenient"
          ? "adored"
          : "mischievous"
        : focus === "defense"
          ? treatment === "lenient"
            ? "chill"
            : "reserved"
          : treatment === "lenient"
            ? "steady"
            : "whimsical";
    return AURAS.find((a) => a.slug === slug) ?? null;
  }, [focus, treatment]);

  const feeds = result
    ? MEAL_CATEGORIES.filter((m) => result.feeds.includes(m.slug))
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-8">
        <fieldset>
          <legend className="eyebrow">Step 1 · What have you been feeding?</legend>
          <div className="mt-3 space-y-2">
            {(Object.keys(FOCUS_LABEL) as Focus[]).map((f) => (
              <label
                key={f}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-[var(--radius-container)] border p-3 text-sm transition-colors",
                  focus === f ? "border-foreground/50 bg-muted" : "border-border hover:border-foreground/30",
                )}
              >
                <input
                  type="radio"
                  name="focus"
                  checked={focus === f}
                  onChange={() => setFocus(f)}
                  className="accent-[var(--lime-text)]"
                />
                {FOCUS_LABEL[f]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow">Step 2 · How have you been treating her?</legend>
          <div className="mt-3 space-y-2">
            {(Object.keys(TREATMENT_LABEL) as Treatment[]).map((t) => (
              <label
                key={t}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-[var(--radius-container)] border p-3 text-sm transition-colors",
                  treatment === t ? "border-foreground/50 bg-muted" : "border-border hover:border-foreground/30",
                )}
              >
                <input
                  type="radio"
                  name="treatment"
                  checked={treatment === t}
                  onChange={() => setTreatment(t)}
                  className="accent-[var(--lime-text)]"
                />
                {TREATMENT_LABEL[t]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <p className="eyebrow">Verdict at the October check</p>
        {result ? (
          <div className="panel mt-3 p-6">
            <h3 className="text-2xl font-semibold tracking-tight">{result.name}</h3>
            <p className="tnum mt-1 font-mono text-xs text-muted-foreground">
              {result.pct}% of players have this one
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{result.blurb}</p>
            {result.slug === "whimsical" && (
              <p className="mt-4 rounded-[var(--radius-container)] border border-border p-3 text-sm leading-6">
                <strong>Extra condition.</strong> Intelligence must be the leading stat{" "}
                <em>and</em> Agility must sit above Strength. Feeding Strength early is the usual way
                this one quietly fails.
              </p>
            )}
            <p className="eyebrow mt-6">Feed these categories</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {feeds.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/meals/${m.slug}/`}
                    className="inline-block rounded-[var(--radius-control)] border border-border px-3 py-1 text-xs hover:border-foreground/40"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/auras/${result.slug}/`} className="mt-6 inline-block text-sm font-medium underline underline-offset-2">
              Full {result.name} conditions →
            </Link>
          </div>
        ) : (
          <div className="panel mt-3 p-6">
            <p className="text-sm leading-6 text-muted-foreground">
              Pick a feeding focus and a treatment. If a run is already past October Week 1 the aura is
              locked — there is no second reading, so changing anything now will not move it.
            </p>
          </div>
        )}

        <div className="panel mt-6 p-6">
          <p className="eyebrow">Compare all six</p>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {AURAS.map((a) => (
                <tr key={a.slug} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-4">
                    <Link href={`/auras/${a.slug}/`} className="underline underline-offset-2">
                      {a.name}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-xs text-muted-foreground">{a.focus}</td>
                  <td className="py-2 text-right font-mono text-xs text-muted-foreground">{a.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
