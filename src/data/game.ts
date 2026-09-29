/**
 * The site's single source of truth for DRAPLINE facts.
 *
 * Every value here traces to a citation in `sources` — Steam's own APIs
 * (appdetails, news, achievement percentages), the Steam Community achievement
 * page, the in-game Compendium quotes reproduced by the Fandom wiki, and the
 * developer's store-page copy. Nothing is estimated. Where sources disagree the
 * disagreement is recorded in `disputed` instead of being silently resolved.
 *
 * Last verified: 2026-09-29 against patch 1.0.2.
 */

export const SITE_NAME = "Drapline Field Lab";
export const GAME = {
  name: "DRAPLINE",
  appid: 3103780,
  demoAppid: 3369350,
  ostAppid: 5074600,
  developer: "KANAWO",
  publisher: "Vaka Game Magazine",
  /** Steam news post for 1.0.0 is dated 09-24; the store page prints 23 Sep. */
  release: "2026-09-24",
  releaseNote: "1.0.0 full release (store page prints 23 Sep; the news post is 24 Sep)",
  price: "$12.99",
  platforms: ["Windows"],
  languages: ["Japanese", "English", "Simplified Chinese"],
  genres: ["Roguelite", "Raising sim", "RPG"],
  reviews: { total: 2327, positive: 2254, negative: 73, pct: 96.9, label: "Overwhelmingly Positive", asOf: "2026-09-29" },
  achievementsTotal: 66,
  skillCount: "200+",
  weeksPerRun: 48,
  developerNote:
    "KANAWO develops solo and previously shipped Noel the Mortal Fate (Steam 2018; Switch / PS4 / Xbox 2022).",
  streaming: "Streaming and monetisation are explicitly allowed by the developer.",
  steamUrl: "https://store.steampowered.com/app/3103780/DRAPLINE/",
} as const;

export type StatKey = "HP" | "STR" | "VIT" | "INT" | "RES" | "AGI";

export const STATS: { key: StatKey; full: string; effect: string }[] = [
  { key: "HP", full: "Health", effect: "How much damage Coo absorbs before a battle loss." },
  { key: "STR", full: "Strength", effect: "Physical damage dealt." },
  { key: "VIT", full: "Vitality", effect: "Reduces physical damage taken." },
  { key: "INT", full: "Intelligence", effect: "Magical damage dealt." },
  { key: "RES", full: "Resilience", effect: "Reduces magical damage taken." },
  { key: "AGI", full: "Agility", effect: "Turn order, plus a small evasion bonus." },
];

export type Aura = {
  slug: string;
  name: string;
  /** Feeding pattern that pushes this aura, in the community's terms. */
  focus: string;
  treatment: "Lenient" | "Strict";
  /** Global achievement unlock rate, Steam Community, 2026-09-29. */
  pct: number;
  achievement: string;
  blurb: string;
  /** Meal categories that push this aura's stat focus, by slug. */
  feeds: string[];
  /** Concrete steps, in the order the game checks them. */
  steer: string[];
  watchOut: string;
};

/**
 * Six auras, not four. Fandom documents only the four Early Access auras and
 * misses Steady and Whimsical; the two appear as their own Steam achievements,
 * which is how the set is confirmed complete (drapline.wiki reached the same
 * conclusion independently).
 */
