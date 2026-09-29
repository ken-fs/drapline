import type { Metadata } from "next";
import Link from "next/link";
import { ACHIEVEMENTS } from "@/data/achievements";
import { AURAS, GAME } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DRAPLINE FAQ — run length, endings, platform and the questions the game does not answer",
  description:
    "Straight answers about DRAPLINE: how long a run takes, how many endings and achievements exist, whether it is Early Access, what platforms it is on, whether there is romance or multiplayer, and how hard mode works.",
  alternates: { canonical: "/guide/faq/" },
};

const QAS = [
  {
    q: "How long does a DRAPLINE run take?",
    a: "About an hour, and that is the design. The store page says the ending is reachable in as little as an hour and that the game expects multiple playthroughs, which is why 48 in-game weeks move that quickly.",
  },
  {
    q: "How many endings does DRAPLINE have?",
    a: "The store page advertises 25 possible futures. The first scenario, DAYS OF TORNADO, currently ends in one of five named outcomes with published conditions: A Quiet World, Convenient Snack, New Catastrophe, I Yield… and Use Responsibly.",
  },
  {
    q: "How many achievements are there?",
    a: "66, all listed with their Steam unlock rates on this site. Several achievement sites and the Fandom wiki still say 62 and mark the list incomplete.",
  },
  {
    q: "Is DRAPLINE still in Early Access?",
    a: "No. Version 1.0.0 shipped on 24 September 2026, along with the soundtrack. It has been patched twice since — 1.0.1 on 25 September and 1.0.2 on 28 September.",
  },
  {
    q: "What platforms is DRAPLINE on?",
    a: "Windows via Steam, and nothing else at the time of writing. No console or mobile release has been announced. A free demo (app 3369350) and a separate soundtrack (app 5074600) exist on the same store.",
  },
  {
    q: "How many auras does DRAPLINE have?",
    a: "Six: Adored, Chill, Mischievous, Reserved, Steady and Whimsical. The first four shipped during Early Access and the last two arrived later, which is why older guides list four.",
  },
  {
    q: "When does the aura lock in?",
    a: "October, Week 1 — immediately after the September Week 4 boss. The aura is read once and never changes afterwards.",
  },
  {
    q: "Does the aura change gameplay?",
    a: "No. It changes Coo's portrait and grants one achievement. No stat, skill or combat value is attached to it. The Rule/Wild personality bar is the system with mechanical effects.",
  },
  {
    q: "Is there romance in DRAPLINE?",
    a: "No romance system is documented. Steam's store tags do not include Romance, and the game frames the relationship as raising and training a dragon in your guardianship. The ending branches concern how she turns out, not whom she ends up with.",
  },
  {
    q: "Does DRAPLINE have multiplayer or co-op?",
    a: "No. Steam lists it as single-player only, with Steam Achievements and Family Sharing as its other features.",
  },
  {
    q: "Is there a hard mode?",
    a: "Yes — difficulty levels exist, and the achievement Chosen by the Stars is awarded for clearing HARD Lv.9. Only 7.7% of players have it, which makes it one of the three rarest achievements in the game.",
  },
  {
    q: "Can you rename Coo?",
    a: "Yes, at the start of a run. Coo is the default name the game's descriptions and trailers use, and Kuu is an accepted alternative spelling in the community.",
  },
  {
    q: "What languages does DRAPLINE support?",
    a: "Japanese, English and Simplified Chinese, all listed on the store page.",
  },
  {
    q: "Do you need to know the developer's previous games?",
    a: "No. KANAWO's previous release, Noel the Mortal Fate, is a separate episodic title. DRAPLINE stands alone, which is part of why its review count climbed so quickly after launch.",
  },
];

export default function FaqPage() {
  const chosen = ACHIEVEMENTS.find((a) => a.name === "Chosen by the Stars");
  return (
    <>
      <FaqJsonLd items={QAS} />
      <PageHeader
        eyebrow="Guide · FAQ"
        title="DRAPLINE questions, answered from the game's own data"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/guide/", label: "Guides" },
        ]}
        standfirst={
          <p>
            {QAS.length} questions that come up before and during a first run. Where the game does not
            publish an answer, the answer says so — an honest &ldquo;nobody has documented this&rdquo; is
            more useful than a confident guess.
          </p>
        }
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">At a glance</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Run length</span> <span>~1 hour</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Endings</span> <span>5 + 25 advertised</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Achievements</span> <span>{GAME.achievementsTotal}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Auras</span> <span>{AURAS.length}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Hardest clear</span>{" "}
                <span>{chosen?.pct}%</span>
              </li>
            </ul>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <dl>
          {QAS.map((item, i) => (
            <div key={item.q} className="border-b border-border py-6">
              <dt className="flex gap-4">
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-base font-semibold tracking-tight">{item.q}</h2>
              </dt>
              <dd className="mt-2 pl-8 text-[15px] leading-7 text-foreground/90">{item.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href="/guide/beginner/" className="font-medium underline underline-offset-2">
            First-year walkthrough →
          </Link>
          <Link href="/auras/" className="font-medium underline underline-offset-2">
            The six auras →
          </Link>
          <Link href="/achievements/" className="font-medium underline underline-offset-2">
            All {GAME.achievementsTotal} achievements →
          </Link>
        </div>

        <SourceNote>
          Answers assembled from the Steam store page, Steam news posts, Steam Community achievements and
          in-game text. Nothing in this list is inferred from other games or from the developer&apos;s
          previous titles.
        </SourceNote>
      </div>
    </>
  );
}
