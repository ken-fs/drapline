import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Flask, ListChecks } from "@phosphor-icons/react/dist/ssr";
import { PageHeader, SourceNote } from "@/components/page-header";

export const metadata: Metadata = {
  title: "DRAPLINE tools: aura planner and meal affordability",
  description:
    "Two small tools for planning a DRAPLINE run: work out which of the six auras your feeding pattern is heading for, and check whether your gold actually covers the meal tier you want.",
  alternates: { canonical: "/tools/" },
};

const TOOLS = [
  {
    href: "/tools/aura-planner/",
    icon: Flask,
    title: "Aura planner",
    desc: "Two questions — what you feed, how you treat her — and the aura the October check will award. Includes the extra Whimsical condition players miss.",
    meta: "6 outcomes · 1 deadline",
  },
  {
    href: "/tools/meal-compare/",
    icon: Calculator,
    title: "Meal affordability",
    desc: "Set your gold and the weeks left, see which star tier you can actually sustain — and how many weeks short the ambitious one leaves you.",
    meta: "3 tiers · documented numbers only",
  },
  {
    href: "/achievements/",
    icon: ListChecks,
    title: "Achievement checklist",
    desc: "The tracker lives on the achievements page itself: all 66 rows, filterable by rarity, with progress kept in your browser.",
    meta: "66 rows · saved locally",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Plan the run, then spend it"
        breadcrumb={[{ href: "/", label: "Home" }]}
        standfirst={
          <p>
            DRAPLINE is deterministic enough to plan: feeding decides stats, stats and treatment decide
            the aura, and gold decides which meals are even on the table. These tools do that arithmetic
            with the numbers the game prints, and they say &ldquo;unknown&rdquo; where it does not.
          </p>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="panel group flex flex-col p-6 transition-colors hover:border-foreground/30">
              <t.icon size={20} weight="bold" className="text-muted-foreground" />
              <h2 className="mt-3 text-lg font-semibold tracking-tight">{t.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{t.desc}</p>
              <p className="mt-4 font-mono text-[11px] text-muted-foreground">{t.meta}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                Open <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-14 panel p-6">
          <p className="eyebrow">Why so few</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            A calculator is only as good as its inputs. The game publishes tier prices, first-tier stat
            values and the aura mapping, so those are the tools worth building. It does not publish the
            full skill table or the 25 ending conditions, so there is no skill optimiser or ending router
            here — those would be a plausible-looking interface wrapped around invented numbers.
          </p>
          <SourceNote>
            Tier prices and aura mapping verified on patch 1.0.2. Stat values from the in-game meal list.
          </SourceNote>
        </section>
      </div>
    </>
  );
}
