import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WebsiteJsonLd, VideoGameJsonLd } from "@/components/json-ld";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/**
 * Type system: a spaced technical grotesque for headings, a neutral grotesque
 * for body copy that has to survive long tables, and Plex Mono for every
 * number the site prints. The mono is doing real work — stat lines, unlock
 * rates, prices and week numbers all align in columns because of it.
 *
 * Fonts are self-hosted (src/fonts, OFL): next/font/google downloads them during
 * the build, and a flaky download broke a Cloudflare build on 2026-10-06.
 */
const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const archivo = localFont({
  src: "../fonts/archivo-latin-wght-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DRAPLINE auras, meals and achievements — Field Lab",
    template: "%s | Drapline Field Lab",
  },
  description: SITE_TAGLINE,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/shot-4.jpg`,
        width: 1920,
        height: 1080,
        alt: "The DRAPLINE weekly meal screen: three meal cards, Coo's stat panel and the personality bar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${archivo.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Light is the default rather than the OS setting: this is a data
          reference read in daylight and printed, and the palette was designed
          on the cold paper ground. A stored choice still wins.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("dl-theme");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <WebsiteJsonLd />
        <VideoGameJsonLd />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
