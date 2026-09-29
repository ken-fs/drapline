import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Drapline Field Lab stores: your theme choice and achievement checklist stay in your browser. Analytics only loads if you accept, and the site has no accounts.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="What this site keeps, and where"
        breadcrumb={[{ href: "/", label: "Home" }]}
      />
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="prose-wiki">
          <h2>Stored in your browser only</h2>
          <ul>
            <li>
              <strong>Achievement checklist</strong> (<code>dl-achievements</code>) — which achievements you
              have marked done. It never leaves your device and there is no account to attach it to.
            </li>
            <li>
              <strong>Theme choice</strong> (<code>dl-theme</code>) — light or dark.
            </li>
            <li>
              <strong>Analytics consent</strong> (<code>dl-consent</code>) — your yes or no, so the banner
              does not ask twice.
            </li>
          </ul>
          <p>Clearing site data in your browser removes all three.</p>

          <h2>Analytics and ads</h2>
          <p>
            If you accept the consent prompt, the site loads Google Analytics to count page views and
            requests ads from Adsterra. Both are third-party scripts and both can set cookies. If you
            decline, neither is requested — no analytics script, no ad iframe, no cookies — and the ad
            slots collapse instead of holding empty space. The choice is yours and it is remembered.
          </p>

          <h2>What this site does not have</h2>
          <p>
            No accounts, no comments, no newsletter, and no tracking pixels of its own. The only
            third-party requests this site can make are the two described above, and both are off until
            you allow them. No personal data is collected, stored or sold by this site — there is no
            server-side component to a static site beyond Cloudflare serving the files.
          </p>

          <h2>Server logs</h2>
          <p>
            The site is served as static files by Cloudflare, which processes standard request data such
            as IP address and user agent to deliver the pages and protect against abuse. That is
            Cloudflare&apos;s own infrastructure, governed by their privacy policy, and this site has no
            access to it.
          </p>
        </div>
      </div>
    </>
  );
}
