"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Consent-gated Google Analytics.
 *
 * Nothing from Google is requested until the visitor accepts — the gtag script
 * is injected at runtime rather than rendered into the document, so a declined
 * visit makes zero third-party requests. The measurement ID comes from the
 * build environment; with no ID configured the component renders nothing at
 * all rather than showing a banner that gates nothing.
 */

const KEY = "dl-consent";
/**
 * Measurement ID for the drapline GA4 property. The build environment can
 * override it, but the fallback is the real ID rather than an empty string —
 * a site that silently drops its analytics because a dashboard variable was
 * never set is a failure nobody notices for a month.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-533QZ4BQ28";

function loadAnalytics() {
  if (!GA_ID || document.querySelector("script[data-ga]")) return;
  const s = document.createElement("script");
  s.async = true;
  s.dataset.ga = "1";
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  const inline = document.createElement("script");
  inline.dataset.ga = "1";
  inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`;
  document.head.appendChild(inline);
}

export function AnalyticsConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      // Private mode. Treat as undecided, which means no tracking.
    }
    if (stored === "accepted") {
      loadAnalytics();
      return;
    }
    if (stored === "declined") return;
    // Hydration guard: whether to ask is only knowable on the client, after
    // localStorage is readable. Showing the prompt is the effect's whole job.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, []);

  function decide(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* nothing to persist; the choice still applies to this page view */
    }
    setShow(false);
    if (choice === "accepted") loadAnalytics();
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-5 py-4 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          This site uses Google Analytics to see which guides get read. Nothing loads until you say
          yes.{" "}
          <Link href="/privacy/" className="underline underline-offset-2">
            Privacy
          </Link>
        </p>
        <div className="flex gap-2 sm:ml-auto">
          <button
            onClick={() => decide("declined")}
            className="rounded-[var(--radius-control)] border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Decline
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-[var(--radius-control)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
