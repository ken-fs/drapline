import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { CHARACTERS, AURAS, PERSONALITY } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { RarityBar } from "@/components/rarity-bar";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/characters/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = CHARACTERS.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.name} — DRAPLINE ${c.kind === "calamity" ? "calamity" : "character"}${c.defeat ? ` (${c.defeat.pct}% beaten)` : ""}`,
    description: `${c.name} in DRAPLINE: ${c.role}.${c.schedule ? ` Fight window: ${c.schedule}.` : ""} What is documented, what is not, and where the other guides are wrong.`,
    alternates: { canonical: `/characters/${c.slug}/` },
  };
}

export default async function CharacterPage({ params }: PageProps<"/characters/[slug]">) {
  const { slug } = await params;
  const c = CHARACTERS.find((x) => x.slug === slug);
  if (!c) notFound();

  const others = CHARACTERS.filter((x) => x.slug !== c.slug && x.kind === c.kind).slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow={c.kind === "calamity" ? "Calamity" : c.kind === "villager" ? "Villager" : "Dragon folk"}
        title={c.name}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/characters/", label: "Cast" },
        ]}
        standfirst={<p>{c.role}</p>}
        meta={
          c.defeat ? (
            <div className="panel px-5 py-4 lg:w-72">
              <p className="eyebrow">{c.defeat.achievement}</p>
              <div className="mt-3">
                <RarityBar pct={c.defeat.pct} className="w-full" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Share of all DRAPLINE players who have this achievement.
              </p>
            </div>
          ) : undefined
        }
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <section className="prose-wiki">
            <p>{c.entry}</p>
            {c.quote && <p className="text-muted-foreground">{c.quote}</p>}
          </section>

          {c.schedule && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">When this happens</h2>
              <p className="mt-3 text-[15px] leading-7 text-foreground/90">{c.schedule}</p>
              {c.kind === "calamity" && (
                <p className="mt-3 text-[15px] leading-7 text-foreground/90">
                  Boss weeks are the spine of a run. The June fight opens the year, the September fight is
                  the aura deadline, December is the difficulty wall, and week 48 closes DAYS OF TORNADO.
                  Everything between them is feeding and stamina management.
                </p>
              )}
            </section>
          )}

          {c.undocumented && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight">What is not documented</h2>
              <p className="mt-3 text-[15px] leading-7 text-foreground/90">
                Everything about {c.name} beyond the achievement name and its unlock rate is unpublished.
                That includes the element, the fight window, and the moveset. Sites that print those
                details are extrapolating from the same fragment we have — the difference is that we
                label it as missing.
              </p>
              <p className="mt-3 text-[15px] leading-7 text-foreground/90">
                If you have fought {c.name} and can describe the encounter, that is exactly the kind of
                detail this page is waiting for.
              </p>
            </section>
          )}

          <SourceNote>
            Achievement and unlock rate: Steam Community global achievements, 2026-09-29. Profile text:
            in-game Compendium, transcribed via the Fandom wiki. No details have been inferred for
            entries the game does not describe.
          </SourceNote>
        </div>

        <aside className="space-y-8">
          <div className="panel p-6">
            <p className="eyebrow">On this site</p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <Link href="/auras/" className="text-sm font-medium underline underline-offset-2">
                  The six auras
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.kind === "calamity" ? "The September fight locks yours in." : "How treatment decides Coo's look."}
                </p>
              </li>
              <li>
                <Link href="/meals/" className="text-sm font-medium underline underline-offset-2">
                  Meal table
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">What the categories feed.</p>
              </li>
              <li>
                <Link href="/endings/" className="text-sm font-medium underline underline-offset-2">
                  Endings
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">Two of them name Morgentiana directly.</p>
              </li>
            </ul>
          </div>

          {c.kind === "villager" && (
            <div className="panel p-6">
              <p className="eyebrow">Personality effect</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Letting Coo spend time with this villager leans the Rule–Wild bar. {PERSONALITY.wild.name}-leaning
                days build {" "}
                <span className="font-medium">{PERSONALITY.wild.buff}</span>; strict ones build{" "}
                <span className="font-medium">{PERSONALITY.rule.buff}</span>.
              </p>
            </div>
          )}

          <div className="panel p-6">
            <p className="eyebrow">More {c.kind === "calamity" ? "calamities" : "in this group"}</p>
            <ul className="mt-3 space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/characters/${o.slug}/`} className="text-sm underline underline-offset-2">
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              {AURAS.length} auras · {CHARACTERS.length} entries in the cast database
            </p>
          </div>

          <Link href="/characters/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={13} weight="bold" /> Full cast
          </Link>
        </aside>
      </div>
    </>
  );
}