export const AURAS: Aura[] = [
  {
    slug: "adored",
    name: "Adored",
    focus: "Strength + Agility",
    treatment: "Lenient",
    pct: 62.3,
    achievement: "Adored Divine Dragon",
    blurb:
      "The default end state for a first run that fed attack stats and said yes to Coo. Highest unlock rate of the six, which makes it the accidental result rather than the deliberate one.",
    feeds: ["meat", "plant", "metal", "seafood"],
    steer: [
      "Feed Strength early and often — Meat is the direct line, and second-tier Meat scales hardest while Strength is still low.",
      "Add Agility behind it with Plant meals so the offensive half of the ledger stays ahead of HP, Vitality and Resilience.",
      "Stay lenient: let Coo eat what she asks for, skip the scolding, do not refuse the extra food.",
      "Keep it up to the September Week 4 boss. October Week 1 is when the game reads the ledger, and nothing after that changes it.",
    ],
    watchOut:
      "Adored is where runs land when nobody is steering. If you were aiming for it, the trap is the opposite: buying a defensive meal in a bad week quietly moves the focus line, and one cheap Stone meal is easy to forget by October.",
  },
  {
    slug: "chill",
    name: "Chill",
    focus: "HP + Vitality + Resilience",
    treatment: "Lenient",
    pct: 53.7,
    achievement: "Chill Divine Dragon",
    blurb:
      "A defensive build raised kindly. Common in runs that spent the early months surviving rather than racing, and the easiest aura to steer into on purpose.",
    feeds: ["carbohydrate", "bone", "metal", "wood", "crystal", "water"],
    steer: [
      "Feed HP and Vitality from the first week — Carbohydrate for HP alone, Bone for HP plus the 30 stamina refund, Metal for Vitality.",
      "Layer Resilience behind them with Wood and Crystal so the defensive half clearly outweighs Strength, Intelligence and Agility.",
      "Stay lenient. Chill and Reserved share a feeding pattern; the treatment is the only thing separating them.",
      "Nothing needs to be rushed — defensive stats are what carry you through the December Moon fight anyway.",
    ],
    watchOut:
      "The mixed categories are the trap here. Bone and Crystal both carry a second stat, and a diet built on them alone drifts the focus line toward Agility or Intelligence. Pair them with a pure category like Carbohydrate or Metal.",
  },
  {
    slug: "mischievous",
    name: "Mischievous",
    focus: "Strength",
    treatment: "Strict",
    pct: 41.5,
    achievement: "Mischievous Divine Dragon",
    blurb:
      "Attack stats with a heavy hand. Reachable in a normal playthrough without noticing: scolding failures and refusing extra food is enough.",
    feeds: ["meat", "plant", "seafood", "egg"],
    steer: [
      "Push Strength with Meat, and only Strength — Mischievous does not ask for Agility the way Adored does.",
      "Be strict about it: refuse the extra food, scold the failures, praise nothing, and send her to study with Toly.",
      "Decline the eating offers in the three-week island sequence.",
      "Settle it before the September boss. After that the aura is already written.",
    ],
    watchOut:
      "Strict treatment pushes the personality bar toward Rule, and a strongly Rule-aligned Coo refuses to eat defeated foes after battle. You are trading a small random stat gain per fight for the aura — usually worth it, occasionally not.",
  },
  {
    slug: "reserved",
    name: "Reserved",
    focus: "HP + Vitality + Resilience",
    treatment: "Strict",
    pct: 38.5,
    achievement: "Reserved Divine Dragon",
    blurb:
      "Defensive stats under strict handling. The aura for players who treat the year as risk management and keep the personality bar leaned toward Rule.",
    feeds: ["carbohydrate", "metal", "wood", "bone", "fungus"],
    steer: [
      "Feed HP, Vitality and Resilience: Carbohydrate, Metal and Wood are the clean single-stat lines.",
      "Keep Strength and Intelligence below the defensive pair — a Strength habit from the early fights is the usual leak.",
      "Be strict. Same feeding pattern as Chill; the treatment is what separates them.",
      "The December Moon fight rewards the build you already need for this aura, so the run does not fight you.",
    ],
    watchOut:
      "Strict treatment means scolding and refusing food on weeks when Coo's behaviour is genuinely worsening. Skipping the scolding to keep the run pleasant is how Reserved turns into Chill.",
  },
  {
    slug: "steady",
    name: "Steady",
    focus: "Intelligence",
    treatment: "Lenient",
    pct: 27.2,
    achievement: "Steady Dragon",
    blurb:
      "Added after Early Access, so it sits lower on the unlock table. Needs a magic-first feeding pattern with lenient handling — easy to miss if you spread stats evenly.",
    feeds: ["seafood", "crystal", "fungus", "water"],
    steer: [
      "Commit to Intelligence with Seafood, the strongest INT line at +250 on a first-tier meal, and Crystal for INT paired with Resilience.",
      "Do not split the ledger with Strength or Agility. Steady is decided by Intelligence being the direction, not by one big Intelligence meal.",
      "Stay lenient: let her eat, skip the scolding.",
      "Pairs well with the Wing and Scale skill trees, which is the build the aura implies anyway.",
    ],
    watchOut:
      "Steady is one of the two auras most wikis do not list, so old guides describe this run as a failed Adored. It is not a failure — it is a separate achievement.",
  },
  {
    slug: "whimsical",
    name: "Whimsical",
    focus: "Intelligence + Agility (INT leading, AGI above STR)",
    treatment: "Strict",
    pct: 26.0,
    achievement: "Whimsical Dragon",
    blurb:
      "The rarest aura. Carries an extra condition on top of the strict handling: Intelligence must be the leading stat while Agility stays above Strength. Players who push Agility instead report missing it.",
    feeds: ["seafood", "plant", "crystal", "water"],
    steer: [
      "Make Intelligence the leading stat with Seafood and Crystal.",
      "Push Agility behind it — Plant is the pure Agility line, and second-tier meals scale hardest while the stat is low.",
      "Keep Strength strictly below Agility. This is the condition players miss: an early Strength habit from the first-quarter fights will block the aura even with perfect Intelligence.",
      "Be strict throughout: refuse the food, scold the failures, and decline the island sequence.",
    ],
    watchOut:
      "Two conditions on one aura is why Whimsical is the least-unlocked of the six. Check the Agility-versus-Strength gap while there is still a boss left to fight — after the September fight the aura is locked and there is no second reading.",
  },
];

