"use client";

import { useEffect, useRef } from "react";
import type { AdSlot } from "@/lib/ads";
import { useConsent } from "@/lib/use-consent";

/**
 * Adsterra banner, isolated inside its own srcdoc iframe and gated on consent.
 *
 * Two reasons for the iframe. First, the network's snippet sets a single global
 * `atOptions` and then loads invoke.js, which renders wherever its own script
 * tag sits — two units on one page would clobber each other, so each unit gets
 * its own document. Second, the box reserves its exact size up front, so a slow
 * or blocked ad never shifts the layout (CLS is the one Core Web Vital a bad ad
 * slot can ruin).
 *
 * Nothing is requested until the visitor accepts. The consent banner on this
 * site says "nothing loads until you say yes", and an ad iframe firing before
 * that would make the sentence a lie, so the slot renders a placeholder line
 * instead.
 */
export function AdsterraBanner({ slot, className = "" }: { slot: AdSlot; className?: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const consent = useConsent();
  const allowed = consent === "accepted" && Boolean(slot.key);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe || !allowed) return;
    iframe.srcdoc = `<!doctype html><html><head><meta charset="utf-8">
<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>
</head><body>
<script type="text/javascript">
atOptions={key:'${slot.key}',format:'iframe',height:${slot.height},width:${slot.width},params:{}};
</${""}script>
<script type="text/javascript" src="${slot.src}"></${""}script>
</body></html>`;
  }, [allowed, slot.key, slot.width, slot.height, slot.src]);

  if (!slot.key) return null;

  // Declined: the slot collapses rather than holding 250px of empty space.
  if (consent === "declined") return null;

  if (!allowed) {
    return (
      <div className={"flex flex-col items-center " + className}>
        <p className="text-[11px] text-muted-foreground/70">
          Ad slot — appears if you accept the consent prompt.
        </p>
      </div>
    );
  }

  return (
    <div className={"flex flex-col items-center " + className}>
      <span className="mb-1 text-[0.625rem] tracking-wide text-muted-foreground/70 uppercase">Ad</span>
      <iframe
        ref={ref}
        width={slot.width}
        height={slot.height}
        title="Advertisement"
        aria-hidden="true"
        tabIndex={-1}
        scrolling="no"
        loading="lazy"
        style={{
          border: 0,
          display: "block",
          margin: "0 auto",
          maxWidth: "100%",
          width: slot.width,
          height: slot.height,
        }}
      />
    </div>
  );
}
