import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader, SourceNote } from "@/components/page-header";
import { ItemListJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DRAPLINE soundtrack — all 22 tracks and when each one plays",
  description:
    "The complete DRAPLINE soundtrack list: 22 tracks with their run times and the exact moment each one plays, from the naming screen to the final boss. The OST is sold separately on Steam.",
  alternates: { canonical: "/soundtrack/" },
};

type Track = { n: number; title: string; length?: string; plays: string };

const TRACKS: Track[] = [
  { n: 1, title: "A Dragon's Tail is a Long Tail", length: "0:35", plays: "Meeting Coo for the first time and naming her." },
  { n: 2, title: "Calamity Children", length: "2:41", plays: "Boss fights." },
  { n: 3, title: "Days of Tornado", length: "1:16", plays: "Regular fights." },
  { n: 4, title: "Divine Dragon Festival", length: "0:32", plays: "The festival after each boss." },
  { n: 5, title: "Fragments", plays: "No documented trigger yet." },
  { n: 6, title: "Happy CaitSith Loan", length: "1:18", plays: "Interacting with Calico — the spelling is the game's, not a typo here." },
  { n: 7, title: "Into the Tornado", plays: "No documented trigger yet." },
  { n: 8, title: "Island on the Dish", length: "1:06", plays: "The summer island event — the three-week sequence that also moves the personality bar." },
  { n: 9, title: "Longing", length: "1:25", plays: "Morgentiana's conversations with the player." },
  { n: 10, title: "mountain", length: "0:37", plays: "Quiet ambience, lower case in the game's own listing." },
  { n: 11, title: "My Dragon", length: "0:48", plays: "Choosing the player's name, and setting up New Game+." },
  { n: 12, title: "New Catastrophe", length: "1:23", plays: "The prologue fight, and the final boss of the New Catastrophe ending." },
  { n: 13, title: "Praise my Name", length: "1:36", plays: "Fighting Octanya — the secret boss with its own achievement." },
  { n: 14, title: "Sea, Breeze and Dragon", length: "1:55", plays: "Regular background music, spring." },
  { n: 15, title: "Sea, Breeze and Dragon (summer)", length: "1:55", plays: "Regular background music, summer." },
  { n: 16, title: "Sea, Breeze and Dragon (fall)", length: "1:55", plays: "Regular background music, autumn." },
  { n: 17, title: "Sea, Breeze and Dragon (winter)", length: "1:55", plays: "Regular background music, winter." },
  { n: 18, title: "Tension", length: "0:33", plays: "General tense scenes." },
  { n: 19, title: "Tension 2", length: "0:42", plays: "Before the final boss, and in the epilogue." },
  { n: 20, title: "The Day the Star Falls", length: "2:11", plays: "The final boss of the main route — Ouroboros." },
  { n: 21, title: "Winner is Me", length: "0:37", plays: "Victory theme." },
  { n: 22, title: "Wonderful Shop", length: "0:42", plays: "Visiting the Woofderful Trading Company." },
];

export default function SoundtrackPage() {
  return (
    <>
      <ItemListJsonLd
        name="DRAPLINE soundtrack"
        items={TRACKS.map((t) => ({ name: t.title, slug: t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") }))}
        path="/soundtrack/"
      />
      <PageHeader
        eyebrow="Music · 22 tracks"
        title="Every DRAPLINE track, and the moment it plays"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            The game ships 22 tracks, most of them cued to a specific screen rather than shuffled in the
            background. Four are the same melody re-orchestrated for the four seasons by the in-game
            calendar, which is why the background music changes in October even though nothing else does.
          </p>
        }
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">On sale separately</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              The soundtrack is its own Steam app (5074600) and launched the same day as 1.0.
            </p>
            <a
              href="https://store.steampowered.com/app/5074600/DRAPLINE_Soundtrack/"
              target="_blank"
              rel="noopener"
              className="mt-3 inline-block text-sm font-medium underline underline-offset-2"
            >
              DRAPLINE Soundtrack ↗
            </a>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-4xl px-5 py-12">
        <ol className="divide-y divide-border border-y border-border">
          {TRACKS.map((t) => (
            <li key={t.n} className="flex gap-5 py-4">
              <span className="w-8 shrink-0 pt-0.5 font-mono text-xs text-muted-foreground">
                {String(t.n).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h2 className="text-base font-medium tracking-tight">{t.title}</h2>
                  {t.length && <span className="tnum font-mono text-xs text-muted-foreground">{t.length}</span>}
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.plays}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 panel p-6">
          <p className="eyebrow">Two tracks without a documented trigger</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Fragments and Into the Tornado appear in the track list with no recorded scene. Rather than
            guess at where they play, they are left marked — the game&apos;s own music player does not
            label them either.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/endings/" className="font-medium underline underline-offset-2">
            The endings these tracks belong to →
          </Link>
          <Link href="/characters/" className="font-medium underline underline-offset-2">
            The cast →{" "}
          </Link>
        </div>

        <SourceNote>
          Track titles, run times and scene cues: the in-game track list as transcribed by the Fandom
          wiki, cross-checked against the soundtrack app&apos;s Steam listing for the launch date. Two
          tracks have no published trigger and are marked as such.
        </SourceNote>
      </div>
    </>
  );
}
