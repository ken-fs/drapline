import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { AURAS, AURA_LOCK, PERSONALITY } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { RarityBar } from "@/components/rarity-bar";
import { ItemListJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "All six DRAPLINE auras and their conditions",
  description:
    "The complete DRAPLINE aura list — Adored, Chill, Mischievous, Reserved, Steady and Whimsical — with the stat focus and handling each one needs, when the aura locks, and Steam's unlock rate for every one.",
  alternates: { canonical: "/auras/" },
};

export default function AurasHub() {
  return (
    <>
      <ItemListJsonLd name="DRAPLINE auras" items={AURAS} path="/auras/" />
      <PageHeader
        eyebrow="Database · 6 entries"
        title="Every DRAPLINE aura, and what each one is asking for"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <>
            <p>
              An aura is not a personality and not a reward. It is a one-time verdict: on the first
              week of October the game reads how you fed Coo and how you treated her, then locks her
              appearance for the rest of the run. Six outcomes exist — the four that shipped during
              Early Access, plus <strong>Steady</strong> and <strong>Whimsical</strong>, which most
              wikis still do not list.
            </p>
          </>
        }
        meta={
          <div className="panel px-5 py-4 lg:max-w-xs">
            <p className="eyebrow">The check</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{AURA_LOCK}</p>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {AURAS.map((a) => (
            <Link key={a.slug} href={`/auras/${a.slug}/`} className="group flex flex-col bg-card p-6 transition-colors hover:bg-muted/50">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-tight">{a.name}</h2>
                <span className="eyebrow">{a.treatment}</span>
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">{a.focus}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{a.blurb}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <RarityBar pct={a.pct} />
                <ArrowRight size={14} weight="bold" className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-12">
          <p className="eyebrow">Reading the table</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Two dials decide the aura — and one of them is not the personality bar</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="panel p-6">
              <h3 className="text-base font-semibold tracking-tight">Dial one: lenient or strict</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Community shorthand, not an in-game label. Lenient is the {PERSONALITY.wild.name}-leaning
                habit of letting Coo eat what she asks for and skipping the scolding. Strict is the
                opposite across the board. The aura reads the balance you built{" "}
                <em>before the second boss falls</em> — not the personality bar itself, which never
                locks and can still swing afterwards.
              </p>
            </div>
            <div className="panel p-6">
              <h3 className="text-base font-semibold tracking-tight">Dial two: which stats you pushed</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Not the highest number — the direction. Offensive feeding (Strength, Agility) and
                defensive feeding (HP, Vitality, Resilience) each send you to a different aura at the
                same treatment level. Intelligence is its own axis and covers the two auras added after
                launch.
              </p>
            </div>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow pb-3 text-left">Feeding focus</th>
                  <th className="eyebrow pb-3 text-left">Lenient</th>
                  <th className="eyebrow pb-3 text-left">Strict</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-6">Strength / Agility</td>
                  <td className="py-3 pr-6">
                    <Link href="/auras/adored/" className="underline underline-offset-2">Adored</Link> <span className="tnum font-mono text-xs text-muted-foreground">62.3%</span>
                  </td>
                  <td className="py-3">
                    <Link href="/auras/mischievous/" className="underline underline-offset-2">Mischievous</Link> <span className="tnum font-mono text-xs text-muted-foreground">41.5%</span>
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-3 pr-6">HP / Vitality / Resilience</td>
                  <td className="py-3 pr-6">
                    <Link href="/auras/chill/" className="underline underline-offset-2">Chill</Link> <span className="tnum font-mono text-xs text-muted-foreground">53.7%</span>
                  </td>
                  <td className="py-3">
                    <Link href="/auras/reserved/" className="underline underline-offset-2">Reserved</Link> <span className="tnum font-mono text-xs text-muted-foreground">38.5%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Intelligence-led</td>
                  <td className="py-3 pr-6">
                    <Link href="/auras/steady/" className="underline underline-offset-2">Steady</Link> <span className="tnum font-mono text-xs text-muted-foreground">27.2%</span>
                  </td>
                  <td className="py-3">
                    <Link href="/auras/whimsical/" className="underline underline-offset-2">Whimsical</Link> <span className="tnum font-mono text-xs text-muted-foreground">26.0%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            The aura changes Coo&apos;s portrait and nothing else — no stat, skill or combat effect is
            attached to it. The four corresponding achievements are the only mechanical trace.
          </p>
          <SourceNote>
            Unlock rates: Steam Community global achievement pages, pulled 2026-09-29. Conditions:
            in-game behaviour mapped by the community, cross-checked against the achievement set.
            Personality mechanics: Fandom&apos;s Coo entry, quoting in-game text.
          </SourceNote>
        </div>
      </section>
    </>
  );
}
