/**
 * The production origin.
 *
 * Read from the environment so previews can point elsewhere, but the fallback
 * is the real domain rather than a placeholder. A wrong fallback is silent and
 * expensive: it ships a sitemap and canonical tags pointing at a domain nobody
 * owns, and nothing in the build output looks broken.
 *
 * Set NEXT_PUBLIC_SITE_URL in the Cloudflare build environment to override.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://drapline.xyz"
).replace(/\/+$/, "");

export const SITE_NAME = "Drapline Field Lab";

export const SITE_TAGLINE =
  "DRAPLINE run planning, aura maths and the full achievement table — built from the game's own numbers.";

export const STEAM_URL = "https://store.steampowered.com/app/3103780/DRAPLINE/";
