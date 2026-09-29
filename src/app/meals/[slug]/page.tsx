import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { AURAS, MEAL_CATEGORIES, MEAL_TIERS, MEAL_TRAITS } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export function generateStaticParams() {
  return MEAL_CATEGORIES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/meals/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meal = MEAL_CATEGORIES.find((m) => m.slug === slug);
  if (!meal) return {};
  return {
    title: `${meal.name} meals in DRAPLINE — ${meal.stats} and what they cost`,
    description: `${meal.name} is the DRAPLINE meal category that feeds ${meal.stats}. Documented meals with their exact numbers, prices and traits, plus which aura this category pushes.`,
    alternates: { canonical: `/meals/${meal.slug}/` },
  };
}

export default async function MealPage({ params }: PageProps<"/meals/[slug]">) {
  const { slug } = await params;
  const meal = MEAL_CATEGORIES.find((m) => m.slug === slug);
  if (!meal) notFound();

  // Categories whose stat direction overlaps this one, by string match on the
  // stat column — a cheap heuristic that stays honest because it is explained.
  const related = MEAL_CATEGORIES.filter(
    (m) => m.slug !== meal.slug && m.stats.split(/\s*\+\s*/).some((s) => meal.stats.includes(s)),
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow={`Meal category · ${meal.stats}`}
        title={`${meal.name} meals`}
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/meals/", label: "Meals" },
        ]}
        standfirst={<p>{meal.note ?? meal.tier1}</p>}
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">Feeds</p>
            <p className="mt-1 font-mono text-lg">{meal.stats}</p>
            <p className="eyebrow mt-5">Documented meals</p>
            <p className="tnum mt-1 font-mono text-lg">{meal.examples.length}</p>
          </div>
        }
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <section>
            <h2 className="text-xl font-semibold tracking-tight">Documented {meal.name} meals</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Meal names are generated from a noun plus a random prefix, so the stable part of a name is
              the noun. These are the entries with printed numbers.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="eyebrow pb-3 text-left">Meal</th>
                    <th className="eyebrow pb-3 text-left">Effect</th>
                    <th className="eyebrow pb-3 text-right">Price</th>
                    <th className="eyebrow pb-3 text-left">Trait</th>
                  </tr>
                </thead>
                <tbody>
                  {meal.examples.map((e) => (
                    <tr key={e.name} className="border-b border-border/60 align-top">
                      <td className="py-3 pr-6 font-medium">
                        {e.name}
                        {e.stars ? (
                          <span className="ml-2 text-xs text-muted-foreground">{"★".repeat(e.stars)}</span>
                        ) : null}
                      </td>
                      <td className="py-3 pr-6 font-mono text-xs">{e.effect}</td>
                      <td className="tnum py-3 pr-6 text-right font-mono text-xs">{e.price ?? "—"}</td>
                      <td className="py-3 text-xs text-muted-foreground">{e.trait ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">How to use the {meal.name} line</h2>
            <div className="prose-wiki mt-4">
              <p>
                {meal.name} feeds <strong>{meal.stats}</strong>. Because a run only sees three meals a
                week, the practical question is not &ldquo;is this meal good&rdquo; but &ldquo;does this
                category match the build I am committing to&rdquo;. A {meal.name} week when your skills
                scale off the same stat is compounding; the same meal in a run built the other way is
                simply an expensive week.
              </p>
              <p>
                The second-tier meals in this line are usually worth watching. Two-star meals in
                DRAPLINE routinely scale their bonus off how low the fed stat is, which means the
                efficient moment to buy one is exactly when the stat is lagging — the opposite of the
                instinct to buy your strongest stat bigger.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Traits to watch on this line</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {MEAL_TRAITS.map((t) => (
                <li key={t.name} className="panel p-4">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.effect}</p>
                </li>
              ))}
            </ul>
          </section>

          <SourceNote>
            Numbers as printed in-game, transcribed via the Fandom meal list and cross-checked against
            independently recorded prices. Tier pricing verified on patch 1.0.2.
          </SourceNote>
        </div>

        <aside className="space-y-8">
          <AdsterraBanner slot={RECTANGLE} className="items-start" />
          <div className="panel p-6">
            <p className="eyebrow">Price ladder</p>
            <dl className="mt-3 space-y-3">
              {MEAL_TIERS.map((t) => (
                <div key={t.stars} className="flex gap-3">
                  <dt className="w-8 shrink-0 font-mono text-xs text-muted-foreground">
                    {"★".repeat(t.stars)}
                  </dt>
                  <dd className="flex-1">
                    <p className="tnum font-mono text-sm">{t.price}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{t.note}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="panel p-6">
            <p className="eyebrow">Auras this category pushes</p>
            <ul className="mt-3 space-y-2">
              {AURAS.filter((a) => a.feeds.includes(meal.slug)).map((a) => (
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
            <p className="eyebrow">Adjacent categories</p>
            <ul className="mt-3 space-y-2">
              {related.map((m) => (
                <li key={m.slug} className="flex items-center justify-between gap-3">
                  <Link href={`/meals/${m.slug}/`} className="text-sm underline underline-offset-2">
                    {m.name}
                  </Link>
                  <span className="font-mono text-xs text-muted-foreground">{m.stats}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Overlapping stat directions — Buyers of one often want the other.
            </p>
          </div>

          <Link href="/meals/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={13} weight="bold" /> Full meal table
          </Link>
        </aside>
      </div>
    </>
  );
}
