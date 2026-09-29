"use client";

import { useEffect, useState } from "react";

export const CONSENT_KEY = "dl-consent";
export const CONSENT_EVENT = "dl-consent-changed";

export type Consent = "accepted" | "declined" | null;

/**
 * Reads the visitor's analytics/ad consent choice.
 *
 * Returns null until the choice is known — the server cannot read
 * localStorage, so a null value means "not yet decided" rather than "declined".
 * The consent banner dispatches CONSENT_EVENT when the choice is made, so
 * anything waiting on it (the ad slots) can unblock without a reload.
 */
export function useConsent(): Consent {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      // Hydration guard: consent lives in localStorage, which the server cannot
      // read, so the only place it can be picked up is after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "accepted" || stored === "declined") setConsent(stored);
    } catch {
      // Private mode: the choice simply does not persist.
    }
    const onDecision = (e: Event) => {
      const detail = (e as CustomEvent<Consent>).detail;
      if (detail === "accepted" || detail === "declined") setConsent(detail);
    };
    window.addEventListener(CONSENT_EVENT, onDecision);
    return () => window.removeEventListener(CONSENT_EVENT, onDecision);
  }, []);

  return consent;
}
