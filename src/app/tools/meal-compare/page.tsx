import type { Metadata } from "next";
import { PageHeader, SourceNote } from "@/components/page-header";
import { MealCompare } from "@/components/meal-compare";

export const metadata: Metadata = {
  title: "DRAPLINE meal affordability — what your gold actually buys",
  description:
    "Set your gold and the weeks remaining and see which DRAPLINE meal tier you can sustain: 3,000 G a week forever, 6,600 G occasionally, or 14,600 G once and never again.",
  alternates: { canonical: "/tools/meal-compare/" },
};

export default function MealComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Tool"
        title="Can this run afford the meals it wants?"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/tools/", label: "Tools" },
        ]}
        standfirst={
          <p>
            Every week costs a meal, and meals cost 3,000, 6,600 or 14,600 G. The gap between the tiers is
            where runs get into debt — and debt is one of the five endings. This works out how many weeks
            each tier survives on the gold in hand.
          </p>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <MealCompare />
        <SourceNote>
          Prices verified on patch 1.0.2. Where a category&apos;s per-tier output is not published, the
          tool shows the documented first-tier value and says nothing about the rest.
        </SourceNote>
      </div>
    </>
  );
}
