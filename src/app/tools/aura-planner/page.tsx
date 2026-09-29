import type { Metadata } from "next";
import { PageHeader, SourceNote } from "@/components/page-header";
import { AuraPlanner } from "@/components/aura-planner";

export const metadata: Metadata = {
  title: "DRAPLINE aura planner — which aura is your run heading for?",
  description:
    "Answer two questions and see which of the six DRAPLINE auras the October check will award, with the exact meal categories to feed if you want a different one.",
  alternates: { canonical: "/tools/aura-planner/" },
};

export default function AuraPlannerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tool"
        title="Which aura is this run heading for?"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/tools/", label: "Tools" },
        ]}
        standfirst={
          <p>
            The aura is read once, in October Week 1, from two things: which stats you pushed and whether
            you were lenient or strict about Coo&apos;s behaviour. Answer those two questions for the
            current run and this returns the aura the game will show you — plus the meal categories to
            buy if that is the wrong answer.
          </p>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <AuraPlanner />
        <SourceNote>
          Mapping cross-checked against the six aura achievements and community observation. The aura
          affects appearance and one achievement — no stats, no combat effect. Personality bar mechanics
          are separate and never lock.
        </SourceNote>
      </div>
    </>
  );
}
