#!/usr/bin/env node
/**
 * Design-token calculator for drapline.xyz.
 *
 * Competitor audit (2026-09-29): all four DRAPLINE fan sites sit in the warm
 * family (amber / coral / gold on cream or charcoal). The site's edge is data
 * and tooling, so the palette goes cold on purpose: petrol ink on cold paper,
 * a single acid-lime accent, and warm hues reserved for semantics (debt,
 * poison) rather than decoration.
 *
 * Run: node scripts/tokens.mjs
 */


// --- OKLCH -> sRGB (Bjorn Ottosson's reference conversion) ------------------
function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return lin.map((v) => {
    const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    return Math.max(0, Math.min(1, c));
  });
}

const hex = (rgb) =>
  "#" + rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

const lum = (rgb) => {
  const [r, g, b] = rgb.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const T = (L, C, h) => ({ L, C, h, rgb: oklchToRgb(L, C, h) });

// --- Palette ---------------------------------------------------------------
// Petrol ink ramp (hue 214), cold paper (hue 200, near-zero chroma), acid lime
// accent (hue 118), semantic ember (hue 40) and rust (hue 25) kept for debt /
// poison only.
const c = {
  paper: T(0.978, 0.004, 200),
  paper2: T(0.955, 0.006, 200),
  line: T(0.9, 0.008, 205),
  ink: T(0.26, 0.028, 214),
  ink2: T(0.42, 0.022, 214),
  ink3: T(0.55, 0.016, 212),
  petrol: T(0.32, 0.05, 214),
  petrolDeep: T(0.22, 0.04, 216),
  lime: T(0.86, 0.19, 118),
  limeText: T(0.52, 0.14, 132),
  ember: T(0.66, 0.17, 45),
  emberDeep: T(0.55, 0.16, 40),
  rust: T(0.55, 0.19, 25),
  jade: T(0.5, 0.11, 168),
  darkBg: T(0.19, 0.02, 216),
  darkBg2: T(0.24, 0.025, 214),
  darkLine: T(0.32, 0.02, 214),
  darkFg: T(0.93, 0.008, 200),
  darkFg2: T(0.72, 0.012, 205),
};

const pairs = [
  ["LIGHT paper / ink", c.paper, c.ink, 4.5],
  ["LIGHT paper / ink2 (muted body)", c.paper, c.ink2, 4.5],
  ["LIGHT paper / ink3 (faint)", c.paper, c.ink3, 3],
  ["LIGHT paper / petrol (link/heading)", c.paper, c.petrol, 4.5],
  ["LIGHT paper2 / ink", c.paper2, c.ink, 4.5],
  ["LIGHT petrol button / paper fg", c.petrol, c.paper, 4.5],
  ["LIGHT lime / petrolDeep (accent on dark ink)", c.lime, c.petrolDeep, 4.5],
  ["LIGHT paper / limeText (accent text)", c.paper, c.limeText, 4.5],
  ["LIGHT paper / ember", c.paper, c.ember, 3],
  ["LIGHT paper / emberDeep (warning text)", c.paper, c.emberDeep, 4.5],
  ["LIGHT paper / rust (poison text)", c.paper, c.rust, 4.5],
  ["LIGHT paper / jade (success text)", c.paper, c.jade, 4.5],
  ["DARK darkBg / darkFg", c.darkBg, c.darkFg, 4.5],
  ["DARK darkBg / darkFg2", c.darkBg, c.darkFg2, 4.5],
  ["DARK darkBg / lime", c.darkBg, c.lime, 4.5],
  ["DARK darkBg2 / darkFg", c.darkBg2, c.darkFg, 4.5],
  ["DARK darkBg / ember", c.darkBg, c.ember, 3],
];

let bad = 0;
for (const [label, a, b, min] of pairs) {
  const r = contrast(a.rgb, b.rgb);
  const ok = r >= min;
  if (!ok) bad++;
  console.log(`${ok ? "✅" : "❌"} ${label.padEnd(42)} ${r.toFixed(2)}:1 (min ${min})`);
}

console.log("\n--- token values ---");
for (const [k, v] of Object.entries(c)) {
  console.log(`${k.padEnd(11)} oklch(${v.L} ${v.C} ${v.h})  ${hex(v.rgb)}`);
}

// Also emit the exact CSS block so globals.css cannot drift from this script.
const css = `:root {
  --paper: ${hex(c.paper.rgb)};   --paper-2: ${hex(c.paper2.rgb)};  --line: ${hex(c.line.rgb)};
  --ink: ${hex(c.ink.rgb)};       --ink-2: ${hex(c.ink2.rgb)};      --ink-3: ${hex(c.ink3.rgb)};
  --petrol: ${hex(c.petrol.rgb)}; --petrol-deep: ${hex(c.petrolDeep.rgb)};
  --lime: ${hex(c.lime.rgb)};     --lime-text: ${hex(c.limeText.rgb)};
  --ember: ${hex(c.ember.rgb)};   --ember-deep: ${hex(c.emberDeep.rgb)};
  --rust: ${hex(c.rust.rgb)};     --jade: ${hex(c.jade.rgb)};
}`;
console.log("\n" + css);
if (bad) {
  console.log(`\n${bad} pair(s) below target — adjust before shipping.`);
  process.exit(1);
}
console.log("\nAll pairs pass.");
