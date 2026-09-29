import type { Metadata } from "next";
import Link from "next/link";
import { ENDINGS_SCENARIO_1, ENDINGS_SCENARIO_2, DISPUTED } from "@/data/game";
import { ACHIEVEMENTS } from "@/data/achievements";
import { PageHeader, SourceNote } from "@/components/page-header";
import { RarityBar } from "@/components/rarity-bar";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DRAPLINE endings: 5 conditions, plus what the 25 TRUE endings are",
  description:
    "Every DRAPLINE ending condition — A Quiet World, Convenient Snack, New Catastrophe, I Yield and Use Responsibly — with the achievement rates behind them, and an honest account of the 25 endings the store page advertises.",
  alternates: { canonical: "/endings/" },
};

const FAQ = [
  {
    q: "How many endings does DRAPLINE have?",
    a: "The developer advertises 25 possible futures on the store page and the first scenario, DAYS OF TORNADO, currently ends in one of five named outcomes. Those five are the ones with published conditions; the count of 25 covers the full branching story.",
  },
  {
    q: "How do I get the A Quiet World ending?",
    a: "Clear DAYS OF TORNADO by defeating Ouroboros in year 2, week 48. 80.5% of players have this achievement, which makes it the most common ending in the game.",
  },
  {
    q: "What is the easiest ending to miss?",
    a: "Use Responsibly, the debt ending, at 16.7%. It is also the only ending that punishes a strategy — borrowing from Calico — that genuinely helps in the early game.",
  },
  {
    q: "Does DRAPLINE have a true ending?",
    a: "The store page calls the 25 branches possible futures and the developer has not labelled one as canonical. Treating any single route as the true ending is community shorthand rather than something the game states.",
  },
];

export default function EndingsPage() {
  const bySlug = (n: string) => ACHIEVEMENTS.find((a) => a.name === n);
  const quiet = bySlug("A Quiet World");
  const snack = bySlug("Convenient Snack");
  const nuova = bySlug("New Catastrophe");
  const yieldA = bySlug("I Yield...");
  const debt = bySlug("Use Responsibly");
  const responsible = bySlug("Responsible Adult");

  return (
    <>
      <FaqJsonLd items={FAQ} />
      <PageHeader
        eyebrow="Story · 5 documented + 25 advertised"
        title="DRAPLINE endings, and what the number 25 actually refers to"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            The number everyone quotes is 25, and it comes from the store page — but the first scenario
            ends in one of five named outcomes with published conditions. This page separates the two
            instead of implying that all 25 have been mapped, because they have not been.
          </p>
        }
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">Ending achievement</p>
            <p className="mt-2 text-sm font-medium">Responsible Adult — {responsible?.pct}%</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Clear the game by any route while debt-free.
            </p>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">DAYS OF TORNADO — the five named endings</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Three of these are failures: the year stops early. One is the debt consequence, and one is the
            clear. Anything that ends the year without debt still counts for the Responsible Adult
            achievement.
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              { e: ENDINGS_SCENARIO_1[0], a: quiet },
              { e: ENDINGS_SCENARIO_1[1], a: snack },
              { e: ENDINGS_SCENARIO_1[2], a: nuova },
              { e: ENDINGS_SCENARIO_1[3], a: yieldA },
              { e: ENDINGS_SCENARIO_1[4], a: debt },
            ].map(({ e, a }) => (
              <article key={e.slug} className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-[var(--radius-control)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                    style={
                      e.kind === "story"
                        ? { background: "var(--jade)", color: "var(--paper, #F5F9F9)" }
                        : { background: "var(--ember)", color: "var(--petrol-deep, #001F26)" }
                    }
                  >
                    {e.kind === "story" ? "Advances" : "Ends early"}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight">{e.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{e.condition}</p>
                {a && (
                  <div className="mt-4">
                    <RarityBar pct={a.pct} />
                  </div>
                )}
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Convenient Snack and I Yield carry no unlock rate on the Steam community page in the current
            patch — the achievements exist (42.3% and 23.6%) and are the only trace of those two endings.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">The 25 futures</h2>
          <div className="mt-3 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="prose-wiki">
              <p>
                The store page section titled &ldquo;Beyond Raising Your Dragon — 25 Possible Futures&rdquo;
                is the only official statement about the full ending count. The developer has shipped the
                number, the artwork per ending, and nothing else.
              </p>
              <p>
                {ENDINGS_SCENARIO_2.note}
              </p>
              <p>
                What that means in practice: a site listing 25 ending conditions is filling in the 20 the
                game has not shipped, and a site claiming five total has not read the store page. Both
                numbers are true about different things.
              </p>
            </div>
            <div className="panel p-6">
              <p className="eyebrow">Route to a second scenario</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The later branch opens after DAYS OF TORNADO is cleared and the story is replayed —
                which is why a run takes about an hour and why the replay loop is the point rather than
                the epilogue.
              </p>
              <Link href="/guide/beginner/" className="mt-4 inline-block text-sm font-medium underline underline-offset-2">
                First-year walkthrough →
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <p className="eyebrow">Corrections</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Where the wiki stops</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow pb-3 text-left">Source</th>
                  <th className="eyebrow pb-3 text-left">Claim</th>
                  <th className="eyebrow pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/60 align-top">
                  <td className="py-3 pr-6">Fandom</td>
                  <td className="py-3 pr-6 text-muted-foreground">
                    &ldquo;There are 5 endings… more scenarios will be added when DRAPLINE is fully
                    released out of early access.&rdquo;
                  </td>
                  <td className="py-3">
                    Out of date. The game left Early Access on 24 September 2026 and the store page
                    advertises 25 futures. The five conditions themselves are still accurate.
                  </td>
                </tr>
                <tr className="border-b border-border/60 align-top">
                  <td className="py-3 pr-6">Aggregator guides</td>
                  <td className="py-3 pr-6 text-muted-foreground">&ldquo;All 25 endings listed&rdquo;</td>
                  <td className="py-3">
                    Unsupported. The developer has published the count, not the conditions.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {DISPUTED[2].right}
          </p>
        </section>

        <SourceNote>
          Ending names and conditions: the Fandom endings page, which transcribes in-game text and is
          still accurate about the five named outcomes. Ending count and artwork: the Steam store page.
          Unlock rates: Steam Community global achievements, 2026-09-29.
        </SourceNote>
      </div>
    </>
  );
}
