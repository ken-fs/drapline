import type { Metadata } from "next";
import Link from "next/link";
import { GAME, VERSIONS } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";

export const metadata: Metadata = {
  title: "DRAPLINE patch notes and version history",
  description:
    "DRAPLINE's version history from Early Access to 1.0.2, with the dates Steam recorded for each patch. Three updates landed in the first five days after full release.",
  alternates: { canonical: "/updates/" },
};

export default function UpdatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Living page"
        title="Patch history, newest first"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            DRAPLINE shipped 1.0 on 24 September 2026 and was patched twice in the following four days.
            This page tracks the versions Steam records. Fandom&apos;s version page still stops at 0.9.3
            from July, so treat anything quoting an older patch number as stale.
          </p>
        }
        meta={
          <div className="panel px-5 py-4 lg:w-72">
            <p className="eyebrow">Current</p>
            <p className="mt-1 font-mono text-lg">{VERSIONS[0].version}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Released {VERSIONS[0].date}. {GAME.reviews.total.toLocaleString()} reviews at {GAME.reviews.pct}% positive.
            </p>
          </div>
        }
      />

      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <ol className="relative border-l border-border pl-8">
          {VERSIONS.map((v, i) => (
            <li key={v.version} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-[41px] top-1.5 size-2.5 rounded-full border-2 bg-background"
                style={{ borderColor: i === 0 ? "var(--jade)" : "var(--ink-3, #677477)" }}
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-mono text-base font-medium">{v.version}</h2>
                <time className="text-xs text-muted-foreground" dateTime={v.date}>
                  {v.date}
                </time>
                {i === 0 && (
                  <span className="rounded-[var(--radius-control)] border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{v.note}</p>
            </li>
          ))}
        </ol>

        <section className="mt-6 panel p-6">
          <p className="eyebrow">Why the page exists</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A game that patches three times in five days invalidates guides quickly. The aura set grew
            from four to six after Early Access, the achievement count moved from 62 to 66, and the
            listing on Fandom has not caught up with either. When a patch changes anything this site
            documents, the affected page changes and the date at the bottom moves with it.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/auras/" className="font-medium underline underline-offset-2">
              Six auras →
            </Link>
            <Link href="/achievements/" className="font-medium underline underline-offset-2">
              66 achievements →
            </Link>
          </div>
        </section>

        <SourceNote>
          Patch numbers and dates: the DRAPLINE Steam news feed, retrieved 2026-09-29. Patch contents are
          not summarised here because the developer&apos;s posts do not itemise changes.
        </SourceNote>
      </div>
    </>
  );
}
