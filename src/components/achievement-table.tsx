"use client";

import { useEffect, useMemo, useState } from "react";
import { ACHIEVEMENTS } from "@/data/achievements";
import { rarityLabel } from "@/components/rarity-bar";
import { cn } from "@/lib/utils";

const KEY = "dl-achievements";

type Sort = "rarity" | "az" | "reverse";

/**
 * The full 66-row achievement table with a browser-local checklist.
 *
 * Progress lives in localStorage and nothing is uploaded — there is no account
 * on this site and nothing to sign into. Sorting by unlock rate ascending is
 * the default because it is the only ordering that tells a player what to do
 * next.
 */
export function AchievementTable() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [sort, setSort] = useState<Sort>("rarity");
  const [bucket, setBucket] = useState<"all" | "common" | "uncommon" | "rare" | "ultra">("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    // Hydration guard: the server has no access to localStorage, so the stored
    // checklist can only be read after mount. Setting state here is the point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      /* private mode: tracking still works for this page view */
    }
  }, []);

  function toggle(name: string) {
    setDone((prev) => {
      const next = { ...prev, [name]: !prev[name] };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* nothing to persist */
      }
      return next;
    });
  }

  const rows = useMemo(() => {
    const list = ACHIEVEMENTS.filter((a) => {
      if (q && !`${a.name} ${a.desc ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (bucket === "all") return true;
      const b = a.pct >= 50 ? "common" : a.pct >= 20 ? "uncommon" : a.pct >= 10 ? "rare" : "ultra";
      return b === bucket;
    });
    return [...list].sort((a, b) =>
      sort === "az" ? a.name.localeCompare(b.name) : sort === "reverse" ? b.pct - a.pct : a.pct - b.pct,
    );
  }, [q, bucket, sort]);

  const total = ACHIEVEMENTS.length;
  const complete = mounted ? ACHIEVEMENTS.filter((a) => done[a.name]).length : 0;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 border-b border-border pb-4">
        <div>
          <p className="eyebrow">Your progress</p>
          <p className="tnum mt-1 font-mono text-2xl">
            {complete}
            <span className="text-muted-foreground">/{total}</span>
          </p>
        </div>
        <div className="h-2 min-w-[120px] flex-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full"
            style={{ width: `${(complete / total) * 100}%`, background: "var(--jade)" }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search achievements…"
            className="h-9 w-52 rounded-[var(--radius-control)] border border-input bg-card px-4 text-sm outline-none focus:border-foreground/40"
          />
          <select
            value={bucket}
            onChange={(e) => setBucket(e.target.value as typeof bucket)}
            className="h-9 rounded-[var(--radius-control)] border border-input bg-card px-3 text-sm"
          >
            <option value="all">All rarities</option>
            <option value="common">Common (50%+)</option>
            <option value="uncommon">Uncommon (20–50%)</option>
            <option value="rare">Rare (10–20%)</option>
            <option value="ultra">Very rare (&lt;10%)</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-[var(--radius-control)] border border-input bg-card px-3 text-sm"
          >
            <option value="rarity">Rarest first</option>
            <option value="reverse">Most common first</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </div>

      <ul className="mt-2">
        {rows.map((a) => {
          const rarity = a.pct >= 50 ? "common" : a.pct >= 20 ? "uncommon" : a.pct >= 10 ? "rare" : "ultra";
          const checked = Boolean(done[a.name]);
          return (
            <li key={a.name} className="flex items-start gap-4 border-b border-border/60 py-3">
              <button
                onClick={() => toggle(a.name)}
                aria-pressed={checked}
                aria-label={`Mark ${a.name} as done`}
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-[5px] border transition-colors",
                  checked ? "border-transparent text-primary-foreground" : "border-border hover:border-foreground/40",
                )}
                style={checked ? { background: "var(--jade)" } : undefined}
              >
                {checked && (
                  <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6.4 4.6 9 10 3.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-medium", checked && "text-muted-foreground line-through")}>
                  {a.name}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {a.desc ?? (
                    <span className="italic">
                      Steam ships this one without a description — the name is all the game gives you.
                    </span>
                  )}
                </p>
              </div>
              <div className="w-28 shrink-0 text-right">
                <p className="tnum font-mono text-xs text-muted-foreground">{a.pct.toFixed(1)}%</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground/80">{rarityLabel(a.pct)}</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max(3, 100 - a.pct)}%`, background: `var(--rarity-${rarity})` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {rows.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">Nothing matches that filter.</p>
      )}
    </div>
  );
}
