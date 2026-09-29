import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { AURAS, AURA_LOCK, MEAL_CATEGORIES } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { RarityBar, rarityLabel } from "@/components/rarity-bar";

export function generateStaticParams() {
  return AURAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/auras/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const aura = AURAS.find((a) => a.slug === slug);
  if (!aura) return {};
  return {
    title: `${aura.name} aura — DRAPLINE conditions and how to get it`,
    description: `${aura.name} needs ${aura.focus.toLowerCase()} feeding with ${aura.treatment.toLowerCase()} handling before the September boss. Steps, the meal categories that feed it, unlock rate (${aura.pct}%) and the traps that move you to a different aura.`,
    alternates: { canonical: `/auras/${aura.slug}/` },
  };
}

export default async function AuraPage({ params }: PageProps<"/auras/[slug]">) {
  const { slug } = await params;
  const aura = AURAS.find((a) => a.slug === slug);
  if (!aura) notFound();

  const feeds = aura.feeds
    .map((s) => MEAL_CATEGORIES.find((m) => m.slug === s))
    .filter((m): m is (typeof MEAL_CATEGORIES)[number] => Boolean(m));
  const others = AURAS.filter((a) => a.slug !== aura.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Aura · ${aura.treatment}`}
        title={`${aura.name} — ${aura.focus}`}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/auras/", label: "Auras" },
        ]}
        standfirst={<p>{aura.blurb}</p>}
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">Steam unlock rate</p>
            <div className="mt-3">
              <RarityBar pct={aura.pct} className="w-full" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {rarityLabel(aura.pct)} · achievement “{aura.achievement}”
            </p>
          </div>
        }
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <section>
            <h2 className="text-xl font-semibold tracking-tight">How to get {aura.name}</h2>
            <ol className="mt-5 space-y-4">
              {aura.steer.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <p className="flex-1 text-[15px] leading-7 text-foreground/90">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">The trap</h2>
            <p className="mt-3 text-[15px] leading-7 text-foreground/90">{aura.watchOut}</p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Deadline</h2>
            <p className="mt-3 text-[15px] leading-7 text-foreground/90">{AURA_LOCK}</p>
            <p className="mt-3 text-[15px] leading-7 text-foreground/90">
              Nothing about the aura is mechanical — it changes Coo&apos;s portrait and grants one
              achievement. If the run has already passed October, the aura is settled and no amount of
              feeding will move it.
            </p>
          </section>

          <SourceNote>
            Conditions are community-mapped behaviour cross-checked against the Steam achievement set,
            which is why the six-entry list can be called complete. Unlock rate pulled from Steam
            Community on 2026-09-29.
          </SourceNote>
        </div>

        <aside className="space-y-8">
          <div className="panel p-6">
            <p className="eyebrow">Feeding focus</p>
            <p className="mt-2 font-mono text-sm">{aura.focus}</p>
            <p className="eyebrow mt-6">Meal categories that push it</p>
            <ul className="mt-3 space-y-2">
              {feeds.map((m) => (
                <li key={m.slug}>
                  <Link href={`/meals/${m.slug}/`} className="text-sm font-medium underline underline-offset-2">
                    {m.name}
                  </Link>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">{m.stats}</span>
                </li>
              ))}
            </ul>
            <Link href="/meals/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2">
              Full meal table <ArrowRight size={13} weight="bold" />
            </Link>
          </div>

          <div className="panel p-6">
            <p className="eyebrow">Other auras</p>
            <ul className="mt-3 space-y-2.5">
              {others.map((a) => (
                <li key={a.slug} className="flex items-center justify-between gap-3">
                  <Link href={`/auras/${a.slug}/`} className="text-sm font-medium underline underline-offset-2">
                    {a.name}
                  </Link>
                  <span className="font-mono text-xs text-muted-foreground">{a.pct}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-6">
            <p className="eyebrow">Next step</p>
            <Link href="/guide/personality/" className="mt-2 block text-sm font-medium underline underline-offset-2">
              How Rule and Wild actually change combat
            </Link>
            <Link href="/tools/aura-planner/" className="mt-3 block text-sm font-medium underline underline-offset-2">
              Check a run in the aura planner
            </Link>
          </div>

          <Link href="/auras/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={13} weight="bold" /> All six auras
          </Link>
        </aside>
      </div>
    </>
  );
}