export const AURA_LOCK =
  "October, Week 1 — immediately after the September Week 4 boss. Anything after that point shapes the story but not the aura.";

export const PERSONALITY = {
  bar: "Rule ↔ Wild is a sliding bar that never locks, so a run can flip direction at any week.",
  wild: {
    name: "Wild",
    buff: "Forward Leaning / Act Before Thinking",
    effect:
      "While disobeying orders: critical rate +50% (fully Wild +100%), but incoming damage +25% (fully Wild +50%).",
    how: "Let Coo eat what she asks for, skip scolding, skip praise, let her clear the island in the three-week sequence.",
    risk: "A Wild run that ignores commands can end with the Convenient Snack ending — the one where Coo eats the player.",
  },
  rule: {
    name: "Rule",
    buff: "Polite / Logical Thinking",
    effect:
      "Every other buff lasts 1 turn longer and every debuff 1 turn shorter. A strongly Rule-aligned Coo can equip 5 battle skills instead of 4.",
    how: "Refuse extra food, scold failures, praise good work, send her to study with Toly, do not let her eat townsfolk.",
    risk: "A high Rule Coo refuses to eat defeated foes after battle, quietly giving up a small random stat gain.",
  },
};

export type MealCategory = {
  slug: string;
  name: string;
  stats: string;
  /** First-tier example with its printed numbers, from the in-game meal list. */
  tier1: string;
  /** Documented meals in this category. Names are procedurally prefixed, so the
   *  noun (Log, Bone, Kraken) is the stable part and the adjective is not. */
  examples: { name: string; effect: string; price?: string; stars?: number; trait?: string }[];
  note?: string;
};

