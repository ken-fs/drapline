import type { Metadata } from "next";
import Link from "next/link";
import { MEAL_TIERS, WEEKLY_ACTIONS, GAME } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";

export const metadata: Metadata = {
  title: "DRAPLINE beginner guide — the first year week by week",
  description:
    "How to survive a first DRAPLINE run: the weekly loop, the stamina budget, the four boss weeks, the October aura check, and the three habits that decide whether you reach week 48.",
  alternates: { canonical: "/guide/beginner/" },
};

export default function BeginnerGuide() {
  return (
    <>
      <PageHeader
        eyebrow="Guide · Start here"
        title="Your first year with the Divine Dragon"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/guide/", label: "Guides" },
        ]}
        standfirst={
          <p>
            A run is {GAME.weeksPerRun} weeks and the loop never changes: buy a meal, choose an action,
            spend the week. Almost every mistake a new player makes is one of three — feeding a stat the
            skills do not use, running out of stamina, or borrowing gold that should never have been
            borrowed.
          </p>
        }
      />

      <article className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="prose-wiki">
          <h2>The weekly loop, in order</h2>
          <p>
            Each week gives you a food choice and an action choice. Food decides which stats grow; the
            action decides what you gain besides stats — money, a skill inspiration, items, or friendship
            with a villager. Rest is not a free choice: it appears when stamina is too low to do anything
            else and it consumes the whole week.
          </p>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Stamina</th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_ACTIONS.map((a) => (
                <tr key={a.action}>
                  <td>{a.action}</td>
                  <td className="font-mono text-xs">
                    {typeof a.stamina === "number" ? `−${a.stamina}` : a.stamina}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            That is the whole stamina economy: a five-day week costs 15 to 25 points, a rest recovers far
            more than a week&apos;s spending, and shopping is free. A run that rests every third week is not
            being cautious, it is losing a third of its feeding opportunities — because resting also
            means not earning.
          </p>

          <h2>Pick a direction in the first month, and mean it</h2>
          <p>
            The six stats are not interchangeable: <strong>STR</strong> feeds physical skills,{" "}
            <strong>INT</strong> feeds magic, <strong>AGI</strong> feeds turn order and the Wing tree, and
            the other three decide how long you survive. Skills scale off specific stats, so a dragon fed
            evenly is a dragon with no skill that hits properly.
          </p>
          <p>
            Decide early which of three shapes the run is: physical (Strength, some Agility), magical
            (Intelligence, some Resilience), or defensive (HP, Vitality, Resilience, with damage coming
            later). Then buy meals in that family every single week. The category decides the stat; the{" "}
            <Link href="/meals/">meal table</Link> lists what each one gives.
          </p>

          <h2>Spend the meal tiers deliberately</h2>
          <p>
            Meals cost {MEAL_TIERS.map((t) => t.price.replace(" G", "")).join(", ")} G for one, two and
            three stars. The instinct is to buy the biggest meal you can afford each week. The better
            rule is the opposite: buy the cheapest meal in the right category you can find almost every
            week, and save the second tier for when a stat has fallen behind — several two-star meals
            scale their bonus off exactly that.
          </p>
          <p>
            You can always borrow from Calico at Happy Cat Sith Loans. You should almost never do it twice
            in a row. Debt that stays open is the <Link href="/endings/">Use Responsibly ending</Link>,
            and it is the only ending that arrives without a boss fight.
          </p>

          <h2>The four fights that structure the year</h2>
          <ol>
            <li>
              <strong>June, Week 4</strong> — Cham, Melty or Thunder. The first calamity. Poison punishes
              low HP; Melty punishes skill spam with cooldown pressure. If you have been feeding one stat
              and ignoring survivability, this is where it shows.
            </li>
            <li>
              <strong>September, Week 4</strong> — Labryn or Noir. More dangerous, and it carries a second
              deadline: the aura check fires immediately afterwards, in October Week 1. Whatever you have
              been feeding and however you have been treating Coo, it is settled here.
            </li>
            <li>
              <strong>December, Week 4</strong> — Moon, the slumbering calamity. The difficulty wall. Runs
              that coasted through autumn with cheap meals and no skills arrive here under-levelled.
            </li>
            <li>
              <strong>Year 2, March, Week 4 (week 48)</strong> — Ouroboros, the final fight, and the
              trigger for the clear ending. Finish debt-free and the Responsible Adult achievement lands
              with it.
            </li>
          </ol>

          <h2>Three habits that decide the run</h2>
          <ul>
            <li>
              <strong>Watch the personality bar without letting it run the run.</strong> It never locks. A
              Wild Coo hits harder and takes more; a Rule Coo runs buffs longer and can equip a fifth
              skill. Neither is wrong — see the <Link href="/guide/personality/">personality guide</Link>.
            </li>
            <li>
              <strong>Feed the stat your skills use.</strong> Feeding Strength into a Wing build wastes
              every meal of the year.
            </li>
            <li>
              <strong>Do not let debt roll.</strong> One loan to reach a two-star meal that fixes a
              weakness is fine. Two loans is a pattern, and the pattern has an ending named after it.
            </li>
          </ul>

          <h2>What to expect from the first clear</h2>
          <p>
            The first run rarely produces the aura you were hoping for. That is normal and cheap to
            correct — a run takes about an hour, the aura is decided by two dials you now know, and the
            endings branch from there. The most common outcome is <strong>Adored</strong> at 62.3%, which
            is what happens when nobody steers. The{" "}
            <Link href="/tools/aura-planner/">aura planner</Link> tells you which of the six a feeding
            pattern is heading for before you commit 48 weeks to it.
          </p>
        </div>

        <SourceNote>
          Weekly action costs, stamina behaviour and boss windows: in-game progress reports transcribed
          by the community. Stat effects: in-game stat descriptions. Ending conditions: the Fandom endings
          page, still accurate about the five named outcomes. Unlock rates: Steam Community, 2026-09-29.
        </SourceNote>
      </article>
    </>
  );
}
