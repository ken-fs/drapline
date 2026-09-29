import type { Metadata } from "next";
import Link from "next/link";
import { PERSONALITY } from "@/data/game";
import { PageHeader, SourceNote } from "@/components/page-header";

export const metadata: Metadata = {
  title: "DRAPLINE Rule and Wild personality — what each one actually changes",
  description:
    "DRAPLINE's personality bar slides between Rule and Wild and never locks. Here is what each end genuinely grants, how the bar moves week to week, and why the aura is a separate system players constantly confuse it with.",
  alternates: { canonical: "/guide/personality/" },
};

export default function PersonalityGuide() {
  return (
    <>
      <PageHeader
        eyebrow="Guide · Mechanics"
        title="Rule and Wild change combat — not appearance"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/guide/", label: "Guides" },
        ]}
        standfirst={
          <p>
            Two systems look similar and behave nothing alike. The personality bar slides between Rule and
            Wild, moves all year, and grants a permanent combat buff. The aura settles once in October and
            changes only how Coo looks. Players who conflate them spend a run optimising the wrong dial.
          </p>
        }
      />

      <article className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="prose-wiki">
          <h2>The bar never locks</h2>
          <p>
            {PERSONALITY.bar} Scolding Coo when she performs badly, praising her when she performs well,
            refusing the extra food, and sending her to study with Toly all push toward Rule. Letting her
            eat what she asks for, skipping both scolding and praise, letting her clear the island during
            the three-week sequence, and letting her run into the wilderness with Arches all push toward
            Wild. Items can push the bar too, in both directions.
          </p>

          <h2>What Wild actually grants</h2>
          <div className="panel p-5">
            <p className="text-sm font-medium">
              {PERSONALITY.wild.buff} <span className="text-muted-foreground">— {PERSONALITY.wild.name} end</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{PERSONALITY.wild.effect}</p>
          </div>
          <p>
            The effect only applies while Coo is <em>ignoring your orders</em>, which is the part players
            miss. A very Wild Coo disobeys often, hits critically while she does it, and takes
            substantially more damage at the same time. In a short fight that is a burst window. In the
            December calamity it is a way to lose a dragon that was winning.
          </p>
          <p>
            The failure mode is at the far end: a Wild run that lets Coo eat whatever she likes can end
            with <strong>Convenient Snack</strong>, the ending where she eats you instead. 42.3% of
            players have it.
          </p>

          <h2>What Rule actually grants</h2>
          <div className="panel p-5">
            <p className="text-sm font-medium">
              {PERSONALITY.rule.buff} <span className="text-muted-foreground">— {PERSONALITY.rule.name} end</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{PERSONALITY.rule.effect}</p>
          </div>
          <p>
            The fifth skill slot is the real prize: one more slot is one more rung toward a synergy, and
            synergy tiers are where damage comes from. The buff-duration extension quietly doubles the
            value of any buff build — Mindfulness and Wind Blade both get an extra turn of value per cast.
          </p>
          <p>The cost is small and specific: a heavily Rule-aligned Coo refuses to eat defeated foes, so she gives up a small random stat gain after battles.</p>

          <h2>How the two dials interact with the aura</h2>
          <p>
            They do not. The aura reads what you fed and whether you were lenient or strict, and it is
            fixed in October Week 1. A run can be Wild and still receive a &ldquo;strict&rdquo; aura if the
            feeding pattern dominates the read, which is exactly the confusion community testing resolved
            when it found identical auras from opposite personality positions.
          </p>
          <table>
            <thead>
              <tr>
                <th>System</th>
                <th>When it settles</th>
                <th>What it changes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personality (Rule / Wild)</td>
                <td>Never — it keeps moving</td>
                <td>Combat: crit rate and damage taken, or buff duration and a fifth skill</td>
              </tr>
              <tr>
                <td>Aura (six outcomes)</td>
                <td>October, Week 1 — once</td>
                <td>Appearance and one Steam achievement. Nothing mechanical</td>
              </tr>
            </tbody>
          </table>

          <h2>Which end to aim for</h2>
          <ul>
            <li>
              <strong>New players:</strong> Rule. The extra skill slot absorbs bad builds, and the failure
              penalty is a small stat gain rather than a run-ending event.
            </li>
            <li>
              <strong>Attack builds that can survive a mistake:</strong> Wild, if the run has the HP to
              absorb the +25–50% damage. The critical-rate swing is a genuine boss-killer.
            </li>
            <li>
              <strong>Anyone chasing a specific aura:</strong> decide the aura first, then let the
              personality land wherever the treatment takes it. See{" "}
              <Link href="/auras/">the six auras</Link> and{" "}
              <Link href="/tools/aura-planner/">the planner</Link>.
            </li>
          </ul>
          <p>
            The aura is a one-shot check and the personality is a running total — so the aura is the
            decision that needs planning, and the personality is the one that can be corrected the week
            you notice it drifting. Five of the six auras sit at or below 62% unlock rates; the two
            Intelligence routes sit near 26%, which is what a one-shot check does to players who did not
            know it was coming.
          </p>
        </div>

        <SourceNote>
          Buff names, effects and the fifth-skill-slot rule: Fandom&apos;s Coo entry, transcribing in-game
          text. Aura independence: community testing, corroborated by the aura achievement set. Unlock
          rates: Steam Community global achievements, 2026-09-29.
        </SourceNote>
      </article>
    </>
  );
}