export const MEAL_CATEGORIES: MealCategory[] = [
  {
    slug: "carbohydrate",
    name: "Carbohydrate",
    stats: "HP",
    tier1: "Rice — HP +2,500",
    examples: [{ name: "Rice", effect: "HP +2,500" }],
    note: "The cleanest HP line and the cheapest way to buy survivability. It also makes the Whimsical condition harder to hold, since it pushes the defensive half of the ledger.",
  },
  {
    slug: "bone",
    name: "Bone",
    stats: "HP + AGI",
    tier1: "Animal Bone — HP +2,000, AGI +50, recovers 30 stamina",
    examples: [
      { name: "Animal Bone", effect: "HP +1,980, AGI +49", price: "2,950 G", stars: 1 },
      { name: "Monster Horn", effect: "HP +2,080, AGI +52", price: "6,843 G", stars: 2, trait: "Nutritious" },
      { name: "Massive Fossil", effect: "HP +8,080, AGI +303", price: "14,665 G", stars: 3, trait: "Poisonous" },
    ],
    note: "The only first-tier food that gives stamina back, which makes it the value pick in a week where the action just cost 15–25 stamina.",
  },
  {
    slug: "meat",
    name: "Meat",
    stats: "STR",
    tier1: "Livestock Meat — STR +250",
    examples: [
      { name: "Livestock Meat", effect: "STR +250 (ruled 240 on a 288 kg cut)", price: "2,860 G", stars: 1 },
      { name: "Wild Meat", effect: "STR +400 base, scaling higher while Strength is low", stars: 2 },
    ],
    note: "The direct route to Adored and Mischievous, and the reason second-tier Meat is the best value in the game for a run that started slow on Strength.",
  },
  {
    slug: "egg",
    name: "Egg",
    stats: "STR + VIT",
    tier1: "Assorted Egg — STR +200, VIT +50",
    examples: [{ name: "Assorted Egg", effect: "STR +208, VIT +52", price: "3,099 G", stars: 1 }],
    note: "A paired category: it pushes two stats at once, at the cost of a penalty elsewhere.",
  },
  {
    slug: "metal",
    name: "Metal",
    stats: "VIT",
    tier1: "Used Steel — VIT +250",
    examples: [
      { name: "Used Steel", effect: "VIT +252", price: "3,009 G", stars: 1 },
      { name: "Mithril", effect: "VIT +404", price: "6,645 G", stars: 2 },
    ],
    note: "A pure defensive line, and the cleanest way to hold the Chill and Reserved ledger without dragging Agility along.",
  },
  {
    slug: "stone",
    name: "Stone",
    stats: "VIT + STR",
    tier1: "Rock — VIT +200, STR +50",
    examples: [{ name: "Rock", effect: "VIT +200, STR +50" }],
    note: "The defensive category that quietly feeds a Strength run. Worth knowing if the aura you want is Chill.",
  },
  {
    slug: "seafood",
    name: "Seafood",
    stats: "INT",
    tier1: "Coastal Seafood — INT +250",
    examples: [
      { name: "Coastal Seafood", effect: "INT +252", price: "3,009 G", stars: 1 },
      { name: "Kraken", effect: "INT +594", price: "14,374 G", stars: 2, trait: "Rapid Growth" },
    ],
    note: "The strongest Intelligence line and therefore the fastest route to Steady and Whimsical. The Kraken is one of the few documented meals where a lower star count beats a higher one — Rapid Growth makes it scale off your weakness.",
  },
  {
    slug: "crystal",
    name: "Crystal",
    stats: "INT + RES",
    tier1: "Magic Crystal — INT +200, RES +50",
    examples: [{ name: "Magic Crystal", effect: "INT +204, RES +51", price: "3,039 G", stars: 1 }],
    note: "The magic mirror of Stone: Intelligence with a defensive passenger, which is exactly what a Whimsical run needs to keep Strength down while still surviving.",
  },
  {
    slug: "wood",
    name: "Wood",
    stats: "RES",
    tier1: "Log — RES +250",
    examples: [
      { name: "Log", effect: "RES +240", price: "2,860 G", stars: 1 },
      { name: "Great Tree", effect: "RES +404", price: "6,645 G", stars: 2 },
    ],
    note: "Fandom files this category as Tree; other sources say Wood. Same meals either way. Pure Resilience, which is what the Moon fight in December is actually testing.",
  },
  {
    slug: "fungus",
    name: "Fungus",
    stats: "RES + INT",
    tier1: "Edible Mushroom — RES +200, INT +50",
    examples: [{ name: "Edible Mushroom", effect: "RES +204, INT +51", price: "3,039 G", stars: 1 }],
    note: "Resilience with an Intelligence passenger — a useful double for Steady runs that still need to survive Noir and Moon.",
  },
  {
    slug: "plant",
    name: "Plant",
    stats: "AGI",
    tier1: "Wildflower — AGI +250",
    examples: [{ name: "Wildflower", effect: "AGI +247–252 depending on the roll", price: "2,950–3,009 G", stars: 1 }],
    note: "Pure Agility, and the lever for the Whimsical condition that Agility must sit above Strength.",
  },
  {
    slug: "water",
    name: "Water",
    stats: "HP + AGI",
    tier1: "Spring Water — AGI +202, HP +505",
    examples: [{ name: "Spring Water", effect: "AGI +202, HP +505", price: "3,009 G", stars: 1 }],
    note: "Skews Agility hard despite the HP half, which makes it the sneaky pick for a player trying to raise Agility without raising Strength.",
  },
];

export const MEAL_TIERS = [
  { stars: 1, price: "3,000 G", note: "One clean stat gain, no downside." },
  { stars: 2, price: "6,600 G", note: "Larger gain, and many second-tier meals scale up when the fed stat is still low. The efficient tier for fixing a lagging stat." },
  { stars: 3, price: "14,600 G", note: "Large single-stat gain or a special effect — but not automatically better than a cheap meal you can afford every week." },
];

export const MEAL_TRAITS = [
  { name: "Poisonous", effect: "Costs 35 stamina when eaten." },
  { name: "Rapid Growth", effect: "The lower the fed stat, the larger the bonus — best used on a weakness." },
  { name: "Nutritious", effect: "Smaller stat gain, recovers 30 stamina." },
  { name: "Reversal", effect: "Swaps two of Coo's stats." },
];

