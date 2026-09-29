import type { MetadataRoute } from "next";
import { AURAS, CHARACTERS, MEAL_CATEGORIES } from "@/data/game";
import { SITE_URL } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: Entry["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "daily" },
    { path: "/auras/", priority: 0.9, freq: "weekly" },
    { path: "/meals/", priority: 0.9, freq: "weekly" },
    { path: "/achievements/", priority: 0.9, freq: "weekly" },
    { path: "/characters/", priority: 0.8, freq: "weekly" },
    { path: "/endings/", priority: 0.8, freq: "weekly" },
    { path: "/skills/", priority: 0.7, freq: "weekly" },
    { path: "/guide/", priority: 0.8, freq: "weekly" },
    { path: "/guide/beginner/", priority: 0.8, freq: "weekly" },
    { path: "/guide/personality/", priority: 0.7, freq: "weekly" },
    { path: "/guide/money/", priority: 0.7, freq: "weekly" },
    { path: "/guide/faq/", priority: 0.7, freq: "weekly" },
    { path: "/tools/", priority: 0.7, freq: "weekly" },
    { path: "/tools/aura-planner/", priority: 0.7, freq: "weekly" },
    { path: "/tools/meal-compare/", priority: 0.6, freq: "weekly" },
    { path: "/updates/", priority: 0.6, freq: "daily" },
    { path: "/about/", priority: 0.3, freq: "monthly" },
    { path: "/privacy/", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: SITE_URL + r.path,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...AURAS.map((a) => ({
      url: `${SITE_URL}/auras/${a.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...MEAL_CATEGORIES.map((m) => ({
      url: `${SITE_URL}/meals/${m.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...CHARACTERS.map((c) => ({
      url: `${SITE_URL}/characters/${c.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}

export const dynamic = "force-static";
