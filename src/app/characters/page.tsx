import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CHARACTERS } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { ItemListJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DRAPLINE cast and calamity dragons, with boss windows",
  description:
    "Every DRAPLINE character: the seven villagers you trade and train with, Coo, Morgentiana, and the full calamity dragon roster with their boss weeks and defeat rates — including the four calamities no wiki lists.",
  alternates: { canonical: "/characters/" },
};

export default function CharactersHub() {
  const villagers = CHARACTERS.filter((c) => c.kind === "villager");
  const main = CHARACTERS.filter((c) => c.kind === "companion" || c.kind === "dragon");
  const calamities = CHARACTERS.filter((c) => c.kind === "calamity");
  const documented = calamities.filter((c) => !c.undocumented);
  const undocumented = calamities.filter((c) => c.undocumented);

  return (
    <>
      <ItemListJsonLd name="DRAPLINE characters" items={CHARACTERS} path="/characters/" />
      <PageHeader
        eyebrow={`Database · ${CHARACTERS.length} entries`}
        title="Who is in DRAPLINE, and when they want something from you"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            Two groups matter to a run: the villagers whose requests shape Coo&apos;s week, and the
            calamity dragons standing at the four boss weeks. The calamity roster below is longer than
            any wiki currently states — four of the dragons are only visible in Steam&apos;s
            achievement data, and we list them as what they are rather than filling the gaps in.
          </p>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Coo and the dragon folk</h2>
          <figure className="mt-5">
            <Image
              src="/images/shot-8.jpg"
              alt="Arches the werewolf hunter and Knot the shark fisherman talking in the DRAPLINE village, with the harbour and cliffside houses behind them"
              width={1920}
              height={1080}
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="h-auto w-full rounded-[var(--radius-container)] border border-border"
            />
            <figcaption className="mt-2 font-mono text-[10px] leading-4 text-muted-foreground">
              Arches and Knot — the two villagers whose requests shape a week&apos;s action. © KANAWO / Vaka,
              Inc. (official Steam screenshot)
            </figcaption>
          </figure>
          <div className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {main.map((c) => (
              <CharacterCard key={c.slug} c={c} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Calamity dragons, by boss window</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow pb-3 text-left">Dragon</th>
                  <th className="eyebrow pb-3 text-left">Element / role</th>
                  <th className="eyebrow pb-3 text-left">Fight window</th>
                  <th className="eyebrow pb-3 text-right">Players who beat it</th>
                </tr>
              </thead>
              <tbody>
                {documented.map((c) => (
                  <tr key={c.slug} className="border-b border-border/60 align-top">
                    <td className="py-3 pr-6">
                      <Link href={`/characters/${c.slug}/`} className="font-medium underline underline-offset-2">
                        {c.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-6 text-muted-foreground">{c.role}</td>
                    <td className="py-3 pr-6 text-muted-foreground">{c.schedule ?? "Final fight"}</td>
                    <td className="tnum py-3 text-right font-mono text-xs">
                      {c.defeat ? `${c.defeat.pct}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <p className="eyebrow">Only in the achievement data</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">
            The {undocumented.length} calamities no wiki documents
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Steam ships defeat achievements for enemies the wikis never wrote up. We refuse to invent
            elements, moves or weeks for them, so each entry says exactly what the achievement says and
            nothing more — which is still more than any other DRAPLINE site currently publishes.
          </p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {undocumented.map((c) => (
              <CharacterCard key={c.slug} c={c} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">The village</h2>
          <div className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {villagers.map((c) => (
              <CharacterCard key={c.slug} c={c} />
            ))}
          </div>
        </section>

        <SourceNote>
          Compendium descriptions quoted from the in-game character Compendium as transcribed by the
          Fandom wiki. Defeat rates: Steam Community global achievements, 2026-09-29. Boss weeks for the
          four documented dragons: community observation, consistent across sources.
        </SourceNote>
      </div>
    </>
  );
}

function CharacterCard({ c }: { c: (typeof CHARACTERS)[number] }) {
  return (
    <Link href={`/characters/${c.slug}/`} className="group flex flex-col bg-card p-6 transition-colors hover:bg-muted/50">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">{c.name}</h3>
        {c.defeat && <span className="tnum font-mono text-xs text-muted-foreground">{c.defeat.pct}%</span>}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{c.role}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{c.entry.slice(0, 150)}…</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
        Read <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