export const WEEKLY_ACTIONS = [
  { action: "Help a townsfolk", stamina: 15 },
  { action: "Train with Morgentiana", stamina: 15 },
  { action: "Shopping", stamina: 0 },
  { action: "Fight a small calamity", stamina: 25 },
  { action: "Let Coo decide", stamina: 10 },
  { action: "Rest", stamina: "recovers", note: "Only offered when stamina is too low for the other options; spends the whole week." },
];

export type Character = {
  slug: string;
  name: string;
  kind: "companion" | "villager" | "calamity" | "dragon";
  role: string;
  schedule?: string;
  entry: string;
  quote?: string;
  /** Defeat achievement + Steam global unlock rate, where one exists. */
  defeat?: { achievement: string; pct: number };
  /** True when the game itself never documents the encounter — stated, not guessed. */
  undocumented?: boolean;
};

export const CHARACTERS: Character[] = [
  {
    slug: "coo",
    name: "Coo",
    kind: "companion",
    role: "The Divine Dragon you raise",
    entry:
      "Nameable at the start of the run; Coo is the default the game's own descriptions and trailers use. Also spelled Kuu, and filed as Dragon Girl in the game files. Six stats, two personality poles, six possible auras, and an appetite that can end the run.",
    quote: "The protagonist. Everything on this site is downstream of how you spend her 48 weeks.",
  },
  {
    slug: "morgentiana",
    name: "Morgentiana",
    kind: "dragon",
    role: "Dragon Folk warrior who trains Coo",
    entry:
      "Appears in the first weeks intending to take Coo to the Dragon Folk village and force-feed her into readiness for the Catastrophe. Coo refuses — the food there is not good enough — so Morgentiana settles for returning to train her instead.",
  },
  {
    slug: "mother-morgentiana",
    name: "Mother Morgentiana",
    kind: "calamity",
    role: "Leader of the Calamity",
    entry:
      "A parallel-world Morgentiana who calls herself the mother of all Calamity Dragons. Appears in the DAYS OF TORNADO epilogue, after Coo's appetite keeps growing, and invites her to join the Calamity.",
  },
  {
    slug: "calico",
    name: "Calico",
    kind: "villager",
    role: "Loan officer at Happy Cat Sith Loans",
    schedule: "Every week, whenever you choose to borrow instead of paying",
    entry:
      "The cat folk girl who shows up when you cannot afford a meal. Debt taken from her is a real mechanic: stay indebted too long and the run ends on the Use Responsibly ending.",
    quote: "\"A cat folk girl working at Happy Cat Sith Loans. She usually ends her sentences with meow.\" — Compendium",
  },
  {
    slug: "knot",
    name: "Knot",
    kind: "villager",
    role: "Shark folk, leads the village fishermen",
    entry:
      "Runs the salvage gamble: pay at least 15,000 G toward a wreck and he returns the next week — sometimes with double your money and the Treasure Investor achievement, sometimes with nothing.",
    quote: "\"He isn't a bad person, but his rough speech and appearance often make him seem intimidating.\" — Compendium",
  },
  {
    slug: "arches",
    name: "Arches",
    kind: "villager",
    role: "Werewolf hunter who takes Coo into the wilderness",
    entry:
      "Sending Coo out with Arches counts as a lenient choice on the aura ledger. He hunts with a bow and tans leather quietly.",
    quote: "\"A cool and quiet young werewolf. While his race specializes in melee combat, he makes his living hunting with a bow.\" — Compendium",
  },
  {
    slug: "toly",
    name: "Toly",
    kind: "villager",
    role: "Harpy girl who studies with Coo",
    entry:
      "Sending Coo to study with Toly counts as a strict choice. Runs her family's livestock farm and is never seen without a giant chicken.",
    quote: "\"A cheerful and innocent harpy girl from the village.\" — Compendium",
  },
  {
    slug: "martha",
    name: "Martha",
    kind: "villager",
    role: "Ogress blacksmith",
    entry: "Forge work for the village. Interested less in swinging weapons than in studying how they were made.",
    quote: "\"Though her race enjoys combat, she prefers forging metal as a blacksmith.\" — Compendium",
  },
  {
    slug: "quin",
    name: "Quin",
    kind: "villager",
    role: "Skeleton alchemist",
    entry: "Makes medicine, calls himself an alchemist, and complains about his back — the complaints are not genuine.",
    quote: "\"A joke-loving skeleton old man.\" — Compendium",
  },
  {
    slug: "ulupica",
    name: "Ulupica",
    kind: "villager",
    role: "Mandrake tavern owner",
    entry:
      "Runs the tavern, having retired from singing in the city. Her race can kill with their voices. Adds spicy food to everything.",
    quote: "\"After retiring, she became addict to spicy food.\" — In-game description",
  },
  {
    slug: "melty",
    name: "Melty",
    kind: "calamity",
    role: "Calamity Dragon of flames",
    schedule: "June, Week 4 (alongside Cham and Thunder as the first calamities)",
    entry:
      "Fights beside her friend Gao-Gao and spends the battle raising Coo's skill cooldowns. Manageable with cooldown control — her title is more menacing than the fight.",
    defeat: { achievement: "Melty Conqueror", pct: 27.8 },
  },
  {
    slug: "cham",
    name: "Cham",
    kind: "calamity",
    role: "Calamity Dragon of poison",
    schedule: "June, Week 4",
    entry:
      "A first-tier calamity that punishes unprepared low-HP runs: without healing skills or a deep health pool, poison outlasts you.",
    defeat: { achievement: "Cham Conqueror", pct: 76.0 },
  },
  {
    slug: "thunder",
    name: "Thunder",
    kind: "calamity",
    role: "Calamity Dragon of lightning",
    schedule: "June, Week 4",
    entry: "Small, dark-scaled, lightning-shaped horns. The third of the June calamities.",
    defeat: { achievement: "Thunder Conqueror", pct: 75.9 },
  },
  {
    slug: "labryn",
    name: "Labryn",
    kind: "calamity",
    role: "Calamity Dragon of power",
    schedule: "September, Week 4",
    entry:
      "Buffs herself and hits with raw force, so a thin HP pool is the failure mode. Her September defeat is the deadline the aura check runs against.",
    defeat: { achievement: "Labryn Conqueror", pct: 70.0 },
  },
  {
    slug: "noir",
    name: "Noir",
    kind: "calamity",
    role: "Calamity Dragon of curses",
    schedule: "September, Week 4",
    entry:
      "Curses punish low damage output rather than low defence — the run stalls instead of dying. Fandom's own entry for Noir duplicates Labryn's move list, which is why the two are easy to conflate.",
    defeat: { achievement: "Noir Conqueror", pct: 70.1 },
  },
  {
    slug: "moon",
    name: "Moon",
    kind: "calamity",
    role: "Slumbering Calamity Dragon",
    schedule: "December, Week 4",
    entry: "The late-year wall. Requires the stats and skills banked over eight months of feeding, and catches players who spent the autumn coasting.",
    defeat: { achievement: "Moon Conqueror", pct: 64.5 },
  },
  {
    slug: "ouroboros",
    name: "Ouroboros",
    kind: "calamity",
    role: "Final calamity dragon",
    schedule: "Year 2, March, Week 4 — run week 48",
    entry:
      "The last fight of DAYS OF TORNADO and the trigger for the A Quiet World ending. Clear her debt-free and the achievement Responsible Adult comes with it.",
  },
  {
    slug: "gemina",
    name: "Gemina",
    kind: "calamity",
    role: "Calamity Dragon (element not documented)",
    entry:
      "Known from the Steam achievement set: Gemina Conqueror exists and 65.2% of players hold it, which places her among the commonly-defeated calamities. No wiki documents her element, moves or week — anything more specific than this would be invented, so this page stops here until the game or the community fills it in.",
    defeat: { achievement: "Gemina Conqueror", pct: 65.2 },
    undocumented: true,
  },
  {
    slug: "dorothy",
    name: "Dorothy",
    kind: "calamity",
    role: "Calamity Dragon (element not documented)",
    entry:
      "Listed only in the achievement set. Her 30.9% unlock rate is close to Melty's, so most players who reach Dorothy eventually beat her — but nothing published says where or when she appears.",
    defeat: { achievement: "Dorothy Conqueror", pct: 30.9 },
    undocumented: true,
  },
  {
    slug: "fracta",
    name: "Fracta",
    kind: "calamity",
    role: "Calamity Dragon (element not documented)",
    schedule: "Not documented",
    entry:
      "Fracta Conqueror sits at 25.7% — a late-route calamity by the shape of the curve, in the same band as Dorothy and Melty. Element and week are unknown.",
    defeat: { achievement: "Fracta Conqueror", pct: 25.7 },
    undocumented: true,
  },
  {
    slug: "kurya",
    name: "Kurya",
    kind: "calamity",
    role: "Calamity Dragon (element not documented)",
    entry:
      "The rarest calamity conquest on record at 15.2%, and one of the few achievements with no description at all on Steam. Kurya is a real fight with a real achievement; everything else about her is still unlisted.",
    defeat: { achievement: "Kurya Conqueror", pct: 15.2 },
    undocumented: true,
  },
  {
    slug: "octanya",
    name: "Octanya",
    kind: "calamity",
    role: "The Evil Sea God",
    entry:
      "Octanya Conqueror — \"Defeated Octanya the Evil Sea God\" — is held by 39.9% of players. Not a calamity dragon: the achievement describes a sea god, fought somewhere on the same route.",
    defeat: { achievement: "Octanya Conqueror", pct: 39.9 },
    undocumented: true,
  },
  {
    slug: "nuunu-rabuu",
    name: "Nuunu-Rabuu",
    kind: "calamity",
    role: "Unknown-class encounter",
    entry:
      "\"Defeated Nuunu-Rabuu\", 37.8%. Even the class of enemy is unstated in the achievement text — it may not be a dragon at all. Recorded here because a player searching the name deserves a straight answer: yes, it is a fight, and yes, almost two in five players have finished it.",
    defeat: { achievement: "Nuunu-Rabuu Conqueror", pct: 37.8 },
    undocumented: true,
  },
  {
    slug: "the-meteor",
    name: "The Meteor",
    kind: "calamity",
    role: "Environmental encounter",
    entry:
      "\"Defeated the Meteor\" — 35.4%. A boss without a name or a face, which makes it a useful reminder that not every calamity in the achievement set is a character. The storm-level mechanic behind it is described on the achievements page.",
    defeat: { achievement: "Meteor Conqueror", pct: 35.4 },
    undocumented: true,
  },
];

