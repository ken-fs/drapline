import type { Metadata } from "next";
import Link from "next/link";
import { ACHIEVEMENTS } from "@/data/achievements";
import { MEAL_TIERS, GAME, VILLAGE } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";

export const metadata: Metadata = {
  title: "DRAPLINE money and debt — how the loan mechanic ends runs",
  description:
    "Where DRAPLINE gold comes from, what each meal tier costs across a 48-week run, how Calico's loans work, and the arithmetic that separates a useful loan from the Use Responsibly ending.",
  alternates: { canonical: "/guide/money/" },
};

export default function MoneyGuide() {
  const debtEnding = ACHIEVEMENTS.find((a) => a.name === "Use Responsibly");
  const investor = ACHIEVEMENTS.find((a) => a.name === "Treasure Investor");

  return (
    <>
      <PageHeader
        eyebrow="Guide · Economy"
        title="Meals cost gold, gold runs out, and the loan has an ending named after it"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/guide/", label: "Guides" },
        ]}
        standfirst={
          <p>
            Every week costs a meal and every meal costs gold, so the economy is the second half of the
            training system. It is also the only system in the game that ends a run without a fight —{" "}
            {debtEnding?.pct}% of players have found that out the hard way.
          </p>
        }
      />

      <article className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="prose-wiki">
          <h2>What a run costs</h2>
          <p>
            Assuming one meal per week for {GAME.weeksPerRun} weeks, the three tiers add up like this:
          </p>
          <table>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Per week</th>
                <th>48-week total</th>
              </tr>
            </thead>
            <tbody>
              {MEAL_TIERS.map((t) => {
                const price = Number(t.price.replace(/[^\d]/g, ""));
                return (
                  <tr key={t.stars}>
                    <td>{"★".repeat(t.stars)}</td>
                    <td className="font-mono text-xs">{t.price}</td>
                    <td className="tnum font-mono text-xs">
                      {price * GAME.weeksPerRun} G
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>
            A full year of one-star meals costs 144,000 G. A full year of three-star meals costs 700,800 G
            — nearly five times as much, for meals that are often not five times as good. That gap is the
            entire economy: the run is affordable, the ambitions are not, and the difference is what
            Calico is for.
          </p>

          <h2>Where the gold comes from</h2>
          <ul>
            <li>
              <strong>Helping townsfolk.</strong> The bread-and-butter action: 15 stamina, paid in gold,
              and it builds friendship with a villager. The friendship is worth more than the pay:{" "}
              {VILLAGE.friendshipRarity}
            </li>
            <li>
              <strong>Fighting small calamities.</strong> 25 stamina, the most expensive action, and the
              usual income spike of the early year. It also costs health, which costs stamina later.
            </li>
            <li>
              <strong>Knot&apos;s salvage gamble.</strong> Give the shark fisher at least 15,000 G toward a
              wreck and he returns the following week with double your money — or with nothing. The
              achievement <em>Treasure Investor</em> ({investor?.pct}% of players) requires a single
              payout of 30,000 G or more, so the successful branch is real and repeatable within a run.
            </li>
            <li>
              <strong>Shopping weeks.</strong> A free action, which makes it the correct choice in a week
              when stamina has to be preserved for the boss that follows.
            </li>
          </ul>

          <h2>The loan, and the line</h2>
          <p>
            When a meal is beyond your gold, you can take a loan instead of paying — Calico from Happy Cat
            Sith Loans turns up and the meal goes on the tab. Mechanically this is generous: debt does not
            block you from anything else, and one loan at the right moment rescues a run that would
            otherwise spend four weeks feeding cheap.
          </p>
          <p>
            The rule that keeps it safe is about duration, not size. Debt that stays open week after week
            is what triggers the <strong>Use Responsibly</strong> ending, and {debtEnding?.pct}% of players
            have collected it — the third rarest of the five named DAYS OF TORNADO endings, and the only
            one that is a shopping decision.
          </p>
          <p>
            Practically: borrow to buy one specific meal that fixes a specific weakness, then spend the
            next week paying it down with help-the-villager actions instead of borrowing again. Borrowing
            two weeks running is the pattern that turns into an ending.
          </p>

          <h2>Where friendship pays better than gold</h2>
          <p>{VILLAGE.affectionEvents}</p>
          <p>{" "}{VILLAGE.why}</p>

          <h2>How to decide in ten seconds</h2>
          <ol>
            <li>Does the meal match the stat my skills scale off? If no, buy the cheapest thing in the right category instead.</li>
            <li>Can I pay for it and still afford next week? If no, is the meal fixing a stat that is actively losing fights? If yes, one loan is fine.</li>
            <li>Am I already carrying debt? Then no. Take the one-star meal and work off the balance this week.</li>
          </ol>
          <p>
            The{" "}
            <Link href="/tools/meal-compare/">affordability tool</Link> does the week arithmetic for your
            current gold, and the{" "}
            <Link href="/meals/">meal table</Link> shows which categories give what.
          </p>
        </div>

        <SourceNote>
          Tier prices verified on patch 1.0.2. Salvage threshold and payout rule: the Treasure Investor
          achievement description plus the Fandom requirements note. Debt ending condition: the Fandom
          endings page. Unlock rates: Steam Community, 2026-09-29. Income amounts per action are not
          published by the game and are therefore not quoted here.
        </SourceNote>
      </article>
    </>
  );
}
