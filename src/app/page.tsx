import Link from "next/link";
import { ArrowRight, Flask, BookOpen, Calculator, ListChecks, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { AURAS, GAME, MEAL_TIERS, DISPUTED, VERSIONS } from "@/data/game";
import { ACHIEVEMENTS } from "@/data/achievements";
import { RarityBar } from "@/components/rarity-bar";

const DATABASE = [
  { href: "/auras/", title: "Six auras", meta: "6 entries", desc: "Every aura's stat focus, treatment and Steam unlock rate — including the two Fandom misses." },
  { href: "/meals/", title: "Meal table", meta: "12 categories", desc: "Which category feeds which stat, what each star tier costs, and the four meal traits." },
  { href: "/characters/", title: "Cast and calamities", meta: "17 entries", desc: "The villagers you trade with and the seven calamity dragons, with their boss windows." },
  { href: "/achievements/", title: "Achievements", meta: "66 tracked", desc: "The full list with Steam's global unlock rate, sorted so the rarest are visible first." },
  { href: "/endings/", title: "Endings", meta: "5 + 25", desc: "The five named DAYS OF TORNADO endings, their exact conditions, and what the 25 futures really are." },
  { href: "/skills/", title: "Skills", meta: "6 trees", desc: "The attribute system, the 3/6/9 synergy ladder, and the two buffs personality grants." },
];

const TOOLS = [
  { href: "/tools/aura-planner/", title: "Aura planner", desc: "Pick your feeding focus and treatment; see which of the six auras the September check will award — and what to change if it is the wrong one.", icon: Sparkle },
  { href: "/tools/meal-compare/", title: "Meal tier comparison", desc: "The 3,000 / 6,600 / 14,600 G ladder next to what each tier actually returns, so an expensive week is a decision rather than a guess.", icon: Calculator },
  { href: "/tools/achievement-tracker/", title: "Achievement tracker", desc: "All 66 achievement routes with their unlock rates, kept in your browser.", icon: ListChecks },
];

export default function HomePage() {
  const rarest = [...ACHIEVEMENTS].sort((a, b) => a.pct - b.pct).slice(0, 5);
  const patch = VERSIONS[0];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">
          <p className="eyebrow">Independent reference · patch {patch.version} · {GAME.reviews.asOf}</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <div>
              <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                DRAPLINE runs are decided by numbers you can plan for.
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
                You feed a dragon girl for 48 weeks, the aura locks in October, and 25 futures wait on
                the other side. This site keeps the tables those decisions need: all six auras with
                their conditions and Steam unlock rates, the meal category-to-stat map, every one of
                the 66 achievements, and the ending list — assembled from the game&apos;s own data
                instead of copied from the wiki that stopped updating in Early Access.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/guide/beginner/"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Start with the first year <ArrowRight size={15} weight="bold" />
                </Link>
                <Link
                  href="/tools/aura-planner/"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border px-5 py-2.5 text-sm font-medium"
                >
                  Plan an aura <Flask size={15} weight="bold" />
                </Link>
              </div>
            </div>

            {/* The numbers a run is made of */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border">
              {[
                { k: "48", v: "weeks per run" },
                { k: "6", v: "possible auras" },
                { k: "12", v: "meal categories" },
                { k: "200+", v: "skills" },
                { k: "66", v: "achievements" },
                { k: "25", v: "advertised endings" },
              ].map((s) => (
                <div key={s.v} className="bg-card px-5 py-4">
                  <dt className="font-mono text-2xl font-medium tracking-tight">{s.k}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Three decisions */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-12">
          <p className="eyebrow">What actually decides a run</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="panel p-6">
              <p className="font-mono text-xs text-muted-foreground">DECISION 01</p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">Three meals, one choice, every week</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Meals are the only way to raise stats. The category tells you the stat, the star rating
                tells you the price — {MEAL_TIERS.map((t) => t.price).join(" / ")} G. Pick a category
                that fights your skill tree and you get a dragon who is average at two things.
              </p>
              <Link href="/meals/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2">
                Meal table <ArrowRight size={13} weight="bold" />
              </Link>
            </article>
            <article className="panel p-6">
              <p className="font-mono text-xs text-muted-foreground">DECISION 02</p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">Your aura is graded in September</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The aura settling in October Week 1 is a verdict on how you fed and treated Coo up to
                the second boss — then it is fixed for the rest of the year. Lenient or strict plus the
                stat you pushed picks one of six.
              </p>
              <Link href="/auras/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2">
                Aura conditions <ArrowRight size={13} weight="bold" />
              </Link>
            </article>
            <article className="panel p-6">
              <p className="font-mono text-xs text-muted-foreground">DECISION 03</p>
              <h2 className="mt-2 text-lg font-semibold tracking-tight">Debt is a loss condition</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Borrowing from Calico to eat well is a real strategy — staying indebted is an ending.
                The expensive meal you cannot afford is not a bargain, it is the Use Responsibly fate
                with extra steps.
              </p>
              <Link href="/guide/money/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2">
                Money and debt <ArrowRight size={13} weight="bold" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Database */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Database</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Everything the game tells you after the fact</h2>
            </div>
            <BookOpen size={22} className="hidden shrink-0 text-muted-foreground sm:block" />
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-container)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {DATABASE.map((d) => (
              <Link key={d.href} href={d.href} className="group bg-card p-6 transition-colors hover:bg-muted/50">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight">{d.title}</h3>
                  <span className="font-mono text-[11px] text-muted-foreground">{d.meta}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-12">
          <p className="eyebrow">Tools</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Plan the run before you spend it</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="panel group p-6 transition-colors hover:border-foreground/30">
                <t.icon size={20} weight="bold" className="text-muted-foreground" />
                <h3 className="mt-3 text-base font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                  Open <ArrowRight size={13} weight="bold" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Two-column: game facts + rarest achievements */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The game</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">DRAPLINE at a glance</h2>
            <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
              {[
                ["Developer", GAME.developer],
                ["Publisher", GAME.publisher],
                ["Released", "24 September 2026 (1.0 out of Early Access)"],
                ["Price", GAME.price],
                ["Platform", GAME.platforms.join(", ")],
                ["Languages", GAME.languages.join(" · ")],
                ["Reviews", `${GAME.reviews.total.toLocaleString()} · ${GAME.reviews.pct}% ${GAME.reviews.label}`],
                ["Achievements", `${GAME.achievementsTotal} on Steam`],
                ["Streaming", "Allowed, monetisation included"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 py-2.5">
                  <dt className="w-32 shrink-0 text-muted-foreground">{k}</dt>
                  <dd className="tnum">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              {GAME.developerNote}
            </p>
          </div>

          <div>
            <p className="eyebrow">Rarest first</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">What almost nobody has done</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Steam publishes a global unlock rate for every achievement. Sorted ascending, the list is
              a difficulty ranking written by the players themselves.
            </p>
            <ol className="mt-6 space-y-3">
              {rarest.map((a, i) => (
                <li key={a.name} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{a.name}</span>
                  <RarityBar pct={a.pct} />
                </li>
              ))}
            </ol>
            <Link href="/achievements/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2">
              All 66 with unlock rates <ArrowRight size={13} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* What others get wrong */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-12">
          <p className="eyebrow">Accuracy</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Where the other DRAPLINE sites are out of date</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Most of what ranks for DRAPLINE right now was written when the game was in Early Access. We
            checked each claim against Steam&apos;s live data and the current patch, and left the
            disagreements visible rather than quietly fixing them.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow pb-3 text-left">Topic</th>
                  <th className="eyebrow pb-3 text-left">Commonly stated</th>
                  <th className="eyebrow pb-3 text-left">What the data says</th>
                </tr>
              </thead>
              <tbody>
                {DISPUTED.map((d) => (
                  <tr key={d.topic} className="border-b border-border/60 align-top">
                    <td className="py-3 pr-6 font-medium">{d.topic}</td>
                    <td className="py-3 pr-6 text-muted-foreground">{d.wrong}</td>
                    <td className="py-3">{d.right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {AURAS.map((a) => (
              <span key={a.slug} className="tnum">
                {a.name} {a.pct}%
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