export type Ending = { slug: string; name: string; condition: string; kind: "story" | "fail"; achievement: string; pct?: number };

export const ENDINGS_SCENARIO_1: Ending[] = [
  { slug: "a-quiet-world", name: "A Quiet World", condition: "Clear DAYS OF TORNADO — beat Ouroboros in year 2, week 48.", kind: "story", achievement: "A Quiet World", pct: 80.5 },
  { slug: "convenient-snack", name: "Convenient Snack", condition: "Be eaten by Coo. The Wild-personality route taken to its end.", kind: "fail", achievement: "Convenient Snack" },
  { slug: "new-catastrophe", name: "New Catastrophe", condition: "Defeat Morgentiana.", kind: "story", achievement: "New Catastrophe" },
  { slug: "i-yield", name: "I Yield…", condition: "Be defeated by Morgentiana.", kind: "fail", achievement: "I Yield…" },
  { slug: "use-responsibly", name: "Use Responsibly", condition: "Stay indebted for too long.", kind: "fail", achievement: "Use Responsibly" },
];

export const ENDINGS_SCENARIO_2 = {
  name: "DRAGON'S DISCIPLINE",
  count: 25,
  note:
    "The store page's \"Beyond Raising Your Dragon — 25 Possible Futures\" section is the only official statement: 25 endings, each with its own illustration. The developer has published the count but not the conditions, so any site printing all 25 conditions is printing something the game has not shipped. We list the count and say what is unknown.",
};

