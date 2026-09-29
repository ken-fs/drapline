import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
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
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
