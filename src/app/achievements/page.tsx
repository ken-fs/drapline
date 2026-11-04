import type { Metadata } from "next";
import Link from "next/link";
import { ACHIEVEMENTS, ACHIEVEMENTS_AS_OF } from "@/data/achievements";
import { GAME } from "@/data/game";
import { PageHeader, SourceNote, MetaStat } from "@/components/page-header";
import { AchievementTable } from "@/components/achievement-table";
import { FaqJsonLd } from "@/components/json-ld";
import { RarityBar } from "@/components/rarity-bar";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "All 66 DRAPLINE achievements with Steam unlock rates",
  description:
    "Every DRAPLINE achievement — the complete 66, not the incomplete 62 on the wiki — with Steam's global unlock rate, the elemental Divine Dragon titles, and a local checklist. Plus the storm-level achievement nobody explains.",
  alternates: { canonical: "/achievements/" },
};

const RAREST = [...ACHIEVEMENTS].sort((a, b) => a.pct - b.pct);
const ELEMENT_TITLES = ACHIEVEMENTS.filter((a) =>
  a.desc?.startsWith("Unlocked all Fragments of Space-Time"),
);
const STORM = ACHIEVEMENTS.find((a) => a.name === "A New Catastrophe?")!;

const FAQ = [
  {
    q: "How many achievements does DRAPLINE have?",
    a: "66. Steam reports them in the global achievements API, and the same 66 appear with their unlock rates on the Steam Community page. Fandom's achievement page still says 62 and marks itself incomplete.",
  },
  {
    q: "What is the rarest DRAPLINE achievement?",
    a: `${RAREST[0].name} at ${RAREST[0].pct}%, followed by ${RAREST[1].name} at ${RAREST[1].pct}% and ${RAREST[2].name} at ${RAREST[2].pct}%. No achievement is currently below ${Math.floor(RAREST[0].pct)}% globally.`,
  },
  {
    q: "What are the Divine Dragon of … achievements?",
    a: "Nine achievements named after elements — Poison, Lightning, Power, Curse, Illusion, Slumber, Flame, Blossoms and Logic. Each one unlocks after collecting all Fragments of Space-Time for its corresponding Calamity Dragon.",
  },
  {
    q: "What does the A New Catastrophe? achievement require?",
    a: `Pushing the storm's level to maximum. It is the only calamity achievement that describes a mechanic rather than a boss, and ${STORM.pct}% of players currently have it.`,
  },
];

export default function AchievementsPage() {
  const buckets = {
    common: ACHIEVEMENTS.filter((a) => a.pct >= 50).length,
    uncommon: ACHIEVEMENTS.filter((a) => a.pct >= 20 && a.pct < 50).length,
    rare: ACHIEVEMENTS.filter((a) => a.pct >= 10 && a.pct < 20).length,
    ultra: ACHIEVEMENTS.filter((a) => a.pct < 10).length,
  };

  return (
    <>
      <FaqJsonLd items={FAQ} />
      <PageHeader
        eyebrow={`Database · ${ACHIEVEMENTS.length} tracked`}
        title="Every DRAPLINE achievement, ordered by how rare it actually is"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            Steam publishes a global unlock rate for each achievement, which turns the list into a
            difficulty ranking written by the players themselves. This is the complete set — all 66,
            including the four the wiki never got to — with a checklist that stays in your browser.
          </p>
        }
        meta={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border lg:w-72">
            <div className="bg-card px-4 py-3">
              <dt className="eyebrow">Common 50%+</dt>
              <dd className="tnum mt-1 font-mono text-lg">{buckets.common}</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="eyebrow">Uncommon</dt>
              <dd className="tnum mt-1 font-mono text-lg">{buckets.uncommon}</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="eyebrow">Rare</dt>
              <dd className="tnum mt-1 font-mono text-lg">{buckets.rare}</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="eyebrow">Very rare</dt>
              <dd className="tnum mt-1 font-mono text-lg">{buckets.ultra}</dd>
            </div>
          </dl>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <AchievementTable />
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          Unlock rates were pulled from Steam Community on {ACHIEVEMENTS_AS_OF}. They move as the player
          base grows — a newly released game&apos;s rare achievements get less rare every week.
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pt-10">
        <AdsterraBanner slot={RECTANGLE} className="items-start" />
      </div>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Fragment unlocks</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Nine elemental titles, one fragment set each</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Steam now publishes the requirement for every elemental title: collect all Fragments of
              Space-Time for the corresponding Calamity Dragon. The requirements below are transcribed
              from that official achievement metadata.
            </p>
            <ul className="mt-5 space-y-2.5">
              {ELEMENT_TITLES.map((e) => (
                <li key={e.name} className="flex items-center justify-between gap-4 border-b border-border/60 pb-2.5">
                  <span className="text-sm">
                    {e.name}
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">{e.desc}</span>
                  </span>
                  <RarityBar pct={e.pct} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Mechanic</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">The storm has a level, and it goes to MAX</h2>
            <div className="panel mt-5 p-6">
              <p className="text-sm font-medium">“{STORM.name}” — {STORM.pct}%</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Requirement as printed: {STORM.desc}.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The one calamity achievement that names a mechanic rather than a boss; roughly one
                player in eight has pushed the storm to maximum.
              </p>
            </div>
            <h3 className="mt-8 text-base font-semibold tracking-tight">Where to start if you want 100%</h3>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">1.</strong> Finish a run at all — the largest cluster
                sits between 60% and 90%, so a single clear collects most of the list.
              </li>
              <li>
                <strong className="text-foreground">2.</strong> Take the four{" "}
                <Link href="/auras/" className="underline underline-offset-2">
                  aura achievements
                </Link>{" "}
                on separate runs; the feeding patterns are mutually exclusive.
              </li>
              <li>
                <strong className="text-foreground">3.</strong> Chase the hardest achievements last —{" "}
                {RAREST.slice(0, 4).map((a) => a.name).join(", ")} are where the list stops being a
                clear and starts being a project.
              </li>
            </ol>
            <div className="mt-6 flex gap-4">
              <MetaStat label="Achievements" value={GAME.achievementsTotal} />
              <MetaStat label="Below 10%" value={buckets.ultra} />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-5">
          <SourceNote>
            Achievement names, descriptions and unlock rates: Steam global achievement endpoints and the
            Steam Community achievement page for app 3103780, pulled {ACHIEVEMENTS_AS_OF}. Fandom&apos;s list was
            used only to confirm which entries are missing from it.
          </SourceNote>
        </div>
      </section>
    </>
  );
}