export const VERSIONS = [
  { version: "1.0.2", date: "2026-09-28", note: "Current. Third patch in five days." },
  { version: "1.0.1", date: "2026-09-25", note: "Released the day after launch." },
  { version: "1.0.0", date: "2026-09-24", note: "Full release out of Early Access, plus the soundtrack on Steam." },
  { version: "0.9.3", date: "2026-07-23", note: "Last Early Access patch: new artifacts including Strong Acid Slime and Ice items." },
];

export const SKILL_ATTRIBUTES = [
  { name: "Horn", note: "Powerful physical attacks with unreliable accuracy — the tree for players who can compensate for misses." },
  { name: "Claw", note: "Physical hits and cooldown control. Three-hit Strike and Mindfulness (all cooldowns −2) live here." },
  { name: "Wing", note: "Magic that scales off Coo's own AGI — Sonic Blade, Wind Blade." },
  { name: "Scale", note: "Punish and reflect. Curse deals back the total damage taken, capped at Coo's max HP." },
  { name: "Roar", note: "Passives and counters. Reactive Magic answers enemy magic with a counter." },
  { name: "Neutral", note: "The starter tree. Punch, at zero cooldown." },
];

export const SKILL_SYNERGY =
  "Fielding 3 skills of one attribute activates a Level 1 synergy, 6 gives Level 2 (Greater Power), and 9 gives Level 3 (The Professional). A normal Coo equips 4 battle skills — a strongly Rule-aligned Coo equips 5.";

