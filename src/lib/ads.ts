// Adsterra ad units — single source of truth.
//
// Each unit's GET CODE snippet must be copied verbatim: the network has used at
// least two URL shapes over time and they are not interchangeable, so the full
// src is stored rather than reconstructed from the key. A slot with an empty key
// renders nothing, which is what makes this file safe to ship before a unit is
// approved.

export type AdSlot = {
  key: string;
  width: number;
  height: number;
  /** Exact script URL from the dashboard's GET CODE snippet. */
  src: string;
};

/** 728×90 leaderboard. Desktop only — it overflows phones. */
export const LEADERBOARD: AdSlot = {
  key: "3aaf2e74eb61e292c3fbdc23c817db85",
  width: 728,
  height: 90,
  src: "https://bauval.org/22/3aaf2e74eb61e292c3fbdc23c817db85",
};

/** 300×250 rectangle. Fits every viewport. */
export const RECTANGLE: AdSlot = {
  key: "29057bc16eff7150e750aeecad97733f",
  width: 300,
  height: 250,
  src: "https://bauval.org/22/29057bc16eff7150e750aeecad97733f",
};
