import { SITE_URL, SITE_NAME } from "@/lib/site";
import { GAME } from "@/data/game";

/**
 * Structured data.
 *
 * Only shapes that are true here: a WebSite node, a VideoGame node for the
 * game itself (the numbers are Steam's own), ItemList for the database hubs,
 * and FAQPage where a page genuinely answers questions. No aggregateRating
 * copied from Steam, and no review markup.
 */
export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "An independent DRAPLINE reference: all six auras, the meal stat table, every achievement with its Steam unlock rate, and the ending conditions.",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function VideoGameJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: GAME.name,
    url: SITE_URL,
    sameAs: GAME.steamUrl,
    applicationCategory: "Game",
    gamePlatform: GAME.platforms,
    genre: GAME.genres,
    datePublished: GAME.release,
    author: { "@type": "Organization", name: GAME.developer },
    publisher: { "@type": "Organization", name: GAME.publisher },
    inLanguage: ["en", "ja", "zh-Hans"],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ItemListJsonLd({
  name,
  items,
  path,
}: {
  name: string;
  items: { name: string; slug: string }[];
  path: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: u.name,
      url: `${SITE_URL}${path}${u.slug}/`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