/**
 * The nine element titles. Each exists as a Steam achievement with no
 * description attached, which is why the mapping below stops at the name and
 * the unlock rate. The count matches the element spread of the calamity
 * roster, but the game has not published what unlocks them.
 */
export const ELEMENT_TITLES = [
  { name: "Divine Dragon of Poison", pct: 16.5 },
  { name: "Divine Dragon of Lightning", pct: 15.9 },
  { name: "Divine Dragon of Power", pct: 14.1 },
  { name: "Divine Dragon of Curse", pct: 14.0 },
  { name: "Divine Dragon of Illusion", pct: 11.4 },
  { name: "Divine Dragon of Slumber", pct: 11.4 },
  { name: "Divine Dragon of Flame", pct: 8.0 },
  { name: "Divine Dragon of Blossoms", pct: 7.8 },
  { name: "Divine Dragon of Logic", pct: 6.7 },
];

export const STORM = {
  achievement: "A New Catastrophe?",
  pct: 10.8,
  text: "The Divine Dragon raised the storm's level to MAX",
  note:
    "The one non-defeat calamity achievement that names its mechanic. A storm level exists, it can be pushed to a maximum, and roughly one player in nine has done it.",
};

/**
 * Village mechanics confirmed on the official Steam screenshots, not transcribed
 * from a wiki: helping a villager raises friendship, and each villager's next
 * friendship bonus improves the rarity of two specific food categories.
 */
export const VILLAGE = {
  friendshipRarity:
    "Helping a villager builds friendship, and the next friendship bonus is printed on the offer screen: it makes rare meals of two specific categories more likely to appear. Ulupica's, for example, covers Tree and Plant — the two defensive-and-agility lines.",
  affectionEvents:
    "Affection events exist as their own system. In-game text for Ulupica Affection Event I reads: \"Occurs on event-free weekends when the following conditions are met: Affection 3 or higher, INT 3000 or higher.\" Two thresholds — a friendship level and a stat — gate each event, and the game shows them before you commit the week.",
  why:
    "Which makes helping villagers more than an income action: it is the only lever that changes which meals you are offered. A run that needs Seafood rarity has to court whoever supplies it.",
};

export const FESTIVAL = {
  name: "Divine Dragon Festival",
  when: "The end of the week after each boss is defeated.",
  detail:
    "The townsfolk put on a festival and offer three meals, one from each of three villagers, and you can teach them a phrase to praise Coo with. Confirmed first-festival meals include Giant Festival Fish (+1,020 INT) and Tropical Cake.",
};

export const SOURCES = [
  { label: "Steam store page and appdetails API (app 3103780)", note: "Release date, price, languages, patch notes, the 25 endings line, 200+ skills, streaming policy." },
  { label: "Steam Community global achievement page", note: "All 66 achievements with unlock rate, pulled 2026-09-29." },
  { label: "Steam news feed for DRAPLINE", note: "Patch dates: 1.0.0 (09-24), 1.0.1 (09-25), 1.0.2 (09-28)." },
  { label: "Fandom (drapline.fandom.com) wikitext", note: "In-game Compendium quotes, boss move lists, meal numbers, the 22-track soundtrack listing." },
  { label: "drapline.wiki pages", note: "Cross-check only. Used to confirm the six-aura set and the meal tier prices; corrections listed under \"What other sites get wrong\"." },
];

/** Where the popular sources conflict — printed on the site rather than resolved away. */
export const DISPUTED = [
  {
    topic: "How many auras",
    wrong: "Fandom lists four (Adored, Chill, Mischievous, Reserved).",
    right: "Six. Steady (27.2%) and Whimsical (26.0%) exist as their own Steam achievements, added after Early Access.",
  },
  {
    topic: "How many achievements",
    wrong: "Fandom says 62 and marks the page as work in progress.",
    right: "66. The Steam Community page lists all 66 with unlock rates; the Extra ones include both late auras and the Divine Dragon of … family.",
  },
  {
    topic: "How many endings",
    wrong: "Fandom says five and calls the second scenario unshipped.",
    right: "5 named endings in DAYS OF TORNADO plus the 25 possible futures the store page advertises for the later scenario. The count is official; the conditions are not published.",
  },
  {
    topic: "Current patch",
    wrong: "Fandom's version page stops at 0.9.3 (July 2026).",
    right: "1.0.2, shipped 2026-09-28 — three patches in the first five days after release.",
  },
];
