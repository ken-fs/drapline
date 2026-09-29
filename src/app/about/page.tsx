import type { Metadata } from "next";
import Link from "next/link";
import { GAME, SOURCES } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About Drapline Field Lab — sources, method and corrections",
  description:
    "How this DRAPLINE reference is built: which Steam endpoints supply the numbers, what happens when sources disagree, and how to send a correction.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A DRAPLINE reference built from the game's own data"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            This site exists because the information players want — the full aura set, the meal stat map,
            every achievement, the ending conditions — is either scattered across three sources that
            disagree, or missing entirely. It is the work of one person, it has no ads, and every number
            on it is traceable to something.
          </p>
        }
      />

      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="prose-wiki">
          <h2>Where the numbers come from</h2>
          <ul className="not-prose space-y-3">
            {SOURCES.map((s) => (
              <li key={s.label} className="panel p-4">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
              </li>
            ))}
          </ul>

          <h2>What we do when sources disagree</h2>
          <p>
            We publish the disagreement. The most useful thing this site can do is tell you that Fandom
            lists four auras while there are six, rather than quietly printing the correct number and
            leaving you to wonder why the wiki disagrees with the guide. Corrections are listed on the
            home page and repeated on the pages they affect.
          </p>

          <h2>What we refuse to do</h2>
          <ul>
            <li>
              <strong>Invent numbers.</strong> Where the game does not publish a value — per-action
              income, the 25 ending conditions, four calmities only visible in the achievement list —
              the page says so instead of estimating.
            </li>
            <li>
              <strong>Copy other sites&apos; prose.</strong> Facts are facts, and a meal&apos;s stat value
              is the same wherever it is written down. Wording, structure and the analysis are ours.
            </li>
            <li>
              <strong>Patch quietly.</strong> When a patch changes something, the affected pages are
              updated and the date at the foot of the page moves.
            </li>
          </ul>

          <h2>Corrections</h2>
          <p>
            Spotted a number that does not match your game? That is the single most useful message this
            site can receive. Include the patch version if you can — the game has shipped three updates
            since release, and some of the disagreements between sources are almost certainly patches
            rather than errors.
          </p>

          <h2>Not affiliated</h2>
          <p>
            DRAPLINE is developed by {GAME.developer} and published by {GAME.publisher}. This site is an
            independent, fan-made reference with no connection to either, and no ads or sponsorships. Game
            names, artwork and in-game text belong to their owners; quoted in-game descriptions appear here
            for identification and explanation. The developer&apos;s streaming guidelines explicitly allow
            coverage, monetisation included.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a href={GAME.steamUrl} target="_blank" rel="noopener" className="font-medium underline underline-offset-2">
            DRAPLINE on Steam →
          </a>
          <Link href="/guide/faq/" className="font-medium underline underline-offset-2">
            FAQ →
          </Link>
        </div>

        <SourceNote>
          Data verified against patch {GAME.reviews.asOf === "2026-09-29" ? "1.0.2" : ""} on{" "}
          {GAME.reviews.asOf}.
        </SourceNote>
      </div>
    </>
  );
}
