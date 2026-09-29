import { cn } from "@/lib/utils";

/**
 * Unlock-rate bar for an achievement or aura.
 *
 * The fill is inverted on purpose: a longer bar means a rarer achievement, so
 * the shape of the whole column reads as a difficulty ranking at a glance.
 * Ramp colour follows the same four buckets the pages describe in words.
 */
export function RarityBar({ pct, className }: { pct: number; className?: string }) {
  const rarity = pct >= 50 ? "common" : pct >= 20 ? "uncommon" : pct >= 10 ? "rare" : "ultra";
  const fill = Math.max(3, 100 - pct);
  return (
    <span className={cn("flex w-32 shrink-0 items-center gap-2", className)}>
      <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-border">
        <span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${fill}%`, background: `var(--rarity-${rarity})` }}
        />
      </span>
      <span className="w-12 text-right font-mono text-xs text-muted-foreground">{pct.toFixed(1)}%</span>
    </span>
  );
}

export function rarityLabel(pct: number) {
  if (pct >= 50) return "Common";
  if (pct >= 20) return "Uncommon";
  if (pct >= 10) return "Rare";
  return "Very rare";
}
